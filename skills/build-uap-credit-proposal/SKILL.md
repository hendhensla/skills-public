---
name: "Build a usage-credit proposal"
skill: build-uap-credit-proposal
description: "Builds dated, aggregate usage-credit recommendations for renewals, expansions, and projected rollouts."
category:
  - Sales
  - Analysis
proficiency: Advanced
trigger: Manual
notes: "Use current approved pricing and quoting sources; never present a plan as a binding quote."
setup: incomplete
---

## 🚀 First run (setup)

Detect a first run when no `setup: complete` marker is recorded, a required placeholder is still unfilled, or the user has never invoked this skill.

This skill turns usage evidence and approved commercial terms into a dated, decision-ready credit recommendation. It triggers when someone needs a renewal, expansion, or rollout plan and produces clearly labeled scenarios, purchase quantities, term costs, assumptions, and unresolved questions—not a binding quote.

Before running it, the user must supply:

- The current approved credit and feature rules document.
- The current commercial or quoting-system source of truth.
- A read-only usage source, with the account-to-workspace or account-to-tenant mapping.
- The destination for internal analysis and the destination for the customer-safe summary.
- The approved renderer or charting tool, if visual output is required.
- The credential or connection names needed to access those sources (never credential values).
- Any current rate card, seat-price rules, allowance rules, and transition dates.

Walk through each placeholder one at a time. Confirm the mapping back to the user, then have them save the filled values in their own copy of this skill. Until setup is complete, the skill cannot validate live usage, calculate a reliable recommendation, or publish a customer-safe document. After confirmation, replace `setup: incomplete` with `setup: complete` in the frontmatter.

## Purpose and safety boundary

Produce an aggregate planning recommendation, not a quote, invoice, contract interpretation, or promise of approval. Keep account-level data outside the skill directory and outside any public or customer-facing copy.

Use the current approved product rules, commercial terms, and quoting-system output. Never infer a billable allowance from a feature label, a historical dashboard, an opportunity title, or a demo run. Missing data is unknown—not zero.

Separate these concepts throughout the work:

- Observed usage versus assumed growth.
- Personal or seat-level allowances versus shared purchased credits.
- Expected usage versus stress capacity.
- The bridge to an upcoming renewal versus the future purchase term.
- Annualized reference spend versus the actual co-termed invoice.
- Measured paid usage versus an explicitly labeled uncertainty reserve.

Do not promise discounts, unlimited usage, approval, rollover, or a specific model outcome. Do not expose user-level impacts or raw telemetry in a customer-facing artifact unless the customer explicitly requests it and the approved policy allows it.

## 1. Refresh rules and resolve dates first

Collect the latest approved versions of:

1. The product credit and eligible-feature rules.
2. The commercial or deal-desk FAQ.
3. The quoting-system guidance and current rate card.
4. Any approved transition or renewal policy.

If sources disagree, prefer the newest approved commercial rule, record the conflict, and do not silently choose a favorable interpretation.

Record all relevant dates before calculating anything:

- Conversation or analysis date.
- Proposed effective date.
- Contract start and exclusive term end.
- Actual monthly reset dates.
- Renewal date.
- Feature billing or enforcement dates.
- Expiry dates for old or promotional credits.
- Dates when allowances, rates, or commercial terms change.

An opportunity close date is not a contract start date. Do not subtract an expiring balance from a later term. Do not treat twelve 30-day windows as an exact calendar year. Keep the pre-renewal bridge and post-renewal purchase in separate calculations.

When showing existing credits, include the dated balance, the run rate through renewal, expected bridge consumption, and remaining balance only when each is supportable. Label incomplete projections as conditional base cases and put excluded charges beside the number.

For a seat expansion, re-anchor the model to the expansion effective date. Distinguish retained seats from added seats. A quoted per-seat price is a modeling input, not evidence that every seat or usage category migrates. Verify amendment, true-up, entitlement, and quoting exceptions. Show annualized seat spend separately from the actual co-termed invoice. Never scale agent or workflow usage mechanically with headcount or pool new personal allowances.

