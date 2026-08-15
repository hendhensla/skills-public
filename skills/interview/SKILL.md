---
name: interview
skill: "@Interview"
description: >-
  Find the user's next scheduled interview in Notion Calendar, gather verified
  candidate details from your ATS (e.g. Ashby, browser-only) or a confidently
  matched LinkedIn profile, and create interview notes with an executive brief
  plus your standard question set. Use when the user says "at sign interview",
  "add the interview block", "set up my next interview", or asks to prepare a
  page for an interview. Not for candidate scoring, post-interview feedback,
  or transcript summaries.
status: Active
category:
  - Automation
  - Notion
proficiency: Beginner
trigger: Agent
notes: >-
  Uses browser-only ATS access and a reusable interview preparation template
  page that you create in your own workspace.
---

## What this skill does

Before an interview, this skill finds your next scheduled interview in Notion Calendar, figures out who the candidate is, pulls verified background from your ATS (e.g. Ashby) or a carefully matched LinkedIn profile, and creates a fresh interview notes page in Notion. The page opens with an executive brief — a candidate snapshot, role-fit evidence, gaps to probe, and suggested focus areas — followed by your standard interview questions and grading guidance copied from a reusable template. The emphasis throughout is verification: facts are only used when they can be confidently attributed to the right person, and profile claims are always distinguished from resume facts.

## First-time setup

1. **Notion Calendar** connected to the calendar where your interviews appear, accessible to the agent.
2. **Browser assistance** (e.g. a Claude browser extension or browser MCP) so the agent can open your ATS and LinkedIn in your existing signed-in browser session. No ATS API access is required — this skill is browser-only by design.
3. **An ATS account** (e.g. Ashby) where candidate records and resumes live, with a signed-in browser session. The skill never handles credentials in chat.
4. **Your interview preparation template page** in Notion: create a page containing an AI meeting-notes block whose `<notes>` section holds your standard interview opening, your standard question set, and your grading guidance. This skill copies the reusable content out of that template for each new interview. Note the page URL and reference it in your copy of this skill.

## Description

Find the user's next scheduled interview in Notion Calendar, infer the candidate, gather verified candidate context from your ATS through browser assistance, and create a fresh interview meeting-notes page or block using your interview preparation template page. If the ATS or the resume is unavailable, open the LinkedIn URL from the calendar event or find a confidently matched LinkedIn profile and use only verified public facts. Add an executive brief before the standard questions inside the meeting block's `<notes>` section. Use when the user says "at sign interview," "add the interview block," "set up my next interview," or asks to prepare a page for an interview. Do not use for candidate scoring, post-interview feedback, transcript summaries, or unrelated meetings unless the user explicitly asks for the interview template.

## Use when

- The user invokes "At Sign Interview" on a page.
- The user asks to add or prepare the standard interview questions.
- The target should contain a fresh AI meeting-notes block for an interview.

## Do not use when

- The user only wants post-interview feedback or a candidate assessment.
- The page already has the complete interview block, unless replacement is explicitly requested.
- The meeting is not an interview.

## Required inputs

- Target page or database. Default to the page the user is viewing.
- Infer the candidate name and meeting date from the next scheduled interview in Notion Calendar.
- Attempt to access the matching ATS candidate record and resume through browser assistance. Reuse an existing signed-in session. If signed out, pause for secure sign-in in the browser and never request credentials in chat.
- If the ATS or the resume is unavailable, use the LinkedIn URL in the calendar event. If no URL is present, use the candidate's name, role, location, email handle, and employer as matching signals for a LinkedIn lookup. Do not assume that a same-name profile is the candidate.

## Steps

1. Use browser assistance for every run. If browser assistance is off or unavailable, ask whether the user wants to enable it. Do not request login credentials in chat.
2. Check Notion Calendar for upcoming events starting now. Find the earliest non-declined, non-canceled event that is clearly an interview.
3. Infer the candidate's name from the event title first. Interview titles often follow `Interview type - Candidate name - Role`. If the title is ambiguous, inspect attendees and use the external attendee's display name, excluding the user and colleagues from your own company.
4. Use the calendar event's date for the meeting block. If no interview is found, Calendar is unavailable, or more than one candidate is plausible, ask the user instead of guessing.
5. Open the event's linked ATS candidate or recruiting page. If no link is present, search the ATS by the exact candidate name and verify the match against the role and interview date. If multiple records are plausible, ask the user instead of guessing.
6. Use the ATS through browser assistance only. Reuse the existing signed-in session. If the ATS requires authentication, pause and ask the user to complete sign-in securely in the browser. Support the sign-in method the ATS presents, including SSO or a one-time code. Never ask the user to paste credentials or verification codes into chat. Do not require ATS API or MCP access.
7. Open the candidate profile and resume. Extract only role-relevant facts: current role, recent roles, relevant experience, domain or technical strengths, cross-functional evidence, and measurable outcomes. Exclude protected or sensitive personal characteristics. Clearly label any inference and do not present it as a resume fact.
8. Open the LinkedIn URL from the calendar event when the ATS or the resume is unavailable, or when professional background would improve preparation. If no URL is present, search for a LinkedIn profile using the candidate's exact name plus known role, employer, or location. Match the profile using at least two independent signals. If the match is uncertain, state that no reliable profile was found. Never merge facts from multiple possible people.
9. From a verified LinkedIn profile, extract only interview-relevant public facts: headline, current title and company, prior roles, stated location, role dates, About summary, relevant skills, and visible credentials or projects. Include the profile URL. Distinguish profile claims from verified resume facts, and do not infer competence or seniority from endorsements, follower count, or activity volume.
10. Load the target and your interview preparation template page. If the target is a database, create a page titled `Interview [Candidate name]`. If it is a page, add the block without overwriting existing content.
11. From the template, use only the reusable content inside the `<notes>` section. Exclude generated summaries, candidate-specific notes, attendees, citations, and the existing `view-url`.
12. Add a fresh `<meeting-notes>` block titled `Interview [Candidate name]` and dated for the calendar event. Inside its `<notes>` section, add `## Executive brief` before the questions. Include a concise candidate snapshot, relevant experience, role-fit evidence, verified LinkedIn background, gaps or claims to validate, and three interview focus areas. Then preserve the interview opening, behavioral questions, your standard question set, and grading guidance from the template.
13. Do not duplicate an existing interview block for the same candidate and date. If the ATS is unavailable, proceed with a confidently matched LinkedIn profile and clearly label the missing resume context. If neither source can be verified, ask the user before creating a calendar-only version. After editing, confirm the page was prepared. Do not imply that the interview occurred.

## Output format

Create a page or fresh AI meeting-notes block titled `Interview [Candidate name]`, dated for the next scheduled interview. Inside `<notes>`, place the verified ATS, resume, or LinkedIn-based `## Executive brief` first, followed by the standard interview notes, questions, and grading guidance. Keep the chat confirmation to one sentence.

## Example

**Input:** "At sign interview" while viewing your docs page.
**Calendar event:** `Technical Interview - Jordan Sample - Account Executive, New York`
**Result:** Create `Interview Jordan Sample` with a fresh meeting-notes block dated for that event, while preserving the standard interview template.
