---
name: Use Case Walkthrough Videos
skill: use-case-walkthrough-videos
description: >-
  Build short, honest videos that prove one product capability or connected
  workflow on a customer's own data, from scope and storyboard through UI
  fidelity, pacing, review, and delivery.
category:
  - Content
  - Sales
proficiency: Advanced
trigger: Manual
notes: >-
  Public de-identified playbook. Use real product behavior, customer-shaped
  sample data, and explicit review gates; keep demo-only configuration labeled.
setup: incomplete
---

## 🚀 First run (setup)

Detect a first run when this file has no `setup: complete` marker, a required placeholder is still unfilled, or the user has never invoked this skill. This skill turns one product claim or workflow into a short, reviewable proof video and produces a storyboard, a rendered preview, review notes, and an approved delivery file.

Before using it, the adopting agent needs:

- The product or workspace to demonstrate, plus a safe demo workspace or approved sample data that represents the audience without exposing private or customer information.
- One audience, one claim or question, the desired outcome, and the surfaces the viewer must see.
- A decision between a live-workspace walkthrough and a coded cinematic video with faithful UI replicas; if both are useful, the boundary between them.
- A capture and production path, such as approved screen-capture assets or a local video composition project, plus the render format and output location.
- A human reviewer, the review channel, the approval signal, and the destination where the final video should be delivered.
- Any connected tools, media, fonts, music, or credential names required by the chosen production path. Supply names and access paths, never credential values.

Walk through these placeholders one at a time. After each answer, repeat the mapping back to the user for confirmation, then have them save the confirmed value into their own copy of this skill. Until setup is complete, the skill cannot safely choose the production mode, prove the requested behavior, or deliver a video to the right destination. Once every mapping is confirmed and saved, change the frontmatter marker to `setup: complete`; later runs can skip this section.

## Purpose

A use-case walkthrough proves one claim by showing the product doing it on data that feels like the viewer's world. Use this for a standalone functionality demo, an RFP or questionnaire example, a POC walkthrough, or one segment inside a larger demo. Optimize for grounded proof, recognizable product UI, and a calm read—not for a feature checklist or a slogan.

## Choose the production mode

Ask: “Is this a walkthrough of a real workspace, or a story video?”

- **Live-workspace walkthrough:** use when a populated workspace exists, the viewer should see the actual product, and the video should be easy to regenerate as the workspace changes.
- **Cinematic build:** use when the story needs idealized states, choreographed camera moves, or a controlled narrative and a live workspace is unavailable or not worth building.
- **Hybrid:** a cinematic opener or closer around a live-workspace proof is valid when the transition and entry/exit states are explicit.

Read the chosen production project's instructions fully before building. Regardless of mode, script and storyboard first, then capture or build only after the review gate is satisfied.

## Intake and script gate

Collect the audience, desired outcome, single workflow or question, available product context, preferred format, and delivery constraints. Use real company-shaped context by default; use fictional data only when necessary to avoid exposure or when it is clearly labeled as illustrative.

Draft the exact narration and caption script before recording, rendering, or generating audio. Get the user's edits or explicit build authorization. Reuse an existing approval and revision instruction instead of restarting intake. Prefer human narration; do not suggest synthetic narration unless the user asks for it, and explain the tradeoff plainly.

For an RFP or questionnaire:

1. Finish the written answer first so the answer is not blocked on video.
2. Classify the question as factual text, workflow example, or a routed security, legal, pricing, or implementation item.
3. For a workflow example, make the answer's numbered steps match the video's numbered beats.
4. Until the video exists, label the answer `Video walkthrough [pending]`.
5. Keep capability claims grounded in current product behavior and mark uncertain claims for verification rather than guessing.

## Build one coherent proof

