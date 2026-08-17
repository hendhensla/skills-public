---
name: audit-account-book
skill: Audit account book
description: >-
  Audit the runner's owned account book for duplicate accounts, segment mismatches,
  and parent-child ownership risk, and write one findings row per account and issue
  type into a new run database.
status: Active
category:
  - Analysis
proficiency: Advanced
trigger: Manual
notes: >-
  Validated on a ~150-row account book. Verify the finding count independently and
  never claim an account will be reassigned as fact.
setup: incomplete
notion_row: 'https://app.notion.com/p/f4313c36c55f49659bc72d3fdfb0d76e'
---

## 🚀 First run (setup)

Treat this as a first run when no `setup: complete` line is recorded in this file, when any
`<...>` placeholder below is still unfilled, or when the user has never invoked this skill.
Run setup before auditing anything.

1. **Explain the skill in two or three sentences.** Tell the user this skill audits the account
   book they own for three risks — duplicate account records under other owners, segment
   classifications that conflict with employee count, and child accounts whose parent sits
   elsewhere — by joining a CRM export to their accounts database. It runs on request, and it
   produces a new findings database with one row per account and issue type, plus a verified row
   count. It reports reassignment *risk* with evidence, never as fact.
2. **Collect the prerequisites the user must supply.** Never guess these.
   - `<your-accounts-db>` — the authoritative account directory, and the name of its
     sales-owner property.
   - `<your-issue-accounts-schema-page>` — the reference findings database used only as the
     output data model.
   - `<your-run-template>` — the doc template each completed run is created from, and the
     default save location if the runner has a standing one.
   - `<your-crm-report>` — an account export containing account name, account owner, employee
     count or segment, and parent account, plus the CRM account ID if available.
   - `<your-segment-thresholds>` — the employee-count boundaries your organization actually
     uses for each segment.
   - The runner's own workspace user record, so ownership can be filtered exactly.
   - The connections needed to read the accounts database and the CRM export. Ask for
     credential and environment variable **names** only, never values.
3. **Walk the placeholders one at a time.** Ask for one value, restate the mapping back to the
   user in plain language, correct it if wrong, then move on. Have the user save the filled
   values into their own copy of this file.
4. **State the limits until setup is complete.** Without the accounts database and the runner's
   user record, the skill cannot scope the book and must not report findings. Without the CRM
   report it cannot detect parent-child risk or duplicates, and without your own segment
   thresholds it must not flag a segment mismatch at all.
5. **Record completion.** Change the frontmatter line to `setup: complete` and note the date,
   so later runs skip straight to the workflow.

## Required inputs

1. Identify the person running the skill and their workspace user record.
2. Ask for a CRM account report that includes account name, account owner, employee count or
   segment, and parent account.
3. Use `<your-accounts-db>` as the authoritative account directory.
4. Use `<your-issue-accounts-schema-page>` as the output schema reference.

## 📍 Destination

- Ask one short question to choose the save location before creating output, unless the runner
  has a standing destination.
- Every completed run creates a new output doc from the run template.
- Use the reference findings database only as the data model. Never write run output into the
  reference database.
- Create a new owned findings database inside the new output doc, matching the reference
  database's properties, types, options, relations, rollups, view fields, and sorting.
- A summary or CSV may supplement the run database, but cannot replace it.
- Create all finding rows before declaring the run complete, then verify the row count against
  an independently calculated total.

## Audit workflow

1. Filter the accounts database to records where the sales-owner property contains the runner.
2. Join the CRM report to the accounts database by CRM account ID first, then normalized exact
   account name. Never infer ownership from names alone.
3. **Duplicate accounts**: another account record represents the same company under a different
   owner. Prefer matching CRM ID, website/domain, or exact normalized name. Record the other
   owner and the evidence.
4. **Segment issues**: flag runner-owned records whose segment classification conflicts with
   employee count. Record employees and employee segment, and use the segment thresholds defined
   by your own schema or report rather than assumed ones.
5. **Parent-child risk**: for every non-empty CRM parent account, flag the child as potentially
   reassignable. Match the parent to the accounts database when possible and record parent owner,
   employee count, and segment. If no parent record exists, say so rather than guessing.
6. Deduplicate output by account plus issue type. Never create a second row for an existing pair.

## 🗃️ Required output database

One row per account + issue type:

- `Account`: title; child or runner-owned account name
- `Issue Type`: select with `Duplicate account`, `Segment review`, `Parent Account`
- `Reason`: text; concise evidence and why the account is at risk
- `Employees`: number; relevant account or parent employee count
- `Employee Segment`: select; only when confirmed
- `Account Record`: one-way relation to the runner-owned account record
- `Parent Account`: one-way relation to the matching duplicate or parent record when available
- `Other Owner`: text; other record or parent owner name when available
- `Audit Date`: date; run date
- `Source`: text; source workbook or report name

Use a table view that displays all fields and sorts by issue type, then account. Never combine
multiple issue types in one row. Query the finished database and confirm its row count equals the
independently calculated finding count.

Never state that an account will be taken as fact. State that it is at risk of reassignment and
name the evidence.
