---
id: cohub.cheat.scopes
title: Work scopes cheatsheet
type: cheatsheet
---

# Work scopes cheatsheet

## workScopes (publisher → Work)

Common direct grants (see current works guide for the live list):

| Scope | Typical use |
|-------|-------------|
| `space.view` | Read space config / identity |
| `file.view` | Read workspace files/tree |
| `session.view` | List/read sessions metadata the Work is allowed to |
| `taskrun.view` | Inspect task runs |

## allowedViewerScopes (Work may request)

| Scope | Typical use |
|-------|-------------|
| `session.prompt.readonly` | Limited prompt patterns |
| `session.prompt.fullaccess` | Full prompt power |
| `generation.create` | Multimodal generation |
| `user.space.list` | Viewer’s spaces list (account-level) |
| `user.session.list` | Viewer’s sessions across spaces |
| `user.usage.read` | Viewer usage aggregates |

`user.*` is **not** bound to the Work’s Space. Justify carefully.

## Rules

1. Static demos: start with **no** special scopes  
2. Never auth on load  
3. Every scope ↔ a visible UI feature  
4. Commerce does not imply prompt/generation scopes  

## See also
- Playbook: `cohub.bp.minimal-scopes`
- Works guide: https://github.com/talesofai/cohub/blob/main/docs/works-guide.md

---

[中文](../zh/cheatsheets/scopes.md)
