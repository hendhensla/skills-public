---
name: verify-and-close-account-research-batches
skill: Verify and close account research batches
description: >-
  Book-level and repair-level rules for multi-account research runs: batch
  manifest and completion verification, a single canonical relative-tier
  normalization pass, migration-only template repairs, bulk-write safety, and a
  verified review-queue query.
category:
  - Research
  - Notion
proficiency: Advanced
trigger: Agent
notes: >-
  Load only for batch or repair runs so single-account research does not carry
  it. The review-queue query is verified against a live accounts database; the
  batch and repair procedures were extracted from working agent instructions and
  should be exercised on a small batch first.
setup: required
---

## 🚀 First run (setup)

Treat this as a first run when no `setup: complete` line is recorded in this file, when any
`<...>` placeholder below is still unfilled, or when the user has never invoked this skill.
Run setup before touching a batch.

1. **Explain the skill in two or three sentences.** Tell the user this skill governs research
   runs that cover more than one account, or that repair the structure of already-researched
   account pages. It is loaded by a research or monitoring agent when a run is a batch or a
   repair, and it produces a verified batch manifest, fully populated account pages, a
   recomputed relative tier across the scored book, and a named list of failures. It never
   invents account facts to satisfy a completeness check.
2. **Collect the prerequisites the user must supply.** Never guess these.
   - `<your-accounts-db>` — the accounts database this batch runs against, plus the exact names
     of its score, absolute-tier, relative-tier, research-status, and last-review properties.
   - `<your-contacts-db>` — the contacts database, and how an account-bound contacts view is
     addressed on an account page.
   - `<your-account-template>` — the canonical account page template, including its exact
     section markers and heading labels, because verification matches labels exactly.
   - `<your-segments>` — the segment names in use, and which segments require the nested
     inferred-operating-structure analysis.
   - `<your-tier-bands>` — the fixed score bands that produce the absolute tier, and the review
     cadence per tier.
   - Which agent or session is allowed to close a batch, since only the parent session may run
     the relative-tier pass.
   - The connections needed to read and write the accounts database. Ask for credential and
     environment variable **names** only, never values.
3. **Walk the placeholders one at a time.** Ask for one value, restate the mapping back to the
   user in plain language, correct it if wrong, then move on. Have the user save the filled
   values into their own copy of this file.
4. **State the limits until setup is complete.** Without `<your-accounts-db>` and its exact
   property names the skill cannot build a manifest or verify completion. Without
   `<your-account-template>` markers it must not claim a page passes verification. Without
   `<your-tier-bands>` it must not write any tier value. Without a named closing session it must
   not run the relative-tier pass at all.
5. **Record completion.** Change the frontmatter line to `setup: complete` and note the date, so
   later runs skip straight to the workflow.

## 📖 When to use this

Load this only when a run covers more than one account, or when it repairs template structure.
Do not load it for single-account research.

Typical callers: your initial account-research agent for first-pass batch runs, and your
recurring account-signal monitor for scheduled sweeps.

## ✅ Batch completion and output verification

1. Build a target manifest from the current `<your-accounts-db>` rows before research starts.
   Track each row as Pending, In progress, Complete, or Failed.
2. For existing researched rows, run a migration preflight before content updates: route
   verification, exact canonical template markers, exact org-map labels, the segment-specific
   inferred operating structure, source log, material-change log, final account POV, and the
   score and tier properties.
3. Never call the batch complete until every target is Complete or Failed and the failures are
   named.
4. A Complete row must have a nonblank account page, the full canonical template structure, an
   account fit score, fit details, an absolute proposed tier, research status set to Complete,
   last review set to the run date, and one concise completion comment. A property-only score is
   not completed research.
5. After each write, reload the account page and verify the selected new-business or existing-
   customer route, the canonical account relation, the exact account-bound `<your-contacts-db>`
   view, and all route-required sections: the qualification, findings, and synthesis section
   ranges defined by `<your-account-template>`, the final account POV, audit flag detail, the
   organization map, the stakeholder table, the prior-engagement table, the source log, critical
   unknowns, and the material-change log. For segments that require it, also verify the nested
   inferred-operating-structure toggle inside the org-graph section, and verify that it contains
   an operating-model fingerprint, initiative-level strategy hypotheses, account evidence,
   counter-signals, a confidence statement, an explicit collaboration-seams line or table row, a
   disconfirming question, and an access note. For product- and engineering-dense accounts,
   verify that the map names the important functions, artifacts, and collaboration seams. For
   existing customers, also verify the footprint and usage sections. For new-business accounts,
   verify that inapplicable footprint fields are explicitly marked Not applicable.
