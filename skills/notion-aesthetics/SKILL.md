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
  on workspace-specific custom emoji behavior.
setup: incomplete
---

## 🚀 First run (setup)

Detect a first run when this file has no `setup: complete` marker, a required placeholder is still unfilled, or the user has never invoked this skill. This skill applies consistent Notion page structure, typography, spacing, and readability conventions. It triggers when a user creates, restructures, or restyles a Notion page and produces a native Notion layout that keeps the source content and evidence intact.

Before using it, the user must supply:

- The destination Notion workspace where pages will be edited.
- The workspace's available custom emoji list, including the preferred divider asset if one exists.
- The user's preferred page icon and section-divider motif, if they differ from the defaults in this skill.
- Permission to edit the target pages and inspect their saved structure.

Walk through the prerequisites one at a time. For each item, ask the user to identify the destination or preference, repeat the mapping back to them for confirmation, and have them save the confirmed values into their own copy of this skill. The skill cannot apply verified custom-emoji dividers or confirm saved toggle nesting until the destination workspace and its emoji assets are available. After the mappings are saved and confirmed, change the frontmatter marker to `setup: complete`; later runs can skip this section.

## Purpose

Apply these preferences when creating or restyling a native Notion page. Keep the content, facts, calculations, evidence, hyperlinks, comments, and meaningful blocks intact unless the user also requested rewriting.

## Heading rules

- Start every H1 with a relevant emoji, followed by a space and the title.
- Use H1 for major sections and H2/H3 for subsections. Do not promote every label to H1.
- Make every H1 a toggle heading so the page scans as a collapsible outline. In Notion-flavored Markdown, use a form such as `# 📌 Title {toggle="true"}` and place that section's content beneath it according to the destination's nesting rules.
- Give the page itself a relevant icon. If the page title is being edited as part of the design, prefix it with a relevant emoji as well.

## Section dividers

- Between consecutive H1 sections, insert a divider selected from the destination workspace's custom emoji list.
- Prefer a verified divider asset when one exists; otherwise choose a restrained custom emoji motif on its own line and use one consistent style throughout the page.
- Do not substitute a typed line of dashes, a Unicode ornament, or an invented `:emoji_name:` string for a custom emoji.
- If Markdown saves an emoji name as literal colon text, replace that divider paragraph with a rich-text custom-emoji mention using the verified asset identifier. Read the saved block back and confirm that it renders as a native emoji rather than literal text.
- Custom emojis belong to a workspace. Resolve the asset again in each destination workspace; never reuse an identifier from another workspace.
- If the custom emoji list cannot be read or no suitable asset can be resolved, report that limitation instead of claiming the rule was applied.

## Page composition

- Use a calm native Notion layout with a clear reading order and generous separation between major sections.
- Use restrained callouts for the main takeaway, context, and material caveats. Prefer neutral surfaces and one consistent accent color.
- Keep important qualifications next to the numbers or claims they qualify.
- Put long methodology, source notes, and secondary detail in labeled toggles when that improves scanning.
- Give tables clear headers and sensible widths. Keep comparison tables together; use columns only for short parallel content, not dense paragraphs or wide tables.
- Preserve facts, calculations, source links, existing comments, and meaningful blocks during a visual-only edit. Avoid full replacement when it could discard comments or unsupported content.

## Verification

Read the saved page and inspect it in Notion. Check the title and H1 emoji prefixes, native custom-emoji dividers between H1 sections, table readability, callouts, and toggle nesting. Confirm that no facts, comments, or source links were lost.

## Extending this skill

Add new preferences to the relevant section in this skill's copy. Keep explicit user requirements separate from optional examples, and preserve the first-run setup marker and workspace-specific mappings.
