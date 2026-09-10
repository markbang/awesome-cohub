---
id: cohub.concept.work-presentation
title: App 呈现、表面与运行时上下文
type: concept
related:
  - cohub.bp.hide-cohub-bar
  - cohub.concept.work
  - cohub.bp.viewer-auth-user-scopes
sources:
  - https://cohub.live/changelog（v2.12、v2.15、v2.24、v2.26、v2.35、v2.37、v2.39、v2.44-v2.46）
  - https://github.com/talesofai/cohub/blob/main/docs/apps-guide.md
  - https://github.com/talesofai/cohub/blob/main/packages/sdk/docs/app-runtime-guide.md
---

# App 呈现、表面与运行时上下文

已发布 App 可以作为公开页面、工作区窗口、New Chat 背景、Overlay 或嵌入 frame 运行。App 是 SDK/API 规范术语；本卡文件名与公开 `/w/` URL 保留 Work 以兼容旧链接。

## 呈现表面

| 表面 | 行为 |
|------|------|
| 公开页面 | 在 `/:username/:spaceSlug/w/:appSlug` 打开当前已发布 App |
| 工作区窗口 | 作为 App 标签打开，版本变化后原位刷新；最近使用的标签保持挂载（默认 3 个），切换标签时 runtime 状态不丢失 |
| New Chat 背景 | 显示时可以挂载一个紧凑的 Composer context chip |
| Overlay（v2.45） | 工作区之上、系统界面之下的透明无边框图层 |
| Embed（v2.44） | App 以 iframe 渲染另一个 App 的公开页面，并转发自身 shell 位置 |
| Desktop open | Agent 在发起请求的 Cohub 标签页打开 App 或文件 |

查询参数和 URL hash 会转发给嵌入的 Web/port App；`cohub_*` 参数由宿主保留。在允许的界面中，用户主动操作后可以使用剪贴板写入、全屏、Web Share 与指针锁定。

## Overlay 表面（v2.45）

Overlay 适合伙伴、HUD 与一次性特效：

```bash
cohub desktop open <app> --as overlay
cohub desktop open <app> --as overlay --call hud.ping --data '{"message":"Deploying..."}'
```

App 也可以在发布时声明表面；工作区打开方式（Open 按钮、已安装 Apps、聊天链接、App 间导航）都会遵循它，`--as window` 可以单次覆盖：

```html
<meta name="cohub:surface" content="overlay" />
```

App 自己控制命中区域与几何：

```js
const rect = panel.getBoundingClientRect();
cohub.app.requestConfigure({
  inputRegion: [{ x: rect.left, y: rect.top, width: rect.width, height: rect.height }],
});
```

- `inputRegion` 可以是 `"none"`（默认，完全穿透点击）、`"all"` 或 Overlay 本地 CSS 像素矩形。它只决定指针事件去处，不会裁剪 Overlay 的绘制内容。
- `geometry`（`anchor`、`x`、`y`、`width`、`height`）会收缩 Overlay；宿主会把它限制在屏幕内。
- App 必须自己绘制透明背景（`html, body { background: transparent }`）并声明 `<meta name="color-scheme" content="light dark">`，否则 Chromium 会画出不透明底色。避免 `backdrop-filter`。
- 同时最多挂载 8 个 Overlay；`cohub.app.requestClose()` 关闭自身，`Escape` 关闭全部。达到上限时会提示而不是静默退回窗口。

## 嵌入其他 App（v2.44）

App 可以用 iframe 托管其他 App；公开页面继续拥有被嵌入 App 的 runtime（bridge、consent、商业化）：

```js
const embed = cohub.app.embed.attach(frame, {
  appId: context.app.id,
  shell: context.shell ?? null,
  onCloseRequest: () => frame.remove(),
});
cohub.app.onContextChanged((next) => embed.setShell(next.shell ?? null));
embed.dispose();
```

被嵌入 App 会以 `context.shell` 收到转发位置，其 `surface` 为 `"embed"`，并通过 `context.invocation.embedder`（`{ appId, slug }`）得知宿主；只有嵌入页面通过校验时才会设置。转发的 ID 是导航提示，不是授权输入。任何 App 都可以用 `cohub.app.requestClose()` 请求宿主关闭。

## 运行时上下文

在已发布 App 内，`client.context()` 可以包含：

- App 身份与 `app.homeSpace`（拥有该 App 的 Space）
- viewer 与当前权限
- `invocation` 来源信息，如 `surface`（`"workspace"`、`"background"`、`"overlay"`、`"embed"`、`"page"`、`"broker"`）、`source`、`spaceId`、`sessionId`、`turnId` 与 `toolCallId`
- `shell`（v2.39+）— 当前工作区位置：`space`、`session` 与正在查看的 `turn`（都可能为 null），`shell.surface` 说明 App 运行在哪种表面

```js
const ctx = await client.context();
const spaceId =
  ctx.shell?.space?.id ?? ctx.invocation?.spaceId ?? ctx.app.homeSpace?.id;
```

使用 `client.app.onContextChanged()` 响应登录、调用、导航与授权变化，而不是轮询。Invocation 与 shell 是来源信息，不是授权本身：读取任何内容仍需 App 自己的 grant。

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
