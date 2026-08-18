---
name: qualify-accounts-against-icp
skill: Qualify accounts against your ICP
description: >-
  Separates durable account fit from product and marketing engagement, applies
  your current ICP criteria, and recommends how much sales effort an account
  deserves.
category:
  - Research
  - Analysis
proficiency: Expert
trigger: Agent
notes: >-
  Keeps fit, engagement, and urgency separate so heavy product usage cannot
  inflate fit and temporary low engagement cannot hide a strong ICP. Applies only
  the organization's official ICP, so personal or deal-level benchmarks stay out
  of a classification other people read.
setup: incomplete
---

## 🚀 First run (setup)

Treat this as a first run when `setup: incomplete` is still in the frontmatter, when any
`<placeholder>` below is unfilled, or when the user has never invoked this skill.

Explain to the user, in two or three sentences: this skill classifies an account's durable
fit against your own ICP definition, reports current engagement and timing separately, and
recommends how much effort the account deserves. It runs when an account is being researched
or tiered, or when someone asks whether usage implies revenue potential. It produces a tier,
a confidence rating, evidence-backed rationale, and one recommended action — it never edits
a CRM record.

Then collect the prerequisites, which only the user can supply. The thresholds below are
illustrative and must be replaced with the user's own:

- `<your-icp-doc>` — your company's current ICP definition and activation thresholds,
  including the employee floor for sales-assisted accounts and your target industries. This
  skill is meaningless without it.
- `<your-accounts-db>` — where account records and firmographics live.
- `<your-engagement-source>` — where product activity and marketing engagement live (active
  users, workspace growth, product-qualified activity, AI usage, pricing-page visits,
  marketing-qualified activity).
- `<your-workforce-source>` — how you estimate knowledge-worker headcount versus total
  headcount, and the method you consider defensible.
- `<your-tier-fields>` — the exact fields, if any, where a tier or fit rating is recorded,
  and which of them are owned by another team and must never be written.
- `<your-exception-policy>` — who may approve an exception below the floor, and how it is
  recorded.
- `<your-official-icp-owner>` — who owns the official ICP definition, so personal or
  deal-level variations are kept out of a shared classification.
- Connection names only, never values: your CRM, your analytics or product-usage source, and
  a web-search or research tool, so the user can confirm each is authorized.

Walk through the placeholders one at a time. After each answer, restate the mapping back to
the user ("the floor is X employees, and exceptions are approved by Y"), then have them save
the filled value into their own copy of this skill.

Until setup is complete, the skill has no ICP to apply and no defensible workforce method, so
it must not assign a tier or claim an account is outside ICP.

When every placeholder is filled and confirmed, set `setup: complete` in the frontmatter so
later runs go straight to the workflow.

> 🎯 Classify an account's durable fit before using product engagement or current intent to
> prioritize timing. Keep fit, engagement, and urgency separate.

## Use this skill when

- Researching or tiering an account in a book of business.
- Deciding whether an account deserves deep sales and solutions effort.
- Explaining why strong product usage does or does not imply strong revenue potential.
- Reassessing fit after a company, workforce, technology, or strategy change.

## Refresh your ICP source first

Load `<your-icp-doc>` for the current ICP definition and activation thresholds. Treat draft
thresholds as current guidance, not permanent policy; if a newer approved ICP source
conflicts, follow the newer source and record the difference.

## Core separation

1. **Account fit**: durable revenue and strategic potential from firmographics, workforce,
   operating complexity, technical org, AI maturity, tool environment, growth, and likely
   buying committee.
2. **Engagement**: current product activity and marketing engagement.
3. **Timing**: why the account should act now (new leadership, reorg, funding, M&A, AI
   mandate, migration, hiring, or a measurable workflow problem).

Do not inflate fit because engagement is high. Do not dismiss a high-fit focus account
solely because engagement is low.

## Step 1: Apply the sales-assisted floor

- Use the employee floor from `<your-icp-doc>` (for example, 100+ employees) for named
  sales-assisted accounts.
- Allow an explicit exception only for unusual complexity, strategic value, a credible
  contract path, or a strong multi-team expansion case. Label the exception and record it per
  `<your-exception-policy>`.

