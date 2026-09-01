---
name: maintain-deal-temperature-check
skill: Maintain deal temperature check
description: >-
  Keep a deal temperature-check artifact current inside an opportunity page:
  temperature badge, MEDDPICC plus 3 Whys scoring, a risk register with
  mitigations, and an append-only deal timeline.
category:
  - Analysis
proficiency: Intermediate
trigger: Agent
setup: required
notes: >-
  One artifact per opportunity, updated in place. Referenced by an
  opportunity-prep agent.
notion_row: >-
  https://app.notion.com/p/Maintain-deal-temperature-check-3c098c21126881128ccfcf7e7dfcdfba
notion_doc: >-
  https://app.notion.com/p/Maintain-deal-temperature-check-3c098c2112688150a9e4f91b14b3988a
---

## 🚀 First run (setup)

Treat this as a first run when no `setup: complete` line is recorded in the frontmatter, required placeholders are still unfilled, or the user has never invoked this skill.

This skill maintains a single deal-health artifact inside an opportunity page: a temperature badge, MEDDPICC plus 3 Whys scoring, a risk register, and an append-only timeline. It triggers when a deal event is logged or deal health is questioned, and it edits that one artifact in place rather than creating new pages.

Collect these prerequisites from the user, one at a time, and confirm each mapping back to them:

1. `<your-opportunities-db>` — the database or page collection holding opportunity records, and edit access to it.
2. `<your-temperature-template>` — the exact template for the four artifact sections, so structure is mirrored rather than reinvented.
3. `<your-evidence-sources>` — where linkable evidence lives: meeting notes, chat, email, CRM activity.
4. Stage and close-date fields on the opportunity record, used for the stage-versus-close-date check.
5. Any thresholds that differ from the defaults below, such as the days-dark limits.

Have the user save the filled values into their own copy of this skill. Until setup is complete the skill must not write: without the template it would invent a structure, and without evidence sources every status and risk would be unsourced, which this skill forbids. When the values are saved, add a `setup: complete` line to the frontmatter so later runs go straight to maintaining the artifact.

Maintain a deal temperature-check artifact in the body of an opportunity page. Use when logging deal events, scoring qualification, or judging deal health.

## 🧱 Artifact structure

Mirror your template exactly. Four sections, in order: Temperature Check, MEDDPICC + 3 Whys, Risk Register, Deal Timeline. One artifact per opportunity, updated in place. Never create a separate page.

## 🌡️ Temperature rules

- 🟢 Healthy: recent customer touch, next meeting booked, no open qualification gap that blocks the current stage.
- 🟡 Watch: one warning sign, such as 7 or more days without customer touch, no next meeting, or a thin MEDDPICC element the stage requires.
- 🔴 At risk: the deal going dark 10 or more days, a declined or cancelled meeting with no rebook, a close date within 14 days while key elements are Thin or Missing, or an explicit negative signal.
- Always show: the badge, a reason of two lines or less, days since last customer touch, next customer meeting yes/no with date, and a stage-versus-close-date check.

## 🧭 MEDDPICC + 3 Whys scoring

- Score each element Covered ✅, Thin ⚠️, or Missing ❌.
- Covered needs current, linked evidence; Thin means partial or stale; Missing means none.
- Never upgrade a status without new linked evidence. Downgrade when evidence goes stale or a signal contradicts it.
- Keep the 3 Whys to one line each: why do anything, why us, why now.
- Track the critical event: deadline, what drives it, consequence of missing it, and whether it is truly critical or merely compelling. A date without a consequence is compelling, not critical.

## 🚨 Risk register rules

- Add a risk only from linked evidence. Common risks: single-threaded champion, no economic buyer, going dark, competitor activity, slipping close date, procurement blockers.
- Every risk needs a concrete mitigation the owner can act on.
- Never delete a row. Set status to Mitigated or Accepted with evidence.

## 📅 Timeline rules

- Reverse chronological and append-only, newest on top.
- One line per event: date, event type, short factual summary, source link.
- Never rewrite or delete prior entries; add a correction entry instead.
- Log only real events with sources. Never infer that the owner took an action. Drafts are not events.

## 📏 General rules

- Facts only; every status, risk, and timeline entry needs a real source.
- Keep writing terse and plain.
- If nothing changed, make no edits.

