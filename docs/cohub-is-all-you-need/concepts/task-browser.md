---
id: cohub.concept.task-browser
title: Task Browser
type: concept
related:
  - cohub.concept.task-schedule
  - cohub.concept.direct-generation
  - cohub.bp.minimal-scopes
sources:
  - https://cohub.live/changelog (v2.26-v2.30)
  - https://github.com/talesofai/cohub/blob/main/docs/model-tasks.md
  - https://github.com/talesofai/cohub/blob/main/packages/sdk/docs/work-runtime-guide.md
---

# Task Browser

The **Task Browser** is the dedicated multimodal task surface for finding and inspecting generation and other Task Runs. It is delivered as a repository-managed Work and replaces the in-chat generation task tray as the primary place to follow asynchronous generation work.

## Two useful scopes

| View | Required access | Meaning |
|------|-----------------|---------|
| **Mine** | viewer grant `user.taskrun.list` | Every Task Run owned by the current viewer, including runs from Spaces no longer accessible |
| **Space / session** | `taskrun.view` on the target Space | Task Runs visible in that Space or session |

A generation app typically needs `generation.create` to create a task and `taskrun.view` to poll or inspect its result. Creating a task does not imply permission to read it.

## Runtime behavior

- The browser requests the smallest grant for the active view: account-level access for **Mine**, or a per-Space grant for a Space/session.
- `client.auth.requestSpace()` lets a viewer choose another Space in one consent flow; the app learns only the selected Space.
- Results render immediately from an identity-scoped local cache, then refresh silently in the background.
- A failed refresh can keep showing the last cached result instead of blanking the browser; treat cached data as stale until refreshed.
- Session Chat no longer owns a generation-task tray. Use the Task Browser or `client.tasks` APIs for task history and detail.

## CLI and SDK

```bash
cohub tasks ls --json
cohub tasks get <task-run-id> --json
```

Published Apps can use `client.tasks.list()` / `client.tasks.get()` with the corresponding grant. `client.generations.createAndWait()` also needs `taskrun.view` for its polling phase.

## Privacy boundary

Task visibility follows the grant's Space and viewer identity. Account-level **Mine** access exposes Task Runs owned by the viewer, not every task in every Space and not other users' runs. Published Apps should request only the view they render.

---

[中文](../zh/concepts/task-browser.md)
