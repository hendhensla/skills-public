import { Worker, WebhookVerificationError } from "@notionhq/workers";
import { j } from "@notionhq/workers/schema-builder";
import { pushToGitHub, pushToNotion, forcePushToNotion, dryRunCompose, type SyncResult } from "./sync.js";

const worker = new Worker();
export default worker;

// The SDK constrains tool output to its (non-root-exported) JSONValue type. Mirror it
// locally and normalize SyncResult (optional fields -> null) at the boundary.
type Json = string | number | boolean | null | Json[] | { [k: string]: Json };
const toJson = (r: SyncResult): Json => ({
	slug: r.slug,
	action: r.action,
	detail: r.detail ?? null,
	issueUrl: r.issueUrl ?? null,
});

worker.tool("pushToGitHub", {
	title: "Sync skill: Notion → GitHub",
	description:
		"Given the Notion page id (or URL) of a changed AI Skills row or body page, compose its SKILL.md and write it to the claude-skills GitHub repo. Fired by the AI Skills DB automation. Skips echoes; flags conflicts.",
	schema: j.object({
		pageId: j.string().describe("Notion page id or URL of the changed skill row or body page."),
	}),
	execute: async ({ pageId }) => toJson(await pushToGitHub(pageId)),
});

worker.tool("pushToNotion", {
	title: "Sync skill: GitHub → Notion",
	description:
		"Given the repo path of a changed SKILL.md, update the matching Notion row + body page. Writes the body via the Markdown API's update_content (targeted diffs) so block IDs and their comments survive; applies COMMENT_DELETE_POLICY when an edit removes commented text. Fired by the GitHub Action on push.",
	schema: j.object({
		path: j.string().describe("Repo path of the changed SKILL.md, e.g. skills/deal/SKILL.md"),
	}),
	execute: async ({ path }) => toJson(await pushToNotion(path)),
});

worker.tool("forcePushToNotion", {
	title: "Force-sync skill: GitHub → Notion (replace body)",
	description:
		"Replace a skill's Notion body wholesale from its repo SKILL.md and refresh the sync snapshot to the round-tripped markdown. Destroys comment anchors on all blocks — migration/repair only; use pushToNotion for routine syncs.",
	schema: j.object({
		path: j.string().describe("Repo path of the SKILL.md, e.g. skills/deal/SKILL.md"),
	}),
	execute: async ({ path }) => toJson(await forcePushToNotion(path)),
});

worker.tool("dryRunCompose", {
	title: "Dry run: compose SKILL.md from Notion (read-only)",
	description:
		"Read-only verification. Fetch a skill's row props + body markdown and return the composed SKILL.md without writing to GitHub or Notion.",
	schema: j.object({
		pageId: j.string().describe("Notion page id or URL of a skill row or body page."),
	}),
	execute: async ({ pageId }) => dryRunCompose(pageId),
});

// Notion->GitHub trigger. Wire a database automation on your AI Skills database
// ("when page added/edited" -> "Send webhook") that POSTs to this endpoint with your
// shared secret in the X-Skills-Sync-Secret header. Set the same value as the
// WEBHOOK_SECRET worker env var. (A worker.automation() capability would also work but
// is gated behind a private alpha; webhooks are generally available.)
worker.webhook("skillRowChanged", {
	title: "Skill row changed → sync to GitHub",
	description:
		"Endpoint for the AI Skills DB 'Send webhook' automation. Verifies the shared secret, extracts the changed row's page id, and runs the same Notion→GitHub sync as pushToGitHub (echo-skip and conflict-flag rules included).",
	execute: async (events) => {
		const secret = process.env.WEBHOOK_SECRET;
		if (!secret) {
			throw new WebhookVerificationError("WEBHOOK_SECRET is not set in worker env");
		}
		for (const event of events) {
			const provided = event.headers["x-skills-sync-secret"] ?? event.headers["X-Skills-Sync-Secret"];
			if (provided !== secret) {
				throw new WebhookVerificationError("X-Skills-Sync-Secret header missing or wrong");
			}
			// Notion's "Send webhook" automation posts { source, data: <page object> }.
			// Fall back to explicit pageId keys so manual/test invocations work too.
			const body = event.body as { data?: { id?: string }; pageId?: string; page_id?: string };
			const pageId = body.data?.id ?? body.pageId ?? body.page_id;
			if (!pageId) continue;
			await pushToGitHub(pageId);
		}
	},
});
