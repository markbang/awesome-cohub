---
id: cohub.concept.task-browser
title: Task Browser 任务浏览器
type: concept
related:
  - cohub.concept.task-schedule
  - cohub.concept.direct-generation
  - cohub.bp.minimal-scopes
sources:
  - https://cohub.live/changelog（v2.26-v2.30）
  - https://github.com/talesofai/cohub/blob/main/docs/model-tasks.md
  - https://github.com/talesofai/cohub/blob/main/packages/sdk/docs/work-runtime-guide.md
---

# Task Browser 任务浏览器

**Task Browser** 是专门浏览和查看生成任务及其他 Task Run 的多模态任务界面。它以仓库管理的 Work 形式提供，替代 Chat 内的生成任务托盘，成为跟踪异步生成工作的主要入口。

## 两种常用权限范围

| 视图 | 所需权限 | 含义 |
|------|----------|------|
| **Mine** | viewer grant `user.taskrun.list` | 当前观众拥有的全部 Task Run，包括已无法访问的 Space 中的任务 |
| **Space / session** | 目标 Space 上的 `taskrun.view` | 该 Space 或 Session 中观众可见的 Task Run |

生成应用通常需要 `generation.create` 创建任务，并需要 `taskrun.view` 轮询或查看结果。创建任务不等于获得读取任务的权限。

## 运行时行为

- 浏览器按当前视图申请最小权限：Mine 使用账户级权限，Space/Session 使用对应 Space 的权限。
- `client.auth.requestSpace()` 让观众在一次授权流程中选择其他 Space；应用只知道被选中的 Space。
- 结果先从按身份隔离的本地缓存立即显示，再在后台静默刷新。
- 刷新失败时可以继续显示最后的缓存结果，而不是清空页面；在刷新成功前应将其视为可能过期。
- Session Chat 不再负责生成任务托盘；任务历史和详情应使用 Task Browser 或 `client.tasks` API。

## CLI 与 SDK

```bash
cohub tasks ls --json
cohub tasks get <task-run-id> --json
```

已发布 App 可以在拥有相应 grant 时使用 `client.tasks.list()` / `client.tasks.get()`。`client.generations.createAndWait()` 的轮询阶段同样需要 `taskrun.view`。

## 隐私边界

任务可见性遵循授权中的 Space 与观众身份。账户级 Mine 只暴露观众自己拥有的 Task Run，不会暴露所有 Space 的所有任务，也不会暴露其他用户的任务。已发布 App 只应申请它实际呈现的视图。

---

[English](../../concepts/task-browser.md)
