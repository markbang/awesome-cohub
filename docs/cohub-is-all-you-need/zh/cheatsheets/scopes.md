---
id: cohub.cheat.scopes
title: App 与 viewer scopes 速查
type: cheatsheet
---

# App 与 viewer scopes 速查

## App 直接权限

发布者在发布时提供，只作用于 App 自己所在的 Space：

```text
space.view  session.view  file.view  file.edit
taskrun.view  session.prompt.readonly  session.prompt.fullaccess  command.execute
```

## 只能由观众授权的例子

| Scope | 常见用途 |
|-------|----------|
| `generation.create` | 创建多模态生成任务 |
| `user.space.list` | 列出观众的 Spaces |
| `user.session.list` | 跨 Space 列出观众的 Sessions |
| `user.taskrun.list` | 列出观众拥有的 Task Run |
| `user.usage.read` | 读取观众活动 |
| 其他 Space/管理权限 | 直接授权之外的读操作或行为 |

`allowedViewerScopes` 已弃用，不再限制运行时 consent。Viewer grant 仍受观众在所选 Space 上当前权限约束。

## 正确组合操作

| 操作 | 所需权限 |
|------|----------|
| 创建生成 | `generation.create` |
| 轮询/读取生成 Task Run | `taskrun.view` |
| 发送 Prompt | 匹配的 `session.prompt.readonly` 或 `session.prompt.fullaccess` |
| 读取 Prompt 结果 | `session.view` |
| 实时房间 / Work 商业化 | 已发布 App 运行时；无需额外权限 |

## 规则

1. 静态 App 通常不需要特殊权限。
2. 只在用户手势后申请 viewer grant。
3. 每个权限必须对应可见功能。
4. Space A 的 grant 不会授权 Space B。
5. 用 `context().permissions.viewerGrants` 展示状态；用 `auth.request` 执行申请。

---

[English](../../cheatsheets/scopes.md)
