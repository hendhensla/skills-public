---
name: Customer accounts sync Worker
skill: worker-customer-accounts-sync
description: Incrementally synchronizes a source customer-account dataset into a Worker-managed Notion database on a schedule.
category:
  - Automation
  - Notion
proficiency: Advanced
trigger: Scheduled
type: Worker
worker_url: <your-worker-url>
source_connection: <your-source-connection-name>
target_database: <your-target-database>
worker_credential: <your-worker-credential-name>
notes: One-way sync into the adopter's target database. It refreshes rows from the configured source and does not write changes back to that source.
setup: pending
---

## 🚀 First run (setup)

Treat this as a first run when `setup:` is still `pending`, when any placeholder remains unfilled, or when the user has never invoked this worker.

This worker incrementally refreshes a customer-account dataset from a configured source into a Worker-managed Notion database. It runs on the configured schedule and produces a run summary with synchronization results, rather than editing the source system.

Before it can be used, the adopting user must supply:

1. A deployed or connected copy of this worker, with its URL recorded in `worker_url`.
2. The source-system connection used to read customer-account records, recorded by name in `source_connection`.
3. The destination database in the adopting workspace, recorded in `target_database`.
4. The brokered credential name and any environment-variable names required by the deployment, recorded in `worker_credential` and in the worker's own configuration. Record names only; never paste credential values.
5. A schedule appropriate for the source and destination, configured in the worker deployment.

Walk through the placeholders one at a time: first `worker_url`, then `source_connection`, then `target_database`, then `worker_credential` and any deployment environment-variable names. Confirm each mapping back to the user, and have them save the filled values into their own copy of this skill.

Until setup is complete, this worker cannot read the source, resolve the destination database, or run an authenticated synchronization.

Smoke test one call:

- Tool: `myCustomerAccountsSync`
- Input: `{}`
- Expected return shape: an object containing successful-run information and synchronization counts, including the number of rows upserted and deleted. A successful response should indicate completion without an authentication, source-connection, or destination-database error.

When the smoke test passes, record completion by changing the frontmatter line to `setup: complete` so later runs skip straight to the workflow.

## 🔁 Purpose

Maintain a target customer-account database as a Worker-managed, one-way synchronization from a configured source.

## 🧰 Tool surface

### `myCustomerAccountsSync`

Purpose: incrementally refresh the target customer-account dataset from the configured source.

Inputs: none. The worker uses the source connection, target database, and schedule configured during deployment.

Returns: a run-summary object with completion or error information and synchronization metrics, including upsert and delete counts. A representative successful run reports 157 upserts and 0 deletes; treat the counts as deployment-specific rather than a fixed expectation.

## ⏱️ Schedule

Run on the deployment's configured schedule. The source row's validated deployment ran every 30 minutes.

## 🔐 Data direction

This is a one-way synchronization into the target database. It does not write changes back to the external source.

## ⚠️ Gotchas

- Keep the source connection and target database in the same adopter-controlled configuration; do not hard-code workspace, database, worker, or webhook identifiers into the skill.
- Keep credential and environment-variable names in configuration, but never store their values in this file, a repository, or chat.
- Treat the run summary as the source of truth for each execution's upsert and delete counts; do not assume a fixed row total.
