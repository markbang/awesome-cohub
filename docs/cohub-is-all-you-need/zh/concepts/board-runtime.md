---
id: cohub.concept.board-runtime
title: Board 运行时与语义化画布
type: concept
related:
  - cohub.concept.board-semantic-authoring
  - cohub.concept.app-center
  - cohub.bp.board-export-and-playback
  - cohub.cheat.config-layers
sources:
  - https://cohub.live/changelog（v2.0-v2.70 Board 演进）
  - https://github.com/talesofai/cohub/blob/main/docs/board.md
---

# Board 运行时与语义化画布

**Board 运行时**是 Cohub 的无限 2.5D 视觉画布，用于空间协作、实时文件卡片、媒体、任务产物、嵌入 App、脚本、动画与无头导出。Board v3（v2.61+）是当前文档模型。

## 文档模型

一个 Board 是一份 JSON 文档，包含三个集合：settings（`board` 键）、items 与 animations。

```json
{
  "board": { "background": { "kind": "dots" }, "grid": { "visible": true, "size": 24 }, "enter": { "preset": "deal" } },
  "items": { "title": { "type": "text", "position": { "x": 80, "y": 60 }, "props": { "text": "Launch" } } },
  "animations": { "intro": { "duration": 800, "tracks": { "fade": { "target": "title", "property": "opacity", "keyframes": [{ "at": 0, "value": 0 }, { "at": 800, "value": 1 }] } } } }
}
```

## Item

| 分组 | 类型 |
|------|------|
| 结构 | `frame`（唯一可作为父级的类型）、`shape`（含 `path`）、`text`、`draw`、`arrow` |
| 媒体 | `image`、`video`、`audio`、`file`；`.glb` / `.gltf` / `.stl` / `.obj` 的 `file` 卡片会渲染 3D 预览 |
| 运行时 | `task`（Task Run 卡片）、`effect`、`custom`（脚本驱动）、扩展类型如 `acme.order` |

公共字段：`parent`、`z`、`position`（相对父级；根节点为世界坐标）、`size`、`rotation`、`scale`、`origin`、`opacity`、`style`、`props`、`locked`、`metadata`，以及可选 `script`（`src`、`params`、`targets`、`seed`、`enabled`）。

- 子节点继承父级的变换与透明度。
- 手绘点与未绑定箭头端点为 item 局部坐标；绑定端点跟随引用 item。
- 盒状类型显式编辑 `size`，`text`、`draw`、`arrow` 自动推导。
- `style` 支持调色板 token、CSS 颜色、light/dark 对、`dash`、`radius` 与 `trim`。

## 媒体与任务

媒体源可以是稳定的公开 HTTP(S) URL，也可以是相对 Space 路径。Space 路径保留实时文件更新；URL 直接加载而不导入文件。发布时会捕获 Space 文件依赖，并把远程引用写入 `externalUrls`——远程媒体保持在线，不是不可变捕获资源。

Task item 只保存 `taskRunId`；服务端读取 run 并维护 `props.snapshot`。run 完成后，最终快照会写入该 Space 内所有展示它的 Board，每个 Board 一个版本，并归因到任务。客户端快照永远不会覆盖 run 的快照；写入作者无权查看的 run 会返回 `TASK_FORBIDDEN`。

## 脚本

Board 脚本（v2.64+）取代旧的 Sketch item，运行在浏览器、CLI 与导出共享的隔离模块运行时中。脚本可以用 Canvas/WebGL 绘制、声明 `hitRegions()`、按需观察选择/视图/变换事件，并显式提交文档变更。ESM 入口会与其传递依赖一起发布。

## SDK 分层

自 v2.63 起，Board SDK 拆分为与框架无关的层：

- `board/editor` — 文档编辑与交互
- `board/replica` — 只读同步副本
- `board/stage` — PixiJS 渲染
- `board/export/node` — Node 无头导出（原 `board/headless`）

实例使用 item 注册表（`defineBoardItem` / `createBoardRegistry`），已存文档保持兼容。

## 播放与导出

Web、CLI 与导出共享同一套播放运行时。播放按**动画相机**做裁剪、预加载与 LOD；远层双缓冲；连接层按层缓存几何并按矩形裁剪。导出会及时释放中间画布、执行可配置的解码图像内存预算，并预检视频尺寸。

## CLI 速记

```bash
cohub boards get <board> --only board,items --json
cohub boards get <board> --items a,b --within <item-id> --json
cohub boards preset rise --targets title --json
cohub boards schema camera --json
cohub boards export <board> --paper dark -o out.png
```

编辑、脚本与重试规则见 [Board 语义化编辑](./board-semantic-authoring.md)。

---

[English](../../concepts/board-runtime.md)
