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
  Room search fixed: the availability lookup runs with working-location
  filtering left on, which returns the complete office room list instead of a
  truncated sample from every office. Also covers work-calendar-only scoping,
  email-based room matching, treating a needs-action room response as held,
  resource write rules, and internal-meeting sizing. Stale room snapshots
  removed; live availability results are the only source of truth for capacity.
notion_row: 'https://app.notion.com/p/grab-office-room-3c098c2112688170a995efb08746d916'
notion_doc: 'https://app.notion.com/p/grab-office-room-3c098c21126881cc8fb5fdd5efa511e8'
---

## 🚀 First run (setup)

Treat this as a first run when no `setup: complete` line is recorded in the frontmatter, any `<placeholder>` below is still unfilled, or the user has never invoked this skill.

This skill reserves a conference room for a meeting on the owner's work calendar. It triggers whenever a calendar event needs a room, and it produces either the original event with the room attached as a resource, or — when the owner is not the organizer — a separate room-hold event on the owner's own calendar.

Collect these prerequisites from the user, one at a time, and confirm each mapping back to them:

1. Calendar access — a read/write connection to the owner's work calendar, plus a room-availability lookup that returns resource email, building, and capacity. Name the connection or credential only, never a secret value.
2. `<your-work-calendar-account>` and `<your-work-calendar-address>` — the single account and calendar the skill may read and write. Needed because linked personal calendars often mirror the same meetings under different event ids.
3. `<your-default-office>` — the building to assume when a meeting does not name one.
4. `<your-internal-email-domain>` — used to separate internal attendees from external guests when sizing the room.
5. `<your-event-space-rooms>` — any large rooms that should be reserved for big gatherings only, with the headcount floor that unlocks them.
6. `<your-nonroom-resource-patterns>` — name fragments for resources that are not meeting rooms (phone booths, video-conference hardware, and similar), so they can be filtered out.
7. `<your-people-directory>` — an optional directory database that maps a person to a home office or location, plus read access to coworkers' free/busy or out-of-office events. Used to avoid counting attendees who will not be in the office. Name the database and connection only.
8. `<your-hold-title-prefix>` — the prefix this skill puts on its own room-hold events, so later runs recognize and skip them.
9. `<your-ops-channel>` — where to post when no qualifying room is free or a booking fails.
10. `<your-legacy-hold-title>` — the title of any older hold events that should be cancelled on sight. Leave blank if there are none.

Have the user save the filled values into their own copy of this skill. Until setup is complete the skill must not book anything: without calendar write access it cannot reserve a room, without the calendar account and address it cannot tell real events from mirrored copies, without the internal domain it cannot size a room correctly, and without the office name it cannot tell which building's rooms are eligible. When the values are saved, add a `setup: complete` line to the frontmatter so later runs go straight to the workflow.

## Purpose

Reserve a conference room in `<your-default-office>` for a meeting on `<your-work-calendar-address>`. Use this skill whenever a calendar event needs a room.

Three measured facts drive the logic below. Re-verify them against your own calendar before trusting them.

1. The room-availability lookup returns the complete office room list only when working-location filtering is left **on**. Ignoring working location returns a truncated sample spread across every office, so the target office gets only a handful of slots.
2. The event list returns every linked account. A mirrored personal calendar can carry most of the same meetings with no resources and different event ids, which causes false "no room" results and failed writes.
3. Most calendar systems refuse resource edits on an event the owner does not organize, and many external invites are organized by the other party.

## ✅ Required inputs

- Event title, exact start and end time, location, organizer email.
- Attendee list with email and response status.
- Read and write access to `<your-work-calendar-address>`.

## 📥 Step 0 — Scope the calendar

List events, then keep only rows whose account is `<your-work-calendar-account>` and whose calendar is `<your-work-calendar-address>`. Discard every other account and calendar in the response.

Skip an event when any of these is true:

- it starts in the past, or it is an all-day event
- its status is cancelled, or the owner's response is declined
- it is marked free/transparent, which is a block and not a meeting
- the title or description contains "no room"
- the title starts with `<your-hold-title-prefix>`, which is this skill's own hold

## 📏 Step 1 — Size the room

Count the human attendees who have not declined. Exclude bots, notetakers, and room or equipment resources (any address belonging to a calendar-resource domain).

- **Remote guests (default):** count only `<your-internal-email-domain>` attendees, including the owner. External attendees join by video.
- **Guests on site:** when the title or location shows an office visit — for example "onsite", "in person", or an office address — count every human attendee.
- **Internal meeting:** count every attendee who has not declined.

### 🏙️ Who counts as in the room

Never count a person who will not be in `<your-default-office>`. Resolve each internal attendee with this order of evidence, strongest first:

1. An out-of-office event on that person's calendar that overlaps the meeting. Do not count them. A coworker-events lookup usually needs only their email.
2. `<your-people-directory>` lists their location as `<your-default-office>`. Count them.
3. The directory lists any other office, or any remote location. Do not count them. They join by video.
4. No directory row, or an empty location. Count them. Never undersize because data is missing.

