# Triage Labels

## Label mapping

When the `triage` skill moves an issue through its state machine, it applies the following labels. These are the default names — if your tracker uses different strings, update the "Actual label" column.

| Role | Actual label | Meaning |
|---|---|---|
| `needs-triage` | `needs-triage` | Maintainer needs to evaluate the issue |
| `needs-info` | `needs-info` | Waiting on the reporter for more information |
| `ready-for-agent` | `ready-for-agent` | Fully specified — an AFK agent can pick it up with no human context |
| `ready-for-human` | `ready-for-human` | Needs a human to implement (requires judgment, design, or context an agent lacks) |
| `wontfix` | `wontfix` | Will not be actioned |

## Linear notes

Apply these as Linear labels on the issue. If a label doesn't exist in your Linear workspace yet, create it.
