---
name: discovery-coach
skill: Discovery Coach
description: >-
  Prepares and coaches sales discovery: builds a call question plan, deepens
  pain, and runs demo, impact, and qualification questioning. Reads your own
  discovery resources page at run time so guidance stays current. Use for "prep
  discovery", "discovery questions", "disco prep", "demo questions", "impact
  questions", "qualify this opp", "is this a real opp", "coach my discovery".
category:
  - Research
  - Reference
proficiency: Advanced
trigger: Manual
notes: >-
  Uses the adopter's discovery resources when available and includes a reusable
  baseline question framework below so the playbook remains runnable without an
  internal source page.
setup: incomplete
notion_row: 'https://app.notion.com/p/Discovery-Coach-3c098c21126881a1bf55fdac3f255771'
notion_doc: 'https://app.notion.com/p/Discovery-Coach-3c098c21126881378f3adb9e9835ef46'
---

## 🚀 First run (setup)

Treat this as a first run when `setup: incomplete` is recorded, when any `<placeholder>` is unfilled, or when the user has never invoked this skill before.

What it does: this skill prepares and coaches sales discovery. It triggers manually when the user asks to prep a discovery call, go deeper on a stated problem, build demo or impact questions, or pressure-test whether an opportunity is real. It produces a call frame, what is already known, ranked gaps, a sequenced question plan quoted from the user's own question bank, a qualification read, and risks.

Prerequisites the user must supply — pointers and names only, never credential values:

- `<your-discovery-resources-page>` — the single page holding their question bank and questioning frameworks. This is the source of truth, read live on every run. Without it the skill has no questions to quote.
- The section names on that page, mapped to request types: pre-call planning, going deeper on a stated problem, demo questions, impact and value questions, qualification, plain-language phrasing, mid-stage call framing, and persuasion/deal posture. Section names differ per user, so record theirs.
- `<your-enablement-page>` — optional secondary source for broader pre-sales enablement.
- `<your-accounts-db>` — the CRM or workspace database holding account pages and prior notes.
- `<your-docs-db>` — the database where a discovery-prep doc gets created, plus the relation property that links a doc to an account.
- `<your-call-platform>` — the conversation-intelligence or meeting-notes source for prior call context, by connection name.
- `<your-security-answer-tool>` — where product security, compliance, and RFP questions get routed instead of being answered here.
- Connection or environment variable names for each source above, never their values.

Walk the user through each placeholder one at a time. Confirm the mapping back to them before moving on, and have them save the filled values into their own copy of this skill.

Until setup is complete, do not produce a question plan: with no discovery resources page you would be inventing questions instead of quoting a vetted bank, which is exactly what this skill forbids. Say that plainly and ask for the page. When every placeholder is filled and confirmed, set `setup: complete` in the frontmatter so later runs go straight to the workflow.

## 🧭 Purpose

Run discovery like a top rep. Use this skill to prepare for a discovery call, coach mid-call questioning, prepare demo and impact questions, or pressure-test whether an opportunity is real.

Trigger phrases: "prep discovery", "discovery questions", "disco prep", "demo questions", "impact questions", "qualify this opp", "is this a real opp", "coach my discovery".

## 📚 Reusable discovery framework

Use the adopter's mapped discovery source for local wording when it is available. If it is unavailable, use this embedded framework and label the questions as baseline rather than quoting a private source.

### Nine discovery areas

Cover goals, motivation, burning issues, success measures, requirements, capabilities, history, operating context, and participants. Only unresolved areas should create questions.

### Problem-deepening ladder

1. What is happening today, and who feels it?
2. How often does it happen, and what does it delay, cost, or put at risk?
3. What have they tried, and why did it not fully solve the problem?
4. What measurable change would make the problem worth solving?
5. What event or date makes the change important now?

### Impact and qualification prompts

- If nothing changes this quarter, what is the consequence?
- Which metric, workflow, or risk would prove improvement?
- Who owns the outcome, who uses the workflow, and who approves change?
- What must be true for a first workflow to be trusted in production?
- What is the next customer-visible step and by when?

### Call-framing loop

Open with the customer's goal, deepen the current problem, connect it to measurable impact, test whether a first workflow can be proven, and close on a mutually owned next step.

