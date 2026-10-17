---
id: cohub.cheat.paths-mounts
title: Paths & mounts
type: cheatsheet
related: [cohub.cheat.config-layers]
---

# Paths & mounts

## Runtime map

The same layout applies in a cloud Sandbox and in a **Local Runtime** (v2.51+). A Local Runtime binds `/workspace` to a folder on your machine; `/configs/*` and `/mods/*` are still mounted by the host.


| Path | Source | Writable | Notes |
|------|--------|----------|-------|
| `/workspace` | Current Space files | **yes** | Project home (`WORKSPACE_DIR`) |
| `/workspace/.agents/skills/` | Project skills | yes | Highest precedence when names clash |
| `/configs/user` | Owner personal-config Saves (Home or config Space) | **no** | Published snapshot |
| `/configs/user/.agents/` | User skills/rules publish | **no** | `USER_AGENTS_DIR` |
| `/configs/platform` | Platform config publish | **no** | `PLATFORM_AGENTS_DIR` |
| `/mods/<slug>` | Mounted mod checkpoint | **no** | Shared toolkits |
| `/public` | Public share prefix | special | App/public assets |
| `/sessions` | Session artifacts | **no** | Inbox-related |

## Skill merge order

```text
platform → mods → user config → workspace
```

Same skill name → **later** wins.

## Where `npx skills add --copy` lands

```text
./.agents/skills/<skill-name>/SKILL.md
./.agents/skills/<skill-name>/…   # only files inside skills/<name>/ in the repo
```

- In a **project Space**: stays project-local until you copy elsewhere.  
- In the **Home Space** or a `name=config` Space: Save publishes whitelist → `/configs/user/.agents/skills/`.

## Config publish rule

```text
edit Home (or config) Space workspace  →  Save  →  appears under /configs/user
```

Home Space Save publishes `AGENTS.md`, `.agents/`, `.cohub/models.json`, and `.cohub/theme.css` as personal config (v2.66).

Never: `vim /configs/user/...` inside a random project as “the fix”.

## Knowledge layout (convention)

```text
/workspace/raw/
/workspace/wiki/index.md
/workspace/wiki/log.md
/workspace/runtime/          # optional agent state
```

## Related

- [config-layers](./config-layers.md)  
- [skill-packaging](./skill-packaging.md)  
- [user-config-space concept](../concepts/user-config-space.md)  

---

[中文](../zh/cheatsheets/paths-and-mounts.md)
