---
name: "Repeatable Outbound Sequence"
skill: "repeatable-outbound-sequence"
description: "Builds an approval-gated, signal-based outbound plan: qualify accounts, check relationship history, enrich contacts, draft tailored messages, and log follow-through without sending anything automatically."
category:
  - Sales
  - Automation
  - Writing
proficiency: "Expert"
trigger: "Manual"
notes: "De-identified workflow for signal review, revenue qualification, all-time collision checks, contact enrichment, tailored drafting, sequence governance, and follow-through. Configure the placeholders before use."
setup: incomplete
---

## 🚀 First run (setup)

Treat this as a first run when no `<code>setup: complete</code>` marker is recorded, a required placeholder is still unfilled, or the user has never invoked this skill. This skill turns product, account, and market evidence into a prioritized outbound plan: it finds a reason to reach out, checks for collisions and prior relationships, enriches the right existing records, drafts short tailored messages, and produces approval-ready follow-up instructions. It triggers when the user asks for a daily or weekly outbound run, a signal-based prospect list, or a sequence draft; it never sends, enrolls, posts, or changes a CRM record without explicit approval.

Prerequisites the user must supply:

- Signal and account sources: `<code><your-signals-db></code>` and `<code><your-accounts-db></code>`
- Opportunity source: `<code><your-opportunities-db></code>`
- Contact and meeting sources: `<code><your-contacts-db></code>`, `<code><your-meetings-db></code>`, and `<code><your-call-notes></code>`
- CRM, sequencer, email, calendar, team-chat, and social-message connections: `<code><your-crm></code>`, `<code><your-sequencer></code>`, `<code><your-email></code>`, `<code><your-calendar></code>`, `<code><your-team-chat></code>`, and `<code><your-social-dms></code>`
- The field or source that lists verified connected tools: `<code><your-connected-tools-field></code>`
- Approved people/enrichment sources and credential names, never secret values: `<code><your-enrichment-sources></code>`
- Calling or follow-up queue: `<code><your-calling-queue></code>`
- The person who approves drafts, exports, messages, and sends: `<code><your-approval-owner></code>`
- The configured hold, saturation, opt-out, and export thresholds: `<code><your-outreach-policy></code>`

Walk through these placeholders one at a time. After each answer, repeat the mapping back to the user and ask them to confirm it. Have the user save each confirmed value in their own copy of this skill. Until setup is complete, the skill cannot identify authoritative records, verify connected tools, run collision checks, enrich contacts, or prepare an action-ready plan. After confirmation, record `<code>setup: complete</code>` in the frontmatter so later runs skip this section.

## Purpose and output

Run the workflow when the user asks to:

- Find accounts or contacts with a concrete reason to reach out.
- Run a daily or weekly outbound process.
- Draft a signal-based sequence for a named account or audience.

Produce, in order:

1. A prioritized account and contact shortlist with the signal, evidence, and revenue rationale.
2. A collision decision for each candidate: proceed, hold, block, leave with the active owner, or escalate for reassignment.
3. A deduped and enriched contact plan that fills blanks without overwriting protected fields.
4. Tailored drafts, resource references, and channel recommendations.
5. A follow-up queue and a cross-surface activity log plan.

No email, sequence enrollment, social message, team-chat post, CRM reassignment, export, or call is allowed without explicit approval from `<code><your-approval-owner></code>`.

## 1. Signals, attribution, and revenue gate

1. Sweep `<code><your-signals-db></code>` and approved product-signal or team-chat connections for adoption changes, usage spikes, new workspace or team activity, pricing or research intent, new executive changes, hiring, strategic launches, events, and other documented reasons to reach out.
2. Attribute each signal to the exact person, workspace, team, and action when the source supports it. Query `<code><your-connected-tools-field></code>` for the exact tools and integrations connected to that workspace. Never infer a connected tool from industry, company size, or a generic account profile.
3. If an account has multiple workspaces, determine whether the separation is accidental sprawl or intentional separation by region, subsidiary, or team. Do not recommend consolidation when the separation is intentional.
4. Cross-check each candidate against `<code><your-accounts-db></code>` and `<code><your-opportunities-db></code>`:
   - `<code>Seat whitespace = employees - paid seats</code>`.
   - `<code>Seat penetration = paid seats / employees</code>`.
   - Compare license utilization, free-workspace counts, renewal timing, and current opportunity state when those fields exist.
   - Deprioritize saturated accounts unless there is a clear expansion, new use case, or measurable consolidation case.
   - Prioritize a documented enterprise landing path, meaningful unused capacity, or a credible multi-team expansion case.