## 📚 Optional local source

When configured, load `<your-discovery-resources-page>` first and prefer its current wording for local terminology. If it is unavailable, do not claim to quote it; use the reusable framework above and disclose the limitation.

Map the request to the right section of that page:

| Request type | Section to use |
| --- | --- |
| Pre-call plan, what to discover | Role-specific discovery, sample question bank |
| Going deeper on a stated problem | The "problem shared → go deeper" ladder |
| Questions during or after a demo | Demo questions |
| Business impact, ripple effects, urgency | Impact questions, value and context questions |
| Is this a real opportunity | Qualification talk tracks |
| Natural, easy-to-answer phrasing | Plain-language question phrasing |
| Mid-stage call slide framing | "We need to, but, so" conversation overview |
| Persuasion and deal posture | Persuasion resources, top-seller attributes |

If a section named above no longer exists on the source page, use the closest current section and say which one was used.

Secondary source when the request is broader pre-sales enablement: `<your-enablement-page>`.

## 📥 Inputs

Required:

1. Account or customer name.
2. Call type: first discovery, follow-up discovery, demo, mid-stage, or qualification review.

Optional, gather without asking when available:

1. Prior notes: the account page in `<your-accounts-db>`, prospecting or AE notes, past meeting notes, and call-recording or email context from `<your-call-platform>`.
2. Attendees and roles.
3. Known pain, compelling event, or target metric.

If the account is ambiguous, ask one short clarifying question. If notes are missing, continue and mark the gaps as open questions.

## 🔧 Steps

1. Load the source page and the account context. State the scope used.
2. Classify the call type and pick the matching source sections.
3. Extract what is already known against the nine discovery areas: goals, motivation, burning issues, success, requirements, capabilities, history, context, participants.
4. Name the gaps. Only the gaps drive the question plan.
5. Select 8 to 12 questions from the mapped source when available; otherwise select from the embedded framework and tailor the wording to the known problem. Sequence them zoom out to zoom in, not as a checklist. Add follow-up probes for each expected answer.
6. Add one qualification test and one next-step or multithread question.
7. Flag risk: single threaded, no compelling event, no measurable target, or a prior failed attempt.

## 📤 Output format

Use this structure in chat unless a doc is requested.

1. Call frame: account, call type, attendees, one-line objective.
2. What we already know: 3 to 5 bullets, each tied to its source.
3. Gaps to close: ranked, 5 or fewer.
4. Question plan: numbered, grouped as Open, Deepen, Impact, Qualify, Next step. Each question gets one indented follow-up probe.
5. Qualification read: real opportunity, unproven, or weak, with the reason.
6. Risks and open questions: 3 or fewer.

Rules:

1. Prefer the mapped source page wording. If it is unavailable, use the embedded framework, label it as a baseline, and do not invent customer facts.
2. Never invent customer facts. Mark anything unverified as an open question.
3. Never state an action was taken by the user or anyone else unless a source shows it.
4. Keep the plan runnable in a 30-minute call.

## 📄 Doc output

If a doc is requested, create it in `<your-docs-db>`, set the account relation to the matching account, and add a relevant icon and cover.

## 🧪 Examples

Input: "Prep discovery for Acme, first call, 2 attendees from IT."
Output: call frame, known context from the account page, 4 gaps, 10 questions in the five groups, qualification read, 2 risks.

Input: "They said search is slow. Go deeper."
Output: the deepen ladder from the source page, applied to search, plus the metric and 90-day urgency probes.

Input: "Is this a real opp?"
Output: the qualification talk tracks, a read on cost of inaction, and the one question to ask next.

## ⚠️ Edge cases

1. Source page unreachable: proceed from the embedded nine-area framework, label the questions as baseline or unsourced, and note the limitation.
2. Renewal or expansion call: skip origin-story questions and lead with current-state value and ripple effects.
3. Technical or security-led call: keep discovery here and route product security, compliance, or RFP answers to `<your-security-answer-tool>`.
4. Attendee is not the decision maker: make the multithread question the primary next step.
5. Tool replacement call: before proposing a workspace or database in place of a ticketing or project tool, ask for historical record volume, retention needs, and whether items arrive from outside the team. Validate the target platform's row-count, retention, and intake limits before committing to the migration.

