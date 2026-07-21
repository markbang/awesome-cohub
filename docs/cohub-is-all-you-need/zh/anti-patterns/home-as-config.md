---
id: cohub.ap.home-as-config
title: 把 Home 当成 config Space
type: anti-pattern
related: [cohub.bp.user-config-and-rules, cohub.concept.user-config-space, cohub.concept.home-space]
---

# 把 Home 当成 config Space

## 伤害
Home Saves do **not** run `publishUserConfigFromWorkspace`. Personal skills/rules stay trapped in Home’s `/workspace` and won’t mount as `/configs/user` across Spaces.

## 正确做法
Use a Space with **`name === "config"`**, put `AGENTS.md` + `.agents/skills` there, **Save** to publish. Use Home only as landing/hub.

## Smell test
If `ls /configs/user/.agents/skills` in a project sandbox is empty after you “installed skills in Home”, you used the wrong Space.

---

[English](../../anti-patterns/home-as-config.md)
