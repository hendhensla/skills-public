---
name: worker-figjam-embed-tool
skill: figjam-embed-tool
description: >-
  Agent tool that appends a real Notion embed block for a Figma or FigJam URL
  to a target page, optionally after a specific block.
category:
  - Automation
  - Notion
  - Design
proficiency: Advanced
trigger: Agent
notes: >-
  Callable tool surface only. Requires a deployed copy of the Worker and a
  Notion API credential supplied through the adopting agent's secure setup.
setup: incomplete
---

## 🚀 First run (setup)

Treat this as a first run when no `setup: complete` marker is recorded, when any placeholder below is still unfilled, or when the user has never invoked this skill.

On a first run, explain that this skill calls a deployed Worker to append a native Notion embed block for a Figma or FigJam URL to a target Notion page. It triggers when an agent needs to place an editable design-board embed, and it produces the normalized target page ID, the embedded URL, the new block ID, and a direct block URL.

Prerequisites the user must supply:

- A deployed copy of the Worker in their own workspace, referenced as `<your-worker-id>`.
- A target Notion page or page database whose pages the Worker may edit, referenced as `<your-target-page>` when smoke-testing.
- A Figma or FigJam board, design, or file URL that the user is allowed to share, referenced as `<your-figma-url>`.
- The credential or environment variable name used by the Worker, by name only: `NOTION_API_TOKEN`. Supply its value through the adopting platform's secure credential setup, never in this skill or chat.
- The agent connection or tool configuration that is allowed to call `<your-worker-id>`.

Walk through the placeholders one at a time: first confirm `<your-worker-id>`, then `<your-target-page>`, then `<your-figma-url>`, and finally the connection that can call the Worker. Confirm each mapping back to the user and have them save the filled values in their own copy of this skill. Do not ask for or record the credential value.

Until setup is complete, this skill cannot safely append embeds because it does not yet know which Worker, target page, or design-board URL to use, and the agent connection may not have permission to call the Worker.

Smoke-test with one call to `addFigjamEmbed` using `<your-target-page>` and `<your-figma-url>`, omitting `afterBlockUrlOrId` so the embed appends to the end of the page. Expect a return shaped like `{ pageId, figmaUrl, blockId, blockUrl }`; verify that `blockUrl` opens the newly created embed block on the target page.

After the user confirms the smoke test, record completion by changing `setup: incomplete` to `setup: complete` in their copy so later runs skip straight to the workflow.

## Purpose

Use this tool when an agent needs to place a Figma or FigJam design directly inside a Notion page as a native embed block. It is useful when ordinary page editing may canonicalize a design URL as a link instead of creating the exact embed block, and it supports deterministic placement either at the end of the page or immediately after a known block.

## Tool surface

### `addFigjamEmbed`

Appends a native Notion embed block for a Figma or FigJam URL to a target page.

Input:

| Field | Type | Meaning |
| --- | --- | --- |
| `pageUrlOrId` | `string` | Target Notion page URL or page ID. |
| `figmaUrl` | `string` | HTTPS Figma or FigJam board, design, or file URL. |
| `afterBlockUrlOrId` | `string` (optional) | Block URL or ID after which to insert the embed. Omit to append to the end of the page. |

Returns:

```json
{
  "pageId": "<normalized-page-id>",
  "figmaUrl": "https://www.figma.com/…",
  "blockId": "<created-embed-block-id>",
  "blockUrl": "<direct-link-to-created-embed-block>"
}
```

Use the returned `blockUrl` to verify placement, and use the returned `pageId` and `blockId` when a later operation needs stable identifiers. The tool creates the embed; it does not create or edit the surrounding page content.
