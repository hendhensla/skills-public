## 🚀 First run (setup)
Treat this as a first run when `setup: incomplete` is still in the frontmatter, when any
`<placeholder>` below is unfilled, or when the user has never invoked this skill.
Explain to the user, in two or three sentences: this skill answers what the product does today
and what is coming by reading a fixed list of approved sources, then returns a short point of
view separating shipped behavior from planned behavior. It runs on demand, when the user types
`/function` or asks about functionality or roadmap status. It produces a sourced, dated answer —
never a customer-facing commitment.
Then collect the prerequisites, which only the user can supply:
- `<your-roadmap-source>` — the official roadmap or release-planning pages.
- `<your-changelog-source>` — the product changelog or what's-new page.
- `<your-public-docs>` — the public help center and product documentation.
- `<your-announcement-channels>` — the designated announcement channels for product, company,
	engineering, or project updates. Ask the user to name these explicitly; anything not on the
	list is unconfirmed.
- `<your-disclosure-policy>` — the rule for what roadmap information may be shared externally,
	if one exists.
- Connection names only, never values: the docs workspace, chat connection, web-search
	connection, or other tools needed to read the sources.
Walk through the placeholders one at a time. After each answer, restate the mapping back to the
user ("roadmap truth comes from X, and Y is not a source of truth"), then have them save the
filled value into their own copy of this skill.
Until setup is complete, the skill has no sources of truth and must not answer functionality or
roadmap questions from model knowledge alone.
When every placeholder is filled and confirmed, set `setup: complete` in the frontmatter so later
runs go straight to the workflow.
## Use when
- Someone types `/function` or asks about current product functionality or roadmap status.
## Do not use when
- Compiling deal context (use your deal-context skill) or defining POC criteria (use your POC
	criteria skill).
## Steps
1. Look up current product functionality for what is described and return the latest POV:
	what the feature does, whether it is being built, and when it will launch (exact or
	approximate).
2. State the source and date behind each claim, and separate shipped behavior from planned
	behavior.
3. Before recommending that Notion hold a dataset, check the scale and architecture guardrails:
	- Do not propose a Notion database as the store for logs, event streams, or long ticket
		histories once it approaches the documented scale limit (roughly 250K rows in the current
		guidance); name the applicable limit, source, and date.
	- Keep high-volume data in the user's warehouse, such as Snowflake or Databricks, and use
		Notion or the user's interpretation layer for interaction and decision support.
	- Recommend a Worker only when the data fits Notion and the user needs a UI or workflow on top
		of it. A data pull with no workflow is an integration, not a Worker use case.
	- Treat ERP as connect-and-enhance, not replace. Pull useful records, such as SKUs and partner
		minimums, into a planning layer rather than moving ERP business logic into Notion.
## Sources of truth
- `<your-roadmap-source>` — official roadmap and release-planning pages.
- `<your-changelog-source>` — product changelog or what's-new page.
- `<your-public-docs>` — public help center and product documentation.
- `<your-announcement-channels>` — designated announcement channels for product updates.
## Edge cases
- If you reference any other internal or external communication outside the designated sources,
	call it out and do not treat it with full confidence.
- Verify scale limits against the current authoritative source before stating them.
- Never present a roadmap date to a customer as a commitment.