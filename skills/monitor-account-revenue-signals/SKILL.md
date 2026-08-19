---
name: monitor-account-revenue-signals
skill: Monitor account revenue signals
description: >-
  Monitors already-researched accounts for material internal and external
  changes, updates only the affected research sections, rescores revenue
  viability when warranted, and leaves one concise comment per material change.
category:
  - Research
  - Analysis
  - Automation
proficiency: Advanced
trigger: Agent
notes: >-
  Maintenance companion to an initial account-research skill. Its defining
  behavior is restraint — when nothing material changed, it edits nothing and
  comments nothing. Designed for scheduled monitoring of a book of business.
  Includes a hiring re-check that treats competing tools named in new job
  postings as a material signal.
notion_row: >-
  https://app.notion.com/p/Monitor-account-revenue-signals-3c098c21126881f197c1c08a6c1af0ad
notion_doc: >-
  https://app.notion.com/p/Monitor-account-revenue-signals-3c098c211268810a81efc70534d0bbae
---

## 🚀 First run (setup)

Treat this as a first run when `setup: incomplete` is still in the frontmatter, when any
`<placeholder>` below is unfilled, or when the user has never invoked this skill.

Explain to the user, in two or three sentences: this skill re-checks accounts that already
have a research report, looks for evidence newer than the last review, and updates only the
sections that changed. It runs on a schedule or when a new usage, company, financial,
hiring, or people signal appears. It produces targeted edits to the existing report plus at
most one comment per account describing the material change.

Then collect the prerequisites, which only the user can supply:

- `<your-accounts-db>` — the database holding one row per account, each with a research
  report body.
- `<your-research-skill>` — the initial account-research skill or template whose section
  structure this skill must preserve.
- `<your-usage-source>` — where product usage, license utilization, and consumption or
  credit data lives (analytics tool, usage dashboard, or synced database).
- `<your-crm>` — the system of record for opportunities, segment, hierarchy, and ownership.
- `<your-signal-sources>` — external news, funding, earnings, leadership, and hiring
  sources the agent may read, including the account careers pages and public job boards it
  is allowed to check.
- `<your-competitor-list>` — your written list of competing tools and their aliases, plus
  which adjacent systems of record count as neutral, used by the hiring re-check.
- `<your-provenance-doc>` — your written rules for contact and intent data provenance, if
  you have one.
- Optional specialist agents: `<your-usage-analyst>`, `<your-signals-scout>`,
  `<your-org-mapper>`. Without them, this skill does the same gathering inline, just slower.
- Credential and connection **names only, never values**. Note the names of the connections
  the agent needs (for example your CRM connection, your analytics connection, your search
  connection) so the user can confirm each is authorized.
- `<your-score-fields>` — the exact property names for fit details, fit score, and proposed
  tier, plus any tier field the skill must never write to.

Walk through the placeholders one at a time. After each answer, restate the mapping back to
the user ("usage data comes from X"), then have them save the filled value into their own
copy of this skill. Until setup is complete the skill cannot identify accounts, cannot read
evidence, and must not edit or comment on anything.

When every placeholder is filled and confirmed, record completion by changing the
frontmatter line to `setup: complete`, so later runs skip straight to the workflow.

## 📖 Purpose

Maintain existing account research as evidence changes. Gather deltas, update only the
affected report sections, and do nothing when the decision did not change.

## 📥 Inputs

- The account row in `<your-accounts-db>` and its current report.
- Current score, tier, confidence, motion, critical unknowns, and last successful review
  date.
- The prior material-change log at the bottom of the report.

If no initial research exists yet, run `<your-research-skill>` first instead.

## ⚙️ Workflow

1. Confirm account identity with stable identifiers, not names alone.
2. Gather usage/expansion evidence and external signals in parallel (via
   `<your-usage-analyst>` and `<your-signals-scout>` if available), scoped to evidence
   newer than the last review date.
3. Map people and org changes (via `<your-org-mapper>` if available) only when a person,
   role, relationship, leadership, or buying-center signal changed materially.
4. Compare the compact findings against the current recorded decision.
5. If nothing material changed, make no edit and leave no comment. Stop here.
6. Otherwise update only the affected report sections, the source log, the review date, and
   the material-change log. Recalculate only the affected score dimensions and the total.
7. Write `<your-score-fields>` only when their values changed. Never write to a tier field
   owned by another team or process.

## 🚦 Materiality

A change is material when it can plausibly affect score, tier, motion, timing, stakeholder
plan, financial risk, renewal posture, expansion potential, confidence, next action,
services posture, or an audit flag.

Always treat these as material:

- License utilization crossing above 100%.
- Consumption or credits reaching or nearing the purchased maximum.
- A new purchase of consumption capacity, or material burn acceleration.
- A new or lost champion, executive sponsor, or blocker.
- A funding, earnings, restructuring, acquisition, leadership, or AI-program change with
  commercial impact.
- A competing tool named in a new job posting for the first time, or an existing competitor
  spreading to a second team.
- A duplicate, segment, hierarchy, ownership, or parent-opportunity change in `<your-crm>`.

## 🧲 Hiring re-check

1. Re-check the account's careers page and public job boards for roles posted or closed
   since the last successful review.
2. Quote the exact tool names in each relevant post and label each one competitor, adjacent
   system of record, or neutral, using `<your-competitor-list>` and its aliases.
3. Compare against the competitors already recorded in the report. Report only new tools,
   new teams, or a changed role volume.
4. Update the public-signal sections and the material-change log, and rescore expansion
   potential only when the hiring evidence changes the motion or the displacement call.
5. Keep scope at team level. A posting never proves seat count, deployment size, or spend,
   and a generic phrase such as "project management" or "wiki" is not evidence.

## 📤 Update contract

- Preserve the existing structure and previously validated claims.
- Append dated history rather than rewriting prior material-change rows.
- Cite the evidence behind every score change.
- Leave exactly one concise comment, in this shape:

> **Account research updated:** [material signal]. [Score or tier impact].
> [Recommended next action].

## ⚠️ Errors and guardrails

- Never put operational errors, stack traces, queries, or troubleshooting details into the
  report or any downstream dashboard. Write "Unknown" with the source and date checked, and
  keep raw errors in the agent chat.
- Comment only when a limitation blocked completion or could change the decision.
- Do not infer intent, identity, employment, or ownership from thin evidence.
- Do not contact prospects, modify opportunities, or remove prior evidence.
- Read `<your-provenance-doc>` before recording a change sourced from a third-party data
  provider. Provider company IDs rarely map one-to-one with CRM accounts, and a missing
  sub-account is a coverage gap, never evidence of no activity.