## Step 2: Assess durable fit

### Company and workforce

- Digitally mature organization type: B2B SaaS, software, AI-native, vertical SaaS,
  developer tools, fintech, healthtech, and similar.
- Knowledge-worker-adjusted workforce, not total headcount.
- Multi-team workflows, handoffs, program complexity, and standardization needs.
- Size and influence of engineering/product/design, plus IT or operations capacity to
  support scale.
- Corporate functions that can adopt the product versus field-, retail-, or line-heavy roles
  that shrink the addressable population.

### AI and operating model

- Active AI roadmap, AI-enabled products, or a public transformation mandate.
- Broad assistant or copilot deployment already in place.
- AI platform, governance, ML engineering, knowledge management, business systems, or
  transformation roles.
- Need for durable, trusted context that agents and teams can read and update.
- Modern culture and willingness to adopt new workflows.

### Tool and system environment

- Fragmentation across wikis, ticketing, drives, chat, and overlapping point solutions.
- No unified knowledge or context layer.
- Active consolidation, migration, search, governance, or standardization initiative.
- Whether incumbent tools are deeply mandated and considered good enough.

### Growth and strategic value

- Funding, profitability, revenue growth, hiring, expansion, M&A, or executive change.
- Financial distress, broad layoffs, cost-cutting-only posture, or procurement constraints.
- Marquee or strategic value that justifies a documented manual exception.

### Buying group and change capacity

- A likely technical champion (VP Engineering, Head of Product, CTO).
- IT or operations co-buyers responsible for systems, governance, security, or
  standardization.
- An executive sponsor with a measurable business priority.
- Power users or builders who can prove the first workflow.
- A credible change owner; penalize accounts with no champion path.

## Step 3: Classify fit

- **Tier A (best fit)**: digitally mature industry, headcount in your sweet spot, strong
  technical/IT/ops or AI function, tool sprawl or consolidation need, clear first workflow
  and multi-team expansion path.
- **Tier B (good fit)**: tech-forward or digitally mature organization with a meaningful
  product/IT/ops function, some AI adoption or existing footprint, credible but less proven
  wedge, urgency, or buying group.
- **Tier C (potential fit)**: meets the floor but limited technical org, unclear
  modernization, dominant incumbents, or fewer addressable knowledge workers; needs a
  specific use case or strategic reason.
- **Outside ICP**: below the floor without an exception, primarily offline workforce, no
  meaningful product/IT/ops/transformation function, or no wedge, expansion path, buying
  group, or change motion.

## Step 4: Overlay engagement and timing

| Fit and engagement | Recommended action |
| --- | --- |
| High fit, high engagement | Prioritize now: build an account POV, map executives, act on the signal. |
| High fit, low engagement | Build demand with targeted outbound, executive education, and a workflow hypothesis. |
| Lower fit, high engagement | Qualify the use case, addressable workforce, and buying committee before investing deeply. |
| Low fit, low engagement | Deprioritize or nurture. |

## Required output

1. ICP classification: Tier A, B, C, or Outside ICP.
2. Fit confidence: High, Medium, or Low.
3. Pure fit rationale: three to five evidence-backed reasons that exclude current engagement.
4. Engagement overlay, reported separately.
5. Timing: the strongest why-now event, or Unknown.
6. Addressable workforce: total employees, estimated knowledge workers, and method.
7. Buying-group coverage: likely economic buyer, champion, technical evaluator, admin,
   builder.
8. Disqualifiers and risks.
9. Exception rationale when recommended outside normal thresholds.
10. Action: Prioritize now, Build demand, Qualify lightly, Nurture, or Deprioritize.

## Guardrails

- Use verified internal data before public estimates.
- Label every critical input Verified, Corroborated, Inferred, or Unknown.
- Never treat total employees as total seat potential.
- Never combine fit and engagement into one unexplained score.
- Do not hide a weak ICP behind heavy usage, or a strong ICP behind temporary low
  engagement.
- Record which ICP source and date were applied.
- Apply the official ICP only. Personal book-level ICP adjustments and internal deal
  benchmarks stay out of this classification, because other people read the output.
