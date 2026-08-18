---
name: collect-weekly-wins
skill: Collect weekly wins
description: >-
  Collect up to three verified weekly work wins, including a technical win when
  it clearly drove a customer outcome or upskilled the team or organization;
  deduplicate prior posts, prepare a concise team-chat summary, and log only
  approved wins to the wins journal.
category:
  - Research
  - Analysis
  - Automation
  - Workspace
proficiency: Advanced
trigger: Agent
notes: Validation against current-week evidence and approval flow is pending.
notion_row: 'https://app.notion.com/p/Collect-weekly-wins-3c098c211268814d929dc3f8c7bfbc1a'
notion_doc: 'https://app.notion.com/p/Collect-weekly-wins-3c098c2112688158b712ca76efd00bfa'
---

## 🚀 First run (setup)

Treat this as a first run when the frontmatter still reads `setup: incomplete`, any placeholder below is unfilled, or the user has never invoked this skill. Do the setup conversation before collecting any evidence.

1. Explain the skill in two or three sentences: it gathers up to three verified work wins from a weekly window, cross-checks them against multiple evidence sources and prior posts, and proposes them in a team-chat thread. It runs when an agent or the user asks for weekly wins. It produces a short proposal and, only after explicit approval, dated entries in a wins journal.
2. Ask the user to supply their own prerequisites. Collect names and links only, never credential values:
   - `<target-person>` — whose wins are being collected.
   - `<wins-journal>` — the page or database where approved wins are logged, plus who may edit it.
   - `<wins-criteria-doc>` — the self-review, achievement, or wins criteria to judge against.
   - `<team-chat-thread>` — the chat destination for the weekly proposal.
   - `<evidence-sources>` — which of workspace activity, team chat, work email, calendar, CRM or deal system, call recordings, and internal build logs are connected and in scope.
   - `<approver>` — the authorized owner whose explicit approval unlocks logging, and the approval phrase.
   - `<weekly-window>` — the default window if not the last seven days.
   - Connection or credential names only (for example the chat and CRM connections that must be authorized) — never tokens or secrets.
3. Walk through the placeholders one at a time. After each answer, restate the mapping back to the user for confirmation, then have them save the filled value into their own copy of this skill.
4. Until setup is complete, the skill cannot collect evidence, post a proposal, or write to any journal; it can only continue the setup conversation.
5. When every placeholder is filled and confirmed, record completion by changing the frontmatter line to `setup: complete` so later runs go straight to the workflow.

## Purpose

Collect up to three verified work wins from a defined weekly window. Consider one technical win when the evidence shows a clear customer outcome or meaningful upskilling of the team or organization. Prepare a concise team-chat summary and write to the wins journal only after explicit approval.

## Workflow

1. Use the last seven days unless the request gives another window.
2. Review the relevant self-review, achievement, or wins criteria before collecting evidence.
3. Review available workspace activity, team chat, work email, calendar meetings, CRM or deal-system evidence, call-recording evidence, and relevant internal build or skills logs.
4. Select only concrete outcomes, meaningful progress, or helpful contributions attributable to the target person.
5. Consider one technical win. Prefer something the target person built, configured, automated, prototyped, documented, or taught that:
   - produced or materially advanced a customer outcome, such as unblocking adoption, validating feasibility, improving a workflow, accelerating a decision, or creating reusable customer value; or
   - upskilled the team or organization through repeatable enablement, shared technical guidance, training, or a reusable system.
6. Exclude technical activity with no demonstrated outcome. A tool, demo, draft, experiment, or personal learning effort is not a win by itself.
7. Cross-check each win across multiple sources. Exclude any item that cannot be corroborated.
8. Review prior weekly team-chat posts and prior wins-journal entries. Exclude repeats unless there is meaningful new progress, and state what changed.
9. Rank by impact and keep at most three wins overall. Include the technical win only when it is stronger than the other verified candidates.
10. Post the proposal in the designated team-chat thread. Log it only after the authorized owner explicitly approves.

## Output

- **Proposed wins:**
  - Specific outcome and impact
  - Supporting source links
- **Approval:**
  - Ask the authorized owner to reply with `log wins`

When approved, add a dated weekly heading and the approved bullets to the wins journal.

## Guardrails

- Never infer ownership, participation, or success.
- Never treat attendance, activity volume, or a draft as a win by itself.
- Keep confidential details high level.
- Do not write to the wins journal when approval is missing or ambiguous.
- Do not act on approval from anyone other than the authorized owner.

