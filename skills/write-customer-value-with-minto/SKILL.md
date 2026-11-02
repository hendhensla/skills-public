---
name: "Write customer value with Minto"
skill: "write-customer-value-with-minto"
description: >-
  Structure customer-facing value messages with the Pyramid Principle: answer first,
  three mutually exclusive supporting reasons, evidence beneath, and an SCQA opener.
category:
  - Writing
proficiency: Intermediate
trigger: Agent
notes: >-
  De-identified playbook for customer value messages across email, chat, readouts,
  business cases, decks, and talk tracks.
setup: incomplete
---

## 🚀 First run (setup)

On a first run—when no `setup: complete` marker is recorded, a required placeholder is still unfilled, or the user has never invoked this skill—explain that this skill turns customer facts into a clear value argument: it leads with the answer, organizes the reasons, and ends with one measurable next step. It triggers when the user needs to persuade a customer or prospect to expand, renew, upgrade, pilot, adopt a use case, or add capacity, and it produces a pyramid, a channel-ready draft, and a short list of facts to confirm.

Prerequisites:

- The customer or account record in your CRM or equivalent.
- Usage or adoption data for the relevant product, service, or workflow.
- Customer conversations such as call notes, meeting notes, email, or chat.
- Relevant change events, dates, commercial context, and the desired action.
- The target channel and any channel-specific writing limits.
- A source label for every fact you plan to use.

Walk through the placeholders one at a time: customer/account, desired action and outcome, evidence sources, channel, and next-step owner and measure. Confirm each mapping back to the user, have them save the filled values in their copy of this skill, and then record `setup: complete` in the frontmatter. Until setup is complete, the skill can provide a generic pyramid template but must not present an account-specific claim as sourced.

## Purpose

Use this for any message whose job is to convince a customer of value: expansion, renewal, upgrade, pilot, new use case, or executive readout. Put the answer first, then support it with grouped reasons the reader can check.

This skill owns the argument structure: the governing thought, the order of supporting reasons, and the evidence beneath them. Other skills or templates may own the channel, voice, research, or final prose pass. Build the pyramid first, then adapt it to the chosen channel.

## Step 1: Gather facts before structuring

Pull what is already known about the account. Gather only what the argument needs:

- Current usage, adoption, scope, active teams, and relevant workflow signals.
- What the customer said in calls, meetings, email, or chat, with speaker and date when available.
- Change events such as a new executive, tool migration, reorganization, goal, renewal date, or budget cycle.
- Commercial context and the proposed action. Never invent a price, result, or commitment.

Tag every fact as **confirmed** with its source or **hypothesis**. Hypotheses are allowed, but label them in the draft or turn them into validation questions.

## Step 2: Write the governing thought

Write one sentence the reader could act on if they read nothing else. It must:

- Name the action: expand to X, renew at Y, pilot Z, or another concrete move.
- Name the customer outcome, not a feature list.
- Be a claim, not a topic. Write “Expand the workflow to the launch team so every release reaches the right people from one source,” not “Expansion opportunity.”

## Step 3: Build three key lines (inductive, MECE)

Each key line answers “Why?” about the governing thought. Default to three and never use more than five. Pick one grouping logic and stick to it:

| Logic | Key lines | Best for |
| --- | --- | --- |
| **Foundation → gap → timing** (default) | What already works · what is broken or missing · why now | Expansion, upgrade |
| **Value → risk → ease** | What they gain · what it costs to wait · how small the first step is | New use case, pilot |
| **Proven → extended → protected** | Results so far · next value · what is at risk if it lapses | Renewal |
| **By stakeholder** | Executive outcome · team workflow · administration or operations | Multi-stakeholder buying group |

Rules:

- **Key lines are claims, not labels.** Write “Launch handoff is where releases break,” not “GTM.”
- **MECE:** reasons do not overlap and together cover the case. If two key lines share evidence, merge or recut them.
- **Same kind:** use all reasons or all steps; do not mix them in one group.
- Put two or three evidence bullets under each key line. Each must be confirmed with a source or labeled as a hypothesis.

## Step 4: Write the SCQA opener

| Part | Content | Rule |
| --- | --- | --- |
| **Situation** | What the customer already agrees is true | No news here; use something they told you. |
| **Complication** | What changed or what is breaking | Use their words where possible. |
| **Question** | What they are now asking | It is often left unstated. |
| **Answer** | The governing thought | Use the same sentence as Step 2. |

## Step 5: End with one ask

End with one concrete next step: owner, scope, and how it will be measured. For example: run one workflow through the proposed approach in a 30-day pilot, or schedule a focused review with the relevant executive. Measures are hypotheses to test in the pilot, not promised results.

## Step 6: Fit it to the channel

| Channel | Shape |
| --- | --- |
| **Email** | Line 1 is the answer. Use one sentence per key line. End with the ask. Keep detailed evidence in a linked document when appropriate. |
| **Executive readout or one-pager** | Title is the governing thought. Follow with the SCQA paragraph, three headed sections, and an ask box. |
| **Deck** | Slide titles read top to bottom as the pyramid. Each slide title is a claim. |
| **Talk track** | Say the answer first, “for three reasons,” then the reasons, then the ask. |
| **Chat** | Answer plus three bullets plus the ask. Skip the SCQA preamble. |

## Step 7: Check before delivering

- [ ] If the reader stops after line 1, do they know what you want?
- [ ] Does every key line answer “why?” about the governing thought?
- [ ] Is each group three to five items, all the same kind, with no overlap?
- [ ] Are key lines claims, not topics?
- [ ] Is every number and quote sourced or labeled as a hypothesis?
- [ ] Is the outcome customer-centric, not a feature list?
- [ ] Is there exactly one ask?

Deliver the pyramid as an ASCII tree, then the channel draft, then a short **To confirm before sending** list of hypotheses and missing facts, such as price, dates, names, or owners.

## Pyramid template

````javascript
GOVERNING THOUGHT: <action> so that <customer outcome>.
├── 1. <claim>
│      • <evidence> (<source, date>)
│      • <evidence> (<source, date> | hypothesis)
├── 2. <claim>
│      • …
└── 3. <claim>
       • …
ASK: <one next step, owner, measure>
````
