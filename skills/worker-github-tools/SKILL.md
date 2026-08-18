---
name: github-tools Worker
skill: worker-github-tools
description: Full GitHub read and write from agents using your own token, including repository creation, branches, commits, pull requests, reviews, and merges.
category:
  - Automation
proficiency: Advanced
trigger: Agent
type: Worker
worker_url: <your-worker-url>
notes: Use when a hosted GitHub app integration is too restricted (for example it returns 403 on repository creation). The token is held as a brokered credential, so it never appears in code or chat.
setup: pending
---

## 🚀 First run (setup)

Treat this as a first run when `setup:` is still `pending`, when `worker_url` or the credential name is still a placeholder, or when the user has never invoked this worker.

What it does: this worker exposes the GitHub REST API as callable agent tools. An agent can read repositories, files, and pull requests, and can create repositories, branches, commits, pull requests, reviews, and merges. It runs on demand whenever an agent calls one of its tools, and it produces real changes in GitHub under the identity of the token you supply.

Before it can be used, the adopting user must supply:

1. A deployed copy of this worker in their own workspace, and its worker URL to record in `worker_url`.
2. A GitHub account or organization the token may act on.
3. One brokered credential named `GITHUB_TOKEN`, scoped to `api.github.com`. Provide the credential name and let the platform inject it as `Authorization: Bearer <token>`; never paste the value into the skill, a repo, or chat. A classic personal access token with the `repo` scope is the baseline. Add `workflow` to commit files under `.github/workflows/`, `read:org` for organization repositories, and `delete_repo` only if deletion is wanted.
4. The default repository owner login the agent should assume, to fill `<your-github-owner>`.

Walk the user through one placeholder at a time — `worker_url`, then `GITHUB_TOKEN`, then `<your-github-owner>` — confirm each mapping back to them, and have them save the filled values into their own copy of this file.

Until setup is complete this worker cannot do anything: every tool call fails authentication without the credential, and paths cannot be resolved without an owner.

Smoke test one call:

- Tool: `whoAmI`
- Input: `{}`
- Expected return shape: an object identifying the authenticated account, for example `{ "login": "<your-github-owner>", "name": "...", "type": "User" }`. If it returns an authentication error, the credential is not attached correctly.

When the smoke test passes, record completion by changing the frontmatter line to `setup: complete` so later runs skip straight to the tool surface.

## 🧰 Tool surface

### `whoAmI`

Purpose: confirm which GitHub account the worker's token belongs to.

Inputs: none.

Returns: an object describing the authenticated account (login, name, account type).

### `listRepos`

Purpose: list repositories the authenticated account owns, most recently updated first.

Inputs:
- `limit` (number | null) — how many repositories to return; `null` means 20, maximum 100.

Returns: an array of repository objects with full name, visibility, default branch, URL, and last-updated timestamp.

### `getFile`

Purpose: read a text file from a repository at any branch, tag, or commit.

Inputs:
- `owner` (string) — repository owner login.
- `repo` (string) — repository name.
- `path` (string) — repository-relative file path.
- `ref` (string | null) — branch, tag, or commit sha; `null` means the default branch.

Returns: an object with the file path, the decoded text content, and its blob sha.

### `listPullRequests`

Purpose: list pull requests in a repository, most recently updated first.

Inputs:
- `owner` (string), `repo` (string).
- `state` ("open" | "closed" | "all" | null) — `null` means open.
- `limit` (number | null) — `null` means 20, maximum 100.

Returns: an array of pull request summaries with number, title, state, head and base branches, author, and URL.

### `getPullRequest`

Purpose: read one pull request, including state and mergeability, and optionally its changed files.

Inputs:
- `owner` (string), `repo` (string).
- `number` (integer) — pull request number.
- `includeFiles` (boolean | null) — include changed files and patches; defaults to false.

Returns: a pull request object with number, title, body, state, draft flag, mergeable state, head and base refs, and, when requested, a `files` array of paths with patches.

### `createRepo`

Purpose: create a repository for the authenticated account or inside an organization.

Inputs:
- `name` (string) — repository name.
- `description` (string | null).
- `isPrivate` (boolean | null) — defaults to private.
- `autoInit` (boolean | null) — create an initial README commit; defaults to false.
- `organization` (string | null) — organization login, or `null` for a personal repository.

Returns: an object with the repository full name, URL, and default branch.

### `createBranch`

Purpose: create a branch from another branch, tag, or commit so the default branch stays clean.

Inputs:
- `owner` (string), `repo` (string).
- `branch` (string) — new branch name.
- `fromRef` (string | null) — starting branch, tag, or commit sha; `null` means the default branch.

Returns: an object with the created ref name and the commit sha it points at.

### `pushFiles`

Purpose: commit one or more text files in a single commit, creating the branch when it does not exist.

Inputs:
- `owner` (string), `repo` (string).
- `branch` (string | null) — target branch; `null` means the default branch.
- `message` (string) — commit message.
- `files` (array of objects) — each with `path` (string, forward slashes) and `content` (string, full file text).

Returns: an object with the resulting commit sha, the branch, and the committed paths.

### `openPullRequest`

Purpose: open a normal or draft pull request from a head branch into a base branch.

Inputs:
- `owner` (string), `repo` (string).
- `title` (string), `body` (string | null, Markdown).
- `head` (string) — branch containing the changes.
- `base` (string | null) — branch to merge into; `null` means the default branch.
- `draft` (boolean | null) — defaults to false.

Returns: an object with the pull request number, URL, and state.

### `commentOnPullRequest`

Purpose: add a conversation comment to a pull request or issue.

Inputs:
- `owner` (string), `repo` (string).
- `number` (integer) — pull request or issue number.
- `body` (string) — comment text in Markdown.

Returns: an object with the created comment id and URL.

### `reviewPullRequest`

Purpose: submit a pull request review.

Inputs:
- `owner` (string), `repo` (string).
- `number` (integer).
- `event` ("APPROVE" | "REQUEST_CHANGES" | "COMMENT").
- `body` (string | null) — required for `REQUEST_CHANGES` and `COMMENT`.

Returns: an object with the review id and submitted state. You cannot approve your own pull request.

### `mergePullRequest`

Purpose: merge a pull request.

Inputs:
- `owner` (string), `repo` (string).
- `number` (integer).
- `method` ("merge" | "squash" | "rebase" | null) — `null` means a merge commit.
- `commitTitle` (string | null).

Returns: an object with a merged flag, the merge commit sha, and a status message.

### `githubRequest`

Purpose: escape hatch for any GitHub REST endpoint, so new needs do not require a redeploy.

Inputs:
- `method` ("GET" | "POST" | "PATCH" | "PUT" | "DELETE").
- `path` (string) — API path starting with a slash, including any query string.
- `bodyJson` (string | null) — request body as a JSON string; `null` for GET and DELETE.

Returns: the raw JSON response text from GitHub.

## ⚠️ Gotchas

- The Git Data API cannot write into a repository with zero commits; it fails with `409 Git Repository is empty`. Either seed the first commit through the Contents API, or create the repository with `autoInit: true` and then use `pushFiles`.
- A personal access token acts as the person, not a bot, so commits and reviews are attributed to that account and self-approval is rejected. Branch protection still applies.
- Prefer one commit per logical change with all files batched into a single `pushFiles` call; retry once on a ref conflict after re-reading the branch head.
