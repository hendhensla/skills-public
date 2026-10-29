---
name: "Outbound ICP Tracker"
skill: outbound-icp-tracker
description: "Maintain a living ideal-customer-profile and outbound contact tracker that prevents duplicate outreach, matches personas to value propositions, and preserves a source-of-truth resource for every contact."
category:
  - Sales
  - Research
  - Automation
proficiency: Advanced
trigger: Manual
notes: "De-identified public playbook. Configure your own databases, documents, and signal sources before use."
setup: incomplete
---

## 🚀 First run (setup)

Detect a first run when no `setup: complete` marker is recorded, required placeholders are still unfilled, or the user has never invoked this skill. This skill maintains a living contact-level ICP and outbound log: it records who was contacted, why they fit, which value proposition was used, and which resource is safe to share. It triggers when an outbound sequence or one-off draft is created or updated, and it produces a deduplicated contact plan plus updates to the user's own tracking systems.

Before running, the user must supply:

- Their accounts database: `<your-accounts-db>`.
- Their contacts or CRM database: `<your-contacts-db>`.
- Their outbound sequence and one-off drafting workflows: `<your-outbound-sequence-skill>` and `<your-email-draft-skill>`.
- Their approved value-proposition library: `<your-value-props>`.
- Their approved customer-proof and resource library: `<your-resource-library>`.
- Any permitted activity-signal sources or connections: `<your-signal-sources>`.

Walk through these placeholders one at a time. After each one, tell the user what it maps to and ask them to confirm. Have the user save the confirmed values in their own copy of this skill. Until setup is complete, do not write to a guessed database, invent customer proof, or treat an unverified signal as fact. After confirmation, record `setup: complete` in the frontmatter; later runs should skip onboarding.

## Purpose

Maintain a living Ideal Customer Profile (ICP) and outbound contact tracker for a sales team. The tracker should capture every person contacted, their role and archetype, whether they are an owner/admin or a non-admin user, the verified intent signal, the value proposition pitched, the approved resource to share, and the next offer or give-get. Its central rule is simple: use the contact history to avoid duplicate angles and tailor the message to the person's actual responsibilities.

## When to use this skill

Use this skill whenever:

- A repeatable outbound sequence is created or updated.
- A one-off outbound draft is created or updated.
- The team audits who has been contacted across accounts.
- The team selects the next 3–5 contacts for an account.
- A new signal, role, admin status, value proposition, or resource changes the recommended outreach angle.

Update both the user's contacts database and the log maintained by this skill. Treat the contacts database as the operational system of record and the skill's log as the reasoning and audit trail.

## 1. ICP archetypes and selection rules

Use the person's actual role, verified activity, and admin status—not title alone. Remove seniority prefixes such as “senior,” “principal,” “staff,” and “lead” from short-form role copy when the user's messaging convention calls for it.

| Archetype | Typical roles | Useful signals | Appropriate follow-up offer | Never pitch |
| --- | --- | --- | --- | --- |
| AI, automation, or engineering executive | VP Engineering, Head of Automation, VP AI, CTO | Broad adoption of coding or AI integrations, several active workspaces, and multiple engineering systems connected | A neutral system-architecture map showing how the organization's tools and data could connect | Seat limits unless the person is the billing admin; a direct meeting request when the messaging policy bans it |
| Product, UX, or design leader | Product Experience leader, Product director, Product strategy/operations leader, PM | Active product workspace, design and issue-tracking integrations, engineering repository activity, or strong product intent | A system diagram or product signal-to-ship workflow showing how context can follow work across teams and tools | Workspace consolidation as the primary pitch; frame the problem as specs losing context across tools |
| Operations, supply-chain, or CX transformation leader | Supply-chain VP, CX transformation director, Head of Operations | New workspace creation, file-storage integrations, operational-system or production-schedule sync | A practical connection map for operational data, documents, and schedules | Unframed customer-name dropping or promises about credits or access |
| Agent, MCP, or early-access builder | AI-team SWE, engineering manager, QA analyst, data scientist, waitlist submitter | A named bot or agent project, an early-access request, repeated integration activity, or a data/automation workflow | A conditional give-get: learn the use case first, then offer to advocate for access, documentation, or an appropriate internal next step | Unconditional credits or access; any prohibited call-to-action wording |
| Engineering director or technical non-admin | Engineering director, AI engineering practitioner, technical program owner | Strong engineering-tool activity but no evidence that the person owns billing or workspace administration | Technical documentation describing how the relevant workflows connect | Seat management, seat caps, or billing language when the person is not an admin |

### Selection rules

1. Start with the account's business problem and current tool context.
2. Select a balanced set of executive buyers, technical builders, and functional champions.
3. Prefer 3–5 contacts per account only when each contact adds a distinct angle.
4. Verify role, account, admin status, and signal from an approved source. Mark unknown values as unknown.
5. Check the contact history before drafting. Do not repeat the same proof point, offer, or pain framing without a reason.
6. Keep messaging grounded in the person's responsibilities. Never pitch an admin-only concern to a non-admin.
7. Record the exact value proposition and resource used so the next run can avoid duplication.
8. For signals from public or third-party sources, retain the source and date in the private record and do not treat usage as verified without corroboration.

## 2. Continuous contact log

Every outbound run must append or update the contact in `<your-contacts-db>` and update the table below or its equivalent in the user's copy of this skill.

