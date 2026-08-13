# claude-skills-sync

Keep your [Claude Code skills](https://docs.claude.com/en/docs/claude-code/skills) in
**three-way sync**: a **GitHub repo** ⇄ a **Notion database** ⇄ the **local**
`~/.claude/skills/` directory Claude Code triggers from.

Skills stay plain markdown files a coding agent can read and edit — and every skill also
lives in Notion as a database row with a real page body, where your team can browse the
catalog, comment, and collaborate.

```
  Local (~/.claude/skills, a git clone)
        ⇅  git pull / push
  GitHub repo (skills/<slug>/SKILL.md)   ← hub
        ⇅  Notion worker (worker/)
  Notion "AI Skills" DB (row + body page)
```

GitHub is the hub. `local ⇄ GitHub` is ordinary git. `GitHub ⇄ Notion` is bridged by the
[`ntn`](https://developers.notion.com) worker in [`worker/`](worker/). `local ⇄ Notion`
happens transitively through GitHub.

## Layout

| Path | What |
|------|------|
| `skills/<slug>/SKILL.md` | one skill = frontmatter (Notion row props) + markdown body (the Notion page) |
| `.sync/<slug>.md` | last-synced canonical body per skill — used to diff for comment-preserving writes and to detect echoes/conflicts. **Excluded from the Action trigger.** |
| `worker/` | the `ntn` worker that syncs GitHub ⇄ Notion (both directions) |
| `.github/workflows/sync-to-notion.yml` | on push to `skills/**/SKILL.md`, invokes the worker (GitHub → Notion) |

## The SKILL.md contract

```yaml
---
name: my-skill                   # slug = Claude Code skill name = folder name
skill: My Skill                  # Notion title (Skill property)
description: ...                 # what Claude Code triggers on
status: Active                   # ↔ Status   (Idea|Backlog|Drafting|Testing|In review|Active|Retired)
category: [Research, Analysis]   # ↔ Category (multi-select)
proficiency: Expert              # ↔ Proficiency
trigger: Agent                   # ↔ Trigger
last_tested: 2026-05-19          # ↔ Last tested
notes: ...                       # ↔ Notes
notion_row: https://notion.so/<row-id>   # mapping (DB row) — written back by the worker
notion_doc: https://notion.so/<doc-id>   # mapping (body page) — written back by the worker
---
<full skill instructions as markdown>
```

A new `SKILL.md` with no `notion_row`/`notion_doc` → the worker **creates** the Notion row +
body page and writes the IDs back into frontmatter. See
[`skills/example-skill/SKILL.md`](skills/example-skill/SKILL.md).

## Sync directions

**GitHub → Notion.** The GitHub Action fires on push → invokes the worker's `pushToNotion` →
it parses the changed `SKILL.md` → updates the Notion row props + writes the body back via
`PATCH /v1/pages/{id}/markdown` using **`update_content`** (targeted `{old_str,new_str}`
diffs, never a wholesale replace) so block IDs — and the comments anchored to them — survive.

**Notion → GitHub.** Run the worker's `pushToGitHub` with the changed page id → it reads the
row props + body via `GET /v1/pages/{id}/markdown` → composes `SKILL.md` → commits to the
repo. Repo files are matched by their `notion_row` link (never by title), so renaming a row
can't fork a skill. Wire it to a Notion DB automation/webhook if your workspace has access;
otherwise it's a one-line manual invoke.

**Repair.** `forcePushToNotion` replaces a page body wholesale from GitHub and refreshes the
snapshot — for migrating or fixing a desynced skill (comment anchors on that page are lost).

## Comment preservation

Notion comments are anchored to block IDs and are **not** part of the markdown.

- **Edits that keep a block** → comments survive (block ID is stable under `update_content`).
- **Deletions that remove a block** → the comment's anchor is gone. The worker's
  `COMMENT_DELETE_POLICY` controls what happens:
  - `flag` (default): don't delete; raise a Notion comment + GitHub issue for a human to resolve.
  - `salvage`: re-post the comment text/author as a page-level comment, then delete.
  - `allow`: delete anyway.

## Loop prevention & conflicts

1. Per-skill last-synced snapshot in `.sync/` stores the **round-tripped** markdown (Notion
   normalizes formatting on write, so the snapshot must be what a fresh GET returns).
2. The worker's GitHub commits carry a `[skills-sync]` marker and a bot author; the Action
   skips them.
3. If **both** sides changed a skill since the last sync, the worker does **not** overwrite —
   it flags (Notion comment + GitHub issue). Resolution is manual.

Two gotchas learned in production:

- Notion **normalizes markdown** on import (blank lines, code-fence indentation) without
  losing content. The snapshot design absorbs this.
- Notion **auto-links bare `FILE.md` tokens** into `http://FILE.md` links. Wrap file
  references in backticks in skill bodies.

## Setup

1. **Notion**: create a database with properties matching the frontmatter contract above
   (Skill title, Status status, Category multi-select, Proficiency select, Trigger select,
   Last tested date, Notes text, "What it does" text, "Doc URL" url). Create an internal
   integration with read+update content, share it into the DB and the parent page where
   body pages should live.
2. **Worker**: `cd worker && npm install && npm run build`, then
   `ntn login && ntn workers deploy` (creates `workers.json`). Set its env:
   `SKILLS_NOTION_TOKEN`, `GITHUB_TOKEN` (fine-grained PAT for this repo: Contents R/W,
   Metadata R, Issues R/W), `AI_SKILLS_DATASOURCE`, `GITHUB_REPO`, `SKILL_BODY_PARENT`
   (page id under which new body pages are created). Note: the deployed platform reserves
   the `NOTION_` env prefix — hence `SKILLS_NOTION_TOKEN`.
3. **GitHub Action**: add repo secret `NOTION_API_TOKEN` (mint with `ntn tokens create`).
   Commit your `workers.json` (or set the path in the workflow) so CI can resolve the
   worker id.
4. **Local**: clone this repo and symlink `~/.claude/skills` at the `skills/` directory —
   local and repo are then the same files.

**Local dry run** (read-only; needs only a Notion token in `worker/.env`):

```sh
cd worker && cp .env.example .env
npx tsx src/cli.ts dry <row-or-body-page-id>   # prints composed SKILL.md, no writes
npx tsx src/selftest.ts                        # token-free: diff engine + frontmatter checks
```
