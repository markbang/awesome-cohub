---
id: cohub.concept.skill
title: Skill & Mod
title_zh: Skill 与 Mod
type: concept
---

# Skill & Mod

## Skill
Reusable Agent capability, often invoked as `/skill:name`. Sources: Space, user config, platform, or mounted Mods.

Installable packages should place assets under `skills/<name>/` so `npx skills add` copies them.

## Mod
Mount another Space read-only (typically `/mods/<slug>`) to bring shared skills/prompts/tooling without hand-copying.

## Practice
- Install skills per mission
- Prefer Mods for shared bases; prefer skills for operational procedures
