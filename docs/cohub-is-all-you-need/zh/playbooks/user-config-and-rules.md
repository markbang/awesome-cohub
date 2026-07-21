---
id: cohub.bp.user-config-and-rules
title: 用 config Space 管理个人 Agent 默认配置
type: playbook
audience: [builder, agent]
features: [config-space, skills, agents-md, sandbox]
difficulty: intermediate
related: [cohub.concept.user-config-space, cohub.concept.home-space, cohub.bp.skill-slash-discovery, cohub.bp.mod-mount]
sources:
  - https://cohub.run/changelog (User Rules, owner-scoped user config)
  - apps/worker/src/config-publish.ts
  - apps/worker/src/tasks/save-checkpoint-task.ts
  - apps/agent/src/runtime/system-prompt-builder.ts
---

# 用 config Space 管理个人 Agent 默认配置

## 何时用

希望**个人** Agent 默认（规则、skills、prompts）跨 Space 生效，而不是每个项目重贴。

## 对照

| | **config Space** | **Home Space** | **Project Space** |
|--|-------------------|----------------|-------------------|
| Identity | `name === "config"` | often `slug=home` | your initiative name |
| Job | Publish owner agent config | Landing / light personal hub | Real product work |
| On Save | Whitelist → `/configs/user` | Normal checkpoint only | Normal checkpoint only |
| Sandbox view | Mounted **ro** into all spaces as `/configs/user` | Normal `/workspace` of Home | Normal `/workspace` |
| Uniqueness | **One per user** | One default home | Many |

If you put personal skills only in Home or a random project Space and never use a config Space Save publish path, they **won’t** become account-wide user config.

## 结果

- One Space named **`config`**
- `AGENTS.md` / `.agents/skills` / allowed `.cohub` bits live there
- After **Save**, other Spaces’ agents pick up User Context + user skills
- Settings → **User Rules** reflects published `AGENTS.md` (`GET /api/me/rules`)

## 发布白名单

Only these paths copy out of the config Space workspace on Save:

```text
AGENTS.md
CLAUDE.md
.agents/          # skills, prompts, agent extras
.cohub/           # models.json, generations, etc. as used by platform caches
```

Everything else in that Space is normal workspace content — **not** auto-published as user config.

## 步骤

1. 准备一个 **name 恰好为 `config`** 的 Space（不是随便起个像 config 的 slug）。一人仅一份。
2. 个人默认放这里：`AGENTS.md`、`.agents/skills/…`、需要的 `.cohub/…`。
3. User Rules 保持短而稳；**项目法**写在项目 Space 的 `AGENTS.md`。
4. 对 config Space **存档（Save）** → 触发用户配置发布。
5. 到任意项目沙箱检查 `/configs/user` 与 skills。
6. Chat 里确认 `/skill:` 与 User Rules 已生效。
7. 改配置 = 改 config Space 再 Save；不要在业务 Space 里改 `/configs/user`（只读）。

## 优先级（Agent）

When building system prompt / skills:

```text
platform  →  mods  →  user config  →  current workspace
```

- Skills with the same `name`: **later wins** (workspace overrides user overrides mod overrides platform).
- User Context (`AGENTS.md` from config) is applied as user-specific instructions when present.
- Project `AGENTS.md` remains project-specific context — use it for repo law, not personal taste dumps.

## 安全与协作

- Config publish is **owner-scoped**. Don’t treat `/configs/user` as a shared team wiki.
- Non-owner actors should not rely on seeing your personal skill paths; owner config is not a substitute for Mods when sharing with a team.
- No symlinks in published config (publish rejects them).
- Secrets: prefer Space **env** / secret surfaces; don’t park tokens in published `AGENTS.md`.

## 接口线索

```bash
# User Rules (published AGENTS.md)
# GET /api/me/rules → { content, updatedAt, source: "config-space", path: "/configs/user/AGENTS.md" }

# Sandbox env
# USER_AGENTS_DIR=/configs/user/.agents
# PLATFORM_AGENTS_DIR=/configs/platform/.agents
```

UI: Settings → **User Rules** edits/publishes personal rules from the config Space workflow.

## 完成标准

- [ ] Exactly one `name=config` Space
- [ ] Save on config Space succeeds without 409 duplicate-config
- [ ] `/configs/user/AGENTS.md` visible in a project sandbox after publish
- [ ] Personal skill appears in discovery and runs
- [ ] Project rules still live in project Space, not only in user config

## 推荐默认 skill

**Web search:** install [hyper-search](https://github.com/kjx-talesofai/claude-skill-hyper-search) into this config Space (not a random project), then Save:

```bash
npx skills add https://github.com/kjx-talesofai/claude-skill-hyper-search \
  --skill hyper-search --agent codex --yes --copy
```

See [search-layers](./search-layers.md).

## 别这样做

- Confusing **Home** with **config** (Home does not publish user config on Save)
- Putting team-shared kits only in user config (use **Mod** instead)
- Editing `/configs/user` inside a project sandbox (read-only mount)
- Giant User Rules that fight every project’s AGENTS.md
- Multiple Spaces named `config`


另见：[`.cohub` 分层与优先级](../concepts/dot-cohub-layers.md) · [实践卡](../playbooks/dot-cohub-layers.md)。

---

[English](../../playbooks/user-config-and-rules.md)