## 2. Choose the evidence mode

### Existing usage

Reconcile the approved CRM or quoting-system lines and ordered contracts with:

- Purchased quantities and credit types.
- Paid, promotional, expired, and remaining balances.
- Approved personal or seat-level allowances.
- Actual usage by person or workspace and reset cycle.
- Feature and agent funding ownership.

An opportunity title is not purchase evidence. Reuse sourced results only when their time window and scope match the current question.

### Projected rollout

Verify the existing footprint before calling anything net-new. Capture rollout waves, user groups, power-user profiles, workflows, agent funding, run counts, and credits per run. Separate observed facts from assumed profiles. A demo run is not a production benchmark; use a small measured pilot when representative consumption is unavailable.

If an account-to-workspace mapping returns no rows, verify the customer account's primary workspace or tenant identifier, then corroborate the workspace name, domain, and account before trying a direct lookup. An empty bridge is not proof that usage cannot be retrieved.

## 3. Model the credit demand

Aggregate each source to person-or-workspace and reset window before joining sources. Keep Standard-like and Select-like demand separate when the product has those categories.

For each person and reset cycle:

1. Sum positive Standard excess.
2. Sum positive Select excess separately.
3. Apply growth to usage before subtracting allowances.
4. Apply only the allowance actually approved for that plan, price, date, and contract.
5. Add qualifying meeting-note or similar feature usage only after its billing date and at its verified rate.
6. Keep gross feature consumption distinct from purchased credits.
7. Mark missing duration, non-unique meeting days, unmapped users, unpriced features, and overlaps explicitly.

Never pool personal credits unless the current policy explicitly says they are pooled. A discounted plan does not automatically receive list-price allowances.

Assign funded agent usage correctly:

- Owner-funded agents belong in the owner's Select-like usage, including shared agents.
- Workspace-funded agents belong in the workspace-funded line.
- Unknown funding may be an explicit conditional reserve, never verified paid usage.
- Do not add dashboard totals to billing totals when they overlap.
- Ordinary API or integration calls are not automatically AI-credit usage; verify the treatment of AI invoked through those surfaces.
- Free or beta features contribute zero only while their verified free status applies.

When comparing another estimate, first match its usage window, allowance basis, and scope. Never add historical agent burn to a Select total that already contains those runs. Keep an unresolved funding reserve out of precise remaining-balance and depletion-date claims.

### Suggested input model

Use a deterministic calculator when available. A portable input shape is:

```json
{
  "account": "<account-label>",
  "as_of": "YYYY-MM-DD",
  "start": "YYYY-MM-DD",
  "end": "YYYY-MM-DD",
  "rates": {
    "monthly_per_1000": 0,
    "annual_per_1000": 0
  },
  "options": [
    {
      "name": "Low",
      "growth": 0,
      "monthly": 0,
      "annual": 0,
      "profiles": [
        {
          "count": 0,
          "standard_30": 0,
          "select_30": 0,
          "notes_hours_30": 0,
          "owner_agent_select_30": 0
        }
      ],
      "allowance": {
        "standard": 0,
        "select": 0
      },
      "notes_effective": "YYYY-MM-DD",
      "notes_rate": 0
    },
    {
      "name": "High",
      "growth": 0,
      "monthly": 0,
      "annual": 0,
      "aggregate_excess_30": 0,
      "gross_member_30": 0,
      "aggregate_features_effective": "YYYY-MM-DD"
    }
  ]
}
```

Use exactly two scenarios named `Low` and `High` when the requester asks for a two-option comparison. A scenario may use either:

- `profiles`, with counts, 30-day Standard-like and Select-like usage, optional meeting-note hours, optional owner-funded agent usage, a top-level allowance, an effective date, and a verified rate; or
- `aggregate_excess_30`, already calculated per person after applicable allowances, plus optional `gross_member_30` for a conservative calendar upper trace.

Keep `workspace_paid_30` and `uncertain_reserve_30` separate when present. Scale only the fields that are not already grown. Preserve the exact query-derived lower bound beside any upper planning trace.

