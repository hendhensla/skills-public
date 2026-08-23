---
name: wolfia-sales-answers
skill: Sourced security answers Worker
description: >-
  Provide an agent with five Worker tools for sourced security, privacy,
  compliance, and procurement answers, evidence lookup, trust-center access,
  and question-gap logging.
category:
  - Research
  - Automation
proficiency: Advanced
trigger: Agent
notes: >-
  Requires a deployed Worker connection exposing askWolfia, findEvidence,
  getTrustCenter, logQuestion, and logGap. Preserve returned evidence for
  customer-facing claims. The WOLFIA_API_KEY credential name may be required;
  never store its value in this file.
setup: incomplete
---

## 🚀 First run (setup)

Detect a first run when this file has no `setup: complete` marker, a required placeholder is still unfilled, or the user has never invoked this skill. This Worker gives an agent a controlled path to ask a security or compliance question, inspect supporting evidence, open the trust-center entry point, and record answered questions or evidence gaps. It triggers when the agent needs one of those operations and produces either a sourced result, a configured trust-center response, or a log record.

Before using it, the user must supply:

- Their deployed Worker connection exposing the exact five tools in this file: `<your-security-answers-worker>`.
- The Worker’s upstream security-knowledge or trust-center connection: `<your-security-knowledge-connection>`.
- Their configured question-and-gap log destination: `<your-security-question-and-gap-log>`.
- The credential or environment-variable **name** required by the upstream connection, if any: `WOLFIA_API_KEY`. Never provide or store its value in this file.
- The account or customer identifier format accepted by their deployment, if account context is supported: `<your-account-identifier-format>`.

Walk through the placeholders one at a time. Ask the user which connection maps to `<your-security-answers-worker>`, confirm the upstream source and log destination, confirm whether `WOLFIA_API_KEY` is required, and confirm the account-identifier format. Repeat each mapping back to the user before moving on, then have them save the filled values in their own copy of this skill. Until setup is complete, the skill cannot make a trustworthy customer-facing claim, persist a question or gap, or assume that an account value is accepted.

### Smoke test

Call `askWolfia` with a non-sensitive test question and the account value required by the deployment:

```json
{"question":"Are you SOC 2 compliant?","account":"<test-account>"}
```

Expected return shape: an object containing an `answered` boolean, answer text when `answered` is true, and a `sources` list for supporting documents. An unauthenticated or draft deployment may include a clearly labeled sample-output notice; do not send sample output to a customer. Confirm that the tool returns a real source before marking setup complete.

After the mapping is confirmed and the smoke test succeeds, change the frontmatter line to `setup: complete` so later runs skip onboarding.

## Purpose

Give an agent a deterministic tool surface for answering security, privacy, compliance, RFP, and procurement questions from an approved knowledge source, while preserving evidence and logging unanswered gaps.

## Tools

### `askWolfia`

Answer one security, privacy, compliance, RFP, or procurement question from the connected knowledge source.

- **Input:**
  - `question` — string; the exact question to answer.
  - `account` — string; the account or customer context expected by the deployment.
- **Return:** an object with `answered` — boolean; answer text when available; and `sources` — a list of supporting source records or links. Draft deployments may also return a labeled sample-output notice.

### `findEvidence`

Find the source documents that support a topic or claim.

- **Input:**
  - `topic` — string; the topic or claim to search for.
  - `account` — string; the account or customer context expected by the deployment.
- **Return:** a list or object containing matching source documents, with source titles, links, excerpts, or other evidence fields when available.

### `getTrustCenter`

Retrieve the customer-facing trust-center entry point and its access-gate details.

- **Input:** none; pass an empty JSON object.
- **Return:** an object containing the trust-center or portal link and a description of what is available directly versus behind an access or NDA gate.

### `logQuestion`

Record an answered question and the sources used for it in the configured question log.

- **Input:**
  - `question` — string; the question that was answered.
  - `answer` — string; the answer text to record.
  - `sources` — array of source records or links; the evidence supporting the answer.
  - `account` — string; the account or customer context expected by the deployment.
- **Return:** an object confirming the log write, typically including the created record identifier or URL.

### `logGap`

Record an unanswered question for follow-up rather than inventing a response.

- **Input:**
  - `question` — string; the unanswered question.
  - `account` — string; the account or customer context expected by the deployment.
- **Return:** an object confirming the gap write, typically including the created record identifier or URL.

## Workflow

1. Use `askWolfia` first for a direct answer.
2. If the answer is supported, preserve its source links and optionally record the result with `logQuestion`.
3. Use `findEvidence` when the direct answer needs a specific document, excerpt, or supporting source.
4. Use `getTrustCenter` when the recipient needs the customer-facing portal or access instructions.
5. If the source does not support the question, do not fill the gap from memory. Use `logGap` and state that the source could not verify the claim.
6. Treat draft or sample output as test-only and never present it as customer evidence.

## Guardrails

- Do not claim a security or compliance control without returned evidence.
- Do not treat an internal summary as a substitute for a source document.
- Preserve scope limits, access requirements, and source URLs.
- Do not store credential values, tokens, workspace IDs, database IDs, or deployment IDs in this skill.

