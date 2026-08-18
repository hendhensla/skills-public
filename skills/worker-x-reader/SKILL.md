---
name: X Reader Worker
skill: worker-x-reader
description: Reads individual X posts, the authenticated account's private bookmarks, and its liked posts for agent use.
category:
  - Automation
  - Research
proficiency: Advanced
trigger: Agent
type: Worker
worker_url: <your-worker-url>
notes: Read-only. Uses X OAuth 1.0a user-token authentication, because bookmarks and likes are user-scoped and are not reachable with an app-only token. This worker reads posts and does not search X; pair it with a search tool for discovery.
setup: pending
---

## 🚀 First run (setup)

Treat this as a first run when `setup:` is still `pending`, when `worker_url` or the credential names are unfilled, or when the user has never invoked this worker.

What it does: this worker exposes three read-only X tools so an agent can fetch a single post by URL or id, page through the authenticated account's private bookmarks, and page through its liked posts. It runs on demand when an agent calls one of its tools, and it returns live post data — useful for verifying a quote verbatim before it is used as evidence.

Before it can be used, the adopting user must supply:

1. A deployed copy of this worker in their own workspace, and its worker URL to record in `worker_url`.
2. Their own X developer app with read access to posts, bookmarks, and likes.
3. Four OAuth 1.0a user-token values, stored as brokered credentials or environment variables in their deployment and referenced only by name — for example `X_CONSUMER_KEY`, `X_CONSUMER_SECRET`, `X_ACCESS_TOKEN`, and `X_ACCESS_TOKEN_SECRET`. Confirm the exact names used in their deployment, and never record the values in this file, a repo, or chat.
4. The numeric user id of the account whose bookmarks and likes should be read, recorded as `<your-x-user-id>`. It must be the same account the access token belongs to.

Walk the user through these one at a time — `worker_url`, then each credential name, then `<your-x-user-id>` — confirm each mapping back to them, and have them save the filled values into their own copy of this file.

Until setup is complete the worker cannot read anything. Bookmarks and likes are user-scoped endpoints: an app-only token, or a token belonging to a different account, returns an authorization error rather than an empty list.

Smoke test one call:

- Tool: `readXPost`
- Input: `{ "post": "<any public post URL>" }`
- Expected return shape: an object with the post `id`, `text`, `created_at`, an `author` object (`id`, `username`, `name`), a `metrics` object (like, repost, reply, and quote counts), any `references` to quoted or replied-to posts, and `media` metadata entries. An authorization error means the OAuth 1.0a credentials are not attached correctly.

When the smoke test returns a real post, record completion by changing the frontmatter line to `setup: complete`.

## 🧰 Tool surface

### `readXPost`

Purpose: read one post by URL or numeric id, including enough context to quote it accurately.

Inputs:
- `post` (string) — a post URL or its numeric id.

Returns: an object with `id` (string), `text` (string), `created_at` (ISO timestamp), `author` (`{ id, username, name }`), `metrics` (counts as numbers), `references` (array of `{ type, id }` for quoted, replied-to, or reposted posts), and `media` (array of metadata entries with type and key). A missing or protected post returns an error rather than an empty object.

### `listXBookmarks`

Purpose: page through the authenticated account's private bookmarks, newest first.

Inputs:
- `maxResults` (number | null) — how many to return per page; `null` uses the API default.
- `paginationToken` (string | null) — cursor from a previous call.

Returns: an object with `posts`, an array of post objects in the same shape as `readXPost`, plus `next_token` (string | null) for the following page.

### `listXLikedPosts`

Purpose: page through the authenticated account's liked posts, most recently liked first.

Inputs:
- `maxResults` (number | null).
- `paginationToken` (string | null).

Returns: an object with `posts`, an array of post objects in the same shape as `readXPost`, plus `next_token` (string | null).

## ⚠️ Gotchas

- Bookmarks and likes are private, user-scoped data. Treat everything they return as the user's own material, and do not republish it without asking.
- The like ordering reflects when a post was liked, not when it was published. Do not read it as a timeline.
- These endpoints are rate limited and paginate in small pages. Stop at the first page that answers the question instead of walking the whole list.
- There is no search here. Use a separate search tool to discover posts, then pass the resulting URLs to `readXPost` to confirm the exact wording before quoting.
