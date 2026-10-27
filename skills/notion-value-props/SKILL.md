---
name: "notion-value-props"
skill: "notion-value-props"
description: "Map account signals and buyer roles to a connected-workspace value proposition, proof point, and low-friction follow-up offer."
category:
  - Sales
  - Writing
  - Research
proficiency: Expert
trigger: Manual
notes: "Public, de-identified playbook for outbound messaging and resource selection."
setup: incomplete
---

## 🚀 First run (setup)

Detect a first run when no setup marker has been recorded, a required placeholder is still unfilled, or the user has never invoked this skill. This skill turns account and buyer signals into a focused connected-workspace value proposition, a tailored follow-up offer, and a verified resource to share. It is invoked manually while preparing outbound messaging or an executive point of view, and it produces messaging that connects the buyer's tools and data to a concrete workflow rather than pitching workspace consolidation.

Before using it, ask the user to supply:

- Their account and contact source, such as a CRM or account database.
- Their product-signal source, such as usage analytics, integration events, form submissions, or an account-research database.
- Their approved public proof library: customer stories, technical documentation, templates, or case studies.
- Their outbound drafting destination and any style guide or sequence template.
- The names of available tools, connections, and credential variables. Never ask for credential values in the skill.

Walk through each placeholder one at a time. After each answer, restate the mapping (for example, `account source → <your-accounts-db>`) and ask the user to confirm it. Have the user save the confirmed values in their own copy of this skill. Until setup is complete, do not claim to have read private account data, verified a proof point, or selected a resource from an unavailable library. After confirmation, record `setup: complete` in the frontmatter and skip this section on later runs.

## Purpose

Use this skill to create outbound messaging that explains how a connected workspace can bring a company's tools, data, and recurring work into a governed system of record. The primary pain is lost context between teams and systems—not the existence of multiple workspaces.

## Inputs and outputs

### Inputs

- Buyer role and function.
- Account priorities, current workflow, and known tools.
- Product or engagement signals, with source and recency.
- Approved customer proof and public resources.
- Any constraints on claims, offers, or tone.

### Outputs

Return:

1. The best-fit value proposition in one or two sentences.
2. The recommended motion: agentic workflow, AI transformation, or core AI.
3. A persona-specific proof framing.
4. One verified resource to share for each outbound email that needs one.
5. A low-friction follow-up offer appropriate to the buyer's authority and technical involvement.
6. A short rationale and the evidence used, including uncertainty where signals are weak.

## Core positioning principle

Position the product as the connected system of record that links a company's tools and data so people and AI systems can read and write shared context across teams.

Do not lead with merging or unifying separate workspaces. Translate the observed pain into a context problem:

- Product and engineering: research, designs, requirements, feedback, and delivery work lose context across design, issue tracking, source control, and team communication.
- Operations and customer teams: vendor records, procedures, files, order details, and schedules are split across drives, business systems, and team spaces.
- Data teams: analysis, notebooks, warehouse results, and executive readouts drift apart.
- AI and automation teams: agents lack durable, governed context or cannot write useful results back into the team's operating system.

Use the tools named in the evidence, but do not imply an integration or capability that has not been verified.

## Choose the motion

1. **Agentic workflows (default):** Choose this when the buyer has a recurring workflow and several systems that should exchange context. Describe the trigger, the context layer, the action, and the durable record that is updated.
2. **AI transformation:** Choose this for executive or multi-department initiatives. Emphasize governance, shared context, permissions, and a durable operating layer for human and AI work.
3. **Core AI (exception):** Choose this when the buyer is not yet deploying autonomous agents. Focus on search, meeting knowledge, and connected cross-team context without overclaiming autonomy.

## Persona and signal matrix

