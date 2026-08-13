import { Worker } from "@notionhq/workers";
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

// NOTE: a worker.automation("skillRowChanged", … → pushToGitHub(event.pageId)) capability is the
// intended Notion->GitHub trigger, but automation() is private-alpha and NOT enabled for this user
// (deploy fails 400 CapabilityNotEnabledError). Re-add these ~8 lines once alpha is granted.
