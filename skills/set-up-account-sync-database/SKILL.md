---
name: "Set up an account sync database"
skill: set-up-account-sync-database
description: >-
  Build and hand off a one-way, Worker-managed account database for a sales
  owner, using a current source schema, secure credentials, idempotent upserts,
  validation gates, and optional views and enrichment fields.
category:
  - Automation
  - Notion
proficiency: Advanced
trigger: Manual
notes: >-
  Use this for a one-off account-book mirror in an adopting workspace. Keep the
  source of truth upstream, keep user-authored enrichment outside the managed
  schema, and document the no-delete limitation.
setup: pending
notion_row: >-
  https://app.notion.com/p/set-up-account-sync-database-3ca98c21126881abb7c3d110af31ef62
notion_doc: >-
  https://app.notion.com/p/set-up-account-sync-database-3ca98c211268811689a8d05ba777d578
---

## 🚀 First run (setup)

Treat this as a first run when no `setup: complete` marker is recorded, when a required placeholder remains unfilled, or when the user has never invoked this skill.

This skill creates a private, one-way account database for a named sales owner. It triggers manually, reads records from the user's approved source database, deploys or connects a Worker that keeps the target current, and produces a validated handoff with optional views and enrichment fields.

Before starting, the adopting user must supply:

1. The target user's confirmed workspace identity and work email.
2. The approved source account database and the person property used for ownership.
3. An accessible parent location for the target database.
4. A Worker deployment or connection with permission to create and update the target database, plus the credential and environment-variable names it requires.
5. The target database title and Worker name, or permission to use `<first-name>-account-sync` and `<First name> Accounts`.
6. The ownership scope: sales owner only, or an explicitly approved set of additional roles.
7. The supported chat model name, if this workflow requires one.
8. The secure secret key name `NOTION_API_TOKEN`, when the deployment reads Notion with the user's permissions. Supply the name only, never the value.

Walk through the placeholders one at a time. Ask for one value, restate the mapping, correct it if needed, and then continue. Have the user save the completed mappings in their own copy of this skill. Do not request a token in chat, a page, a file, or a terminal.

Until setup is complete, this skill cannot safely identify the source and target, create the Worker, request the hosted secret, run a preview, or write synchronized rows. After the mappings and permissions are confirmed, record `setup: complete` in the frontmatter so later runs skip straight to the workflow.

## Purpose

Create a one-off copy of a proven account-mirror pattern for the sales owner running the skill. Build a private Worker-managed database that mirrors the owner's account rows from an approved source database, then validate and hand off the result.

The source remains authoritative. The target is a one-way mirror: it does not write back to the source, and it does not authenticate to the source CRM directly when the upstream sync already supplies those records.

## Required operating model

- Use the Personal Agent's built-in Notion and Worker management tools.
- Load the current Worker-development guidance and the current source and reference target schemas before any Worker action.
- Use the approved source database, not a CRM connector or ad hoc query, when the source already contains the synchronized account records.
- Use the source page identifier as the stable primary key in a `Source Page ID` text property.
- Page through the complete matching source set with the source cursor and emit idempotent upserts.
- Run on the agreed schedule, commonly every 30 minutes.
- Do not add deletion behavior without explicit approval and a tested rollback plan. If an account leaves the owner's book, the target may retain a stale row; report that limitation.
- Keep sales-owner enrichment fields outside the Worker-owned schema so later syncs do not overwrite them.

## Required inputs and confirmation

Collect only what is needed:

1. The target user's confirmed workspace identity and email.
2. The source database URL or page, its schema, and the ownership property.
3. The Worker name and target database title.
4. The role filter. Default to the sales-owner property only; ask one short question if broader roles are requested.
5. The parent location for the target database.
6. Confirmation of the chat model when the runtime requires a particular model.

Before creating anything, show one compact confirmation containing the target user, role filter, names, schedule, upsert-only behavior, and stale-row limitation. Get one confirmation before the Worker is created.

## Notion access preflight

Use built-in Notion tools to verify:

- The current agent identity and workspace.
- Permission to create, deploy, and inspect Workers.
- That the target user resolves to exactly one workspace identity.
- That the source database and ownership property are accessible.
- That the target parent location is accessible.
- That the resulting database can be shared with the target user.

