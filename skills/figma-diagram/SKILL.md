---
name: figma-diagram
skill: figma-diagram
description: Create editable FigJam diagrams through a Figma MCP connector — flowcharts, architecture, sequence, ERD, state, and gantt — and keep matching Mermaid source in docs and READMEs.
category:
  - Design
  - Documentation
trigger: Agent
notes: >-
  Wraps a Figma MCP connector's diagram-generation tool and the diagram skill
  resources that connector serves. Output lands in FigJam; pair it with the same
  Mermaid embedded in documentation so canvas and text stay in sync.
setup: required
---

## 🚀 First run (setup)

Treat this as a first run when `setup:` above still reads `required`, any `<placeholder>`
below is unfilled, or the user has never invoked this skill. Run the setup conversation
before generating a diagram.

1. Explain the skill in two or three sentences: it turns a verified system, workflow,
   schedule, or data model into an editable FigJam diagram by calling a Figma MCP
   connector's diagram-generation tool, and it can emit the same Mermaid source for
   embedding in a README or doc. It runs when the user asks to diagram, draw an
   architecture, make a flowchart, or visualize a workflow or system. It produces a FigJam
   board URL plus the Mermaid source used to build it.
2. Collect the prerequisites from the user — names and links only, never credential values:
   - `<your-figma-connection>` — the Figma MCP connector or integration, by name, and
     confirmation that its diagram-generation, identity, screenshot, and skill-resource
     tools are reachable.
   - `<your-figma-plan-key>` — the plan or team key the diagram file should be created in.
     Confirm the seat on that plan can create files; a view-only seat cannot.
   - `<your-docs-target>` — where matching Mermaid should be embedded (repository READMEs,
     internal docs, or neither), and whether board URLs may be linked there.
   - `<your-render-check>` — the local command available for converting a downloaded SVG to
     an image so the render can be inspected, or confirmation that the connector's
     screenshot tool should be used instead.
3. Walk through the placeholders one at a time, restate each mapping back for confirmation,
   and have the user save the filled values into their own copy of this skill.
4. Until setup is complete the skill cannot create diagram files; it can only draft Mermaid
   source for review.
5. When every placeholder is filled and confirmed, set `setup: complete` in the frontmatter
   so later runs go straight to the workflow.

## 📖 Purpose

Create editable FigJam diagrams from verified system, workflow, schedule, or data-model
information, then keep matching Mermaid source in related documentation when relevant.

## 🧩 Prerequisites

- The Figma MCP connector `<your-figma-connection>` must expose its diagram-generation,
  identity, screenshot, and skill-resource tools. If the tools are deferred in your client,
  load them in a single tool-search call rather than one at a time.
- Run the connector's identity check once per session if a tool returns an error. Confirm
  which plan the current seat can create files in, and always pass `<your-figma-plan-key>`.
  Do not ask the user which plan to use once it is recorded here.

## 🔧 Procedure

1. **Load the connector's own guidance first. This is mandatory.** Before every
   diagram-generation call, read the connector's diagram skill document, then the
   type-specific reference for the diagram type you chose. Those documents are the source
   of truth for Mermaid constraints. This skill adds only the workflow around them.
2. **Pick the diagram type.**
   - Flowchart: processes, pipelines, sync workflows, and decision trees.
   - Architecture: request-serving systems such as client to gateway to services to
     datastores. Its lanes are a strict DAG, so sync and data pipelines usually fit a plain
     flowchart better.
   - Also supported: sequence, ERD, state, and gantt.
   - Unsupported: pie, mindmap, venn, class, timeline, quadrant, and C4. Tell the user and
     do not call the tool.
3. **Gather ground truth before drawing.** Read the actual code, repository README, memory
   files, or docs that the diagram describes. Never invent nodes or edges to complete the
   picture. A visible gap is better than invented information.
4. **Write the Mermaid.**
   - Do not use emojis.
   - Do not use `\n` or HTML in labels.
   - Use camelCase node IDs. Do not use underscores because they break edge routing.
   - Quote labels that contain special characters.
   - Never use `end`, `graph`, or `subgraph` as IDs.
   - Give every subgraph a light fill with `style` so lanes are clear on FigJam's white
     canvas.
   - Use color only to encode meaning.
5. **Call the diagram-generation tool.** Pass the diagram name, the Mermaid syntax,
   `<your-figma-plan-key>`, and the user intent. For an architecture diagram, also pass the
   architecture layout value from the architecture reference. Do not create an empty file
   first; the tool creates its own file.
6. **Verify the render.** The response's image URL is an SVG even when its URL has no
   extension. Download it to a scratch directory, convert it to an image with
   `<your-render-check>`, and read the result. Check that labels are legible, lanes and
   tints are present, and edges do not overlap. The thumbnail is a square crop of a wide
   board, so judge only what is visible, or use the connector's screenshot tool with the
   board URL and a node ID to inspect the full canvas.
7. **Iterate in the same file.** Calls without a file key create new draft files. Extract
   the key from the returned board URL and pass it on every retry. Stop after two
   unsatisfactory attempts and ask what is wrong instead of spending more calls.
8. **Deliver.** Give the user the board URL. If the diagram documents a repository or
   document, embed the Mermaid source there too so the picture does not drift from the text.

## 📚 Embed the same diagram in documentation

- GitHub READMEs and many doc tools render `mermaid` fences natively. Use only classic
  shorthand shapes: `[text]`, `[(db)]`, `[[subroutine]]`, `{{hex}}`, `{diamond}`, and
  `[/lean/]`. Do not use `@{shape: ...}` v11 syntax because it has weaker compatibility.
- Keep the FigJam board and the embedded Mermaid from one source. Write the Mermaid once and
  paste it into both locations.
- Link the FigJam board near the embedded diagram only in private documentation. Do not put
  personal or draft Figma URLs in public repositories.
- If your client renders Mermaid natively in generated artifacts, use that path instead of
  this skill; inline SVG is better when full visual control is required.

## ⚠️ Known limits

- The diagram-generation tool creates FigJam board output, not design files.
- Tool-based post-generation editing is limited. It cannot change fonts or move individual
  shapes. Regenerate for content changes and edit in Figma for cosmetic changes.
- Sequence-diagram `Note` lines and gantt `classDef` styling are silently dropped. Use the
  connector's hybrid FigJam-editing workflow when annotations or gantt colors are required.
- Thumbnail URLs expire after roughly a week. The board URL is durable.
