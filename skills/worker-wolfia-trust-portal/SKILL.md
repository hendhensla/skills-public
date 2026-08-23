---
name: "wolfia-trust-portal"
skill: "wolfia-trust-portal"
description: "Discover and call Trust Portal tools for sourced security, compliance, privacy, RFP, and procurement answers."
category:
  - Research
  - Automation
proficiency: Advanced
trigger: agent
notes: "Requires a connected deployment that exposes listWolfiaTools and callWolfiaTool. Use returned sources for customer-facing claims."
setup: incomplete
---

## 🚀 First run (setup)

Detect a first run when this file has no `setup: complete` marker, any required placeholder below is still unfilled, or the user has never invoked this skill. This skill discovers the tools exposed by a connected Trust Portal Worker or MCP bridge and then calls an exact discovered operation. It produces sourced security, compliance, privacy, RFP, and procurement answers or other operation-specific results.

Before using it, the user must supply:

- Their deployed Worker or MCP connection that exposes `listWolfiaTools` and `callWolfiaTool`.
- Their Trust Portal endpoint or connection mapping: `<your-trust-portal-connection>`.
- Any credential or environment-variable **names** required by their deployment. This Worker surface does not specify a credential name; record the name only if the deployment requires one, for example `<TRUST_PORTAL_API_KEY>`. Never store credential values in this file.

Walk through the placeholders one at a time. Ask the user to confirm which connection maps to `<your-trust-portal-connection>`, then confirm any required credential or environment-variable name. Have the user save those filled values in their own copy of this skill. Until setup is complete, the skill cannot discover Trust Portal tools or safely call them.

After the user confirms the mapping and a smoke test succeeds, record `setup: complete` in the frontmatter so later runs skip onboarding.

### Smoke test

Call `listWolfiaTools` with no arguments:

```json
{}
```

Expected return shape: a tool catalog containing the available operation names and their supported schemas. Treat the returned catalog as authoritative; do not guess operation names or arguments.

## Purpose

Give an agent a controlled interface to a Trust Portal for sourced security, compliance, privacy, RFP, and procurement work.

## Tools

### `listWolfiaTools`

Discover the Trust Portal tools available through the connected Worker.

- **Input:** no fields; pass an empty JSON object.
- **Return:** a tool catalog with available tool names and their supported schemas.

### `callWolfiaTool`

Call one discovered Trust Portal tool.

- **Input:**
  - `name` — string; the exact tool name returned by `listWolfiaTools`.
  - `arguments` — JSON object; arguments supported by that discovered tool.
- **Return:** the called operation's result, with sources or evidence when the operation provides them. The exact result schema is operation-specific.

## Workflow

1. Call `listWolfiaTools` before using an unfamiliar Trust Portal operation.
2. Select an exact tool name from the returned catalog.
3. Call `callWolfiaTool` only with that exact name and the supported JSON arguments.
4. Preserve returned sources or evidence when making customer-facing claims.
5. If the Trust Portal does not support a claim, say so rather than filling the gap with an unsupported security or compliance assertion.
