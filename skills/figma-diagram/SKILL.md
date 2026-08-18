---
name: figma-diagram
skill: figma-diagram
description: Create editable FigJam diagrams from verified current or proposed evidence using one semantic model, canonical shape and edge grammar, the correct diagram mode, and matching Mermaid source when useful.
category:
  - Design
  - Documentation
trigger: Agent
notes: >-
  Wraps a Figma MCP connector's diagram-generation tool and the diagram skill
  resources that connector serves. Adds a shared semantic model, a mode router,
  canonical shape and edge grammar, evidence rules, workflow recipes, and
  semantic QA on top of it.
setup: required
---

## 🚀 First run (setup)

Treat this as a first run when `setup:` above still reads `required`, any `<placeholder>`
below is unfilled, or the user has never invoked this skill. Run the setup conversation
before generating a diagram.

1. Explain the skill in two or three sentences: it normalizes verified evidence about a
   system, workflow, or data model into one semantic model, then renders it as an editable
   FigJam diagram through a Figma MCP connector, optionally emitting the same Mermaid source
   for docs. It runs when the user asks to diagram, draw an architecture, map a workflow,
   compare current and future state, or visualize a system. It produces a FigJam board URL,
   the Mermaid source, and a short list of assumptions.
2. Collect the prerequisites from the user — names and links only, never credential values:
   - `<your-figma-connection>` — the Figma MCP connector or integration, by name, and
     confirmation that its diagram-generation, identity, screenshot, and skill-resource
     tools are reachable.
   - `<your-figma-plan-key>` — the plan or team key new diagram files should be created in.
     Confirm the seat on that plan can create files; a view-only seat cannot.
   - `<your-docs-target>` — where matching Mermaid should be embedded (repository READMEs,
     internal docs, or neither), and whether board URLs may be linked there.
   - `<your-render-check>` — the local command available for converting a downloaded SVG to
     an image so the render can be inspected, or confirmation that the connector's
     screenshot tool should be used instead.
   - `<your-diagram-guide>` — any house shape-grammar guide, template library, or companion
     diagram-building agent that should override the defaults in this file.
   - `<your-evidence-sources>` — which repositories, docs, or databases count as ground
     truth for current state, and who confirms proposed state.
3. Walk through the placeholders one at a time, restate each mapping back for confirmation,
   and have the user save the filled values into their own copy of this skill.
4. Until setup is complete the skill cannot create diagram files; it can only draft the
   semantic model and Mermaid source for review.
5. When every placeholder is filled and confirmed, set `setup: complete` in the frontmatter
   so later runs go straight to the workflow.

## 📖 Purpose

Create editable FigJam diagrams from verified system, workflow, schedule, or data-model
evidence, then keep matching Mermaid source in related documentation when relevant.

## 🧠 Shared semantic model

Before writing Mermaid or choosing a visual style, normalize the source evidence into one
model. The model is the source of truth for every renderer and style layer.

| Field | Required content |
| --- | --- |
| Mode | Data architecture, workflow architecture, system map, or before/after |
| Thesis | One sentence stating what the diagram must make clear |
| Phases | Optional ordered groups for workflow steps |
| Nodes | ID, label, type, owner, state, and evidence status |
| Edges | From, to, kind, trigger, and short label |
| Assumptions | Every material gap or inference |

Node types: `database`, `tool`, `agent`, `process`, `subprocess`, `manualAction`,
`document`, and `decision`.

Node states: `current` or `proposed`. Evidence status: `verified`, `inferred`, or
`proposed`.

Evidence rules:

- Current-state diagrams contain only verified current elements.
- Proposed elements must trace to an explicit requirement, stakeholder statement, or agreed
  recommendation.
- Use inferred elements only when needed to make the model coherent. Label them and list the
  assumption.
- Never invent a node or edge to make a layout look complete.
- Ask one short clarification only when the ambiguity would materially change the
  architecture.

## 🧭 Mode router

| Mode | Use when | Primary structure |
| --- | --- | --- |
| Data architecture | The story is how data is created, stored, related, transformed, or consumed | Data stores, tools, processes, documents, and decisions |
| Workflow architecture | The story is sequence, ownership, handoffs, branches, or approvals | Ordered step boxes inside phase groups |
| System map | The story is which humans, AI components, platform surfaces, and external tools interact | Lanes or layers by system boundary |
| Before/after | The story is a verified current state compared with a discussed future state | Two coordinated views using stable node IDs |

If data structure and workflow sequence are both material, make two coordinated diagrams. Do
not force both stories into one crowded picture.

## 🔣 Canonical shape and edge grammar

| Meaning | Canonical visual |
| --- | --- |
| Database or data source | Cylinder |
| Tool, agent, or automatic process | Rectangle |
| Subprocess | Predefined-process shape |
| Human input or manual action | Manual-input shape |
| Page, document, or produced artifact | Document shape |
| Decision or human review gate | Diamond |
| Phase or platform-owned zone | Labeled background container |
| Human, agent, or system owner | Small corner icon or badge |

| Edge meaning | Canonical line |
| --- | --- |
| Database relationship | Dotted line; add direction only when direction is known |
| Forward sequence or data flow | Solid arrow |
| Trigger | Solid arrow with a short trigger label |
| Feedback, retry, or return path | Dashed arrow with a label |
| Branch | Solid outgoing arrows with outcome labels |

