---
id: cohub.concept.work-presentation
title: App 呈现、表面与运行时上下文
type: concept
related:
  - cohub.bp.hide-cohub-bar
  - cohub.concept.work
  - cohub.bp.viewer-auth-user-scopes
  - cohub.concept.realtime-rooms
sources:
  - https://cohub.live/changelog（v2.12-v2.70）
  - https://github.com/talesofai/cohub/blob/main/docs/product/en/developers/apps.md
  - https://github.com/talesofai/cohub/blob/main/docs/product/en/developers/apps.md
---

# App 呈现、表面与运行时上下文

已发布 App 可以作为公开页面、工作区窗口、New Chat 背景、Overlay 或嵌入 frame 运行。App 是 SDK/API 规范术语；本卡文件名与公开 `/w/` URL 保留 Work 以兼容旧链接。

## 呈现表面

| 表面 | 行为 |
|------|------|
| 公开页面 | Cohub 栏停靠在 App 上方（身份、浏览量、发布者、版本切换）；App 视口恰好等于观众所见 |
| 工作区窗口 | App 标签，版本变化后原位刷新；最近使用的标签保持挂载（默认 3 个） |
| New Chat 背景 | 显示时挂载一个紧凑的 Composer context chip |
| Overlay | 工作区之上、系统界面之下的透明无边框图层 |
| Embed | App 以 iframe 渲染另一个 App 的公开页面，并转发自身 shell 位置 |
| Desktop open | Agent 在发起请求的 Cohub 标签页打开 App 或文件 |

查询参数与 URL hash 会转发给嵌入的 Web/port App；`cohub_*` 参数由宿主保留。在允许的表面中，用户主动操作后可以使用剪贴板写入、全屏、Web Share 与指针锁定。

## 版本历史与来源（v2.50）

已发布 App 暴露不可变版本历史：

- 公开版本切换使用 `?cohub_v=<n>`；SDK 提供 `getBySlug(..., { version })` 与 `listPublicVersions()`。
- 每个版本都会深链到产出它的 Session 与 turn，并按 App 自身的 Space 校验，且受 `session.view` 约束。
- 发布时的原始 `meta.source` 不再输出；观众范围的响应从不共享缓存。

## Overlay 表面

```bash
cohub desktop open <app> --as overlay
cohub desktop open <app> --as overlay --call hud.ping --data '{"message":"Deploying..."}'
```

App 可以在发布时声明表面；工作区打开方式（Open 按钮、已安装 Apps、聊天链接、App 间导航）都会遵循它，`--as window` 可单次覆盖：

```html
<meta name="cohub:surface" content="overlay" />
```

`cohub.app.requestConfigure({ inputRegion, geometry })` 声明指针区域（`"none"`、`"all"` 或矩形）并可收缩 Overlay。区域只决定指针事件去处，不会裁剪绘制。App 必须自绘透明背景并声明 `<meta name="color-scheme" content="light dark">`，否则 Chromium 会画出不透明底色。避免 `backdrop-filter`。

同时最多挂载 8 个 Overlay；`cohub.app.requestClose()` 关闭自身，`Escape` 关闭全部。宿主把指针命中测试合并为每帧一次，矩形区域在指针离开后立即释放。

## 嵌入其他 App

```js
const embed = cohub.app.embed.attach(frame, {
  appId: context.app.id,
  shell: context.shell ?? null,
  onCloseRequest: () => frame.remove(),
});
cohub.app.onContextChanged((next) => embed.setShell(next.shell ?? null));
embed.dispose();
```

被嵌入 App 会收到 `context.shell`（`surface: "embed"`）与 `context.invocation.embedder`（`{ appId, slug }`），仅在宿主通过校验时设置。转发的 ID 是导航提示，不是授权输入。

## App 平台（v2.59）

在 **Shell Space** 中发布或安装的 App 是可信的：它们获得宿主同意，无需授权对话框即可运行。App 还可以：

- 用 `<meta name="cohub:file-handlers" content=".board" />` 声明文件处理器；安装时登记到 `.cohub/apps.json`，但不会替换已有默认，观众可在 **Open with...** 中修改默认。
- 通过 `cohub.app.runtime` 协议与 SDK `client.app.window`、`onBeforeClose`、`onDrop`、`onLaunch` 拥有自己的窗口（每个窗口一个文件；重复打开与重命名/移动也会触发）。
- 在发布或安装它的 Space 上无需对话框即可获得 `file.view` / `file.edit`，因此安装 App 是整个 Space 的信任决定。
- 跟随宿主外观与语言，并接收拖放或打开的 Cohub 资源。
- 用 `<meta name="cohub:devices">` 申请摄像头、麦克风与屏幕权限。

资源类 App（任务查看器、Checkpoint 浏览器、调度管理器、App 管理器）运行在共享 resource kit 之上的独立 App 标签页中。

## 运行时上下文

在已发布 App 内，`client.context()` 可以包含：

- App 身份与 `app.homeSpace`（拥有该 App 的 Space）
- viewer 与当前权限
- `invocation` 来源信息（`surface`、`source`、`spaceId`、`sessionId`、`turnId`、`toolCallId`）
- `shell` — 当前工作区位置（`space`、`session`、`turn`），`shell.surface` 说明 App 运行在哪

使用 `client.app.onContextChanged()` 响应登录、导航、调用与授权变化，而不是轮询。Invocation 与 shell 是来源信息，不是授权。

## 可调用界面

App 注册命名方法；Cohub 不提供任意 DOM 访问或脚本执行：

```ts
client.app.surface.handle("image.open", async (input, { commandId }) => {
  openImageStudio(input);
  return { accepted: true };
});
```

```bash
cohub desktop open <app> --call image.open --data '{"id":"hero"}'
```

调用只会路由到发起请求的前端实例，并且只接受来自获准 Cohub App origin 的请求。投递语义是 at-least-once。发起桌面已消失时，`cohub desktop open` 会快速失败并返回 `no_active_client`（接收窗口 10 秒；普通打开 30 秒，`--call` 10 分钟）。

## Cohub 外壳

Pro/Max 发布者可以用 `hideCohubBar` 或 `--hide-cohub-bar` / `--show-cohub-bar` 隐藏公开 Cohub 底栏。这只改变宿主呈现与分享元数据，不会替代 App 自己的导航。

---

[English](../../concepts/work-presentation.md)
