---
id: cohub.bp.dot-cohub-layers
title: Configure .cohub and .agents with the right priority
type: playbook
audience: [builder, operator, agent-author]
features: [cohub, agents, config-space, models, prompts, theme]
difficulty: intermediate
related:
  - cohub.concept.dot-cohub-layers
  - cohub.bp.user-config-and-rules
  - cohub.bp.platform-config
  - cohub.bp.skill-slash-discovery
  - cohub.bp.space-hooks-automation
sources:
  - apps/worker/src/tasks/save-checkpoint-task.ts
  - apps/worker/src/prompt-templates.ts
  - apps/worker/src/skills.ts
  - apps/api/src/lib/channel-model-config.ts
  - packages/protocol/src/space-config.ts
  - packages/protocol/src/space-style.ts
---

# Configure `.cohub` and `.agents` with the right priority

## When

You need models, slash `/` templates, Space theme/background, or hooks — and must know **which Space** and **which folder** actually win.

## Outcome

- Models you expect appear in the picker (platform ← user)  
- `/my-command` expands from the right prompt layer  
- Space background/theme apply from **this** Space’s `.cohub`  
- You stop putting prompts under `.cohub/` by mistake  

## Rules of thumb

| Goal | Put it here | Activate |
|------|-------------|----------|
| Account-wide models | `config` Space → `.cohub/models.json` | **Save** config |
| Env-wide models | platform Space → `.cohub/models.json` | **Save** platform |
| Personal slash templates | `config` → `.agents/prompts/*.md` | **Save** config |
| Project slash templates | project → `.agents/prompts/*.md` | live in workspace (cached by revision) |
| Skills | `.agents/skills/<name>/` (same layering) | Save if config/platform |
| New chat background | project → `.cohub/space.json` | files in that Space |
| Space theme CSS | project → `.cohub/theme.css` | files in that Space |
| Hooks | project → `.cohub/hooks/*` | files in that Space |

**Priority (skills & slash prompts):**  

```text
platform → mods → user (config) → project workspace
```

Same `name` → **later wins**.

**Models:**  

```text
platform → user
```

## Steps

### A. Personal models + default slash commands

1. Open the Space with **`name === "config"`** (not Home).  
2. Add or edit:
   ```text
   .cohub/models.json
   .agents/prompts/review.md      # → type /review in composer
   .agents/skills/...
   AGENTS.md
   ```
3. **Save**.  
4. In another Space (as owner), confirm models / `/review` / skills.  
5. Sandbox check:
   ```bash
   ls /configs/user/.cohub
   ls /configs/user/.agents/prompts
   ```

### B. Project-only slash recipe

1. In the **project** Space:
   ```text
   .agents/prompts/ship.md
   ```
2. Composer: `/ship …`  
3. Optional: project skill under `.agents/skills/`  
4. Do **not** expect this to appear for all your Spaces unless you also publish via config or a Mod.

### C. Theme / new chat background (ordinary Space)

1. In the Space you want styled:
   ```text
   .cohub/space.json    # background payloads (see product changelog)
   .cohub/theme.css     # optional custom CSS
   ```
2. Reload Chat / new chat surface; confirm background.  
3. This is **local to the Space**, not published as user config.

### D. Hooks

1. `.cohub/hooks/<name>.yml` in the project Space.  
2. FS triggers ignore `.cohub/**` (no self-loop).  
3. Prefer disk state for loops — see anti-pattern `loop-without-disk-state`.

## Prompt file shape

```markdown
---
description: Short help for the slash picker
argument-hint: optional hint
category: optional
---

Template body. Args: $1 $2 or $@ / $ARGUMENTS
```

Filename without `.md` is the slash name (`ship.md` → `/ship`).  
`/skill:name` is a **different** pipeline (skills), not prompt-templates.

## Done when

- [ ] You can name which layer provides a given model / `/command` / background  
- [ ] Config changes only stick after **Save** on config/platform  
- [ ] Project presentation files live under **that** Space’s `.cohub/`  

## Avoid

- Editing `/configs/user` inside a project sandbox  
- Expecting project `.cohub/models.json` to become global  
- Putting slash templates under `.cohub/` instead of `.agents/prompts/`  
- Using Home as config  

## See also

- Concept: [dot-cohub-layers](../concepts/dot-cohub-layers.md)  
- [user-config-and-rules](./user-config-and-rules.md) · [platform-config](./platform-config.md)  
- [skill-slash-discovery](./skill-slash-discovery.md)  

---

[中文](../zh/playbooks/dot-cohub-layers.md)
