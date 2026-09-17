---
name: skills-sync-verification
skill: skills-sync-verification
description: >-
  A small, non-production check that verifies a skill edit can move through a
  publishing pipeline.
category:
  - Documentation
proficiency: Beginner
trigger: Manual
notes: Metadata-only edits must sync too.
notion_row: >-
  https://app.notion.com/p/skills-sync-verification-3de98c211268811ebd3cde4284be0de8
notion_doc: >-
  https://app.notion.com/p/skills-sync-verification-3de98c211268815295f4cb970090bc48
---

## 🚀 First run (setup)

Treat this as a first run when the `setup: complete` marker is absent, any placeholder is still unfilled, or the user has never invoked this skill.

This skill verifies that a deliberate edit to a disposable skill record can travel through a publishing pipeline. It is triggered manually after the edit and produces a simple pass/fail result with references to the resulting repository file and public catalog entry.

Before running it, the user must supply:

- `<your-test-skill-row>` — a disposable source record that is safe to edit.
- `<your-public-repo>` — the repository and branch that should receive the published copy.
- `<your-public-catalog>` — the database that should contain the public catalog row.
- Read/write access to the source record, repository, and catalog.

Walk through the placeholders one at a time. After each value is supplied, repeat the mapping back to the user and have them save the filled values in their own copy of this skill. Until setup is complete, do not modify a production skill, publish a real customer or internal record, or report a successful sync. When all mappings are confirmed, record `setup: complete` in the frontmatter so later runs can skip onboarding.

## Purpose

Use this as a disposable integration check, not as a production publishing workflow. It confirms that a source edit can be represented safely in a repository file and a public catalog row without leaking internal identifiers.

## Verification workflow

1. Confirm that `<your-test-skill-row>` is disposable and contains no personal, customer, credential, or internal-only data.
2. Make one small, intentional content edit to the test row.
3. Confirm that the published repository contains the expected file under the configured skills directory and that its frontmatter remains valid YAML.
4. Confirm that `<your-public-catalog>` contains exactly one matching row and that the row body contains the instructions without the frontmatter.
5. Compare the source and public copies for accidental identifiers, private links, tokens, machine-specific paths, or other internal details.
6. Record a pass only when the repository file and catalog row both match the sanitized content. Otherwise record the failing step and stop; do not retry against production data.

## Expected result

A passing check produces one updated repository file, one matching public catalog row, and a short verification record identifying the tested step. The test content must remain clearly labeled as a non-production fixture.

## Gotchas

- Never use a real customer, employee, credential, or production skill as the test fixture.
- Do not copy workspace IDs, private URLs, tokens, local file paths, or other internal identifiers into the public copy.
- Do not create a second catalog row when an existing row already matches the skill name or slug.
- This skill verifies a publishing path; it does not implement the publishing path itself.

