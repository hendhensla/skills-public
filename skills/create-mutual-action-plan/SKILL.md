---
name: create-mutual-action-plan
skill: Create Mutual Action Plan
description: >-
  Research a deal and create a factual, co-owned Mutual Action Plan from a
  protected master template, then reference it from the internal sales-docs
  database.
category:
  - Research
  - Automation
proficiency: Advanced
trigger: Manual
notes: >-
  Hardened after a run left template rows in a duplicated plan. Requires a
  verified net-new duplicate, removal of every copied template row,
  chronological milestone sorting, and customer updates only on the customer's
  own plan.
setup: required
---

## 🚀 First run (setup)

Treat this as a first run when `setup:` above still reads `required`, any `<placeholder>`
below is unfilled, or the user has never invoked this skill. Run the setup conversation
before duplicating anything.

1. Explain the skill in two or three sentences: it researches a named deal, duplicates a
   protected master Mutual Action Plan template into a net-new customer-facing document, and
   fills it with verified outcomes, owners, dates, and an explicit decision point. It runs
   when a person asks for a MAP for a specific customer. It produces one customer-facing MAP
   plus one internal reference row, and it states facts only.
2. Collect the prerequisites from the user — names and links only, never credential values:
   - `<your-map-master-template>` — the protected master MAP page and its milestone
     database, which must never be edited.
   - `<your-customer-facing-workspace>` — the workspace where customer documents live, its
     connection name, and the workspace identity to verify before writing.
   - `<your-accounts-db>`, `<your-opportunities-db>`, and `<your-deal-hub-db>` — the account,
     deal, and hub records used to resolve an exact match.
   - `<your-sales-docs-db>` — where the internal reference row is created, plus its status
     option names and its relations to accounts and opportunities.
   - `<your-deal-research-checklist>` — your canonical research steps, and which sources are
     connected: meetings and transcripts, CRM, chat, email, call recordings, public web.
   - `<your-company-name>` — used in the customer-facing document title.
   - The names of any connections or credentials those tools require (names only); each
     person authenticates their own account.
3. Walk through the placeholders one at a time, restate each mapping back for confirmation,
   and have the user save the filled values into their own copy of this skill.
4. Until setup is complete the skill cannot verify the customer-facing workspace, duplicate
   the template, or write an internal record; it can only outline what it would gather.
5. When every placeholder is filled and confirmed, set `setup: complete` in the frontmatter
   so later runs go straight to the workflow.

## 🎯 Objective

Create a customer-facing Mutual Action Plan (MAP) as a co-owned, living plan with verified
outcomes, owners, dates, evidence, and an explicit decision point. State facts only. Do not
give selling advice or invent missing information.

## 📥 Required input

- Customer or account name.
- Optional target outcome, opportunity, or requested decision date.

## 🔌 Verify the customer-facing workspace connection

1. Check for the connection to `<your-customer-facing-workspace>`.
2. Verify its workspace identity is the intended production workspace before reading or
   writing.
3. If it is missing, tell the person how to add and authenticate the connection themselves;
   each person connects their own account.
4. Stop before creating the customer-facing document until the connection is verified.

## 🔎 Research the deal

1. Follow `<your-deal-research-checklist>`.
2. Resolve an exact account match in `<your-accounts-db>`. If multiple accounts match, ask
   which one to use.
3. Review related opportunities, deal-hub entries, sales docs, meetings, transcripts,
   account-owner pages, CRM records, chat, and email.
4. Use public-web information only when it materially clarifies the company or a named
   stakeholder, and label it as external.
5. Prefer the newest source for current status while preserving completed milestones.
6. Capture citations or supporting links for material claims.
7. Record unknown owners, dates, metrics, or approvals as open questions. Never infer that
   an action occurred or who performed it.

## 🧱 Create the customer-facing document

1. Always create a net-new document by duplicating `<your-map-master-template>`. Never edit
   the master, its milestone database, or another customer's document.
2. Before any edit, confirm the duplicate returned a new page URL different from the master.
   If duplication did not produce a new page, stop and report. Write only to that new page.
3. Rename the duplicate to **[Customer] & [Your Company] Mutual Action Plan**.
4. Remove every milestone row copied from the template so the new document contains zero
   data from the template customer or any other customer. Rebuild milestones from verified
   deal facts only.
5. Preserve the account-team introduction and the inline evaluation-path database structure.
6. Replace template-specific names, contact details, and copy with verified information for
   the selected account.
7. For later changes, update the customer's own MAP only. Never apply customer updates to
   the master template.
8. Keep customer-facing content free of internal quota commentary, sales tactics, unapproved
   pricing, internal cost data, private links, and unsupported claims.
9. Sort the evaluation-path timeline and table views ascending by target date unless the user
   asks otherwise.

## 🗺️ Populate the MAP

1. **What this is**: two sentences on the shared outcome and living-document expectation.
2. **Current state and desired outcomes**: customer-stated facts and measurable outcomes.
3. **Success criteria**: customer metrics, baseline when known, target, evidence source,
   measurement owner.
4. **Stakeholders**: named people on both sides, role, responsibility, confirmed
   involvement.
5. **Evaluation-path milestones**: phase, mutual owner, target date, status, supporting link,
   and notes beginning with `Done when:`.
6. **Decision point**: date, attendees, decision owner, and the exact question answered.
7. **Critical path**: technical validation, security, legal, procurement, commercial
   approval, signature, handoff.
8. **Operating cadence**: recurring checkpoint, attendees, purpose, expected output.
9. **Risks and open questions**: factual blockers, impact, owner, next validation step. Do
   not turn risks into sales strategy.
10. **30/60/90-day rollout**: only when the deal includes post-signature deployment or
    expansion planning.

## 📝 Reference the MAP internally

1. Create or update one row in `<your-sales-docs-db>` titled **[Customer] Mutual Action
   Plan**.
2. Set status to `Draft` unless the user confirms customer approval.
3. Relate it to the exact account and, when unambiguous, the relevant opportunity.
4. Link the customer-facing MAP prominently in the page body.
5. Do not create a duplicate row if one already references the same MAP.

## ✅ Validate before completion

- Workspace identity confirmed before writing.
- Master template unmodified.
- New document contains no data from the template customer or any other customer.
- Every active milestone has an owner, target date, status, and `Done when:` definition.
- Timeline view sorts ascending by target date.
- An explicit decision point exists.
- Claims are supported or marked as open questions.
- Customer-facing and internal information are separated.
- The internal sales-docs record points to the MAP and the exact account.
- Return both document links and state unresolved gaps.
- Provide a copy-pastable, comma-separated list of customer stakeholder emails in a code
  block and remind the user to share the document with them manually; the agent cannot add
  guests in the customer-facing workspace.
