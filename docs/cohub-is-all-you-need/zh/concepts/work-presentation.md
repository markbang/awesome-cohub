---
id: cohub.concept.work-presentation
title: App 呈现与运行时上下文
type: concept
related:
  - cohub.bp.hide-cohub-bar
  - cohub.concept.work
  - cohub.bp.viewer-auth-user-scopes
sources:
  - https://cohub.live/changelog（v2.12、v2.15、v2.24、v2.26、v2.35、v2.37）
  - https://github.com/talesofai/cohub/blob/main/docs/apps-guide.md
  - https://github.com/talesofai/cohub/blob/main/packages/sdk/docs/app-runtime-guide.md
---

# App 呈现与运行时上下文

已发布 App 可以作为公开页面、工作区预览、New Chat 背景或独立 broker 页面运行。App 是 SDK/API 规范术语；本卡文件名与公开 `/w/` URL 保留 Work 以兼容旧链接。

## 呈现界面

| 界面 | 行为 |
|------|------|
| 公开页面 | 在 `/:username/:spaceSlug/w/:appSlug` 打开当前已发布 App |
| 工作区预览 | 作为 `?window=app:<appId>` 标签打开，版本变化后原位刷新 |
| New Chat 背景 | 显示时可以挂载一个紧凑的 Composer context chip |
| Desktop open | Agent 在发起请求的 Cohub 标签页打开 App 或文件 |

查询参数和 URL hash 会转发给嵌入的 Web/port App；`cohub_*` 参数由宿主保留。在允许的界面中，用户主动操作后可以使用剪贴板写入、全屏、Web Share 与指针锁定。

## 运行时上下文（v2.35-v2.37）

在已发布 App 内，`client.context()` 可以包含：

- App 身份与 `app.homeSpace`（拥有该 App 的 Space）
- viewer 与当前权限
- invocation 来源信息，如 `surface`、`source`、`spaceId`、`sessionId`、`turnId` 与 `toolCallId`

New Chat 背景中的 `invocation.spaceId` 表示承载背景的 Space，可能不同于 `app.homeSpace.id`。旧的顶层 `context.space` 已弃用。Invocation 是来源信息，不是授权本身。

Bridge mode 是 Cohub iframe 的正常路径。独立页面可以用 App ID 或 owner/Space/App slug 三元组启用 broker mode；broker 通过弹窗获取运行时授权，但没有工作区导航桥。

## 可调用界面

App 注册命名方法；Cohub 不提供任意 DOM 访问或脚本执行：

```ts
client.app.surface.handle("image.open", async (input, { commandId }) => {
  openImageStudio(input);
  return { accepted: true };
});
```

Agent 调用已注册方法：

```bash
cohub desktop open <appId|url|app://...|username/space/app> \
  --call image.open --data '{"id":"hero"}'
```

调用只会路由到发起请求的前端实例，并且只接受来自获准 Cohub App origin 的请求。投递语义是 at-least-once，handler 应能承受重复调用。原生文件与 Board App 可以预览，但不提供可调用界面。

## Cohub 外壳

Pro/Max 发布者可以用 `hideCohubBar` 或 `--hide-cohub-bar` / `--show-cohub-bar` 隐藏公开 Cohub 底栏。这只改变宿主呈现与分享元数据，不会替代 App 自己的导航。

---

[English](../../concepts/work-presentation.md)
