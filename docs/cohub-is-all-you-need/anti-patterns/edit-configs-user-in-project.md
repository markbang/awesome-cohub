---
id: cohub.ap.edit-configs-user-in-project
title: Editing /configs/user inside a project sandbox
title_zh: 在项目沙箱里改 /configs/user
type: anti-pattern
related: [cohub.bp.user-config-and-rules]
---

# Editing /configs/user inside a project sandbox · 在项目沙箱里改 /configs/user

## Why it hurts · 伤害
`/configs/user` is a **read-only** mount of published owner config. Edits don’t stick as the account source of truth; the next publish/remount overwrites mental models.

## Do this instead · 正确做法
Change the **config Space** workspace, then Save to re-publish.

## Smell test
If the path starts with `/configs/`, you’re on the published projection, not the editable source (unless you are inside the config Space’s `/workspace`).
