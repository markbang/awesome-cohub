---
id: cohub.cheat.scopes
title: App and viewer scopes cheatsheet
type: cheatsheet
---

# App and viewer scopes cheatsheet

## Direct App scopes

Publisher grants these at publish time; they apply only to the App's own Space:

```text
space.view  session.view  file.view  file.edit
taskrun.view  session.prompt.readonly  session.prompt.fullaccess  command.execute
```

## Viewer-grant-only examples

| Scope | Typical use |
|-------|-------------|
| `generation.create` | Create a multimodal generation task |
| `user.space.list` | List the viewer's Spaces |
| `user.session.list` | List the viewer's Sessions across Spaces |
| `user.taskrun.list` | List Task Runs owned by the viewer |
| `user.usage.read` | Read the viewer's activity |
| Other Space/admin scopes | Actions or reads outside the App's direct grant |

`allowedViewerScopes` is deprecated and no longer limits runtime consent. Viewer grants are still constrained by the viewer's current access to the selected Space.

## Pair operations correctly

| Operation | Needed |
|-----------|--------|
| Create generation | `generation.create` |
| Poll/read generation Task Run | `taskrun.view` |
| Send prompt | Matching `session.prompt.readonly` or `session.prompt.fullaccess` |
| Read prompt result | `session.view` |
| Realtime rooms / Work commerce | Published App runtime; no extra scope |

## Rules

1. Static Apps usually need no special scopes.
2. Request viewer grants only on a user gesture.
3. Every scope must map to a visible feature.
4. A grant for Space A does not authorize Space B.
5. Check `context().permissions.viewerGrants` for display; use `auth.request` to act.

---

[中文](../zh/cheatsheets/scopes.md)