6. If a page is blank, seed the complete canonical template before filling it. If research uses
   an older or partial structure, migrate all validated findings into the canonical template
   during that run.
7. Retry a transient source or write failure once. For bulk writes, use chunks of 10 to 20 rows,
   then reload and verify the affected rows before continuing. If a write call times out or
   returns an ambiguous result, do not assume success or failure. Reload the target rows and
   retry only the missing edits, so duplicate blocks are avoided. If it still fails, preserve
   completed work, mark the row Failed, record the cause and the next action, and continue the
   remaining rows.
8. At the end, verify that target count equals complete count plus failed count, and verify both
   tier properties. Do not imply that a writeback finished before this check passes.

## 🔢 Book-level relative tier pass

This page is the only place the relative-tier algorithm is defined. A single-account run must
never set the relative tier.

- The **proposed tier** is the absolute tier from the fixed score bands in `<your-tier-bands>`.
- The **relative tier** is the account's rank inside the runner's current scored book.
- Run this pass only from the parent session that closes the batch. A per-account child session
  cannot see the full book and must not attempt it.

1. Query every `<your-accounts-db>` row that has a nonblank account fit score.
2. Sort by score from highest to lowest, then by account name from A to Z.
3. Split the ordered list into five cohorts whose sizes differ by no more than one.
4. Assign relative tier 1 to the highest cohort through relative tier 5 to the lowest cohort.
5. Write the relative tier only where the value changed. Leave it blank for rows with no
   completed score.
6. Do not change the fit score to force an even distribution. The score stays evidence-based and
   absolute.
7. Recompute all scored relative tiers after a batch changes any score or adds a scored account.
8. Do not say the relative tier was unchanged unless the ranking was actually recomputed against
   the current scored book. If a score changed and the relative tier was not recomputed for the
   book, the batch is not complete.

Never write to tier properties owned by another team or role.

## 🧰 Migration-only repairs and bulk-write safety

- Treat missing canonical structure as a repair task, not new research. Preserve validated
  findings and dated history. Add only the missing canonical wrapper, exact labels, or
  route-verification metadata that can be verified from existing row or account evidence.
- Never use placeholder organizational facts to satisfy a QA check. If a required org-map element
  is missing and cannot be verified, write Unknown plus what was checked, or mark the row Failed
  with the next action when the gap blocks completion.
- In bulk updates, chunk the writes, verify each chunk by reloading pages, and keep an audit
  manifest of Complete, Failed, and Needs deeper research. A property-only score, a timeout
  without reload verification, or an implied label is not completion.
- For template repairs that do not change substance, avoid page comments, and avoid score and
  tier changes.
- Do not change score, tier, or motion only because a route block or a label was missing.

## 📋 Verified review-queue query

Formula properties are typically not queryable from SQL, so a computed "review overdue" field
cannot be used. Build the queue from raw columns. Subqueries are rejected, so keep it one flat
SELECT.

```sql
SELECT url, "Account Name", "Segment", "Proposed Tier", "Account Fit Score",
       "date:Last Research Review:start" AS last_review
FROM "<your-accounts-db>"
WHERE "Research Status" = 'Complete'
  AND (
    "date:Last Research Review:start" IS NULL
    OR julianday('now') - julianday(date("date:Last Research Review:start"))
       >= CASE "Proposed Tier" WHEN 'Tier 1' THEN 7 WHEN 'Tier 2' THEN 14 ELSE 30 END
  )
ORDER BY
  CASE WHEN "date:Last Research Review:start" IS NULL THEN 999
       ELSE julianday('now') - julianday(date("date:Last Research Review:start"))
            - CASE "Proposed Tier" WHEN 'Tier 1' THEN 7 WHEN 'Tier 2' THEN 14 ELSE 30 END
  END DESC,
  "Account Fit Score" DESC
LIMIT 15
```

Cadence encoded above: tier 1 every 7 days, tier 2 every 14 days, tiers 3 to 5 every 30 days. A
blank last-review date sorts to the front of the queue. Replace the property names and cadence
with the ones defined in `<your-accounts-db>` and `<your-tier-bands>`.
