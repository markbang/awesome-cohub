---
id: cohub.ap.skill-assets-at-repo-root
title: Skill assets at repo root
type: anti-pattern
related: [cohub.cheat.skill-packaging]
---

# Skill assets at repo root

## Why it hurts

`npx skills add` copies `skills/<name>/`. Scripts and templates at the **repo root** never arrive; agents call missing paths.

## Do this instead

Keep scripts/templates/assets under `skills/<name>/…`. Smoke-test install into a temp dir and `find .agents/skills`.

## Smell test

README says `node scripts/foo.js` but install only has `SKILL.md`.

---

[中文](../zh/anti-patterns/skill-assets-at-repo-root.md)
