## 🚀 First run (setup)
Treat this as a first run when `setup:` above still reads `required`, any `<placeholder>`
below is unfilled, or the user has never invoked this skill. Run the setup conversation
before recommending a motion.
1. Explain the skill in two or three sentences: it reads the account evidence you have and
	recommends one of three sales motions, then translates that choice into a first workflow,
	buying group, proof plan, implementation path, and expansion sequence. It runs when an
	agent or person asks how to pursue an account or reassesses after new evidence. It
	produces a structured recommendation with confidence, rationale, risks, and a single next
	best action.
2. Collect the prerequisites from the user — names and links only, never credential values:
	- `<your-sales-process-doc>` — the current, approved sales process and stage definitions
		this skill must re-read on every run, plus how to tell approved from draft.
	- `<your-motion-definitions>` — your company's own motion or play definitions, if they
		differ from the three below, and the names you use for them.
	- `<your-accounts-db>` and `<your-opportunities-db>` — where account and deal evidence
		lives.
	- `<your-usage-source>` — where seat, credit, and adoption utilization can be checked
		before recommending expansion.
	- `<your-roles-map>` — which roles own adoption versus new incremental revenue in your
		organization, and who owns implementation and services.
3. Walk through the placeholders one at a time, restate each mapping back for confirmation,
	and have the user save the filled values into their own copy of this skill.
4. Until setup is complete the skill cannot cite your real process or utilization data; it
	can only explain the motion framework generically.
5. When every placeholder is filled and confirmed, set `setup: complete` in the frontmatter
	so later runs go straight to the workflow.
> 🧭 Choose the customer motion that best fits the account and opportunity. Use one sales
> process and tailor the workflow, stakeholders, proof, and implementation depth to the
> selected motion.
## Use this skill when
- Turning account research into a pursuit strategy.
- Qualifying a new opportunity.
- Choosing the first workflow, buying group, proof plan, and services path.
- Recommending an expansion motion for an existing customer.
- Reassessing the motion after new executive, usage, or workflow evidence.
## Refresh the process source first
Load your company's current sales-process and motion definitions before recommending
anything. If the process is in draft, treat unresolved role assignments as open questions
rather than policy, and follow a newer approved process when one exists.
## Principle: one process, three motions
Every motion must:
- Identify the customer's business priority and measurable pain.
- Select a first workflow.
- Identify users, owner, data, integrations, and success criteria.
- Build or configure workflow evidence with the customer before close.
- Define a roadmap beyond the first workflow.
- Carry the business case, implementation path, and next workflow into adoption and
	expansion.
## Motion 1: Workflow-led (default)
Use when a function has a specific workflow pain, a champion can own a production workflow,
users/process/data/integrations/value can be discovered concretely, and there is a credible
roadmap beyond one workflow.
- **Land**: one workflow deployed in production, with a multi-workflow roadmap scoped from
	the start.
- **Sell**: discovery to workflow level, build or configure the workflow live with the
	customer, prove value against agreed success criteria, expand workflow by workflow, and
	engage professional services for custom or large multi-workflow builds.
## Motion 2: Transformation (destination)
Use when executives have urgent priorities, the company has cross-functional complexity and
needs shared governed context, there is a credible organization-wide roadmap, technical
champions can design architecture and orchestration, and services involvement is justified.
- **Land**: your platform as the company's system of record that agents and models read
	from and write back to.
- **Sell**: align with executives early, map priorities, architecture, governance, and
	success measures, design a phased multi-workflow roadmap, and include services.
Do not select this motion just because the company talks about AI. Require executive
urgency, organizational scope, and a credible transformation path.
## Motion 3: Core platform (exception)
Use when the customer explicitly wants context and collaboration but not workflow
automation or transformation, is upgrading for admin, security, search, or collaboration, or
already has another automation solution they will not replace now.
- **Land**: core capabilities plus one lightweight automated workflow.
- **Sell**: find a champion beyond IT, demonstrate how daily work changes rather than a
	feature list, create an adoption and change plan, and preserve a path into the other
	motions.
Never use this as a documentation-only motion.
## Motion decision workflow
1. **Start with customer outcome**: what business result are they trying to create?
2. **Find workflow evidence**: can a recurring workflow be named, owned, built, and
	measured?
3. **Assess scope**: one function, several, or organization-wide?
4. **Assess sponsorship**: functional champion only, or executive urgency plus technical
	partnership?
5. **Assess complexity**: data, integrations, governance, security, implementation help.
6. **Choose the highest supported motion**: default to workflow-led; move up only with
	evidence; use core platform only by exception.
7. **Define proof**: first workflow, success criteria, activation plan, implementation path,
	roadmap.
## Stage implications
- **Qualification**: validate account and opportunity fit, confirm real pain, document the
	likely motion, identify an early champion.
- **Discovery**: confirm objectives, pain, stakeholders, decision process, required
	capabilities, workflow candidates, and the economic buyer; confirm the motion; schedule
	workflow activation.
- **Workflow activation**: align on first workflow and success criteria, build it with the
	customer, complete technical validation, validate the business case with the champion,
	scope the implementation roadmap, and choose services, partner, or self-serve
	implementation.
- **Close and handoff**: carry forward business priority, success measures, stakeholders,
	first-workflow results, roadmap, business case, and implementation path. Never hand off
	generic notes.
## Existing-customer and expansion logic
- If purchased seats or credits are underused, prioritize activation and value realization
	before claiming incremental expansion.
- Adoption roles generally lead recovery and deeper use in existing functions; sales roles
	lead new incremental-revenue motions such as a new function, stakeholder group, seats,
	credits, or contractual expansion.
- If no workflow is live, treat landing the first workflow as a resell motion.
- If workflows are live and value is proven, deepen within the function and pursue net-new
	workflows in new functions.
- Treat ownership rules from draft internal discussions as provisional when an explicit
	opportunity owner or regional process differs.
## Required output
1. Recommended motion.
2. Confidence: High, Medium, or Low.
3. Why this motion, with evidence.
4. Why not the other motions.
5. First workflow hypothesis: owner, users, trigger, steps, data, integrations, output,
	measurable value.
6. Roadmap: two to four next workflows or functions.
7. Buying group: champion, economic buyer, technical evaluator, admin, workflow owner,
	executive sponsor.
8. Proof plan: discovery gaps, activation goal, success criteria.
9. Implementation path with rationale.
10. Commercial path: seats, credits or usage-based pricing, plan or security upgrade,
	services, expansion sequence.
11. Risks and blockers.
12. Next best action: one owner, one action, one deadline or trigger.
## Guardrails
- Default to the workflow-led motion, not the core-platform exception.
- Do not recommend transformation without executive urgency and multi-department evidence.
- Every motion needs workflow evidence; feature interest is not a production workflow.
- Do not recommend more seats or credits before checking utilization and addressable
	workforce.
- Label assumptions and missing evidence, and record the process source and date used.