A style layer may change color, type, or stroke treatment. It must not change node or edge
meaning. If a renderer cannot produce a canonical shape, add a visible type label or icon
and a legend instead of silently collapsing types.

## 🧱 Workflow composition rules

- Read left to right from trigger to output.
- Use one short verb phrase per step box.
- Group steps into phases such as Intake, Triage, Plan, Build, Review, and Ship.
- Use color by phase or by owner, but not both.
- Use branching when the next action changes by outcome.
- Use review diamonds only when a human decision controls progress.
- Put the owner icon on each step when human, agent, and system handoffs matter.
- Branching recipe: shared intake, labeled decision, distinct outcome paths, then
  convergence.
- Full-lifecycle recipe: ordered phases with human review gates between major handoffs.

## 🧩 Prerequisites

- The Figma MCP connector `<your-figma-connection>` must expose its diagram-generation,
  identity, screenshot, and skill-resource tools. If the tools are deferred in your client,
  load them in a single tool-search call rather than one at a time.
- Run the connector's identity check once per session if a tool returns an error. Confirm
  which plan the current seat can create files in, and always pass `<your-figma-plan-key>`.
  Do not ask the user which plan to use once it is recorded here.
- If `<your-diagram-guide>` exists, read it before drawing. It overrides the shape and phase
  defaults in this file; the semantic model and evidence rules still apply.

## 🔧 Procedure

1. **Load the connector's own guidance first. This is mandatory.** Before every
   diagram-generation call, read the connector's diagram skill document, then the
   type-specific reference for the diagram type you chose. Those documents are the source
   of truth for Mermaid constraints. This skill adds only the workflow around them.
2. **Route the mode and write the thesis.** Use the mode router, then state in one sentence
   what the diagram must make clear.
3. **Gather ground truth before drawing.** Read the actual code, README, or docs listed in
   `<your-evidence-sources>`. Never invent nodes or edges to complete the picture. A visible
   gap is better than invented information.
4. **Pick the diagram type.**
   - Flowchart: processes, pipelines, sync workflows, and decision trees.
   - Architecture: request-serving systems such as client to gateway to services to
     datastores. Its lanes are a strict DAG, so sync and data pipelines usually fit a plain
     flowchart better.
   - Also supported: sequence, ERD, state, and gantt.
   - Unsupported: pie, mindmap, venn, class, timeline, quadrant, and C4. Tell the user and
     do not call the tool.
5. **Write the Mermaid.**
   - Do not use emojis.
   - Do not use `\n` or HTML in labels.
   - Use camelCase node IDs. Do not use underscores because they break edge routing.
   - Quote labels that contain special characters.
   - Never use `end`, `graph`, or `subgraph` as IDs.
   - Give every subgraph a light fill with `style` so lanes are clear on FigJam's white
     canvas.
   - Use color only to encode meaning.
6. **Call the diagram-generation tool.** Pass the diagram name, the Mermaid syntax,
   `<your-figma-plan-key>`, and the user intent. For an architecture diagram, also pass the
   architecture layout value from the architecture reference. Do not create an empty file
   first; the tool creates its own file.
7. **Verify the render.** The response's image URL is an SVG even when its URL has no
   extension. Download it to a scratch directory, convert it to an image with
   `<your-render-check>`, and read the result. Check that labels are legible, lanes and
   tints are present, and edges do not overlap. The thumbnail is a square crop of a wide
   board, so judge only what is visible, or use the connector's screenshot tool with the
   board URL and a node ID to inspect the full canvas.
8. **Iterate in the same file.** Calls without a file key create new draft files. Extract
   the key from the returned board URL and pass it on every retry. Stop after two
   unsatisfactory attempts and ask what is wrong instead of spending more calls.
9. **Deliver.** Give the user the board URL, the Mermaid source, and the assumption list. If
   the diagram documents a repository or doc, embed the Mermaid there too so the picture
   does not drift from the text.

## ✅ Semantic QA

1. Every node has a type, owner, state, and evidence status.
2. Every edge has a clear meaning and direction. Every branch has an outcome label.
3. No orphan nodes, invented links, overlapping icons, or labels sitting on nodes or lines.
4. Keep each phase to four primary steps. Split dense phases or move detail into notes.
5. Before and after views use stable node IDs and include a concise delta summary.
6. The final render matches the source evidence and the one-sentence thesis.

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

## 🤝 Companion references

Record the reusable sources your team already owns in `<your-diagram-guide>` rather than
duplicating them here. Useful companions are a house shape-grammar guide, a diagram-building
agent that drafts and verifies Mermaid before creating the FigJam file, a before/after
comparison renderer, and a discovery questionnaire that captures business context, workflow,
systems and data, governance, and future-state success criteria. Treat those documents as
source material: read them, do not overwrite them.

## ⚠️ Known limits

- The diagram-generation tool creates FigJam board output, not design files.
- Tool-based post-generation editing is limited. It cannot change fonts or move individual
  shapes. Regenerate for content changes and edit in Figma for cosmetic changes.
- Sequence-diagram `Note` lines and gantt `classDef` styling are silently dropped. Use the
  connector's hybrid FigJam-editing workflow when annotations or gantt colors are required.
- Thumbnail URLs expire after roughly a week. The board URL is durable.
