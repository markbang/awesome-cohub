---
id: cohub.concept.hooks
title: Space Hooks（空间钩子）
type: concept
related: [cohub.bp.space-hooks-automation, cohub.concept.task-schedule, cohub.concept.app-actions]
sources:
  - https://github.com/talesofai/cohub/blob/main/docs/space-hooks.md
  - https://cohub.live/changelog（v2.18、v2.46）
---

# Space Hooks（空间钩子）

Space Hooks 是声明在 `.cohub/hooks/*` 下的文件化异步自动化（v1.103+）。一个文件对应一个 hook 身份，且必须恰好选择一个 `run`、`prompt` 或 `uses`。

## 事件

- `space.fs.changed`
- `space.workspace.ready`
- `session.turn.finalized`
- `checkpoint.created`
- `app.version.published`
- `task.updated` — Task Run 状态转换，携带 task id/type/status、变更字段与错误
- `webhook`（v2.46）— 按文件名寻址的入站 HTTP 触发器

`task.updated` 会过滤 `space_hook` 任务及其 `run_command` 子任务，避免钩子重新触发自身。

## 动作

- `run` — 沙箱 shell 命令
- `prompt` — 后续会话 Prompt
- `uses`（v2.46）— 运行已发布的 **App Action**：`owner/space/app/action`，通过 `with` 传 JSON，并通过 stdin 投递

```yaml
schema: cohub.space-hook.v1
on:
  event: checkpoint.created
uses: alice/tools/mail-inbox/deliver
with:
  dir: inbox/mail
```

## Webhook 触发器（v2.46）

声明 `on.event: webhook` 的 hook 按文件名寻址，而不是广播：

```text
.cohub/hooks/mail.yml  ->  POST /api/spaces/:spaceId/webhooks/mail
```

- 可选 `on.secret`，通过 `x-cohub-webhook-secret` 或 `?secret=` 传递。
- JSON body（上限 64 KB）可通过 `COHUB_HOOK_WEBHOOK_BODY` 读取。
- 按 Space 限流；响应为 `{ taskRunId, hook, eventId }`。
- 本地 Sandbox 同样可用：hook 定义通过 provider-aware 的 Space FS facade 加载。

```bash
cohub spaces webhooks ls --json
cohub spaces webhooks url mail
cohub spaces webhooks trigger mail --body '{"messageId":"..."}'
```

## 实践

- FS 匹配忽略 `.cohub/**`，防止自触发循环。
- 回合过滤器（`sessionIds`、`sources` 与可选标签过滤）和 `prompt.sessionId` 行为目标彼此独立。
- Hook 上下文通过精选的 `COHUB_HOOK_*` 环境变量提供；缺失的可选值为空字符串。
- Hook 缓存会在 `space.workspace.ready` 与 `.cohub/hooks/**` 文件变更时失效；workspace 尚未就绪时不会把空结果当作“没有 hook”缓存。
- 把 Hook 运行当作 Tasks，在终态检查，而不是轮询 Chat。

## 参见

- https://github.com/talesofai/cohub/blob/main/docs/space-hooks.md
- [Space Hooks 自动化](../../playbooks/space-hooks-automation.md) · [App Actions](./app-actions.md)

---

[English](../../concepts/hooks.md)
