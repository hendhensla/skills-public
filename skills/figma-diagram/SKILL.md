---
name: figma-diagram
skill: figma-diagram
description: >-
  Create editable diagrams in FigJam through a Figma MCP connector — flowcharts,
  pipelines, architecture, sequence, ERD, state, and gantt — embed matching
  Mermaid in docs and READMEs, and mark nodes with a curated icon set.
category:
  - Design
  - Documentation
trigger: Agent
notes: >-
  Wraps a Figma MCP connector's diagram-generation tool and the diagram skill
  resources that connector serves. Node icons come from a curated local icon
  library with a filename manifest; a catalog page acts as the visual browser.
notion_row: 'https://app.notion.com/p/figma-diagram-3c098c2112688114a74ad0258013c805'
notion_doc: 'https://app.notion.com/p/figma-diagram-3c098c211268812a95f5db86c1f29726'
---

## 🚀 First run (setup)

Treat this as a first run when `setup:` above still reads `required`, any `<placeholder>`
below is unfilled, or the user has never invoked this skill. Run the setup conversation
before generating a diagram.

1. Explain the skill in two or three sentences: it turns a system, workflow, schedule, or
   data model into an editable FigJam diagram by calling a Figma MCP connector's
   diagram-generation tool, and it can emit the same Mermaid source for a README or doc plus
   optional node icons from a curated library. It runs when the user asks to diagram, draw an
   architecture, make a flowchart, or visualize a workflow or system. It produces a FigJam
   board URL and the Mermaid source.
2. Collect the prerequisites from the user — names and paths only, never credential values:
   - `<your-figma-connection>` — the Figma MCP connector or integration, by name, and
     confirmation that its diagram-generation, identity, screenshot, asset-upload, and
     skill-resource tools are reachable.
   - `<your-figma-plan-key>` — the plan or team key new diagram files should be created in.
     Confirm the seat on that plan can create files; a view-only seat cannot.
   - `<your-icon-library-path>` — the local directory holding the icon PNGs, and the dark
     variant directory if one exists.
   - `<your-icon-manifest>` — the file listing exact icon filename stems, usually
     `references/icons.md` inside this skill.
   - `<your-icon-catalog>` — an optional page or board that renders the icons visually for
     browsing.
   - `<your-docs-target>` — where matching Mermaid should be embedded (repository READMEs,
     internal docs, or neither), and whether board URLs may be linked there.
   - `<your-render-check>` — the local command available for converting a downloaded SVG to
     an image so the render can be inspected, or confirmation that the connector's
     screenshot tool should be used instead.
3. Walk through the placeholders one at a time, restate each mapping back for confirmation,
   and have the user save the filled values into their own copy of this skill.
4. Until setup is complete the skill cannot create diagram files or place icons; it can only
   draft Mermaid source for review.
5. When every placeholder is filled and confirmed, set `setup: complete` in the frontmatter
   so later runs go straight to the workflow.

## 📖 Purpose

Turn a system, workflow, schedule, or data model into an **editable FigJam diagram** using
the Figma MCP connector's diagram-generation tool, and — when the diagram documents a
repository — embed the same Mermaid source in the README so the host renders it too.

## 🧩 Prerequisites

- The Figma MCP connector `<your-figma-connection>` must expose its diagram-generation,
  identity, screenshot, asset-upload, and skill-resource tools. If the tools are deferred in
  your client, load them in a single tool-search call rather than one at a time.
- Run the connector's identity check once per session if a tool errors. Confirm which plan
  the current seat can create files in, and always pass `<your-figma-plan-key>`. A view-only
  seat cannot create files. Do not ask the user which plan to use once it is recorded here.

## 🔧 Procedure

1. **Load the connector's own guidance first — mandatory.** Before every diagram-generation
   call, read the connector's diagram skill document, then the type-specific reference it
   routes to. Those documents are the source of truth for Mermaid constraints; this skill
   only adds the workflow around them.
