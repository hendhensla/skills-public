---
name: "Repeatable Outbound Sequence"
skill: "repeatable-outbound-sequence"
description: "Turns verified account and product signals into a prioritized, collision-safe outbound plan, tailored drafts, and follow-up logging without sending before approval."
category:
  - Sales
  - Automation
  - Writing
proficiency: "Expert"
trigger: "Manual"
notes: "De-identified playbook for signal review, revenue qualification, relationship checks, contact enrichment, approved drafting, and follow-through. Configure the placeholders before use."
setup: incomplete
---

## 🚀 First run (setup)

Treat this as a first run when no `setup: complete` marker is recorded, a required placeholder is still unfilled, or the user has never invoked this skill. This skill turns verified product, account, and market signals into a prioritized outbound plan: it finds a reason to reach out, checks for collisions and prior relationships, enriches existing records, drafts approved outreach, and produces a follow-up and activity-log plan. It triggers when the user asks for a daily or weekly outbound run, a signal-based prospect list, or an outreach sequence draft. It never sends, enrolls, posts, reassigns, or changes a CRM record without explicit approval.

The user must supply their own:

- Signal source: `<your-signals-db>`
- Account and revenue source: `<your-accounts-db>`
- Opportunity source: `<your-opportunities-db>`
- Contact source: `<your-contacts-db>`
- CRM and sequence tool names: `<your-crm>` and `<your-sequencer>`
- Email, calendar, team-chat, and social-message connections: `<your-email>`, `<your-calendar>`, `<your-team-chat>`, and `<your-social-dms>`
- Meeting, call-summary, documentation, and usage sources: `<your-meetings-db>`, `<your-call-notes>`, `<your-docs-db>`, and `<your-people-usage-source>`
- Verified integrations field: `<your-connected-tools-field>`
- Approved people and enrichment sources plus credential names (names only, never secret values): `<your-enrichment-sources>`
- Calling or follow-up queue: `<your-calling-queue>`
- Person who approves drafts and sends: `<your-approval-owner>`

Walk through each placeholder one at a time. Repeat the mapping back to the user and get confirmation before moving to the next one. Have the user save the confirmed values in their own copy of this skill. Until setup is complete, the skill cannot safely identify authoritative records, verify integrations, run collision checks, enrich contacts, or prepare an action-ready plan. After confirmation, record `setup: complete` in the frontmatter and skip this section on later runs.

## Purpose and output

Run this workflow to:

- Find accounts or contacts with a concrete, evidence-backed reason to reach out.
- Run a daily or weekly outbound process.
- Draft a signal-based sequence for a named account or audience.

Produce, in order:

1. A prioritized account and contact shortlist with the signal and revenue rationale.
2. A collision decision for every candidate: proceed, hold, block, leave with the active owner, or escalate for reassignment.
3. A deduped and enriched contact plan that fills blanks without overwriting protected fields.
4. Tailored drafts grounded in account context and the user's approved voice rules.
5. A sequencer and calling-queue plan plus a cross-surface activity log.

No message, sequence enrollment, team-chat post, CRM reassignment, or call is allowed without explicit approval from `<your-approval-owner>`.

## 1. Signals, attribution, and revenue gate

1. Sweep `<your-signals-db>` and approved team-chat or product-signal connections for adoption changes, usage spikes, new workspace or team activity, strategic events, hiring signals, and other documented reasons to reach out.
2. Attribute each signal to the exact person, workspace, team, and action when the source supports it. Query `<your-connected-tools-field>` for the exact tools and integrations connected to that workspace. Never infer integrations from industry, company size, or a generic account profile.
3. If an account has multiple workspaces, determine whether the separation is accidental sprawl or intentional separation by region, subsidiary, or team. Do not recommend consolidation when the separation is intentional.
4. Cross-check every candidate against `<your-accounts-db>` and `<your-opportunities-db>`:
   - `Seat whitespace = employees - paid seats`.
   - `Seat penetration = paid seats / employees`.
   - Compare license utilization and free-workspace counts when those fields exist.
   - Deprioritize saturated accounts unless there is a clear expansion, consolidation, or new-use-case reason.
   - Prioritize meaningful unused capacity, a clear enterprise landing path, or a measurable multi-team expansion case.
