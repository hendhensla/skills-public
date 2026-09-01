---
name: epd-context-for-gtm
skill: EPD Context for GTM
description: >-
  Maps a prospect's engineering, product, and design org and its adjacent teams,
  then generates the right questions per function and at the seams between them.
category:
  - Reference
  - Research
proficiency: Advanced
trigger: Manual
setup: required
notes: >-
  Uses an adopter-provided EPD primer when available and includes a reusable
  EPD operating-model baseline so the playbook remains runnable without an
  internal source. Hand question sequencing and call structure to the adopter's discovery skill.
notion_row: 'https://app.notion.com/p/EPD-Context-for-GTM-3c098c21126881ab848febab125916cb'
notion_doc: 'https://app.notion.com/p/EPD-Context-for-GTM-3c098c21126881a799eed6658d5285e4'
---

## 🚀 First run (setup)

Treat this as a first run when `setup: incomplete` is still in the frontmatter, when any
`<placeholder>` below is unfilled, or when the user has never invoked this skill.

Explain to the user, in two or three sentences: this skill builds a map of a prospect's
engineering, product, and design org — who owns what, which artifacts they produce, and where
handoffs break — then generates targeted questions per function and per seam. It runs on
demand, when someone asks to map an EPD org or asks what to ask a specific function. It
produces a map, an operating-model read, ranked seam risks, and question sets, not a full
call plan.

Then collect the prerequisites, which only the user can supply:

- `<your-epd-primer>` — an optional adopter-owned primer covering local terminology, the
  core argument, and organization-specific nuances. The embedded baseline below remains
  runnable when this source is unavailable.
- `<your-operating-model-reference>` — your reference for operating-model history and the
  timeline the primer relies on.
- `<your-discovery-skill>` — the discovery-coaching skill that owns call structure, question
  sequencing, qualification, and output format.
- `<your-accounts-db>` — where account records, prior seller notes, and meeting notes live,
  so the org map can be grounded in what is already known.
- `<your-customer-docs-db>` — where customer-facing documents are created, plus the relation
  it uses to link back to the account record, if doc output is wanted.
- `<your-security-response-process>` — where to route security, compliance, privacy, RFP, or
  procurement questions.
- Connection names only, never values: your notes or docs workspace, your CRM, and a
  web-search tool, so the user can confirm each is authorized.

Walk through the placeholders one at a time. After each answer, restate the mapping back to
the user ("the primer lives at X, and call plans route to Y"), then have them save the filled
value into their own copy of this skill.

Until setup is complete, label adopter-specific conclusions as unconfirmed. The embedded baseline may still be used as general guidance, but it must not be presented as a fact about a particular account.

When every placeholder is filled and confirmed, set `setup: complete` in the frontmatter so
later runs go straight to the workflow.

## 🧭 Purpose

Look across a prospect's EPD (engineering, product, design) org and its related teams, then
ask the right questions. Use this skill to build the map of who builds what, where the
handoffs break, and which question each function and seam needs.

Trigger phrases: "map their EPD org", "what should I ask engineering", "questions for their
product team", "EPD discovery", "how do they build", "why is their EPD org painful".

Pair with `<your-discovery-skill>`. This skill supplies the EPD map and the
function-specific questions; the discovery skill owns call structure, question sequencing,
qualification, and output format. When a call plan is requested, produce the map here and
route the plan through the discovery skill.

## 📚 Embedded EPD baseline and optional local sources

Use `<your-epd-primer>` and `<your-operating-model-reference>` when configured to add adopter-specific context. The baseline below is sufficient to run the map without those private sources.

### Core operating-model baseline

EPD work creates value through decisions and artifacts that move from product intent to design, engineering, data, launch, and customer-facing teams. The highest-risk failures usually occur at handoffs: requirements drift, design intent is lost, success metrics are undefined, status is assembled manually, launches lack enablement, or security and compliance arrive late.

Use the account's evidence to test these as hypotheses, not to label an organization before discovery.

### Historical reference points

Use these only as orientation, not as account facts: brand-management roots in the early twentieth century; product-management and management-by-objectives practice in the mid-twentieth century; waterfall methods in the 1970s and 1980s; Scrum practice in the 1980s and 1990s; and the Agile Manifesto in 2001.

### Good versus risky patterns

- Good: one current source for intent, visible ownership, shared success measures, short feedback loops, and traceable decisions.
- Risky: duplicated requirements, tool fragmentation, handoff-only reviews, output metrics without outcomes, and approvals discovered at the end.

### Safe seam prompts

- Product → engineering: What changed between the requirement and the build, and where is the current decision recorded?
- Design → engineering: Which design intent is hardest to preserve, and how is implementation reviewed?
- Product → data: Who owns the success metric, and when is it checked after launch?
- EPD → leadership: How much effort goes into assembling roadmap status and explaining dependencies?
- EPD → GTM/support: What reaches customers without enablement, known issues, or a clear owner?
- EPD → security/compliance: Which approvals are discovered late, and what does that delay?

## 📚 Optional local sources

If the mapped primer or operating-model reference is unavailable, continue with this baseline and mark account-specific inferences as hypotheses.

1. The primer for the core argument, the EPD nuance list, and good product team vs bad
   product team behavior.
