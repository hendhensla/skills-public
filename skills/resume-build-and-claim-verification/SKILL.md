---
name: resume-build-and-claim-verification
skill: Resume Build & Claim Verification
description: >-
  Build or update a resume from primary sources — CRM opportunity exports,
  performance reviews, and a wins log — with every quantitative claim verified
  against source data before it ships. Use when asked to "update my resume",
  "add X to my resume", "make a resume", "turn this into resume bullets", or
  to produce a resume in Word, Google Docs, or Notion. Also use when asked to
  sanity-check a number already on the resume.
category:
  - Career
proficiency: Advanced
trigger: Manual
notes: >-
  The verification pass is the important part: it catches stale metrics,
  unsupported record claims, mixed denominators, and period labels that do not
  match the underlying data. The .docx builder produces a one-page file using
  only the Python standard library, for machines without python-docx.
setup: incomplete
notion_row: >-
  https://app.notion.com/p/Resume-Build-Claim-Verification-3c098c21126881a78df3d0f593c57208
notion_doc: >-
  https://app.notion.com/p/Resume-Build-Claim-Verification-3c098c21126881faa87efbd7b60890ed
---

## 🚀 First run (setup)

Treat this as a first run when `setup: complete` is not recorded above, when any placeholder below is unfilled, or when the user has never invoked this skill. This skill builds or updates a one-page resume from primary sources and audits every number against its source data before delivery. It triggers manually for resume-writing or claim-checking requests and produces a verified resume plus a change log of what was added, cut, and corrected.

Prerequisites the user must supply — pointers and names only, never credential values:

- `<your-current-resume>` — the latest resume file or document. It is authoritative for prior roles, dates, titles, and degree.
- `<your-crm-export>` — the way to produce an opportunity export that includes all stages, region, segment, deal type, and an amount/ARR currency field.
- `<your-review-docs>` — the location of performance self-reviews and manager feedback.
- `<your-wins-log>` — the wins log or brag document for awards, launches, speaking, promotions, and audience reach.
- `<your-metrics-page>` — an optional pre-computed performance or ranking page; treat it as stale until re-verified.
- `<your-docs-db>` — the database or folder where the finished deliverable is filed.
- `<your-tasks-db>` — the task database where the request is logged and marked done.
- Available output tools: Python for the `.docx` builder, a Drive/Docs connection for HTML-to-Doc output, and a Notion connection or CLI for a Notion page.
- Connection or environment-variable names for those tools, never their values.

Walk the user through each placeholder one at a time. Read each mapping back and confirm it before moving to the next, then have the user save the filled values in their own copy of this skill. Until setup is complete, do not write resume bullets: without the source hierarchy and a usable CRM export, no metric can be verified. When every placeholder is filled and confirmed, record `setup: complete` in the frontmatter so later runs go straight to the workflow.

# Resume — build and verify

Four files may be present in the skill directory:

- `SKILL.md` — this workflow
- `VERIFY.md` — read before writing any number; CRM data traps and the audit protocol
- `WRITING.md` — bullet construction, length discipline, and what never goes on the page
- `build_docx.py` — a one-page `.docx` generator using the standard library

## Source hierarchy

Treat these as authoritative, in order. Never invent a fact that is not in one of them.

| Source | Authoritative for |
| --- | --- |
| Most recent resume PDF or DOCX in the user's document folders | **All prior roles.** Dates, employers, titles, degree, and client names |
| CRM opportunity export | Every deal metric — volume, win rate, ARR, ranks, segment, and deal type |
| Performance self-reviews and manager feedback | POC counts, rep counts, qualitative wins, and manager-validated strengths |
| Wins log or brag document | Awards, launches, projects shipped, speaking, promotions, and audience reach |
| Any pre-computed performance-analysis page | Ranks — but re-verify because these go stale |
| **The resume owner directly** | Anything none of the above covers. Ask; do not fill the gap yourself |

The owner's edits outrank your draft. When they return a revised version, it becomes the new base: diff it, adopt their wording, and re-verify only the numbers they changed or added.

## Workflow

**1. Locate sources.** Check the configured document folders for the latest resume and any fresh CRM export. Search the configured document workspace for self-reviews and the wins log. Ask which resume is current if more than one looks recent.

**2. Get a usable export.** The CRM report must include **all stages** plus **region, segment, deal type, and an ARR/amount currency field**. A won-only export cannot produce a win rate; a currency-less one cannot produce a revenue ranking. If columns are missing, name each missing column and ask for a re-export rather than working around it. See `VERIFY.md` for why each column matters.

**3. Verify before writing.** Read `VERIFY.md` and run the audit. Recompute every number that reaches a bullet from source data first. This is not optional: recent passes have repeatedly caught real errors.

**4. Write.** Read `WRITING.md`. Use situation–behavior–result structure, descending bullet length within each role, and a one-page target.

**5. Build outputs.** Use `build_docx.py` for Word, an HTML upload for Google Docs, or the configured Notion connection for a Notion page. See "Outputs" below.

**6. File and log.** Put the deliverable in `<your-docs-db>` and log the task in `<your-tasks-db>`, marking it Done when finished.

## Outputs

**Word (.docx)** — run `build_docx.py`. Edit the content block at the top; it writes a one-page resume using the standard library's `zipfile` plus raw OOXML. Convert the result back to text afterward to confirm that the content landed.

**Google Docs** — upload HTML through the configured Drive create-file tool with `contentMimeType: text/html`; Google converts it to a native Doc. Use borderless two-cell tables for company-left and location-right. Read the file back to confirm that the text landed.

**Notion**

- Use the configured Notion connection and place the page in `<your-docs-db>`.
- A Notion CLI can create a page from Markdown, but this may be slow; allow a 5+ minute timeout when the environment requires it. If the title comes from the first heading, patch the title property afterward.
- Confirm which workspace you are authenticated to before writing. A default connection may point to a demo workspace rather than the intended workspace.

**PDF** — the owner exports PDFs themselves. Do not generate one; ask.

## ✍️ Writing quality

Before finalizing resume prose in any format, load and apply the user's resume style guide. Preserve verified claims, numbers, and the owner's established voice. Run the style guide's second-pass audit before export. The claim-verification rules in this skill take priority.

## Hard constraints

- **One page.** Adding content means cutting content. Say what you cut.
- **Page-count verification may be unavailable.** If the environment has no Word, LibreOffice, or equivalent renderer, do not claim to have confirmed the render. State that plainly and give a ranked cut-list in case it spills.
- **Never invent an outcome.** Missing result → a literal `[ADD RESULT]` marker, and flag it in the response.
- **Every claim traceable.** Keep a change log listing what was added, cut, and corrected, and what you deliberately left off.
