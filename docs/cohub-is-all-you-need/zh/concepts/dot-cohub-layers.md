---
id: cohub.concept.dot-cohub-layers
title: ".cohub 分层与优先级"
type: concept
---

# `.cohub` 分层与优先级

`.cohub/` 是**面向平台的 Space 配置**（呈现、hooks、发布后的 models/generations）。  
**斜杠 prompt 模板**在 **`.agents/prompts/`**，不在 `.cohub/`。  
两者都参与分层合并——**有优先级**。

## 两棵树（别混）

| 树 | 典型职责 | config/platform Save 会发布？ |
|----|----------|-------------------------------|
| **`.cohub/`** | 呈现、hooks、models/generations 目录 | **会**（与 `AGENTS.md`、`.agents/` 同白名单） |
| **`.agents/`** | Skills、**prompt 模板**（`/name`）、agent 附件 | **会** |

## 能力放哪

### 平台层（`PLATFORM_SPACE_ID` Save → `/configs/platform`）

- `.cohub/models.json` — 环境模型目录  
- `.cohub/generations/` — 生成声明  
- `.agents/skills/`、`.agents/prompts/*.md`  

### 用户层（`name === "config"` Save → `/configs/user`）

- `.cohub/models.json` — **所有者**模型覆盖/合并  
- `.agents/prompts/*.md` — 个人斜杠模板  
- `.agents/skills/`、`AGENTS.md`  

### 项目 / 普通 Space（`/workspace`，不发 user-config）

- **`.cohub/space.json`** — 如 **new chat background**  
- **`.cohub/theme.css`** — Space 自定义主题 CSS  
- **`.cohub/hooks/*`** — Hooks  
- `.agents/skills/`、`.agents/prompts/*.md` — 仅本项目  

只在随便一个项目里放 `models.json` **不会**变成账号级模型；要跟着你走必须 **config**（或 platform）Save。

## 优先级（同名后者赢）

**Skills / 斜杠 prompts：**

```text
platform → mods → user (config) → project workspace
```

**Models：**

```text
platform → user
```

**Theme / new chat background：** 读**当前 Space** 的 `.cohub/space.json`、`.cohub/theme.css`（不走上面那条 catalog 合并）。

**Hooks：** 当前 Space 的 `.cohub/hooks/*`；FS 匹配忽略 `.cohub/**` 防自激。

## 心智图

```text
catalog 合并: platform → mods → user → project
普通 Space 本地: .cohub/space.json | theme.css | hooks
prompts 路径: .agents/prompts/*.md   （不是 .cohub/）
```

## 参见

- 实践卡：[dot-cohub-layers](../playbooks/dot-cohub-layers.md)  
- [user-config-space](./user-config-space.md) · [config-layers](../cheatsheets/config-layers.md)  

---

[English](../../concepts/dot-cohub-layers.md)
