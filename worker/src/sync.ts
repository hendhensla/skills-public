import { createHash } from "node:crypto";
import { config } from "./config.js";
import * as gh from "./github.js";
import * as nt from "./notion.js";
import { computeDiff } from "./diff.js";
import {
	composeSkillFile,
	parseSkillFile,
	repoPathForSlug,
	slugForRow,
	syncSnapshotPath,
	type SkillFile,
} from "./frontmatter.js";

const sha = (s: string) => createHash("sha256").update(s).digest("hex");

// Row types that publish to the repo. Skill rows carry writing/analysis instructions;
// Worker rows carry the callable tool surface of a deployed Notion Worker, which is what
// an external agent needs in order to use it. Agent and Workflow rows stay in Notion.
const SYNCED_TYPES = new Set(["Skill", "Worker"]);

export interface SyncResult {
	slug: string;
	action: "created" | "updated" | "noop" | "conflict" | "comment-blocked";
	detail?: string;
	issueUrl?: string;
}

// ---------------------------------------------------------------------------
// Resolve a triggering Notion page id into { rowId, docId, meta }.
// The AI Skills DB automation fires with the ROW id; we also handle a body-page
// id via a reverse lookup on the Doc URL property.
// ---------------------------------------------------------------------------
async function resolveSkill(pageId: string): Promise<{ rowId: string; docId: string; meta: nt.SkillMeta }> {
	const id = nt.pageIdFromUrl(pageId);
	const meta = await nt.readRowProps(id).catch(() => null);
	// Worker rows keep their documentation in the row page body, and their Doc URL points at the
	// Worker itself, not at a Notion page. Use the row as its own body source.
	if (meta?.skill && meta.type === "Worker") {
		return { rowId: id, docId: id, meta };
	}
	if (meta?.skill && meta.docUrl) {
		return { rowId: id, docId: nt.pageIdFromUrl(meta.docUrl), meta };
	}
	// Treat as a body page: find the row whose Doc URL points at it.
	const rowId = await findRowByDocPage(id);
	if (!rowId) throw new Error(`Could not resolve a skill row for page ${pageId}`);
	const rowMeta = await nt.readRowProps(rowId);
	return { rowId, docId: id, meta: rowMeta };
}

async function findRowByDocPage(docPageId: string): Promise<string | null> {
	// REST query against the data source; filter Doc URL contains the page id.
	const res = await fetch(`https://api.notion.com/v1/data_sources/${config.aiSkillsDataSource}/query`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${config.notionToken}`,
			"Notion-Version": config.notionVersion,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ filter: { property: "Doc URL", url: { contains: docPageId } } }),
	});
	if (!res.ok) return null;
	const data = (await res.json()) as { results?: Array<{ id: string }> };
	return data.results?.[0]?.id ?? null;
}

async function readSnapshot(slug: string): Promise<{ body: string; sha: string } | null> {
	const f = await gh.getFile(syncSnapshotPath(slug));
	return f ? { body: f.content, sha: f.sha } : null;
}
async function writeSnapshot(slug: string, body: string): Promise<void> {
	const existing = await gh.getFile(syncSnapshotPath(slug));
	await gh.putFile(syncSnapshotPath(slug), body, `chore(sync): snapshot ${slug}`, existing?.sha);
}

async function flag(slug: string, docId: string | null, reason: string, detail: string): Promise<string> {
	const issueUrl = await gh.createIssue(`[skills-sync] ${reason}: ${slug}`, `**${reason}** for \`${slug}\`.\n\n${detail}`);
	if (docId) {
		await nt
			.postPageComment(docId, `⚠️ skills-sync — ${reason}. ${detail}\nTracking: ${issueUrl}`)
			.catch(() => undefined);
	}
	return issueUrl;
}

