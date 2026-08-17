---
name: poc-success-criteria
skill: POC success criteria
description: >-
  Defines measurable proof-of-concept success criteria for a named customer,
  tied to their stated goals, with an owner, proof, and evaluation date for each
  criterion.
status: Active
category:
  - Analysis
proficiency: Intermediate
trigger: Manual
notes: >-
  /poc <customer> — pair with a deal-context skill to pull deal history and next
  steps before defining criteria.
setup: incomplete
notion_row: 'https://app.notion.com/727bc0aec3a54abe9258aa9eb1a04a45'
---

## 🚀 First run (setup)

Treat this as a first run when `setup: incomplete` is still in the frontmatter, when any
`<placeholder>` below is unfilled, or when the user has never invoked this skill.

Explain to the user, in two or three sentences: this skill turns a customer's stated goals
into a short, measurable set of proof-of-concept success criteria, each with an owner, the
evidence that proves it, and the date it will be evaluated. It runs on demand, when the user
types `/poc <customer>` or asks for POC criteria for an account. It produces a criteria list
only — it does not gather deal history or make product claims.

Then collect the prerequisites, which only the user can supply:

- `<your-accounts-db>` — where customer or account records live, so the named customer can
  be resolved to one record.
- `<your-deal-context-skill>` — the skill or routine that assembles deal history, stated
  goals, and next steps. This skill reads its output instead of re-researching.
- `<your-goals-source>` — where the customer's stated goals or business case are recorded
  (discovery notes, meeting notes, or the opportunity record). Without it, the user must
  paste the goals.
- `<your-poc-template>` — your team's POC or trial plan template and any required fields,
  if you have one.
- Connection names only, never values: note the names of the connections needed to read the
  account and notes (for example your CRM connection and your notes workspace) so the user
  can confirm each is authorized.

Walk through the placeholders one at a time. After each answer, restate the mapping back to
the user ("goals come from X"), then have them save the filled value into their own copy of
this skill.

Until setup is complete, the skill cannot resolve a customer name or ground criteria in
real goals, so it must ask for the goals in the prompt rather than inventing them. Never
guess database or field names.

When every placeholder is filled and confirmed, set `setup: complete` in the frontmatter so
later runs go straight to the workflow.

**Command:** `/poc <customer_name>`

## Use when

- Someone types `/poc <customer>` or asks to define POC success criteria for a customer.

## Do not use when

- Compiling full deal context (use `<your-deal-context-skill>`).
- Looking up product functionality (use your product-functionality skill).

## Required inputs

- Customer / account name.

## Steps

1. Define POC success criteria for the customer.
2. Tie each criterion to the customer's stated goals and to measurable outcomes wherever
   possible.
3. For each criterion, name the owner, the evidence that proves it, and the date it will be
   evaluated.

## Output

- A clear, measurable set of POC success criteria for the named customer.

## Related

- Run `<your-deal-context-skill>` first to pull full deal history and next steps.
