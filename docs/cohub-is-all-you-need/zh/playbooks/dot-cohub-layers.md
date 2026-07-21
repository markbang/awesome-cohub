---
id: cohub.bp.dot-cohub-layers
title: 按正确优先级配置 .cohub 与 .agents
type: playbook
---

# 按正确优先级配置 `.cohub` 与 `.agents`

## 何时

要配 models、斜杠 `/` 模板、Space 主题/背景或 hooks，且必须搞清**哪个 Space、哪个目录**会生效。

## 速查

| 目标 | 放哪 | 怎么生效 |
|------|------|----------|
| 账号级 models | `config` → `.cohub/models.json` | **Save** config |
| 环境级 models | platform → `.cohub/models.json` | **Save** platform |
| 个人 `/` 模板 | `config` → `.agents/prompts/*.md` | **Save** config |
| 项目 `/` 模板 | project → `.agents/prompts/*.md` | 工作区（按 revision 缓存） |
| Skills | `.agents/skills/<name>/` | config/platform 需 Save |
| New chat 背景 | project → `.cohub/space.json` | 本 Space 文件 |
| Space 主题 CSS | project → `.cohub/theme.css` | 本 Space 文件 |
| Hooks | project → `.cohub/hooks/*` | 本 Space 文件 |

**Skills / 斜杠 prompts 优先级：** `platform → mods → user → project`（同名后者赢）  
**Models：** `platform → user`  
**注意：** 模板在 **`.agents/prompts`**，不是 `.cohub/`。

## 步骤摘要

1. **个人 models + 默认 `/` 命令** → `name=config` 编辑 → Save → 其他 Space 验证 `/configs/user/...`  
2. **仅本项目的 `/ship`** → 项目 `.agents/prompts/ship.md`  
3. **本项目观感** → `.cohub/space.json` / `theme.css`  
4. **Hooks** → `.cohub/hooks/*.yml`（FS 忽略 `.cohub/**`）  

Prompt 文件名（去 `.md`）= 斜杠名；`/skill:name` 是另一条 skills 管道。

## 避免

- 在项目沙箱改 `/configs/user`  
- 指望项目里的 `.cohub/models.json` 变全局  
- 把斜杠模板塞进 `.cohub/`  
- 把 Home 当 config  

---

[English](../../playbooks/dot-cohub-layers.md)