// ===========================================================================
// Notion -> GitHub
// ===========================================================================
export async function pushToGitHub(triggerPageId: string): Promise<SyncResult> {
	// Type gate (primary): the ✨ AI Skills DB also catalogs Agents and Workflows. Those have no
	// Doc URL and must never sync to the repo. The automation fires with the ROW id, so read it
	// directly first — an explicit non-Skill Type is a clean no-op here, BEFORE resolveSkill (which
	// would otherwise throw on the missing Doc URL). A body-page trigger has no Type/Skill props and
	// falls through to resolveSkill's reverse lookup unchanged.
	const triggerRow = await nt.readRowProps(nt.pageIdFromUrl(triggerPageId)).catch(() => null);
	if (triggerRow?.type && !SYNCED_TYPES.has(triggerRow.type)) {
		return { slug: slugForRow(triggerRow), action: "noop", detail: `type=${triggerRow.type}; type is not published to the repo, sync skipped` };
	}

	const { rowId, docId, meta } = await resolveSkill(triggerPageId);

	// Defense-in-depth: a non-Skill row that somehow carries a Doc URL still must not sync.
	if (meta.type && !SYNCED_TYPES.has(meta.type)) {
		return { slug: slugForRow(meta), action: "noop", detail: `type=${meta.type}; type is not published to the repo, sync skipped` };
	}

	const { markdown: body } = await nt.retrievePageMarkdown(docId);

	// Find the repo file for THIS row. The row title may not match the repo directory
	// (e.g. row "SFDC Opportunity Fields & Stage Progression" lives at skills/sfdc-opp-stages/),
	// so a title-slug guess alone can create duplicates or clobber an unrelated skill.
	// Trust a path only if its frontmatter links this row/doc; otherwise scan all skills.
	const linksThisSkill = (p: SkillFile | null): boolean => {
		if (!p) return false;
		try {
			if (p.notionRow && nt.pageIdFromUrl(p.notionRow) === rowId) return true;
			if (p.notionDoc && nt.pageIdFromUrl(p.notionDoc) === docId) return true;
		} catch {
			/* unparseable link -> not a match */
		}
		return false;
	};
	const path0 = repoPathForSlug(slugForRow(meta));
	const candidate = (await gh.getFile(path0)) ?? null;
	const candidateParsed = candidate ? parseSkillFile(candidate.content) : null;
	let existing: typeof candidate = null;
	let existingParsed: SkillFile | null = null;
	if (candidate && (linksThisSkill(candidateParsed) || !candidateParsed?.notionRow)) {
		// Same row, or an unlinked file at the expected path (pre-first-sync skill): adopt it.
		existing = candidate;
		existingParsed = candidateParsed;
	} else {
		for (const dir of await gh.listDir("skills")) {
			const f = await gh.getFile(repoPathForSlug(dir));
			if (!f) continue;
			const p = parseSkillFile(f.content);
			if (linksThisSkill(p)) {
				existing = f;
				existingParsed = p;
				break;
			}
		}
		if (!existing && candidate) {
			// The slugified title collides with a DIFFERENT skill's path — never overwrite it.
			const issueUrl = await flag(
				slugForRow(meta),
				docId,
				"path-collision",
				`Row title slugifies to \`${path0}\`, which belongs to another skill, and no repo file links this row. Not applied.`,
			);
			return { slug: slugForRow(meta), action: "conflict", issueUrl };
		}
	}
	const slug = existingParsed?.slug ?? slugForRow(meta);
	const path = repoPathForSlug(slug);
	const file: SkillFile = {
		slug,
		description: meta.whatItDoes || existingParsed?.description || meta.notes || "",
		meta,
		notionRow: existingParsed?.notionRow ?? `https://www.notion.so/${rowId}`,
		notionDoc: existingParsed?.notionDoc ?? `https://www.notion.so/${docId}`,
		body,
	};
	const composed = composeSkillFile(file);

	// Echo guard: identical to what's already in the repo -> our own round-trip.
	const current = slug === existingParsed?.slug ? existing : await gh.getFile(path);
	if (current && current.content === composed) return { slug, action: "noop", detail: "github already current" };

	// Conflict guard: GitHub changed since last sync AND Notion changed (the trigger).
	const snap = await readSnapshot(slug);
	if (current && snap && sha(parseSkillFile(current.content).body) !== sha(snap.body)) {
		const issueUrl = await flag(slug, docId, "conflict", "Both Notion and GitHub changed this skill since the last sync; Notion->GitHub not applied.");
		return { slug, action: "conflict", issueUrl };
	}

	await gh.putFile(path, composed, `feat(sync): update ${slug} from Notion`, current?.sha);
	await writeSnapshot(slug, body);
	return { slug, action: current ? "updated" : "created", detail: "github updated from notion" };
}

