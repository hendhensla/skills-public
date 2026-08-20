## 🚀 First run (setup)
Treat this as a first run when no `setup: complete` marker is recorded, when any placeholder below is still unfilled, or when the user has never invoked this skill.
On a first run, do this before calling any tool:
1. Explain the skill in two or three sentences: it is a deployed worker that fetches public ATS job boards for the accounts you track, classifies which open roles match your ideal-customer-profile role categories, and writes new postings plus per-account hiring signal fields back into your own databases. It runs when an agent calls one of its tools, usually on a schedule or on demand for one account. It produces new posting rows, updated account hiring fields, and a resumable cursor when a scan is larger than one call.
2. List the prerequisites the user must supply:
	- A deployed copy of this worker in their own workspace, referenced as `<your-worker-id>`.
	- An accounts database (`<your-accounts-db>`) with a careers-board URL field and a tier or priority field.
	- A postings database (`<your-postings-db>`) with fields for job title, job URL, account relation, role category, source, and first-seen date.
	- The credential and environment variable names the worker reads, by name only, never values: the Notion integration/API credential the worker uses to write, plus `RUN_BUDGET_MS`, `NETWORK_BUDGET_MS`, `PER_ACCOUNT_BUDGET_MS`, and `MAX_WRITES_PER_CALL` for pacing.
	- The connection or agent that will be allowed to call the worker's tools.
