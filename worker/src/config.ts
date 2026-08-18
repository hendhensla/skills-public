import "dotenv/config";

export type CommentDeletePolicy = "flag" | "salvage" | "allow";

/**
 * Assert a required env var at USE time, not import time. Importing this module must never throw
 * — the Workers platform imports the bundle during deploy (capability introspection) BEFORE any
 * secrets are set, so a throw-on-load crashes the deploy with "Failed to fetch capabilities".
 */
export function requireEnv(name: "SKILLS_NOTION_TOKEN" | "GITHUB_TOKEN"): string {
	const v = process.env[name];
	if (!v) throw new Error(`Missing required env var: ${name} (set via 'ntn workers env set ${name}=...')`);
	return v;
}

export const config = {
	// Notion token. On the DEPLOYED worker the "NOTION_" prefix is reserved by the platform, so the
	// secret must be SKILLS_NOTION_TOKEN. Locally, NOTION_TOKEN (in .env) still works as a fallback.
	// Read lazily — do NOT throw here (see requireEnv). Empty until env is set.
	notionToken: process.env.SKILLS_NOTION_TOKEN ?? process.env.NOTION_TOKEN ?? "",
	// Version that supports the Markdown endpoints. Do not lower.
	notionVersion: process.env.NOTION_VERSION ?? "2026-03-11",
	// API base. Dev workspace (app.dev.notion.com) needs the dev base, NOT prod api.notion.com.
	notionBaseUrl: process.env.NOTION_API_BASE_URL ?? "https://api.notion.com",
	aiSkillsDataSource: process.env.AI_SKILLS_DATASOURCE ?? "",

	// GitHub (only needed for actual sync writes; left blank for a Notion-only dry run)
	githubToken: process.env.GITHUB_TOKEN ?? "",
	githubRepo: process.env.GITHUB_REPO ?? "", // owner/name, e.g. yourname/claude-skills
	githubBranch: process.env.GITHUB_BRANCH ?? "main",
	botName: process.env.SYNC_BOT_NAME ?? "skills-sync[bot]",
	botEmail: process.env.SYNC_BOT_EMAIL ?? "skills-sync@users.noreply.github.com",

	// Behavior
	commentDeletePolicy: (process.env.COMMENT_DELETE_POLICY ?? "flag") as CommentDeletePolicy,

	// Marker placed in every sync-originated commit so the GitHub Action can ignore its own echoes.
	commitMarker: "[skills-sync]",
} as const;
