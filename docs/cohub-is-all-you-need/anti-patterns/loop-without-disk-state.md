---
id: cohub.ap.loop-without-disk-state
title: Loop without disk state
type: anti-pattern
related: [cohub.bp.scheduled-loop, cohub.bp.space-hooks-automation]
---

# Loop without disk state

## Why it hurts

Scheduled prompts and hooks that only “remember” in chat lose progress, duplicate work, and cannot be audited.

## Do this instead

Persist each tick: `runtime/state.json`, `wiki/log.md`, or job-specific ledgers. Read state at start; write state at end.

## Smell test

If killing the chat erases the loop’s brain, it was never autonomous.

---

[中文](../zh/anti-patterns/loop-without-disk-state.md)
