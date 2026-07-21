---
id: cohub.concept.user-config-space
title: User config Space
type: concept
related: [cohub.concept.home-space, cohub.concept.skill, cohub.bp.user-config-and-rules]
sources:
  - apps/worker/src/config-publish.ts
  - apps/worker/src/tasks/save-checkpoint-task.ts
  - apps/api/src/routes/me.route.ts
  - apps/agent/src/runtime/system-prompt-builder.ts
  - apps/api/src/templates/sandbox-pod.ts
---

# User config Space

A **config Space** is the owner’s personal agent-configuration Space.

## How the platform recognizes it

- Space **`name === "config"`** (display name, not an arbitrary slug).
- On Save, if `space.name === "config"`, the worker runs **`publishUserConfigFromWorkspace`**.
- A user should have **at most one** config Space; saving when duplicates exist returns **409** (`multiple config spaces found for this user`).

This is **not** the same as:

| Surface | Role |
|---------|------|
| **Home Space** (`slug=home`) | Default landing / personal hub |
| **Project Space** | Product / experiment work |
| **Platform config** | Platform-owned Space id → `/configs/platform` |
| **Mod** | Another Space mounted read-only under `/mods/<slug>` |

## What gets published on Save

Whitelist only:

```text
AGENTS.md
CLAUDE.md
.agents/
.cohub/
```

Published to owner-scoped storage:

```text
{platformConfigRoot}/users/{userId}/
```

Mirrored into **every** sandbox (read-only) as:

```text
/configs/user/AGENTS.md
/configs/user/.agents/...
/configs/user/.cohub/...
```

Env in sandbox: `USER_AGENTS_DIR=/configs/user/.agents`.

## What it affects

1. **User Rules** — `AGENTS.md` content is injected into chat system context as *User Context* (API: `GET /api/me/rules`, `source: "config-space"`, path advertised as `/configs/user/AGENTS.md`).
2. **User skills** — `.agents/skills/**` published and merged into skill discovery (`/skill:`, agent skill list) at sandbox path `/configs/user/.agents/skills`.
3. **User prompts / models / generations** — under `.cohub/` / `.agents` as applicable; caches refresh from the published tree after Save.
4. **Layering** — agent prompt merge (later wins for skills by name):
   `platform → mods → user config → workspace (current Space)`.

## Mental model

```text
Edit in Space name "config"
  → Save (Checkpoint)
  → publish whitelist to /configs/users/{id}
  → all sandboxes mount /configs/user (ro)
  → Agents see User Context + user skills everywhere (owner path)
```

## See also

- Playbook: `cohub.bp.user-config-and-rules`
- Home: `cohub.concept.home-space` (different object)

---

[中文](../zh/concepts/user-config-space.md)
