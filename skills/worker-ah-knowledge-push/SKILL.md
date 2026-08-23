---
name: Knowledge Intake Push Worker
skill: worker-ah-knowledge-push
description: >-
  Pushes a supported knowledge record into an adopting workspace's knowledge
  base while preserving its canonical source URL and full body Markdown.
category:
  - Automation
  - Notion
proficiency: Advanced
trigger: Agent
type: Worker
worker_url: <your-worker-url>
notes: >-
  Public playbook for a de-identified Worker deployment. It documents only
  the agent-callable push tool and keeps workspace-specific details private.
setup: pending
---

## 🚀 First run (setup)

Treat this as a first run when `setup: pending` is recorded, when a required placeholder is still unfilled, or when the user has never invoked this skill.

This Worker accepts one supported knowledge source and pushes it into an adopting workspace's knowledge base on demand. It preserves the canonical source URL and full body Markdown so retries can update the existing entry instead of creating a duplicate, and so the result remains auditable.

Before setup is complete, the adopting user must supply:

1. A deployed copy of the Worker in their own workspace, recorded as `<your-worker-url>`.
2. The source intake location, recorded as `<your-intake-db-or-doc>`, and the destination knowledge database, recorded as `<your-knowledge-db>`. The connected Worker must be authorized to read the source and write the destination.
3. The agent or connection that can invoke the Worker's `pushToAhKnowledge` tool, recorded as `<your-agent-or-connection>`.
4. Credential and environment-variable names from the deployed manifest, if any, recorded as `<your-credential-or-env-name>`. The source Worker record does not expose any third-party credential names. Record names only; keep all secret values in the Worker's secure credential or environment system, never in this file, a repository, or chat.

Walk through these mappings one at a time: Worker URL, intake location, destination database, invoking agent or connection, then each credential or environment-variable name. Confirm each mapping back to the user and have them save the filled values in their own copy of this skill.

Until setup is complete, the adopting agent cannot safely authorize the Worker, resolve the source and destination, or perform an idempotent knowledge upsert. Do not write directly to a Worker-managed or read-only destination database.

Smoke-test the deployed tool with a disposable fixture that contains a canonical source URL and full body Markdown. The documented semantic return shape is:

```json
{
  "ok": true,
  "operation": "created|updated",
  "sourceUrl": "<your-canonical-source-url>",
  "target": "<your-knowledge-page-or-row-reference>",
  "error": null
}
```

The source record does not expose the live deployment's exact argument names or response envelope, so confirm those names against the connected Worker tool definition before testing. When the fixture is created or updated successfully and the returned result identifies the source and destination, change the frontmatter line to `setup: complete`.

## Purpose

Use this playbook to push supported knowledge intake into your own knowledge base through a Worker-backed, on-demand upsert. Keep the canonical source URL and complete body Markdown as the stable identity and content contract.

## 🧰 Tool surface

### `pushToAhKnowledge`

Purpose: push one supported source into the adopting workspace's knowledge publishing path on demand, preserving the source URL and full body Markdown and updating an existing match rather than creating a duplicate.

Inputs (semantic contract; confirm exact argument spelling in the deployed manifest):

- `sourceUrl` (string) — canonical source URL and idempotency key.
- `bodyMarkdown` (string) — complete body Markdown to preserve in the destination entry.
- `sourceApp` (string) — source label used by the adopting intake workflow.
- `pushStatus` (string) — intake state indicating that the item is ready to be pushed, normally `Queued` in the adopting workflow.

Returns (semantic shape; the live response envelope may use different field names):

- `ok` (boolean) — whether the push completed.
- `operation` (string) — whether the destination entry was `created` or `updated`.
- `sourceUrl` (string) — the canonical source URL processed.
- `target` (string) — destination page or row reference when returned by the deployment.
- `error` (string | null) — error detail when the push does not complete.

## 🔒 Operating boundaries

- Use the Worker's callable tool for the upsert; do not write directly to a Worker-managed or read-only destination database.
- Require a canonical source URL before pushing. Treat it as the deduplication key.
- Preserve the full body Markdown and source attribution so the destination remains auditable.
- On retry, update the exact URL match rather than creating a second entry.
- Keep source and destination locations in the adopting workspace; do not place private source content in this public playbook.
