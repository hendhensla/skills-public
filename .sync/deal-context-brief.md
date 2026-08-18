## 🚀 First run (setup)
Treat this as a first run when `setup:` above still reads `required`, any `<placeholder>`
below is unfilled, or the user has never invoked this skill. Run the setup conversation
before researching a deal.
1. Explain the skill in two or three sentences: given a customer name, it assembles one
	factual briefing on a deal — company research, deal-hub and CRM state, calls, chat, email,
	internal records, and the concrete next steps. It runs when someone types
	`/deal <customer>` or asks for deal context. It produces a facts-only summary with no
	selling points or call strategy.
2. Collect the prerequisites from the user — names and links only, never credential values:
	- `<your-deal-hub-db>` — one entry per active deal, and whether the skill may offer to
		create a missing entry.
	- `<your-accounts-db>` — customer and company records (ARR, seats, health, use cases,
		connectors).
	- `<your-opportunities-db>` — stage, amount, close date, next step.
	- `<your-sales-docs-db>` — handovers and account plans.
	- `<your-call-intelligence-db>` — where call recordings or summaries are searchable.
	- `<your-crm>` — stage, incremental ARR, seat count, inbound or outbound source.
	- `<your-chat-connection>`, `<your-mail-connection>`, and `<your-web-search>` — the chat,
		email, and public-research sources in scope, plus the channel naming convention used
		for per-account channels.
	- `<your-customer-facing-workspace>` — optional, if connected customer documentation
		should be searched.
	- Connection or credential names only for each of the above; never tokens or secrets.
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
- Customer / account name.
## Steps
1. **Web research**: what the company does, how it makes money, recent news, product and
	service pillars and releases, funding rounds and dates. Offer to populate this under the
	company-information section of the deal-hub entry.
2. **Deal hub context**: pull the entry from `<your-deal-hub-db>`. If multiple entries match,
	ask which to use. If none exists, offer to create one.
3. **CRM**: stage, incremental ARR, seat count, inbound or outbound.
4. **Calls**: conversations and recordings from `<your-call-intelligence-db>`.
5. **Account owner**: identify the owner and look for pages they created.
6. **Team chat**: anything from the rep who owns the account or in the account's channel.
7. **Email**: any email conversations.
8. **Next steps**: previous and upcoming calls plus next steps, including attendees and roles
	(stated, or researched from their email domain and public profile).
9. **Internal records**: the account record in `<your-accounts-db>` (ARR, seats, health, use
	cases, connectors), the deal record in `<your-opportunities-db>` (stage, amount, close
	date, next step), and related handovers and account plans in `<your-sales-docs-db>`.
10. **Customer-facing workspace**: search connected documentation for the customer.
## Output
- A factual summary of the deal. Do not suggest selling points or call approaches. State the
	facts only.