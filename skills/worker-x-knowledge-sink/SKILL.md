---
name: X Knowledge Sink Worker
skill: worker-x-knowledge-sink
description: >-
  Keeps sales-relevant posts from an authenticated X account in a Worker-managed
  Notion staging database for downstream promotion into an editable destination.
category:
  - Automation
  - Research
proficiency: Advanced
trigger: Scheduled
worker_url: <your-worker-url>
notes: >-
  Public playbook for a de-identified deployment. Credential names are
  documented, never credential values. This deployment exposes a scheduled
  database sync rather than an agent-callable tool.
notion_row: >-
  https://app.notion.com/p/worker-x-knowledge-sink-3c598c211268818285c1c7209df11347
notion_doc: >-
  https://app.notion.com/p/worker-x-knowledge-sink-3c598c21126881ff90bdd3887316a515
---

## 🚀 First run (setup)

Treat this as a first run when `setup: pending` is still recorded, when any placeholder is unfilled, or when the user has never invoked this skill.

This Worker keeps sales-relevant posts from an authenticated X account in a Worker-managed Notion staging database, where a separate publisher can promote new rows into an editable destination. It runs on its configured schedule and produces deduplicated staging rows with post text, source metadata, dates, and available media.

Before setup is complete, the adopting user must supply:

1. A deployed copy of the Worker in their own workspace, recorded as `<your-worker-url>`.
2. Their own Worker-managed staging database, recorded as `<your-staging-db>`, and an editable destination database, recorded as `<your-destination-db>`.
3. Their own downstream publisher or promotion tool, recorded as `<your-publisher>`, with permission to read the staging database and write the destination database.
4. The credential names used by their deployment — `X_CONSUMER_KEY`, `X_CONSUMER_SECRET`, `X_ACCESS_TOKEN`, `X_ACCESS_TOKEN_SECRET`, and optionally `X_USER_ID`. Store values only in the Worker's secure credential or environment system, never in this file, a repository, or chat.
5. A Worker-management connection or scheduler that can run a read-only deployment smoke test.

Walk through these mappings one at a time: Worker URL, staging database, destination database, publisher, then each credential name. Confirm each mapping back to the user and have them save the filled values in their own copy of this skill.

Until setup is complete, the deployment cannot read the authenticated account or write staging rows safely. An outside agent cannot call the scheduled sync directly; it must run through the Worker's configured scheduler or a permitted Worker-management connection.

Smoke test one read-only deployment inspection call. Expected return shape:

```json
{
  "workerId": "<your-worker-id>",
  "status": "active",
  "capabilities": [
    { "key": "<configured-sync-key>", "type": "database-sync" }
  ]
}
```

The inspection must not write rows. If the deployment is active and the configured database-sync capability is present, record completion by changing the frontmatter line to `setup: complete`.

## Purpose

Use this playbook to operate a scheduled X-to-Notion ingestion deployment without exposing personal names, workspace identifiers, database IDs, worker IDs, URLs, or credential values. The Worker keeps only posts that meet the configured sales-relevance rules, then upserts them into a staging database for a separate publisher to promote.

## 🚫 Agent-callable boundary

This deployment exposes no agent-callable tools. Its database sync is controlled by the Worker's scheduler or an authorized Worker-management connection; an outside agent must not assume it can invoke the sync or write to either database directly.

## 🔐 Authentication boundary

The deployment uses OAuth 1.0a user credentials for private, user-scoped X data. Keep these names stable in the deployment, but never reveal their values:

- `X_CONSUMER_KEY`
- `X_CONSUMER_SECRET`
- `X_ACCESS_TOKEN`
- `X_ACCESS_TOKEN_SECRET`
- `X_USER_ID` (optional)

OAuth 2.0 app-only credentials are not a substitute for user-scoped bookmark access.

## 🧭 Data contract

The staging row should preserve these outputs so the downstream publisher can map them into the destination database:

- **Name:** author, handle, and the first line of the post, clipped to 100 characters.
- **Summary:** the first 300 characters; retain the full text in the page body.
- **URL:** the canonical post URL and the deduplication key.
- **Date Written:** the post's publication date.
- **Status:** the destination's default draft state, chosen by the adopting workspace.
- **Internal/External:** external source classification.
- **Files & media:** an image or video from the post when available.
- **Body:** full quoted text, author and engagement metadata, source embed when supported, and media blocks.

## 🔎 Relevance rules

- Keep a post when it matches one strong sales term, or two weak terms with at least 120 characters of text.
- Apply an X-source tag plus relevant topic tags such as Sales, AI, Product, Market Research, or Miscellaneous.
- Keep the rules configurable in the adopting deployment; do not hard-code personal or employer-specific term lists into the public copy.

## ⚙️ Operating principles

- Use incremental upserts keyed by canonical post URL so retries update an existing row instead of creating duplicates.
- Persist the external pagination cursor and a frontier post ID; stop a later run when it reaches known content.
- Keep the staging database separate from the editable destination. Let the publisher handle deduplication and promotion.
- Never redeploy from an unrecovered or unverified source tree. Validate the source and manifest before changing a live deployment.
- Treat private bookmarks as sensitive user material. Do not republish them outside the adopting workspace without authorization.
- Keep page limits and run budgets below the platform timeout; a slow or oversized backfill can be retried automatically.

