---
id: cohub.concept.context-compaction
title: Recoverable context compaction
type: concept
related:
  - cohub.concept.chat
  - cohub.concept.direct-generation
  - cohub.bp.scheduled-loop
sources:
  - https://cohub.live/changelog (v2.5, v2.23)
---

# Recoverable context compaction

**Context compaction** keeps long sessions working by summarizing earlier turns when the context window fills up.

## Recoverable behavior

- Compaction can run at **any LLM round boundary**, not only between turns.
- It records structured metadata: scope, owner turn, trigger reason, token deltas, usage, and duration.
- On failure, the session rolls back to its pre-compaction archive; a bad summary does not poison the running turn.
- The Web client shows an inline notice with expandable summary, token savings, and cost, streamed live via the SDK.

## Image-heavy contexts (v2.23)

- Image context is estimated with a flat vision-tile token cost instead of raw base64 length.
- Compaction effect validation requires at least a **20% reduction**, unless the caller explicitly forces compaction.
- No-op rewrites on image-dominated contexts are skipped, reducing unnecessary provider work.

## What this means for agents

- A failed summarization retry does not inflate provider call counts; stats reflect the successful attempt.
- The turn ordinal reflects compaction position inside the turn rather than the global message sequence.
- Long-running loops can trust compaction to be reversible, but should still write durable progress to Space files as described in [scheduled-loop](../playbooks/scheduled-loop.md).

---

[中文](../zh/concepts/context-compaction.md)