5. Record the signal date, source, evidence, account, affected workspace, and attribution in `<code><your-signals-db></code>`. Do not write a duplicate when the same account, source, and event already exist.

Use the team's configured thresholds. If a threshold is missing, show the calculation and ask for a decision rather than silently inventing policy.

## 2. All-time relationship, partner, and activity check

Before proposing outreach to any person or account, check the full available history across these surfaces. Do not limit the review to a short recent window:

1. **CRM and ownership:** Search `<code><your-crm></code>`, `<code><your-opportunities-db></code>`, and `<code><your-contacts-db></code>` for ownership, status, prior messages, tasks, next steps, meetings attended, last meeting, and existing records. If another rep owns the record and is actively working it, leave it alone. If it is owned but idle, flag reassignment rather than changing ownership.
2. **Email:** Search `<code><your-email></code>` all-time for the person's email, name, and domain across sent, received, and drafts, including approved call-review or page-view signals when available.
3. **Calendar:** Search `<code><your-calendar></code>` across all available past history and future meetings, and paginate every result page. If the connection has a cap, also run a current-to-future window so the cap cannot hide a meeting.
4. **Team chat:** Search `<code><your-team-chat></code>` for the person's name, email, company handle, external conversations, and internal account threads.
5. **Social messages:** Check `<code><your-social-dms></code>` and notes on `<code><your-contacts-db></code>` for prior messages, connection requests, replies, and stated timing.
6. **Meeting sources:** Search `<code><your-meetings-db></code>` and approved company or partner meeting sources for the account, contact, prior demos, same-day calls, and co-sell context.
7. **Call summaries:** Search `<code><your-call-notes></code>` for exact summaries, decisions, objections, and commitments.
8. **Docs and usage sources:** Search `<code><your-docs-db></code>` and `<code><your-people-usage-source></code>` for account briefs, personal usage, and prior research.

Apply these rules:

- Never send a cold-style introduction to someone the user has already met. Open warmly by referencing the prior meeting or topic, then connect the live signal and relevant context.
- For a warm or familiar contact, recommend channels in the configured priority order. A reasonable default is team chat first, social message second, email third.
- Provide both a short conversational message for the top channel and an email version for warm contacts.
- Active owner, live sequence, or active conversation: leave with the current owner.
- Recent two-way conversation, upcoming meeting, or requested timing: hold.
- Bounce, unsubscribe, or explicit do-not-contact request: block all sends.
- Sequence opt-out: do not enroll in a sequence; take only a manually approved exception when policy allows it.
- Ambiguous or conflicting records: stop and ask the user to resolve the source of truth.

## 3. Contact sourcing, deduplication, and enrichment

1. Match an existing CRM lead or contact and the row in `<code><your-contacts-db></code>` before creating anything. Use this order: email, profile URL, then name plus domain and another corroborating identifier.
2. Separate executive buyers and department leaders from technical builders, admins, and operators. Use the persona to choose the evidence and message angle; do not treat a title alone as proof of product usage.
3. Search approved people sources by current company and current job title. Review every result page, not just the first page, and preserve the source and retrieval date.
4. Use the configured enrichment waterfall in this order:
   1. Verified email history in `<code><your-email></code>`.
   2. Existing email fields in `<code><your-contacts-db></code>`.
   3. Existing CRM or sequencer records.
   4. Approved enrichment sources in `<code><your-enrichment-sources></code>`.
   5. A fallback provider only after approved sources are exhausted.
   6. A pattern-based guess only in an `<code>Inferred Email</code>` field; never treat it as verified or enroll it in a sequence.
5. Before any export or credit-consuming lookup, show the candidate count, expected cost, source, and intended destination to `<code><your-approval-owner></code>`.
6. Fill blanks only. Preserve protected fields, provenance, opt-out state, and existing ownership. Run a dry run before a batch upsert.

## 4. Account POV, value proposition, and drafting

