## 🚀 First run (setup)
Treat this as a first run when `setup: pending` is recorded, when a required placeholder is unfilled, or when the user has never invoked this skill.
This Worker processes relevant posts from an authenticated X account when its deployment trigger runs and produces deduplicated rows in a user-owned Notion staging database for downstream promotion. The public copy documents the deployment boundary only; it does not expose or invent agent-callable tools.
Before setup is complete, the adopting user must supply:
1. A deployed copy of the Worker in their own workspace, recorded as `<your-worker-url>`.
2. Their own staging database and editable destination database, recorded as `<your-staging-db>` and `<your-destination-db>`.
3. Their own downstream publisher or promotion tool, recorded as `<your-publisher>`.
4. The credential names used by their deployment: `X_CONSUMER_KEY`, `X_CONSUMER_SECRET`, `X_ACCESS_TOKEN`, `X_ACCESS_TOKEN_SECRET`, and optionally `X_USER_ID`. Store values only in the Worker's secure credential or environment system, never in this file, a repository, or chat.
5. A Worker-management connection that can perform a read-only deployment inspection.
Walk through these mappings one at a time: Worker URL, staging database, destination database, publisher, then each credential name. Confirm each mapping back to the user and have them save the filled values in their own copy of this skill.
Until setup is complete, the deployment cannot safely access the authenticated account or write staging rows. An outside agent cannot invoke this Worker directly because no agent-callable tools are exposed.
Run one read-only deployment inspection through the adopting platform. Expected return shape:
```json
{
  "workerId": "<your-worker-id>",
  "status": "active",
  "capabilities": [
    { "key": "<configured-capability-key>", "type": "<configured-capability-type>" }
  ]
}
```
The inspection must not write rows. After the deployment is active and its configured capability is present, change the frontmatter line to `setup: complete`.
## Purpose
Use this playbook to describe the public boundary of a de-identified X-to-Notion Worker deployment. It keeps deployment-specific identifiers and credential values private and makes clear which functionality an outside agent can call.
## 🚫 Agent-callable tool surface
This deployment exposes no agent-callable tools. There are therefore no callable tool names, input fields, or return schemas to publish. Do not infer a callable interface from private deployment controls, internal implementation details, or the adopting workspace's scheduler and databases.