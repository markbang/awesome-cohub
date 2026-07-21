---
id: cohub.ap.home-as-config
title: Using Home as user config
type: anti-pattern
related: [cohub.bp.user-config-and-rules, cohub.concept.user-config-space, cohub.concept.home-space]
---

# Using Home as user config

## Why it hurts
Home Saves do **not** run `publishUserConfigFromWorkspace`. Personal skills/rules stay trapped in Home’s `/workspace` and won’t mount as `/configs/user` across Spaces.

## Do this instead
Use a Space with **`name === "config"`**, put `AGENTS.md` + `.agents/skills` there, **Save** to publish. Use Home only as landing/hub.

## Smell test
If `ls /configs/user/.agents/skills` in a project sandbox is empty after you “installed skills in Home”, you used the wrong Space.

---

[中文](../zh/anti-patterns/home-as-config.md)
