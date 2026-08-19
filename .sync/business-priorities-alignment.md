## 🚀 First run (setup)
Treat this as a first run when `setup:` above still reads `required`, any `<placeholder>`
below is unfilled, or the user has never invoked this skill. Run the setup conversation
before building or updating any output.
1. Explain the skill in two or three sentences: it resolves one account and buying center,
	collects dated internal evidence, and turns it into one evidence-backed value case that
	ties the customer's strategic objective to an operating change, a business output, and an
	economic or risk outcome. It runs when a person asks for a business case, a value case, a
	value pyramid, a value bridge, the three whys, discovery prep, or an executive readout for
	a named account. It produces either a detailed internal worksheet or a short visual
	external executive case, plus a chat handoff with gaps and a confidence rating.
2. Collect the prerequisites from the user — names and links only, never credential values:
	- `<your-business-priorities-template>` — the master template page, which must never be
		edited. Confirm its section order, tables, and validation checkboxes.
	- `<your-docs-db>` — where the output is created or updated, plus the exact option names
		for its type and status properties, its account and opportunity relations, and its
		author property.
	- `<your-accounts-db>` — the authoritative account records used to resolve one exact
		match, plus `<your-opportunities-db>` when opportunity linking is expected. Name any
		secondary account list you also keep, so a record that exists only there can be
		resolved instead of guessed.
	- `<your-account-research-hub>` — where account pages and prior research live.
	- The evidence sources that are connected and their priority order: meeting notes and
		transcripts, `<your-call-recording-tool>`, `<your-crm>`, customer email, and
		`<your-chat-tool>`.
	- `<your-priority-taxonomy>` — the priority categories your team chooses between, and
		`<your-motion-names>` if a primary motion is selected.
	- `<your-diagramming-tool>` — where an editable value-bridge visual lives, if you produce
		one, and how the exported image is attached.
	- The author or owner name stamped on the created page, your fully loaded annual cost
		assumption source for capacity math, and which supporting skills you already run for
		account fit, stakeholder mapping, motion choice, and signal scanning.
	- The names of any connections or credentials those tools require (names only); each
		person authenticates their own account.
3. Walk through the placeholders one at a time, restate each mapping back for confirmation,
	and have the user save the filled values into their own copy of this skill.
4. Until setup is complete the skill cannot resolve an account, read evidence, or create or
	update an output; it can only list the evidence it would gather and the discovery
	questions it would ask.
5. When every placeholder is filled and confirmed, set `setup: complete` in the frontmatter
	so later runs go straight to the workflow.
## 🎯 Purpose
Own the business-priority and value-case layer: the value pyramid, one primary priority, the
value bridge, the three whys, the initiative name, the champion win, the recommended first
workflow, and the customer-ready readout.
Produce either an internal alignment worksheet or a short, visual external executive business
case. In both modes, connect the customer's strategic objective to an operating change, a
business output, and an economic or risk outcome. The champion must be able to defend the
story when your team is not in the room.
Read existing account research. Do not rewrite it. Do not write the final account point of
view in this skill.
## 🧭 Scope
1. Build one worksheet for one account and one buying center.
2. Never blend separate business units into one priority. Create one worksheet for each unit.
3. Use internal sources by default. Ask before using public web sources unless the user
	requested them.
4. Keep one current output per account and buying center. Update it in place.
5. Treat a quantified value case as evidence work. Never invent an impact, baseline, target,
	ROI, TCO, or payback period.
## 📥 Required inputs
1. Account name or account page link. Resolve it to one exact row in `<your-accounts-db>`.
2. At least one evidence source: discovery notes, a call transcript, meeting notes, customer
	email or chat, a CRM record, or a customer-owned document.
3. Optional: champion, economic buyer, target function, primary motion, audience, and meeting
	stage.
