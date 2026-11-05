---
name: Notion Aesthetics
skill: notion-aesthetics
description: >-
  Apply consistent, readable Notion layouts when creating, restructuring, or
  restyling pages and documents while preserving their content and evidence.
category:
  - Design
  - Notion
proficiency: Advanced
trigger: Manual
notes: >-
  Public de-identified playbook. Complete the first-run setup before relying
  on native divider-block behavior.
setup: incomplete
---

## 🚀 First run (setup)

Detect a first run when this file has no `setup: complete` marker, a required placeholder is still unfilled, or the user has never invoked this skill. This skill applies consistent Notion page structure, typography, spacing, and readability conventions when creating or restyling a Notion page, and produces a native layout that keeps the source content and evidence intact.

Before using it, the user must supply:

- The destination Notion workspace where pages will be edited.
- Permission to edit the target pages and inspect their saved structure.
- The preferred page icon and any page-specific style preferences, if they differ from the defaults in this skill.
- Confirmation that the destination supports native divider blocks and the Notion-flavored Markdown or API path used to create them.

Walk through the prerequisites one at a time. For each item, ask the user to identify the destination or preference, repeat the mapping back to them for confirmation, and have them save the confirmed values into their own copy of this skill. The skill cannot confirm saved native divider blocks or toggle nesting until the destination workspace and edit/readback access are available. After the mappings are saved and confirmed, change the frontmatter marker to `setup: complete`; later runs can skip this section.

## Purpose

Apply these preferences when creating, restructuring, or restyling a native Notion page or document. Keep the content, facts, calculations, evidence, hyperlinks, comments, and meaningful blocks intact unless the user also requested rewriting.

## Heading rules

- Start every H1 with a relevant emoji, followed by a space and the title.
- Use H1 for major sections and H2/H3 for subsections. Do not promote every label to H1.
- Make every H1 a toggle heading so the page scans as a collapsible outline. In Notion-flavored Markdown, use a form such as `# 📌 Title {toggle="true"}` and place that section's content beneath it according to the destination's nesting rules.
- Give the page itself a relevant icon. If the page title is being edited as part of the design, prefix the title with a relevant emoji as well.

## Section dividers

- Between consecutive H1 sections, insert a native divider block. In Notion-flavored Markdown, use `---`; through an API, use a divider block such as `{"type":"divider","divider":{}}`.
- Do not use custom emoji, visible typed dash lines, or Unicode ornaments as separators. The Markdown `---` syntax is the representation of the native divider block, not a text ornament.
- Read the saved block back and confirm that it is a native divider rather than literal text or an emoji paragraph.

## Page composition

- Use a calm native Notion layout with a clear reading order and generous separation between major sections.
- Use restrained callouts for the main takeaway, context, and material caveats. Prefer neutral surfaces and one consistent accent color.
- Keep important qualifications next to the numbers or claims they qualify.
- Put long methodology, source notes, and secondary detail in labeled toggles when that improves scanning.
- Give tables clear headers and sensible widths. Keep comparison tables together; use columns only for short parallel content, not dense paragraphs or wide tables.
- Preserve facts, calculations, source links, existing comments, and meaningful blocks during a visual-only edit. Avoid full replacement when it could discard comments or unsupported content.

## Verification

Read the saved page and inspect it in Notion. Check the title and H1 emoji prefixes, native divider blocks between H1 sections, table readability, callouts, and toggle nesting. Confirm that no facts, comments, or source links were lost.

## Extending this skill

Add new preferences to the relevant section in this skill's copy. Keep explicit user requirements separate from optional examples, and preserve the first-run setup marker and workspace-specific mappings.
