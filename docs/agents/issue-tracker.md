# Issue Tracker — Linear

## Where issues live

Linear workspace: **benrasha**
Project: **around** — https://linear.app/benrasha/project/around-b410f66ada7e/overview

## How agents interact with this tracker

Agents have access to the **Linear MCP** and should use it directly for all issue operations. Do not ask the user to paste issue descriptions or use the Linear web app unless the MCP is unavailable.

- **Creating issues**: Use `linear_save_issue` with title, description, and labels.
- **Reading issues**: Use `linear_get_issue` (by ID or key like `BEN-123`) or `linear_list_issues` (filtered by project, status, labels).
- **Updating issues**: Use `linear_save_issue` with the issue `id` to update title, description, status, labels, or assignee.
- **Listing comments**: Use `linear_list_comments` on an issue.
- **Referencing issues**: Use Linear issue keys (e.g. `BEN-123`) in commit messages, PR titles, and branch names.

## Workflow notes

- This is a pet project repo. Linear is the single source of truth for work items.
- Labels from `docs/agents/triage-labels.md` should be applied as Linear labels when triaging.
- When breaking work into issues, publish them in dependency order (blockers first) so that "Blocked by" fields can reference real issue identifiers.
