---
name: "Repeatable Outbound Sequence"
skill: "repeatable-outbound-sequence"
description: "Prioritizes signal-based outbound targets, checks all-time relationship and activity history, enriches existing records, drafts tailored outreach, and logs follow-up activity without sending anything before approval."
category:
  - Sales
  - Automation
  - Writing
proficiency: "Expert"
trigger: "Manual"
notes: "Five-phase workflow for signal review, revenue qualification, all-time relationship checks, contact enrichment, approved drafting, and follow-through. Configure the placeholders before use."
setup: incomplete
---

## 🚀 First run (setup)

Treat this as a first run when no `setup: complete` marker is recorded, any required placeholder is still unfilled, or the user has never invoked this skill. This skill turns product, account, and market signals into a prioritized outbound plan: it finds a reason to reach out, checks for collisions, enriches the right existing records, drafts a short message, and produces follow-up and activity-logging instructions. It triggers when the user asks for a daily or weekly outbound run, a signal-based prospect list, or an outreach sequence draft; it never sends, enrolls, posts, or changes a CRM record without explicit approval.

Before using it, the user must supply their own:

- Signal source: `<your-signals-db>`
- Account and revenue source: `<your-accounts-db>`
- Opportunity source: `<your-opportunities-db>`
- Contact source: `<your-contacts-db>`
- CRM and sequence tool names: `<your-crm>` and `<your-sequencer>`
- Email, calendar, team-chat, and social-message connections: `<your-email>`, `<your-calendar>`, `<your-team-chat>`, and `<your-social-dms>`
- Connected-tools or integrations field: `<your-connected-tools-field>`
- Approved enrichment sources and credential names (names only, never secret values): `<your-enrichment-sources>`
- Calling or follow-up queue: `<your-calling-queue>`
- Person who approves drafts and sends: `<your-approval-owner>`

Walk through these placeholders one at a time. After each answer, repeat the mapping back to the user and ask them to confirm it. Have the user save the confirmed values in their own copy of this skill. Until setup is complete, the skill cannot safely identify the authoritative records, verify connected tools, run collision checks, enrich contacts, or prepare an action-ready outreach plan. After confirmation, record `setup: complete` in the frontmatter and skip this section on later runs.

## Purpose and output

Run the workflow when the user asks to:

- Find accounts or contacts with a concrete reason to reach out.
- Run a daily or weekly outbound process.
- Draft a signal-based sequence for a named account or audience.

Produce, in order:

1. A prioritized account and contact shortlist with the signal and revenue rationale.
2. A collision decision for each candidate: proceed, hold, block, leave with the active owner, or escalate for reassignment.
3. A deduped and enriched contact plan that fills blanks without overwriting protected fields.
4. Tailored drafts using the account context and the user's approved voice rules.
5. A follow-up queue and a cross-surface activity log plan.

No email, sequence enrollment, social message, team-chat post, CRM reassignment, or call is allowed without explicit approval from `<your-approval-owner>`.

## 1. Signals, attribution, and revenue gate

1. Sweep `<your-signals-db>` and the approved team-chat or product-signal connections for adoption changes, usage spikes, new workspace or team activity, strategic events, hiring signals, and other documented reasons to reach out.
2. Attribute a signal to the exact person, workspace, team, and action when the source supports it. Query `<your-connected-tools-field>` for the exact tools and integrations connected to that workspace. Never infer connected tools from industry, company size, or a generic account profile.
3. If an account has multiple workspaces, determine whether the separation is accidental sprawl or intentional separation by region, subsidiary, or team. Do not recommend consolidation when the separation is intentional.
4. Cross-check each candidate against `<your-accounts-db>` and `<your-opportunities-db>`:
   - `Seat whitespace = employees - paid seats`.
   - `Seat penetration = paid seats / employees`.
   - Compare license utilization and free-workspace counts when those fields exist.
   - Deprioritize saturated accounts unless there is a clear expansion, consolidation, credit, or new-use case.
   - Prioritize accounts with meaningful unused capacity, a clear enterprise landing path, or a measurable multi-team expansion case.
5. Record the signal date, source, evidence, account, affected workspace, and attribution in `<your-signals-db>`. Do not write a duplicate when the same account, source, and event already exist.

Use the team's approved thresholds. If no thresholds have been configured, present the calculations and ask for a decision rather than silently applying a new policy.

## 2. All-time relationship, partner, and activity check

Before proposing outreach to a person or account, check the full available history across these surfaces. Do not limit the review to a short recent window:

1. **CRM and ownership:** Search `<your-crm>`, `<your-opportunities-db>`, and `<your-contacts-db>` for ownership, status, recent activity, tasks, next steps, prior messages, meetings attended, last meeting, and existing records. If another rep owns the record and is actively working it, leave it alone. If the record is owned but idle, flag it for reassignment instead of changing it.
2. **Email:** Search `<your-email>` all-time for the person's email, name, and domain across sent, received, and draft messages, including approved call-review or page-view signals when available.
3. **Calendar:** Search `<your-calendar>` across all available past history and future meetings, and paginate every result page. If the connection has a result cap, also run a dedicated current-to-future window so a capped response cannot hide a meeting.
4. **Team chat:** Search `<your-team-chat>` for the person's name, email, company handle, and external conversations as well as internal account threads.
5. **Social messages:** Check `<your-social-dms>` and the notes on `<your-contacts-db>` for prior messages, connection requests, replies, or stated timing.
6. **Meeting sources:** Search `<your-meetings-db>` and approved company or partner meeting sources for the account, contact, same-day calls, prior demos, and co-sell or partner context.
7. **Call summaries:** Search `<your-call-notes>` for exact summaries, decisions, objections, and commitments from prior calls.
8. **Docs and usage sources:** Search `<your-docs-db>` and `<your-people-usage-source>` for existing account briefs, personal usage, and prior research.

