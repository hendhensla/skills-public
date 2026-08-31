## 🚀 First run (setup)
Treat this as a first run when `setup: required` is still recorded above, any placeholder
below is unfilled, or the user has never invoked this skill. Run setup before researching an
account or creating a readout.
1. Explain the skill in two or three sentences: it turns account, meeting, opportunity, and
	usage evidence into one concise readout for a named stakeholder. It runs when someone asks
	for an account, deal, IT, stakeholder, or one-page readout, and produces a scannable page
	with the reader's asks, current state, usage, use cases, timeline, and next steps.
2. Collect these prerequisites from the user, using names and links only, never credential
	values:
	- `<your-accounts-db>` or CRM account source for the account profile, contacts, linked
		users or workspaces, product usage, contracted seats, paid seats, active members, and
		current account state.
	- `<your-meetings-source>` for meeting notes and transcripts, including attendees, use
		cases, owners, decisions, and dates.
	- `<your-opportunities-db>` or CRM opportunity source for commercial dates, stage, seats,
		and other deal facts.
	- `<your-readout-db>` or the sales-docs location where the finished page is created and
		filed.
	- The connected tools, data sources, and credential or environment-variable names used to
		access those sources; provide names only, never tokens or secrets.
3. Walk through each placeholder one at a time, restate the mapping to the user for
	confirmation, and have the user save the filled values into their own copy of this skill.
4. Until setup is complete, the skill cannot reliably resolve an account, reconcile evidence,
	calculate usage, or file a readout. It can only explain the required inputs and output.
5. When every placeholder is filled and confirmed, change `setup: required` to `setup: complete`
	in the frontmatter so later runs go straight to the workflow.
## 🎯 Purpose
Turn account, meeting, opportunity, and usage evidence into one glanceable account overview
readout for a named stakeholder. The page must be scannable in under a minute. Always include
a usage-state section with active-member metrics when the sources provide them.
## 📥 Required inputs
Identify these before research:
1. Account or customer name.
2. Audience and role.
3. What to highlight, especially the reader's next steps or asks.
4. Whether the stakeholder will read the page or the user will walk them through it.
If the audience is missing, ask one short question. Do not guess the reader.
## 🧭 Workflow
1. Complete a full account check before writing. Review `<your-accounts-db>` or CRM for the
	account profile, activity history, latest inbound and outbound activity, contact history,
	linked users and workspaces, product usage, and current opportunity status.
2. Capture usage state from the account source and its customer-account record: contracted
	seats, domain paid seats, people active in the last 7 days, people active in the last 28
	days or monthly active users, license utilization, and AI monthly active users when
	available. Prefer these sources over guessed warehouse queries. If numbers conflict, show
	both or stay qualitative.
3. Pull meetings with the account name in the title from `<your-meetings-source>`. Load notes
	and transcripts for use cases, owners, attendees, decisions, and dates.
4. Reconcile findings with the account and opportunity records. Prefer meeting evidence for
	who said what. Prefer the account or CRM record for commercial dates and seat facts. If
	sources conflict, stay qualitative rather than inventing a number.
5. Write the one-page readout. Lead with the asks, then usage state, use cases with who,
	timeline, and next steps.
6. File the page in `<your-readout-db>` or the configured sales-docs location. Do not leave it
	only in chat.
## 📄 Output shape
One page. Use only these sections.
1. Top callout with this reader's asks for the week. Put user-specified next steps here first.
2. Four snapshot tiles: current commercial state, live use case, in-build use case, and blocker.
3. Usage state section. Required. Use the heading `Usage state` and a table with the columns
	`Metric`, `Value`, and `Read`. Include contracted seats, domain paid seats, people active
	in the last 7 days, people active in the last 28 days, and license utilization. On a
	customer-readable page, use plain language rather than internal field names. If people
	active in the last 28 days exceed contracted seats, say so in the `Read` column.
4. Use cases table: Use case, Who, What we proved, Now.
5. Deal timeline table: When, What happened, Who. Keep only the events that change the story.
6. Next-steps table for this reader only. Highlight those rows.
7. Working-session closer: attendees, length, and the decision to leave with.
Use an emoji H2. Never use an em dash. Do not start the body with an H1 that repeats the
title. Give the page an icon.
## 🛡️ Audience rules
- If the named reader is a customer, write so they can see the page. Keep internal scores,
	forecast category, qualification gaps, health scores, and private politics out.
- Name people who were in the working sessions. Do not name internal opponents unless the user
	asks.
- Engineering, security, and IT rollout plans stay organic and owned by the customer. Do not
	propose a migration or rollout that the source meetings do not support.
- Distinguish confirmed facts, current status, and unknowns.
- Treat usage numbers as facts only when they come from the configured account or customer-
	account sources. Do not present health score, fit score, or forecast category as usage.
## 📁 Filing
- Customer readout: create it in `<your-readout-db>` or the configured sales-docs location.
	Set the document type and status to the destination's draft options, set the author to the
	user running the skill, and link the matching account.
- If the account is ambiguous, ask before creating the page.
- After creation, give the user the page. Do not dump the readout in chat.
- If the user requests a move to another workspace, recreate it in that workspace's readout
	location with the destination's document type, then remove the original copy only after the
	replacement is confirmed.
- Do not file a companion page. Keep this skill's instructions in the skill document.
## ⚠️ Avoid
- Skipping the account check.
- Writing a long memo instead of a one-pager.
- Putting internal deal hygiene in a customer-readable page.
- Inventing owners, dates, or seat counts when sources conflict.
- Omitting usage state or active-member metrics when the configured sources provide them.
- Creating a second skill page outside the skill catalog.
- Presenting unknowns as confirmed facts.