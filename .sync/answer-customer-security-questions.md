## 🚀 First run (setup)
Treat this as a first run when no `setup: complete` line is recorded in this file, when any
`<...>` placeholder below is still unfilled, or when the user has never invoked this skill.
Run setup before answering any customer security question.
This skill answers customer-facing security, privacy, and compliance questions from the
adopting company's trust portal or security-knowledge source. It triggers when a customer,
prospect, questionnaire, procurement review, or deal raises a security question and produces a
plain-English answer with source links, access requirements, scope limits, and staged discovery
questions. It stops rather than making a security claim when the source of truth cannot be
verified.
### Prerequisites
The user must supply their own:
- `<your-trust-portal-connection>` and the names of its search, certification-check, and
	posture-summary tools.
- `<your-proxy-service>` and its invocation command when the portal requires a proxy or special
	request header.
- `<your-public-trust-center-url>` for cases where no direct document URL is returned.
- `<your-security-questions-channel>` for internal phrasing and routing context only.
- `<your-internal-security-docs>` for internal process, ownership, and escalation context only.
- `<your-crm>` or deal system where plan tier and deployment size are read.
- `<your-company-security-owners>` for infrastructure-security escalation and
	`<your-product-security-owners>` for product-security or roadmap escalation.
- The credential and environment-variable names required by the connection, never their values.
- Public security, AI-security, product-security, and audit-log documentation URLs if the
	playbook will use them: `<your-public-security-url>`, `<your-public-ai-security-url>`,
	`<your-public-product-security-url>`, and `<your-public-audit-log-url>`.
### Setup procedure
Walk through each placeholder one at a time. Ask for one mapping, restate it back to the user in
plain language, correct it if needed, and then continue. Have the user save the filled mappings in
their own copy of this file.
Until setup is complete, the skill cannot make customer-facing security claims, cannot substitute
internal channels or docs for trust-portal evidence, and cannot calibrate plan-specific flexibility
without CRM context. It may explain that verification or setup is missing and ask for the needed
input.
When every mapping works, change the frontmatter line to `setup: complete` and record the setup
date. Later runs can skip directly to the workflow.
## 🛡️ Objective
Answer customer-facing security questions with current information from the adopting company's
trust portal or security-knowledge connection, and return hyperlinks to the underlying sources.
If the user asks for advice on how to answer a security question themselves, do not run the portal
workflow. Reply with the seller security playbook below and suggest they run this skill when they
need a sourced answer.
## 🔌 Required connection
Use the approved trust-portal integration for every security question tied to a customer,
prospect, deal, RFP, questionnaire, procurement review, or customer meeting. Use:
1. A tool-list operation when available portal tools or schemas are unknown.
2. A named-tool call with JSON arguments when the schema is known.
Prefer:
- A trust-center search tool for policies, controls, documents, subprocessors, updates, and
	targeted topics.
- A certification check for SOC 2, ISO 27001, HIPAA, GDPR, PCI DSS, or another named
	certification.
- A broad security-posture summary only for broad posture requests.
## 🧭 Connection routing
If the portal requires a proxy, such as for a specific Origin header, route through
`<your-proxy-service>` rather than a direct connection that cannot send it. If the integration
tool is unavailable in the current session, invoke the deployed proxy with the platform CLI,
passing the operation, tool name, and arguments as JSON. Keep credentials in the configured
connection or environment, never in chat or in the skill file.
## 🔏 Trust-center access and NDA process
Use this process section when a customer asks how to get trust-center access, who can sign, whether
another person can sign, or whether people on the same company domain need a second agreement. This
is process guidance, not customer-facing security evidence.
### Paths
1. **Default:** send `<your-public-trust-center-url>`. The customer uses a company email and
	accepts the trust center's click-through security NDA. Personal email domains may be blocked.
2. **Redlines or refusal of click-through:** launch a sales NDA from the CRM opportunity through
	the approved contract workflow, using the company's standard paper. The workflow may not send
	until the required internal tag or signature action is completed.
3. **Agreement already on file but access is still gated:** ask
	`<your-security-questions-channel>` to review the bypass request.
### Domain rule
After someone from a company domain completes the trust-center NDA, other employees on that same
domain generally do not need a second signature. They still must access the center with their
company email. If the click-through still appears, ask `<your-security-questions-channel>` to
confirm or approve the domain.
The NDA does not automatically transfer to a different company or a third-party auditor. Auditors
must follow the applicable separate-access process.
### Other rules
- The click-through is a lightweight security NDA for document access, not an MSA.
- Do not email gated reports unless an NDA or MSA is in place.
- Smaller or self-serve deals may have limited redline flexibility.
- Replace the internal signer role or name with the value confirmed during setup; do not guess it.
## 🧵 Internal context sources
Use these for internal context only; they never supply customer-facing evidence.
- `<your-security-questions-channel>`: search past questions and answers for phrasing, routing,
	and escalation context.
- `<your-internal-security-docs>`: check process or policy context such as ownership, escalation,
	and internal requirements.
Rules:
- Never paste internal chat or internal-document content into a customer-facing answer.
- If an internal thread contains a useful answer, verify the claim through the trust portal before
	it reaches a customer.
