---
name: Notion Build Tools Worker
skill: worker-notion-build-tools
description: Exposes general Notion-as-Code build tools for pages, databases, schemas, rows, and raw Public API calls in a target workspace.
category:
  - Automation
  - Notion
proficiency: Advanced
trigger: Agent
type: Worker
worker_url: "<your-worker-url>"
notes: "Deploy one copy per workspace so the brokered token cannot reach the wrong content."
setup: pending
---

## 🚀 First run (setup)

Treat this as a first run when `setup:` is still `pending`, when `worker_url` or a workspace placeholder is unfilled, or when the user has never invoked this worker.

This worker gives an agent callable tools for controlled Notion builds: finding and inspecting content, creating and updating pages, creating databases, editing data source schemas, querying rows, and importing rows in batches. It runs on demand when an agent calls one of its tools and produces pages, databases, schemas, or rows in the workspace the token can reach.

Before using it, the adopting user must supply:

1. A deployed copy of this worker in their own workspace, with its URL recorded in `worker_url`.
2. A Notion integration token for the target workspace, held as a brokered credential named `NOTION_TOKEN`, scoped to the Notion API. Provide the credential name only, never the value.
3. The target workspace name, recorded as `<your-workspace-name>`, so the agent can confirm it is writing to the intended workspace.
4. An existing parent page inside the destination teamspace, shared with the integration, recorded as `<your-parent-page-id>`. The Public API cannot create a top-level teamspace page, so every build needs this parent.
5. Optional: the data source id of any database the agent should write rows into, recorded as `<your-target-data-source-id>`.

Walk through these one at a time — `worker_url`, `NOTION_TOKEN`, `<your-workspace-name>`, `<your-parent-page-id>`, then any target data source ids — confirm each mapping back to the user, and have them save the filled values in their own copy of this skill.

Until setup is complete, the worker cannot do anything useful: without the credential, calls are unauthenticated; without an accessible parent page, builds cannot be placed; and without shared target databases, searches and writes will not reach the intended content.

Smoke-test one call:

- Tool: `searchNotion`
- Input: `{ "query": "", "limit": 1 }`
- Expected return shape: an object with a `results` array of objects carrying at least `id`, `object` ("page" or "database"), and a title, plus a `has_more` flag. An empty `results` array with no error usually means the integration has not been shared with any content yet.

When the smoke test passes and the returned content clearly belongs to `<your-workspace-name>`, record completion by changing the frontmatter line to `setup: complete`.

## 🧰 Tool surface

The neutral names below describe the callable surface. Confirm the exact generated names in the deployed worker after setup; each tool accepts JSON inputs and returns JSON unless noted otherwise.

### `searchNotion`

Purpose: find pages and databases the integration can see, to locate a build target before writing.

Inputs:
- `query` (string) — search text; an empty string returns whatever is shared.
- `limit` (number | null) — maximum results; `null` uses the deployment default.

Returns: `{ results: Array<{ id, object, title, url, parent }>, has_more: boolean, next_cursor: string | null }`.

### `readNotionObject`

Purpose: inspect one page, database, or data source, including its properties or schema.

Inputs:
- `id` (string) — page, database, or data source id.
- `type` ("page" | "database" | "data_source") — object type to read.

Returns: the API object. A page includes its `properties` map and `parent`; a database or data source includes its title and property schema.

### `readPageContent`

Purpose: read a page body so edits can be targeted instead of blindly overwriting content.

Inputs:
- `pageId` (string) — page id to read.

Returns: `{ pageId: string, content: string }`, with `content` rendered as Notion-flavored Markdown.

### `createPage`

Purpose: create a page under an existing parent page or create a row in a data source.

Inputs:
- `parentId` (string) — parent page id, or data source id when creating a row.
- `parentType` ("page" | "data_source") — kind of parent.
- `title` (string) — page title.
- `markdown` (string | null) — initial Notion-flavored Markdown.
- `properties` (object | null) — data source property values keyed by property name.

Returns: `{ pageId: string, url: string }`.

### `updatePage`

Purpose: update an existing page's properties or append or replace body content.

Inputs:
- `pageId` (string) — page id to update.
- `properties` (object | null) — property values keyed by property name.
- `markdown` (string | null) — content to write.
- `mode` ("append" | "replace" | null) — content mode; `null` uses the deployment default.

Returns: an object containing the page id and a flag or summary describing what changed.

### `createDatabase`

Purpose: create a database with an initial schema under an accessible parent page.

Inputs:
- `parentPageId` (string) — accessible parent page id.
- `title` (string) — database title.
- `schema` (object) — property definitions keyed by property name, each with a `type` and any type-specific configuration.

Returns: `{ databaseId: string, dataSourceId: string, url: string }`.

### `updateDataSource`

Purpose: add, rename, retype, or remove properties on an existing data source.

Inputs:
- `dataSourceId` (string) — data source to change.
- `properties` (object) — property definitions to add or change, keyed by property name; a `null` value removes a property.

Returns: `{ dataSourceId: string, schema: object }` with the resulting property schema.

### `queryDataSource`

Purpose: read rows from a data source with optional filtering, sorting, and pagination.

Inputs:
- `dataSourceId` (string) — data source to query.
- `filter` (object | null) — API-shaped property filter.
- `sorts` (array | null) — property and direction pairs.
- `pageSize` (number | null) — page size; `null` uses the deployment default.
- `startCursor` (string | null) — pagination cursor.

Returns: `{ results: Array<{ id, url, properties }>, has_more: boolean, next_cursor: string | null }`.

### `batchCreateRows`

Purpose: create many data source rows in one call for seeding or importing a dataset.

Inputs:
- `dataSourceId` (string) — destination data source.
- `rows` (array) — property-value objects keyed by property name; up to 50 rows per call.

Returns: `{ created: number, rows: Array<{ id, url }>, errors: Array<object> }`.

### `notionApiRequest`

Purpose: call a non-delete Notion Public API endpoint when a specialized tool is not needed.

Inputs:
- `method` ("GET" | "POST" | "PATCH" | "PUT") — HTTP method.
- `path` (string) — API path beginning with `/`, including any query string.
- `bodyJson` (string | null) — JSON request body, or `null` when no body is needed.

Returns: the raw JSON response text from the Notion API. Delete-style calls are intentionally not exposed.

## ⚠️ Boundaries and gotchas

- The Public API cannot create a top-level teamspace page. Every build needs an existing accessible parent page inside the destination teamspace.
- Nothing is visible to the worker until the integration is explicitly shared with that page or database; an empty search result usually means missing sharing, not missing content.
- Batch row creation is capped at 50 rows per call. Chunk larger imports and keep a record of created ids so retries do not duplicate rows.
- Verify the authenticated workspace name before the first write. One worker per workspace keeps a token from reaching the wrong content.
