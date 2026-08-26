---
id: cohub.concept.hooks
title: Space Hooks
type: concept
related: [cohub.bp.space-hooks-automation, cohub.concept.task-schedule]
sources:
  - https://github.com/talesofai/cohub/blob/main/docs/space-hooks.md
  - https://cohub.live/changelog (v2.18)
---

# Space Hooks

Space Hooks are file-declared asynchronous automation under `.cohub/hooks/*` (v1.103+). One file is one hook identity, with exactly one `run` or `prompt` action.

## Events

- `space.fs.changed`
- `space.workspace.ready`
- `session.turn.finalized`
- `checkpoint.created`
- `work.version.published`
- `task.updated` (v2.18): Task Run state transitions with task identifiers, status, changed fields, and errors

`task.updated` filters out `space_hook` tasks and their `run_command` children, preventing a hook from re-entering itself.

## Practice

- FS matching ignores `.cohub/**` to avoid self-trigger loops.
- Turn filters (`sessionIds`, `sources`, and optional label filters) are separate from the `prompt.sessionId` action target.
- Hook context is exposed through curated `COHUB_HOOK_*` environment variables; absent optional values are empty strings.
- Treat hook runs as Tasks and inspect their terminal status instead of polling Chat.

## See also

- https://github.com/talesofai/cohub/blob/main/docs/space-hooks.md
- [Space Hooks automation](../playbooks/space-hooks-automation.md)

---

[中文](../zh/concepts/hooks.md)