Do not accept a guessed ID or URL as proof. Stop and report the exact missing Notion capability or permission when a required preflight check fails.

## Exact architecture

1. Read the source database with the deployed Worker's hosted Notion credential.
2. Filter on the target user's person value. For a sales owner, use the sales-owner property unless the user explicitly approves more roles.
3. Page through every matching source row with the Notion cursor.
4. Emit one upsert per source page, using its UUID as both the change key and `Source Page ID`.
5. Return `hasMore` and the next cursor until the full source set is processed.
6. Run on the configured schedule with a full paginated upsert sweep.
7. Do not delete target rows automatically; report the stale-row behavior.

## Schema and field mapping

Mirror the current reference schema rather than inventing a generic CRM schema.

- Load the current source and reference target schemas before implementation; never rely on a stale hard-coded field list.
- Preserve compatible source types for title, text, number, checkbox, select, multi-select, date, URL, and people values.
- Set `Account Name` as the target title property.
- Add `Source Page ID` as rich text and enforce uniqueness in the Worker logic.
- Copy account identity, ownership, revenue, segment, renewal, tiering, seats, active users, AI usage, integrations, plan, health, risk, and employee fields when present in the current source schema.
- Flatten relations, formulas, and rollups that cannot be recreated safely. Related source page IDs may be stored as comma-separated text for activity, opportunity, meeting, task, request, document, or ticket fields.
- Do not create live relations from the private mirror into shared source databases unless the user explicitly approves that access model.
- Add writable enrichment properties only after deployment and keep them outside the Worker-owned schema.

## Execution workflow

### 1. Inspect

Use built-in Worker tools to read the reference Worker, its callable capability, required environment-variable names, managed database binding, health, and recent runs. Load the source and target schemas and record the mapping used.

### 2. Confirm the fork

Confirm the target user, ownership filter, Worker and database names, schedule, upsert-only behavior, and stale-row limitation. Do not create the Worker before this confirmation.

### 3. Scaffold and implement

Use the supported Worker starter and the built-in Agent Computer only. Read its current instructions, the synchronization guidance, the closest working example, and installed SDK types. Do not use an external coding tool or an outside implementation route.

Implement:

- One managed target database.
- One source query filtered to the target user's ownership value.
- Schema-derived field mapping.
- Cursor pagination.
- Idempotent upserts keyed by `Source Page ID`.
- A return value containing `hasMore`, the next cursor, and run counts.
- The agreed schedule and no-delete behavior.

Run the project check before deployment. Confirm the manifest has one managed database and one synchronization capability.

### 4. Deploy and configure the secret

Deploy the manifest through the built-in Worker tools. Only after the first successful manifest deployment, guide the target user through the platform's developer settings to create or locate a personal API token with the required Notion capability. The token must be created by the target user because it represents their permissions.

Request `NOTION_API_TOKEN` through the secure Worker-secret interface. Never accept, echo, log, store, or repeat the value. Do not use a chat paste, page property, file, `.env` entry, or terminal command as an alternative. Do not run a hosted write before the secret is stored and a preview succeeds.

A 401 or 403 preview result indicates an authentication or workspace problem. A healthy zero-row result usually indicates a permission or ownership-filter problem instead; report the cause, impact, and one next action.

### 5. Preview and validate

Before the first hosted write:

1. Preview the sync and compare its count with the filtered source count.
2. Inspect at least three rows covering different plans and account types.
3. Compare identity, owner, revenue, plan, usage, and source URL values.
4. Confirm every target row has a unique `Source Page ID`.
5. Confirm the schedule, health, access, and no-delete limitation.

Only after all gates pass should the Worker run the hosted synchronization.

### 6. Hand off

Share the target database with the target user, verify they can open it, and document the Worker, database, schedule, source count, preview count, sample results, health, access, and stale-row limitation. Report any remaining manual action with an owner.

## Post-setup interview

Run this only after deployment, validation, and access gates pass. Ask one short structured question before creating views or enrichment columns:

