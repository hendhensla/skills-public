---
name: answer-customer-security-questions
skill: Answer customer security questions
description: >-
  Answer customer-facing security, privacy, and compliance questions from your
  company's trust-portal source of truth, return source hyperlinks, add staged
  discovery questions, and calibrate flexibility to the customer's plan tier.
category:
  - Research
  - Reference
proficiency: Advanced
trigger: Agent
notes: >-
  Use for customer, prospect, deal, RFP, and security-review questions. Always
  query the trust-portal connection and return source hyperlinks. Internal chat
  threads and internal docs give context only, never customer-facing evidence.
notion_row: >-
  https://app.notion.com/p/Answer-customer-security-questions-3c098c2112688159985ec4ffdca435f5
notion_doc: >-
  https://app.notion.com/p/Answer-customer-security-questions-3c098c211268815abe59c34f0f54adb3
---

## 🚀 First run (setup)

Treat this as a first run when no `setup: complete` line is recorded in this file, when any
`<...>` placeholder below is still unfilled, or when the user has never invoked this skill.
Run setup before answering any customer security question.

1. **Explain the skill in two or three sentences.** Tell the user this skill answers
   customer-facing security, privacy, and compliance questions strictly from their company's
   trust-portal source of truth, returning a plain-English answer plus the most specific source
   hyperlink for every material claim. It runs whenever a customer, prospect, RFP, questionnaire,
   or procurement review raises a security question, and it also adds two to four staged discovery
   questions and calibrates flexibility to the customer's plan tier. It stops rather than
   answering from memory when the portal cannot be verified.
2. **Collect the prerequisites the user must supply.** Never guess these.
   - `<your-trust-portal-connection>` — the approved trust-center or security-knowledge
     integration, and the names of its search, certification-check, and posture-summary tools.
   - `<your-proxy-service>` — the deployed proxy to route through if the portal requires a
     specific header, plus the CLI command used to invoke it. Never ask the user to paste a token
     into chat.
   - `<your-public-trust-center-url>` — the customer-shareable entry point used when no direct
     document URL is returned.
   - `<your-security-questions-channel>` — the internal channel searched for prior phrasing and
     routing (context only).
   - `<your-internal-security-docs>` — internal process and ownership docs (internal steps only).
   - `<your-crm>` — where plan tier and deployment size are read from.
   - `<your-escalation-owners>` — the security/GRC contact for company-infrastructure questions
     and the product contact for product-security or roadmap questions.
   - The credential and environment variable **names** the portal connection needs, never values.
3. **Walk the placeholders one at a time.** Ask for one value, restate the mapping back to the
   user in plain language, correct it if wrong, then move on. Have the user save the filled values
   into their own copy of this file.
4. **State the limits until setup is complete.** Without a working trust-portal connection the
   skill cannot make any customer-facing security claim and must say the portal could not be
   verified. Without CRM plan context it must ask a discovery question instead of calibrating
   flexibility, and internal channels or docs can never substitute for portal evidence.
5. **Record completion.** Change the frontmatter line to `setup: complete` and note the date, so
   later runs skip straight to the workflow.

## 🛡️ Objective

Answer customer-facing security questions with current information from your company's
trust-portal or security-knowledge connection, and return hyperlinks to the underlying sources.

If the user asks for advice on how to answer a security question themselves, do not run the portal
workflow. Reply with the seller playbook section below.

## 🔌 Required connection

Use the approved trust-portal integration for every security question tied to a customer,
prospect, deal, RFP, questionnaire, procurement review, or customer meeting. Typical operations:

1. List available tools when the schema is unknown.
2. Call a named tool with JSON arguments.

Prefer:

- A trust-center search tool for policies, controls, documents, subprocessors, and targeted
  topics.
- A certification check for SOC 2, ISO 27001, HIPAA, GDPR, PCI DSS, or similar.
- A broad posture summary only for broad posture requests.

## 🧭 Connection routing

If the portal requires a proxy (for example, a specific Origin header), route through the approved
proxy service rather than a direct MCP connection that cannot send it. If the integration tool is
unavailable in the current session, invoke the deployed proxy from the terminal with your platform
CLI, passing the operation, tool name, and arguments as JSON. Never ask a user to paste a token
into chat.

## 🧵 Internal context sources

Use these for internal context only; they never supply customer-facing evidence.

- **Internal security-questions chat channel**: search past questions and answers on the topic for
  phrasing and routing.
- **Internal docs**: check for process or policy context such as ownership, escalation, and
  internal requirements.

Rules:

- Never paste internal chat or internal doc content into a customer-facing answer.
- If an internal thread contains a useful answer, verify the claim through the trust portal before
  it reaches a customer.
- Customer-shareable claims come only from trust-portal sources or public product pages.