Apply these rules:

- Never send a cold-style introduction to someone the user has already met. Open warmly by referencing the prior meeting or topic, then connect the live signal and partner context.
- For a warm or familiar contact, recommend channels in the configured priority order. A reasonable default is team chat first, social message second, email third.
- Provide both a short conversational message for the top recommended channel and an email version for warm contacts.
- Active owner, live sequence, or active conversation: leave with the current owner.
- Recent two-way conversation, upcoming meeting, or requested timing: hold.
- Bounce, unsubscribe, or explicit do-not-contact request: block all sends.
- DNC or sequence opt-out: do not enroll in a sequence; only take a manually approved exception when policy allows it.
- Ambiguous or conflicting records: stop and ask the user to resolve the source of truth.

## 3. Contact sourcing, deduplication, and enrichment

1. Match an existing CRM lead or contact and the row in `<your-contacts-db>` before creating anything. Use this order: email, profile URL, then name plus domain and another corroborating identifier.
2. Separate executive buyers and department leaders from technical builders, admins, and operators. Use the persona to choose the evidence and message angle; do not treat a title alone as proof of product usage.
3. Search approved people sources by current company and current job title. Review every result page, not just the first page, and preserve the source and retrieval date.
4. Use the configured enrichment waterfall in this order:
   1. Verified email history in `<your-email>`.
   2. Existing email fields in `<your-contacts-db>`.
   3. Existing CRM or sequencer records.
   4. Approved enrichment sources in `<your-enrichment-sources>`.
   5. A fallback provider only after the approved sources are exhausted.
   6. A pattern-based guess only in an `Inferred Email` field; never treat it as verified or enroll it in a sequence.
5. Before any export or credit-consuming lookup, show the candidate count, expected cost, source, and intended destination to `<your-approval-owner>`.
6. Fill blanks only. Preserve protected fields, provenance, opt-out state, and existing ownership. Run a dry run before a batch upsert.

## 4. Account POV, connected context, and drafting

1. Read the account's approved POV from `<your-accounts-db>`, including the executive summary, current business priorities, and the signal that triggered the work.
2. Cite only tools and integrations verified through `<your-connected-tools-field>` or a trusted usage source. Do not imply that a team uses a tool because a similar company does.
3. Connect the prospect's workflow to the teams that depend on it. Keep the connection concrete: name the handoff, shared context, decision, or recurring work that could benefit.
4. If the collision check finds a prior meeting or relationship, use a warm opener that names the shared context and produce both the short conversational version and the email version. Do not reset the relationship with a cold-style introduction.
5. Draft with this structure:
   - Greeting matched to the person's role and relationship.
   - Paragraph 1: one or two short sentences describing the observed signal and the verified connected tools.
   - Paragraph 2: one or two short sentences describing the likely cross-functional implication. An observation opener such as `Imagine...`, `Seems like...`, or `It appears...` is allowed when it is grounded in evidence.
   - Paragraph 3: one approved CTA on its own line, followed by the approved sign-off.
6. Use the user's approved voice profile. Prefer plain words, contractions, specific observations, varied sentence length, and natural rhythm. Avoid filler, fake hooks, forced contrasts, corporate clichés, unsupported claims, synonym spinning, excessive emoji, and em-dash-heavy prose. Preserve every factual claim and audit the draft once more before returning it.
7. Use one of these example CTAs, or the equivalent from the user's approved list:
   1. `Use anything like this today?`
   2. `Ever come across us before?`
   3. `Want to see how this could work for you?`
   4. `Think this could give you an edge?`
   5. `Open to a short intro?`
   6. `Think it's worth exploring?`
   7. `Ever seen a demo of something like this?`
   8. `Open to seeing why [peer or competitor] uses us?`
   9. `Want to see a relevant case study?`
   10. `Worth a chat? No expectations beyond sharing a few ideas and seeing where it goes.`
8. Present the draft for approval. Do not send, enroll, or message until `<your-approval-owner>` explicitly approves the exact copy and destination.

## 5. Follow-up, calling queue, and activity logging

1. Monitor approved email and sequence sources for replies and repeated opens without a reply. Treat opens as a signal, not as consent or proof of intent.
2. When a prospect is appropriate for a call, add them to `<your-calling-queue>` with the reason for outreach, the supporting usage or account signal, the relevant message or open context, contact details, and any hold or opt-out status.
3. After an approved email, call, social message, or external conversation, update `<your-contacts-db>` and link the activity to the existing CRM record. Capture status, last touch, notes, next step, source, and date.
4. If a reply arrives, stop automated follow-up and route the person to the appropriate meeting or deal workflow.
5. Keep an audit trail for every decision: what was checked, what was found, who approved the action, and what changed.

## Guardrails

- Never guess a connected integration, workspace owner, or customer-specific fact.
- Never expose credentials, tokens, private IDs, internal URLs, personal names, or customer names in a public copy of this skill.
- Never overwrite protected contact fields or bypass unsubscribe, bounce, DNC, or hold rules.
- Never treat an inferred email or an open event as verified intent.
- Never send or enroll without explicit approval.
- If the sources disagree, stop and ask for a source-of-truth decision.
