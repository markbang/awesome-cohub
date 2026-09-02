---
id: cohub.bp.space-hooks-automation
title: 用 Space Hooks 做自动化
type: playbook
audience: [builder, agent]
features: [hooks, sandbox, chat, files, task]
difficulty: advanced
related: [cohub.bp.scheduled-loop, cohub.concept.hooks, cohub.concept.task-schedule]
sources:
  - https://github.com/talesofai/cohub/blob/main/docs/space-hooks.md
  - https://cohub.live/changelog（v1.103-v2.18）
---

# 用 Space Hooks 做自动化

## 何时使用

文件变更、Save、回合结束、App 版本发布或 Task Run 状态变化需要在 Space 内触发工作。

## 结果

- 在 `.cohub/hooks/*` 中声明自动化
- 事件匹配不会自触发循环
- 运行以带有精选事件上下文的 Task 展示

## 步骤

1. 选择事件：
   ```text
   space.fs.changed
   space.workspace.ready
   session.turn.finalized
   checkpoint.created
   work.version.published
   task.updated
   ```
2. 每个 hook 使用一个 YAML/JSON 文件，且必须恰好选择一个 `run` 或 `prompt`：
   ```yaml
   schema: cohub.space-hook.v1
   on:
     event: task.updated
   run: |
     echo "task=$COHUB_HOOK_TASK_ID status=$COHUB_HOOK_TASK_STATUS"
   ```
3. 在支持的位置使用 `paths`、`ignore`、`kinds`、`sessionIds`、`sources` 或标签过滤。`prompt.sessionId` 是行为目标，不是触发过滤器。
4. FS 匹配忽略 `.cohub/**`；`task.updated` 会过滤 `space_hook` 任务及其 `run_command` 子任务，避免再次进入自身。
5. 从 `COHUB_HOOK_*` 变量读取事件上下文。可选值缺失时为空字符串，路径和变更字段有上限。
6. 在 Tasks 界面验收生成的 Task Run。

## `task.updated` 载荷

v2.18 的事件响应 Task Run 的 `pending` -> `running` -> `completed`/`failed` 状态转换，并提供 task id/type/status、变更字段与错误。可用它触发后续校验或通知，不必轮询生成或 Chat 状态。

## 定时 Prompt 与 Hooks

| 机制 | 适合 |
|------|------|
| **Scheduled prompt** | 按时间重复 |
| **Space Hooks** | 领域事件与状态转换 |

## 完成标准

- [ ] Hook 文件位于 Space 工作区
- [ ] 真实事件产生一个预期 Task Run
- [ ] 过滤条件与行为目标彼此分离
- [ ] 没有重试风暴或自触发循环

## 避免

- 无退出条件地修改匹配路径
- 把密钥放进 hook YAML，而不是 Space env
- `task.updated` 已提供边界时仍轮询 Chat
- 用 Hooks 代替产品权限设计

---

[English](../../playbooks/space-hooks-automation.md)
