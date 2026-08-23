---
name: outreach-api-tools
skill: outreach-api-tools
description: >-
  Callable Worker tools for inspecting Outreach prospects, sequences, mailboxes,
  templates, and sequence states, plus enrolling, pausing, and resuming sequence
  states in an authorized Outreach account.
category:
  - Automation
proficiency: Advanced
trigger: Agent
notes: >-
  Tool surface only. The connected deployment uses per-user Outreach OAuth and
  exposes read operations plus guarded sequence-state actions. Use the live tool
  schemas as authoritative; never place OAuth values in this file.
notion_row: 'https://app.notion.com/p/outreach-api-tools-3c598c21126881d1a5ccd5defd7556ec'
notion_doc: 'https://app.notion.com/p/outreach-api-tools-3c598c211268819a8062e9855b3ad60e'
---

## 🚀 First run (setup)

Treat this as a first run when no `setup: complete` marker is recorded, when a required placeholder is still unfilled, or when the user has never invoked this skill. This Worker exposes callable tools for reading an authorized Outreach account and, when explicitly requested, managing sequence enrollment state. It triggers when an agent calls one of the tools and produces prospect, sequence, mailbox, template, or sequence-state data, or a guarded action result.

Before using it, the user must supply:

1. A deployed copy of this Worker in their own workspace and the agent connection that is allowed to call it: `<your-outreach-worker-connection>`.
2. Their own authorized Outreach account or workspace: `<your-outreach-account>`.
3. The OAuth connection or credential name required by the deployment: `outreachOAuth` (or the equivalent name in the adopting deployment). Supply the name only; never paste a token, client secret, or authorization value into the skill.
4. The live tool catalog from that deployment, because input schemas and return fields are deployment-specific and may evolve.

Walk through the placeholders one at a time. First confirm which connection maps to `<your-outreach-worker-connection>`, then confirm the authorized account maps to `<your-outreach-account>`, then confirm the credential name, and finally have the user save those mappings in their own copy of this file. Until setup is complete, the skill cannot safely read Outreach data or change sequence state; do not guess a tool schema or target account.

### Smoke test

Call `listOutreachSequences` with an empty object:

```json
{}
```

Expected return shape: an object containing selectable sequence collections such as `owned` and `createdByMe`, plus an optional `needsReauth` indicator. If `needsReauth` is true, reconnect the user’s Outreach account before making further calls. Do not enroll, pause, or resume anything during the smoke test.

When the smoke test passes, record completion by changing the frontmatter line to `setup: complete` so later runs skip onboarding.

## Purpose

Provide an agent-callable surface over an authorized Outreach account. Use read tools to find and inspect prospects, sequences, mailboxes, templates, and sequence states; use action tools only after the target record is unambiguous and the user has explicitly approved the requested change.

## Tool surface

The live deployment schema is authoritative. Pass only fields shown by the connected tool definition, preserve the declared types, and treat returned fields as opaque records unless the tool documents them.

### `outreachWorkerInfo`

Purpose: report deployment and capability metadata so an agent can confirm the connected Worker surface.

Inputs: none; pass `{}`.

Returns: an object containing Worker status and capability metadata.

### `listOutreachTemplates`

Purpose: list available Outreach email templates.

Inputs: none; pass `{}`.

Returns: an array or catalog object of template records, including each template’s identifier and display metadata when available.

### `searchOutreachProspects`

Purpose: search prospects in the authorized Outreach account.

Inputs: a JSON object using the live schema; common fields are query or filter text (`string`, when supported) and a result limit (`number`, optional). Do not infer unsupported filter names.

Returns: a search result object or array of prospect records, with pagination or result-count metadata when provided.

### `getOutreachProspect`

Purpose: retrieve one prospect after its identifier is known.

Inputs: the prospect identifier field declared by the live schema (`string`).

Returns: one prospect record object, or a structured not-found or authorization error.

### `listOutreachSequences`

Purpose: list sequences the authorized account can select for enrollment.

Inputs: none; pass `{}`.

Returns: an object containing sequence collections such as `owned` and `createdByMe`, with an optional `needsReauth` indicator.

### `listOutreachSequenceStates`

Purpose: list enrollment and execution states for prospects or sequences.

Inputs: a JSON object using the live schema; identifiers and pagination controls, when exposed, are strings or numbers according to that schema.

Returns: an array or result object of sequence-state records, with links or status metadata when available.

### `listOutreachMailboxes`

Purpose: list mailboxes available for sequence actions.

Inputs: none; pass `{}`.

Returns: an array or catalog object of mailbox records, including identifiers and display metadata when available.

### `enrollOutreachProspect`

Purpose: create an active sequence state for one verified prospect in an existing sequence and selected mailbox.

Inputs: a JSON object containing the prospect, sequence, and mailbox fields declared by the live schema. The deployment validates the prospect email, sequence name, and mailbox before creating the state; any optional template or message fields must use the declared `string` types.

Returns: an action result object containing the created sequence-state record or link, selected prospect and sequence details, and any validation or duplicate-state error.

### `pauseOutreachSequenceState`

Purpose: pause an existing Outreach sequence state.

Inputs: the sequence-state identifier declared by the live schema (`string`), plus any optional reason or confirmation fields declared there.

Returns: an action result object containing the updated sequence-state status and any external record link or error details.

### `resumeOutreachSequenceState`

Purpose: resume an existing paused Outreach sequence state.

Inputs: the sequence-state identifier declared by the live schema (`string`), plus any optional fields declared there.

Returns: an action result object containing the updated sequence-state status and any external record link or error details.

## Workflow and safety

1. Start with a read-only lookup. Resolve the prospect and confirm the exact sequence and mailbox before any action.
2. Use only sequences returned by `listOutreachSequences`; never invent a sequence name or create a sequence through this surface.
3. Treat enrollment, pause, and resume as state-changing actions. Require explicit user approval immediately before the call and rely on the tool’s confirmation gate when present.
4. For one prospect, report the prospect identifier or email, sequence, mailbox, resulting state, and returned link. For multiple prospects, review each target and requested action separately before calling the tool for each one.
5. Stop on missing or ambiguous records, reauthorization requests, opt-out indicators, duplicate states, mailbox errors, or any validation failure. Report the blocker instead of retrying blindly.
6. Never expose OAuth tokens, client secrets, workspace identifiers, Worker identifiers, or connection internals in output.

