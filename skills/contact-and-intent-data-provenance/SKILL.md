---
name: contact-and-intent-data-provenance
skill: Contact and intent data provenance
description: >-
  Rules for stating where contact, phone, technographic, and intent data
  actually came from. Prevents an agent from claiming it queried a data vendor
  that it cannot query, and fixes the exact provenance wording to use.
category:
  - Reference
  - Research
proficiency: Intermediate
trigger: Manual
setup: required
notes: >-
  Load before attributing any contact, phone, title, technographic, or intent
  fact to a named data provider. Enrichment vendor routing and feature gates
  change often, so reconfirm both before stating either as fact.
notion_row: >-
  https://app.notion.com/p/Contact-and-intent-data-provenance-3c098c21126881918926d5721b08113b
notion_doc: >-
  https://app.notion.com/p/Contact-and-intent-data-provenance-3c098c21126881059a97dff146c5ca03
---

## 🚀 First run (setup)

Treat this as a first run when `setup:` above is still `incomplete`, when any `<placeholder>` is unfilled, or when the user has never invoked this skill before.

What it does: this skill governs how you describe the origin of contact and intent data. It loads before you attribute any person-level or company-level data point to a named vendor, and it produces provenance-correct wording plus an explicit list of things you must not claim. It triggers manually, whenever a run touches enrichment data.

Prerequisites the user must supply — names and pointers only, never credential values:

- `<your-gtm-tool>` — the internal GTM or sales-intelligence surface the agent can actually read (its tool names or connection). This is the only enrichment surface; vendors sit behind it.
- `<your-crm>` — the CRM of record for accounts and opportunities.
- `<your-warehouse>` — the warehouse or pipeline that feeds product signups into the GTM tool.
- The enrichment vendor set and the region-ordered waterfall actually in force, plus any region exclusions.
- The names of the feature gates that control enrichment UI and agent table reads, e.g. `<bulk-actions-gate>`, `<bulk-enrich-ui-gate>`, `<agent-table-read-gate>` — names only.
- `<enablement-owner>` — the team to ask when a gate is off (commonly RevOps or the tool's engineering team).
- Credential or environment variable names for any connection the agent uses, never their values.

Walk the user through each placeholder one at a time. Read back the mapping you recorded and confirm it before moving on. Have the user save the filled values into their own copy of this skill, not into a scratch note.

Until setup is complete, do not make provenance claims from this skill: without the real waterfall and gate names you cannot tell a coverage gap from a disabled gate, and you cannot say which vendor supplied a record. Say so plainly instead of guessing. When every placeholder is filled and confirmed, set `setup: complete` in the frontmatter so later runs skip straight to the playbook.

## 🎯 Purpose

Prevent false provenance. Enrichment vendors are usually not queryable sources for an agent. They are providers inside one enrichment path behind `<your-gtm-tool>`. Name a vendor only when an enrichment artifact names it.

## 🚫 What is typically not available

- No per-vendor tool, function, or search surface in the GTM tool set.
- No provider picker. You cannot request a specific vendor for a specific contact.
- No per-user opt-in or vendor-specific feature flag.
- No vendor intent or topic feed, unless one is explicitly shipped and documented.
- No direct vendor license provisioned for the user.

Confirm each of these against `<your-gtm-tool>` during setup; do not assume the shape above.

## 🔁 How provider data actually arrives

Contact enrichment typically runs a region-ordered waterfall and stops at the first provider that returns a usable record. Record the real order here:

| Region | Provider order |
| --- | --- |
| Rest of world | `<provider-1>` → `<provider-2>` → `<provider-3>` |
| `<region-a>` | `<provider-a1>` → `<provider-a2>` |
| `<region-b>` | `<provider-b1>` → `<provider-b2>` |

Note any region exclusions, since some vendors are contractually unavailable in some regions. Results are stored as per-provider enrichment artifacts and projected into profiles as title, company, phone, phone provider, and do-not-call state.

Most contact records often come from product signups through `<your-warehouse>`, not from a data vendor at all. Check the record's origin before naming a vendor.

## 🎛️ Gates that affect access

- `<bulk-actions-gate>` and `<bulk-enrich-ui-gate>` gate bulk enrichment in the UI. These are usually workspace scoped, not per user.
- `<agent-table-read-gate>` gates agent reading of GTM table views.
- Gates are generally not vendor specific, so none of them turns a single vendor on or off.
- A missing enrichment button is a gate, not missing data. Request enablement from `<enablement-owner>` instead of reporting the capability as unavailable.

## ⚠️ Known coverage trap

A vendor company ID does not map one to one with a `<your-crm>` account. Enterprise parents with sub-accounts can be absent from the GTM tool entirely. Treat a missing account as a coverage gap, never as evidence of no activity or no fit.

## ✅ Required language

- Correct: `Phone from the <your-gtm-tool> enrichment artifact, provider <provider>, dated YYYY-MM-DD.`
- Correct: `Provider unnamed in the artifact, so the source is recorded as <your-gtm-tool> enrichment.`
- Wrong: `Per <provider>, ...` when no artifact names that provider.
- Wrong: `I queried <provider>.` No such path exists.
- Wrong: presenting a topic or intent surge as a first-party signal from the GTM tool.

Keep install signals separate from interest signals. Treat every technographic or intent record as company level, never as proof that a named person acted.

## 🧾 Freshness

Provider routing and gates change often. When a run depends on provenance, confirm the current waterfall and gate state before stating either as fact, and record the date checked.

