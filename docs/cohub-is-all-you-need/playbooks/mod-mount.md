---
id: cohub.bp.mod-mount
title: Mount Mods for shared tooling
type: playbook
audience: [builder, agent]
features: [mod, skill, space, sandbox]
difficulty: intermediate
related: [cohub.concept.skill, cohub.bp.agent-with-skills, cohub.bp.space-knowledge-base]
sources:
  - https://cohub.run/docs/workspace/spaces
  - https://cohub.run/docs/learn/core-concepts
  - https://cohub.run/changelog#v1.99
---

# Mount Mods for shared tooling

## When

Several Spaces should share the **same** skills, prompts, templates, or base tooling without copy-paste drift.

## Mod vs Skill

| | **Mod** | **Skill** |
|--|---------|-----------|
| What | Another Space mounted read-only | A reusable procedure package (`SKILL.md` + assets) |
| Path | typically `/mods/<slug>/…` | `.agents/skills/<name>/` or via Mod |
| Best for | Shared bases, kits, org tooling | Mission playbooks, ops runbooks |
| Mutation | Source Space owns writes | Edit in source / reinstall package |

**Rule:** Mod is distribution & mount; Skill is the unit the Agent follows.

## Outcome

- Mod appears under `/mods/<slug>` (or your mount slug)
- Agent can read mod files; skills/prompts from the mod show up when enabled
- Team knows: change the **source Space**, consumers remount/restart as needed

## Steps

1. Treat the provider Space as a product: stable slug, README, `AGENTS.md`, skills under its tree.
2. In the consumer Space → **Settings → Mods** → mount the provider Space with a clear slug (`work-kit`, `wgetx`, `context`).
3. Expect Sandbox **restart** after mod changes; don’t debug mid-restart.
4. Resolve real paths before use:
   ```bash
   ls /mods
   ls /mods/<slug>
   ```
5. Prefer Agent instructions like: “follow `/mods/<slug>/…/SKILL.md`” or rely on `/skill:` discovery if the mod contributes skills.
6. For installable public kits, you can still `npx skills add` **or** mount a Space that vendors the same tree — don’t double-maintain without a source of truth.
7. Copy-on-write only when you must diverge; otherwise fix upstream mod.

## Permissions note

Filtered file view can be enough for some mod setups; don’t assume every mount needs full unrestricted file power. Follow current product permission labels.

## Done when

- [ ] `/mods/<slug>` readable in consumer Sandbox
- [ ] One smoke Agent task used mod content successfully
- [ ] Owner of the mod Space is explicit

## Avoid

- Editing files under `/mods` in the consumer (read-only mental model)
- Mounting everything “just in case”
- Silent forks of mod trees with no upstream

---

[中文](../zh/playbooks/mod-mount.md)
