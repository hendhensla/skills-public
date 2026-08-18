# What this skill does
Given a customer name, this skill assembles a complete factual picture of a sales deal:
what the company does, the full history of your interactions with them (calls, meetings,
Slack, email), the current CRM state, and the concrete next steps. It deliberately stops
at facts — no selling points, no call strategy, no coaching. The output is a briefing you
can trust before a call or a handoff.
# First-time setup
Before the skill can run, it needs to know where your deal data lives. Prerequisites:
- **A deal/CRM workspace** the agent can query — e.g. a Notion workspace connected via
	the Notion MCP, or whatever knowledge base holds your account and opportunity records.
	Identify the specific databases/pages for:
	- your **deal hub / pipeline database** (one entry per active deal)
	- your **accounts database** (customer/company records)
	- your **opportunities database** (active deal records with stage, ARR, seats, etc.)
	- your **meeting notes** (customer calls and internal syncs)
	Replace the placeholders below (`<your-deal-hub>`, `<your-accounts-db>`, etc.) with
	links or IDs for your own databases. In Notion, copy a database link from
	Share → Copy link.
- **A call-recording tool** (e.g. Gong) — either its MCP/API integration or a database
	where call summaries are synced.
- **Slack access** (e.g. the Slack MCP) with permission to search channels and DMs.
- **Email access** (e.g. a Gmail MCP) for searching customer threads.
- **Web search** for public company research.
- **CRM access** (e.g. Salesforce) for stage, ARR, seat count, and source fields — via
	integration, or just have the values handy in your deal database.
# Playbook
- `/deal <customer_name>`
	- Help me understand all of the historical context and next steps of a deal including
		- From the web: what the company does, how they make money, recent news, product/service pillars and releases, funding rounds + dates
		- Context in `<your-deal-hub>` (your deal/pipeline database)
			- If multiple entries match, ask which to use
			- If the entry does not exist, offer to create it
		- `<your-accounts-db>` for customer info
		- `<your-opportunities-db>` for active deal info
		- CRM fields (e.g. from Salesforce): stage, incremental ARR, number of seats, inbound/outbound source
		- Conversations from your call-recording tool (e.g. Gong) — search recordings or the database where call summaries sync
		- Any customer or internal sync in `<your-meeting-notes>` (your meeting-notes database)
		- Find the account owner, then look for any pages they have created in your workspace
		- Anything in Slack from conversations with the rep who owns the account, or in dedicated per-account channels, whatever naming convention your company uses for those
		- Any email conversations with the customer
		- Any previous or upcoming calls / next steps
			- Who will be on the call + their role (explicitly stated, or take their email and research them on the web)
	- Do not suggest selling points or call approaches — just state the facts of the deal