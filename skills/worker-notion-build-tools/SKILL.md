---
name: Notion Build Tools Worker
skill: worker-notion-build-tools
description: Exposes general Notion-as-Code build tools for pages, databases, schemas, rows, and raw Public API calls in a target workspace.
category: Automation, Notion
proficiency: Advanced
trigger: Agent
type: Worker
worker_url: <your-worker-url>
notes: Deployed and validated against a single target workspace. Scope one deployment per workspace so the brokered token cannot reach the wrong content.
setup: pending
---

## 🚀 First run (setup)

Treat this as a first run when `setup:` is still `pending`, when `worker_url` or the workspace placeholders are unfilled, or when the user has never invoked this worker.

What it does: this worker turns the Notion Public API into callable agent tools so an agent can execute controlled workspace and teamspace builds — searching and inspecting content, creating and updating pages from Markdown, creating databases and editing data source schemas, querying rows, and creating rows in batches. It runs on demand when an agent calls one of its tools, and it produces real pages, databases, and rows in the workspace the token can reach.

Before it can be used, the adopting user must supply:

1. A deployed copy of this worker in their own workspace, and its worker URL to record in `worker_url`.
2. A Notion integration token for the target workspace, held as a brokered credential named `NOTION_TOKEN`, scoped to `api.notion.com`. Give the credential name only, never the value.
3. The target workspace name to record in `<your-workspace-name>`, so the agent can confirm it is authenticated against the right place before writing.
4. An existing parent page inside the destination teamspace, shared with the integration, to record in `<your-parent-page-id>`. The Public API cannot create a top-level teamspace page, so every build needs this parent.
5. Optional: the data source id of any database the agent will write rows into, recorded as `<your-target-data-source-id>`.

Walk the user through these one at a time — `worker_url`, `NOTION_TOKEN`, `<your-workspace-name>`, `<your-parent-page-id>`, then any data source ids — confirm each mapping back to them, and have them save the filled values into their own copy of this file.

Until setup is complete this worker cannot do anything useful: without the credential every call is unauthenticated, and without an accessible parent page no build can be placed.

Smoke test one call:

- Tool: `notionSearch`
- Input: `{ "query": "", "limit": 1 }`
- Expected return shape: an object with a `results` array of objects carrying at least `id`, `object` ("page" or "database"), and a title, plus a `has_more` flag. An empty `results` array with no error usually means the integration has not been shared with any content yet.

When the smoke test passes and the returned content clearly belongs to `<your-workspace-name>`, record completion by changing the frontmatter line to `setup: complete`.

## 🧰 Tool surface

Tool names below describe the callable surface; confirm the exact names in your own deployment after the first `list tools` call.

### `notionSearch`

Purpose: find pages and databases the integration can see, to locate a build target before writing.

Inputs:
- `query` (string) — search text; an empty string returns whatever is shared.
- `limit` (number | null) — how many results to return; `null` uses the default page size.

Returns: an object with `results` (array of `{ id, object, title, url, parent }`), `has_more` (boolean), and a pagination cursor when more results exist.

### `notionGetObject`

Purpose: inspect one page, database, or data source, including its properties or schema.

Inputs:
- `id` (string) — page, database, or data source id.
- `type` ("page" | "database" | "data_source") — which kind of object to read.

Returns: the object as returned by the API: for a page its `properties` map and parent; for a database or data source its `title` and full property `schema` keyed by property name with each property's type.

### `notionGetPageContent`

Purpose: read a page's body so an edit can be targeted instead of overwriting.

Inputs:
- `pageId` (string).

Returns: an object with the page id and its content rendered as Notion-flavored Markdown.

### `notionCreatePage`

Purpose: create a page under an existing parent page or as a row in a data source.

Inputs:
- `parentId` (string) — parent page id, or the data source id when creating a row.
- `parentType` ("page" | "data_source").
- `title` (string).
- `markdown` (string | null) — initial body in Notion-flavored Markdown.
- `properties` (object | null) — property values keyed by property name, for a data source parent.

Returns: an object with the created page id and URL.

### `notionUpdatePage`

Purpose: update an existing page's properties or append and replace body content.

Inputs:
- `pageId` (string).
- `properties` (object | null) — property values keyed by property name.
- `markdown` (string | null) — content to write.
- `mode` ("append" | "replace" | null) — how to apply the content; `null` appends.

Returns: an object with the page id and a flag or summary describing what changed.

### `notionCreateDatabase`

Purpose: create a database with an initial schema under an accessible parent page.

Inputs:
- `parentPageId` (string).
- `title` (string).
- `schema` (object) — property definitions keyed by property name, each with a `type` and any type-specific configuration such as select `options`.

Returns: an object with the new database id, its first data source id, and the database URL.

### `notionUpdateSchema`

Purpose: add, rename, retype, or remove properties on an existing data source.

Inputs:
- `dataSourceId` (string).
- `properties` (object) — property definitions to add or change, keyed by property name; a null value removes a property.

Returns: an object with the data source id and the resulting property schema.

### `notionQueryDataSource`

Purpose: read rows from a data source with optional filtering, sorting, and pagination.

Inputs:
- `dataSourceId` (string).
- `filter` (object | null) — API-shaped property filter.
- `sorts` (array | null) — property and direction pairs.
- `pageSize` (number | null), `startCursor` (string | null).

Returns: an object with `results` (array of row objects, each with `id`, `url`, and a `properties` map), `has_more` (boolean), and `next_cursor`.

### `notionCreateRows`

Purpose: create many rows in one call, for seeding or importing a dataset.

Inputs:
- `dataSourceId` (string).
- `rows` (array, up to 50 per call) — each an object of property values keyed by property name.

Returns: an object with `created` (count) and an array of created row ids and URLs, plus per-row errors when some rows fail.

### `notionApiRequest`

Purpose: advanced escape hatch for any non-delete Notion Public API endpoint, so new needs do not require a redeploy.

Inputs:
- `method` ("GET" | "POST" | "PATCH" | "PUT").
- `path` (string) — API path starting with a slash, including any query string.
- `bodyJson` (string | null) — request body as a JSON string.

Returns: the raw JSON response text from the API. Delete-style calls are intentionally not exposed.

## ⚠️ Boundaries and gotchas

- The Public API cannot create a top-level teamspace page. Every build needs an existing accessible parent page inside the destination teamspace.
- Nothing is visible to the worker until the integration is explicitly shared with that page or database; an empty search result almost always means missing sharing, not missing content.
- Batch row creation is capped at 50 rows per call. Chunk larger imports and keep a record of created ids so a retry does not duplicate rows.
- Verify the authenticated workspace name before the first write. One worker per workspace keeps a token from reaching the wrong content.
