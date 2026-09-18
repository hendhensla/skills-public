---
name: skill-sync
skill: skill-sync
description: >-
  Synchronize personal skills between an authoritative Notion catalog, a Git
  repository, and the local checkout used by agent runtimes. Use after creating
  or editing a skill, to inspect sync health, or to reconcile pending changes
  and conflicts.
category:
  - Automation
proficiency: Advanced
trigger: Scheduled
notes: >-
  Treat the catalog as authoritative, preserve concurrent edits, and verify
  saved content rather than trusting transport success alone.
setup: incomplete
---

## 🚀 First run (setup)

Treat this as a first run when the `setup: complete` marker is absent, a required placeholder is still unfilled, or the user has never invoked this skill.

This skill keeps personal skill instructions aligned between a source catalog, a Git repository, and the local checkout used by agent runtimes. It runs after skill edits settle or when you request an explicit reconciliation, and it produces verified repository content, catalog updates, and a clear conflict or error result when convergence is unsafe.

Before using it, supply these prerequisites:

- `<your-skills-database>` — the Notion database and data source that own your skill rows.
- `<your-skills-repository>` — the Git repository and default branch that store the canonical skill files.
- `<your-agent-checkout>` — the local checkout whose `skills/` directory is used by your agent runtimes.
- `<your-reconciliation-job>` — the scheduled job, action, or worker that moves changes between the catalog and repository.
- `<your-status-command>` and `<your-sync-command>` — commands or tool calls that report health and request an immediate sync.
- The credential names and connections required by your deployment, such as `NOTION_API_TOKEN` and `GITHUB_TOKEN`; provide names only, never secret values.

Walk through the placeholders one at a time. After each value is supplied, repeat the mapping back to the user and have them save the filled values in their own copy of this skill. Until setup is complete, this skill cannot safely reconcile real records, install local links, or claim that a sync succeeded. When all mappings are confirmed, change the frontmatter marker to `setup: complete` so later runs skip onboarding.

## Purpose

Use this skill to synchronize personal skill directories without losing edits made concurrently in the catalog, repository, or local checkout. The source catalog is authoritative for the saved record, the repository provides verified history, and the local checkout is the execution copy.

## Routes

- A local session writes `skills/<name>/SKILL.md` and any supporting files. After edits remain stable, the transport commits eligible files and pushes them.
- A direct repository edit triggers the same reconciliation workflow.
- A catalog edit is detected by the scheduled reconciliation job, exported to the repository, and pulled into the local checkout.
- New independent skill directories can be adopted into the shared checkout after they settle; preserve a backup before replacing originals with compatibility links.
- System-, plugin-, and vendor-installed skills retain their installer ownership. Local-only material remains local.

A file in an unrelated computer or repository cannot sync until it reaches the configured catalog or repository. Use the shared checkout for personal skills written in project sessions.

## Normal operations

From the configured checkout, run the values recorded during setup:

```sh
<your-status-command>
<your-sync-command>
```

The immediate-sync operation should capture all eligible pending personal skill files, not just the file from the current turn. Inspect pending paths before using it during concurrent sessions. Ordinary work can finish editing and allow the background transport to run.

A manual transport push is not proof of a completed reconciliation. Verify the job result, the saved catalog content, and the local checkout independently. Polling intervals are targets: sleeping machines, scheduled-job delays, and active edits can postpone convergence.

## State and concurrency

Keep a per-skill baseline that records the repository content hash, the catalog content version, and relevant metadata. The catalog and repository have independent baselines because catalog Markdown may be normalized. Commit the baseline and canonical files atomically when possible.

Use a lock for local jobs and a serialized queue for cloud reconciliation. Never stash another session's work, force-push, reset the working tree, or commit unrelated staged files. A stale write must fail instead of overwriting newer work.

When both sides changed, preserve the competing edits and record a conflict for deliberate reconciliation. Do not erase the baseline or force one side through. Partial failures should leave the previous baseline intact. A successful API response is insufficient until the saved content and supporting files match what was submitted.

## Files and API boundaries

Treat a skill as a complete directory: include its main file, scripts, references, assets, and nested files. Preserve relative paths when exporting and importing. If the destination API cannot create native folders, use a manifest that maps transport attachment names back to relative paths; use a compressed archive for larger bundles or unsupported binary types.

Validate archives against traversal, duplicate-path, entry-count, compressed-size, and uncompressed-size limits. Exclude secrets, dependency directories, caches, vendor packages, generated dependencies, and explicitly local-only content from automatic capture.

Preserve the repository slug and optional frontmatter when importing from a catalog so a title edit does not silently rename a skill or discard agent-specific settings. Let the catalog own status after initial creation, and do not import retired or explicitly non-skill records as executable skills.

## Diagnose and repair

Use the configured status command to inspect transport health and pending paths. Distinguish transport states such as `noop`, `pulled-and-verified`, `pushed-and-verified`, `conflict`, and `error`; conflicts and errors are not success.

For a conflict, compare the repository version, catalog export, and saved baseline. Preserve both competing edits, decide which content should win, then reconcile deliberately. For a failed upload or permission error, record the block, resolve the upstream access or security issue, remove only the relevant block marker, and run a targeted reconciliation.

After changing the worker or reconciliation job, run its build and unit tests, then verify a live canary in both directions. Include a nested supporting file, a metadata edit, and a subsequent no-op. Verify the deployed job, successful repository action, and local scheduler separately.

## Safety rules

- Confirm the actual catalog identity before any manual repository or catalog write; do not infer an environment from a connection name.
- Never package credentials, secret values, personal data, customer data, or machine-specific paths.
- Keep public-release de-identification and review gates separate from private reconciliation.
- Do not report completion until repository content, catalog content, and local state have each been verified.
