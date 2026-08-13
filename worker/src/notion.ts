import { Client } from "@notionhq/client";
import { config } from "./config.js";

export const notion = new Client({
	auth: config.notionToken,
	notionVersion: config.notionVersion,
	baseUrl: config.notionBaseUrl,
});

const NOTION_API = `${config.notionBaseUrl}/v1`;

async function notionRest<T>(path: string, init?: RequestInit): Promise<T> {
	const res = await fetch(`${NOTION_API}${path}`, {
		...init,
		headers: {
			Authorization: `Bearer ${config.notionToken}`,
			"Notion-Version": config.notionVersion,
			"Content-Type": "application/json",
			...(init?.headers ?? {}),
		},
	});
	if (!res.ok) {
		throw new Error(`Notion ${init?.method ?? "GET"} ${path} -> ${res.status}: ${await res.text()}`);
	}
	return res.json() as Promise<T>;
}

/** 32-hex or dashed UUID from a page id or notion.so URL. */
export function pageIdFromUrl(idOrUrl: string): string {
	const m = idOrUrl.match(/[0-9a-f]{32}|[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i);
	if (!m) throw new Error(`No page id found in: ${idOrUrl}`);
	return m[0].replace(/-/g, "");
}

// ---------------------------------------------------------------------------
// Markdown endpoints (REST — the SDK pin may predate these, so we call directly).
// Notion-Version 2026-03-11. See README.
// ---------------------------------------------------------------------------

export interface PageMarkdown {
	markdown: string;
	truncated: boolean;
	unknown_block_ids: string[];
}

export function retrievePageMarkdown(pageId: string): Promise<PageMarkdown> {
	return notionRest<PageMarkdown>(`/pages/${pageId}/markdown`);
}

export interface ContentUpdate {
	old_str: string;
	new_str: string;
	replace_all_matches?: boolean;
}

/** Targeted edits — preserves block IDs (and the comments anchored to them) for untouched blocks. */
export function updatePageMarkdown(pageId: string, updates: ContentUpdate[], allowDeleting = false): Promise<PageMarkdown> {
	return notionRest<PageMarkdown>(`/pages/${pageId}/markdown`, {
		method: "PATCH",
		body: JSON.stringify({
			type: "update_content",
			update_content: { content_updates: updates },
			allow_deleting_content: allowDeleting,
		}),
	});
}

/** Wholesale replace — ONLY for brand-new body pages (drops all block IDs / comments). */
export function replacePageMarkdown(pageId: string, newStr: string, allowDeleting = false): Promise<PageMarkdown> {
	return notionRest<PageMarkdown>(`/pages/${pageId}/markdown`, {
		method: "PATCH",
		body: JSON.stringify({
			type: "replace_content",
			replace_content: { new_str: newStr },
			allow_deleting_content: allowDeleting,
		}),
	});
}

// ---------------------------------------------------------------------------
// Comments (for the delete guard). Notion comments anchor to a block id; the
// markdown API hides block ids, so we map block plaintext -> open comments and
// the delete guard checks whether a removed markdown region contains that text.
// ---------------------------------------------------------------------------

export interface BlockComment {
	author: string;
	body: string;
}
export interface CommentedBlock {
	blockId: string;
	text: string; // block plaintext ("(page-level)" for page comments)
	comments: BlockComment[];
}

function richTextToPlain(rt: Array<{ plain_text?: string }> | undefined): string {
	return (rt ?? []).map((r) => r.plain_text ?? "").join("");
}

async function listOpenComments(blockId: string): Promise<BlockComment[]> {
	const out: BlockComment[] = [];
	let cursor: string | undefined;
	do {
		const res = await notion.comments.list({ block_id: blockId, start_cursor: cursor });
		for (const c of res.results as Array<Record<string, unknown>>) {
			// Resolved comments are excluded by the API by default.
			out.push({
				author: ((c.created_by as { id?: string })?.id) ?? "unknown",
				body: richTextToPlain(c.rich_text as Array<{ plain_text?: string }>),
			});
		}
		cursor = res.has_more ? (res.next_cursor ?? undefined) : undefined;
	} while (cursor);
	return out;
}

interface FlatBlock {
	id: string;
	text: string;
}
async function listAllBlocks(blockId: string, acc: FlatBlock[] = []): Promise<FlatBlock[]> {
	let cursor: string | undefined;
	do {
		const res = await notion.blocks.children.list({ block_id: blockId, start_cursor: cursor });
		for (const b of res.results as Array<Record<string, unknown>>) {
			const type = b.type as string;
			const payload = b[type] as { rich_text?: Array<{ plain_text?: string }> } | undefined;
			acc.push({ id: b.id as string, text: richTextToPlain(payload?.rich_text) });
			if (b.has_children) await listAllBlocks(b.id as string, acc);
		}
		cursor = res.has_more ? (res.next_cursor ?? undefined) : undefined;
	} while (cursor);
	return acc;
}

/** Every block (and the page) on the body page that has open comments. */
export async function getCommentedBlocks(pageId: string): Promise<CommentedBlock[]> {
	const result: CommentedBlock[] = [];
	const pageComments = await listOpenComments(pageId);
	if (pageComments.length) result.push({ blockId: pageId, text: "(page-level)", comments: pageComments });
	for (const b of await listAllBlocks(pageId)) {
		if (!b.text.trim()) continue;
		const comments = await listOpenComments(b.id);
		if (comments.length) result.push({ blockId: b.id, text: b.text, comments });
	}
	return result;
}

/** Post a top-level (page) comment — used by the flag/salvage policies. */
export function postPageComment(pageId: string, body: string): Promise<unknown> {
	return notion.comments.create({
		parent: { page_id: pageId },
		rich_text: [{ text: { content: body } }],
	} as Parameters<typeof notion.comments.create>[0]);
}

// ---------------------------------------------------------------------------
// Row properties (the AI Skills DB). Maps SKILL.md frontmatter <-> Notion props.
// ---------------------------------------------------------------------------

export interface SkillMeta {
	skill: string;
	type?: string; // "Skill" | "Agent" | "Workflow" — only "Skill" rows sync (see pushToGitHub guard)
	whatItDoes?: string; // "What it does" (one-line summary) <-> SKILL.md `description`
	status?: string;
	category?: string[];
	proficiency?: string;
	trigger?: string;
	ownerId?: string; // Notion user id (person property)
	lastTested?: string; // ISO date
	notes?: string;
	docUrl?: string;
}

type Props = Record<string, Record<string, unknown>>;

export async function readRowProps(rowPageId: string): Promise<SkillMeta> {
	const page = (await notion.pages.retrieve({ page_id: rowPageId })) as { properties: Props };
	const p = page.properties;
	const sel = (key: string) => (p[key]?.select as { name?: string } | null)?.name;
	return {
		skill: richTextToPlain(p["Skill"]?.title as Array<{ plain_text?: string }>),
		type: sel("Type"),
		whatItDoes: richTextToPlain(p["What it does"]?.rich_text as Array<{ plain_text?: string }>),
		status: (p["Status"]?.status as { name?: string } | null)?.name,
		category: (p["Category"]?.multi_select as Array<{ name: string }> | undefined)?.map((o) => o.name),
		proficiency: sel("Proficiency"),
		trigger: sel("Trigger"),
		ownerId: (p["Owner"]?.people as Array<{ id: string }> | undefined)?.[0]?.id,
		lastTested: (p["Last tested"]?.date as { start?: string } | null)?.start,
		notes: richTextToPlain(p["Notes"]?.rich_text as Array<{ plain_text?: string }>),
		docUrl: (p["Doc URL"]?.url as string | null) ?? undefined,
	};
}

function metaToProps(meta: Partial<SkillMeta>): Props {
	const props: Props = {};
	if (meta.skill !== undefined) props["Skill"] = { title: [{ text: { content: meta.skill } }] };
	if (meta.status !== undefined) props["Status"] = { status: { name: meta.status } };
	if (meta.category !== undefined) props["Category"] = { multi_select: meta.category.map((name) => ({ name })) };
	if (meta.proficiency !== undefined) props["Proficiency"] = { select: { name: meta.proficiency } };
	if (meta.trigger !== undefined) props["Trigger"] = { select: { name: meta.trigger } };
	if (meta.notes !== undefined) props["Notes"] = { rich_text: [{ text: { content: meta.notes } }] };
	if (meta.whatItDoes) props["What it does"] = { rich_text: [{ text: { content: meta.whatItDoes } }] };
	if (meta.lastTested !== undefined) props["Last tested"] = { date: { start: meta.lastTested } };
	if (meta.docUrl !== undefined) props["Doc URL"] = { url: meta.docUrl };
	if (meta.ownerId !== undefined) props["Owner"] = { people: [{ id: meta.ownerId }] };
	return props;
}

export async function updateRowProps(rowPageId: string, meta: Partial<SkillMeta>): Promise<void> {
	await notion.pages.update({ page_id: rowPageId, properties: metaToProps(meta) as never });
}

/**
 * Create a new body page + AI Skills DB row for a brand-new SKILL.md.
 * Returns { rowUrl, docUrl }. The body page is created under SKILL_BODY_PARENT (the "AI Skills" page).
 * NOTE: verify parent + data_source create shape against the installed SDK during the dry-run.
 */
export async function createSkillRowAndBody(meta: SkillMeta, body: string): Promise<{ rowUrl: string; docUrl: string }> {
	const bodyParent = process.env.SKILL_BODY_PARENT;
	if (!bodyParent) throw new Error("SKILL_BODY_PARENT (the 'AI Skills' parent page id) is required to create new skills");

	const bodyPage = (await notion.pages.create({
		parent: { page_id: pageIdFromUrl(bodyParent) },
		properties: { title: [{ text: { content: meta.skill } }] } as never,
	})) as { id: string; url: string };
	await replacePageMarkdown(bodyPage.id, body, true);

	const row = (await notion.pages.create({
		parent: { data_source_id: config.aiSkillsDataSource } as never,
		properties: metaToProps({ ...meta, docUrl: bodyPage.url }) as never,
	})) as { id: string; url: string };

	return { rowUrl: row.url, docUrl: bodyPage.url };
}
