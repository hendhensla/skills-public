---
name: grab-nyc-room
skill: grab-nyc-room
description: >-
  Books an office conference room for a calendar meeting, sized to the attendees
  who will actually be in the building: attaches the room to invites you
  organize, or holds it on your own event when someone else organizes.
category:
  - Automation
proficiency: Advanced
trigger: Agent
setup: required
notes: >-
  Assumes a work calendar plus an optional people/directory database. Room
  capacity and identity always come from the live availability lookup, never
  from a stored room list.
notion_row: 'https://app.notion.com/p/grab-nyc-room-3c298c211268817eb72ff8dcac02dbb5'
notion_doc: 'https://app.notion.com/p/grab-nyc-room-3c298c21126881968db1dcbd2c86e32c'
---

## 🚀 First run (setup)

Run this section when the setup marker above still reads `required`, when any `<placeholder>` below is unfilled, or when the user has never invoked this skill. Then skip straight to the workflow on later runs.

1. Explain the skill in two or three sentences: it books a conference room in one office for meetings on the user's work calendar, sizes the room to the attendees who will physically be in that office, and either attaches the room to invites the user organizes or creates a separate room hold when someone else organizes. It runs when the user asks for a room or asks for a sweep of upcoming meetings. It produces booked rooms plus a short report of what was booked and what could not be.
2. Collect the prerequisites from the user, by name only — never ask for secret values:
   - A calendar connection that can list events, look up room/resource availability, read coworker out-of-office events, and write resources on events the user organizes.
   - `<home-office-name>` — the office whose rooms this skill books, as the availability lookup spells the building name.
   - `<work-account-id>` and `<work-calendar-id>` — the single account and calendar to read. Everything else is discarded.
   - `<people-db>` — optional directory database with a person property and a location/office property, used to decide who is in the building.
   - `<room-reference-doc>` — optional human-maintained floor reference. Never authoritative.
3. Walk through each placeholder one at a time, confirm the mapping back to the user in plain language ("rooms will be booked in X, reading calendar Y"), and have them save the filled values into their own copy of this skill.
4. Until setup is complete the skill cannot run: without the calendar connection and `<work-account-id>` / `<work-calendar-id>` it cannot list meetings or book rooms, and without `<home-office-name>` it cannot tell which rooms are in the right building.
5. Record completion by changing the frontmatter marker to `setup: complete`.

## Purpose

Reserve a conference room in `<home-office-name>` for meetings on the user's work calendar (`<work-calendar-id>`). Use it whenever a calendar event needs a room. Assume the user is in `<home-office-name>` unless told otherwise.

Three measured facts drive the logic. Verify them once against your own calendar API during setup.

1. The room lookup returns the complete single-office room list only when `ignoreWorkingLocation` is `false`. With `true` it returns a truncated sample across every office, and the target office gets only a handful of slots.
2. The event list returns every linked account. A mirrored personal calendar can duplicate most work events with `resources: null` and different event IDs. Read the work calendar only.
3. Calendar providers refuse resource edits on an event the user does not organize, and most external invites are organized by someone else.

## 📥 Step 0: Scope the calendar

List events, then keep only rows whose accountId is `<work-account-id>` and calendarId is `<work-calendar-id>`. Discard every other account and calendar. Mirrored copies show no resources and carry different event IDs, so they cause false "no room" results and failed writes.

Skip an event when any of these is true:

- it starts in the past, or it is an all-day event
- `eventStatus` is `cancelled`, or the user's `responseStatus` is `declined`
- `isTransparent` is `true`, which marks a free block and not a meeting
- the title or description contains "no room"
- the title starts with the hold prefix below, which is this skill's own hold

## 📏 Step 1: Size the room

Count the human attendees who have not declined. Exclude bots, notetakers, and resource addresses (anything on the calendar-resource domain).

- **Remote external guests, the default:** count only internal-domain attendees, including the user. External attendees join by video.
- **External guests on site:** when the title or location shows an office visit ("@ <office>", "onsite", "in person", or an office address), count every human attendee.
- **Internal meeting:** count every attendee who has not declined.

### Who counts as in the room

Never count a person who will not be in `<home-office-name>`. Resolve each internal attendee with this order of evidence, strongest first:

1. An `outOfOffice` event on that person's calendar overlapping the meeting → do not count them. The coworker-events lookup needs only their email.
2. `<people-db>` gives a location equal to `<home-office-name>` → count them.
3. `<people-db>` gives any other office, or any "Remote - ..." value → do not count them. They join by video.
4. No directory row, or an empty location → count them. Never undersize because data is missing.

Always count the user.

Join an attendee email to a directory row in two steps:

1. Resolve the email to a workspace user. One broad user search returns most of the directory; for anyone still missing, search the email local part.
2. Match that user reference against the directory's person property, with every attendee of the whole sweep in one query:

```sql
SELECT p."Name", p."Location", j.value AS person_url
FROM "<people-db>" p, json_each(p."Person") j
WHERE j.value IN (?, ?, ?)
```

Known limit: calendar APIs generally do not expose working location, so travel is invisible. A local person who is visiting another office still counts. Rooms on that person's other events the same day are a weak hint only, because a multi-site meeting carries rooms from several buildings at once. Never treat that hint as proof.

Required seats:

| Counted attendees | Required seats |
| --- | --- |
| 1 | 2 |
| 2 or more | the counted number, and never fewer than 3 |

## 🕐 Step 2: Snap the hold window to :00 or :30