| Persona | Useful signal | Value proposition angle | Safe proof framing |
| --- | --- | --- | --- |
| AI, automation, or engineering leader | High use of coding assistants, agent frameworks, or context APIs across teams | Connect technical sources, documents, drives, and project trackers into one governed context layer so agents do not miss critical information. | "Teams building AI systems at a leading technology company" or another approved, role-relevant public example. |
| Product, UX, or product operations leader | Design work, issue tracking, source control, feedback, and AI usage appear together | Keep research, designs, requirements, customer feedback, and delivery work connected so specifications retain context through launch. | "Product teams at an approved design or developer-platform customer," with the reason for the comparison. |
| Supply chain, manufacturing, customer experience, or operations leader | New systems, shared drives, business-system data, or schedule synchronization | Connect vendor trackers, procedures, files, order specifications, and schedules in one shared operating hub. | "An approved commerce or operations customer," with the relevant workflow named. |
| Software engineer, AI engineer, or automation builder | Integration activity, API work, agent experimentation, or a public waitlist signal | Use the workspace as a two-way context layer for engineering and coding agents with scoped permissions and durable write-back. | "Engineering teams at an approved technology customer," only when the proof is public and relevant. |
| Workspace administrator or security leader | New team spaces, integration governance, access-control, or security workflow signals | Govern integrations, permissions, and security workflows in one place without sacrificing team-level execution. | Use a public governance example, and state exactly what it demonstrates. |
| QA or release leader | Delivery-system activity combined with an AI-agent or automation signal | Connect the delivery system and team context to automate checklists, evidence capture, and release sign-off. | Use a public release-quality example that actually supports the claim. |
| Analytics or data leader | Notebook, warehouse, KPI, or recurring-analysis signals | Keep analysis, source data, and executive readouts connected so recurring decisions stay current. | Use a public data or analytics example with a matching use case. |

## Resource to share rules

Every outbound Email #1 and Email #2 should include a `Resource to Share (Source of Truth)` bullet when the sequence calls for a resource. Select the exact approved public customer story, technical document, or workflow template that supports the promise in that email.

Before selecting a resource:

1. Verify that it is in the approved proof library.
2. Confirm that it supports the specific persona, signal, and claim.
3. Prefer a concrete workflow or customer outcome over a generic product page.
4. Explain why the resource is relevant; never assume the buyer recognizes a customer brand by name alone.
5. If no resource is verified, say so and choose a safe educational offer instead of inventing proof.

## Follow-up offer rules

- Discuss seat capacity, licensing, or administration only with a verified workspace owner or administrator.
- Offer technical documentation to engineering leaders or individual contributors who are not verified administrators.
- Reserve credits, beta access, or special advocacy for people who are actively building or running agents, automations, or data workflows, or who have submitted a relevant request.
- When offering a rare concession, ask for a better understanding of the use case first. Do not promise access that has not been approved.
- Do not ask directly for a meeting. Use a give-get such as sending documentation, mapping the workflow, or creating a system diagram if the buyer shares enough context.
- Vary the language of the offer so every message sounds natural. Examples: "I can map the workflow if useful," "I can sketch the architecture," and "Happy to send the technical documentation if that would help."

## Operating workflow

1. **Normalize the evidence.** Separate facts, inferences, and missing information. Record the source and recency of every important signal.
2. **Identify the job to be done.** State what the buyer is trying to accomplish, not merely which tools they use.
3. **Select the motion.** Use the three-motion guidance above; default to a concrete recurring workflow.
4. **Write the value proposition.** Name the connected tools or data, the context failure, and the business outcome in plain language.
5. **Select proof.** Match one verified public resource to each promised outcome and add the reason it fits.
6. **Choose the offer.** Use the buyer's authority and technical involvement to choose documentation, a workflow map, a system diagram, or a narrowly approved concession.
7. **Draft the message.** Keep the opening specific to the signal, avoid unsupported claims, and use a low-friction give-get.
8. **Run the checks.** Confirm that the message does not lead with workspace consolidation, mention unverified seats or benefits, use a customer name without context, or include an unsupported resource link.

## Quality checklist

- [ ] The message connects tools and data instead of selling workspace consolidation.
- [ ] The signal is explicit, recent enough, and tied to a buyer-relevant job.
- [ ] The selected motion matches the buyer's maturity.
- [ ] The proof is approved, public, and actually supports the claim.
- [ ] The resource bullet explains why the resource is relevant.
- [ ] Any administration or seat language is limited to verified administrators.
- [ ] Any credits, beta, or advocacy offer is limited to an active builder and is framed as conditional.
- [ ] The message avoids a direct meeting request and uses a useful give-get.
- [ ] Unknowns are labeled instead of filled with guesses.

## Example transformations

**Weak:** "You have several workspaces, so we can consolidate them."

**Better:** "Your design, delivery, and customer-feedback systems appear to be carrying different parts of the same launch context. A connected workspace can give the team one governed place to keep the specification current as work moves from signal to ship."

**Weak:** "I can get you extra AI credits."

**Better:** "If I understood the automation you are building more clearly, I could determine whether an approved technical-access path is relevant. I can also send the documentation for the workflow pattern."

**Weak:** "Here is a famous customer story."

**Better:** "This public story is relevant because it shows how a product team connected research and delivery context across the same handoff you described."
