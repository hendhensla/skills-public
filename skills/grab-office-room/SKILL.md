---
name: grab-office-room
skill: grab-office-room
description: >-
  Book an office conference room for a meeting, sized to attendees — attaching
  it to an event you organize, or holding it on your own calendar when someone
  else organizes.
category:
  - Automation
proficiency: Intermediate
trigger: Agent
notes: >-
  Live room-availability results are the only source of truth for capacity.
  Never set minimum capacity to 1, and never edit resources on an event you do
  not organize.
notion_row: 'https://app.notion.com/p/grab-office-room-3c098c2112688170a995efb08746d916'
notion_doc: 'https://app.notion.com/p/grab-office-room-3c098c21126881cc8fb5fdd5efa511e8'
---

## 🚀 First run (setup)

Treat this as a first run when no `setup: complete` line is recorded in the frontmatter, any `<placeholder>` below is still unfilled, or the user has never invoked this skill.

This skill reserves a conference room for a meeting on the owner's work calendar. It triggers whenever a calendar event needs a room, and it produces either the original event with the room attached as a resource, or — when the owner is not the organizer — a separate room-hold event on the owner's own calendar.

Collect these prerequisites from the user, one at a time, and confirm each mapping back to them:

1. Calendar access — a read/write connection to the owner's work calendar, plus a room-availability lookup that returns resource email, building, and capacity. Name the connection or credential only, never a secret value.
2. `<your-work-calendar-address>` — the calendar the room is booked on and holds are created on.
3. `<your-default-office>` — the building to assume when a meeting does not name one.
4. `<your-internal-email-domain>` — used to separate internal attendees from external guests when sizing the room.
5. `<your-event-space-rooms>` — any large rooms that should be reserved for big gatherings only, with the headcount floor that unlocks them.
6. `<your-nonroom-resource-patterns>` — name fragments for resources that are not meeting rooms (phone booths, video-conference hardware, and similar), so they can be filtered out.
7. `<your-ops-channel>` — where to post when no qualifying room is free or a booking fails.
8. `<your-legacy-hold-title>` — the title of any older hold events that should be cancelled on sight. Leave blank if there are none.

Have the user save the filled values into their own copy of this skill. Until setup is complete the skill must not book anything: without calendar write access it cannot reserve a room, without the internal domain it cannot size one correctly, and without the office name it cannot tell which building's rooms are eligible. When the values are saved, add a `setup: complete` line to the frontmatter so later runs go straight to the workflow.

## Purpose

Reserve a conference room in `<your-default-office>` for a meeting on `<your-work-calendar-address>`. Use this skill whenever a calendar event needs a room.

Two hard facts drive the logic below.

1. The room-availability lookup returns rooms from every office and truncates its result, so a low minimum capacity crowds out the rooms that actually fit.
2. Most calendar systems refuse resource edits on an event the owner does not organize, and many external invites are organized by the other party.

## ✅ Required inputs

- Event title, exact start and end time, location, organizer email.
- Attendee list with email and response status.
- Read and write access to `<your-work-calendar-address>`.

## 📏 Step 1 — Size the room

Count the human attendees who have not declined. Exclude bots, notetakers, and room or equipment resources (any address belonging to a calendar-resource domain).

- **Remote guests (default):** count only `<your-internal-email-domain>` attendees, including the owner. External attendees join by video.
- **Guests on site:** when the title or location shows an office visit — for example "onsite", "in person", or an office address — count every human attendee.

Required seats:

| Counted attendees | Required seats |
| --- | --- |
| 1 | 2 |
| 2 or more | the counted number, and never fewer than 3 |

## 🏢 Step 2 — Find available rooms

Run the room-availability lookup on `<your-work-calendar-address>` with:

- the event's exact start and end time,
- minimum capacity = required seats, never 1,
- a generous result count (for example 40),
- working-location filters ignored.

Then filter the result:

1. Keep only rooms in `<your-default-office>`.
2. Drop any room whose capacity is below required seats.
3. Drop resources that are not meeting rooms, using `<your-nonroom-resource-patterns>`.
4. Treat `<your-event-space-rooms>` as event space and use them only above their headcount floor.

Capacity comes from the availability result, and that result is the only source of truth. A hand-maintained rooms list or floor map is useful for human reference but is often stale or partial — never let it override live data.

## 🎯 Step 3 — Pick the room

Choose the smallest capacity that meets the required seats. Break ties deterministically, for example by the lowest room number. Small rooms are scarce, so never take a large room when a smaller one fits.

If the filtered list is empty, run the lookup once more with the same parameters, then treat the slot as having no room.

## 🔒 Step 4 — Reserve the room

Check the organizer first, because the path depends on it.

**The owner organizes the event.** Attach the room to the original event through its `resources` field, using the room's resource email. Never put a room in the attendee list, and leave the attendee list unchanged. Attendees receive an update notification.

**Someone else organizes the event.** The resource edit is rejected ("you are not the organizer"), so the room can only be held on an event the owner owns. Create a room reservation on `<your-work-calendar-address>`:

- summary: `🏢 Room Hold: <original title>`
- exact same start and end time as the meeting
- resources: the selected room, and nothing else
- no human attendees, and conferencing disabled
- description: `Room held for "<original title>". Organizer: <organizer email>.`

Leave the original invite untouched, including the owner's RSVP. This reservation is a room booking, not a duplicate meeting: no attendees, no agenda, no video link.

## 🔍 Step 5 — Verify

Re-read the event or the new reservation and confirm the room resource is present and accepted. A room that responds "declined" is not booked.

If verification fails, retry once with the same room, then take the next-best qualifying room. Escalate after the second room fails.

## 🧹 Step 6 — Keep the calendar clean

- **Already correct:** if the event, or its existing reservation, already holds a room in the target office with enough seats, change nothing.
- **No duplicates:** before creating a reservation, check the owner's calendar for an event in the same window whose only resource is a room. Update that one instead of adding another.
- **Reschedules:** re-run the lookup for the new time. Move the reservation, or release the room and book one that fits.
- **Legacy holds:** cancel any event titled `<your-legacy-hold-title>`. Those follow an older pattern, hold an undersized room, and duplicate real meetings. Report every cancellation.

## 🧪 If no room fits

Leave the meeting unchanged and send one concise message to `<your-ops-channel>` with the meeting title, time, required seats, and the reason, so someone can book it by hand. Escalate only after Step 3 and Step 5 have run out of options. When a booking succeeds, report the room name, its capacity, and the path used.

