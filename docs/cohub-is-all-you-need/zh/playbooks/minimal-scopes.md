---
id: cohub.bp.minimal-scopes
title: 以最小权限发布 App
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
  - https://cohub.live/docs/apps
  - https://github.com/talesofai/cohub/blob/main/docs/apps-guide.md
  - https://github.com/talesofai/cohub/blob/main/packages/sdk/docs/app-runtime-guide.md
---

# 以最小权限发布 App

## 当前模型

产品现在把已发布界面称为 **App**。`client.apps` 与 `appScopes` 是规范写法；旧客户端中的 `client.works` 与 `workScopes` 仍是兼容别名。

| 授权来源 | 提供者 | 权限边界 |
|----------|--------|----------|
| **App scopes** | 发布者在发布时提供 | App home Space 的有限直接授权 |
| **Viewer grant** | 观众在运行时 consent | 观众当前拥有权限的被选 Space |

`allowedViewerScopes` 已弃用，不再限制观众 consent。新设计不要把它当作安全边界。

直接 App scopes 仅限：

```text
space.view  session.view  file.view  file.edit
taskrun.view  session.prompt.readonly  session.prompt.fullaccess  command.execute
```

`generation.create`、账户级 `user.*` 与其他管理权限必须由观众授权。`generation.create` 也与 `taskrun.view` 分离：创建任务不等于可以轮询结果。

## 步骤

1. 列出 App 真正实现的功能。
2. 为每项功能映射最小直接 App scope 或用户手势后的 viewer grant。
3. 只发布 App home Space 读取所需的直接权限。
4. 只有在明确用户手势后申请操作或其他 Space，并提供有意义的 `reason`。
5. 使用全新观众账号复测。Grant 按 Space 生效，有效期 14 天，并按当前成员关系与角色重新校验。
6. 从 `client.context().permissions` 展示状态，让宿主负责 grant 缓存和续期。

## 常见组合

| App 类型 | 直接 App scopes | 运行时 viewer grant |
|----------|-----------------|----------------------|
| 静态站点 | 无 | 无 |
| 文件阅读器 | `space.view`、`file.view` | 无 |
| home Space 上的 LLM Chat | `space.view`、`session.view` | 匹配的 `session.prompt.*` |
| 图片生成 | `space.view`、`taskrun.view` | `generation.create` |
| Task Browser - Mine | 无或 home Space 读取权限 | `user.taskrun.list` |
| 跨 Space 阅读器 | 按需配置 home Space 权限 | `auth.requestSpace()` + `file.view` / `session.view` |

## 完成标准

- [ ] 每个 grant 都对应可见功能
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