1. **Scope.** Choose the smallest set of questions or features that proves the claim. Videos are expensive; cut redundant scenes before cutting reading holds.
2. **Demo workspace.** Use one populated, internally consistent workspace. Keep people, project names, statuses, relations, icons, and dates consistent across related videos. Do not expose private or customer information.
3. **Storyboard.** Create one row per video with the claim, audience, assets, production mode, status, and reviewer. Use a lifecycle such as `Storyboard → Rendering → Review → Approved`. Get approval before production unless the user explicitly authorized the build.
4. **Capture or build.** Capture every product surface before writing coded scene work. For a coded video, use measured, faithful UI replicas rather than invented layouts.
5. **Self-review.** Run the checklist below before sharing a preview.
6. **Review loop.** Keep versions local until the reviewer selects one. Post a short note for each version on the storyboard or review record; a clean render is not approval.
7. **Deliver.** Deliver only the approved version and record its duration, source version, and beat boundaries.

## Plan each beat

For each beat, write:

| Claim | Surface and starting state | Action | Visible result or relation | Exact caption | Reading hold |
| --- | --- | --- | --- | --- | --- |

Follow these rules:

- Show one coherent feature story. If there are several parallel examples, open with an “N ways to …” explainer, then show a `k of N` chapter card before each example. Never jump silently between scenarios.
- A segment inside a larger video inherits the parent audience, format, visual system, cast, and entry and exit states. Do not add a separate opener or closing line. Export duration and beat boundaries so the parent can assemble it without cutting reading holds.
- Show how the viewer reaches each next surface: row, page mention, tab, or control. Open an artifact from its database or parent context rather than from a detached cut.
- Show setup only when it proves the claim, such as a view filter, visible property, or template scope. Do not re-explain a count the visible rows already prove.
- Mark a jump to a later completed state when work is skipped. A generated specification or task list must not look as if engineering finished instantly.
- Refer to demo people by role in written narration unless a real name is essential and approved.
- Keep captured product behavior, proposed configuration, and illustrative data separate in production notes. A demo workaround grounds a scenario; it does not prove that an integration ran or that a capability is available to the customer.

## Product and UI fidelity

Reuse approved captures. For any surface not yet captured, capture it first and compare matched-width stills before calling it done. Never invent a layout, inline chip, button, menu, cover, avatar, or connected-property treatment.

- Individual pages use real cover treatment and varied approved cover assets; views, boards, tables, calendars, hubs, and dashboards do not.
- Body people use native inline mentions. People properties use avatar-and-name chips, not plain text or underlined relation links.
- Properties appear as a labeled vertical list when that is how the product renders them; do not replace them with decorative chips.
- Human owners remain accountable for tasks and artifacts. When an agent produces work, show the agent in native activity or history without replacing the human owner.
- Measure board-card height, wrapped titles, gaps, counts, column backgrounds, and creation controls. Do not use a fixed pitch or clip content unless the product itself clips it.
- Match the control being used: buttons, menus, default badges, verification indicators, popovers, history selections, dialogs, and connected-file tokens should look and behave like the product.
- For external tools, be candid about the boundary. Approval or proof markup may stay in the external tool while a link or event updates the product; do not make the product appear to perform the other tool's specialty.
- Use the real product mark and approved agent faces or avatars. Label substitute art as illustrative.

## Camera, action, and pacing

**Window and camera**

- Use one calm framing per scene on a warm neutral stage; collapse navigation unless navigation is the story.
- Use in-and-out zoom glides over at least 1.2 seconds at roughly 1.1–1.3×. Never use an out-only curve or shrink the app into an inset and push in again.
- Preserve continuity across cuts. A scene starts where the last ended, or the last scene returns to rest before the cut. Never cut during a zoom.
- Do not zoom, pan, and scroll at the same time. Scroll to the relevant content, then stop.
- Keep body text legible at the delivery resolution. If a whole view is unreadable, render the app larger and show only the part that matters.
- Keep windows, menus, toasts, and dialogs clear of caption space. Avoid clipped titles, breadcrumbs, and column text at frame edges.

**Pacing**

