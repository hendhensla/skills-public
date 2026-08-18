---
name: contact-upsert
skill: Contact Upsert — Update Existing People Before Creating New Ones
description: >-
  Keeps one canonical contact row per real person in your contacts database.
  Searches for an existing record before any create, then merges newer verified
  contact and engagement data into that row without dropping history.
category:
  - Automation
  - Reference
proficiency: Advanced
trigger: Agent
notes: >-
  Use during account research, org mapping, meeting prep, prior-engagement
  review, or outreach planning — any time a person should be represented in your
  contacts database. Core contract: upsert, never append blindly. Includes the
  two-surface rule for account intelligence tools: titles, functional roles and
  phone numbers come from the contacts table view, not the per-user entity query.
  This database is the primary title source for org mapping, so title,
  do-not-contact, DNC reason and lead-status hygiene are research dependencies.
setup: incomplete
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
   - `<your-gtm-dashboard-tool>` — the account/contact intelligence tool the agent may query
     for titles, phone numbers, and engagement counts, plus the names of its two contact
     surfaces (a per-user entity lookup and a contacts table view) and the rep identifier it
     expects.
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
   contact, so it should stop instead. Without the GTM dashboard tool and its contacts-table
   surface, it must not assert that a title or phone number is unavailable.
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

## Where titles and phone numbers come from

> **Gotcha.** Account intelligence tools usually expose more than one contact surface, and
> they rarely overlap. Assuming the tool "does not carry titles" is a common and expensive
> mistake: it writes "title unknown" across account pages while titled contacts sit in a
> second surface of the same tool. Verify which surface holds which fields, and record the
> date you verified it.

Query **both** surfaces of `<your-gtm-dashboard-tool>` before you write or blank a title or
phone number.

| Surface | How to call it | What it returns | Titles? |
| --- | --- | --- | --- |
| User entities | Entity query, filtered by assigned email, entity type "user" | Email, account, fit score, intent score, account priority, engagement counts | No |
| Contacts table view | Table-view query with page type "contacts" | Job title, functional role, direct phone number, contact type, contact source, sophistication score, country of use, fit and intent, last touch type and date, email, meeting and call counts, 7/28/90-day activity, product-AI usage, open-opportunity flag, signal count | Yes |

**The call that returns titles**

- Surface: the contacts table view of `<your-gtm-dashboard-tool>`.
- Page type: `contacts`.
- Rep identifier: the rep whose book is being read.
- Column filter: one entry on the account-name column, with the account name as a plain string.
- Sort: fit score, or combined fit-and-intent score, descending.
- Page size: check the tool's maximum (commonly 100). Page through results whenever the
  filtered row count is higher, and check any truncation flag before you trust a count.

**Fields the contacts view returns that the user-entity surface does not**

Job title, functional role, phone number, contact type, contact source, sophistication
score, recent country of use, last touch type, last touch date, days since last touch,
total emails, total meetings, total recorded calls, 7/28/90-day active flags, recent
product-AI usage flags, open-opportunity flag, signal count, top signal label.

**Rules for this skill**

1. Run the contacts-view query for the account before any create, and before writing
   "title unknown" on an existing row. Record the date checked.
2. Match the contacts-view row to a contacts-database row on normalized email first. Never
   match on display name alone, because display names in these surfaces are often a first
   name, a truncated string, or the raw email.
3. Copy title and phone into your contact row only when the email matches. Cite the
   contacts view and the date read.
4. Keep the previous title in notes as a dated entry when it differs. Report the difference
   rather than silently replacing a described remit with a formal title.
5. Contact source tells you what the row is: a CRM-only contact with no product usage is
   not the same as a real product user. Do not set relationship status from that value.
6. Do not create a row from a contacts-view record whose email domain does not match the
   account. Report it as a data fault in the source tool instead.

## Downstream consumers and field hygiene

Treat this database as the primary title source for org mapping. Other skills read it before
they fall back to `<your-gtm-dashboard-tool>`, so these fields are research dependencies, not
cosmetics.

1. Keep the title field populated. Downstream org maps read this column first and fall back
   to the contacts table view second.
2. Downstream readers usually filter by email domain, for example
   `substr("Email", instr("Email", '@') + 1) = '<account-domain>'`. A row with a personal or
   wrong-domain email is invisible to that filter, so correct the email or set the account
   relation explicitly.
3. Do-not-contact and DNC-reason fields must stay accurate. Every map and outreach plan
   excludes flagged rows by name, so a stale flag creates real risk.
4. A lead status of "disqualified" is not a delete. Keep the row and keep the title, and let
   the reader exclude it.
5. When you classify a person by function, read the whole title. Specific phrases such as
   partner, channel, alliance, public sector, enablement and operations beat generic
   engineer, product and data.

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
- Title and phone are available from the contacts table view of `<your-gtm-dashboard-tool>`.
  Query it first. Never leave title blank or unknown on the assumption that the tool does
  not hold titles, and never claim a title is unavailable without naming the surface
  queried and the date.
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

- Do not create a contact before completing all identifier searches, including the
  contacts-view query for that account.
- Do not state that a field in `<your-gtm-dashboard-tool>` is unavailable until both of its
  contact surfaces have been queried.
- Do not create a second person because a title, team, or account relation changed.
- Do not replace relation history with only the newest source.
- Do not label either side as nonresponsive without directional evidence.
- Do not send outreach, change account ownership, or delete/merge rows under this skill.