The calculator should spend purchased monthly credits first, then the annual pool, then report any on-demand shortfall. It should also report unused monthly credits that expire. Capacity is not expected consumption, and an annual pool divided by twelve is not a monthly entitlement. Confirm reset boundaries and partial-month treatment before applying prices to a co-termed partial year.

## 4. Choose the decision format

For executives, show one rounded purchase and one clearly labeled total term cost per option. Preserve a requested two-option comparison; “simple” or “one number” means one number per option unless the requester explicitly removes alternatives.

For each option, show:

- Use-case label.
- Term length and effective dates.
- Recommended monthly and annual quantities, if both apply.
- Total term cost.
- Absolute credit delta from the prior ordered quantity.
- Expected demand, capacity, and any shortfall.
- Key assumptions and excluded charges.

Compare ordered quantities, not remaining balances or unexecuted draft quotes. On-demand charges and promotional grants are not prepaid purchase baselines. Missing purchase evidence is not zero.

Keep detailed billing mechanics, capacity-versus-demand charts, and methodology in supporting detail. Place a short plain-English explainer near the decision numbers. Explain the difference between included personal allowances and the shared purchased balance, how agent funding is assigned, and how the dated transition differs from the renewal change.

When explaining credit categories, use three clearly labeled groups where applicable:

1. Personal Standard-like allowance.
2. Personal Select-like allowance.
3. Purchased shared workspace credits.

Give everyday feature examples, distinguish owner-funded from workspace-funded agents, identify eligible excess and admin approval requirements, and state dated free or beta exceptions. Keep ordinary integration requests separate from agent execution through those integrations.

A low option should be an intentionally scoped baseline. A high option should represent an explicit larger rollout, adoption case, or growth assumption. Size a recurring base for repeatable need, an annual pool for uncertainty or spikes, and on-demand usage only when it is enabled and priced. Stress-test every option against both cases and state any shortfall.

If asked for an annualized revenue metric, keep it internal and separate:

- New annual credit spend.
- Incremental credit revenue.
- Seat or subscription annualized revenue.
- Total deal annualized revenue.

State the field basis and preserve discrepancies. A planning package is not booked revenue, commission, internal rate of return, or a contract commitment.

## 5. Deliver the artifacts safely

Use the approved document, chart, and image-rendering tools configured during setup. For a one-option executive image, provide only verified purchase baselines and the requested dates, previous quantity, recommended quantity, term, comparison note, and reason. For a two-option image, provide exactly two objects with title, credits, cost, and fit.

Use a real approved brand asset when one is required. Do not invent or redraw logos or characters. Inspect the rendered image and the saved page; ensure accessible text remains available and both commercial options are unchanged.

Default internal work to the approved internal destination. Never place drafts, working models, raw reports, or internal pricing in an externally shared workspace. Publish to a customer destination only after the user confirms the final version and explicitly requests publication.

Before every write batch:

1. Verify the workspace, account or tenant identity, and destination.
2. Fetch the destination schema and deduplicate the target task or page.
3. Save generated images and attach them before their upload links expire.
4. Keep the customer-safe document separate from internal evidence.
5. Send messages only to explicitly authorized destinations.
6. State that the estimate needs a live walkthrough and final quoting-system validation.

## 6. Verification checklist

Before marking the work complete, verify:

- All dates, reset boundaries, expiry dates, and transition dates.
- Source windows, account mappings, and identity corroboration.
- Personal allowances, shared credits, and funding ownership.
- No double-counting between billing, dashboards, agents, or meeting notes.
- Low and high scenarios are distinct and supportable.
- Expected usage is separate from stress capacity and uncertainty reserves.
- Costs, term lengths, and purchase deltas are visible per option.
- Excluded charges, conditional assumptions, and unresolved conflicts are labeled.
- No raw user-level telemetry, private links, credentials, or internal identifiers escaped into customer-safe output.
- Saved pages, images, fields, and authorized message links were re-opened and verified.

Improve the smallest relevant personal copy when a verified lesson appears, then run the user's synchronization workflow. Report pending synchronization honestly.