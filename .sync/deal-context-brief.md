## 🚀 First run (setup)
Treat this as a first run when `setup:` above still reads `required`, any `<placeholder>`
below is unfilled, or the user has never invoked this skill. Run the setup conversation
before researching a deal.
1. Explain the skill in two or three sentences: given a customer name, it assembles one
	factual briefing on a deal — company research, deal-hub and CRM state, calls, team chat,
	email, internal records, and concrete next steps. It runs when someone types
	`/deal <customer>` or asks for deal context. It produces a facts-only summary with no
	selling points or call strategy.
2. Collect these prerequisites from the user — names and links only, never credential values:
	- `<your-deal-hub-db>` — one entry per active deal, and whether the skill may offer to
		create a missing entry.
	- `<your-accounts-db>` — customer and company records such as ARR, seats, health, use
		cases, and connectors.
	- `<your-opportunities-db>` — stage, amount, close date, next step, loss reason, and owner
		history.
	- `<your-sales-docs-db>` — handovers and account plans.
	- `<your-call-intelligence-db>` — where call recordings or summaries are searchable.
	- `<your-crm>` — stage, incremental ARR, seat count, inbound or outbound source, and
		closed-lost history.
	- `<your-chat-connection>`, `<your-mail-connection>`, and `<your-public-research-source>` —
		the team-chat, email, and public-research sources in scope, plus the channel naming
		convention used for account channels.
	- `<your-customer-docs-connection>` — optional connected customer documentation to search.
	- Connection or credential names only for each source; never tokens or secrets.
3. Walk through the placeholders one at a time, restate each mapping back for confirmation,
	and have the user save the filled values into their own copy of this skill.
4. Until setup is complete the skill cannot resolve an account or pull deal history; it can
	only list what it would gather.
5. When every placeholder is filled and confirmed, set `setup: complete` in the frontmatter
	so later runs go straight to the workflow.
**Command:** `/deal customer_name`
## Use when
- Someone types `/deal <customer>` or asks for deal context, history, or account background.
## Do not use when
- Defining POC success criteria (use the POC skill).
- Looking up product functionality (use the functionality skill).
## Required inputs
- Customer or account name.
## Steps
1. **Public research**: gather what the company does, how it makes money, recent news,
	product and service pillars and releases, and funding rounds with dates. Offer to populate
	this under the company-information section of the deal-hub entry.
2. **Deal-hub context**: pull the entry from `<your-deal-hub-db>`. If multiple entries match,
	ask which to use. If none exists, offer to create one.
3. **CRM and opportunity history**: gather the current stage, incremental ARR, seat count,
	and inbound or outbound source. Also pull every closed-lost opportunity with its close
	date, recorded loss reason, and prior owner. If no loss reason is recorded, report it as
	unknown and name the prior owners to ask. Do not state or imply that an unexplained loss
	was a rejection of the platform.
4. **Calls**: gather conversations and recordings from `<your-call-intelligence-db>`.
5. **Account owner**: identify the owner and look for pages they created in the connected
	workspace.
6. **Team chat**: gather relevant messages from the account owner or the account's channel,
	using the configured channel naming convention.
7. **Email**: gather relevant email conversations.
8. **Next steps**: list previous and upcoming calls plus next steps, including attendees and
	roles when explicitly stated. If a role is not stated, use available public profile
	information and label the result as researched rather than certain.
9. **Internal records**: pull the account record from `<your-accounts-db>` (ARR, seats,
	health, use cases, connectors), the deal record from `<your-opportunities-db>` (stage,
	amount, close date, next step), and related handovers and account plans from
	`<your-sales-docs-db>`.
10. **Customer documentation**: search `<your-customer-docs-connection>` when configured for
	documentation related to the customer.
## Output
- A factual summary of the deal. Do not suggest selling points or call approaches. State the
	facts only, distinguish recorded facts from researched context, and call out unknown fields
	rather than filling gaps with assumptions.