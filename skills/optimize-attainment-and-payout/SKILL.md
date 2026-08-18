---
name: optimize-attainment-and-payout
skill: Optimize Attainment and Payout
description: >-
  Role-aware payout optimization for commission-eligible participants. Resolves
  plan period, role, segment, quota cadence, ramp, guarantee, and active
  incentive mechanics before comparing customer-sound options by attainment
  impact, payout impact, and risk.
category:
  - Analysis
  - Automation
  - Reference
proficiency: Advanced
trigger: Agent
notes: >-
  Use as a private planning overlay for account research, deal structuring,
  quote review, and incentive-plan interpretation. Always use the participant's
  current signed plan and statement system as the source of truth. Includes a
  mandatory bonus/SPIF check across every official announcement channel before
  concluding that no program is active. Never generalize one role's or period's
  plan to another participant.
setup: pending
---

## 🚀 First run (setup)

Treat this as a first run when no `setup: complete` line is recorded in this file, when any
`<...>` placeholder below is still unfilled, or when the user has never invoked this skill.
Run setup before producing any payout math.

1. **Explain the skill in two or three sentences.** Tell the user this skill is a private
   planning overlay that resolves their role, plan period, quota cadence, ramp, and guarantee,
   then separates what retires quota from what pays separately and ranks customer-sound
   options by attainment impact, payout impact, and risk. It runs during account research,
   deal structuring, quote review, or whenever a new incentive program is announced, and it
   produces a threshold map, a recommended play, a bonus-program status, and a crediting
   audit. It never promises commission, quota credit, or approval.
2. **Collect the prerequisites the user must supply.** Never guess these.
   - `<your-signed-comp-plan>` — the participant's signed incentive compensation plan for the
     current period, including quota, variable target, ramp, and accelerator tiers.
   - `<your-comp-statement-system>` — where credited attainment and payout are officially
     reported.
   - `<your-comp-policy-hub>` — role-specific plan pages, new-hire policy, and transfer or
     promotion policy.
   - `<your-incentive-announcement-channels>` — every channel where bonus, kicker, SPIF, and
     accelerator programs are announced, including any legacy or operations channel, plus the
     announcement owner to filter on.
   - `<your-crm>` and `<your-quote-system>` — where opportunity owner, amounts, product
     classification, close date, and crediting fields live.
   - The escalation owners for unresolved conflicts: manager, revenue operations, or sales
     compensation.
   - The connections needed to read these sources. Ask for credential and environment variable
     **names** only, never values.
3. **Walk the placeholders one at a time.** Ask for one value, restate the mapping back to the
   user in plain language, correct it if wrong, then move on. Have the user save the filled
   values into their own copy of this file.
4. **State the limits until setup is complete.** Without the signed plan the skill must stay
   symbolic — it can only use `Q`, `V`, and `BCR` and must not calculate or promise payout.
   Without the announcement channels it cannot conclude that no bonus program is active, and
   without CRM access it cannot run a crediting audit.
5. **Record completion.** Change the frontmatter line to `setup: complete` and note the date,
   so later runs skip straight to the workflow.

## Purpose

Maximize expected attainment and payout among customer-sound, policy-compliant choices. First
resolve the participant's role, plan period, quota cadence, new-hire or transfer status,
guarantee, and ramp. Then distinguish quota retirement, core payout, kickers, bonuses,
temporary programs, and risk before recommending a play.

## Run this skill when

- Researching or prioritizing accounts and opportunities.
- Building, revising, or comparing quotes.
- Planning a path to the next attainment, guarantee, quota, or accelerator threshold.
- Evaluating land, expansion, usage-based pricing, multi-year terms, services, support,
  renewals, or other commercial structures.
- Reviewing a new bonus, kicker, commission update, or incentive announcement.
- Auditing whether the CRM and compensation statement system reflect the expected credit.

## Source hierarchy

Before every run:

1. Resolve the participant's role, level, segment, region, plan period, quota cadence, new-hire
   or transfer status, effective start date, ramp month, and guarantee status.
2. Use the participant's signed incentive compensation plan and current compensation statement
   for actual quota, variable target, ramp, credited attainment, and payout. These control over
   examples, one-pagers, and informal guidance.
