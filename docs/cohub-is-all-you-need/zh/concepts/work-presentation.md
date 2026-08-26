---
id: cohub.concept.work-presentation
title: Work 呈现与可调用界面
type: concept
related:
  - cohub.bp.hide-cohub-bar
  - cohub.concept.work
  - cohub.bp.viewer-auth-user-scopes
sources:
  - https://cohub.live/changelog（v2.12、v2.15、v2.24、v2.26）
  - https://github.com/talesofai/cohub/blob/main/packages/sdk/docs/work-runtime-guide.md
---

# Work 呈现与可调用界面

已发布的 Work/App 不只是新标签页中的网页。Cohub 可以把它托管在工作区预览中，传入调用上下文，挂载紧凑的 Composer context chip，并允许 Agent 调用 App 明确注册的方法。

## 呈现界面

| 界面 | 行为 |
|------|------|
| 公开页面 | 在 `/w/` URL 打开当前已发布版本 |
| 工作区预览 | 与 Work 管理页并排打开，新版本发布后原位刷新 |
| New Chat 背景 | 可在显示期间提供一个紧凑的 Composer context chip |
| Desktop open | Agent 可在发起调用的 Cohub 标签页打开文件或 Work |

查询参数和 URL hash 会转发给嵌入的 Web/port Work；`cohub_*` 参数由宿主保留。嵌入的 Work frame 可根据当前界面，在用户主动操作后使用剪贴板、全屏、Web Share 与指针锁定能力。

## 运行时上下文

在已发布 App 内，`client.context()` 可以包含 App、Space、观众、权限与 `invocation` 快照。invocation 描述发起调用的 Space/session/turn/tool call，是来源信息，不是授权本身。

SDK 还提供 `client.app.onContextChanged()`，App 可以在登录、调用或授权变化后刷新界面，无需轮询。

## 可调用界面

Work 注册命名方法；Cohub 不提供任意 DOM 访问或脚本执行：

```ts
client.app.surface.handle("image.open", async (input, { commandId }) => {
  openImageStudio(input);
  return { accepted: true, commandId };
});
```

Agent 调用已注册方法：

```bash
cohub desktop open <work> --call image.open --data '{"id":"hero"}'
```

调用只会路由到发起请求的前端实例，并且只接受来自获准 Cohub App origin 的请求。投递语义是 at-least-once，handler 应能承受重复调用。长交互应持久化 command id，并通过 UI API 报告最终结果。原生文件与 Board Work 可以预览，但不提供可调用界面。

## Cohub 外壳

Pro/Max 发布者可以用 `hideCohubBar` 或 CLI 的 `--hide-cohub-bar` / `--show-cohub-bar` 隐藏公开 Cohub 底栏。这只改变宿主呈现与分享元数据，不会替代 App 自己的导航。

---

[English](../../concepts/work-presentation.md)