2. `<your-operating-model-reference>` for the timeline: brand management (1931), the HP
   product manager and Management by Objective (1940s), Waterfall (1970s–80s), SCRUM (1986
   paper, 1993 practice, 1995 operational paper), the Agile Manifesto (2001).
3. Any supporting reference docs your team maintains, when they hold content.

If the primer has unfinished sections, treat gaps as gaps and say so.

## 📥 Inputs

Required:

1. Account name.
2. Scope: one function, the whole EPD org, or EPD plus adjacent teams.

Optional, gather without asking when available:

1. The account page in `<your-accounts-db>`, past meeting notes, and prior seller notes.
2. Known attendees, titles, and reporting lines.
3. Stated operating model, tool stack, and any compelling event.

If the account is ambiguous, ask one short question. If org data is missing, mark it as an
assumption to verify on the call.

## 🗺️ Step 1: Build the EPD map

List every function in play and what it owns. Cover the ones that apply:

1. Product management, product leadership, and program or TPM.
2. Engineering: platform, product engineering, infrastructure, QA or release.
3. Design: product design, research, content or docs, design ops.
4. Data: analytics, data engineering, experimentation.
5. Adjacent teams that consume EPD output: support, sales engineering, marketing, security,
   compliance, and IT.

For each one capture owner, headcount if known, current tools, and the artifact it produces
(PRD, spec, design file, ticket, dashboard, release note).

## 🔍 Step 2: Classify the org against the primer nuances

Score the account on the primer's nuance list: company size, B2B or B2C, region, output vs
outcome measurement, portfolio stage from legacy to zero-to-one, hardware or software, where
the team sits in the company, product leadership strength, operating model (agile, waterfall,
SAFE, lean), product culture, stakeholder alignment, product complexity, and regulatory
pressure.

Name the likely operating model and its predictable pain. Examples: waterfall or SAFE creates
long feedback loops, heavy requirement documents, and late discovery of misalignment. Scaled
agile creates ceremony sprawl and tool fragmentation. Outcome-blind teams cannot tell you
what a release changed.

## ❓ Step 3: Ask at the seams

Most EPD pain lives between functions, not inside one. Probe these seams first:

1. Product to engineering: requirement drift, what was specified vs what was built.
2. Design to engineering: design intent lost at implementation, no single current source.
3. Product to data: no shared definition of success, no post-launch measurement.
4. EPD to leadership: roadmap status assembled by hand for reviews.
5. EPD to GTM and support: launches that reach customers without enablement or known issues.
6. EPD to security or compliance: approvals discovered late in the cycle.

For each seam produce one open question, one probe that quantifies the cost, and one question
that names the artifact where the break happens.

## 🧱 Step 4: Function-specific question sets

Give five questions maximum per function, ordered open to specific. Anchor each question to a
nuance or a seam, not to a product feature.

1. Product leadership: how bets get chosen, how success is measured, what gets killed.
2. Engineering leadership: cycle time, unplanned work, where context is re-found.
3. Design leadership: research reuse, handoff fidelity, review load.
4. Program or TPM: status assembly effort, dependency tracking, escalation path.
5. Data: metric ownership, experiment cadence, decision traceability.

## 📤 Output format

1. EPD map: table with columns Function, Owner, Artifact, Tool today, Confidence.
2. Operating model read: two sentences plus the predictable pain.
3. Seam risks: ranked, five or fewer, each with its cost probe.
4. Question sets: grouped by function, five questions maximum each, one indented probe per
   question.
5. Product angle: map each top seam to a capability in plain language, for example a single
   PRD source of truth linked to the sprint tracker, not internal feature jargon.
6. Assumptions to verify: three or fewer.

Rules:

1. Never present an internal health score or uncertain usage data as customer-facing fact.
2. Label any account-specific inference that the mapped sources do not support.
3. Never state that a person or team took an action unless a source shows it.
4. Do not quote the primer verbatim to customers. It is internal and may be unfinished.

## 📄 Doc output

If a doc is requested, create it in `<your-customer-docs-db>`, relate it to the matching
account record, and add a relevant icon and cover.

## 🧪 Examples

**Input:** "Map the EPD org at a 900-person regulated fintech running SAFE and tell me what
to ask."\
**Output:** EPD map with product, platform engineering, design, TPM, and compliance; SAFE
read with long feedback loops and audit pressure; three seam risks led by
product-to-engineering traceability; five questions each for product and engineering
leadership.

**Input:** "What should I ask their VP Design?"\
**Output:** design function slice of the map, the design-to-engineering seam, and five design
questions with probes.

**Input:** "Prep the discovery call for a target account's EPD org."\
**Output:** this skill's map and seam risks, then the call plan built with
`<your-discovery-skill>`.

## ⚠️ Edge cases

1. Only one contact available. Build the map as hypotheses and make the multithread question
   the primary next step.
2. Buyer is not EPD, for example IT or Finance. Use the map for context and shift to their
   own value drivers.
3. Design-led buyer. If the primer is product and engineering heavy, say the design angle is
   thin in the source and reason from first principles, labeled as such.
4. Buyer claims high product maturity. Skip the history and go straight to seams and
   measurement.
5. Security, compliance, privacy, RFP, or procurement questions: route to
   `<your-security-response-process>` and link supporting sources.
6. Primer unreachable: say so and label adopter-specific conclusions as unconfirmed; continue with the embedded baseline.

