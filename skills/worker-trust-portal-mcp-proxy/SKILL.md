---
name: Trust Portal MCP Proxy Worker
skill: worker-trust-portal-mcp-proxy
description: Proxies a public trust-portal MCP server that requires a specific Origin header, exposing its tool discovery and tool calls to agents.
category: Automation
proficiency: Advanced
trigger: Agent
type: Worker
worker_url: <your-worker-url>
notes: Built because a direct custom MCP connection returned HTTP 404 — it could not send the Origin header the upstream server requires. A thin proxy that injects the header fixes it.
setup: pending
---

## 🚀 First run (setup)

Treat this as a first run when `setup:` is still `pending`, when `worker_url` or the upstream placeholders are unfilled, or when the user has never invoked this worker.

What it does: this worker is a thin proxy in front of a public MCP server that only answers requests carrying a specific `Origin` header. It exposes two operations — discover the upstream tools, and call one of them by exact name with JSON arguments. It runs on demand when an agent calls it, and it returns the upstream server's own responses unchanged.

Before it can be used, the adopting user must supply:

1. A deployed copy of this worker in their own workspace, and its worker URL to record in `worker_url`.
2. The upstream MCP endpoint URL, recorded as `<your-upstream-mcp-url>` (or set as the environment variable `UPSTREAM_MCP_URL` in the deployment).
3. The exact `Origin` value the upstream server expects, recorded as `<your-required-origin>` (or the environment variable `UPSTREAM_ORIGIN`). This is the whole reason the proxy exists; a wrong or missing value produces HTTP 404 rather than a helpful error.
4. Only if the upstream server is not public: a brokered credential for it, named in the deployment, for example `UPSTREAM_MCP_TOKEN`. Provide the name only, never the value. A public trust portal needs no credential.

Walk the user through these one at a time — `worker_url`, then `UPSTREAM_MCP_URL`, then `UPSTREAM_ORIGIN`, then any credential name — confirm each mapping back to them, and have them save the filled values into their own copy of this file.

Until setup is complete the worker cannot answer anything: without the endpoint and the exact Origin value every request is rejected upstream.

Smoke test one call:

- Tool: `trustPortalMcp`
- Input: `{ "action": "list_tools" }`
- Expected return shape: an object with a `tools` array, each entry carrying `name`, `description`, and an `inputSchema` object. A public trust portal typically returns a handful of tools such as a security-posture lookup, a trust-center search, and a certification check. An HTTP 404 means the Origin value is still wrong.

When the smoke test returns a non-empty `tools` array, record completion by changing the frontmatter line to `setup: complete`.

## 🧰 Tool surface

### `trustPortalMcp`

Purpose: reach an upstream MCP server through the proxy, either to discover its tools or to run one of them. The proxy adds the required `Origin` header and passes everything else through untouched.

Inputs:
- `action` ("list_tools" | "call_tool") — which operation to perform.
- `toolName` (string | null) — required for `call_tool`; must be the exact name returned by `list_tools`.
- `arguments` (object | null) — required for `call_tool`; JSON arguments matching that tool's `inputSchema`.

Returns:
- For `action: "list_tools"`: an object with `tools`, an array of `{ name, description, inputSchema }` entries as advertised by the upstream server.
- For `action: "call_tool"`: the upstream MCP tool result, normally an object with a `content` array of typed parts (`{ "type": "text", "text": "..." }`) and an `isError` flag. Upstream transport failures surface as an error with the HTTP status.

## ⚠️ Gotchas

- Always call `list_tools` before `call_tool` in a fresh session. Tool names and schemas belong to the upstream server and can change without notice.
- Do not guess or normalize tool names. The upstream server matches them exactly.
- A bare HTTP 404 from an MCP endpoint that is known to be up is usually a missing or mismatched `Origin` header, not a missing path. Reproduce with a direct request that sets the header before changing anything else.
- Keep the proxy dumb. Validating or reshaping upstream payloads inside the proxy makes upstream changes look like proxy bugs.
