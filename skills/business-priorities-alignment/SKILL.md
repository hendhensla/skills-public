---
name: business-priorities-alignment
skill: Business Priorities Alignment Doc
description: >-
  Build a filled, customer-ready Business Priorities Alignment document for one
  account from a protected master template, mapping the value pyramid, a single
  primary business priority, the value bridge, the three whys, the initiative
  name, and a customer-ready readout from internal evidence, with each item
  marked heard directly or inferred and every evidence gap listed.
category:
  - Research
  - Analysis
proficiency: Advanced
trigger: Manual
notes: >-
  Evidence discipline is the point of this skill. Every value pyramid tier needs
  a named person, only one primary business priority is allowed, at least one
  quantified impact must come from a cited source, and anything unsupported is
  logged as a gap instead of guessed.
notion_row: >-
  https://app.notion.com/p/Business-Priorities-Alignment-Doc-3c198c21126881999f6de1939bc11137
notion_doc: >-
  https://app.notion.com/p/Business-Priorities-Alignment-Doc-3c198c2112688174be82e5644b1a9156
---

## 🚀 First run (setup)

Treat this as a first run when `setup:` above still reads `required`, any `<placeholder>`
below is unfilled, or the user has never invoked this skill. Run the setup conversation
before creating any document.

1. Explain the skill in two or three sentences: it resolves one named account, gathers
   internal evidence about that account, and fills a Business Priorities Alignment template
   into a customer-ready document. It runs when a person asks for a business priorities doc,
   a value pyramid, a value bridge, or the three whys for a specific account, usually before
   a discovery or executive call. It produces one filled document plus a short summary of the
   primary priority, the recommended first workflow, and the top evidence gaps.
2. Collect the prerequisites from the user — names and links only, never credential values:
   - `<your-business-priorities-template>` — the master template page, which must never be
     edited. Confirm its current section order, tables, and checkbox syntax.
   - `<your-docs-db>` — where the filled document is created, plus the exact option names for
     its type and status properties and its relations to accounts and opportunities.
   - `<your-accounts-db>` — the account records used to resolve an exact match, and
     `<your-opportunities-db>` if opportunity linking is expected.
   - `<your-account-research-hub>` — where account pages and prior research live.
   - Which evidence sources are connected and in what priority order: meeting notes and
     transcripts, `<your-call-recording-tool>`, `<your-crm>`, and prior account documents.
   - `<your-motion-names>` — the sales or solution motions your team selects between.
   - The author or owner name to stamp on the created document.
   - The names of any connections or credentials those tools require (names only); each
     person authenticates their own account.
3. Walk through the placeholders one at a time, restate each mapping back for confirmation,
   and have the user save the filled values into their own copy of this skill.
4. Until setup is complete the skill cannot resolve an account, read evidence, or create a
   document; it can only describe the evidence it would gather and the questions it would
   ask.
5. When every placeholder is filled and confirmed, set `setup: complete` in the frontmatter
   so later runs go straight to the workflow.

## 🎯 Purpose

Turn `<your-business-priorities-template>` into a filled, customer-ready document for one
account. The output must give the champion a story they can defend when your team is not in
the room.

## 📥 Required inputs

1. Account name. It must match one row in `<your-accounts-db>`.
2. Optional: opportunity, champion name, economic buyer, primary motion from
   `<your-motion-names>`.
3. Optional: source scope. Default scope is internal only.

If the account is ambiguous, ask one short question. Do not guess the account.

## 🔎 Evidence sources

Use internal sources by default, in this order:

1. The account page and account research in `<your-account-research-hub>`.
2. Meeting notes and transcripts for that account.
3. Call recordings and transcripts in `<your-call-recording-tool>`.
4. The account and opportunity records in `<your-crm>`.
5. Prior documents for that account in `<your-docs-db>`.

Ask before using web research or sources outside this list. Call out any source used outside
the requested scope, and say why it was used.

## 🧭 Steps

1. Resolve the account and collect the evidence above. Record the source of each fact.
2. Copy the body of `<your-business-priorities-template>`. Never edit the template page
   itself.
3. Create the document in `<your-docs-db>` with these properties:
   - Name: `<Account> Business Priorities Alignment`
   - Type: the business priorities option in `<your-docs-db>`
   - Status: `Draft`
   - Account relation: the matched account
   - Opportunity relation: the open opportunity, when one exists
   - Author: the owner running the skill
   - Icon and cover: pick both to match the account and the document purpose
4. Fill each template section. Keep the tables, the checkbox syntax, and the section order of
   the template.
5. Write the readout section and the recommended first workflow table.
6. Report the evidence gaps and the discovery questions that close them.

## ✅ Fill rules

- Give every value pyramid tier a named person with a title. A tier with no name is a gap,
  not a blank.
- Mark each tier `☑ Heard directly` only when a meeting note, transcript, email, or CRM field
  supports it. Otherwise mark `☑ Inferred`.
- Select one primary business priority. Do not select more than one.
- Quantify at least one business impact. Use a number that comes from the customer or from a
  cited internal source. Never invent a number.
- Write the desired state as an operating outcome, not as a product feature.
- Name the initiative in the customer's internal language. Do not name it after your product
  or after a rollout.
- Leave a field blank when no evidence exists, and list it in the gap list.
- Never present internal health scores, usage estimates, or uncertain user data as customer
  facing facts.
- Never state that a person took an action unless a source records that action.
- Write in plain English. Do not use em dashes.

## 📤 Output

Deliver the new document, then give a short chat summary with:

1. The primary business priority and its named owner.
2. The recommended first workflow and its success measure.
3. The top three evidence gaps.
4. The discovery questions that close those gaps.

## ⚠️ Edge cases

- Account not found in `<your-accounts-db>`: ask one short question, then stop.
- A document of this type already exists for the account: update that document and say so. Do
  not create a duplicate.
- No meeting notes or calls for the account: build the document from CRM records and account
  research only, mark every tier as inferred, and say the document is unvalidated.
- More than one open opportunity: ask which opportunity to link.
- The template changed: use the current template structure, not this list of sections.

