---
id: cohub.concept.context-compaction
title: Recoverable context compaction
type: concept
related:
  - cohub.concept.chat
  - cohub.bp.scheduled-loop
sources:
  - https://cohub.run/changelog (v2.5 recoverable compaction)
---

# Recoverable context compaction

**Context compaction** keeps long sessions working by summarizing earlier turns when the context window fills up.

## v2.5 behavior (recoverable)

- Compaction can run at **any LLM round boundary**, not only between turns.
- It records structured metadata: scope, owner turn, trigger reason, token deltas, usage, and duration.
- On failure, the session **rolls back to its pre-compaction archive** — a bad summary no longer poisons the running turn.
- The web client shows an inline notice with expandable summary, token savings, and cost, streamed live via the SDK.

## What this means for agents

- A failing summarization retry no longer inflates provider call counts (stats are fixed to the successful attempt).
- The turn ordinal reflects compaction position inside the turn rather than the global message sequence.
- Long-running loops can trust compaction to be reversible — keep the disk-state pattern from [scheduled-loop](../playbooks/scheduled-loop.md) for durable progress.

---

[中文](../zh/concepts/context-compaction.md)
