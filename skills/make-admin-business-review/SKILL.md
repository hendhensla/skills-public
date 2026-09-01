---
name: "Admin Business Review"
skill: make-admin-business-review
description: "Create a customer-facing admin business review that explains administration, adoption, governance, and realized value."
category:
  - Analysis
  - Research
  - Customer Scoping
proficiency: Advanced
trigger: "Manual or agent request for an admin, adoption, governance, or workspace administration review"
notes: "Focus on customer experience and value. Exclude internal account-review mechanics and commercial information unless an active customer conversation makes billing or payments relevant."
setup: incomplete
---

## 🚀 First run (setup)

Detect a first run when no `setup: complete` marker is recorded, a required placeholder is still unfilled, or the user has never invoked this skill. This skill creates a customer-facing admin business review when the user requests an admin, adoption, governance, or workspace administration review. It produces a concise one-pager grounded in customer goals, evidence, adoption, administration, and realized value.

Before using it, the user must supply:

- Access to the customer documents, feedback, workflows, and outcome evidence they want reviewed.
- Access to relevant adoption or engagement signals, if available.
- Their customer accounts database or equivalent source for identifying the exact account.
- Their customer documentation space or destination for filing the finished review.
- Any tools or connections needed to read those sources and write the final page.
- Credential or environment variable names required by those tools, if applicable. Never record credential values in this skill.

Walk through each placeholder one at a time. For every source, ask the user to provide its own mapping, confirm the mapping back to them, and have them save the filled values in their own copy of this skill. Until setup is complete, the skill cannot reliably retrieve evidence, resolve the customer account, or file the finished review. After all mappings are confirmed, record `setup: complete` in the frontmatter so later runs skip directly to the workflow.

## 🎯 Purpose

Create a customer-facing admin business review that establishes value from the customer’s experience. Show how Notion supports effective administration, employee adoption, governance, and business outcomes. Do not turn the review into an internal account assessment.

## 📥 Required inputs

1. Account name
2. Customer audience and role
3. Review period
4. Customer goals for administration, adoption, and governance
5. Whether there is an active customer conversation about billing or payments

If the billing or payment state is unknown, exclude all commercial information.

## 🔎 Evidence

Use evidence that reflects the customer experience:

- Customer-stated goals, feedback, and concerns
- Documented workflows and use cases
- Product adoption and engagement signals that help explain customer value
- Confirmed outcomes, examples, and customer stories
- Open admin friction that affects employees or business outcomes

Do not include internal health scores, fit scores, forecasts, pipeline details, qualification fields, private account opinions, or internal account-review methods.

## 🧭 Workflow

1. Identify the customer’s desired admin and employee outcomes.
2. Gather customer statements and product evidence that show progress toward those outcomes.
3. Translate adoption data into plain-language value. Explain what the customer can do better, faster, or more consistently.
4. Separate confirmed value, emerging value, and unknowns. Do not estimate missing results.
5. Include billing or payment information only when an active customer conversation exists and the topic affects the admin experience.
6. Write the review for the customer. Remove internal timelines, internal owners, sales next steps, and commercial commentary.

## 📄 Output shape

Use only these sections:

1. Value headline: the clearest statement of value for the customer.
2. Customer goals: the outcomes the admin team and business want.
3. Admin experience: what is working and where administration is easier or more reliable.
4. Employee experience and adoption: how people engage with Notion and what that enables.
5. Value evidence: confirmed outcomes, examples, and relevant usage signals.
6. Opportunities to deepen value: customer-centered opportunities, not our team’s next steps.
7. Billing or payments: optional. Include only for an active customer conversation.

Start each section heading with an emoji. Do not repeat the title as an H1. Give the page a relevant icon.

## 🛡️ Guardrails

- Lead with customer value, not product telemetry.
- Use usage data only when it explains the customer experience or supports a value claim.
- Do not include exhaustive workspace inventories, internal IDs, commercial status, deal timelines, or internal action plans.
- Do not include contracted seats, pricing, renewal details, billing, or payments unless the active customer conversation requires them.
- State Unknown when evidence is missing.
- Never use an em dash.

## 📁 Filing

File the review in the user’s customer documentation space as a customer-related one-pager. Set its status to Draft, assign the user’s chosen author, and link it to the exact matching account in the user’s accounts database. Ask one short question if the account match is ambiguous. Return the page URL and do not leave the review only in chat.

Do not create a companion skill page. The user’s configured skill catalog row is the home for the skill.
