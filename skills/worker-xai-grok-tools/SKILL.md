---
name: xAI Grok Tools Worker
skill: worker-xai-grok-tools
description: >-
  Provides agent-callable tools for searching public X posts, running a live
  Grok web search, and asking Grok direct questions.
category:
  - Research
  - Automation
proficiency: Intermediate
trigger: Agent
notes: >-
  Callable tool surface only. Search citations are leads rather than verbatim
  post text; verify exact wording with a separate post-reading tool before
  quoting.
worker_url: "<your-worker-url>"
xai_credential_name: "<your-xai-credential-name>"
setup: pending
---

## 🚀 First run (setup)

Treat this as a first run when no `setup: complete` marker is recorded, when `worker_url`, `xai_credential_name`, or another required placeholder is unfilled, or when the user has never invoked this worker.

What it does: this worker exposes three on-demand tools for researching public X posts and asking Grok questions. It can search X, run a live web search, or answer directly, and it returns an answer with citations when the service provides them.

Before it can be used, the adopting user must supply:

1. A deployed copy of this worker in their own workspace, recorded in `worker_url`.
2. The xAI credential or environment-variable name required by their deployment, recorded in `xai_credential_name` by name only; never record the secret value. If the deployment uses a different name than `XAI_API_KEY`, use the manifest's exact name.
3. An agent connection that is allowed to call the worker's tools.
4. Optionally, a separate X post-reading tool if exact post text must be quoted or cited.

Walk the user through these placeholders one at a time — `worker_url`, then `xai_credential_name`, then the optional post-reading tool mapping — confirm each mapping back to them, and have them save the filled values into their own copy of this file.

Until setup is complete the worker cannot answer requests: it needs a deployed endpoint, its xAI credential mapping, and an authorized agent connection.

Smoke test one call:

- Tool: `askGrok`
- Input: `{ "question": "What is one recent development in the product category I specify?" }`
- Expected return shape: an object containing an `answer` string and, when available, a `citations` array. A credential or authorization error means the deployment mapping is incomplete.

When the smoke test returns a real answer, record completion by changing the frontmatter line to `setup: complete`.

## Purpose

Give agents an on-demand research path into public X posts and Grok's live web search. Use the search tools to find candidate evidence, then verify the exact post text with a separate post-reading tool before quoting.

## Tool surface

### `grokXSearch`

Purpose: answer a question by searching public posts on X.

Inputs:

- `query` (string) — the question or search request.
- `handles` (string[] | null, optional) — restrict discovery to specified public account handles.
- `fromDate` (string | null, optional) — earliest date to include.
- `toDate` (string | null, optional) — latest date to include.

Returns: an object containing an `answer` string and post citations. Citation entries identify candidate public X posts; use a post-reading tool to obtain exact text before quoting.

### `grokWebSearch`

Purpose: answer a question using a live Grok web search.

Inputs:

- `query` (string) — the question or web-search request.

Returns: an object containing an `answer` string and web-search citations when available.

### `askGrok`

Purpose: send a direct question to Grok without invoking a search tool.

Inputs:

- `question` (string) — the question to send to Grok.

Returns: an object containing an `answer` string and, when available, a `citations` array.

## Gotchas

- A search citation or result snippet is not the exact text of an X post. Never quote from a citation alone; fetch the post through a separate post-reading capability first.
- Keep public X research distinct from private or authenticated account data. This worker's documented surface searches public posts only.
- Treat results as unverified until a live smoke test succeeds and cite the returned sources with the answer.
- Use date and handle filters when the question depends on a particular time window or set of accounts; otherwise the result set can be too broad to audit.
