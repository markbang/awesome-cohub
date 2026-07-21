---
id: cohub.ap.mega-skill-dump
title: Mega unused skill dump
title_zh: 一次装一堆用不到的 skill
type: anti-pattern
related: [cohub.bp.agent-with-skills]
---

# Mega unused skill dump · 一次装一堆用不到的 skill

## Why it hurts · 伤害
Noise in `/skill:` menus, larger blast radius, slower agents, accidental tool use.

## Do this instead · 正确做法
Install per mission; uninstall or ignore the rest. Prefer one sharp skill over five vague ones.

## Smell test
If the Agent must search a skill pile to start, the mission is under-specified.
