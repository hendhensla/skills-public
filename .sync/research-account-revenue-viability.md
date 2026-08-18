## 🚀 First run (setup)
Run this section first if no `setup: complete` line exists in the frontmatter, if any
`<placeholder>` below is still unfilled, or if the user has never invoked this skill.
Start by explaining, in two or three sentences: this skill researches a single account in the
user's accounts database, scores its revenue viability, and writes a dated, source-backed
pursuit recommendation (score, tier, confidence, motion, next action) onto the account page.
It runs when the user points it at an account row, or when an orchestrating agent hands it
one. It produces an updated account report plus a short summary comment, not outbound
contact.
Then collect the prerequisites from the user — names and links only, never credential values:
- `<your-accounts-db>` — the database with one row per account, plus the property names it
	should write back to: an account-fit narrative field, a numeric fit-score field, and a
	proposed-tier field. Ask which tier field is owned by someone else and must never be
	written.
- `<your-report-template>` — the report template or page structure the recommendation must
	follow, including the section labels used for usage, signals, source evidence, stakeholder
	map, and the material-change log.
- `<your-duplicate-audit-skill>` — the book/duplicate audit routine to apply to the single
	account before deep research.
- `<your-icp-skill>` and `<your-motion-skill>` — the qualification and go-to-market motion
	playbooks applied to merged findings.
- `<your-usage-analyst>`, `<your-signals-scout>`, `<your-org-mapper>` — the specialist
	agents or sessions this skill delegates to, if the user has them. Without them, the skill
	runs the same steps inline and takes longer.
- `<your-crm>` and `<your-product-analytics>` connections — for account IDs, opportunity
	state, and product usage. Record the connection names and required identifier fields (for
	example a CRM account ID and an internal account or workspace ID), never secrets.
- `<your-win-library>` and `<your-reference-list>` — approved comparable wins and reference
	customers the recommendation may cite.
Walk through the placeholders one at a time. After each answer, restate the mapping back to
the user ("proposed tier writes to X, and Y is read-only"), and have them save the filled
value into their own copy of this skill.
Until setup is complete, the skill cannot score an account, write to the account page, or
cite comparable wins. Do not guess database or property names.
When every placeholder is filled and confirmed, set `setup: complete` in the frontmatter so
later runs go straight to the workflow.
## 📖 Purpose
Assess one account record and produce a source-backed pursuit decision. Coordinate
specialist research rather than loading every source into one context. Write the final
report into the account row using `<your-report-template>`.
## 📥 Inputs
- Account row URL, company domain, CRM account ID, and any internal account or workspace
	identifier.
- Existing report and last review date when present.
Stop when account identity is ambiguous.
## ⚙️ Workflow
1. Load the account row and any existing report.
2. Apply `<your-duplicate-audit-skill>` to the single account. A verified duplicate forces
	Deprioritize until ownership is resolved and cancels deep research.
3. Otherwise run independent specialist sessions in parallel:
	- **Usage and expansion analyst**: user counts, feature adoption, consumption or
		usage-based metrics, latest snapshots, and the account-filtered usage dashboard.
	- **Signals scout**: public signals, community signals, and any internal signal or alert
		surface.
	- **Org and stakeholder mapper**: run for likely top-tier accounts, active opportunities,
		explicit stakeholder work, or whenever buying-group evidence could change the decision.
4. Pass each specialist only stable identifiers, the prior review date, the current decision
	state, and its output contract. Do not pass the full report unless required.
5. Merge only compact handoffs. Apply `<your-icp-skill>`, then `<your-motion-skill>`.
6. Select up to three comparable wins from `<your-win-library>` and up to three approved
	customers from `<your-reference-list>`.
7. Score the account, update the canonical report in place, and set the account-fit
	narrative, fit score, and proposed tier. Never write the tier field owned by another team.
8. Leave one concise page-level comment.
## 📊 Scoring
- Product expansion potential: 30.
- Business and workforce fit: 20.
- Relationship and dealability: 20.
- Growth and financial momentum: 15.
- Comparable win evidence: 10.
- People and builder signals: 5.
- Risk penalties: up to minus 20.
Tier 1: 80 to 100. Tier 2: 65 to 79. Tier 3: 50 to 64. Tier 4: 35 to 49. Tier 5: below 35.
Score confidence separately and explain every dimension and penalty. A verified duplicate
overrides the recommendation regardless of score.
## 📝 Output
Follow `<your-report-template>` exactly. Put the latest usage snapshot in the usage section
and place the account-filtered usage dashboard directly below it. Write the organization and
stakeholder map in the dedicated stakeholder section; do not create or link a separate
org-map page. Keep the relationship section for relationship activity, ownership, last
useful evidence, and the next customer move. Put public signals in the signals sections,
source evidence in the evidence section, and dated changes in the material-change log.
The final decision must include score, tier, confidence, motion, audit flags, reasons to
pursue and not pursue, why now, next action, stop condition, next review date, first
workflow, buying group, proof plan, and expansion path.
Before marking the account complete, confirm the page carries all of these. Write "Unknown"
with the date checked instead of leaving a section out.
- Route verification in the summary section.
- Organization and stakeholder map with a named economic buyer, technical buyer, and
	champion, or Unknown with the date checked.
- Account usage dashboard, filtered to this account, directly below the latest snapshot.
- Industry voices with at most two defensible quotes, or the words "No verified quote".
- Confidence and gaps, including the largest gap that could change the point of view.
## ⚠️ Errors and guardrails
- Never place operational errors, stack traces, SQL, or troubleshooting details in the
	report or tiering output.
- When evidence is unavailable, write "Unknown" with source and date checked. Keep raw
	errors in the agent chat.
- Never estimate missing metrics or invent people, identities, financials, ownership,
	intent, or loss reasons.
- Do not contact prospects, change opportunity records, or expose private user-level data
	outside approved internal account surfaces.
- Preserve prior validated evidence and dated history.