---
id: cohub.concept.hooks
title: Space Hooks（空间钩子）
type: concept
---

# Space Hooks

File-declared automation under `.cohub/hooks/*` (v1.103+).

Events: `space.fs.changed` · `space.workspace.ready` · `session.turn.finalized` · `checkpoint.created`  
Actions: `run` (sandbox shell) or `prompt` (session)

## Practice
- One file = one hook identity
- FS hooks ignore `.cohub/**` to avoid loops
- Turn filters (`sessionIds`, `sources`) are orthogonal to prompt target session

## See also
- https://github.com/talesofai/cohub/blob/main/docs/space-hooks.md
- Playbook: `cohub.bp.space-hooks-automation`

---

[English](../../concepts/hooks.md)