// ===========================================================================
// GitHub -> Notion  (the comment-preserving direction)
// ===========================================================================
export async function pushToNotion(repoPath: string): Promise<SyncResult> {
	const file = await gh.getFile(repoPath);
	if (!file) return { slug: repoPath, action: "noop", detail: "file not found (deleted?)" };
	const parsed = parseSkillFile(file.content);
	const slug = parsed.slug;

	// New skill: create the row + body page, write IDs back, snapshot.
	if (!parsed.notionDoc || !parsed.notionRow) {
		const { rowUrl, docUrl } = await nt.createSkillRowAndBody(parsed.meta, parsed.body);
		const withIds = composeSkillFile({ ...parsed, notionRow: rowUrl, notionDoc: docUrl });
		await gh.putFile(repoPath, withIds, `chore(sync): link ${slug} to Notion`, file.sha);
		// Snapshot the ROUND-TRIPPED markdown, not the raw GitHub body: Notion normalizes on
		// import (indentation, blank lines), and the snapshot's contract (see computeDiff) is
		// "== current Notion markdown". Snapshotting the raw body made every later push a
		// false conflict.
		const live = await nt.retrievePageMarkdown(nt.pageIdFromUrl(docUrl));
		await writeSnapshot(slug, live.markdown);
		return { slug, action: "created", detail: "created notion row + body page" };
	}

	const docId = nt.pageIdFromUrl(parsed.notionDoc);
	const rowId = nt.pageIdFromUrl(parsed.notionRow);
	const live = await nt.retrievePageMarkdown(docId);

	// Status consolidation (rule set 2026-08-14): the Notion DB owns Status. When a
	// GitHub push arrives for a row whose Status is non-Active and differs from the repo
	// frontmatter, sync the content but never touch the row's status; if content actually
	// changes, leave a comment on the row marking the resolution.
	let rowMeta = parsed.meta;
	let statusKept: string | null = null;
	const currentRow = await nt.readRowProps(rowId).catch(() => null);
	if (currentRow?.status && currentRow.status !== "Active" && currentRow.status !== parsed.meta.status) {
		rowMeta = { ...parsed.meta, status: undefined };
		statusKept = currentRow.status;
	}

	// Echo guard.
	if (sha(live.markdown) === sha(parsed.body)) {
		await nt.updateRowProps(rowId, rowMeta).catch(() => undefined); // props may still differ
		return { slug, action: "noop", detail: "notion body already current" };
	}

	// Conflict guard: Notion changed since last sync AND GitHub changed (this trigger).
	const snap = await readSnapshot(slug);
	const baseline = snap?.body ?? live.markdown;
	if (snap && sha(live.markdown) !== sha(snap.body)) {
		const issueUrl = await flag(slug, docId, "conflict", "Both Notion and GitHub changed this skill since the last sync; GitHub->Notion not applied.");
		return { slug, action: "conflict", issueUrl };
	}

	const diff = computeDiff(baseline, parsed.body);
	if (diff.ambiguous) {
		const issueUrl = await flag(slug, docId, "ambiguous-diff", "Could not compute a safe targeted edit (non-unique anchor). Not applied to protect comments.");
		return { slug, action: "conflict", issueUrl };
	}
	if (!diff.updates.length) {
		await nt.updateRowProps(rowId, rowMeta).catch(() => undefined);
		return { slug, action: "noop", detail: "no effective body change" };
	}

	// Comment-deletion guard.
	if (diff.hasDeletions) {
		const commented = await nt.getCommentedBlocks(docId);
		const hit = commented.filter((cb) => cb.text.trim() && diff.removedSegments.some((seg) => seg.includes(cb.text.trim())));
		if (hit.length) {
			if (config.commentDeletePolicy === "flag") {
				const issueUrl = await flag(
					slug,
					docId,
					"comment-on-deleted-text",
					`GitHub deleted text carrying ${hit.length} open comment(s). Not applied. Affected:\n` +
						hit.map((h) => `- "${h.text.slice(0, 80)}" (${h.comments.length} comment(s))`).join("\n"),
				);
				return { slug, action: "comment-blocked", issueUrl };
			}
			if (config.commentDeletePolicy === "salvage") {
				for (const h of hit) {
					const lines = h.comments.map((c) => `  • ${c.body} — <${c.author}>`).join("\n");
					await nt.postPageComment(docId, `🗃️ Salvaged comments from deleted text "${h.text.slice(0, 120)}":\n${lines}`);
				}
			}
			// "allow" (and salvage, after re-posting) fall through to apply the deletion.
		}
	}

	await nt.updatePageMarkdown(docId, diff.updates, diff.hasDeletions);
	await nt.updateRowProps(rowId, rowMeta);
	if (statusKept) {
		await nt
			.postPageComment(
				rowId,
				`🔄 skills-sync consolidation: content was updated from a GitHub push, but Status stays "${statusKept}" (repo frontmatter said "${parsed.meta.status ?? "none"}"). Non-Active statuses are owned by this database — change Status here when the skill is ready.`,
			)
			.catch(() => undefined);
	}
	// Snapshot the round-tripped markdown (see the create path note): Notion re-normalizes
	// the applied edits, and the snapshot must equal what a fresh GET returns.
	const after = await nt.retrievePageMarkdown(docId);
	await writeSnapshot(slug, after.markdown);
	return { slug, action: "updated", detail: `applied ${diff.updates.length} edit(s)${statusKept ? `; status kept at ${statusKept}, comment left` : ""}` };
}