5. Use configured thresholds. If thresholds are missing, show the calculations and ask for a decision instead of silently creating a policy.
6. Record the signal date, source, evidence, account, affected workspace, and attribution in `<your-signals-db>`. Do not duplicate an existing account/source/event record.

## 2. All-time relationship, partner, and activity check

Before proposing outreach, review the full available history. Do not rely on a short recent window or a single source:

1. **CRM and ownership:** Search `<your-crm>`, `<your-opportunities-db>`, and `<your-contacts-db>` for ownership, status, recent activity, tasks, next steps, prior messages, meetings attended, last meeting, and existing records. If another rep owns the record and is actively working it, leave it alone. If it is owned but idle, flag reassignment rather than changing it.
2. **Email:** Search `<your-email>` all-time for the person's email, name, and domain across sent, received, and drafts, including approved call-review or page-view signals when available.
3. **Calendar:** Search `<your-calendar>` across all available past history and future meetings, and paginate every result page. If the connection has a cap, also run a current-to-future window so the cap cannot hide a meeting.
4. **Team chat:** Search `<your-team-chat>` for the person's name, email, company handle, external conversations, and internal account threads.
5. **Social messages:** Check `<your-social-dms>` and notes on `<your-contacts-db>` for prior messages, connection requests, replies, or stated timing.
6. **Meeting sources:** Search `<your-meetings-db>` and approved company or partner meeting sources for the account, contact, prior demos, same-day calls, and co-sell context.
7. **Call summaries:** Search `<your-call-notes>` for exact summaries, decisions, objections, and commitments.
8. **Docs and usage:** Search `<your-docs-db>` and `<your-people-usage-source>` for account briefs, personal usage, and prior research.

Apply these decisions:

- Never send a cold-style introduction to someone the user has already met. Reference the prior meeting or topic, then connect the live signal and relevant context.
- For a warm contact, recommend channels in the configured priority order. If none is configured, use team chat first, social message second, email third.
- Provide both a short conversational message for the top recommended channel and an email version for warm contacts.
- Active owner, live sequence, or active conversation: leave with the current owner.
- Recent two-way conversation, upcoming meeting, or requested timing: hold.
- Bounce, unsubscribe, or explicit do-not-contact request: block all sends.
- DNC or sequence opt-out: do not enroll in a sequence; take a manually approved exception only when policy allows it.
- Ambiguous or conflicting records: stop and ask the user to resolve the source of truth.

## 3. Contact sourcing, deduplication, and enrichment

1. Match an existing CRM lead or contact and the row in `<your-contacts-db>` before creating anything. Use this order: email, profile URL, then name plus domain and another corroborating identifier.
2. Separate executive buyers and department leaders from technical builders, admins, and operators. Use the persona to choose the evidence and message angle; a title alone is not proof of product usage.
3. Search approved people sources by current company and current job title. Review every result page and preserve the source and retrieval date.
4. Use the configured enrichment waterfall:
   1. Verified email history in `<your-email>`.
   2. Existing email fields in `<your-contacts-db>`.
   3. Existing CRM or sequencer records.
   4. Approved enrichment sources in `<your-enrichment-sources>`.
   5. A fallback provider only after approved sources are exhausted.
   6. A pattern-based guess only in an `Inferred Email` field; never treat it as verified or enroll it in a sequence.
5. Before any export or credit-consuming lookup, show the candidate count, expected cost, source, and destination to `<your-approval-owner>`.
6. Fill blanks only. Preserve protected fields, provenance, opt-out state, and ownership. Run a dry run before a batch upsert.

## 4. Account POV, connected context, and drafting

