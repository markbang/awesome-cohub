---
id: cohub.concept.dot-cohub-layers
title: ".cohub layers & priority"
type: concept
related:
  - cohub.concept.user-config-space
  - cohub.concept.platform-config
  - cohub.bp.user-config-and-rules
  - cohub.bp.platform-config
  - cohub.bp.space-hooks-automation
  - cohub.cheat.config-layers
sources:
  - apps/worker/src/config-publish.ts
  - apps/worker/src/tasks/save-checkpoint-task.ts
  - apps/worker/src/prompt-templates.ts
  - apps/worker/src/skills.ts
  - apps/api/src/lib/channel-model-config.ts
  - packages/protocol/src/space-config.ts
  - packages/protocol/src/space-style.ts
  - https://cohub.run/changelog
---

# `.cohub` layers & priority

`.cohub/` is **platform-facing Space config** (presentation, hooks, published models/generations).  
**Slash prompt templates** live under **`.agents/prompts/`**, not under `.cohub/`.  
Both participate in layered merge — and **priority is intentional**.

## Two trees (do not confuse)

| Tree | Typical job | Publish on config/platform Save? |
|------|-------------|----------------------------------|
| **`.cohub/`** | Space presentation, hooks, models/generations catalogs | **Yes** (whitelist with `AGENTS.md`, `.agents/`) |
| **`.agents/`** | Skills, **prompt templates** (slash `/name`), agent extras | **Yes** |

Config / platform Save whitelist:

```text
AGENTS.md
CLAUDE.md
.agents/
.cohub/
```

## Where each capability lives

### Platform layer (`PLATFORM_SPACE_ID` Save → `/configs/platform`)

| Path | Effect |
|------|--------|
| `.cohub/models.json` | Environment model catalog (Redis cache) |
| `.cohub/generations/` | Generation declarations |
| `.cohub/explore.json` (etc.) | Other platform readers |
| `.agents/skills/` | Platform skills |
| `.agents/prompts/*.md` | Platform slash templates |

### User layer (`name === "config"` Save → `/configs/user`)

| Path | Effect |
|------|--------|
| `.cohub/models.json` | **Owner** model overrides / catalog merge |
| `.cohub/generations/` | User generation declarations |
| `.agents/skills/` | Personal skills (owner path) |
| `.agents/prompts/*.md` | Personal slash templates |
| `AGENTS.md` | User Rules |

### Project / ordinary Space (`/workspace` — no user-config publish)

| Path | Effect |
|------|--------|
| **`.cohub/space.json`** | Space presentation, e.g. **new chat background** payloads |
| **`.cohub/theme.css`** | Space custom theme CSS |
| **`.cohub/hooks/*`** | Space Hooks automation |
| `.cohub/system/…` | Platform bookkeeping (e.g. checkpoint meta) — not for hand-editing |
| `.agents/skills/` | Project skills |
| `.agents/prompts/*.md` | Project slash templates |

Putting `models.json` only in a random project Space does **not** publish account-wide models. Models that follow you require **config** (or platform) Save.

## Priority (merge order)

Shared pattern for catalogs that merge by name: **later wins**.

### Skills (`/skill:`)

```text
platform → mods → user config → project workspace
```

### Slash prompt templates (`/name`, not `/skill:`)

Same order (worker `fetchPromptTemplates`):

```text
platform → mods → user → project
```

- Files: **`.agents/prompts/<name>.md`**
- Expansion: leading `/foo` (not `/skill:…`) loads template `foo`
- Body supports `$1`, `$@` / `$ARGUMENTS` style arg substitution

### Models

```text
platform (.cohub/models.json) → user (.cohub/models.json)
```

`mergeModelsConfigs(platform, user)` — user layer overrides / extends platform.  
No project-workspace models path in this catalog loader.

### Presentation (theme / new chat background)

**Per Space**, from that Space’s workspace (not the merge stack above):

- `.cohub/space.json` — backgrounds and related presentation payloads  
- `.cohub/theme.css` — custom theme CSS  

These do not replace the account **appearance** theme picker; they style **this Space**.

### Hooks

- `.cohub/hooks/*` on the **current** Space  
- FS match ignores `.cohub/**` to avoid self-trigger loops  

## Mental model

```text
                    ┌─ platform  ── .cohub/models.json + .agents/*
 merge catalogs ───┼─ mods       ── mounted .agents/* (skills/prompts)
                    ├─ user      ── config Space Save → /configs/user
                    └─ project   ── /workspace .agents/* (+ .cohub presentation)

 ordinary Space only (no global publish):
   .cohub/space.json   → new chat background, etc.
   .cohub/theme.css    → space theme
   .cohub/hooks/*      → automation
```

## Practice

1. **Personal models / default prompts / skills** → Space `name=config` → edit → **Save**.  
2. **This product’s slash recipes** → project `.agents/prompts/*.md`.  
3. **This product’s look** → project `.cohub/space.json` / `theme.css`.  
4. **Team shared tooling** → Mod mount, not copy-paste into every config.  
5. Never “fix” live mounts under `/configs/user` or `/configs/platform`; edit source Space + Save.

## See also

- Playbook: [dot-cohub-layers](../playbooks/dot-cohub-layers.md)  
- [user-config-space](./user-config-space.md) · [platform-config](./platform-config.md)  
- [config-layers cheatsheet](../cheatsheets/config-layers.md)  
- [space-hooks-automation](../playbooks/space-hooks-automation.md)  

---

[中文](../zh/concepts/dot-cohub-layers.md)
