## 🚀 First run (setup)
Treat this as a first run when no `setup: complete` line is recorded in this file, when any
`<...>` placeholder below is still unfilled, or when the user has never invoked this skill.
Run setup before framing any deal.
1. **Explain the skill in two or three sentences.** Tell the user this skill selects an
	approvable commercial structure before a quote is built or changed: it refreshes your
	current pricing and approval rules, diagnoses the customer's real constraint, and returns
	up to three give/get options with their approval paths. It runs on request during deal
	structuring, quote review, or negotiation planning, and it produces a recommendation,
	customer-ready framing, an approval screen, and a quote handoff packet. It never promises
	approval.
2. **Collect the prerequisites the user must supply.** Never guess these.
	- `<your-commercial-policy-hub>` — standard deal structure, product list, approval matrix,
		and negotiation policy.
	- `<your-quote-system-guide>` — verified instructions for your quote/CPQ system, including
		approval-chain preview and order-form preview.
	- `<your-exception-review-process>` — how deal-desk, finance, executive, or legal exception
		review is requested.
	- `<your-deal-calculator>` — the approved pricing or scenario model, plus which cells are
		inputs.
	- `<your-signature-routing-guide>` — how an approved order form reaches e-signature.
	- `<your-standard-deal-defaults>` — default term length, billing frequency, payment terms,
		legal terms, and true-up rules.
	- The connections needed to read deal facts: CRM, quote system, and document access. Ask
		for credential and environment variable **names** only, never values.
3. **Walk the placeholders one at a time.** Ask for one value, restate the mapping back to the
	user in plain language, correct it if wrong, then move on. Have the user save the filled
	values into their own copy of this file.
4. **State the limits until setup is complete.** Without the commercial policy hub and its
	approval matrix, the skill cannot screen an approval path and must not label anything as
	within discretion. Without the quote-system guide it cannot hand off a quote, and without
	the deal calculator it can only compare structures qualitatively.
5. **Record completion.** Change the frontmatter line to `setup: complete` and note the date,
	so later runs skip straight to the workflow.
## Purpose
Select an approvable commercial structure before building or changing a quote. Frame options
and approval needs. Never promise approval.
## Refresh the rules first
Before every use:
1. Load `<your-commercial-policy-hub>` for standard structure, products, approval matrix, and
	negotiation rules.
2. Load `<your-quote-system-guide>` for system triggers and escalation details.
3. Load `<your-exception-review-process>` when an exception needs deal-desk, finance,
	executive, or legal review.
4. Use archived or legacy guides only for mechanics that are still confirmed current. Do not
	reuse deprecated approval thresholds.
5. If sources conflict, use the newest verified operational guidance, state the conflict, and
	do not guess.
## Use the resource stack deliberately
Use each resource for its intended job:
- Commercial policy hub: standard deal structure, products, approval matrix, negotiation
	policy, and quote-to-cash rules.
- Field enablement hub: current field guidance, launch updates, talk tracks, and training.
- Quote process guide: verified quote-system instructions.
- Process walkthroughs: visual help when a quote-system step is unclear.
- Scenario playbooks: short workflows, standard terms, usage-based pricing guidance, and
	order-form checks.
- Deal calculator: scenario modeling and option comparison.
- Signature-routing guide: only after the quote is approved.
## Model the options before building the quote
Use the approved deal calculator or pricing model before building a complex quote:
1. Start from the current original template or system-approved model.
2. Select the correct scenario: new deal, renewal/upgrade, or tiered pricing.
3. Enter values only in designated input cells.
4. For a renewal or upgrade, compare the existing deal with the proposed deal and check
	incremental recurring revenue.
5. For tiered pricing, enter each lower and upper bound and leave the final tier open-ended.
6. Review average unit price, blended discount, incremental revenue, and indicated approval
	level.
7. Use the calculator to compare structures, not to grant approval. Keep it internal unless
	your policy explicitly allows sharing.
8. Rebuild the selected structure in the quote system. The quote system remains the source of
	truth for pricing, decimal precision, routing, and formal approval.
## Collect the minimum inputs
Collect:
- Customer, opportunity, quote, and current contract links
- Deal type: net new, upgrade, add-on, amendment, renewal, early renewal, or rip-and-replace
- Products, quantities, current footprint, expected growth, start date, and term
- List price, current price, requested price, current ARR, new ARR, incremental ARR, and
	blended discount
- Billing frequency, payment terms, legal terms, and product exceptions
- The customer's actual constraint, who owns it, alternatives tried, competition, and decision
	deadline
- The downside if your company says no and the evidence supporting that conclusion
Ask one short question when a material fact is missing. Never invent deal facts.
## Diagnose before structuring
Classify the real constraint:
1. Treat budget pressure as a pricing problem.
2. Treat invoice timing as a payment-term problem before changing billing frequency.
3. Treat expected growth as a commitment and tiering problem.
4. Treat layoffs or lower seat demand as a retention and renewal problem.
5. Treat custom legal, packaging, or functionality requests as separate approval paths, not as
	discount substitutes.
Anchor to the standard deal first: standard product package, preferred term length, annual
upfront billing, standard payment terms, online terms, true-ups, and the same paid price for
true-ups. Ask what changed when the customer introduces a new term late.
## Build options in this order
Produce no more than three options:
1. **Standard:** Preserve standard price, term, billing, payment, legal terms, and true-ups.
2. **Balanced:** Exchange one targeted concession for a measurable customer commitment.
3. **Exception:** Use only when the blocker is validated. Time-box the exception, define
	reversion terms, and show the approval path.