Always count the owner.

Join an attendee email to a directory row in two steps:

1. Resolve the email to a workspace user. One broad user search usually returns most of the directory; for anyone still missing, search the email local part.
2. Match that user reference against the directory's person property, with every attendee of the whole sweep in one query rather than one query per person.

**Known limit:** calendar APIs generally do not expose working location, so travel is invisible. A local person who is visiting another office still counts. Rooms on that person's other events the same day are a weak hint only, because a multi-site meeting carries rooms from several buildings at once. Never treat that hint as proof.

Required seats:

| Counted attendees | Required seats |
| --- | --- |
| 1 | 2 |
| 2 or more | the counted number, and never fewer than 3 |

## 🏢 Step 2 — Find available rooms

Run the primary lookup once per sweep, batching every meeting time into the request, with:

- working-location filtering left on. This is the fix; never ignore working location on the first call.
- minimum capacity = required seats, never 1,
- a generous result count (for example 40),
- the calendar set to `<your-work-calendar-address>`.

Then filter the result:

1. Keep only rooms in `<your-default-office>`.
2. Drop any room whose capacity is below required seats.
3. Drop resources that are not meeting rooms, using `<your-nonroom-resource-patterns>`.
4. Treat `<your-event-space-rooms>` as event space and use them only above their headcount floor.

**Fallback, only when the filtered list is empty.** Repeat the lookup with working location ignored at three capacity rungs: required seats, required seats plus 3, and required seats plus 6. Union the results by resource email, then apply the same filter. That mode truncates the room list across all offices, so the rungs recover rooms a single call hides.

Capacity and room identity come from the availability result, and that result is the only source of truth. Never store a room list in this skill. A hand-maintained rooms list or floor map is useful for human reference but is often stale or partial — never let it override live data.

## 🎯 Step 3 — Pick the room

Choose the smallest capacity that meets the required seats. Break ties deterministically, for example by the lowest room number. Small rooms are scarce, so never take a large room when a smaller one fits.

If the filtered list is still empty after the fallback, treat the slot as having no room.

## 🔒 Step 4 — Reserve the room

Check the organizer first, because the path depends on it.

Resource write rules, for both paths:

- Every resource item needs the room's resource email and must be marked required, not optional. A display name alone does not book a room.
- The resources field is a full replacement list. To add a room to an event that already holds one, send the existing resources plus the new room.
- Never send the attendee list in a room update. It is also a full replacement list, so it would rewrite the guest list.

**The owner organizes the event.** Attach the room to the original event through its resources field. Leave the attendees, time, title, and description unchanged. Attendees receive an update notification.

**Someone else organizes the event.** The resource edit is rejected ("you are not the organizer"), so hold the room on an event the owner owns:

- summary: `<your-hold-title-prefix> <original title>`
- exact same start and end time as the meeting
- resources: the selected room, and nothing else
- conferencing disabled, and no human attendees
- description: `Room held for "<original title>". Organizer: <organizer email>.`

Leave the original invite untouched, including the owner's RSVP. This reservation is a room booking, not a duplicate meeting: no attendees, no agenda, no video link.

## 🔍 Step 5 — Verify

Re-read the event or the hold and confirm the room's resource email is present in the resources list.

Read the room's response status this way:

- "needs action" means the room is held and the calendar has not answered yet. This is the normal result right after a write, because rooms are accepted asynchronously. Accept it and move on.
- "accepted" means confirmed.
- "declined" is the only failure. Take the next best qualifying room, then escalate after the second room fails.

Never retry on "needs action". That causes room churn.

## 🧹 Step 6 — Keep the calendar clean

- **Match on email, never on name.** The availability lookup and the event display name for the same room often differ. Compare resource emails. Read the seat count from the availability result, or from the number in parentheses in the event display name.
- **Already correct:** if the event, or its existing hold, already holds a room in the target office with enough seats, change nothing.
- **No duplicates:** before creating a hold, check the owner's calendar for an event in the same window whose only resource is a room. Update that one instead of adding another.
- **Reschedules:** re-run the lookup for the new time. Move the hold, or release the room and book one that fits.
- **Legacy holds:** cancel any event titled `<your-legacy-hold-title>`. Those follow an older pattern, hold an undersized room, and duplicate real meetings. Report every cancellation.
- **Cancel results lie:** a cancel call can return an unknown error after it has already removed the event. Re-read the time window before retrying, and never cancel the same event twice.

## 🧪 If no room fits

Leave the meeting unchanged and send one concise message to `<your-ops-channel>` with the meeting title, time, required seats, and the reason, so someone can book it by hand. Escalate only after the Step 2 fallback and Step 5 have run out of options. When a booking succeeds, report the room name, its capacity, and the path used.