4. Optional: source scope. The default is internal only.
If the account is ambiguous, ask one short question and stop. If the record exists only in a
secondary account list, ask how to resolve the authoritative account record before creating
the output. If more than one open opportunity exists, ask which one to link.
## 🔎 Evidence rules
Use internal sources in this order:
1. The account page and account research in `<your-account-research-hub>`.
2. Meeting notes, meeting transcripts, and recorded calls in `<your-call-recording-tool>`.
3. Account and opportunity records in `<your-crm>`.
4. Relevant customer email or `<your-chat-tool>` threads.
5. Prior account documents in `<your-docs-db>`.
Record a source and date for every material claim. Call out any source used outside the
requested scope and explain why it was needed.
Keep the template's validation checkboxes:
- `Heard directly`: direct customer words from a meeting, call, email, or chat message.
- `Inferred`: any conclusion that was not stated directly by the customer.
Add one claim-level confidence label to the source note:
- `Verified`: supported by a direct or authoritative source.
- `Corroborated`: supported by two independent sources.
- `Inferred`: a reasoned hypothesis that still needs customer validation.
- `Unknown`: no usable evidence. Leave the field unselected and add it to the gap list.
If no direct customer words exist, do not call the result customer-ready. If the user
explicitly asks for a preparatory hypothesis, create an internal, unvalidated draft and mark
every unsupported claim `Inferred`. Otherwise, return the evidence gaps and discovery
questions, then stop.
## 🔗 Supporting work
Do this only when it is not already complete:
1. Account revenue viability and ideal-customer-profile qualification for fit, timing, and
	why now.
2. An org and stakeholder map for named owners and buying-group gaps.
3. An operating-structure read for collaboration seams and likely obstacles.
4. A motion choice for the primary motion and the first workflow.
5. A signal scan for dated forcing events.
## 🏗️ Prepare the worksheet
1. Resolve the exact account, open opportunity, buying center, and named audience.
2. Search `<your-docs-db>` for an existing page with the same account relation and the
	business priorities type.
3. Collect the evidence and keep a dated source ledger. Preserve disconfirming evidence.
4. Use the current `<your-business-priorities-template>`. Never edit the template.
5. Update an existing output in place. Create a new page only when no matching output exists.
## 🧱 Build the value case
1. Start with the customer's current-year strategic objective, its named owner, and a dated
	forcing event.
2. Pick one primary priority from `<your-priority-taxonomy>`, for example revenue and growth,
	cost and productivity, risk and confidence, or innovation and speed. If every category
	fits, the priority is not clear enough.
3. Build the value chain in this order:
	- **Operating change:** What work, decision, or handoff changes?
	- **Business output:** What can the team produce more quickly, consistently, or safely?
	- **Enterprise outcome:** How does that output affect growth, margin, operating leverage,
		speed, or risk?
	- **Economic test:** Which equation and customer inputs prove or disprove the value?
4. Name the real tools, teams, handoffs, and decision points. Describe the desired state as an
	operating outcome, not as a product feature.
5. Answer why change, why now, and why your company. Why now needs a dated forcing event.
	Name the initiative in the customer's language and state the champion's personal win.
6. Recommend one first workflow with one customer outcome, the involved teams, and one
	success measure.
7. Define an economic north star in the customer's own unit, for example assets or accounts
	supported per professional, decisions completed per professional, revenue per employee,
	launches per team, cost to serve, or exposure to a named risk.
Hours saved, clicks reduced, searches completed, and adoption are diagnostic inputs. Do not
use them as the primary value metric. Link them to capacity, output, avoided headcount,
contribution, margin, or risk.
Quantify at least one business impact from a cited source. Capture the baseline, target, unit,
volume or frequency, owner, and date when evidence exists. Use these equations when relevant:
- **Growth value** = incremental output × conversion rate × contribution or fee economics.
- **Capacity value** = avoided hires × fully loaded annual cost.
- **Risk value** = change in event probability × financial impact.
- **Net value** = growth value + avoided cost + risk avoided − software, services, change, and
	usage costs.
Calculate ROI, TCO, or payback only when the user asks and every input is sourced. If an input
is missing, show the equation, name the missing variable, and assign its owner. Never convert
all available time into cash, assume full adoption, or treat theoretical capacity as booked
savings.
Use this readout sentence:
> Because \[priority\] is owned by \[named leader\] and is blocked by \[obstacle\], the first
> workflow to activate is \[workflow\]. This moves \[team or function\] from \[current state\] to
> \[desired state\], measured by \[metric\].
## 🖼️ Choose the output mode
Choose the mode from the user request and the audience. Do not mix the two formats.
1. **Internal alignment worksheet:** Use the full template, evidence ledger, claim labels,
	gaps, and discovery questions. This mode can be detailed.
