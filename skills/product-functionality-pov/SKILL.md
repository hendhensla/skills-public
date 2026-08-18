---
name: product-functionality-pov
skill: Product functionality POV
description: >-
  Looks up current product functionality and returns a point of view on what it
  does, whether it is being built, and when it launches, with the source and
  date behind every claim.
category:
  - Research
  - Reference
proficiency: Intermediate
trigger: Manual
notes: >-
  /function — only trust designated roadmap and announcement sources; call out
  anything outside them and treat it as unconfirmed.
notion_row: >-
  https://app.notion.com/p/Product-functionality-POV-3c098c21126881c4b4e8d51a722a0274
notion_doc: >-
  https://app.notion.com/p/Product-functionality-POV-3c098c2112688135bcc5db7245ebb709
---

## 🚀 First run (setup)

Treat this as a first run when `setup: incomplete` is still in the frontmatter, when any
`<placeholder>` below is unfilled, or when the user has never invoked this skill.

Explain to the user, in two or three sentences: this skill answers "what does the product do
today and what is coming" by reading only a fixed list of approved sources, then returns a
short point of view separating shipped behavior from planned behavior. It runs on demand,
when the user types `/function` or asks about functionality or roadmap status. It produces a
sourced, dated answer — never a customer-facing commitment.

Then collect the prerequisites, which only the user can supply. The whole value of this
skill is the source list, so it cannot run on defaults:

- `<your-roadmap-source>` — your official roadmap or release-planning pages.
- `<your-changelog-source>` — your product changelog or what's-new page.
- `<your-public-docs>` — your public help center and product documentation.
- `<your-announcement-channels>` — the designated internal announcement channels for
  product updates, AI announcements, company announcements, and engineering or project
  updates. Ask the user to name these explicitly; anything not on the list is unconfirmed.
- `<your-disclosure-policy>` — your rule for what roadmap information may be shared
  externally, if you have one.
- Connection names only, never values: note the names of the connections needed to read the
  above (for example your docs workspace, your chat connection, and web search) so the user
  can confirm each is authorized.

Walk through the placeholders one at a time. After each answer, restate the mapping back to
the user ("roadmap truth comes from X, and Y is not a source of truth"), then have them save
the filled value into their own copy of this skill.

Until setup is complete the skill has no sources of truth, so it must not answer
functionality or roadmap questions from model knowledge alone.

When every placeholder is filled and confirmed, set `setup: complete` in the frontmatter so
later runs go straight to the workflow.

**Command:** `/function`

## Use when

- Someone types `/function` or asks about current product functionality or roadmap status.

## Do not use when

- Compiling deal context (use your deal-context skill) or defining POC criteria (use your
  POC criteria skill).

## Steps

1. Look up current product functionality for what is described and return the latest POV:
   what the feature does, whether it is being built, and when it will launch (exact or
   approximate).
2. State the source and date behind each claim, and separate shipped behavior from planned
   behavior.

## Sources of truth

- `<your-roadmap-source>` — official roadmap and release-planning pages.
- `<your-changelog-source>` — product changelog or what's-new page.
- `<your-public-docs>` — public help center and product documentation.
- `<your-announcement-channels>` — designated internal announcement channels.

## Edge cases

- If you reference any other internal or external communication outside the designated
  sources, call it out and do not treat it with full confidence.
- Never present a roadmap date to a customer as a commitment.

