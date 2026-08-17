---
name: external-notion-workspace-setup
skill: External Notion Workspace Setup
description: >-
  Turn customer requirements into a controlled API-built demo workspace with
  synthetic data, access planning, and readiness checks for code-based setup.
category:
  - Research
  - Automation
  - Notion
proficiency: Advanced
trigger: Manual
notes: >-
  Use an API-first execution path. Prefer the approved target-workspace API or
  Worker as the default build path. Treat the canonical code-based-setup guidance,
  the installed CLI runtime, and the team's code-based-setup discussion channel as
  required update sources on every run. Separate confirmed shipped behavior from
  proposals or unmerged work, then classify the CLI runtime as unavailable,
  authoring ready, or apply ready. Continue with the API path whenever the CLI path
  is not apply ready.
setup: incomplete
---

## 🚀 First run (setup)

Treat this as a first run when no `setup: complete` line is recorded in this file, when any
`<...>` placeholder below is still unfilled, or when the user has never invoked this skill.
Run setup before writing anything into a target workspace.

1. **Explain the skill in two or three sentences.** Tell the user this skill turns verified
   customer requirements into a customer-specific demo environment built through an approved
   workspace API or Worker: it ranks use cases, designs a small connected database model with
   synthetic data, builds a customer container, plans access, and verifies the result. It runs
   on request when preparing a customer demo environment, and it produces a build brief, the
   built environment, a verified handoff, and Custom Agent ideas it does not implement.
2. **Collect the prerequisites the user must supply.** Never guess these.
   - `<your-target-workspace-id>` and `<your-target-workspace-name>` — the approved workspace
     every write must be confirmed against.
   - `<your-parent-anchor>` — the accessible teamspace or root page the customer container is
     created under.
   - `<your-workspace-api-or-worker>` — the approved typed tooling for page, database, schema,
     row, and permission operations, plus its documentation.
   - `<your-deployment-state-store>` — the state tool, page, or database that maps logical
     resource IDs to created resources.
   - `<your-conventions-doc>` — your customer-container, naming, and stable-resource conventions.
   - `<your-code-setup-channel>` — the discussion channel where code-based-setup releases,
     limitations, and gating are announced.
   - `<your-data-realism-policy>` — what customer data, if any, may be used instead of fully
     synthetic data.
   - The credential and environment variable **names** the tooling needs. Never ask for values,
     and never ask the user to paste a token into chat.
3. **Walk the placeholders one at a time.** Ask for one value, restate the mapping back to the
   user in plain language, correct it if wrong, then move on. Have the user save the filled
   values into their own copy of this file.
4. **State the limits until setup is complete.** Without a tooling result that identifies the
   approved target workspace, the skill must not perform any write. Without an accessible parent
   anchor it cannot create the customer container, and without a deployment-state store it must
   not create resources that could later duplicate or orphan a build.
5. **Record completion.** Change the frontmatter line to `setup: complete` and note the date,
   so later runs skip straight to the workflow.

## Purpose

Turn verified customer requirements into a customer-specific demo environment in an approved
target workspace. Build the smallest structure that proves the priority workflows.

## Required outcome

Produce all of these outputs:

1. A ranked list of two to four use cases.
2. A core database model with relations, properties, views, and realistic synthetic data.
3. A customer area in the target workspace with required top-level pages, databases, linked
   views, templates, and sample rows.
4. A verified handoff with links, assumptions, access status, and manual follow-up items.
5. Three to five Custom Agent ideas. Do not create or configure Custom Agents unless that is
   separately approved.

## Required inputs

Collect or resolve:

- Exact customer name, industry, and customer slug.
- Customer requirements from meeting notes, Notion pages, chat threads, email threads,
  research, or links supplied by the user.
- Demo audience, required workflows, and desired interaction level.
- Data realism level: fully synthetic, customer-inspired, or approved customer data.
- Target build location and accessible parent page or teamspace anchor in the target workspace.

Search named sources before asking questions. If key information is still missing, ask one
consolidated set of short questions.

## 1. Collect and validate requirements

1. Read the relevant meeting notes, transcripts, chat threads, email threads, Notion pages, and
   research.
2. Preserve source links for every important requirement.
3. Separate facts from inference. Label each item as `Verified`, `Assumption`, or
   `Open question`.
4. Group needs by user, workflow, decision, and outcome. Do not organize the build around
   features alone.
5. Do not move customer content into the target workspace when that would broaden access
   without explicit approval.
6. Do not copy secrets, credentials, private personal data, or production records into sample
   data.

## 2. Select the top use cases

Score each candidate from 1 to 5 on:

- Business value
- Demo clarity
- Fit for Notion
- Data readiness
- Ability to show an end-to-end workflow

Choose two to four use cases. For each one, define:

- Primary user
- Current problem
- Trigger or input
- Workflow steps
- Decision or output
- Success signal
- Required database records
- Known constraint

Prefer a small connected system over many isolated pages. Exclude a use case if it depends only
on a Custom Agent that cannot be created or tested in the target environment.

## 3. Design the core databases

Use one source of truth per business entity. Reuse relations instead of duplicating data.

For each database, specify:

