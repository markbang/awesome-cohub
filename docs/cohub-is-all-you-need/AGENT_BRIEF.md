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
Space (home) → Skills/tools (act) → Save (time) → App (share) → Fork (again)
```

- **Space** = unit of work (files + chats + runtime). Runtime is a cloud Sandbox by default, or a Local Runtime on a folder you control.
- **Checkpoint / Save** = unit of time (restore, fork, publish config).
- **App** = unit of sharing (public URL; older docs call it Work; not a private Sandbox link).

## Paths (do not invent)

| Path | Meaning | Writable? |
|------|---------|-----------|
| `/workspace` | Current Space project | yes |
| `/configs/user` | Owner personal-config publish (Home or config Space) | **no** |
| `/configs/platform` | Platform publish | **no** |
| `/mods/<slug>` | Mounted mod | **no** |
| `/workspace/.agents/skills/` | Project skills | yes |
| `/workspace/.cohub/apps.json` | Installed-App manifest for this Space | yes |
| `/configs/user/.agents/skills/` | Published user skills | **no** (edit Home / config Space + Save) |

Skill merge (same name → later wins):

```text
platform → mods → user config → workspace
```

## Identity

- Sandbox **execution token** ≠ browser login cookie story.
- App runtime uses `appScopes` plus per-Space viewer grants (legacy Work spellings remain as aliases) — request least privilege; `app.homeSpace` and invocation identify context, not authorization.
- Do not rebuild Cohub auth inside an App; use the platform session/SDK.

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
3. Treat **Home** as a junk drawer (it now publishes personal config)
4. Ship raw sandbox URL as the product  
5. `BrowserRouter` / history routes on static directory Apps
6. Broad scopes “just in case”  
7. Scheduled loops with state only in chat  
8. Skill scripts/assets only at repo root (install drops them)  
9. Bake live API data into static `dist/`  
10. Auth wall on first paint without a public shell
11. Writing the removed Board Node/Sequence wire shape, the old `frame` envelope, or Sketch blocks instead of the v3 document model and Board scripts
12. Passing secrets as App Action input or baking them into published artifacts

## Prefer

- Save before destructive autonomy; read diffs after  
- Scannable Save notes (`v0-landing-working`)  
- Minimal scopes + Work Kit patterns (App runtime)
- Semantic Board authoring with `boards apply` dry runs, `baseVersion`, and `mutationId` receipts
- Task Browser for asynchronous generation history
- App Center for installed-App state; Space Activity for bounded usage summaries
- App Actions (`.cohub/actions/`) for server-side work; keep action input free of secrets
- Webhooks (`on.event: webhook`) for external triggers; `uses:` runs an App Action from a hook
- Let the repeated-tool-call guard trigger reassessment instead of forcing a loop
- Disk state for loops (`runtime/state.json`, wiki log)  
- Cite playbooks by id (`cohub.bp.*`) when teaching humans  

## App presentation

- Pro/Max: hide public footer bar via UI or `--hide-cohub-bar` — [hide-cohub-bar](./playbooks/hide-cohub-bar.md)
- Apps can run as windows, overlays, embeds, or New Chat backgrounds; declare the surface with `<meta name="cohub:surface">` and claim hit regions with `requestConfigure()` — [work-presentation](./concepts/work-presentation.md)
- App previews can receive invocation context and expose only explicitly registered callable methods
- Prompt templates can opt into quick-action buttons; keep them under `.agents/prompts/`
- Apps published or installed in the Shell Space are trusted and skip consent; other Apps must call `client.auth.authorize()`

## Runtime choice

```bash
cohub runtime up -d --harness pi   # Local Runtime on a folder
cohub runtime status --json
cohub runtime logs --follow
```

- `cohub sandbox up` was removed in v2.51; do not script it.
- Harness (Pi / Codex) defines tool semantics; the machine is an implementation detail.
- Use `space.decision()` for structured judgments (`noul` / `choice` / `score`) instead of parsing prose.
- Run local-only when the work needs a private folder, local GPU, or hardware access; otherwise keep the cloud Sandbox.


## `.cohub` vs `.agents` (priority)

```text
skills & slash prompts: platform → mods → user → project   (later wins)
models: platform → user
space look: .cohub/space.json + theme.css (this Space only)
slash templates: .agents/prompts/*.md   (NOT .cohub/)
```

Deep: [dot-cohub-layers](./playbooks/dot-cohub-layers.md)

## Jump links

- [Learning path](./learning-path.md)
- [FAQ](./cheatsheets/faq-and-troubleshooting.md)
- [Paths & mounts](./cheatsheets/paths-and-mounts.md)
- [Skill packaging](./cheatsheets/skill-packaging.md)
- [Anti-patterns](./anti-patterns/)
- [Matrix](./matrix.md)

---

[中文](./zh/AGENT_BRIEF.md)
