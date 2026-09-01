---
name: evaluate-demo-feedback
skill: Evaluate demo feedback
description: >-
  Review sales demos against discovery relevance, the Tell Need / Show / Tell
  Value loop, business impact, delivery structure, and common demo crimes, and
  return prioritized coaching.
category:
  - Analysis
  - Reference
proficiency: Advanced
trigger: Manual
setup: required
notes: >-
  Distilled from public demo-skills training material and enriched with a Tell
  Need, Show, Tell Value loop.
notion_row: >-
  https://app.notion.com/p/Evaluate-demo-feedback-3c098c2112688114a697e3421ac5870f
notion_doc: >-
  https://app.notion.com/p/Evaluate-demo-feedback-3c098c21126881458bafe233a8a00a8f
---

## 🚀 First run (setup)

Treat this as a first run when no `setup: complete` line is recorded in the frontmatter, or the user has never asked for a demo review.

This skill reviews a sales demo — live, recorded, transcribed, or scripted — and returns prioritized coaching scored against discovery relevance, the Tell Need / Show / Tell Value loop, narrative structure, delivery, and demo hygiene. It runs on request, and it produces a verdict, a seven-line scorecard, the highest-impact fixes, rewritten loops, observed demo crimes, and a practice plan.

Ask the user to supply, one item at a time, and confirm each back to them:

1. Where demo artifacts live — the recording or transcript source, and whether you may read it directly.
2. Where discovery context lives — your own notes location, call-notes doc, or CRM opportunity record (`<your-discovery-source>`), including audience roles, stated pains, goals, metrics, and current process.
3. The intended value proposition and call to action for the demo under review.
4. Any team-specific demo standards, naming conventions, or hygiene rules that should override the defaults below.
5. Where the review should be delivered — chat only, or a filed document (`<your-review-destination>`).

Have the user save those values into their own copy of this skill. Until setup is complete the review can only be provisional: without discovery context the skill cannot judge relevance, and it must never invent customer needs to fill the gap. When the mappings are saved, add a `setup: complete` line to the frontmatter so later runs go straight to the workflow.

## Purpose

Evaluate a live demo, recording, transcript, script, or rehearsal. Give specific, prioritized coaching that helps the presenter connect discovery findings to business value, demonstrate a clean process flow, and move the buyer toward a next step.

Do not judge a demo as a feature tour or product training session. Judge whether it builds a credible bridge from the buyer's current process to a better future state.

## Required inputs

1. Demo recording, transcript, notes, or script.
2. Discovery findings, audience roles, stated pains, goals, metrics, and current process.
3. Intended value proposition and call to action.
4. Product environment or demo plan.

If discovery context is absent, flag the review as provisional. Do not invent customer needs.

## Non-negotiable setup checks

- Start with the app sidebar or navigation panel closed.
- Start in light mode.
- Open on a clean, intentional landing view.
- Remove irrelevant tabs, notifications, private data, test clutter, and distracting window chrome.
- Preload every page, record, and state needed for the planned path.
- Rehearse recovery paths for loading failures, missing data, and navigation errors.

Treat a visible sidebar at the opening or dark mode as explicit feedback, not a minor style preference.

## Core principles

1. **Demonstrating is a responsibility and a learnable skill.** Evaluate preparation and technique, not charisma.
2. **Lead with business value.** Tie every capability to requirements, process, goals, or metrics.
3. **Discovery determines relevance.** Reward the buyer's language and examples; penalize generic scenarios.
4. **Demonstrate process flow, not screens and fields.**
5. **Use stories and emotion deliberately.** Open scenes with a relevant story, question, visual, number, or comparison; avoid theatrics.
6. **Respect the 2% factor.** Setup, sequencing, language, confidence, transitions, and timing are commercially meaningful.
7. **Practice repeatedly.** A smooth path and confident recovery should look rehearsed.

## Evaluate with Tell Need, Show, Tell Value

### 1. Tell Need

- Name the topic in the customer's language.
- Restate the relevant discovery finding, pain, goal, or current process.
- Explain why it matters to this audience.
- Preview one to three moments to watch for.
- Keep it to roughly 30 to 90 seconds.

Strong: "You said account reviews take two hours because signals are scattered across notes, chat, and the CRM. Watch how the account page brings those together and produces a usable next-step brief without manual chasing."

Weak: "Next, I will show you our AI database features."

### 2. Show

- Demonstrate the shortest credible path from need to outcome, roughly one to four minutes.
- Follow the previewed steps with realistic customer language and data.
- Call out only operationally meaningful details.
- Avoid teaching configuration, narrating every click, or exploring unplanned branches.
- Stop when the promised proof is visible.

### 3. Tell Value

- Recap the capability in one sentence.
- State the operational impact concretely.
- Use a memorable value headline ("hours saved weekly," "zero manual handoffs," "one trusted account view").
- Connect operational impact to team or executive outcomes with "so you can" logic.
- Use evidence from discovery, references, metrics, or credible industry context.
- Transition cleanly or ask a confirmation question.

Do not end with vague claims such as "easy," "intuitive," or "powerful."

## Structure the whole demo

- **Act I — Opening**: one theme, buyer-specific value proposition, plan preview, one relevant attention trigger.
- **Act II — Scenes**: organized around buyer outcomes or process stages, two to five loops per scene, closing each scene with accumulated value and a resonance check.
- **Act III — Closing**: revisit the opening need, summarize operational/team/strategic outcomes, describe the future state, end with a specific call to action.

## Identify demo crimes

Name the crime, cite the moment, explain the commercial risk, prescribe a correction.

- **Teaching instead of demonstrating**: shorten instruction, show outcome.
- **So what?**: capability without benefit; add Tell Value.
- **I love this part of my software**: impressive but irrelevant; remove anything discovery does not support.
- **Blind leading the blind**: hunting across screens; rehearse, hide the display during recovery, or defer.
- **Field by field**: narrating settings; show process flow instead.
- **Technobabble**: internal terms and acronyms; use the buyer's language.
- **Talking to the wall**: inaccurate or irrelevant examples; use discovery-based scenarios.
- **Slide crutch**: reading bullets; visuals support the story only.
- **Piling on**: more features after the proof is complete; stop.
- **Show-Tell-Tell**: product before relevance; restore Tell Need first.

## Scoring rubric

Score 1 to 5 with evidence: discovery relevance, Tell Need quality, Show discipline, Tell Value quality, narrative and structure, delivery, demo hygiene.

Do not average away a critical failure. Call out any blocker that could materially damage buyer confidence.

## Output format

- **Verdict**: two sentences on whether the demo moves the buyer forward and why.
- **Scorecard**: seven scores with one evidence sentence each.
- **Highest-impact fixes**: at most five, in priority order, each with observed moment, why it matters, exact correction, and suggested replacement language.
- **Loop rewrites**: rewrite the two weakest Tell Need / Show / Tell Value loops.
- **Demo crimes**: only observed ones.
- **Practice plan**: three rehearsal drills with success criteria.

## Feedback rules

- Be candid, specific, and commercially grounded.
- Separate observed facts from interpretation, and quote language or timestamps when available.
- Prioritize buyer impact over polish, and never praise without naming the effective behavior.
- Do not recommend adding features unless discovery justifies them.
- Prefer deletion, sharper framing, and cleaner sequencing over more content.

## Sources

- Public demo-methodology training on the Tell-Show-Tell framework.
- Sales-engineering habit frameworks covering partner, probe, prepare, practice, perform, and perfect.