2. **Pick the diagram type.** Flowchart for processes, pipelines, sync workflows, and
   decision trees. Architecture for request-serving systems (client → gateway → services →
   datastores); its lanes are a strict DAG, so sync and data pipelines usually fit a plain
   flowchart better. Also supported: sequence, ERD, state, and gantt. Unsupported — tell the
   user and do not call the tool: pie, mindmap, venn, class, timeline, quadrant, and C4.
3. **Gather ground truth before drawing.** Read the actual code, README, memory files, or
   docs the diagram describes. Never invent nodes or edges to round out a picture; a visible
   gap beats a hallucination.
4. **Write the Mermaid.** The non-negotiables that bite most often: no emojis; no `\n` or
   HTML in labels; camelCase node IDs (no underscores — they break edge routing); quote any
   label with special characters; never use `end`, `graph`, or `subgraph` as IDs; tint every
   subgraph with a light fill via `style` so lanes read on FigJam's white canvas; use color
   only to encode meaning.
5. **Call the diagram-generation tool.** Pass the diagram name, the Mermaid syntax,
   `<your-figma-plan-key>`, and the user intent. For the architecture type only, also pass
   the architecture layout value from the architecture reference. Do not create an empty file
   first; the tool makes its own file.
6. **Verify the render.** The response's image URL is an **SVG** despite having no extension.
   Download it to a scratch directory, convert it with `<your-render-check>`, and read the
   resulting image. Check that labels are legible, lanes and tints are present, and edges do
   not overlap. The thumbnail is a square crop of a wide board, so judge what is visible, or
   use the connector's screenshot tool with the board URL and a node ID for the full canvas.
7. **Iterate in the same file.** Calls without a file key create new draft files. Extract the
   key from the returned board URL and pass it on every retry. Stop after two unsatisfying
   attempts and ask what is wrong instead of burning calls.
8. **Add icons if the diagram warrants them.** See the icon section below — the curated icon
   library, not emoji.
9. **Deliver.** Give the user the board URL. If the diagram documents a repository or doc,
   embed the Mermaid source there too so the picture cannot rot separately from the text.

## 📚 Embedding the same diagram in docs

- GitHub READMEs and many doc tools render `mermaid` fences natively. Use only classic
  shorthand shapes: `[text]`, `[(db)]`, `[[subroutine]]`, `{{hex}}`, `{diamond}`, and
  `[/lean/]`. Skip `@{shape: ...}` v11 syntax for compatibility.
- Keep the FigJam board and the embedded Mermaid **from the same source**: write the Mermaid
  once and paste it into both. Link the board near the embedded diagram in private docs only;
  do not leak personal or draft Figma URLs into public repositories.
- If your client renders Mermaid natively in generated artifacts, use that path instead of
  this skill; inline SVG is better when full visual control is required.

## 🎨 Icon set — use the curated library, not emoji or clip art

Diagrams that need visual node markers use the curated icon library, never emoji (Mermaid
rejects them anyway) and never generic icon packs.

- **Source of truth on disk** — the canonical copy, always start here:
  - Light: `<your-icon-library-path>/Icons/<stem>.png`
  - Dark: `<your-icon-library-path>/Dark_mode_icons/<stem>_darkmode.png`
  - Transparent square PNGs. Not every light icon has a dark twin, so check before promising
    a dark variant and fall back to the light one on a light board.
- **Manifest** — `<your-icon-manifest>` lists every exact filename stem, grouped by letter.
  Read it to pick names; do not guess stems. Casing and separators are inconsistent across
  the set (for example `arrow-down-line`, `Battery_full`, `Chess_Knight_2`), so copy each
  stem verbatim from the manifest.
- **Visual browser** — `<your-icon-catalog>` renders the icons in a captioned grid inside
  per-letter toggles. Use it when the user needs to *see* the options; use the manifest when
  you only need names.

### Choosing icons

**Wordless glyphs only.** Prefer icons with no words or lettering: the node label already
carries the text, so an icon with its own type fights it and breaks when the diagram is
resized or translated. Icons that contain visible lettering — alphabet or character glyphs,
struck letters, formula marks, or a dated calendar face — are off-limits as node icons. Pure
symbols such as a percent sign, asterisk, question mark, or exclamation bubble are fine
because they read as glyphs, not words. When unsure whether a stem has type in it, open the
PNG and look before using it.

