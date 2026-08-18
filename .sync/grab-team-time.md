## 🚀 First run (setup)
Treat this as a first run when no `setup: complete` line is recorded in the frontmatter, required placeholders are still unfilled, or the user has never invoked this skill.
This skill reads a conversation, infers who the meeting is for and when it should happen, and books it. It triggers when someone asks to "grab time" with people, and it produces one calendar event with attendees invited plus a confirmation message in the thread.
Collect these prerequisites from the user, one at a time, and confirm each mapping back to them:
1. Calendar access — a read/write connection to the owner's work calendar, plus availability lookup for coworkers.
2. Directory access — how to resolve a person's name to a work email.
3. `<your-default-duration>` and `<your-default-window>` — defaults when the request omits them (for example 30 minutes, next 5 business days).
4. `<your-meeting-title-convention>` — any required naming format for externally visible meetings.
5. `<your-room-skill>` — the companion room-booking skill, if physical rooms are ever needed.
6. Working-hours expectations and any calendar blocks that must never be booked over, such as travel.
Have the user save the filled values into their own copy of this skill. Until setup is complete the skill must not book: without directory access it cannot invite the right people, and without the defaults it would guess at duration and window rather than ask. When the values are saved, add a `setup: complete` line to the frontmatter so later runs go straight to booking.
Book meeting time on coworker calendars based on conversation context (chat thread, page, or agent chat). Use when asked to "grab time" with people.
## 📥 Figure out the inputs from context
- **Attendees**: everyone the meeting is for; resolve each person to a work email through the user directory.
- **Duration**: use the stated length ("grab 30" = 30 minutes); default 30 minutes.
- **Timeframe**: use the stated window ("next week" = next Monday through Friday); default the next 5 business days.
- **Meeting type**: internal or external, inferred from participants and context.
- **Title**: a clear event title. If your team has a naming convention for externally visible meetings, apply it exactly.
- **Goal**: the desired outcome in one sentence.
- **Agenda**: one to three concise bullets drawn from the conversation.
## ❓ Ask when unclear
If attendees or timing cannot be confidently inferred, ask before booking: who should attend, and when plus how long. Ask in the same conversation and wait for the answer. Do not guess and book.
## 🔁 Incorporate follow-up replies
- Not booked yet: incorporate the latest details before creating the event.
- Already booked and the target event is clear: update the existing event title and/or description, then confirm in the thread.
- Ambiguous update: ask one concise clarifying question first.
## 📆 Book the time
1. Check availability across all attendees' calendars in the timeframe, inside normal work hours for their timezones.
2. Prefer the earliest slot where everyone is free. Watch for flights and travel blocks marked "free"; do not book over them, and flag them when unavoidable.
3. Create one event with all attendees invited, the derived title, and a description containing **Goal** and **Agenda** sections.
4. If a physical room is needed, attach one with your room-booking skill.
5. Confirm in the conversation: date, time with timezone, attendees, room, title, goal, and agenda.
## 🧪 Edge cases
- No common open slot: propose the two or three least-conflicting options and ask which to book.
- Ambiguous names or external attendees: confirm exact emails before inviting.
- Never book over an attendee's hard conflict.