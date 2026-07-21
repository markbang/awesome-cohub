---
id: cohub.concept.task-schedule
title: Task & scheduled prompt
type: concept
related: [cohub.bp.scheduled-loop, cohub.bp.space-hooks-automation]
---

# Task & scheduled prompt

**Tasks** are runnable units. **Scheduled prompts** recur on a timetable and drive agent turns.

## Why it matters

Autonomy without disk state becomes amnesia. Schedules should write **files** (state, logs, wiki) every tick.

## Practice

- [scheduled-loop](../playbooks/scheduled-loop.md)  
- Anti-pattern: [loop-without-disk-state](../anti-patterns/loop-without-disk-state.md)  
- Event-driven cousin: [hooks](./hooks.md)

---

[中文](../zh/concepts/task-and-schedule.md)