Map the icon to what the node *is*, and stay consistent within one diagram: the same concept
gets the same icon everywhere. Reliable stems for common diagram nodes:

| Node kind | Stems |
| --- | --- |
| Datastore / DB | `database`, `folder`, `document-stacked`, `archive` |
| Service / compute | `gear`, `gears-two`, `computer-chip`, `code` |
| User / actor | `user`, `friends`, `Groups`, `chat-user` |
| Scheduler / cron | `clock`, `alarm`, `calendar-day`, `stopwatch`, `repeat` |
| Decision / gate | `branch`, `checklist`, `bullseye`, `judicial-scales` |
| External / network | `globe`, `cloud`, `link`, `network`, `connections` |
| Alerts / failure | `alert`, `warning`, `error`, `report`, `bell-notification` |
| Docs / output | `document`, `notepad`, `document-list`, `chart`, `Comment` |
| Sync / transform | `sync`, `refresh`, `formula`, `rearrange`, `shuffle` |
| AI / generated | `sparkle`, `sparkle-pencil`, `robot`, `magic-wand` |

Verify each stem exists in `<your-icon-manifest>` before using it — the table is a starting
point, not a guarantee, and libraries change over time. Stem names also lie occasionally: a
stem named for a document may actually draw an alert mark, so confirm the drawing matches the
meaning you want before shipping it.

### Getting icons onto a FigJam board

The diagram-generation tool renders Mermaid only — **it cannot place raster images**. So:

> **Less-travelled route.** The page-embedding path below is the verified one; this FigJam
> path is assembled from the connector's documented tools. Expect to debug it on first use,
> and update this section with what actually worked.

1. Generate the diagram first (steps 1–7 above) and keep the file key.
2. Upload only the icons you need with the connector's asset-upload tool, passing the local
   PNG paths.
3. Place them with the connector's direct FigJam-editing workflow — load that workflow and
   its FigJam resource first, which is mandatory — then position one icon per node.

Keep this to the handful of icons the diagram actually uses; do not bulk-upload the library.
If the user only wants a quick picture, skip icons entirely rather than burning calls, and
ask before starting a multi-step icon pass on a diagram that did not request one.

### Getting icons into a page or doc

The reliable path is a two-step upload-then-attach against your workspace API: create a file
upload from the local PNG, then attach the returned upload ID as an image block in the same
short window.

```json
{"object":"block","type":"image","image":{
  "type":"file_upload","file_upload":{"id":"<upload-id>"},
  "caption":[{"type":"text","text":{"content":"gear"}}]}}
```

Send that inside `children` on the block-children append endpoint. Notes that cost time on
the first run:

- Batch uploads with their appends. An upload ID that is not attached inside its short
  validity window expires and must be recreated.
- Confirm the upload reached an `uploaded` state before using its ID.
- Command-line clients can hang waiting on stdin when a request has no body and is not on a
  TTY. Redirect from `/dev/null` in scripts.
- Block nesting is limited to two levels per request, which is exactly
  `column_list → column → image`, so a three-column icon grid lands in one call. Keep a
  request near 100 blocks total; roughly three bands of 24 images is safe.
- Attached images become workspace-hosted files behind short-lived **signed** URLs. Storage
  is permanent, the link is temporary: never persist an image URL, re-fetch the block.
- Uploads take several seconds each. Parallelize at about six workers to stay under the API
  rate limit.
- Expect scattered `502 Bad Gateway` and `409 conflict` responses on bulk uploads. They are
  transient: retry the same file three or four times with backoff instead of treating the
  first failure as fatal or dropping the icon.

## ⚠️ Known limits

- Diagram-generation output is a FigJam board, not a design file. Post-generation edits by
  tool are limited: no font changes and no moving individual shapes. Regenerate for content
  changes and open Figma for cosmetic ones.
- Sequence-diagram `Note` lines and gantt `classDef` styling are silently stripped. Use the
  connector's hybrid FigJam-editing workflow when annotations or gantt colors are required.
- Thumbnail URLs expire after roughly a week; the board URL is the durable link.