- Name and purpose
- Title property
- Required properties and types
- Relations to other databases
- Primary views and filters
- Useful templates
- Number and type of sample rows

Place every source database on one `Core DBs` hub page. Put linked views on workflow pages. Do
not create separate copies of a database for each use case.

## 4. Design realistic dummy data

Create data that matches the customer's industry, operating model, and vocabulary while
remaining synthetic.

- Create 8 to 15 rows per core database unless the workflow needs another amount.
- Preserve valid relations between records.
- Include lifecycle variety, such as new, active, blocked, at risk, and complete.
- Include at least one clear demo story that crosses multiple databases.
- Mark invented companies, people, amounts, and events as sample data.
- Use real customer names or contacts only when the user approves that use.
- Never invent claims and present them as customer facts.

## 5. Approve the build brief

Before writing to the target workspace, show one compact build brief with:

1. Ranked use cases
2. Page map
3. Database model
4. Sample-data plan
5. Source list, assumptions, and open questions
6. Customer access plan

Ask for one approval to build. Do not ask for repeated approval after small, non-destructive
edits within the approved scope.

## 6. Connect to the target workspace

Use the approved workspace API or Worker as the default execution path.

1. Load the approved workspace tooling documentation and use typed tools for page, database,
   schema, row, and supported permission operations.
2. Run a read-only target check through the tooling. Confirm the workspace name and workspace ID
   match the approved target values. If no typed identity tool exists, use the approved
   read-only identity endpoint through the non-delete public API tool.
3. Load your conventions document only for customer-container, naming, and stable-resource
   conventions. Do not require code-based setup for an API build.
4. Use a raw public API tool only when no typed tool covers the required non-delete action. Use
   a fixed API path, validate the target workspace and customer root, and never send arbitrary
   external URLs.
5. Use a direct target-workspace connection only when the Worker cannot support an approved
   requirement. Never ask the user to paste a token into chat.

Before any write, require a tooling result that identifies the approved target workspace. Stop
on a workspace mismatch.

Treat the customer container as a teamspace or root page inside the target workspace. Do not
claim that this process creates a new Notion workspace. If teamspace creation is not enabled for
the API connection, require an existing accessible teamspace or parent-page anchor.

### Code-based setup capability and update check

At the start of every run, inspect the current runtime and check for product changes. Do not
rely on an earlier validation result, roadmap statement, or feature name.

Check these sources in order:

1. Run the CLI version command and the setup subcommand help. Treat the installed CLI as the
   authority for current commands and flags.
2. If a generated project exists, read its agent instructions file and its generated type
   definitions. Treat the generated types as the authority for supported resources, properties,
   and Markdown.
3. Search your team's code-based-setup discussion channel for the latest 30 days of confirmed
   releases, rollout changes, breaking changes, current limitations, and agent or AI-runtime
   support. Extend to 90 days only when the recent window has no relevant result.
4. Search that channel separately for permissions, groups, SCIM, workspace or teamspace
   settings, automations, buttons, export or serialization, public dry run, state behavior, and
   per-user versus per-workspace gating.
5. Read the relevant thread before using a result. Treat proposals, feature requests, planned
   work, screenshots, and unmerged pull requests as signals only. Confirm executable behavior
   against merged code, current CLI help, the current generated types, or the maintained usage
   guide.

Record the check date, CLI version, lookback window, relevant message links, confirmed changes,
and unresolved proposals. If the discussion channel is unavailable or rate-limited, record that
the check is incomplete and continue with the API path. Do not let a missing channel result
block an approved API build.

Classify the runtime into one of these states:

1. `Unavailable`
   - No computer or terminal exists, the runtime is unavailable, the setup subcommand help
     fails, or a project cannot be scaffolded and built.
   - Record the failed check and continue with the API path.
2. `Authoring ready`
   - The current CLI exposes the project-creation, apply, list, and state commands.
   - A generated project can typecheck and build its compiled intents locally.
   - Read the generated project's agent instructions file and generated type definitions. Treat
     those current types as the source of truth for supported resources and Markdown. Do not
     guess that a primitive is supported.
   - This status allows local authoring and intent inspection. It does not prove that the target
     workspace can accept an apply.
3. `Apply ready`
   - Authoring is ready.
   - A secure isolated authentication context exists without exposing a token.
   - The CLI identity check returns the approved target workspace and its expected workspace ID.
   - Verify the current rollout model from the maintained guide and the discussion channel. At
     the most recent check, access was controlled by a per-user feature gate rather than a
     workspace-level opt-in. Do not assume that model remains unchanged.
   - The authenticated execution identity has the required current opt-in and the code-based-setup
     API accepts a request for the target workspace.

Keep the two execution surfaces separate:

- For an external customer build, use a generated CLI project, run the typecheck and build
  scripts, inspect the compiled intents file, then run apply against a named state keyed to the
  customer slug only when apply readiness is confirmed.
- Inside your organization's internal monorepo, use the canonical internal setup skill,
  generated external types, and the internal dry-run script runner. Do not use that internal
  runner for a customer deployment outside the monorepo.