- Hold 1–1.5 seconds after every state change and longer for dense UI. Hold 2–3 seconds at the end of each section.
- Keep captions up for at least 1.2 seconds plus about 0.33 seconds per word; split long captions into two beats.
- Let agent appearances, dense threads, and result states linger long enough to read. Extend holds instead of speeding up typing or routine activity.
- Target roughly 60–110 seconds unless the claim needs a different length. Cut redundant scenes before cutting pauses.

**Pointer and emphasis**

- Use a standard pointer at a consistent size. Pointer, hover, and click coordinates must agree through parent offsets and scroll.
- Size labels to their content, place them below and to the right of the target, and never cover the control or clip at the frame edge.
- Highlights must cover the target's real bounds, including wrapped relation values. Fade them in and out; do not leave a selection active through later beats.
- Make small important changes obvious: permission rejection, row state, relation fill, status change, and separate completion emphasis.

## Reusable proof sequences

Use only the sequence that fits the claim:

| Feature | Sequence |
| --- | --- |
| Team-specific views | Establish the view → show property visibility → apply the team filter while naming its scope → hold the filtered records → copy the view link → paste it into the team page → show that the filter and records persist. |
| Template defaults | Open the template menu → choose the template → show body and preset properties → set it as the view default → confirm the default indicator. |
| Permission boundaries | Establish whose view this is → show the restricted value or native rejection → make the identity switch explicit → show the other person's scope. Hiding rows alone does not prove access control. |
| Collaboration with agents | Post a mention or comment → show the native picker and request → show activity → show the actual page edit or file → show the reply and edit history. |
| Process that evolves | Show the decision → open the canonical guidelines → edit the step → show the updated instruction → show the next request using the changed task. |
| Customer evidence | Show signals and sources → route the signal to an existing request or create one → fill the signal-to-request relation → show the trend or translation step → relate the evidence to the spec or roadmap item. |
| Completion rollup | Keep the requested multi-team overview → complete tasks into distinct measured slots → animate contributions into the parent card → move the readiness number and bar together → hold the completed state → change status with separate emphasis. |
| Meetings | Show the calendar invite with its linked note → join and transcribe → show the recording state → stop → show native processing → show the summary. |
| Search and history | Show the assistant query with selected sources → show the cited answer → open the cited page → show updates or version history and resolved comments. |

## Review checklist

Inspect every version as a first-time viewer:

1. **Proof:** Is the claim visible? Are setup and result present? Are any demo-only configurations labeled? Are substitute states or persona names misleading?
2. **Product UI:** Compare every product surface at matched width against captures or source behavior. Check covers, mentions, icons, card geometry, connected properties, menus, native activity, and dialog boundaries.
3. **Animation:** Do highlights cover the target? Does hover follow the pointer? Do numbers agree with the states shown?
4. **Continuity:** Does each action explain the next surface? Are scale and identity changes clear? Do results hold long enough to read?
5. **Mechanics:** Typecheck the project; make a contact sheet for coverage; inspect full-resolution stills before, during, and after key motion; sample the caption band and camera moves; decode the full video and verify the expected frame count, duration, GIF timing, and minimum caption gap.

A clean typecheck or render proves nothing about visual fidelity or a live backend. When fixing a shared defect, recheck every occurrence. For a multi-video final cut, map clips to one record-level journey, preserve handoffs, and keep a manifest with source version and in/out times.

## Delivery and maintenance

Share versioned previews such as `preview-v1.mp4`, `preview-v2.mp4`, and inspect stills before sharing. Keep local outputs organized with the total duration and an explicit list of easy future changes. If the user asks to place the final video in a workspace, use the supported file-upload path and verify the saved media block after upload; never substitute an expiring file link for a real attached video.

After a project ships, fold reusable lessons—fidelity fixes, taste rules, and process corrections—back into this skill. Keep project names, private links, customer details, credentials, machine-specific paths, and one-off costs out of the public copy.