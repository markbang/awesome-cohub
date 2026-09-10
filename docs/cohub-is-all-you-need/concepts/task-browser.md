---
id: cohub.concept.task-browser
title: Task Browser
type: concept
related:
  - cohub.concept.task-schedule
  - cohub.concept.direct-generation
  - cohub.bp.minimal-scopes
  - cohub.concept.app-center
sources:
  - https://cohub.live/changelog (v2.26, v2.30, v2.42)
  - https://github.com/talesofai/cohub/blob/main/docs/apps-guide.md
  - https://github.com/talesofai/cohub/blob/main/packages/sdk/docs/app-runtime-guide.md
---

# Task Browser

The **Task Browser** is the dedicated multimodal task surface for finding and inspecting generation and other Task Runs. It is a repository-managed App and the primary place to follow asynchronous generation work after the in-Chat task tray was removed.

## Two useful scopes

| View | Required access | Meaning |
|------|-----------------|---------|
| **Mine** | viewer grant `user.taskrun.list` | Every Task Run owned by the current viewer, including runs from Spaces no longer accessible |
| **Space / session** | `taskrun.view` on the target Space | Task Runs visible in that Space or session |

An App that creates a generation typically needs viewer grant `generation.create` to create it and `taskrun.view` to poll or inspect it. Creating a task does not imply permission to read it.

## Runtime behavior

- The browser requests the smallest grant for the active view: account-level access for **Mine**, or a per-Space grant for a Space/session.
- `client.auth.requestSpace()` lets a viewer choose another Space in one consent flow; the App learns only the selected Space.
- Results render immediately from an identity-scoped local cache, then refresh silently in the background.
- A failed refresh can keep showing the last cached result instead of blanking the browser; treat cached data as stale until refreshed.
- Session Chat no longer owns a generation-task tray. Use the Task Browser or `client.tasks` APIs for task history and detail.

## CLI and SDK

```bash
cohub tasks ls --json
cohub tasks get <task-run-id> --json
```

Published Apps can use `client.tasks.list()` / `client.tasks.get()` with the corresponding grant. `client.generations.createAndWait()` also needs `taskrun.view` for its polling phase.

`tasks.wait()` (v2.42) resolves when a run reaches a terminal state by subscribing to realtime `task.updated` events in the Space room, with a polling fallback, a configurable timeout (up to 24h) and poll interval, and `AbortSignal` support.

## Privacy boundary (v2.42)

Task-run snapshots are kept intact in storage; what a caller sees is redacted based on the requester's **space-data permission**, not on actor inference:

- Viewers who can view the Space receive the full run.
- Everyone else gets execution fields (command, cwd, action input, actor/viewer IDs, scopes) and billing figures stripped from payloads, results, and live progress.
- The same rule is enforced consistently across task and cronjob run endpoints.

Account-level **Mine** access exposes Task Runs owned by the viewer, not every task in every Space and not other users' runs. Apps should request only the view they render.

---

[中文](../zh/concepts/task-browser.md)