## 🔎 Workflow

1. Identify the customer's exact question and the claim that needs support.
2. Search the internal security channel for prior answers (context only).
3. For process or policy questions, check internal docs (internal steps only).
4. Query the trust portal before drafting. Never answer security claims from memory or internal
   threads.
5. Distinguish certifications, audit reports, policies, contractual terms, and controls; they are
   not interchangeable.
6. If the first result lacks a source URL, run a targeted search for the named document,
   certification, control, or subprocessor.
7. Preserve every relevant URL. Prefer the exact document or control URL over a homepage.
8. If no specific URL exists after a targeted search, link the public trust center as the entry
   point and say no direct source link was returned. Never invent a URL.
9. Use customer or deal context to frame the response, never as evidence.

## ✍️ Output

Lead with a direct, customer-ready answer in plain English. For each material claim, attach the
most specific source hyperlink, state access requirements when a document requires a request, and
preserve meaningful scope limits.

## 🔍 Discovery

Every suggested response includes 2 to 4 discovery questions after the answer and before Sources,
matched to the stage of the security conversation.

**Early stage** (first ask, no active review): keep it light.

- **Reason behind the ask**: renewal, new use case, vendor review, general diligence, and who
  raised it.
- **Requester seniority**: an executive ask signals real deal risk and deserves a fuller, faster
  response; an individual-contributor checklist item can get a lighter touch.
- **Account footprint**: how the team uses the product today, how many people, which groups.
- **Path from here**: what a satisfactory answer unlocks.

**Later stage** (active review, questionnaire, ongoing thread): go deeper.

- **Policy specifics**: which internal policy, framework, or contractual clause drives the
  question.
- **Scope**: data types, user groups, plan, and product surfaces covered.
- **Stakes**: what approval unlocks and who signs off.
- **Deal breakers versus nice to haves**: which requirements are hard blockers, so effort goes to
  blockers first.
- **Consequence of a blocker**: ask directly what happens if a requirement cannot be met; the
  answer reveals whether it is truly binary and who decides.
- **Timeline and format**: when they need it and in what form (email, questionnaire, docs under
  NDA, call with the security team).

**Two delivery channels**:

1. In the suggested email: 2 to 4 customer-facing questions, staged as above.
2. As coaching to the user in chat: what to figure out before or during the exchange (blockers
   versus preferences, true origin of the ask, requester seniority, expansion path).

Rules: select the most relevant questions instead of dumping a checklist, do not front-load deep
policy questions on first touch, use the customer's language, and never make security claims
inside discovery questions.

## 🎚️ Plan-tier calibration

Identify the customer's plan and deployment size from deal context or the CRM. If unknown, add a
discovery question.

- **Large existing enterprise customer**: more flexibility. Reference enterprise-tier capabilities
  (audit logs, advanced admin and security controls, documentation under NDA) and offer deeper
  engagement such as a call with the security team.
- **Small footprint on a lower tier**: less flexibility. Keep commitments to public documentation
  and the trust center. Do not offer enterprise-only accommodations or custom review processes.

For non-enterprise customers, include language that works toward an enterprise conversation by
tying their requirement to enterprise-tier capabilities and probing for a larger rollout.

Rules: never state or imply a control exists on the customer's current plan when it is
enterprise-only, and frame the rollout language as solving their stated concern rather than as an
upsell.

End with:

### Sources

- 1 to 5 unique Markdown hyperlinks with descriptive labels, no duplicates.
- Never cite the proxy, this skill, an internal thread, an internal doc, or an unsourced summary as
  evidence.

## 📖 Seller security playbook

Guidance for the user, not an agent workflow.

1. Sort the question into *company* (infrastructure, certifications, encryption, internal logging)
   or *product* (security toggles, audit log, compliance integrations).
2. Company infrastructure: start with public security and AI-security help pages, then the trust
   portal's NDA flow for gated documents, then escalate nuanced questions to the security/GRC team.
3. Product security features: check product documentation first; escalate roadmap or new
   admin/security feature questions to the enterprise product team, not GRC.
4. Confirm which bucket the customer means. "Logging" can mean internal SIEM logging customers
   cannot access, or the customer-facing audit log available on the top tier.
5. Never send an AI-generated security answer to a customer without a source check; internal
   context can leak into it.

## ⚠️ Failure behavior

If the trust-portal connection fails, say the portal could not be verified and stop before making
security claims. Offer to retry. Never silently substitute general knowledge.

## 🧪 Examples

- "Do you have SOC 2 Type II?" Check the certification, then search for the report link.
- "A customer asked about encryption at rest." Search the trust center for that phrase and return
  the linked control or security page.
- "Which subprocessors handle AI data?" Search with the customer's wording and return direct
  subprocessor links.

