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

export function parseSkillFile(md: string): SkillFile {
	const { data, content } = matter(md);
	const meta: SkillMeta = {
		skill: data.skill ?? data.name ?? "",
		whatItDoes: data.description, // SKILL.md description -> Notion "What it does"
		status: data.status,
		category: data.category,
		proficiency: data.proficiency,
		trigger: data.trigger,
		ownerId: data.owner_id,
		lastTested: data.last_tested,
		notes: data.notes,
		docUrl: data.notion_doc,
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
		description: file.description || file.meta.whatItDoes || file.meta.notes || "",
		status: file.meta.status,
		category: file.meta.category,
		proficiency: file.meta.proficiency,
		trigger: file.meta.trigger,
		owner_id: file.meta.ownerId,
		last_tested: file.meta.lastTested,
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