Rooms stay bookable for everyone when they start and end on a clean boundary. A hold from 8:45 to 9:15 leaves two dead fragments nobody can use.

This applies only to a hold the user owns, which is the second path in Step 5. Never change the time of an invite; that would move the real meeting for every guest.

1. Round the hold start down to the nearest :00 or :30.
2. Round the hold end up to the nearest :00 or :30.
3. Never shrink the window. The hold must always cover the whole meeting.
4. If the two roundings add more than 30 minutes in total, keep the exact meeting window.

| Meeting | Hold window | Reason |
| --- | --- | --- |
| 8:45 to 9:15 | 8:30 to 9:30 | 15 minutes each side, inside the limit |
| 2:00 to 3:00 | 2:00 to 3:00 | already clean |
| 8:25 to 8:35 | 8:25 to 8:35 | a clean window would add 50 minutes |

Look up rooms for the snapped window. If no room is free for it, book the room for the exact meeting window instead. A room on the exact window is better than no room.

## 🏢 Step 3: Find available rooms

Run the primary lookup once per sweep, with every window from Step 2 batched into `timeSlots`. Add the exact meeting window as a second slot whenever it differs from the snapped window.

- `ignoreWorkingLocation: false` — this is the fix. Never send `true` on the first call.
- `minCapacity` = required seats, never 1
- `maxCount` = 40
- `calendar` = `<work-calendar-id>`

Then filter the result:

1. Keep only rooms whose building name is `<home-office-name>`.
2. Drop any room whose `capacity` is below the required seats.
3. Drop resources that are not meeting rooms, such as phone booths and display-only devices.
4. Treat oversized event spaces (large kitchens, all-hands areas) as event space. Use them only for 11 or more people.

**Fallback, only when the filtered list is empty.** Repeat the lookup with `ignoreWorkingLocation: true` at three capacity rungs: required seats, required seats plus 3, and required seats plus 6. Union the results by `resourceEmail`, then apply the same filter. The `true` mode truncates across all offices, so the rungs recover rooms that one call hides.

Capacity and room identity come from the lookup result, which is the only source of truth. Never store a room list in this skill. `<room-reference-doc>`, if it exists, usually covers one floor and can disagree with the calendar provider — use it for human reference only, never to override live data.

## 🎯 Step 4: Pick the room

Choose the snapped window from Step 2 when it has at least one qualifying room. Use the exact meeting window only when the snapped window has none.

For the chosen window, take the smallest capacity that meets the required seats. Break a tie with the lowest room number. Small rooms are scarce, so never take a large room when a smaller one fits.

If both windows are empty after the fallback, treat the slot as having no room.

## 🔒 Step 5: Reserve the room

Check the organizer first, because the path depends on it.

Resource write rules, for both paths:

- Every resource item needs `email`, which is the `resourceEmail` from the lookup, and `isOptional: false`. A `displayName` alone does not book a room.
- `resources` is a full replacement list. To add a room to an event that already holds one, send the existing resources plus the new room.
- Never send `attendees` in a room update. That field is also a full replacement list, so it would rewrite the guest list.

**The user organizes the event.** Attach the room to the original event through its `resources` field. Leave attendees, time, title, and description unchanged. Attendees receive an update notification.

**Someone else organizes the event.** The provider rejects the resource edit with "you are not the organizer", so hold the room on an event the user owns:

- summary: `🏢 Room Hold: <original title>`
- the Step 2 hold window: the snapped window when a room is free for it, and the exact meeting window when no room is
- resources: the selected room, and nothing else
- `disableConferencing: true`, and no human attendees
- description: `Room held for "<original title>". Organizer: <organizer email>. Created by the room-grabber skill.`

Leave the original invite untouched, including the user's RSVP. This hold is a room booking, not a duplicate meeting: no attendees, no agenda, no video link.

## 🔍 Step 6: Verify

Re-read the event or the hold and confirm the room email is present in `resources`.

Read the room's `responseStatus` this way:

- `needsAction` means the room is held and the calendar has not answered yet. This is the normal result right after a write, because providers accept rooms asynchronously. Accept it and move on.
- `accepted` means confirmed.
- `declined` is the only failure. Take the next best qualifying room, then escalate after the second room fails.

Never retry on `needsAction`. That causes room churn.

## 🧹 Step 7: Keep the calendar clean

- **Match on email, never on name.** The lookup and the event display name for the same room often differ. Compare `resources[].email` with `resourceEmail`. Read the seat count from the number in parentheses in the event display name, or from a lookup by email.
- **Already correct:** if the event, or its existing hold, already holds a room in the right office with enough seats, change nothing.
- **No duplicates:** before creating a hold, check the work calendar for an event that overlaps the window and whose only resource is a room. A snapped hold does not match the meeting time exactly, so compare by overlap and not by equality. Update that one instead of adding another.
- **Reschedules:** snap the new time again with Step 2, then re-run the lookup. Move the hold, or release the room and book one that fits.
- **Legacy holds:** cancel leftover holds from older patterns, which typically hold a one-seat room and duplicate real meetings. Report every cancellation.
- **Cancel results lie:** the cancel call can return an unknown error after it removed the event. Re-read the time window before retrying, and never cancel the same event twice.

## 🧪 If no room fits

Leave the meeting unchanged and include the meeting title, time, required seats, and reason in the run report so someone can book it by hand. Report the room name, the seats, and the path used when a booking succeeds.

