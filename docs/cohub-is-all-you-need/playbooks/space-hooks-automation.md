---
id: cohub.bp.space-hooks-automation
title: Automate with Space Hooks
type: playbook
audience: [builder, agent]
features: [hooks, sandbox, chat, files, task]
difficulty: advanced
related: [cohub.bp.scheduled-loop, cohub.concept.hooks, cohub.concept.task-schedule]
sources:
  - https://github.com/talesofai/cohub/blob/main/docs/space-hooks.md
  - https://cohub.live/changelog (v1.103-v2.18)
---

# Automate with Space Hooks

## When

A file change, Save, finalized turn, published App version, or Task Run transition should trigger work inside the Space.

## Outcome

- Declarative hooks under `.cohub/hooks/*`
- Event matching without self-trigger loops
- Runs visible as Tasks with curated event context

## Steps

1. Choose an event:
   ```text
   space.fs.changed
   space.workspace.ready
   session.turn.finalized
   checkpoint.created
   work.version.published
   task.updated
   ```
2. Add one YAML/JSON file per hook. Exactly one `run` or `prompt` action is required:
   ```yaml
   schema: cohub.space-hook.v1
   on:
     event: task.updated
   run: |
     echo "task=$COHUB_HOOK_TASK_ID status=$COHUB_HOOK_TASK_STATUS"
   ```
3. Use `paths`, `ignore`, `kinds`, `sessionIds`, `sources`, or label filters under `on` where supported. `prompt.sessionId` is the action target, not a trigger filter.
4. Remember that FS matching ignores `.cohub/**`, and `task.updated` filters out `space_hook` tasks and their `run_command` children to prevent re-entry.
5. Read event context from `COHUB_HOOK_*` variables. Optional values are exported as empty strings; file paths and changed fields are bounded.
6. Verify the resulting Task Run in the Tasks surface.

## `task.updated` payload

The v2.18 event fires on Task Run state transitions (`pending` -> `running` -> `completed`/`failed`) and exposes the task id/type/status, changed fields, and error. Use it to launch follow-up validation or notification work without polling generation or Chat state.

## Scheduled prompts vs Hooks

| Mechanism | Good for |
|-----------|----------|
| **Scheduled prompt** | Time-based recurrence |
| **Space Hooks** | Domain events and state transitions |

## Done when

- [ ] The hook file is in the Space workspace
- [ ] A real event produces one expected Task Run
- [ ] Filters and action target are distinct
- [ ] No retry storm or self-trigger loop occurs

## Avoid

- Modifying matched paths without an exit condition
- Putting secrets in hook YAML instead of Space env
- Polling Chat when `task.updated` provides the event boundary
- Using hooks as a substitute for product permission design

---

[中文](../zh/playbooks/space-hooks-automation.md)
