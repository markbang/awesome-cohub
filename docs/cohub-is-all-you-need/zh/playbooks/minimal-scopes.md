---
id: cohub.bp.minimal-scopes
title: 以最小权限发布 Work App
type: playbook
audience: [builder, agent]
features: [work, app, scopes, sdk]
difficulty: intermediate
related:
  - cohub.concept.work
  - cohub.concept.task-browser
  - cohub.bp.publish-static-work
  - cohub.bp.work-kit-product
  - cohub.bp.viewer-auth-user-scopes
sources:
  - https://cohub.live/docs/create/works
  - https://github.com/talesofai/cohub/blob/main/docs/works-guide.md
  - https://github.com/talesofai/cohub/blob/main/packages/sdk/docs/work-runtime-guide.md
---

# 以最小权限发布 Work App

## 当前模型

面向用户的产品仍称已发布界面为 **Work**；SDK/API 的规范术语是 **App**（`client.apps`、`appScopes`）。

| 授权来源 | 提供者 | 权限边界 |
|----------|--------|----------|
| **App scopes** | 发布者在发布时提供 | App 自己所在 Space 的有限直接授权 |
| **Viewer grant** | 观众在运行时授权流程中提供 | 观众当前拥有权限的任意被选 Space |

`allowedViewerScopes` 已弃用，不再限制观众可以请求的内容。只有维护旧 payload 时保留它；新 App 不应以它作为设计基础。

直接 App scopes 仅限：

```text
space.view  session.view  file.view  file.edit
taskrun.view  session.prompt.readonly  session.prompt.fullaccess  command.execute
```

`generation.create`、账户级 `user.*` 与其他管理权限必须由观众授权。`taskrun.view` 与 `generation.create` 相互独立：生成 App 需要创建权限，也需要轮询返回 Task Run 的权限。

## 步骤

1. 列出 App 真正实现的功能。
2. 为每项功能映射最小 App scope 或用户手势后的 viewer grant。
3. 只发布 App 自己所在 Space 的读取所需直接权限。
4. 只有在明确用户手势后申请操作或跨 Space 权限，并说明 `reason`。
5. 尽可能使用全新观众账号复测。grant 按 Space 生效，有效期 14 天，并会按当前成员关系/角色重新校验。
6. 从 `client.context().permissions` 渲染当前授权状态，不要另建一套 grant 缓存。

## 常见组合

| App 类型 | 直接 App scopes | 运行时 viewer grant |
|----------|-----------------|----------------------|
| 静态站点 | 无 | 无 |
| 文件阅读器 | `space.view`、`file.view` | 无 |
| 自有 Space 上的 LLM Chat | `space.view`、`session.view` | `session.prompt.fullaccess` 或 `readonly` |
| 图片生成 | `space.view`、`taskrun.view` | `generation.create` |
| Task Browser - Mine | 无或自有 Space 读取权限 | `user.taskrun.list` |
| 跨 Space 阅读器 | 按需配置自有 Space 权限 | `auth.requestSpace()` + `file.view` / `session.view` |

## 完成标准

- [ ] 每个授权都对应一个可见功能
- [ ] 首屏没有授权墙
- [ ] 生成创建与结果轮询都能工作
- [ ] 静态 App 不带 prompt、generation 或账户级权限

## 避免

- “以后可能用”就申请 `fullaccess` 或 `user.*`
- 把 `allowedViewerScopes` 当作当前安全边界
- 以为一个 Space 的 viewer grant 会转移到另一个 Space
- 不检查 API 调用就照搬另一个 App 的权限集

---

[English](../../playbooks/minimal-scopes.md)