3. Load the current role-specific plan page or policy page for the plan period.
4. For a new hire, load the current new-hire compensation policy. For a transfer or promotion,
   load the current transfer or transition policy.
5. Apply temporary bridge or transition logic only when the signed plan explicitly confirms
   that the participant, role, and period are eligible.
6. Search current-period announcements from the compensation or sales-leadership announcement
   owner for bonus, kicker, SPIF, commission, accelerator, multi-year, usage, services,
   support, or other incentive overlays. Check every channel where such programs are announced,
   including any legacy or operations announcement channel, before concluding that none exist.
7. Treat expired plans and prior-period examples as historical pattern libraries, not current
   entitlements.
8. If sources conflict, prefer the signed plan, then the verified compensation hub or policy
   source, then the latest official announcement. Flag unresolved conflicts and route them to
   the manager, revenue operations, or sales compensation.
9. If the current role page or signed plan is unavailable, provide only a source map and
   symbolic analysis. Do not calculate or promise payout.

## Check signed-plan status first

At the start of every run, confirm whether the participant has the applicable signed
compensation plan for the current period.

- If the signed plan is not available, state that the analysis is provisional and use symbolic
  values such as `Q` for quota, `V` for variable target, and `BCR` for base commission rate.
- If the signed plan has arrived but is not signed, make signing it the highest-priority next
  action.
- If the signed plan is available, extract the effective dates, role, quota, variable target,
  ramp treatment, accelerator thresholds, kickers, clawback rules, and any special bridge
  mechanics.
- Once the signed plan is available, remove provisional assumptions and update the source map.

## Resolve role, period, and ramp before math

There is no universal payout formula across roles. Build a role-and-period profile first:

- Role and level
- Segment and region
- Quarterly, semi-annual, or annual quota cadence
- New hire, transfer, promotion, manager, or fully ramped incumbent
- Plan effective start date and current ramp month
- Guarantee, draw, or make-whole treatment, if any
- Full quota, ramp quota, variable target, base commission rate, current attainment, and active
  overlays

### New-hire ramp

Use the current new-hire policy and signed plan. Common patterns include guarantee months
followed by ramped quota. The guarantee usually pays the greater of earned commissions or the
guaranteed amount, not both, unless the signed plan says otherwise.

When calculating ramp:

1. Determine whether the start date creates a full first plan month or a prorated stub.
2. Identify the ramp quota for the current month or period.
3. Determine whether attainment through ramp quota pays at a special ramp rate.
4. Confirm when full quota and accelerators begin.
5. Preserve approved exceptions from revenue operations, sales leadership, or sales
   compensation.

### Transfers and promotions

Transfers and promotions often use different treatment than new hires. Do not apply a new-hire
guarantee unless the policy or signed plan says so.

Common transfer analysis steps:

1. Identify the prior role, new role, segment, region, and transfer effective date.
2. Check whether the transfer is same-segment, cross-segment, IC-to-manager, manager-to-IC, or
   case-by-case.
3. Apply only the ramp schedule confirmed for that exact scenario.
4. For case-by-case moves, avoid inference and route for official clarification.
5. For temporary transition bridges, apply the bridge only to the eligible role, period, and
   participant named by the signed plan.

## Separate attainment from payout

Never use attainment and payout interchangeably. Build a map like this for the current plan:

| Lever | Quota-attainment effect | Payout effect | Validation needed |
| --- | --- | --- | --- |
| Expansion recurring revenue | Usually retires quota at the eligible amount | Standard pay curve unless a specific kicker applies | CRM amount, product category, close date, ownership |
| New-logo or land revenue | Usually retires quota at the eligible amount | May receive a land premium or kicker | Customer type, opportunity type, eligibility window |
| Prepaid usage commitment | May retire quota if the current plan allows | May participate in the pay curve or pay separately | Usage evidence, billing treatment, plan period rules |
| On-demand usage | Often does not retire quota | Often pays in arrears at a separate rate | Actual usage, invoice, statement timing |
| Multi-year term | Underlying revenue retires quota normally | May add a separate term kicker | Term length, opt-out rights, average ARR basis |
| Professional services | Usually does not retire recurring quota | May pay a flat rate on eligible services bookings | Services eligibility, booking rules, exclusions |
| Premium support or add-on support | May retire quota at a reduced rate | May use the main deal's effective commission rate | Product classification and quota-retirement multiplier |
| Churn and contraction | Reduces net attainment | Reduces curve payout | Netting rules, caps, timing |
| Active SPIF or bonus | Program-specific | Separate bonus or overlay | Official announcement, role eligibility, dates, source of truth |

