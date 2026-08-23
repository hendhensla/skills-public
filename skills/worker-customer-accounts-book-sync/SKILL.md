---
name: worker-customer-accounts-book-sync
skill: customer-accounts-book-sync
type: Worker
description: >-
  Documents the callable surface of a Worker that mirrors account records into
  a target database while preserving stable row identities.
category:
  - Automation
  - Notion
proficiency: Advanced
trigger: Scheduled
worker_url: <your-worker-url>
notes: >-
  Public copy intentionally documents only agent-callable tools. The deployed
  capability is a hosted database sync, so this row exposes no agent-callable
  tool surface.
setup: pending
---

## 🚀 First run (setup)

Treat this as a first run when no `setup: complete` marker is recorded, when a placeholder below is still unfilled, or when the user has never invoked this skill.

This Worker keeps account records aligned between a source database and a target database by using each source page ID as the stable sync key. It runs through its hosted Worker deployment and produces stable target rows; this public copy intentionally omits private sync configuration and does not expose the hosted sync as an agent tool.

Before setup is complete, the adopting user must supply:

1. A deployed copy of this Worker in their own workspace, recorded as `<your-worker-url>`.
2. The source database that contains the account records, recorded as `<your-source-database>`.
3. The target database that should receive the mirrored rows, recorded as `<your-target-database>`.
4. The source page-ID mapping and the target title/property mapping used by their deployment.
5. Any credential or environment-variable names declared by their own deployment, by name only and never by value. This public copy does not prescribe a credential name because none is exposed by the source row.

Walk through these placeholders one at a time — `<your-worker-url>`, `<your-source-database>`, `<your-target-database>`, then the source and target property mappings — confirm each mapping back to the user, and have them save the filled values into their own copy of this skill.

This public copy has no callable agent tool to smoke-test: the hosted capability is a database sync rather than an agent tool. Until setup is complete, an adopting user cannot safely connect the Worker to their own source and target databases or verify that stable row identities are preserved. After deployment, verify the Worker through the platform's own run/health view, then record completion by setting `setup: complete` in the frontmatter.

## Purpose

Use this entry as a public catalog record for a database-sync Worker whose outside-agent tool surface is intentionally empty. Keep the source and target database mappings in the adopting user's private copy.

## Tool surface

No agent-callable tools are exposed by this Worker. The hosted database-sync capability is intentionally omitted because outside agents cannot call it.
