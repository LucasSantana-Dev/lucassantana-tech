# Triage Label Vocabulary

Labels used by the `/triage` skill state machine. All labels use the canonical defaults.

| Role | Label | Meaning |
|---|---|---|
| Maintainer evaluating | `needs-triage` | Incoming issue, not yet assessed |
| Waiting on reporter | `needs-info` | Blocked on clarification from reporter |
| AFK-agent-ready | `ready-for-agent` | Fully specified; an autonomous agent can implement without human context |
| Needs human | `ready-for-human` | Needs human judgment or implementation |
| Won't action | `wontfix` | Out of scope or intentionally declined |

## Notes

Labels are created in GitHub if they don't exist. The `/triage` skill applies them via `gh issue edit --add-label`.
