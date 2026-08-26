---
id: cohub.meta.glossary
title: Glossary
type: guide
---

# Glossary

Bilingual terms. Deep dives link to concept cards.

| Term | 中文 | Meaning | Concept |
|------|------|---------|---------|
| **Space** | 空间 | Durable project container: files, chats, sandbox, settings | [space](./concepts/space.md) |
| **Home Space** | 主空间 | Personal default Space; not a substitute for `config` | [home-space](./concepts/home-space.md) |
| **config Space** | 配置空间 | Space with `name === "config"`; Save publishes to `/configs/user` | [user-config-space](./concepts/user-config-space.md) |
| **platform config** | 平台配置 | Operator-level defaults published to `/configs/platform` | [platform-config](./concepts/platform-config.md) |
| **Chat / Session** | 对话 / 会话 | Agent thread inside a Space | [chat](./concepts/chat.md) |
| **Sessions inbox** | 会话收件箱 | Cross-space session surface under `/sessions` | [sessions-inbox](./concepts/sessions-inbox.md) |
| **Save / Checkpoint** | 存档 | Point-in-time snapshot; restore, fork, publish | [save](./concepts/save.md) |
| **Fork / Proposal** | 分叉 / 提案 | Explore from a Save; optional propose-back | playbook fork-and-proposal |
| **Work / App** | 作品 / 应用 | Public share unit (`file` / `directory` / `port`); App is the canonical SDK/API term since v2.26 | [work](./concepts/work.md) |
| **Skill** | 技能 | Agent instruction (+ optional scripts) invokable via `/skill:` | [skill-and-mod](./concepts/skill-and-mod.md) |
| **Mod** | 模组 | Mounted Space toolkit under `/mods/<slug>` | [skill-and-mod](./concepts/skill-and-mod.md) |
| **Hook** | 钩子 | Event automation under `.cohub/hooks` | [hooks](./concepts/hooks.md) |
| **Task / Schedule** | 任务 / 定时 | Runnable jobs and recurring prompts | [task-and-schedule](./concepts/task-and-schedule.md) |
| **Task Browser** | 任务浏览器 | Dedicated surface for Task Run history, generation results, and scope-aware views | [task-browser](./concepts/task-browser.md) |
| **Direct Generation** | 直接生成 | Create-mode multimodal turn with timeline ordering and cost state | [direct-generation](./concepts/direct-generation.md) |
| **Channel** | 渠道 | External messaging surface (Discord / Feishu / …) | [channel](./concepts/channel.md) |
| **Sandbox** | 沙箱 | Isolated runtime for the Space agent | [sandbox](./concepts/sandbox.md) |
| **Execution token** | 执行令牌 | Runtime identity for sandbox/API calls | [execution-token](./concepts/execution-token.md) |
| **Scopes** | 权限范围 | `appScopes` plus per-Space viewer grants (`workScopes` / `viewerScopes` are legacy aliases) | [scopes cheatsheet](./cheatsheets/scopes.md) |
| **Labels** | 标签 | Lightweight organization metadata | [labels](./concepts/labels.md) |
| **Commerce** | 商业化 | Paid features/credits inside Works | [commerce](./concepts/commerce.md) |
| **Board Item** | Board 项 | Semantic Board element replacing the legacy wire-level Node | [board-semantic-authoring](./concepts/board-semantic-authoring.md) |
| **Composition** | 组合动画 | Atomic Board timeline of tracks, keyframes, clips, and markers | [board-semantic-authoring](./concepts/board-semantic-authoring.md) |
| **Promotion** | 推广 | Immutable Work link with aggregate attribution and funnel stats | [work-promotions](./playbooks/work-promotions.md) |
| **Search layers** | 搜索分层 | Product vs workspace vs web | [search-layers](./concepts/search-layers.md) |

| **`.cohub/`** | `.cohub/` | Platform-facing Space config: models, generations, space.json theme/background, hooks | [dot-cohub-layers](./concepts/dot-cohub-layers.md) |
| **`.agents/prompts`** | 斜杠模板 | Slash `/name` templates (not under `.cohub/`) | [dot-cohub-layers](./concepts/dot-cohub-layers.md) |

## Short principles

- Space = work · Save = time · Work = share  
- config ≠ Home  
- `/configs/*` is published output, not a live editable mount  

---

[中文](./zh/glossary.md)
