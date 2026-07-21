---
id: cohub.meta.agent-brief
title: Agent brief (one page)
type: guide
audience: [agent, builder]
---

# Agent brief — Cohub in one page

Load this when operating inside a Cohub sandbox. Prefer files over chat memory.

## Core loop

```text
Space (home) → Skills/tools (act) → Save (time) → Work (share) → Fork (again)
```

- **Space** = unit of work (files + chats + sandbox).
- **Checkpoint / Save** = unit of time (restore, fork, publish config).
- **Work** = unit of sharing (public URL; not a private sandbox link).

## Paths (do not invent)

| Path | Meaning | Writable? |
|------|---------|-----------|
| `/workspace` | Current Space project | yes |
| `/configs/user` | Owner **config** Space publish | **no** |
| `/configs/platform` | Platform publish | **no** |
| `/mods/<slug>` | Mounted mod | **no** |
| `/workspace/.agents/skills/` | Project skills | yes |
| `/configs/user/.agents/skills/` | Published user skills | **no** (edit config Space + Save) |

Skill merge (same name → later wins):

```text
platform → mods → user config → workspace
```

## Identity

- Sandbox **execution token** ≠ browser login cookie story.
- Work runtime uses scopes (`workScopes` / `viewerScopes`) — request least privilege.
- Do not rebuild Cohub auth inside a Work; use platform session/SDK.

## Knowledge habit

```text
raw/     evidence (immutable dumps)
wiki/    compounding understanding + index.md
log.md   append-only timeline
```

Update existing wiki pages; do not only append raw forever.

## Search layers

1. Product `/api/search` — Cohub resources  
2. Workspace files / wiki — project truth  
3. Web SERP — install **hyper-search** in **config** Space (then Save)

## Skill install truth

- Installable assets must live under `skills/<name>/` in a skill repo.
- `npx skills add … --copy` lands in `.agents/skills/<name>/`.
- Config skills need **Save** on the `name=config` Space to publish.

## Hard no

1. Chat-only “projects” with no files  
2. Edit `/configs/user` inside a random project sandbox  
3. Use **Home** as config or junk drawer  
4. Ship raw sandbox URL as the product  
5. `BrowserRouter` / history routes on static directory Works  
6. Broad scopes “just in case”  
7. Scheduled loops with state only in chat  
8. Skill scripts/assets only at repo root (install drops them)  
9. Bake live API data into static `dist/`  
10. Auth wall on first paint without a public shell  

## Prefer

- Save before destructive autonomy; read diffs after  
- Scannable Save notes (`v0-landing-working`)  
- Minimal scopes + Work Kit patterns  
- Disk state for loops (`runtime/state.json`, wiki log)  
- Cite playbooks by id (`cohub.bp.*`) when teaching humans  

## Work presentation

- Pro/Max: hide public footer bar via UI or `--hide-cohub-bar` — [hide-cohub-bar](./playbooks/hide-cohub-bar.md)

## Jump links

- [Learning path](./learning-path.md)
- [FAQ](./cheatsheets/faq-and-troubleshooting.md)
- [Paths & mounts](./cheatsheets/paths-and-mounts.md)
- [Skill packaging](./cheatsheets/skill-packaging.md)
- [Anti-patterns](./anti-patterns/)
- [Matrix](./matrix.md)

---

[中文](./zh/AGENT_BRIEF.md)