Treat apply as a real write. The public apply command has no dry-run option. Build and inspect
intents first, confirm the target, and reuse the same named state. Stable resource IDs plus the
same state update mapped records. Deleting state causes a later apply to create fresh resources;
it is not a rollback mechanism or a general drift-reconciliation guarantee.

If the runtime is unavailable or only authoring ready, continue with the API path. If the
discussion channel describes permissions, settings, groups, SCIM, automations, export, dry run,
or another primitive as planned or in progress, keep that capability unavailable until the
current generated types or executable API confirm it. If the runtime is apply ready, begin the
separate code-based setup path and pause only for required secure authentication or other user
input. Do not switch an in-progress API deployment to code-based setup.

## 7. Build the customer environment

Use this default structure, then remove pages that do not support an approved use case:

```txt
<Customer> teamspace or root page
├── Overview
├── <Use case 1>
├── <Use case 2>
├── Core DBs
└── Demo Guide
```

Build rules:

- Use the customer slug as the stable deployment key.
- Give every page, database, view, template, and sample record a stable logical resource ID in
  the build manifest.
- Before creating a resource, read the deployment state and target parent. Reuse or update the
  mapped resource. Never rely on title matching alone and never create blindly on a retry.
- Keep a durable mapping from each logical resource ID to its Notion URL or ID, resource type,
  and schema version. If the Worker has no state tool, use an approved internal deployment-state
  page or database outside the customer-facing content.
- Use typed tools for pages, databases, schemas, views, and rows. Use the non-delete API tool
  only for approved gaps.
- Create all source databases on `Core DBs` and create linked, filtered views on the use-case
  pages.
- Add a stable sample-record key when synthetic rows may be reapplied. Update matching rows
  instead of creating duplicates.
- Do not use delete endpoints. Stop if a requested change would orphan an existing resource or
  invalidate the state mapping.
- Keep page names, database names, relations, and sample data consistent.

After the API build, fetch the created structure and verify page hierarchy, schemas, relations,
views, row counts, sample-data links, and deployment-state mappings.

## 8. Handle customer access safely

Use group-level access and inheritance when the required APIs are enabled.

- Prefer one permission group per customer environment or access policy.
- Attach the group to the customer root page or private teamspace once, then let child pages and
  databases inherit access.
- Use the least powerful role that supports the demo. Add page-specific grants only where a
  subtree must differ from its parent.
- If a group is SCIM-managed, manage its membership through the identity provider or SCIM. Do
  not rename, delete, or change its membership through the permission-group API.
- SCIM can provision members, restricted members, and groups. Do not treat it as an ordinary
  guest-invite API or a free-seat workaround.
- Guests cannot be teamspace members. For an ordinary guest, grant access at the customer root
  page only after the person exists in the target workspace. If the person does not exist,
  require a workspace owner to complete the invite or approval in the product.
- Use a restricted member only when the customer needs member-level capabilities and the seat,
  governance, and billing consequences are accepted.
- Check guest limits and workspace security policies before promising access.
- Do not promise full AI, connected-tool, or Custom Agent testing to an ordinary guest.

Before using access APIs, verify the exact target-workspace gates and integration capabilities
for:

- Permission-group listing, creation, and membership management
- Teamspace read, write, membership, and permission management
- Page-permission read, write, and inheritance handling
- SCIM provisioning when a synced group or restricted member is required

For an allowlist request, provide the workspace ID, integration identity, exact endpoints or
capabilities, customer root, test owner, expiry, audit expectations, and rollback plan.

Do not call undocumented or gated endpoints until the required capability and workspace gate are
confirmed. If an API is unavailable, provide the smallest manual owner action and continue the
rest of the build.

## 9. Provide Custom Agent ideas only

Do not create, configure, publish, or connect a Custom Agent unless separately approved.

Provide three to five ideas that use the databases and workflows already built. For each idea,
specify:

- Workflow and user
- Trigger
- Inputs
- Action
- Output
- Required page and database access
- Human review point

State that the ideas require separate agent setup and that guest access does not provide full AI
or agent testing.

## 10. Verify and hand off

Return a concise handoff with:

1. Customer container and top-level page links
2. Use cases built
3. Databases, views, and sample row counts
4. Assumptions and excluded scope
5. Permission-group, SCIM, guest, or restricted-member status and any manual owner action
6. Custom Agent ideas
7. Validation result and known gaps
8. API deployment key and deployment-state location
9. Code-based setup capability status, CLI version, sources checked, latest discussion-channel
   signals and links, and, only when enabled, its project location and state name

Do not report success until the created pages and databases have been fetched and checked.

## Stop conditions

Stop and ask for the smallest required action when:

- The Worker identity check does not show the approved target workspace.
- No approved parent page or teamspace anchor is accessible.
- Customer requirements are too weak to select a defensible use case.
- The requested sample data would expose sensitive or unapproved information.
- A guest limit, admin policy, missing API gate, or missing integration capability blocks
  required access.
- A logical resource ID or deployment-state change could duplicate or orphan an existing build.
- The user has chosen the code-based setup path and the CLI identity check does not show the
  approved target workspace.

Do not stop an API build only because code-based setup is unavailable.
