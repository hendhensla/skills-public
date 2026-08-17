---
name: resume-build-and-claim-verification
skill: Resume Build & Claim Verification
description: >-
  Build or update a resume from primary sources — CRM opportunity exports,
  performance reviews, a wins log — with every quantitative claim verified
  against source data before it ships. Use when asked to "update my resume",
  "add X to my resume", "make a resume", "turn this into resume bullets", or to
  produce a resume in Word/Google Docs/Notion. Also use when asked to
  sanity-check a number already on the resume.
category: Career
proficiency: Advanced
trigger: Manual
notes: >-
  Distilled from a full resume rebuild. The verification pass is the important
  part — it caught a stale metric, an all-time-record claim that was wrong on raw
  data, a mixed-denominator bullet, and a quarterly stat mislabeled as
  role-spanning. The .docx builder produces a one-page file using only the Python
  standard library, for machines without python-docx.
setup: incomplete
---

## 🚀 First run (setup)

Treat this as a first run when `setup:` above is still `incomplete`, when any `<placeholder>` below is unfilled, or when the user has never invoked this skill before.

What it does: this skill builds or updates a one-page resume strictly from primary sources, and it audits every number on the page against that source data before the file ships. It runs manually, whenever the user asks for resume work or asks whether a number on the resume is still true. It produces a verified resume file (Word, Google Docs, or a page in the user's docs workspace) plus a change log of what was added, cut, and corrected.

Prerequisites the user must supply — pointers and names only, never credential values:

- `<your-current-resume>` — where the latest resume file lives (folder or document link). This is the authority for all prior roles, dates, titles, and degree.
- `<your-crm-export>` — how they produce an opportunity export, and confirmation that it can include **all stages** plus region, segment, deal type, and an amount/ARR currency field.
- `<your-review-docs>` — where performance self-reviews and manager feedback live.
- `<your-wins-log>` — the wins log or brag document (awards, launches, speaking, promotions).
- `<your-metrics-page>` — any pre-computed performance or ranking page, if one exists. Optional; treat it as stale until re-verified.
- `<your-docs-db>` — the database or folder where the finished deliverable is filed.
- `<your-tasks-db>` — the task database where the request is logged and marked done.
- Output tooling actually available on the machine: Python for the `.docx` builder, a Drive/Docs connection for the HTML-to-Doc path, and the Notion connection or CLI for a Notion page. Note which are missing.
- Connection or environment variable **names** for any of the above, never their values.

Walk the user through each placeholder one at a time. Read the mapping back and confirm it before moving on, then have them save the filled values into their own copy of this skill rather than a scratch note.

Until setup is complete, do not write resume bullets: without a real CRM export and the source hierarchy you cannot verify a single metric, and unverified numbers are exactly what this skill exists to prevent. Say so plainly and ask for the missing source. When every placeholder is filled and confirmed, set `setup: complete` in the frontmatter so later runs go straight to the workflow.

# Resume — build and verify

Four files in this directory:

- `SKILL.md` (this) — the workflow
- `VERIFY.md` — **read before writing any number.** CRM data traps and the audit protocol
- `WRITING.md` — bullet construction, length discipline, what never goes on the page
- `build_docx.py` — working one-page .docx generator, standard library only

## Source hierarchy

Treat these as authoritative, in order. Never invent a fact that isn't in one of them.

| Source | Authoritative for |
| --- | --- |
| Most recent resume PDF/docx in your local documents folders | **All prior roles.** Dates, employers, titles, degree, client names |
| CRM opportunity export | Every deal metric — volume, win rate, ARR, ranks, segment, deal type |
| Performance self-reviews + manager feedback | POC counts, rep counts, qualitative wins, manager-validated strengths |
| Wins log / brag document | Awards, launches, projects shipped, speaking, promotions, audience reach |
| Any pre-computed performance-analysis page | Ranks — but re-verify, these go stale |
| **The resume owner directly** | Anything none of the above covers. Ask; don't fill the gap yourself |

The owner's own edits outrank your draft. When they hand back a revised version, that becomes the new base — diff it, adopt their wording, and re-verify only the numbers they changed or added.

## Workflow

**1. Locate sources.** Check the local downloads/documents/desktop folders for the latest resume and any fresh CRM export. Search the owner's document workspace for self reviews and the wins log. Ask which resume is current if more than one looks recent.

**2. Get a usable export.** The CRM report must include **all stages** plus **region, segment, deal type, and an ARR/amount currency field**. A won-only export cannot produce a win rate; a currency-less one cannot produce a revenue ranking. If columns are missing, say exactly which and ask for a re-export rather than working around it. See `VERIFY.md` for why each column matters.

**3. Verify before writing.** Read `VERIFY.md` and run the audit. Every number that reaches a bullet gets recomputed from source first. This is not optional — recent passes each caught a real error.

**4. Write.** Read `WRITING.md`. Situation–behavior–result structure, descending bullet length within each role, one page.

**5. Build outputs.** `build_docx.py` for Word. HTML upload for Google Docs. Notion via MCP or CLI. See "Outputs" below.

**6. File and log.** Put the deliverable in `<your-docs-db>` and log the task in `<your-tasks-db>`, marked Done when finished.

## Outputs

**Word (.docx)** — run `build_docx.py`. Edit the content block at the top; it writes a one-page resume using the standard library's `zipfile` plus raw OOXML. Convert it back to text afterward to confirm the content landed.

**Google Docs** — upload HTML through the Drive create-file tool with `contentMimeType: text/html`; Google converts it to a native Doc. Use borderless two-cell tables for company-left / location-right. Read the file back to confirm the text landed.

**Notion**

- Via the Notion MCP connection, into the documents database (`<your-docs-db>`)
- Via a Notion CLI, into the same database: creating a page from Markdown works but is **slow — allow a 5+ minute timeout** — and the title comes from the H1, so patch the title property afterward
- Always confirm which workspace you are authenticated to before writing. Default MCP connections can point at a demo workspace rather than a real one

**PDF** — the owner exports these themselves. Don't generate one; ask.

## Hard constraints

- **One page.** Adding content means cutting content. Say what you cut.
- **Page-count verification may be unavailable.** If there is no Word/LibreOffice/pandoc on the machine, you cannot confirm the render. State that plainly and give a ranked cut-list in case it spills.
- **Never invent an outcome.** Missing result → a literal `[ADD RESULT]` marker, and flag it in the response.
- **Every claim traceable.** Keep a change log listing what was added, cut, and corrected, and what you deliberately left off.
