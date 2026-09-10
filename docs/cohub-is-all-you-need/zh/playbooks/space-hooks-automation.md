---
id: cohub.bp.space-hooks-automation
title: 用 Space Hooks 与 webhook 做自动化
type: playbook
audience: [builder, agent]
features: [hooks, sandbox, chat, files, task, webhook]
difficulty: advanced
related: [cohub.bp.scheduled-loop, cohub.concept.hooks, cohub.concept.app-actions, cohub.concept.task-schedule]
sources:
  - https://github.com/talesofai/cohub/blob/main/docs/space-hooks.md
  - https://cohub.live/changelog（v1.103-v2.46）
---

# 用 Space Hooks 与 webhook 做自动化

## 何时使用

文件变更、Save、回合结束、App 版本发布、Task Run 状态变化或入站 HTTP 请求需要在 Space 内触发工作。

## 结果

- 在 `.cohub/hooks/*` 中声明自动化
- 事件匹配不会自触发循环
- webhook 端点按 hook 文件名寻址
- 运行以带有精选事件上下文的 Task 展示

## 步骤

1. 选择事件：
   ```text
   space.fs.changed
   space.workspace.ready
   session.turn.finalized
   checkpoint.created
   app.version.published
   task.updated
   webhook
   ```
2. 每个 hook 使用一个 YAML/JSON 文件，且必须恰好选择一个 `run`、`prompt` 或 `uses`：
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

## Webhook 触发器（v2.46）

声明 `on.event: webhook` 的 hook 会成为以文件名命名的端点：

```yaml
# .cohub/hooks/mail.yml  ->  POST /api/spaces/:spaceId/webhooks/mail
schema: cohub.space-hook.v1
on:
  event: webhook
  secret: wh_a1b2c3
uses: alice/tools/mail-inbox/deliver
```

```bash
# 外部服务调用
curl -X POST https://<api>/api/spaces/<spaceId>/webhooks/mail \
  -H 'content-type: application/json' \
  -H 'x-cohub-webhook-secret: wh_a1b2c3' \
  -d '{"messageId":"...","from":"..."}'

# 本地测试与端点发现
cohub spaces webhooks ls --json
cohub spaces webhooks url mail
cohub spaces webhooks trigger mail --body '{"messageId":"..."}'
```

JSON body（上限 64 KB）以 `COHUB_HOOK_WEBHOOK_BODY` 传入；响应为 `{ taskRunId, hook, eventId }`。Webhook 按 Space 限流。secret 可选，也可以通过 `?secret=` 传递。

## Task Run 钩子（v2.18）

`task.updated` 响应 Task Run 的 `pending` -> `running` -> `completed`/`failed` 状态转换，并提供 task id/type/status、变更字段与错误。可用它触发后续校验或通知，不必轮询生成或 Chat 状态。

## `uses`：运行 App Action（v2.46）

hook 也可以不执行 shell 或 prompt，而是运行已发布的 App Action：

```yaml
schema: cohub.space-hook.v1
on:
  event: checkpoint.created
uses: alice/tools/mail-inbox/deliver
with:
  dir: inbox/mail
```

`with` 中的 payload 会以 JSON 通过 stdin 投递给 Action。见 [App Actions](../concepts/app-actions.md)。

## 定时 Prompt 与 Hooks

| 机制 | 适合 |
|------|------|
| **Scheduled prompt** | 按时间重复 |
| **Space Hooks** | 领域事件、状态转换与入站 webhook |

## 完成标准

- [ ] Hook 文件位于 Space 工作区
- [ ] 真实事件产生一个预期 Task Run
- [ ] 过滤条件与行为目标彼此分离
- [ ] Webhook 端点可以响应，并在配置 secret 后拒绝错误或缺失的凭据
- [ ] 没有重试风暴或自触发循环

## 避免

- 无退出条件地修改匹配路径
- 把密钥放进 hook YAML，而不是 Space env（`on.secret` 是触发凭据，不是通用密钥存储）
- `task.updated` 已提供边界时仍轮询 Chat
- 用 Hooks 代替产品权限设计

---

[English](../../playbooks/space-hooks-automation.md)