1. Read the account's approved POV from `<code><your-accounts-db></code>`, including the executive summary, current business priorities, and triggering signal.
2. Frame the value around connecting the company's tools and data into a shared system of record, not around consolidating one product's spaces. The useful outcome is that specs, workflows, customer context, and AI-assisted work do not lose context across teams.
3. Cite only tools and integrations verified through `<code><your-connected-tools-field></code>` or a trusted usage source. Do not imply that a team uses a tool because a similar company does.
4. Connect the prospect's workflow to the teams that depend on it. Name the concrete handoff, shared context, decision, or recurring work that could benefit.
5. When using customer proof, use only a verified public customer story or public technical resource, explain why it is relevant, and keep a `<code>Resource to Share (Source of Truth)</code>` bullet for every first and second email.
6. Match the offer to the persona:
   - Executive or department leader: business outcome, cross-functional velocity, governance, or tool/data connection.
   - Technical builder or agent owner: technical documentation, architecture mapping, or a narrowly scoped early-access discussion.
   - Workspace owner or admin: verified governance, permissions, capacity, and adoption evidence.
   - Non-admin user: never pitch seat management; offer workflow or technical documentation instead.
   - Rare credit or beta lever: use only for a verified builder or waitlist participant, and use give-get framing such as “If I understood your use cases better, I could potentially advocate for access.” Never promise access unconditionally.
7. If the collision check finds a prior meeting or relationship, use a warm opener and produce both the short conversational version and the email version. Do not reset the relationship with a cold introduction.
8. Draft with this structure:
   - Greeting matched to the person's role and relationship.
   - Paragraph 1: one or two short sentences describing the observed signal and verified connected tools.
   - Paragraph 2: one or two short sentences describing the cross-functional implication. An observation opener such as `<code>Imagine...</code>`, `<code>Seems like...</code>`, or `<code>It appears...</code>` is allowed only when grounded in evidence and only for the first email.
   - One concrete CTA on its own line, followed by the approved sign-off.
9. Keep first and second emails short, usually 50 words or fewer. Keep any breakup email within the configured hard cap. Use plain words, contractions, specific observations, varied sentence length, and natural rhythm. Avoid filler, unsupported claims, corporate clichés, em-dash-heavy prose, and the user's banned vocabulary. Do not use the word “meet” or directly ask for a meeting. Include at most one small natural typo only when the user's approved voice rules require it, and flag it for review.
10. Do not place naked links in a cold email. For warm contacts, use only verified links behind descriptive text. Never invent a guide, customer result, event attendance, or technical capability.
11. Present every draft for approval. Do not send, enroll, or message until `<code><your-approval-owner></code>` explicitly approves the exact copy and destination.

## 5. Sequence governance and cross-channel reply stop

1. Use the configured sequencer as the system of record for approved multi-step sequences. Stage enrollments without activating them until approval is recorded.
2. Apply the configured business-day spacing. A common pattern is first touch on Day 1, a new value-add follow-up around Day 3 or Day 4, and a final low-pressure close around Day 7 or Day 8.
3. Before each later step, run a fresh sweep of email, social messages, and external team-chat conversations. If the person replies on any channel, immediately mark the sequence finished or replied, stop future steps, update the contact record, and log the reply to the CRM.
4. A reply, bounce, unsubscribe, or do-not-contact state always outranks the planned cadence.
5. Keep subject lines short and about the company outcome or workflow. Do not use multi-topic subject lines or unsupported “gap” framing.

## 6. Follow-up, calling queue, and activity logging

1. Monitor approved email and sequence sources for replies and repeated opens without a reply. Treat opens as a signal, not consent or proof of intent.
2. When a prospect is appropriate for a call, add them to `<code><your-calling-queue></code>` with the reason for outreach, supporting account or usage evidence, relevant message or open context, contact details, and hold or opt-out status.
3. After an approved email, call, social message, or external conversation, update `<code><your-contacts-db></code>` and link the activity to the existing CRM record. Capture status, last touch, notes, next step, source, and date.
4. If a reply arrives, stop automated follow-up and route the person to the appropriate meeting or deal workflow.
5. Keep an audit trail for every decision: what was checked, what was found, who approved the action, and what changed.

## Guardrails

- Never guess a connected integration, workspace owner, customer-specific fact, or contact detail.
- Never expose credentials, tokens, private IDs, internal URLs, personal names, or customer names in a public copy of this skill.
- Never overwrite protected contact fields or bypass unsubscribe, bounce, do-not-contact, ownership, or hold rules.
- Never treat an inferred email or an open event as verified intent.
- Never send, enroll, export, reassign, or message without explicit approval.
- Never use an internal document or private source as a public citation; convert reusable guidance into the skill or replace it with a public resource placeholder.
- If sources disagree, stop and ask for a source-of-truth decision.
