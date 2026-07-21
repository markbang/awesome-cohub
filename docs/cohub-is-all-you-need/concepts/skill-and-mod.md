---
id: cohub.concept.skill
title: Skill & Mod
title_zh: Skill 与 Mod
type: concept
---

# Skill & Mod

## Skill
Reusable Agent capability, often invoked as `/skill:name`.

Sources (merge order, later overrides same name):

1. **Platform** — `/configs/platform/.agents/skills`
2. **Mods** — `/mods/<slug>/.agents/skills`
3. **User config** — published from config Space → `/configs/user/.agents/skills`
4. **Workspace** — current Space `/workspace/.agents/skills`

User config is **not** “whatever is in Home”; it is the published tree from the Space named `config` after Save.

Installable packages should place assets under `skills/<name>/` so `npx skills add` copies them.

## Mod
Mount another Space read-only (typically `/mods/<slug>`) to bring shared skills/prompts/tooling without hand-copying.

## Practice
- Install skills per mission
- Prefer Mods for shared bases; prefer skills for operational procedures
