---
name: make-readout-business-review
skill: Stakeholder Readout
description: >-
  Build a concise, evidence-backed account or deal readout for a named
  stakeholder. Use account, meeting, pipeline, usage, and workspace evidence to
  show the current state, use cases, timeline, workspace inventory, blockers,
  and next steps in one scannable page.
category:
  - Writing
  - Research
  - Customer Scoping
proficiency: Advanced
trigger: Manual or agent request
setup: required
notes: >-
  Keep the readout audience-safe. Distinguish confirmed facts, current status,
  and unknowns. Include usage state, active-member metrics, and the complete
  workspace inventory when the configured sources provide them. Never invent
  owners, dates, seat counts, workspace names, or commercial facts when sources
  conflict. Do not use this skill for a business-priorities value case or an
  account point-of-view narrative.
notion_row: 'https://app.notion.com/p/Stakeholder-Readout-3ca98c2112688181b7f2e08cee33c33b'
notion_doc: 'https://app.notion.com/p/Stakeholder-Readout-3ca98c211268817baa1ec96671e07bd8'
---

## 🚀 First run (setup)

Treat this as a first run when `setup: required` is still recorded above, any placeholder
below is unfilled, or the user has never invoked this skill. Run setup before researching an
account or creating a readout.

1. Explain the skill in two or three sentences: it turns account, meeting, opportunity, usage,
   and workspace evidence into one concise readout for a named stakeholder. It runs when
   someone asks for an account, deal, business review, IT, stakeholder, or one-page readout,
   and produces a scannable page with the reader's asks, current state, usage, every workspace,
   use cases, timeline, and next steps.
2. Collect these prerequisites from the user, using names and links only, never credential
   values:
   - `<your-accounts-db>` or CRM account source for the account profile, contacts, linked
     users or workspaces, product usage, contracted seats, paid seats, active members,
     workspace count, and current account state.
   - `<your-workspace-source>` for account-to-workspace relationships and workspace metadata,
     including names, plans, member counts, activity, and workspace identifiers.
   - `<your-workspace-directory>` or an equivalent workspace inventory source to complete the
     list when the relationship source is shorter than the reported workspace count. It must
     support filtering to the account and excluding deleted or banned workspaces while
     retaining free and archived workspaces when applicable.
   - `<your-meetings-source>` for meeting notes and transcripts, including attendees, use
     cases, owners, decisions, and dates.
   - `<your-opportunities-db>` or CRM opportunity source for commercial dates, stage, seats,
     and other deal facts.
   - `<your-prod-readout-db>` or the production readout database where the canonical page is
     created, using the destination's one-page document type.
   - `<your-working-readout-db>` or the working sales-docs database where a copy is created,
     using the destination's account-strategy document type.
   - The connected tools, data sources, and credential or environment-variable names used to
     access those sources; provide names only, never tokens or secrets.
3. Walk through each placeholder one at a time, restate the mapping to the user for
   confirmation, and have the user save the filled values into their own copy of this skill.
4. Until setup is complete, the skill cannot reliably resolve an account, reconcile evidence,
   calculate usage, inventory every workspace, or file a readout. It can only explain the
   required inputs and output.
5. When every placeholder is filled and confirmed, change `setup: required` to `setup: complete`
   in the frontmatter so later runs go straight to the workflow.

## 🎯 Purpose

Turn account, meeting, opportunity, usage, and workspace evidence into one glanceable account
overview readout for a named stakeholder. The page must be scannable in under a minute. Always
include a usage-state section with active-member metrics and a complete workspace inventory when
the sources provide them.

## 📥 Required inputs

Identify these before research:

1. Account or customer name.
2. Audience and role.
3. What to highlight, especially the reader's next steps or asks.
4. Whether the stakeholder will read the page or the user will walk them through it.

If the audience is missing, ask one short question. Do not guess the reader.

## 🧭 Workflow

1. Complete a full account check before writing. Review `<your-accounts-db>` or CRM for the
   account profile, activity history, latest inbound and outbound activity, contact history,
   linked users and workspaces, product usage, and current opportunity status.
2. Capture usage state from the account source and its customer-account record: contracted
   seats, domain paid seats, people active in the last 7 days, people active in the last 28
   days or monthly active users, license utilization, AI monthly active users when available,
   and workspace count. Prefer these sources over guessed analytics queries. If numbers
   conflict, show both or stay qualitative.
