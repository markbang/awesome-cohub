---
title: Config layers in a sandbox
id: cohub.cheat.config-layers
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


## `.cohub` vs `.agents`（目录与优先级）

| 目录 | 路径 | 合并顺序（同名后者赢） |
|------|------|------------------------|
| Skills `/skill:` | `.agents/skills/` | platform → mods → user → project |
| 斜杠 `/name` | **`.agents/prompts/*.md`**（不在 `.cohub/`） | platform → mods → user → project |
| Models | **`.cohub/models.json`** | platform → user |
| Generations | `.cohub/generations/` | platform/user Save 发布 |
| Space 观感 | **`.cohub/space.json`**、**`.cohub/theme.css`** | **仅本 Space**（不走 catalog 合并） |
| Hooks | `.cohub/hooks/*` | 当前 Space；FS 忽略 `.cohub/**` |

config/platform Save 白名单：`AGENTS.md`、`CLAUDE.md`、`.agents/`、`.cohub/`。

深卡：[dot-cohub-layers](../concepts/dot-cohub-layers.md) · 实践卡 [dot-cohub-layers](../playbooks/dot-cohub-layers.md)

## Related
- `cohub.bp.user-config-and-rules`
- `cohub.concept.user-config-space`

## Skill catalog cache

- Redis TTL **24h** (`SKILLS_CACHE_TTL_SEC`)
- User/platform Save → immediate Redis SET via `publishSkillsCacheFromDir`
- Project/mod keys include revision hash (checkpoint meta)
- API: `GET /api/skills?spaceId=`
- Slash: `/skill:name` expanded in session prompt pipeline

## Prompt skill inclusion

```text
includeUserSkills = (actorUserId === space.ownerUserId)
```

Members still get platform + mod + project skills.

## Auth principal order (API bearer)

1. Execution grant (`COHUB_EXECUTION_TOKEN`)
2. Preview session (preview host)
3. Work session
4. Logto user session

Execution grant TTL **24h**; not refreshable like OIDC.

---

[English](../../cheatsheets/config-layers.md)
