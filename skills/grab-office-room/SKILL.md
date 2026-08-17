---
name: grab-office-room
skill: grab-office-room
description: Select and attach an allowlisted office conference room to an existing calendar event, sized to the internal attendee count.
category:
  - Automation
proficiency: Intermediate
trigger: Agent
notes: Never create a separate hold event; always attach the room as a resource on the original event. Keep the room allowlist in your own config, not in the skill body.
---

## 🚀 First run (setup)

Treat this as a first run when no `setup: complete` line is recorded in the frontmatter, `<your-rooms-allowlist>` is still unfilled, or the user has never invoked this skill.

This skill attaches a conference room to an event that already exists on the owner's work calendar. It triggers whenever a meeting needs a room, and it produces an updated event with the room attached as a resource — never a second hold event.

Collect these prerequisites from the user, one at a time, and confirm each mapping back to them:

1. Calendar access — a read/write connection to the owner's work calendar, named by connection or credential name only.
2. `<your-default-office>` — the building to assume when none is specified.
3. `<your-rooms-allowlist>` — the list of bookable room resource emails with building and capacity for each. This lives in the user's own configuration or rooms database, not in the skill body.
4. `<your-internal-email-domain>` — used to count internal attendees for the size rule.
5. `<your-ops-channel>` — where to post when no qualifying room is free or a resource fails to attach.
6. Any capacity thresholds that differ from the defaults below.

Have the user save the filled values into their own copy of this skill. Until setup is complete the skill must not book anything: without the allowlist it cannot tell a bookable room from any other resource, and without the internal domain it cannot size the room correctly. When the values are saved, add a `setup: complete` line to the frontmatter so later runs go straight to room selection.

Select and attach an allowlisted conference room to an event on the owner's work calendar. Use whenever a calendar event needs a room.

**Never create a separate hold event.** Update the original event by attaching the selected room as a resource. This may notify existing attendees. Assume the owner's default office unless told otherwise.

## ✅ Required inputs

- The calendar event: title, exact start and end time, attendee list.
- Read and write access to the owner's work calendar.
- A room allowlist of resource emails with building and capacity, stored in your own configuration (`<your-rooms-allowlist>`).

## 🏢 Room selection steps

1. Check room availability for the event's exact time against the owner's calendar, scoped to the target building and ignoring working-location filters, with minimum capacity 1. Do not use coworker-calendar lookup for rooms.
2. Keep only available rooms whose resource email exactly matches the allowlist and whose building matches the target office.
3. Count internal attendees (same email domain, including the owner), then apply the size rule:
   - **Demo meeting**: if the title contains "demo" (case-insensitive), choose from the allowlist regardless of capacity.
   - **Small room**: non-demo and the owner is the only internal attendee — choose a room with capacity up to 2.
   - **Larger room**: non-demo with two or more internal attendees — choose a room with capacity of at least 3.
4. Use the capacity from the availability result; if absent, consult your rooms database. If several qualifying rooms are free, apply a deterministic tie-break (for example, the higher room number).
5. Attach the room through the event's `resources` field using the resource email. Never put a room in the attendee list.
6. Re-open the original event and verify the resource attached. If it failed, retry once with the same room, then try the next-best qualifying room.

## 🧪 If no room fits

If no qualifying room is available, leave the event unchanged and post a concise message to your designated ops channel with the meeting title, time, and required room size so a human can book it. If a resource fails to attach after the required retries, post the meeting time and failure details.
