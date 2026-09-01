## 🚀 First run (setup)
Treat this as a first run when `setup: required` is recorded, any placeholder below is unfilled, or the user has never invoked this skill. This skill turns customer context and evidence into a short, customer-facing business review. It triggers when a user asks for a business, executive, value, account, stakeholder, or one-pager review and produces a visual document that leads with customer value rather than product detail.
Before proceeding, ask the user to supply these prerequisites:
1. The account or customer source, such as `\<your-accounts-db>` or the equivalent CRM record source.
2. The meeting, notes, or customer-feedback source, such as `\<your-meetings-source>`.
3. The product-usage or adoption source, such as `\<your-usage-source>`, when adoption evidence is needed.
4. The destination document database, such as `\<your-customer-docs-db>`, including its one-pager document type, draft status, author field, and account relation field.
5. The connected tools, data sources, and credential or environment-variable names required to access those sources. Provide names only, never credential values.
Walk through each placeholder one at a time. After each answer, restate the mapping for confirmation, then have the user save the filled values in their own copy of this skill. Until setup is complete, the skill cannot reliably resolve an account, reconcile evidence, verify adoption, include relevant customer context, or file the finished review. When every placeholder is filled and confirmed, change `setup: required` to `setup: complete` in the frontmatter so later runs skip directly to the workflow.
## 🎯 Purpose
Create a customer-facing business review that establishes upfront value. Ground the story in the customer's strategic goals, experience, use cases, adoption, and outcomes. Make the value clear before discussing product details.
## 📥 Required inputs
1. Account or customer name
2. Customer audience and role
3. Review period
4. Customer strategic priorities and desired outcomes
5. Whether there is an active customer conversation about billing or payments
If the audience or account is unclear, ask one short question. If the billing or payment state is unknown, exclude all commercial information.
## 🔎 Evidence
Use evidence that reflects the customer experience:
- Customer-stated priorities, feedback, and success criteria
- Confirmed workflows and use cases
- Product or service adoption signals that support a value claim
- Documented outcomes and examples
- Friction that limits customer value
Do not include internal health scores, fit scores, forecasts, pipeline details, qualification fields, private account opinions, or internal review methods.
## 🧭 Workflow
1. Start with the customer's strategic objectives.
2. Identify the operational changes enabled by the product or service.
3. Connect each change to customer value, such as better decisions, faster execution, lower risk, stronger governance, improved employee experience, growth, or operating leverage.
4. Support each value claim with confirmed customer evidence or relevant product usage. State Unknown when evidence is missing.
5. Distinguish value already realized from value the customer can establish next.
6. Include billing or payment information only when an active customer conversation exists and the topic is material to the customer experience.
7. Remove commercial status, deal mechanics, internal timelines, internal owners, and the provider team's next steps.
## 📄 Output shape
Use only these sections:
1. Value headline: one clear statement of why the product or service matters to this customer.
2. Strategic objectives: the business outcomes the customer wants.
3. Customer experience today: what has changed for teams, administrators, and leaders.
4. Value realized: confirmed outcomes with concise evidence.
5. Value chain: operational change to business impact.
6. Priority use cases: use case, customer need, experience, evidence, and value.
7. Opportunity ahead: the next customer value to establish, without an internal action plan.
8. Billing or payments: optional. Include only for an active customer conversation.
Keep the page short and visual. Start each section heading with an emoji. Do not repeat the title as an H1. Give the page a relevant icon.
## 🛡️ Guardrails
- Lead with customer value, not product features or usage counts.
- Use adoption data only when it proves or explains value.
- Do not include exhaustive workspace or environment inventories, internal IDs, commercial state, deal timelines, or internal next steps.
- Do not include pricing, renewal details, billing, or payments unless the active customer conversation requires them.
- Do not imply attribution that the evidence does not support.
- Never use an em dash.
## 📁 Filing
File the review in the configured customer-facing document database as a one-pager. Set its status to Draft, assign the configured author, and set the account relation to the exact matching account. Ask one short question if the account match is ambiguous. Return the page URL and do not leave the review only in chat.
Do not delete an existing review unless the user asks. Do not create a companion skill page. Keep this skill's instructions in the skill document.