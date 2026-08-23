---
name: Skill repository sync Worker
skill: worker-claude-skills-sync
type: Worker
description: "Agent-callable tools for composing and synchronizing skill documents between a Notion workspace and a Git repository."
category:
  - Automation
  - Notion
proficiency: Advanced
trigger: Agent
notes: "Deploy a separate copy for your workspace and repository. Keep only credential names and configuration placeholders here; never store secret values."
worker_url: <your-worker-url>
notion_data_source_id: <your-skills-data-source-id>
github_repository: <your-owner>/<your-repository>
github_branch: main
notion_credential: SKILLS_NOTION_TOKEN
github_credential: GITHUB_TOKEN
notion_api_base_url: https://api.notion.com
notion_api_version: 2026-03-11
comment_delete_policy: flag
setup: pending
notion_row: https://app.notion.com/p/worker-claude-skills-sync-3c598c21126881d19f5cc792b153675b
notion_doc: https://app.notion.com/p/worker-claude-skills-sync-3c598c2112688183a722d15eb184bf7e
---

## 🚀 First run (setup)

Treat this as a first run when `setup: pending` remains in the frontmatter, when a required placeholder is still unfilled, or when the user has never invoked this Worker.

What it does: this Worker exposes agent-callable tools that compose skill documents from Notion pages, publish them to a Git repository, import repository documents back into Notion, and preview composed output without writing. It triggers only when an agent calls one of its tools and produces either a committed document, an updated Notion page, a structured operation result, or a read-only composed document.

Before use, the adopting user must supply:

1. A deployed copy of this Worker and its URL for `worker_url`.
2. A Notion workspace connection with access to the target skills data source and its row/body pages. Record the data source identifier in `notion_data_source_id`.
3. The credential name `SKILLS_NOTION_TOKEN` for the Notion access token. Supply the name only; let the platform inject the value.
4. A GitHub connection and the target repository owner/name for `github_repository`, plus the branch to use for `github_branch`.
5. The credential name `GITHUB_TOKEN` for a token that can read and write the target repository. Supply the name only; never paste the value into this file or chat.
6. The Notion API base URL and version if your deployment does not use `https://api.notion.com` and `2026-03-11`.

Walk through the placeholders one at a time in this order: `worker_url`, `notion_data_source_id`, `SKILLS_NOTION_TOKEN`, `github_repository`, `github_branch`, and `GITHUB_TOKEN`. Confirm each mapping back to the user, then have them save the filled values in their own copy of this file.

Until setup is complete, the Worker cannot reliably compose or publish documents because it does not know which Notion data source, repository, branch, or access configuration to use.

Smoke test one call:

- Tool: `dryRunCompose`
- Input: `{ "pageId": "<your-row-page-id>" }`
- Expected return shape: a string containing valid frontmatter followed by the composed Markdown body. The call must not write to Notion or GitHub.

When the smoke test passes, record completion by changing the frontmatter line to `setup: complete` so later runs skip directly to the tool surface.

## 🧰 Tool surface

### `pushToGitHub`

Purpose: compose a `SKILL.md` from a changed Notion skill row or body page and write it to the configured Git repository.

Inputs:
- `pageId` (string) — the Notion row page identifier or URL, or the body-page identifier or URL.

Returns: an object with this shape:

```json
{
  "slug": "string",
  "action": "created | updated | noop | conflict | comment-blocked",
  "detail": "string | null",
  "issueUrl": "string | null"
}
```

`issueUrl` is populated when the operation reports a conflict or a comment-protected change.

### `pushToNotion`

Purpose: read a repository `SKILL.md` and update the matching Notion row and body page using the document's mapping and metadata.

Inputs:
- `path` (string) — repository-relative path to the changed document, such as `skills/<slug>/SKILL.md`.

Returns: an object with the same shape as `pushToGitHub`: `slug` (string), `action` (`created | updated | noop | conflict | comment-blocked`), `detail` (string or null), and `issueUrl` (string or null).

### `forcePushToNotion`

Purpose: replace a matching Notion body wholesale from a repository `SKILL.md` and refresh the stored snapshot. Use this only for migration or repair when a targeted update is insufficient.

Inputs:
- `path` (string) — repository-relative path to the document, such as `skills/<slug>/SKILL.md`.

Returns: an object with the same result shape: `slug` (string), `action` (`created | updated | noop | conflict | comment-blocked`), `detail` (string or null), and `issueUrl` (string or null).

### `dryRunCompose`

Purpose: read a Notion skill row or body page and return the composed `SKILL.md` without writing to either system.

Inputs:
- `pageId` (string) — the Notion row page identifier or URL, or the body-page identifier or URL.

Returns: a string containing the complete composed `SKILL.md`, including YAML frontmatter and Markdown body.

## ⚠️ Gotchas

- Use `dryRunCompose` before a material change when you want a no-write verification.
- `forcePushToNotion` replaces the body wholesale and can remove comment anchors; prefer `pushToNotion` for routine updates.
- Repository paths are relative to the configured repository and should point to a `SKILL.md` file.
- A `conflict` result means both sides changed since the last clean operation; resolve the source-of-truth decision before retrying.
- A `noop` result is successful and means the target already matches the composed content.
