---
name: contact-upsert
skill: Contact Upsert — Update Existing People Before Creating New Ones
description: >-
  Keeps one canonical contact row per real person in your contacts database.
  Searches for an existing record before any create, then merges newer verified
  contact and engagement data into that row without dropping history.
status: Active
category:
  - Automation
  - Reference
proficiency: Advanced
trigger: Agent
notes: >-
  Use during account research, org mapping, meeting prep, prior-engagement
  review, or outreach planning — any time a person should be represented in your
  contacts database. Core contract: upsert, never append blindly.
setup: incomplete
notion_row: 'https://app.notion.com/p/dc73994da57c4bf887eb50c895507569'
---

## 🚀 First run (setup)

Treat this as a first run when no `setup: complete` line is recorded in this file, when any
`<...>` placeholder below is still unfilled, or when the user has never invoked this skill.
In that case, run setup before doing any contact work.

1. **Explain the skill in two or three sentences.** Tell the user this skill maintains one
   canonical row per person in their contacts database: it searches by email, then profile
   URL, then name-plus-corroboration before creating anything, and merges only verified,
   newer data. It runs whenever an agent workflow surfaces a person who belongs in that
   database, and it produces an updated or newly created contact row plus a written summary
   of what changed and why.
2. **Collect the prerequisites the user must supply.** Never guess these.
   - `<your-contacts-db>` — the database holding one row per person.
   - The property names in that database used for identity and enrichment: name, title,
     email, phone, profile URL, relationship status, notes, next steps.
   - `<your-prospect-accounts-relation>` — the relation used for new-business accounts.
   - `<your-customer-accounts-relation>` — the relation used for existing-customer accounts.
   - `<your-activity-relations>` — the relations that carry engagement history (emails,
     meetings, call transcripts, recordings, calendar events).
   - `<your-provenance-doc>` — the internal note describing where enrichment data (phone,
     intent) actually comes from, if the user has one.
   - The connections needed to read evidence: contacts database access, and optionally
     mail, calendar, call-recording, and CRM tools. Ask for credential and environment
     variable **names** only, never values.
3. **Walk the placeholders one at a time.** Ask for one value, restate the mapping back to
   the user in plain language ("phone lives in `Phone`, provenance doc is `<name>`"),
   correct it if wrong, then move on. Have the user save the filled values into their own
   copy of this file.
4. **State the limits until setup is complete.** Without the contacts database and its
   identity properties, the skill cannot search, cannot classify matches, and must not
   create or update any row. Without the account relations it can create an orphaned
   contact, so it should stop instead.
5. **Record completion.** Change the frontmatter line to `setup: complete` (and note the
   date) so later runs skip straight to the workflow.

## Purpose

Maintain one canonical contact row per real person. Before creating anyone, search for an
existing person and update that row with newer verified data, preserving useful history and
relations.

## Required inputs

- Person name and any known email or profile URL.
- Current account page and selected route: net new or existing customer.
- Dated source evidence for every changed field.
- Any meeting, email, opportunity, inbound, or prior-engagement context that should be related.

## Canonical database

- Database: `<your-contacts-db>`
- New-business account relation: `<your-prospect-accounts-relation>`
- Existing-customer account relation: `<your-customer-accounts-relation>`

## Upsert workflow

1. **Normalize identifiers.**
   - Email: trim whitespace and lowercase.
   - Profile URL: use the canonical form, strip query parameters and trailing slash, and
     treat equivalent URLs for the same profile as identical.
   - Name: normalize whitespace and punctuation for candidate search only; never treat a
     name alone as a unique identifier.
2. **Search before creating.** Query `<your-contacts-db>` in this order:
   1. Exact normalized email.
   2. Exact normalized profile URL.
   3. Exact or close name plus a verified matching account relation, title, company,
      meeting, or email.
3. **Classify the match.**
   - High confidence: one exact email or profile-URL match, or two independent
     corroborating identifiers.
   - Medium confidence: name plus verified company/account and matching role or activity.
   - Ambiguous: multiple plausible rows, conflicting identifiers, or name-only evidence.
4. **Choose the action.**
   - One high-confidence match: update the existing row.
   - One medium-confidence match: update only corroborated fields and note the evidence.
   - Ambiguous match: do not create or merge. Report the candidate rows and the field
     needed to resolve identity.
   - No candidate after all three searches: create one row, then attach the canonical
     account relation.
5. **Verify the result.** Re-read or query the affected row and confirm the canonical
   identifiers, account relation, and fields changed.

## Merge rules

- Never overwrite a populated field with blank, unknown, inferred, or older information.
- Prefer the most recent dated first-party or internal activity evidence over an undated source.
- Update name, title, email, phone, and profile URL only when identity and current
  employment are sufficiently verified.
- For provider-sourced fields, especially phone, read `<your-provenance-doc>` first. Record
  the provider and date named in the enrichment artifact, and never attribute a value to a
  data vendor unless that artifact names it.
- For account and activity relations (`<your-prospect-accounts-relation>`,
  `<your-customer-accounts-relation>`, `<your-activity-relations>`), union new relations
  with existing values; never drop unrelated history.
- Set "last meeting" and "last email" fields to the latest verified event only.
- Keep next steps concise, current, and owner-oriented. Replace stale next steps only when
  newer evidence supports the change.
- Preserve useful historical context in notes as a dated entry. Do not erase earlier
  evaluations, lost-deal involvement, or prior titles merely because a current title is found.
- Treat relationship status as current state, not seniority. Do not advance it without evidence.
- Update profile-connection status and date fields only when the action is directly verified.

## Account routing

**Net new account**

- Relate the person through `<your-prospect-accounts-relation>` to the exact current account.
- Search for an existing customer-account relation before creating a parallel account or
  person record.
- If an existing customer relationship is verified, switch to the existing-customer route.

**Existing customer account**

- Relate the person through `<your-customer-accounts-relation>` to the exact canonical
  customer account.
- Add the new-business relation only when your own pipeline workflow needs it and the
  company mapping is verified.
- Never create a duplicate contact merely because the existing row is attached through the
  other account relation.

## Historical engagement and response direction

- Search prior inbound or contact-sales requests, lost opportunities, trials, meetings,
  emails, and product activity.
- Preserve people whose status is historical, stale, superseded, or unverified when the
  record remains useful.
- Never infer who failed to respond.
- Claim that your own side did not respond only when dated routing, ownership, email,
  meeting, or CRM evidence shows an unanswered customer message or request.
- Distinguish "customer did not respond", "mutual pause", "continued engagement", and
  "unknown".

## Conflict handling

- If two rows appear to be the same person, do not delete or merge them automatically.
  Identify the likely canonical row and report the duplicate for review.
- If sources disagree on current employer, title, or identity, preserve the existing value
  and add a dated conflict note unless one source is clearly newer and authoritative.
- Do not attach a person to an account from domain similarity alone when consultants,
  investors, partners, or former employees are plausible.

## Required completion summary

Return:

- Existing rows updated: count and links.
- New rows created: count and links.
- Ambiguous or duplicate candidates: count, links, and the field needed to resolve them.
- Account relation used.
- Fields changed and strongest dated evidence.
- Any missed-follow-up claim and the evidence that proves response direction.

## Prohibited behavior

- Do not create a contact before completing all identifier searches.
- Do not create a second person because a title, team, or account relation changed.
- Do not replace relation history with only the newest source.
- Do not label either side as nonresponsive without directional evidence.
- Do not send outreach, change account ownership, or delete/merge rows under this skill.
