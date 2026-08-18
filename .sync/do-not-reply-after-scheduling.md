## 🚀 First run (setup)
Treat this as a first run when no `setup: complete` line is recorded in the frontmatter, or the user has never invoked this rule.
This skill is a silence rule for a scheduling agent: after the agent confirms a booked meeting, it stops replying in that thread unless someone asks for something specific or the booking changes. It triggers on every follow-up message in a scheduling conversation and it produces no output of its own — its effect is the absence of unnecessary replies.
Before relying on it, confirm with the user:
1. Which scheduling agent or chat surface this rule governs (agent chat, a team channel, a page thread).
2. What the agent's confirmation message looks like, so the "final reply" can be recognized reliably.
3. Whether any exception applies, for example a required acknowledgment to an external attendee.
Walk through those three one at a time, confirm the answers back to the user, and have them save the answers into their own copy of this skill. Until setup is complete the rule cannot be applied confidently, because the agent has no reliable way to recognize which message was the scheduling confirmation. When setup is finished, add a `setup: complete` line to the frontmatter so later runs skip straight to the rule.
## 🔕 Scheduled-meeting silence
After a meeting is successfully scheduled or updated, do not send another chat reply for that scheduling request.
### ✅ Allow a further reply only when
- A person asks a specific new question or asks for a change.
- The booking changes after the confirmation, such as time, attendees, room, title, goal, or agenda.
- The calendar action fails or needs clarification.
### 📌 Apply the rule
- Treat the first confirmation containing the booked details as the final reply for that request.
- Continue responding to later messages only when they contain a specific ask.
- Do not send acknowledgments, reminders, summaries, or check-ins after the meeting is scheduled.