3. Walk the user through the placeholders one at a time — `<your-worker-id>`, `<your-accounts-db>`, `<your-postings-db>`, careers-board field name, tier field name — confirm each mapping back to them, and have them save the filled values into their own copy of this skill.
4. Smoke test with one read-only call before any write: `previewBoard` with a single known careers-board URL. Expect a return of the shape `{ provider, jobsFound, icpMatches, sample: [{ title, url, category }] }` and no rows written. If `provider` comes back as `generic`, the URL is on a customer-owned domain and the worker will probe known platforms against that origin.
5. Record completion by setting `setup: complete` in the frontmatter of the user's copy, so later runs skip straight to the workflow.
Until setup is complete this skill cannot scan boards or write anything: the worker id and both database placeholders are required, and any write call without them will fail or write to the wrong place.
## Purpose
A deployed worker is the network and write layer for hiring-signal research. Agents on their own are limited to web search and static page fetch, which fails on JavaScript-rendered careers pages and on JSON endpoints. A worker uses ordinary `fetch()`, so it can issue POST requests, paginate, retry, and control headers — the difference between roughly 30–50% and roughly 95% coverage on API-backed boards.
## Tool surface
### `scanBoards`
The main loop: fetch many boards, classify roles, write results.
Input:
<table header-row="true">
<tr>
<td>Field</td>
<td>Type</td>
<td>Meaning</td>
</tr>
<tr>
<td>`tiers`</td>
<td>`string[]`</td>
<td>Account tiers or priorities to include.</td>
</tr>
<tr>
<td>`startIndex`</td>
<td>`number`</td>
<td>Resume position in the account list. Use `0` for a fresh run.</td>
</tr>
<tr>
<td>`accountName`</td>
<td>`string` (optional)</td>
<td>Restrict the run to one account by name.</td>
</tr>
</table>
Behavior: phase one fetches every board concurrently with a small in-process throttle; phase two writes to your databases. Both phases respect an explicit deadline so the call finishes inside the platform capability timeout.
Returns:
```json
{
  "accountsScanned": 12,
  "jobsFound": 840,
  "icpMatches": 190,
  "postingsCreated": 34,
  "accountsUpdated": 12,
  "skipped": [{ "account": "<name>", "reason": "board unreachable" }],
  "nextIndex": 12
}
```
`nextIndex` is present only when work remains; call `scanBoards` again with `startIndex` set to that value.
### `discoverBoard`
Finds the careers board for one account when the URL is unknown, by probing candidate slugs across every supported provider.
Input:
<table header-row="true">
<tr>
<td>Field</td>
<td>Type</td>
<td>Meaning</td>
</tr>
<tr>
<td>`accountName`</td>
<td>`string`</td>
<td>Account to probe.</td>
</tr>
<tr>
<td>`save`</td>
<td>`boolean` (optional)</td>
<td>When true, write the discovered URL to the account's careers-board field.</td>
</tr>
</table>
Returns:
```json
{
  "account": "<name>",
  "found": true,
  "provider": "greenhouse",
  "boardUrl": "https://…",
  "jobsFound": 61,
  "saved": true,
  "attempts": [{ "provider": "lever", "slug": "acme", "ok": false }]
}
```
### `previewBoard`
Read-only. Reports what a board would produce without writing anything. Use it for debugging and for the first-run smoke test.
Input:
<table header-row="true">
<tr>
<td>Field</td>
<td>Type</td>
<td>Meaning</td>
</tr>
<tr>
<td>`boardUrl`</td>
<td>`string`</td>
<td>Careers board or feed URL.</td>
</tr>
<tr>
<td>`limit`</td>
<td>`number` (optional)</td>
<td>Cap on sampled jobs returned.</td>
</tr>
</table>
Returns:
```json
{
  "provider": "workday",
  "jobsFound": 124,
  "icpMatches": 31,
  "sample": [{ "title": "…", "url": "https://…", "category": "…" }]
}
```
## Provider coverage
<table header-row="true">
<tr>
<td>Provider</td>
<td>Method</td>
</tr>
<tr>
<td>Greenhouse</td>
<td>JSON API</td>
</tr>
<tr>
<td>Lever</td>
<td>JSON API</td>
</tr>
<tr>
<td>Workday</td>
<td>POST `cxs` endpoint</td>
</tr>
<tr>
<td>SmartRecruiters</td>
<td>JSON API</td>
</tr>
<tr>
<td>BambooHR</td>
<td>JSON API</td>
</tr>
<tr>
<td>Ashby</td>
<td>JSON API</td>
</tr>
<tr>
<td>Workable</td>
<td>JSON API</td>
</tr>
<tr>
<td>Recruitee</td>
<td>JSON API</td>
</tr>
<tr>
<td>Oracle Cloud</td>
<td>`hcmRestApi`</td>
</tr>
<tr>
<td>Radancy</td>
<td>`/api/jobs` feed</td>
</tr>
<tr>
<td>Phenom</td>
<td>POST `/widgets`</td>
</tr>
<tr>
<td>Paycom</td>
<td>Anonymous token, then POST search</td>
</tr>
<tr>
<td>ADP WorkforceNow</td>
<td>Public career-center JSON</td>
</tr>
<tr>
<td>iCIMS</td>
<td>Server-rendered HTML</td>
</tr>
</table>
Some platforms sit behind a bot check that refuses a plain `fetch()` and are not supported.
## Gotchas worth keeping
1. Classify on job title only. Department or org text produces heavy false positives — every role inside a "Product" org reads as a product role.
2. Give the network phase its own deadline, not just the whole call. A slice of very large boards can otherwise consume the entire capability timeout before a single write happens. Per-account budgets keep one slow board from starving the rest.
3. In-process pacing helpers are often synchronous and cannot wrap an async fetch; a plain short delay between requests is the reliable throttle.
4. Normalize job URLs before dedupe. Several providers append tracking parameters that change between runs.
5. A careers URL on a company-owned domain does not name its platform. Treat it as generic and probe the known platforms against that origin, then record whichever answers. This is how new career sites get picked up without hand-mapping each account.
6. Legacy portals are sometimes stubs that redirect to a newer career site. When a provider returns nothing, follow the redirect once and re-detect the platform.
7. Shared career sites host many brands behind one feed and separate them with a query filter. Carry the filter recorded on the board URL through the fetch, or one brand returns the parent company's entire req list.
8. Exclude role families that share vocabulary with your ICP but are not it — physical engineering and physical design disciplines, for example. Without that rule an engineering-services account looks like a product-and-design hiring surge.