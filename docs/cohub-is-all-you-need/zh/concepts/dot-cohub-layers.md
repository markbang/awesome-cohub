---
id: cohub.concept.dot-cohub-layers
title: ".cohub 分层与优先级"
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
  - docs/model-tasks.md
  - https://cohub.live/changelog
---

# `.cohub` 分层与优先级

`.cohub/` 是面向平台的 Space 配置（呈现、hooks、models/generations 与辅助任务）。**斜杠 Prompt 模板**位于 `.agents/prompts/`，不在 `.cohub/`。两棵树都可能随 config/platform Save 发布，但作用域不同。

## 两棵树

| 树 | 典型职责 | config/platform Save 会发布？ |
|----|----------|-------------------------------|
| **`.cohub/`** | Space 呈现、hooks、模型/生成目录与辅助任务 | 会 |
| **`.agents/`** | Skills、斜杠 Prompt 模板与 Agent 附件 | 会 |

白名单包括：

```text
AGENTS.md
CLAUDE.md
.agents/
.cohub/
```

## 能力放哪

### 平台层（`PLATFORM_SPACE_ID` Save -> `/configs/platform`）

- `.cohub/models.json` - 环境模型目录
- `.cohub/generations/` - 生成声明
- `.cohub/model-tasks.json` - session title、image-to-text 等辅助任务模型
- `.agents/skills/`、`.agents/prompts/*.md`

### 用户层（`name === "config"` Save -> `/configs/user`）

- `.cohub/models.json` - 所有者模型覆盖/合并
- `.cohub/generations/` - 用户生成声明
- `.cohub/model-tasks.json` - 用户对辅助任务的覆盖或禁用
- `.agents/skills/`、`.agents/prompts/*.md`、`AGENTS.md`

### 项目 / 普通 Space（`/workspace`）

- `.cohub/space.json` - 当前 Space 的呈现，如 new chat background
- `.cohub/theme.css` - 当前 Space 的主题 CSS
- `.cohub/hooks/*` - 当前 Space 的事件自动化
- `.agents/skills/`、`.agents/prompts/*.md` - 仅当前项目

在普通项目 Space 放 `models.json` 不会发布账户级模型；需要 config 或 platform Save。

## 优先级

同名 catalog 后者覆盖前者：

```text
skills / slash prompts: platform -> mods -> user (config) -> project workspace
models:                 platform -> user
```

主题、new chat background 与 hooks 不走上述 catalog 合并：它们读取当前 Space 的 `.cohub/space.json`、`.cohub/theme.css` 与 `.cohub/hooks/*`。FS 匹配忽略 `.cohub/**`，防止 hook 自触发。

## Prompt 上下文变量与辅助任务

`.agents/prompts/*.md` 可以使用系统变量：

```text
{{cohub.session.id}}
{{cohub.space.id}}
{{cohub.user.uuid}}
```

这些变量由 API 与 worker 的共享 Prompt 模板路径渲染。辅助任务在 `.cohub/model-tasks.json` 中声明；用户层可以覆盖平台模型或将任务的 `enabled` 设为 `false`。`imageToText` 必须使用支持图像输入的模型。

## 实践

1. 个人模型、默认 Prompt 与 skills：编辑 `name=config` Space，完成后 Save。
2. 项目斜杠配方：放在 `.agents/prompts/*.md`。
3. 当前 Space 的外观：使用 `.cohub/space.json` / `theme.css`。
4. 需要请求身份时使用 `{{cohub.*}}` 变量，不要把 ID 手工复制进模板。
5. 不要修改 `/configs/user` 或 `/configs/platform` 的只读挂载；回源 Space 编辑并 Save。

## 参见

- 实践卡：[dot-cohub-layers](../../playbooks/dot-cohub-layers.md)
- [user-config-space](./user-config-space.md) · [platform-config](./platform-config.md)
- [config-layers](../../cheatsheets/config-layers.md)
- [space-hooks-automation](../../playbooks/space-hooks-automation.md)

---

[English](../../concepts/dot-cohub-layers.md)
