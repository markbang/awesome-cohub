---
id: cohub.concept.platform-config
title: Platform config
type: concept
related: [cohub.concept.user-config-space, cohub.bp.platform-config]
sources:
  - apps/worker/src/tasks/save-checkpoint-task.ts
  - apps/worker/src/config-publish.ts
  - apps/worker/src/config.ts (PLATFORM_SPACE_ID)
  - apps/api/src/templates/sandbox-pod.ts
---

# Platform config

**Platform config** is the account-global *operator* configuration layer shared by all Spaces in an environment.

## Identity

- Controlled by env **`PLATFORM_SPACE_ID`** (worker/API).
- When a checkpoint is saved on **that Space id**, worker runs `publishConfigFromWorkspace` → target **`/configs/platform`** (on the config volume).
- Whitelist (same shape as user config): `AGENTS.md`, `CLAUDE.md`, `.agents/`, `.cohub/`.

Not identified by `name === "config"` (that is **user** config). Platform is **id-pinned**.

## Sandbox projection

Every sandbox mounts (read-only):

```text
/configs/platform/.agents   # PLATFORM_AGENTS_DIR
```

(User layer mounts separately at `/configs/user/.agents`.)

## What it feeds

| Surface | Path under platform publish |
|---------|-----------------------------|
| Platform skills | `.agents/skills` → slash/API catalog scope `platform` |
| Platform prompts | prompts dirs under platform tree |
| Platform models | `.cohub/models.json` |
| Platform generations | `.cohub` generations declarations |
| Explore / other | e.g. `.cohub/explore.json` (API readers) |

## vs user config vs mods

| Layer | Trigger Space | Publish root | Audience |
|-------|---------------|--------------|----------|
| Platform | `PLATFORM_SPACE_ID` | `/configs/platform` | All users/spaces in env |
| User | `name === "config"` | `/configs/users/{userId}` → mount `/configs/user` | That owner |
| Mod | any mounted Space | checkpoint-cache `…/latest` → `/mods/<slug>` | Spaces that mount it |
| Workspace | current Space | no publish; live `/workspace` | That Space only |

## See also
- Playbook: `cohub.bp.platform-config`
- Cheat: `cohub.cheat.config-layers`

---

[中文](../zh/concepts/platform-config.md)