/**
 * Replace the Notion body wholesale from GitHub and refresh the snapshot to the
 * round-tripped markdown. Loses comment anchors on every block — a migration/repair
 * tool for desynced skills, not the routine path (use pushToNotion for that).
 */
export async function forcePushToNotion(repoPath: string): Promise<SyncResult> {
	const file = await gh.getFile(repoPath);
	if (!file) return { slug: repoPath, action: "noop", detail: "file not found (deleted?)" };
	const parsed = parseSkillFile(file.content);
	if (!parsed.notionDoc || !parsed.notionRow) return pushToNotion(repoPath); // brand-new: normal create path
	const docId = nt.pageIdFromUrl(parsed.notionDoc);
	await nt.replacePageMarkdown(docId, parsed.body, true);
	await nt.updateRowProps(nt.pageIdFromUrl(parsed.notionRow), parsed.meta).catch(() => undefined);
	const after = await nt.retrievePageMarkdown(docId);
	await writeSnapshot(parsed.slug, after.markdown);
	return { slug: parsed.slug, action: "updated", detail: "replaced notion body from github; snapshot refreshed" };
}

/** Compose-only dry run (no writes) for verification. */
export async function dryRunCompose(triggerPageId: string): Promise<string> {
	const { rowId, docId, meta } = await resolveSkill(triggerPageId);
	const { markdown: body } = await nt.retrievePageMarkdown(docId);
	return composeSkillFile({
		slug: slugForRow(meta),
		description: meta.whatItDoes || meta.notes || "",
		meta,
		notionRow: `https://www.notion.so/${rowId}`,
		notionDoc: `https://www.notion.so/${docId}`,
		body,
	});
}
