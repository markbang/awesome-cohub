---
id: cohub.cheat.config-layers
title: Config layers in a sandbox
type: cheatsheet
---

# Config layers in a sandbox

## Mounts (typical)

| Sandbox path | Source | Writable? |
|--------------|--------|-----------|
| `/workspace` | Current Space workspace | yes (project) |
| `/configs/user` | Owner published user config (`name=config` Space Saves) | **read-only** |
| `/configs/platform` | Platform config Space publish | **read-only** |
| `/mods/<slug>` | Mounted mod Space checkpoint/latest | **read-only** |
| `/public` | Space public share prefix | special |
| `/sessions` | Session artifacts (ro) | read-only |

Env:

```text
WORKSPACE_DIR=/workspace
USER_AGENTS_DIR=/configs/user/.agents
PLATFORM_AGENTS_DIR=/configs/platform/.agents
```

## Skill merge order (same name → later wins)

```text
platform → mods → user config → workspace (.agents/skills)
```

## Rules / AGENTS merge (prompt)

- User Context: published user `AGENTS.md` / `CLAUDE.md` from config
- Project Context: current `/workspace` AGENTS/CLAUDE
- Do not edit `/configs/user` to “fix” rules; edit the **config Space** and Save

## Publish trigger

| Space | On Save publishes? |
|-------|--------------------|
| `name === "config"` | Yes → `{platformConfigRoot}/users/{userId}` |
| Platform space id | Yes → `/configs/platform` |
| Home / project | Checkpoint only (no user-config publish) |

## Related
- `cohub.bp.user-config-and-rules`
- `cohub.concept.user-config-space`