## Temporary bridge logic

> ⚠️ Temporary bridges and make-whole points are role- and period-specific. Never apply one
> role's bridge, accelerator, kicker, guarantee, or transition schedule to another participant
> without signed-plan evidence.

When a current signed plan includes a bridge:

1. Define the full quota `Q`, variable target `V`, base commission rate `BCR = V ÷ Q`, and net
   credited attainment `A`.
2. Identify the bridge threshold, payout true-up, and accelerator tiers exactly as written.
3. Calculate attainment below the bridge, at the bridge, above the bridge, and above each
   accelerator threshold.
4. For ramping participants, calculate both the ramp-quota checkpoint and the full-quota or
   bridge checkpoint.
5. Remove the bridge in later periods unless the current signed plan renews it.

## Highest-value plays

Prioritize these only after confirming customer fit and close probability:

1. **Target the next valid threshold.** Identify the closest guarantee, ramp quota, full quota,
   bridge, or accelerator tier that actually applies to the participant.
2. **Prioritize high-quality land or expansion.** Favor deals that create real customer value
   and eligible recurring revenue.
3. **Use prepaid usage only when evidence supports it.** Do not oversell credits or replace
   weak usage evidence with compensation logic.
4. **Ask for a true multi-year commitment when it benefits the customer.** Check opt-out
   clauses, average ARR treatment, and term requirements.
5. **Attach services when implementation risk warrants it.** Eligible services can improve
   customer success and may create separate payout.
6. **Stack compatible levers.** A well-qualified deal may combine recurring revenue, usage,
   term, services, support, and a valid bonus program.
7. **Protect crediting hygiene.** Ownership, close date, product classification, accepted
   quote, eligible revenue, and source-of-truth fields must be correct.
8. **Model downside.** Include churn, contraction, clawback, approval, billing, nonpayment, and
   implementation risk.
9. **Capture transition credit only when approved.** Validate support credit, split credit, or
   in-flight transition credit before relying on it.
10. **Monitor bonus programs separately.** A temporary program can change priority only during
    its stated window and for the stated role and metric.

## Deal-structure economics

For each viable structure, calculate:

`Expected payout = curve payout + land premium + term kicker + services payout + usage payout + active bonus - expected clawback or credit risk`

Then compare it with:

`Risk-adjusted comp EV = close probability × expected payout`

Also calculate expected quota retirement separately.

Use these checks:

- Every dollar of discount can reduce eligible recurring revenue, curve payout, term-kicker
  base, and quota retirement.
- A Year 1 one-time discount can change average ARR for a multi-year calculation.
- A longer term does not always create more payout than the minimum eligible term. Choose
  longer terms for customer and business value, not only compensation.
- On-demand usage may create payout without attainment; prepaid usage may create both only if
  the current plan allows it.
- Free credits, free months, unbooked concessions, and unsupported assumptions do not create
  commissionable revenue.
- Support or services may be valuable to the customer even when quota retirement is weaker.
- Expansion true-ups, opt-outs, and cancellation rights can change eligibility.

## Account-research mode

After account fit and sales motion are established, add a private compensation overlay. Do not
let compensation override the customer's correct motion.

For each account, estimate:

1. Eligible revenue that could close in the current period.
2. Close probability and remaining seller effort.
3. Land or expand classification.
4. Contribution to the next applicable guarantee, ramp-quota, full-quota, bridge, accelerator,
   or bonus threshold.
5. Evidence-backed usage potential.
6. Fit for a true multi-year commitment.
7. Services or support need.
8. Churn, contraction, ownership, timing, approval, and clawback risk.
9. Eligibility for current bonus programs.
10. Risk-adjusted payout EV and quota-retirement EV.

Use payout EV as a secondary priority lens after account fit, customer value, and close
probability. Return a ranked table with account, expected revenue, expected attainment impact,
expected payout contribution, lever stack, risk, and next action.

## Quote-review mode

When reviewing or creating a quote:

