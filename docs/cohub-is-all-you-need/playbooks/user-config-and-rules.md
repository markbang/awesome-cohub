---
id: cohub.bp.user-config-and-rules
title: Own your agent defaults in Home or a config Space
type: playbook
audience: [builder, agent]
features: [config-space, skills, agents-md, sandbox]
difficulty: intermediate
related: [cohub.concept.user-config-space, cohub.concept.home-space, cohub.bp.skill-slash-discovery, cohub.bp.mod-mount]
sources:
  - https://cohub.live/changelog (User Rules, owner-scoped user config, v2.66 Home config)
  - apps/worker/src/config-publish.ts
  - apps/worker/src/tasks/save-checkpoint-task.ts
  - apps/agent/src/runtime/system-prompt-builder.ts
---

# Own your agent defaults in Home or a config Space

## When

You want **personal** Agent defaults (rules, skills, prompts) to follow you across Spaces — without pasting them into every project.

## Home vs config Space vs project

| | **Home Space** (v2.66+) | **config Space** | **Project Space** |
|--|------------------------|------------------|-------------------|
| Identity | often `slug=home` | `name === "config"` | your initiative name |
| Job | Personal config + landing | Personal config (legacy choice) | Real product work |
| On Save | Whitelist → `/configs/user` | Whitelist → `/configs/user` | Normal checkpoint only |
| Sandbox view | Home's own `/workspace`; published tree appears as `/configs/user` elsewhere | Same publish, `source: "config-space"` | Normal `/workspace` |
| Uniqueness | One per user | One per user (older setups) | Many |

Personal config publishes from **Home** (v2.66+) or a Space named `config`. Skills in a random project Space never become account-wide; an existing `name=config` Space stays ordinary, so choose one source.

## Outcome

- One personal-config Space: Home **or** a Space named **`config`** (not both)
- `AGENTS.md` / `.agents/skills` / allowed `.cohub` bits live there
- After **Save**, other Spaces’ agents pick up User Context + user skills
- Settings → **User Rules** reflects published `AGENTS.md` (`GET /api/me/rules`)

## What is published

Only these paths copy out of the config Space workspace on Save:

```text
AGENTS.md
CLAUDE.md
.agents/          # skills, prompts, agent extras
.cohub/           # models.json, generations, etc. as used by platform caches
```

Everything else in that Space is normal workspace content — **not** auto-published as user config.

## Steps

1. Pick your personal-config source: the **Home Space**, or one Space whose **name** is exactly `config` (not merely a slug that looks like config).
2. Put personal defaults there:
   ```text
   AGENTS.md                 # User Rules (global preferences)
   .agents/skills/<name>/    # personal skills
   .agents/...               # other agent files as supported
   .cohub/...                # optional user models/prompts/generations config
   ```
3. Prefer short, stable User Rules (style, languages, safety preferences). Put **project** law in the project Space’s `AGENTS.md`.
4. **Save** that Space. That triggers `publishUserConfigFromWorkspace`.
5. Open any project Space sandbox and verify:
   ```bash
   ls /configs/user
   ls /configs/user/.agents/skills
   test -f /configs/user/AGENTS.md && head -20 /configs/user/AGENTS.md
   ```
6. In Chat, confirm `/skill:` lists personal skills and the Agent follows User Rules without re-pasting them.
7. Iterate: edit config Space → Save again → new sessions/sandboxes see updates (existing mounts are read-only snapshots of published tree; expect refresh via new publish / sandbox lifecycle).

## Precedence

When building system prompt / skills:

```text
platform  →  mods  →  user config  →  current workspace
```

- Skills with the same `name`: **later wins** (workspace overrides user overrides mod overrides platform).
- User Context (`AGENTS.md` from config) is applied as user-specific instructions when present.
- Project `AGENTS.md` remains project-specific context — use it for repo law, not personal taste dumps.

## Security / collaboration

- Config publish is **owner-scoped**. Don’t treat `/configs/user` as a shared team wiki.
- Non-owner actors should not rely on seeing your personal skill paths; owner config is not a substitute for Mods when sharing with a team.
- No symlinks in published config (publish rejects them).
- Secrets: prefer Space **env** / secret surfaces; don’t park tokens in published `AGENTS.md`.

## CLI / API crumbs

```bash
# User Rules (published AGENTS.md)
# GET /api/me/rules → { content, updatedAt, source: "config-space", path: "/configs/user/AGENTS.md" }

# Sandbox env
# USER_AGENTS_DIR=/configs/user/.agents
# PLATFORM_AGENTS_DIR=/configs/platform/.agents
```

UI: Settings → **User Rules** edits/publishes personal rules from the Home or config workflow (`source` reports `home-space` or `config-space`).

## Done when

- [ ] Exactly one personal-config source (Home or `name=config`)
- [ ] Save succeeds without 409 duplicate-config
- [ ] `/configs/user/AGENTS.md` visible in a project sandbox after publish
- [ ] Personal skill appears in discovery and runs
- [ ] Project rules still live in project Space, not only in user config

## Recommended default skill

**Web search:** install [hyper-search](https://github.com/kjx-talesofai/claude-skill-hyper-search) into this config Space (not a random project), then Save:

```bash
npx skills add https://github.com/kjx-talesofai/claude-skill-hyper-search \
  --skill hyper-search --agent codex --yes --copy
```

See [search-layers](./search-layers.md).

## Avoid

- Assuming a `name=config` Space and Home share one config (they do not; pick one)
- Putting team-shared kits only in user config (use **Mod** instead)
- Editing `/configs/user` inside a project sandbox (read-only mount)
- Giant User Rules that fight every project’s AGENTS.md
- Multiple Spaces named `config`


Also: [`.cohub` layers & priority](../concepts/dot-cohub-layers.md) · [playbook](../playbooks/dot-cohub-layers.md).

---

[中文](../zh/playbooks/user-config-and-rules.md)
