## 🚀 First run (setup)
Treat this as a first run when no `setup: complete` line is recorded in the frontmatter, required placeholders are still unfilled, or the user has never invoked this skill.
This skill scans the same evidence window as your weekly-wins routine and surfaces up to three colleagues who actively collaborated with you on a shared result. It runs alongside that weekly routine, and it produces a short list of candidates with evidence links and ready-to-send appreciation wording. It never sends recognition — you do.
Ask the user for these prerequisites, one at a time, and confirm each mapping back to them:
1. `<your-weekly-wins-workflow>` — the routine or skill whose evidence window this should reuse, and the length of that window.
2. `<your-evidence-sources>` — where collaboration evidence can be read: chat, docs, project database, task tracker, meeting notes.
3. `<your-recognition-platform>` — the peer-recognition tool and the read-only connection or credential name used to read it. Never collect the credential value.
4. `<your-voice-skill>` — an optional tone or voice skill to use for the appreciation line; if none exists, the default terse style applies.
Have the user save the filled values into their own copy of this skill. Until setup is complete the skill cannot run: with no evidence sources it has nothing to search, and with no recognition-platform connection it cannot check for recent duplicate recognition. When the mappings are saved, add a `setup: complete` line to the frontmatter so later runs go straight to the workflow.
## 📖 Purpose
Find up to three colleagues who actively collaborated with the owner on a shared result and are worth recognizing on your peer-recognition platform. Produce evidence-backed suggestions only. The agent cannot create or send recognition, so the output is a short list the owner can act on.
## ✅ Workflow
1. Use the same evidence window as the related weekly-wins workflow.
2. Look for active contributions by another person: co-creating work, improving a deliverable, unblocking progress, contributing expertise, making a useful introduction, or covering an important task.
3. Require a concrete action and a clear shared result. Exclude passive attendees, reactions, thread proximity, and people whose only role was receiving the owner's help.
4. Prefer collaboration the other person initiated or materially advanced.
5. Optionally read the recognition platform for context, such as whether the owner recognized this person recently. Never attempt to send.
6. Assign stable IDs such as B1, B2, B3.
7. For each candidate, give the person's name, the specific collaboration, its impact, a direct evidence link, and a short appreciation line the owner could send.
8. Use your voice or tone skill when available; otherwise keep the appreciation line specific, casual, and brief.
## 🧾 Output
- **B1: Person**
	- **Why**: specific collaboration and impact
	- **Evidence**: direct source link
	- **Appreciation line**: a short, ready-to-send thanks
If there is no clear candidate, say: "No evidence-backed recognition suggestions this week."
## 🔐 Boundaries
- The agent cannot create or send recognition; it only suggests candidates and wording.
- Use the recognition-platform connection read-only.
- Never contact a candidate or state that recognition was sent.