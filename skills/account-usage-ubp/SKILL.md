---
name: account-usage-ubp
skill: Analyze account usage and consumption
description: >-
  Builds a verified account snapshot of users, AI adoption, and consumption
  (usage-based) billing health, maintains the account's filtered usage
  dashboard, and returns a compact expansion assessment.
category:
  - Analysis
  - Automation
proficiency: Expert
trigger: Agent
notes: >-
  Row-first fast path: trust dated account-row metrics, verify only what is
  missing, stale, commercially important, or self-contradictory. Returns a
  bounded users/AI/credits handoff plus an account-filtered dashboard.
setup: required
---

## 🚀 First run (setup)

Treat this as a first run when `setup:` above still reads `required`, any `<placeholder>`
below is unfilled, or the user has never invoked this skill. In that case, stop before
doing any analysis and onboard the user.

1. Explain the skill in two or three sentences: it produces a verified usage snapshot for
   one customer account (seats and active users, AI adoption, credit burn), writes one
   snapshot row per account per day, keeps an account-filtered usage dashboard current,
   and hands back a short expansion read. It runs when an agent or person asks for an
   account's usage or credit picture, and it produces a snapshot row, a dashboard, and a
   sub-400-word handoff.
2. Collect the prerequisites from the user — names or links only, never credential values:
   - `<your-accounts-db>` — the account of record with seats, active users, AI, and
     billing fields.
   - `<your-usage-snapshots-db>` — where dated snapshots are appended (one row per
     account per snapshot date), with a relation back to `<your-accounts-db>`.
   - `<your-analytics-source>` — the product-analytics tool or warehouse used to verify
     metrics, plus any metric catalog it exposes.
   - `<your-crm>` — for contract seats, renewal date, and account IDs.
   - `<your-workspace-admin-source>` — optional, for workspace, user, and agent fields the
     other sources cannot resolve.
   - The identifier fields you match on, for example `<crm-account-id>` and
     `<tenant-or-workspace-id>`, plus the names of any credentials or connections those
     tools require (names only).
3. Walk the user through one placeholder at a time, read the mapping back for
   confirmation, and have them save the filled values into their own copy of this skill.
4. Until setup is complete this skill cannot verify any metric, write snapshots, or build a
   dashboard; it can only describe what it would collect.
5. When every placeholder is filled and confirmed, set `setup: complete` in the
   frontmatter so later runs go straight to the workflow.

## 📖 Purpose

Produce a verified account-usage snapshot without pulling in unrelated company research.
Maintain the shared snapshot data in `<your-usage-snapshots-db>` and the account's
filtered dashboard. Return only the metrics and implications the requesting agent or
person needs.

## 📥 Inputs

- The account's row URL in `<your-accounts-db>`.
- Account name, `<crm-account-id>`, internal account ID, and `<tenant-or-workspace-id>`.
- Prior snapshot date, when one exists.

Stop when company identity is ambiguous. Match on stable identifiers before names.

## 🔍 Source order and fast path

1. Read the current row in `<your-accounts-db>` and the latest matching row in
   `<your-usage-snapshots-db>`.
2. Treat current row metrics as the fast-path baseline when they are dated and internally
   consistent.
3. Query `<your-analytics-source>` only for metrics that are missing, stale, commercially
   important, or in conflict. Load the narrowest matching metric or metric definition and
   avoid broad schema exploration.
4. Use `<your-workspace-admin-source>` or `<your-crm>` only for workspace, user, seat, or
   agent fields that are still unresolved.

For a normal single-account run, make no more than three focused external queries before
returning a partial result. After a few minutes, stop widening scope and return verified
values plus explicit Unknowns. Never estimate a missing metric.

## ⚙️ Workflow

1. Record one as-of date per source and resolve conflicts toward the newest authoritative
   source.
2. Write at most one snapshot per account per snapshot date. Update the existing same-day
   row instead of creating a duplicate.
3. Store percentage properties as decimal fractions, where `1.0` equals 100%.
4. Ensure the account page contains exactly one linked database named
   "Account usage dashboard." Every view and widget must filter Account to the current
   account row. Update the existing linked dashboard instead of adding another.
5. Leave prior snapshots unchanged so charts retain history.

### Mirrored-data integrity

When the account row mirrors another system, its activity fields can be stale. Treat these
patterns as conflicts, not facts:

- AI monthly actives higher than overall monthly actives.
- Monthly actives at 0 while lifetime AI actions are above 0.

In either case, verify the active-user metric in `<your-analytics-source>` before using it,
record the row values as reported rather than as truth, and set Data Quality to Partial.
Spot-check the whole book of accounts for these patterns periodically; in practice a
meaningful minority of rows trip at least one of them.

## 📊 Required metrics

**Users**

- Paid seats, monthly actives, daily actives, license utilization, seat penetration,
  contributor percentage, workspace count, and fragmentation.

**AI**

- AI monthly actives, AI weekly actives, AI users as a percentage of monthly actives, AI
  actions over the last 7 and 28 days, published agents, agent runs, and unique agent
  users.

**Consumption / usage-based billing (credits)**

- Billing configuration, credits allocated, consumed, and remaining, remaining percentage,
  daily burn, projected exhaustion date, last credit purchase, and purchase count.

Write Unknown when a metric is unavailable.

## 🚦 Status rules

- **Red** — credits remaining at or below 10%, projected exhaustion before reset, license
  utilization above 100%, or a confirmed risk of agents being paused.
- **Yellow** — credits remaining at or below 20%, fast burn acceleration, or weak adoption
  heading into renewal.
- **Green** — healthy adoption with expansion capacity and no immediate control risk.
- **Unknown** — evidence is too incomplete for a status.

## 📤 Handoff contract

Return a compact bundle with:

1. Source as-of date and data quality.
2. Users summary with the three most decision-relevant metrics.
3. AI summary with the three most decision-relevant metrics.
4. Credit summary with burn and expansion risk.
5. Signals that fired.
6. Expansion implication.
7. Critical unknowns.
8. Snapshot and dashboard links.

Keep the handoff under 400 words. Do not return raw user lists unless the requesting agent
explicitly asks for them.

## ⚠️ Error handling

Never put tool errors, dispatch errors, stack traces, or troubleshooting detail into the
account report or dashboard. Write Unknown with the source and date checked, and keep raw
errors in the agent chat. Leave a short page comment only when the failure blocked
completion or could change the score, tier, or recommended motion.
