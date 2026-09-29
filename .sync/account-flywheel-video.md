## 🚀 First run (setup)
Detect first run when the setup marker is missing or incomplete, a required placeholder is still unfilled, or the user has never invoked this skill. This skill turns verified account context into a short captioned motion video that shows a product-to-go-to-market flywheel and ends with a three-layer workflow diagram. It triggers when an agent is asked for an account-specific motion video or overview and produces a storyboard, rendered previews, final video assets, and a handoff note.
Before running, the user must supply:
- The account and contact to portray, plus the audience and desired outcome.
- The approved sources for account research: account record, contact record, meeting notes, email summaries, and any approved transcripts.
- A working video project or a Remotion-capable project template.
- A local output directory and the commands or tools used to render and inspect media.
- Approved customer logo and brand assets, or permission to use a neutral text treatment.
- The names of any external systems that may appear as labels, plus the evidence source for each claimed integration.
- The destination for the storyboard, task log, previews, and final deliverables.
Walk through these placeholders one at a time. After each answer, repeat the mapping back to the user and have them save the filled values in their own copy of this skill. Do not collect secret values; record only the names of approved connections or environment variables when a tool requires them. The skill cannot safely research the account, validate claims, render a faithful video, or deliver files until these mappings and permissions are complete. Then record `setup: complete` in the frontmatter and skip this section on later runs.
## Purpose
Create a concise, account-grounded story of how an existing workspace can connect product work to go-to-market execution and field learning. The video should show what remains in the customer's current stack, what the workspace adds, and how feedback becomes planning input. Do not present an existing workspace as a brand-new rollout.
## Story structure
Use a seven-scene arc unless the requester approves a different structure:
1. **Hook:** workspace and customer identity lockup with the message that the product team already works in the workspace.
2. **Lifecycle:** one feature page moves through discover, define, and build, with realistic meeting notes, specification, design, issue tracking, and code-review surfaces.
3. **Launch:** a roadmap item moves to launch, a launch assistant prepares the kit, and a go-to-market handoff is visible on a real workspace surface.
4. **Field signals:** feedback from calls, tickets, messages, and deals lands in a signals table; an assistant tags each signal with a feature and theme.
5. **Learn:** the shipped item rolls up signal and customer counts, and a new discovery item is created from the evidence.
6. **Outcomes:** show four account-grounded outcomes. End each with a measurable pilot metric rather than an unsupported number.
7. **Diagram:** close with a three-layer workflow diagram and a single sentence that states the business thesis.
The narrative should show a reinforcing loop: product work becomes a launch, launch activity creates field evidence, and field evidence improves the next product decision.
## 1. Research before storyboarding
Gather approved account context in parallel:
- The account record and contact record, including current use cases, tool stack, role, activity, and initiatives.
- Recent meeting notes, call summaries, email summaries, and other approved customer evidence.
- Growth signals such as hiring, launches, acquisitions, or a major change in operating model.
- Direct statements from relevant customer stakeholders, paraphrased when necessary.
Extract:
- Who uses the workspace today and for what.
- The actual engineering, go-to-market, support, and AI tools in use.
- Stated pains such as tool fatigue, discoverability, fragmented context, or a need for governed AI.
- The business change the customer cares about.
- What should remain authoritative in an external system.
**Framing rule:** if the account already uses the workspace, frame the video as getting more value from the existing system. Name what stays in place and show how the workflow connects to it; do not imply that every existing tool is replaced.
Use generic or fictional customer names in examples unless the requester explicitly approves real names. Keep private people, customer details, identifiers, internal URLs, and confidential commercial information out of reusable assets.
## 2. Storyboard and sign-off
Write the storyboard in the user's approved documentation destination before building. Include:
- Audience and intended outcome.
- The account context and a source list that the user can access.
- The single “wow” moment.
- One section per scene with surface, action, caption, and approximate duration.
- Which tools are real, simulated, or shown only as labels.
- Open decisions such as captions versus narration, music, logo treatment, and use of customer names.
- The proposed four outcomes and the pilot metric for each.
Get explicit sign-off on the storyboard and caption script before rendering production media. Keep captions conversational and plain; avoid unsupported marketing claims.
## 3. Integrity pass
Before production, verify every feature, trigger, and integration that appears in the story. Use current product documentation, help content, release notes, or another approved authoritative source. Classify each item as **SAFE**, **CAVEAT**, or **DON'T SHOW**.
At minimum, verify:
- Which fields an issue-tracking integration actually synchronizes; do not imply unsupported progress or hierarchy sync.
- Which events can trigger an agent, such as a property change, page creation, approved message, schedule, or completed meeting note.
- Which AI connectors are available to the audience's plan and which sources have no native connector.
- The current name of any assistant or chat surface shown in the UI.
If a connector is only simulated for storytelling, show it as a plain label or tool tile on a real workspace surface. Never invent a connector settings screen. List every simulated edge in the handoff.
## 4. Build the cinematic project
Use a Remotion project with a reusable cinematic template and a separate overlay for the account story. Keep implementation details generic and configurable:
```bash
VIDEO_PROJECT=<working-project-directory>
mkdir -p "$VIDEO_PROJECT"
# Copy the approved cinematic template and account-story components here.
cd "$VIDEO_PROJECT"
npm install
npx tsc --noEmit
npx remotion render Main out/smoke.mp4 --frames=0-30
```
Use an approved local logo asset rather than embedding a secret-bearing logo service URL. Keep account-specific strings in one mapping file so the story can be adapted without hunting through components.
Use one pacing factor for the whole video. Put all story beats behind a helper such as `sec()` so timing changes remain consistent. Keep animation loops in real time; slow a scene by changing its duration constants, not by changing the speed of individual loops.
For a requested hold of *N* additional seconds on a beat, add `N / PACE` to the source duration passed to the timing helper.
## 5. Preview and QA loop
For each review round:
1. Render `out/preview-vN.mp4`.
2. Extract a still at every scene's key beat.
3. Inspect small UI regions as well as the full frame: card footers, status rows, top bars, captions, and diagram labels.
4. Check that no text is clipped, overlapped, or desynchronized.
5. Share the numbered preview and collect feedback against that version.
Use a single global pacing factor. Change scene constants only when one scene needs a different hold; do not create timing drift by independently speeding or slowing loops.
Log the work in the user's task system with the agreed owner and review status. Deliver according to the user's media handoff protocol.
## 6. Closing three-layer workflow diagram
Use one data specification to render both an animated closing scene and a static high-resolution image. The diagram should have one business thesis, not a feature inventory.
### Layers
1. **Collaboration layer:** three to six numbered human workflow steps, ordered left to right. Each step is a verb plus the workspace surface that carries it, such as “Discover / Meeting Notes.” Add a loop arrow when the final step feeds the first.
2. **Agent layer:** up to three agents. Place an agent under the step it triggers or writes back to. Use a neutral assistant label when the exact agent identity is not important.
3. **Context layer:** up to four foundation cards for databases, company knowledge, permissions, and search. Name the customer's verified databases without exposing private identifiers.
4. **External tools:** at most one box per layer row, with two to four logo tiles. Label each edge **connect**, **complement**, or **replace**. Default to **connect**; use **replace** only with verified evidence.
Show only verified capabilities. Keep customer data generic or fictional unless it is the customer's own approved vocabulary. A layer without evidence is an assumption or gap, not an invented node.
### Diagram implementation
In a Remotion project:
```typescript
const Diagram = () => <LayerDiagram spec={diagramSpec} />;
<Composition
  id="Diagram"
  component={Diagram}
  durationInFrames={diagramDuration(diagramSpec)}
  width={1920}
  height={1080}
  fps={30}
/>
```
Render both forms:
```bash
npx remotion still Diagram out/diagram.png --frame=<last-frame> --scale=2
npx remotion render Diagram out/diagram.mp4
```
Place connectors before cards so cards mask lines. Wrap text before final placement. Keep labels beside or above lines with visible connector on both sides. At high zoom, reject text overflow, connector-through-card errors, clipped arrowheads, crowded intersections, and unlabelled external edges.
For a system-map variant, use four lanes: **Humans**, **AI Layer**, **Workspace**, and **External Tools**. Use neutral line icons for internal primitives and verified vendor marks only for external tools. Keep the editable source separate from the rendered PNG; the PNG is the presentation artifact.
## 7. Outcomes slide
Choose four outcomes that trace to verified account evidence, for example:
- Launches arrive ready for go-to-market work.
- A growing go-to-market team ramps with less context switching.
- Product bets are supported by customer evidence.
- The team gets more from its existing workspace without another rollout.
End each outcome with **“Measure in a pilot”** and a metric the customer can actually collect, such as time to launch readiness, ramp time, evidence coverage, or number of systems avoided. Never claim a result before the pilot measures it.
## Fidelity rules
- Measure layout, spacing, type scale, and property rows from an approved product reference; do not guess.
- Use a system sans-serif stack with complete Latin glyph coverage.
- Keep card properties in consistent rows with readable labels and avatars.
- Put rollups in property rows rather than decorative chips.
- Make an agent-working state a subtle card-footer or page-header state, never a large banner.
- Put the product mark before the customer mark on the title card.
- Use the same visual grammar in the diagram, video overlays, and closing caption.
## Delivery checklist
Before handoff, confirm:
- [ ] The account context and contact details came from approved sources.
- [ ] Storyboard and caption script were approved before production.
- [ ] Every shown capability and integration passed the integrity check.
- [ ] Simulated integrations are listed explicitly.
- [ ] Preview versions are numbered and key frames were inspected.
- [ ] Captions, UI elements, and diagram labels are not clipped or overlapped.
- [ ] The final video and static diagram are in the agreed output destination.
- [ ] The handoff names total duration, editable source, easy future changes, and pilot metrics.
- [ ] No private people, customer details, secret values, internal URLs, identifiers, or machine-specific paths remain in the public asset.