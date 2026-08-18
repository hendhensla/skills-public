import matter from "gray-matter";
import type { SkillMeta } from "./notion.js";

/** A parsed SKILL.md. `description` and `slug` are Claude-Code-facing; the rest map to Notion. */
export interface SkillFile {
	slug: string; // = frontmatter name = folder name = Claude Code skill name
	description: string; // Claude Code trigger text (GitHub/local-only; Notion has no field for it)
	meta: SkillMeta; // synced to the AI Skills DB row
	notionRow?: string; // mapping: DB row URL
	notionDoc?: string; // mapping: body page URL
	body: string; // the instructions (synced to the Doc URL page)
}

export function slugify(title: string): string {
	return title
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

/**
 * Repo slug for a row. Worker rows publish under a `worker-` prefix so tool docs never
 * collide with skill docs, and so a reader can see at a glance that the doc describes
 * callable Worker tools rather than a writing skill.
 */
export function slugForRow(meta: { skill: string; type?: string }): string {
	if (meta.type !== "Worker") return slugify(meta.skill);
	const base = slugify(meta.skill).replace(/^worker-/, "").replace(/-worker$/, "");
	return `worker-${base}`;
}

export function parseSkillFile(md: string): SkillFile {
	const { data, content } = matter(md);
	const meta: SkillMeta = {
		skill: data.skill ?? data.name ?? "",
		type: data.type,
		whatItDoes: data.description, // SKILL.md description -> Notion "What it does"
		status: data.status,
		category: data.category,
		proficiency: data.proficiency,
		trigger: data.trigger,
		ownerId: data.owner_id,
		lastTested: data.last_tested,
		notes: data.notes,
		docUrl: data.notion_doc,
		location: data.worker_url ?? data.location,
	};
	return {
		slug: data.name ?? slugify(meta.skill),
		description: data.description ?? "",
		meta,
		notionRow: data.notion_row,
		notionDoc: data.notion_doc,
		body: content.replace(/^\n+/, ""),
	};
}

export function composeSkillFile(file: SkillFile): string {
	// gray-matter preserves key order from this object.
	const fm: Record<string, unknown> = {
		name: file.slug,
		skill: file.meta.skill,
		type: file.meta.type,
		description: file.description || file.meta.whatItDoes || file.meta.notes || "",
		status: file.meta.status,
		category: file.meta.category,
		proficiency: file.meta.proficiency,
		trigger: file.meta.trigger,
		owner_id: file.meta.ownerId,
		last_tested: file.meta.lastTested,
		worker_url: file.meta.location,
		notes: file.meta.notes,
		notion_row: file.notionRow,
		notion_doc: file.notionDoc,
	};
	for (const k of Object.keys(fm)) if (fm[k] === undefined) delete fm[k];
	return matter.stringify(`\n${file.body}\n`, fm);
}

export function repoPathForSlug(slug: string): string {
	return `skills/${slug}/SKILL.md`;
}

export function syncSnapshotPath(slug: string): string {
	return `.sync/${slug}.md`;
}

/**
 * Hash of the repo body at the last successful GitHub->Notion push. Kept separate from
 * syncSnapshotPath because that file's contract is "== current Notion markdown" (see computeDiff),
 * and Notion normalizes on import, so it can never answer "did GitHub change?".
 */
export function githubSnapshotPath(slug: string): string {
	return `.sync/${slug}.github.sha`;
}