3. Pull every workspace for the account. Use `<your-workspace-source>` with the account's
   workspace relationship filter. If that list is shorter than the reported workspace count,
   complete it from `<your-workspace-directory>` filtered to the account's domain or account
   key, excluding deleted and banned workspaces. Use the directory's canonical workspace
   names. Never invent workspace names. Retain free and archived workspaces when they are
   part of the account inventory. Sort the table by people active in the last 28 days, then
   members, descending. If an activity value is unavailable, record `Unknown`.
4. Pull meetings with the account name in the title from `<your-meetings-source>`. Load notes
   and transcripts for use cases, owners, attendees, decisions, and dates.
5. Reconcile findings with the account and opportunity records. Prefer meeting evidence for
   who said what. Prefer the account or CRM record for commercial dates and seat facts. If
   sources conflict, stay qualitative rather than inventing a number.
6. Write the one-page readout. Lead with the asks, then usage state, workspace inventory,
   use cases with who, timeline, and next steps.
7. File the canonical page in `<your-prod-readout-db>` and a working copy in
   `<your-working-readout-db>`. Do not leave either page only in chat.

## 📄 Output shape

One page. Use only these sections.

1. Top callout with this reader's asks for the week. Put user-specified next steps here first.
2. Four snapshot tiles: current commercial state, live use case, in-build use case, and blocker.
3. Usage state section. Required. Use the heading `Usage state` and a table with the columns
   `Metric`, `Value`, and `Read`. Include contracted seats, domain paid seats, people active
   in the last 7 days, people active in the last 28 days, license utilization, and workspace
   count. On a customer-readable page, use plain language rather than internal field names. If
   people active in the last 28 days exceed contracted seats, say so in the `Read` column.
4. Workspaces toggle. Required. Use a level-2 toggle heading, not a plain heading. Include the
   count in its title, for example `Workspaces (149)`. Inside the toggle, include one table of
   every workspace with the columns `Workspace`, `Plan`, `Members`, `People active last 28
   days`, and `Workspace ID`. If people active in the last 28 days is unavailable, leave that
   cell `Unknown`. Do not summarize the list, omit free or archived workspaces, or invent
   workspace names or identifiers.
5. Use cases table: Use case, Who, What we proved, Now.
6. Deal timeline table: When, What happened, Who. Keep only the events that change the story.
7. Next-steps table for this reader only. Highlight those rows.
8. Working-session closer: attendees, length, and the decision to leave with.

Use an emoji H2. Never use an em dash. Do not start the body with an H1 that repeats the
title. Give the page an icon.

## 🛡️ Audience rules

- If the named reader is a customer, write so they can see the page. Keep internal scores,
  forecast category, qualification gaps, health scores, and private politics out.
- Name people who were in the working sessions. Do not name internal opponents unless the user
  asks.
- Engineering, security, and IT rollout plans stay organic and owned by the customer. Do not
  propose a migration or rollout that the source meetings do not support.
- Distinguish confirmed facts, current status, and unknowns.
- Treat usage numbers as facts only when they come from the configured account or customer-
  account sources. Do not present health score, fit score, or forecast category as usage.
- Show the complete workspace inventory when the configured sources provide it. Keep workspace
  names and identifiers tied to source records rather than inferred from other fields.

## 📁 Filing

- Default destination: create the canonical customer readout in `<your-prod-readout-db>`.
  Set its document type to the destination's one-page option, its status to Draft, the author
  to the user running the skill, and the matching CRM account link.
- Also create a working copy in `<your-working-readout-db>`. Set its document type to the
  destination's account-strategy option, its status to Draft, the author to the user running
  the skill, and the matching account.
- If the account is ambiguous, ask before creating either page.
- After creation, give the user both page links. Do not dump the readout in chat.
- Do not delete either copy unless the user asks.
- Do not file a companion skill page. Keep this skill's instructions in the skill document.

## ⚠️ Avoid

- Skipping the account check.
- Writing a long memo instead of a one-pager.
- Putting internal deal hygiene in a customer-readable page.
- Inventing owners, dates, seat counts, workspace names, or identifiers when sources conflict.
- Omitting usage state, active-member metrics, or the complete workspace inventory when the
  configured sources provide them.
- Creating a second skill page outside the skill catalog.
- Presenting unknowns as confirmed facts.
