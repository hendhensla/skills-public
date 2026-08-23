---
name: account-org-chart
skill: Account organization chart
description: >-
  Render an interactive organization chart that shows account stakeholders and
  reporting relationships inside a Notion page.
category:
  - Notion
  - Design
proficiency: Advanced
trigger: Manual
notes: >-
  Provides a Notion custom block for account stakeholder structure. It does not
  expose an agent-callable tool or a database sync.
setup: incomplete
---

## 🚀 First run (setup)

Treat this as a first run when no `setup: complete` line is recorded in this file, when any
`<...>` placeholder below is still unfilled, or when the user has never invoked this skill.
Complete setup before using the block.

1. **Explain the skill.** This Worker renders an interactive organization chart for an account's
   stakeholder relationships inside Notion. It is triggered manually when a user places or opens
   the custom block, and it produces a visual chart rather than an agent-tool JSON response.
2. **Collect the prerequisites the user must supply.**
   - `<your-notion-workspace>` — the Notion workspace where the Worker is deployed or connected.
   - `<your-account-page>` — an account page or account-record location where the custom block
     should be used.
   - `<your-stakeholder-source>` — the approved source of stakeholder and reporting-relationship
     data that the block should display.
   - Any connection or environment-variable **names** required by the user's deployment, never
     their values. This documented surface requires no credential values or environment variables.
3. **Walk the placeholders one at a time.** Ask for one value, restate the mapping in plain
   language, correct it if needed, and move to the next. Have the user save the filled values in
   their own copy of this file.
4. **Smoke-test the setup.** Connect the Worker in `<your-notion-workspace>`, place the custom
   block on `<your-account-page>`, and select an account with stakeholder data. The expected result
   is an interactive organization chart rendered in the page; there is no agent-callable tool
   return value.
5. **State the limits until setup is complete.** Without the workspace, target account page, and
   stakeholder source, the block cannot be connected or meaningfully tested. This public copy does
   not define an agent-callable tool surface and cannot be invoked as a function by an outside
   agent.
6. **Record completion.** Change the frontmatter line to `setup: complete` after the smoke test,
   so later runs skip straight to use.

## 🧰 Tool surface

This Worker exposes no agent-callable tools. The documented capability key is `accountOrgChart`,
a Notion custom-block key consumed inside Notion rather than a function that an outside agent can
call.

## ▶️ Use

Use the custom block on an account page when stakeholder structure and reporting relationships
improve account planning. Confirm that the page is connected to the intended account and that the
underlying stakeholder source is approved for this use.

## ⚠️ Guardrails

- Do not expose or copy deployment IDs, workspace IDs, internal page URLs, or credentials into a
  public skill copy.
- Do not infer reporting relationships when the source does not provide them; show uncertainty or
  missing data instead.
- Do not treat the custom-block key as an agent tool.
- Do not describe syncs, webhooks, schedules, or other capabilities not present in the documented
  surface.
