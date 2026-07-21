---
id: cohub.bp.skill-slash-discovery
title: Discover and invoke skills with /skill:
type: playbook
audience: [builder, agent]
features: [skill, chat, mod]
difficulty: starter
related: [cohub.bp.agent-with-skills, cohub.bp.mod-mount, cohub.concept.skill]
sources:
  - https://cohub.run/docs/workspace/chats
  - https://cohub.run/changelog#v1.97
---

# Discover and invoke skills with /skill:

## When

You need the Agent to load a **named capability** with its instructions/assets, not a vague “try to scrape/publish”.

## Outcome

- Skills visible from composer `/` menu
- Invocation via `/skill:name` expands on send (platform discovery; Redis-backed catalog)
- Agent executes against skill files that were actually installed/mounted

## Where skills come from

| Source | Typical location / mechanism |
|--------|-------------------------------|
| Project / Space | workspace `.agents/skills/<name>/` |
| User config | user-level skills (host-dependent) |
| Platform | built-in Cohub skills |
| Mod | skills shipped by mounted Spaces |

`npx skills add … --copy` installs into agent/project skill dirs so composer/CLI can see them.

## Steps

1. Install or mount only mission skills (see `agent-with-skills` + `mod-mount`).
2. In Chat composer type `/` → browse categories → pick a skill, or type `/skill:wgetx`.
3. Confirm assets exist (scripts/template **inside** the skill folder). Missing assets ⇒ bad package layout.
4. Give a tight mission after the skill token (“hot 5 only”, “publish dist with file.view only”).
5. For headless ops, CLI/SDK may list skills (`skills.list` / `cohub` skill workflows) — still keep files as source of truth.
6. If a skill doesn’t appear: remount mod / reinstall / restart sandbox / check name slug.

## Authoring reminder

Skill packages for `npx skills add` must look like:

```text
skills/<name>/
  SKILL.md
  scripts/… or template/…   # bundled assets
```

Root-level `scripts/` next to `skills/` will **not** install.

## Done when

- [ ] `/skill:name` resolves in composer (or explicit path fallback works)
- [ ] Smoke action succeeded using skill assets
- [ ] No mystery duplicate skill names

## Example: web search on every Space

Account-wide web search → put **hyper-search** in config Space (see [search-layers](./search-layers.md)), not only in one project.

## Avoid

- Pasting entire SKILL.md into every prompt instead of invoking it
- Relying on skill names that never shipped to the Space
- Dumping 30 skills then wondering why the Agent flails

---

[中文](../zh/playbooks/skill-slash-discovery.md)