Use these sequencing rules:
- For price pressure: longer term or more seats, then a first-year one-time discount, then no
	more than three validated growth tiers, then a permanent rate concession as the last option.
- For cash-flow pressure: modest first-invoice payment-term flexibility, then temporary
	less-frequent upfront billing with a premium, then high-friction billing exceptions only for
	rare, well-supported cases.
- For growth: tie lower future pricing to committed volume. Keep the final discount-schedule
	tier open for add-ons.
- For contraction: co-term and true-down at renewal first, then test plan mix or role mix. Do
	not treat a workforce reduction as a simple discount request.
- For every concession: name the give, the get, the expiry, and the renewal effect.
## Screen the approval path
Calculate the blended discount and identify every concurrent chain. A quote can trigger
discount, billing, special-term, product/SKU, and legal reviews at the same time.
Use this quick screen only after refreshing live sources:
- **Discounts:** compare the requested blended discount with the current approval matrix for
	the relevant product and segment.
- **Billing and payment:** standard billing and standard payment terms are the baseline.
	Longer payment terms, installment billing, custom billing, or unusual invoice timing usually
	trigger review.
- **Special terms:** auto-renewal changes, renewal caps, price protection, custom legal terms,
	true-up waivers, and enterprise license structures may each have separate thresholds.
- **Product/SKU rules:** limited-use structures, legacy products, custom SKUs, support
	packages, and consumption or credit products often route separately from discount approval.
- **Negative discount or price uplift:** follow the normal quote-system chain. Do not ask to
	bypass approval routing.
Label each item as one of: within discretion, likely approval required, or confirmed approval
required. Never label a recommendation as approved.
## Frame the customer conversation
Lead with one recommended structure and one fallback. Keep customer language to one reason,
three or four short sentences, and one CTA for a working session.
Do not expose internal discount thresholds, approval chains, health scores, or uncertain usage
data. Do not position a concession as free value. Explain the exchange plainly:
> If you can commit to \[term, volume, timing, or scope\], I can take \[specific concession\]
> forward internally. The structure would \[customer benefit\] while keeping \[renewal or growth
> term\] clear. I cannot promise approval, but I can validate this path quickly.
## Hand off to quote creation
Use your quote-creation workflow after the user selects a structure.
Before quote submission:
1. Create a separate quote for a materially different option instead of mixing alternatives.
2. Use a discount schedule for validated tiers when policy allows it. Do not use it for credit
	or consumption products unless the current policy explicitly supports it.
3. Preview the approval chain.
4. Fill the approval ask and justification with the exact ask, structure, quantities,
	economics, customer evidence, alternatives tried, deadline, risks, and guardrails.
5. Add the source link for any prior approval.
6. Preview the order form and verify products, quantities, payment terms, billing, legal
	language, contacts, addresses, and renewal effects.
## Move an approved quote to signature
When the authorized approver or quote system confirms that a quote is approved:
1. Stop changing the commercial structure unless the customer introduces a new request.
2. Use the approved order form supplied for that quote, not an older draft.
3. Confirm that the quote is primary/approved and that the opportunity has the required
	customer, contact, and account metadata.
4. Confirm billing contact, bill-to address, ship-to address, products, quantities, payment
	terms, legal language, and account details.
5. Follow `<your-signature-routing-guide>` to send the approved order form through the approved
	e-signature system.
6. If the signature action is missing, resolve the quote-system validation banner or ask the
	responsible internal support team.
7. If the customer requires an offline order form or its own signature system, follow the
	approved offline-signature or deal-desk stamp process before signature.
## Reuse patterns carefully
Use recent approved structures as examples, not standing approval. A useful pattern is to
present:
- Offer A: a clean lower-commitment option at a straightforward unit price.
- Offer B: a longer-term or higher-volume option with stepped pricing tied to committed growth.
- Build materially different offers as separate quotes.
- Explain the logic: exchange committed term and growth for stepped pricing while preserving a
	clean lower-commitment alternative.
- Recheck every new deal against the live approval matrix.
## Return this output
1. **Recommendation:** one sentence.
2. **Options:** up to three rows with structure, customer benefit, company give/get, renewal
	effect, and approval path.
3. **Customer framing:** three or four sentences with one CTA.
4. **Approval screen:** all triggered chains, missing evidence, and approvers to engage.
5. **Quote handoff:**
	- Customer and links
	- Deal type and decision deadline
	- Requested structure and quantity
	- Current ARR, new ARR, incremental ARR, list price, and blended discount
	- Customer ask and evidence
	- Alternatives tried
	- Risks, guardrails, and internal teams consulted
## Enforce the boundaries
- Do not promise approval, legal acceptance, product behavior, future packaging, future API
	availability, or uncapped usage.
- Do not offer monthly billing, mid-term refunds, cancel-anytime rights, custom product names,
	or removal of true-ups as ordinary concessions.
- Do not use deprecated approval thresholds.
- Do not send customer-facing terms before the quote and required approvals are complete.
- Do not modify a CRM or quote-system record unless the user asks for execution and all
	required facts are present.