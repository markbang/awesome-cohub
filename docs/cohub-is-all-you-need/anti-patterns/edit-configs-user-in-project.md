---
id: cohub.ap.edit-configs-user-in-project
title: Editing /configs/user inside a project sandbox
type: anti-pattern
related: [cohub.bp.user-config-and-rules]
---

# Editing /configs/user inside a project sandbox

## Why it hurts
`/configs/user` is a **read-only** mount of published owner config. Edits don’t stick as the account source of truth; the next publish/remount overwrites mental models.

## Do this instead
Change the **config Space** workspace, then Save to re-publish.

## Smell test
If the path starts with `/configs/`, you’re on the published projection, not the editable source (unless you are inside the config Space’s `/workspace`).

---

[中文](../zh/anti-patterns/edit-configs-user-in-project.md)