- Customer-shareable claims come only from trust-portal sources or approved public product pages.
## 🔎 Workflow
1. Identify the customer's exact question and the claim that needs support.
2. For trust-center access, NDA signing, a proxy signer, or same-domain access, use the Trust-center
	access and NDA process section. Do not invent signing rules.
3. Search the internal security channel for prior answers, using them only for context and routing.
4. Check internal docs for process or policy questions, using them only for internal steps.
5. Query the trust portal before drafting. Never answer a security claim from memory or internal
	threads.
6. Distinguish certifications, audit reports, policies, contractual terms, and controls; they are
	not interchangeable.
7. If the first result lacks a source URL, run a targeted search for the named document,
	certification, control, subprocessor, or topic.
8. Preserve every relevant URL. Prefer the exact document, control, certification, subprocessor,
	or update URL over a general homepage.
9. If no specific URL exists after the targeted search, link `<your-public-trust-center-url>` as
	the entry point and say that no direct source link was returned. Never invent a URL.
10. Use customer or deal context to frame the response, never as evidence for a security claim.
## ✍️ Output
Lead with a direct, customer-ready answer in plain English.
For each material claim:
- Attach the most specific source hyperlink returned by the trust portal.
- State access requirements when a report or document requires a request.
- Preserve meaningful uncertainty, scope limits, and distinctions between evidence types.
## 🔍 Discovery
Every suggested response includes 2 to 4 discovery questions after the direct answer and before
Sources, matched to the stage of the security conversation.
**Early stage** (first ask or no active review): keep discovery light and general. Select from:
- What prompted the question and who raised it?
- How senior is the requester, and who does the request roll up to?
- How does the team use the product today, and what is the approximate footprint?
- What would a satisfactory answer unlock, such as broader adoption or an enterprise rollout?
**Later stage** (active review, questionnaire, or ongoing thread): go deeper. Select from:
- Which policy, framework, or contractual clause drives the question?
- What data types, user groups, plan, or product surfaces are in scope?
- What approval or deployment would a satisfactory answer unlock, and who signs off?
- Which requirements are hard blockers versus preferences?
- If a requirement cannot be met, what happens, and who decides whether an exception or
	compensating-control path exists?
- When is the answer needed and in what format: email, questionnaire, gated documentation, or a
	call with the security team?
**Two delivery channels:**
1. In the suggested email: include 2 to 4 customer-facing questions appropriate to the stage.
2. As coaching in chat: tell the user what to clarify before or during the exchange, such as the
	true origin of the ask, requester seniority, deal blockers, and the expansion path.
Rules: select the most relevant questions instead of dumping a checklist, do not front-load deep
policy questions on first touch, use the customer's language, and make no security claims inside
discovery questions.
## 🎚️ Plan-tier calibration
Identify the customer's current plan and deployment size from deal context or `<your-crm>`. If
unknown, add a discovery question instead of guessing.
- **Large existing enterprise customer:** more flexibility may exist. Reference verified
	enterprise-tier capabilities such as audit logs, advanced admin and security controls, or
	documentation under NDA, and offer deeper engagement when appropriate.
- **Small footprint on a lower tier:** keep commitments to public documentation and the trust
	center. Do not offer enterprise-only accommodations or custom review processes.
For non-enterprise customers, connect the stated security requirement to verified enterprise-tier
capabilities and probe for a larger rollout. Frame that question as a way to solve the stated
security concern, not as a generic upsell.
Rules: never state or imply that a control exists on the customer's current plan when it is
enterprise-only. Verify plan availability through the trust portal or approved public docs.
End with:
### Sources
- Include 1 to 5 unique Markdown hyperlinks with descriptive labels.
- Omit duplicate links.
- Never cite the proxy, this skill, an internal thread, an internal doc, or an unsourced summary
	as evidence.
## 📖 Seller security playbook
This is guidance for the user, not an agent workflow. When the user wants specific advice on how
to answer a security question, provide this playbook and suggest they run the skill for sourced
claims.
1. Sort the question into *company* (infrastructure, certifications, encryption, internal
	logging) or *product* (security settings, audit log, compliance integrations).
2. For company-infrastructure questions, start with `<your-public-security-url>` and
	`<your-public-ai-security-url>`, then use the trust portal and its NDA flow for gated
	documents, and escalate nuanced questions to `<your-company-security-owners>`.
3. For product-security feature questions, check `<your-public-product-security-url>` first, then
	escalate roadmap or new admin/security feature questions to `<your-product-security-owners>`.
4. Confirm which bucket the customer means. "Logging" might mean internal SIEM logging that
	customers cannot access, or a customer-facing audit log documented at
	`<your-public-audit-log-url>` and available only on certain plans.
5. Never send an AI-generated security answer to a customer without a source check; internal
	context can leak into it.
## ⚠️ Failure behavior
If the trust-portal connection fails, say that the trust portal could not be verified and stop
before making security claims. Offer to retry. Never silently substitute general knowledge or an
unrelated source.
## 🧪 Examples
- "Do you have SOC 2 Type II?" Check the certification, then search for the report link.
- "A customer asked about encryption at rest." Search the trust center for that phrase and return
	the linked control or security page.
- "Which subprocessors handle AI data?" Search with the customer's wording and return direct
	subprocessor links.
- "Can someone else sign the NDA?" Use the trust-center access process, check whether the signer
	is on the same company domain, and route unresolved access issues through the configured
	security-questions channel.