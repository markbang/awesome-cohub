---
id: cohub.bp.viewer-auth-user-scopes
title: App 观众授权与账户级权限
type: playbook
audience: [builder, agent-author]
features: [work, app, sdk, auth, scopes]
difficulty: advanced
related: [cohub.bp.minimal-scopes, cohub.bp.work-kit-product, cohub.concept.task-browser, cohub.concept.work-presentation]
sources:
  - https://github.com/talesofai/cohub/blob/main/docs/apps-guide.md
  - https://github.com/talesofai/cohub/blob/main/packages/sdk/docs/app-runtime-guide.md
  - https://cohub.live/docs/developers/sdk
---

# App 观众授权与账户级权限

## 何时使用

已发布 App 需要以观众身份操作、访问另一个 Space，或执行发布者不能直接授予 App home Space 的行为。

## 授权规则

- App scopes 是发布者的直接授权，只限 App home Space。
- Viewer grant 使用 `client.auth.request()` 或 `client.auth.requestSpace()`，必须从用户手势开始。
- 申请时和使用时，观众都必须在目标 Space 上拥有所申请的全部 Space 权限。
- Grant 按 Space 生效，有效期 14 天。撤销立即生效；静默复用不会恢复已撤销的 grant。
- `allowedViewerScopes` 是已弃用的兼容字段，不是当前允许列表边界。

## 请求方式

```js
const ctx = await client.context();

// 已知 Space；已有 grant 覆盖时会静默复用。
await client.auth.request({
  scopes: ["generation.create"],
  reason: "为这个操作生成图片。",
});

// 在同一次 consent 流程中让观众选择 Space。
const result = await client.auth.requestSpace({
  scopes: ["file.view", "session.view"],
  reason: "读取你选择的 Space。",
});
if (result.granted && result.space) {
  const space = client.space(result.space.id);
}
```

观众需要重新确认或选择其他 Space 时使用 `alwaysAsk: true`。展示 `ctx.permissions.viewerGrants` 不会打开授权对话框。

`ctx.app.homeSpace` 表示拥有 App 的 Space。`ctx.invocation?.spaceId` 表示当前调用承载的 Space，例如 New Chat 背景或 `desktop open`；这两个字段是上下文/来源信息，不是授权本身。旧的顶层 `ctx.space` 已弃用。

## Bridge 与 broker 模式

Bridge mode 是 Cohub iframe 的正常路径。独立 App 可以通过 App ID 或 owner/Space/App slug 三元组启用 broker mode，授权在弹窗中完成。Broker mode 中应先请求授权，再调用可能获取 token 的公开 SDK 接口，否则浏览器可能阻止第二个弹窗。

## 账户级权限

| Scope | 能力 |
|-------|------|
| `user.space.list` | `client.spaces.list()` |
| `user.session.list` | `client.user.listSessions()` |
| `user.taskrun.list` | 对观众自己拥有的 Task Run 使用无 scope 的 `client.tasks.list()` |
| `user.usage.read` | `client.user.getActivity()` |

这些权限只能由观众授权，不绑定 App home Space。列出 Space 或自己拥有的 Task Run，不会授予对该 Space 或其他用户数据的访问权。

## 权限组合

- `generation.create` 创建生成任务；读取或轮询需要 `taskrun.view`。
- `session.prompt.*` 发送 Prompt；读取结果回合需要 `session.view`。
- Space A 的 viewer grant 不会授权对 Space B 的同一调用。

## 完成标准

- [ ] 授权发生在有意义的用户操作之后
- [ ] consent reason 说明用户可见的操作
- [ ] 跨 Space 目标明确
- [ ] 将 403 判断为缺少或过期 grant，而不是隐藏重试

## 避免

- 首屏鉴权
- 在 iframe 里另做一套登录
- 把 token 中的 `viewerScopes` 当作权威授权状态
- 为 Space 内功能申请账户级权限

---

[English](../../playbooks/viewer-auth-and-user-scopes.md)