1. Which view types should be created?
2. Should the default account-count-by-tier chart be created? Create it unless declined.
3. Which additional enrichment properties should be added?

Do not create views or enrichment columns until the user answers. If enrichment is skipped, still create the approved views and the default tier chart.

### Suggested views

Keep the suggestion to five or fewer:

| Suggestion | Type | Purpose |
| --- | --- | --- |
| All Accounts | table | Full book, sorted by current revenue descending |
| By Tier | board | Group by the resolved tier property |
| Accounts by tier | chart | Count accounts by tier; default on |
| Revenue by tier | chart | Sum current revenue by tier |
| Renewals | calendar | Next renewal date |

Accept other supported view types when the user names them. Resolve the tier property in this order: account-book tiering, personal tiering, then ask the user. Create views on the managed target database only; never change the source database.

Default chart:

- Name: `Accounts by tier`
- Type: column chart
- Group by the resolved tier select property
- Aggregate by page count
- Keep empty tiers visible

If requested, add `Revenue by tier` as a second column chart that sums `Current Revenue`.

### Enrichment properties

Enrichment columns are user-authored and must not be part of the Worker-owned schema. Before asking, use the approved live account-insights table or entity lookup for the target user. Compare the live payload with columns already present, then show only fields that are not already available.

Offer these common fields first, adapting names to the live payload:

| Column | Type | Example source field |
| --- | --- | --- |
| Fit Score | number | `fitScore` |
| Intent Score | number | `intentScore` |
| Fit + Intent | number | `fitIntentScore` |
| Quadrant | select | `quadrant` |
| Wedge Tier | select | `wedgeTier` |
| Signal Count | number | `signalCount` |
| Top Signal | text | `signalTopLabel` |
| Last Touch | date | `lastTouchDate` |
| Pipeline Stage | select | `stage` or `furthest_stage` |
| Open Pipeline | number | `total_open_amount_usd` or `open_opp_iarr` |

Then offer additional fields such as plan tier, last-touch type, signal types, industry, revenue range, employee growth, total spaces, notes, or enrichment status.

Create only the selected properties. Match rows on the source account identifier, write selected values, and report fill rate against the live source count. If the live insights source is unavailable, finish the approved views and tier chart, then report enrichment as blocked with one next action.

Rules:

- Do not use CRM-specific direct queries when the upstream account sync owns that access.
- Select option names cannot contain commas; remove commas before creating options.
- Do not make `Fit + Intent` a formula.
- Blank coverage is allowed and should be reported honestly.
- Never write enrichment values into Worker-synced fields.

## Validation checklist

Do not call setup complete until:

- The implementation used the built-in Notion and Worker tools.
- No external login or implementation route was used or suggested.
- The project check passes.
- The manifest has one managed database and one synchronization capability.
- The hosted environment contains only the documented credential names and required secret, with no secret value in the skill or logs.
- The source query uses the approved source database and the target ownership filter.
- The preview count matches the filtered source count.
- Three sampled rows match identity, owner, revenue, plan, usage, and source URL.
- Every target row has a unique `Source Page ID`.
- The schedule is configured and reports healthy.
- The target user can open the database.
- The no-delete and stale-row behavior is documented.
- The post-setup interview ran after successful validation.
- The tier chart exists unless declined.
- Selected enrichment properties are user-authored and their fill rate is reported.

## Output

Return no more than five sections:

1. **Status:** Ready, Blocked, or Complete.
2. **Worker:** deployed reference, database key, sync key, and schedule.
3. **Database:** title, row count, primary key, access, views, and tier-chart status.
4. **Validation:** source count, preview count, samples, health, and enrichment fill rate.
5. **Next action:** one action with an owner, or `None`.

## Guardrails

- Keep all writes inside the approved Notion workspace and target parent.
- Never expose credentials in chat, files, logs, comments, or page content.
- Never use another person's private credential or session.
- Never add direct CRM authentication when the upstream source already provides the account data.
- Never run a hosted write before a successful preview.
- Never change the source database.
- Never add deletion behavior without explicit approval and a tested rollback path.
- Never broaden access beyond the target user and approved collaborators.
- Never add enrichment columns to the Worker-owned schema.