1. Load the opportunity, primary quote, product lines, term, revenue amount, crediting amount,
   customer type, close date, and ownership.
2. Resolve role, plan period, quota cadence, ramp, guarantee, full quota, ramp quota, variable
   target, attainment to date, and active bonus programs.
3. Classify each component as quota-retiring, payout-only, both, or neither.
4. Compare up to three customer-appropriate structures. For each, show customer value, expected
   revenue, attainment delta, payout delta, approval path, and risk.
5. Name the compensation-efficient structure and the customer-best structure separately when
   they differ.
6. Do not edit the CRM, quote system, billing, or compensation systems unless the user
   explicitly asks for execution.

## Bonus-program monitor

A "no active program" conclusion is only valid after the full search below. Missing a live
program is the most common and most expensive failure mode of this skill.

At every run:

1. Search the primary sales or revenue announcement channel from the start of the current plan
   period through today, filtered to posts by the compensation or sales-leadership announcement
   owner. Search both spellings `SPIF` and `SPIFF`, plus `incentive`, `bonus`, `kicker`,
   `accelerator`, and the participant's role name.
2. Search any secondary or legacy operations announcement channel over the same period, because
   earlier programs are often routed there. Do not conclude that no program exists until every
   announcement channel has been checked.
3. If the channel searches are inconclusive, search current-period announcements from the
   announcement owner across all channels and report the check as inconclusive rather than
   asserting that no program exists.
4. Extract program name, role eligibility, dates, metric, threshold, payout, exclusions, source
   of truth, validation owner, and payment timing.
5. Cross-check the announcement against the current compensation hub or policy source. An
   announcement is the discovery signal; the signed plan and official program terms control
   eligibility and payout.
6. Label the result Active, Announced but incomplete, Expired, Not eligible, or No active
   program found after required checks.
7. Never convert a contest result, shoutout, proposal, or peer interpretation into an active
   entitlement.

## Required inputs

Ask only for missing inputs that materially affect the recommendation:

- Role, segment, region, plan period, quota cadence, new-hire or transfer status, effective
  start date, ramp month, and guarantee status.
- Full quota, ramp quota, applicable variable target, base commission rate, and current net
  attainment.
- Signed-plan status and current compensation statement date.
- Opportunity owner, deal type, close date, stage, probability, eligible revenue, and crediting
  amount.
- Land or expand classification.
- Product mix, usage treatment, term, discount, services, support, renewal, or true-up status.
- Customer evidence and approval state.

If personal plan values are unavailable, use symbolic outputs with `Q`, `V`, and `BCR`. Never
invent them.

## Required output

1. **Current comp context:** plan date, quota period, ramp, attainment, BCR, and source quality.
2. **Attainment versus payout map:** what retires quota and what pays separately.
3. **Recommended play:** the best customer-sound action and why now.
4. **Alternative structures:** expected customer value, attainment delta, payout delta,
   approval path, and risk.
5. **Threshold map:** distance to the applicable guarantee, ramp quota, full quota, accelerator
   tiers, and any current-period bridge.
6. **Bonus-program status:** active programs, eligibility, evidence required, and payment
   timing.
7. **Crediting audit:** fields and ownership to verify in the CRM and compensation statement
   system.
8. **Next action:** one owner, one action, and one deadline or trigger.
9. **Confidence and unknowns.**

## Guardrails

- Optimize only among structures that are true, customer-appropriate, and policy-compliant.
- Never alter ownership, dates, products, usage assumptions, or close timing to manufacture
  credit.
- Never recommend unnecessary seats, usage commitments, term, support, or services solely for
  compensation.
- Never hide a better customer option because it pays less. State the tradeoff.
- Never promise commission, quota credit, approval, or bonus eligibility before official
  validation.
- Never expose personal compensation analysis or internal payout mechanics to the customer.
- Never treat peer behavior, informal anecdotes, or expired programs as policy.
- Keep estimated payout separate from the official compensation statement.
- Flag opt-outs, cancellation rights, nonpayment, unsupported usage, and unapproved concessions
  as clawback or eligibility risks.
- Preserve legal, deal desk, finance, billing, and quote-approval requirements.
- Never generalize a bridge, kicker, guarantee, ramp, or transfer schedule to a different
  participant without current-plan evidence.