1. Read the approved POV in `<your-accounts-db>`, including the executive summary, current business priorities, and signal that triggered the work.
2. Cite only tools and integrations verified through `<your-connected-tools-field>` or a trusted usage source. Do not imply that a team uses a tool because a similar company does.
3. Connect the prospect's workflow to the teams that depend on it. Name the concrete handoff, shared context, decision, or recurring work that could benefit.
4. If the collision check finds a prior meeting or relationship, use a warm opener and produce both the short conversational version and email version.
5. Draft with this structure:
   - Greeting matched to role and relationship.
   - Paragraph 1: one or two short sentences describing the observed signal and verified connected tools.
   - Paragraph 2: one or two short sentences describing the likely cross-functional implication. An opener such as `Imagine...`, `Seems like...`, or `It appears...` is allowed only when grounded in evidence.
   - Paragraph 3: one concrete CTA on its own line, followed by the approved sign-off.
6. Use the user's approved voice profile: plain words, contractions, specific observations, varied rhythm, and spaced hyphens instead of em dashes. Avoid filler, fake hooks, corporate clichés, unsupported claims, AI-accent phrasing, and synonym spinning. Add at most one small, clearly flagged natural typo only if the user's voice rules require it.
7. Do not put naked URLs in cold outbound emails. Links are allowed for warm contacts only, behind descriptive linked text. Share only a verified public story, approved event, technical document, or other real resource; never invent a guide.
8. Do not use the word `meet` or ask directly for a meeting in outbound email. Use a concrete, low-friction resource or context-based CTA instead. Never promise credits, beta access, or special treatment unless the verified signal and an approved give-get policy support it.
9. Example CTAs:
   1. `Use anything like this today?`
   2. `Ever come across us before?`
   3. `Want to see how this could work for you?`
   4. `Think this could give you an edge?`
   5. `Open to a short intro?`
   6. `Think it's worth exploring?`
   7. `Ever seen a demo of something like this?`
   8. `Open to seeing why [peer or competitor] uses us?`
   9. `Want to see a relevant case study?`
10. Present the exact draft and destination for approval. Do not send, enroll, or message until `<your-approval-owner>` explicitly approves both.

## 5. Follow-up cadence, calling queue, and activity logging

Use the user's configured business-day cadence. If none exists, propose this schedule for approval:

- **Step 1, Day 1:** Send the approved initial observation message, add the approved social touch, and prepare call-queue notes.
- **Step 2, Day 3 or 4:** Send a threaded follow-up with a net-new proof point or useful resource and an equal-or-lighter CTA. Do not escalate the ask because the prospect did not reply.
- **Step 3, Day 7 or 8:** Send a short close-the-loop message with no meeting ask. Stop immediately if the person replies on any channel.

For every follow-up:

1. Monitor approved email and sequence sources for replies, bounces, unsubscribes, and repeated opens without a reply. Treat opens as a signal, not consent or proof of intent.
2. Before each step, recheck social messages and team chat for a reply or hold. If a reply exists, stop automated follow-up and route the person to the appropriate deal workflow.
3. When a prospect is appropriate for a call, add them to `<your-calling-queue>` with the reason for outreach, supporting signal, relevant message or open context, contact details, and hold or opt-out state.
4. After an approved email, call, social message, or external conversation, update `<your-contacts-db>` and link the activity to the existing CRM record. Capture status, last touch, notes, next step, source, and date.
5. Keep an audit trail for every decision: what was checked, what was found, who approved the action, and what changed.

## Guardrails

- Never guess a connected integration, workspace owner, contact identity, or customer-specific fact.
- Never expose credentials, tokens, private IDs, internal URLs, personal names, or customer names in a public copy of this skill.
- Never overwrite protected contact fields or bypass unsubscribe, bounce, DNC, hold, or ownership rules.
- Never treat an inferred email or an open event as verified intent.
- Never send, enroll, post, reassign, or call without explicit approval.
- Stop on access challenges, suspected automation restrictions, or source conflicts; ask the user for a safe next step.
