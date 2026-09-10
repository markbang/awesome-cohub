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
  - https://cohub.live/changelog（v2.44-v2.45）
---

# App 观众授权与账户级权限

## 何时使用

已发布 App 需要以观众身份操作、访问另一个 Space，或执行发布者不能直接授予 App home Space 的行为。

## 授权规则

- App scopes 是发布者的直接授权，只限 App home Space。
- Viewer grant 使用 `client.auth.request()`、`client.auth.requestSpace()` 或 `client.auth.requestCreateSpace()`，必须从用户手势开始。
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

// 创建一个归观众所有的 Space，并在其上授予权限——始终弹出对话框。
// `space` 与 client.spaces.create() 使用相同的 CreateSpaceInput
//（空白 / git / checkpoint 引导）。
const created = await client.auth.requestCreateSpace({
  scopes: ["file.view", "session.view"],
  space: { name: "Trip planner" },
  reason: "为这个 App 的输出创建 Space。",
});
if (created.granted && created.space) {
  const space = client.space(created.space.id);
}
```

观众需要重新确认或选择其他 Space 时使用 `alwaysAsk: true`。`requestCreateSpace` 始终打开对话框；每次确认都会创建新 Space，由宿主使用观众账号创建。

`ctx.app.homeSpace` 表示拥有 App 的 Space，`ctx.shell` 携带当前工作区位置。`ctx.invocation?.spaceId` 表示当前调用承载的 Space，例如 New Chat 背景、Overlay 或 `desktop open`；这些字段是上下文/来源信息，不是授权本身。旧的顶层 `ctx.space` 已弃用。

## Bridge 与 broker 模式

Bridge mode 是 Cohub iframe 的正常路径。独立 App 可以通过 App ID 或 owner/Space/App slug 三元组启用 broker mode，授权在弹窗中完成。Broker mode 中应先请求授权，再调用可能获取 token 的公开 SDK 接口，否则浏览器可能阻止第二个弹窗。

## 账户级权限与操作

| 权限 / 操作 | 能力 |
|-------------|------|
| `user.space.list` | `client.spaces.list()` |
| `user.session.list` | `client.user.listSessions()` |
| `user.taskrun.list` | 对观众自己拥有的 Task Run 使用无 scope 的 `client.tasks.list()` |
| `user.usage.read` | `client.user.getActivity()` |
| `space.create`（action） | 用 `client.spaces.create()` 创建归观众所有的 Space |

这些权限只能由观众授权，不绑定 App home Space。列出 Space 或自己拥有的 Task Run，不会授予对该 Space 或其他用户数据的访问权。`space.create` 是账户级操作：App 拿到授权后可以直接创建归观众所有的 Space，也可以通过 `auth.requestCreateSpace()` 一次授权完成。创建 API 会拒绝委托主体（App、预览、执行），因此执行令牌永远无法凭空创建 Space。

## 权限组合

- `generation.create` 创建生成任务；读取或轮询需要 `taskrun.view`。
- `session.prompt.*` 发送 Prompt；读取结果回合需要 `session.view`。
- `space.create` 创建 Space；`auth.requestCreateSpace` 一并申请的权限决定 App 在新 Space 中能做什么。
- Space A 的 viewer grant 不会授权对 Space B 的同一调用。

## 完成标准

- [ ] 授权发生在有意义的用户操作之后
- [ ] consent reason 说明用户可见的操作
- [ ] 跨 Space 目标明确；新 Space 来自观众 consent
- [ ] 将 403 判断为缺少或过期 grant，而不是隐藏重试

## 避免

- 首屏鉴权
- 在 iframe 里另做一套登录
- 把 token 中的 `viewerScopes` 当作权威授权状态
- 为 Space 内功能申请账户级权限

---

[English](../../playbooks/viewer-auth-and-user-scopes.md)
