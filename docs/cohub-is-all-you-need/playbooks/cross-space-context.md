---
id: cohub.bp.cross-space-context
title: Pull context from another Space
type: playbook
audience: [builder, agent]
features: [chat, space, references, files]
difficulty: intermediate
related: [cohub.concept.chat, cohub.concept.space, cohub.bp.agent-with-skills]
sources:
  - https://cohub.run/docs/workspace/chats
  - https://cohub.run/changelog#v1.101
  - https://cohub.run/changelog#v1.102
---

# Pull context from another Space

## When

This Chat needs facts, files, or prior work that already live in another Space you can access.

## Outcome

- Agent reads external context deliberately (not by guessing)
- Cross-space intent is visible in the Chat transcript
- Optional: references graph / provenance helps later audit (platform-side)

## Steps

1. Confirm you can access the source Space (membership / public policy).
2. Prefer **@space** mentions in the composer for deliberate cross-space context.
3. Tell the Agent exactly what to pull (path, Save note, Work URL, decision page) — not “read everything”.
4. If operating from CLI/sandbox automation, pass explicit space ids:
   ```bash
   cohub -s <targetSpaceId> spaces files cat wiki/overview.md
   cohub -s <currentSpaceId> spaces prompt "Summarize findings from the other Space notes I attached/cited"
   ```
5. Write distilled conclusions into **this** Space’s files (`wiki/`, `docs/`) so the next Chat does not re-fetch blindly.
6. Save when the synthesis becomes a milestone.

## Platform notes

- Mentions are for deliberate context, not every message.
- Recent platform work records request provenance (`X-Cohub-Source-*`) and cross-space `tool_call` edges for successful inter-space API calls — useful for ops/analytics, not a substitute for writing wiki notes.

## Done when

- [ ] Source Space cited clearly in Chat or files
- [ ] Distilled notes exist in the consumer Space
- [ ] No secret leakage across Spaces

## Avoid

- @mention spam on every turn
- Copying whole foreign workspaces without distillation
- Assuming Agents can see Spaces you cannot access

---

[中文](../zh/playbooks/cross-space-context.md)
