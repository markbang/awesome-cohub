---
id: cohub.concept.hooks
title: Space Hooks（空间钩子）
type: concept
related: [cohub.bp.space-hooks-automation, cohub.concept.task-schedule]
sources:
  - https://github.com/talesofai/cohub/blob/main/docs/space-hooks.md
  - https://cohub.live/changelog（v2.18）
---

# Space Hooks（空间钩子）

Space Hooks 是声明在 `.cohub/hooks/*` 下的文件化异步自动化（v1.103+）。一个文件对应一个 hook 身份，且必须恰好选择一个 `run` 或 `prompt` 行为。

## 事件

- `space.fs.changed`
- `space.workspace.ready`
- `session.turn.finalized`
- `checkpoint.created`
- `work.version.published`
- `task.updated`（v2.18）：Task Run 状态转换，携带任务标识符、状态、变更字段与错误

`task.updated` 会过滤 `space_hook` 任务及其创建的 `run_command` 子任务，避免钩子重新触发自身。

## 实践

- FS 匹配忽略 `.cohub/**`，防止自触发循环。
- 回合过滤器（`sessionIds`、`sources` 与可选标签过滤）和 `prompt.sessionId` 行为目标彼此独立。
- Hook 上下文通过精选的 `COHUB_HOOK_*` 环境变量提供；缺失的可选值为空字符串。
- 把 Hook 运行当作 Tasks，在终态检查，而不是轮询 Chat。

## 参见

- https://github.com/talesofai/cohub/blob/main/docs/space-hooks.md
- [Space Hooks 自动化](../../playbooks/space-hooks-automation.md)

---

[English](../../concepts/hooks.md)