2. **External executive business case:** Make the page understandable in 30 seconds. Target no
	more than five H2 sections and 700 words before the collapsed source list. Use:
	- one outcome-led thesis and decision;
	- one visual value bridge;
	- three outcome cards for growth, margin, and risk, or the customer's equivalent;
	- one compact metric table with no more than five rows;
	- one staged proof and decision gate.
For an external case:
- Lead with the customer's objective and economics. Mention product capabilities only as the
	mechanism.
- Keep detailed evidence and assumptions in one collapsed toggle at the end.
- Remove internal opportunity stages, seller language, health scores, internal account scores,
	raw usage telemetry, and unsupported user counts.
- Use customer-safe wording. Never expose internal pages, internal links, or sales data in the
	visible readout.
- Use a visible exported image for the value bridge. When an editable version is created in
	`<your-diagramming-tool>`, add a labeled link instead of embedding it. Keep all text inside
	nodes, connectors behind nodes, and peer nodes equal in size.
## 📄 Create or update the output
Create or update one page in `<your-docs-db>` with:
1. Internal title: `<Account> Business Priorities Alignment`. External title:
	`<Account> | <Strategic outcome>`.
2. Type: the business priorities option; Status: `Draft` until the evidence and audience
	checks pass.
3. Account relation: the exact matched account. Opportunity relation: the selected open
	opportunity, when one exists.
4. Author: the owner running the skill.
5. A relevant page icon and cover image.
For the internal worksheet, keep the template's section order, tables, and checkbox syntax. Do
not remove an unsupported section. Mark it `Unknown` and include it in the gap list.
For the external executive case, do not copy the full worksheet structure. Compress the
approved evidence into the visual format above. Keep unsupported claims out of the visible
readout and place open assumptions in the collapsed source section.
## ✅ Quality gate
The readout alone must answer:
1. What is the company trying to achieve this year, and who owns it?
2. What blocks that outcome, and what does it cost in time, money, risk, or missed revenue?
3. Why now, and what breaks if the customer waits two quarters?
4. Which single workflow should activate first, and how will the customer measure success?
5. Who will defend the case internally, and what is that person's win?
Also require one primary priority, one named owner, one quantified impact, one dated forcing
event, one first workflow, one success measure, and dated sources. A customer-ready label
requires direct support for the priority, the owner, and why now. Otherwise label the page
internal and unvalidated.
Never present internal health scores, raw usage details, uncertain user counts, or unsupported
estimates as customer facts. Never state that a person took an action unless a source records
it. Use simplified technical English. Do not use em dashes.
For an external executive case, also require this 30-second test:
1. Can an executive identify the strategic objective, obstacle, economic outcome, and
	requested decision without reading the source toggle?
2. Does each visible metric measure business output, economics, or risk rather than activity
	alone?
3. Are operational proof metrics separate from enterprise outcome metrics?
4. Is time saved treated only as an input unless it is linked to capacity, avoided hiring,
	contribution, margin, or risk?
5. Is every financial figure sourced, or shown as an equation with a named missing variable?
## 📤 Chat handoff
After the page is complete, report:
1. The primary priority and named owner.
2. The first workflow and success measure.
3. Up to three evidence gaps.
4. The discovery questions that close those gaps.
5. Overall confidence: High, Medium, or Low.
## ⚠️ Edge cases
1. No exact account match: ask one short question, then stop.
2. No direct customer source: follow the hypothesis-mode rule above.
3. Two business units: create separate worksheets. Do not average their priorities.
4. Champion only, with no economic buyer: mark the top tier `Unknown` and make executive
	access the next step.
5. More than one opportunity: ask which one to link.
Additional cases:
1. Executive and team priorities conflict: record both, choose the funded priority, and keep
	the disconfirming signal.
2. Renewal defense: use delivered value and concrete risk as the current state, not an
	unsupported future vision.
3. Public company: use an earnings call or shareholder letter only within the approved source
	scope, and cite the date.
4. Customer correction: update the existing page in place and keep one current version.
5. Template change: use the current template structure, not a copied section list from this
	skill.
## 🤝 Handoff
Send the finished worksheet to your account point-of-view skill. Do not write the final
account point of view here.
## 📎 References
- `<your-business-priorities-template>`
- `<your-worksheet-scaffold>` — the working scaffold used while filling the worksheet.