| ID | Contact reference | Account | Role | Archetype and admin status | Verified signal | Value proposition pitched | Approved proof/resource | Follow-up offer or give-get |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| A1 | `<contact-1>` | `<account-1>` | Head of Automation | AI/automation executive; admin status verified | Several engineering integrations across active workspaces | Connect engineering systems and operational data into a shared context layer | `<resource-1>` | Offer a neutral architecture map |
| A2 | `<contact-2>` | `<account-1>` | Supply Chain VP | Operations leader; new workspace creator | New workspace plus file and schedule integrations | Connect schedules, vendor knowledge, and documents | `<resource-2>` | Offer a practical connection map |
| A3 | `<contact-3>` | `<account-2>` | Product leader | Product/UX leader; non-admin | Product, design, and issue-tracking activity | Keep product context intact across design and delivery tools | `<resource-3>` | Offer a system diagram |
| A4 | `<contact-4>` | `<account-2>` | SWE, AI team | Agent builder; admin status unknown | Custom automation or early-access signal | Connect the agent to governed business context | `<resource-4>` | Use a conditional give-get only after understanding the use case |
| A5 | `<contact-5>` | `<account-3>` | Engineering director | Technical user; non-admin | Engineering integrations without owner evidence | Explain the technical connection pattern | `<resource-5>` | Offer technical documentation |

Keep contact references, customer names, email addresses, private identifiers, and internal URLs in the user's private systems only. The public playbook should contain placeholders and reusable rules, never real contacts or company-specific activity counts.

## 3. Run procedure

### Step 1: Identify the trigger and scope

Capture the account, campaign or sequence, draft being changed, and the set of contacts affected. If the request is not an outbound workflow or contact-selection task, stop and do not mutate the log.

### Step 2: Load source records

Read the account record, contact record, prior outreach, approved value propositions, and approved resource catalog. Use only the user's configured sources. If a source is unavailable, report the missing source and leave the affected field unverified; do not fill it from memory.

### Step 3: Normalize each contact

For every person, normalize:

- Full name and contact reference in the private CRM.
- Account and role in the required shorthand.
- Archetype from the table above.
- Admin or workspace-owner status: `admin`, `non-admin`, or `unknown`.
- Evidence and date for each important signal.
- Prior value proposition, proof point, resource, and follow-up offer.

Separate facts from inferences. A title can suggest an archetype but cannot prove admin status or product usage.

### Step 4: Deduplicate and choose angles

Match by the user's stable contact identifier first, then by normalized email or another approved identity key. For each candidate, compare previous outreach by account, contact, angle, proof point, and offer. Reject candidates that duplicate a recent contact or angle unless the user explicitly requests a new test. If several contacts are valid, choose the smallest set that covers distinct buyer, builder, and champion perspectives.

### Step 5: Select the value proposition

Map the verified problem to one value proposition from `<your-value-props>`. Prefer:

- A shared context or governed connection layer when the person owns cross-tool architecture.
- Context preservation across product, design, and delivery tools for product leaders.
- Operational connection mapping for operations and CX leaders.
- Technical documentation for non-admin engineering users.
- A conditional give-get for builders only after their use case is understood.

Never invent a customer proof point. If no approved resource matches, record `resource pending approval` and ask the user to choose one before sending.

### Step 6: Draft within policy

Write a role-specific message that uses the selected angle and does not repeat a prior one. Follow the user's outbound style rules, including any banned words or prohibited asks. Keep claims proportional to the evidence. Do not mention seat limits to a non-admin, promise credits or access, expose private data, or state that a signal is verified when it is not.

### Step 7: Write the records

Append or update the private contact row and the public-safe log entry. Preserve the prior history; do not overwrite a useful prior angle. Record the date, source, and confidence for new signals. If the database has a status field, leave its value controlled by the database workflow rather than changing it casually.

### Step 8: Return a compact run summary

Report:

- Contacts added, updated, skipped, or rejected as duplicates.
- The selected archetype and angle for each chosen contact.
- Any unverified fields or missing sources.
- Any resource or policy approval still needed.

## 4. Data-quality checks

Before finishing, confirm:

- No contact appears twice under variant names or addresses.
- Every selected contact has an account, role, archetype, and admin-status value or an explicit `unknown`.
- Every signal has a source or is marked unverified.
- Every pitch has one value proposition and one approved resource or a clear pending state.
- No admin-only pitch was sent to a non-admin.
- No customer, person, private identifier, credential, token, or internal URL leaked into a public copy.
- The next run can understand what was already tried without opening a separate hidden document.

## 5. Failure handling and boundaries

- If the accounts or contacts database cannot be read, stop before writing and name the missing source.
- If identity matching is ambiguous, do not merge records. Flag the candidates for human resolution.
- If a resource is missing or not approved, do not substitute a similar resource from memory.
- If admin status conflicts across sources, preserve both observations, mark the field `conflict`, and ask for resolution.
- If an outbound draft contains prohibited wording or an unsupported claim, flag it instead of silently rewriting the intent.
- This skill does not send messages, grant access, change billing, or create customer proof. It organizes evidence and prepares a safe, non-duplicative recommendation.

## 6. Example decision patterns

- **Executive with broad integrations:** recommend a concise architecture map; avoid billing language unless admin status is verified.
- **Product leader with fragmented handoffs:** recommend a product signal-to-ship diagram; focus on lost context, not workspace consolidation.
- **Operations leader with new workspace activity:** recommend a practical data-connection map; avoid unframed customer references and promises.
- **Agent builder:** ask what they are building, then offer a conditional path to documentation or internal advocacy; do not promise access.
- **Technical non-admin:** offer technical documentation and stay away from seats, caps, and billing.
