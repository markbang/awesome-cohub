---
id: cohub.concept.board-semantic-authoring
title: Board 语义化编辑
type: concept
related:
  - cohub.concept.board-runtime
  - cohub.bp.board-export-and-playback
sources:
  - https://cohub.live/changelog（v2.22-v2.70）
  - https://github.com/talesofai/cohub/blob/main/docs/board.md
  - https://github.com/talesofai/cohub/blob/main/docs/board-scripts.md
---

# Board 语义化编辑

Board 编辑采用 JSON 文档协议，由 API、SDK、CLI、Web 编辑器、Checkpoint 与已发布 App 共享。文档描述 Board 的含义，渲染器从中推导几何与呈现。

## 文档

```json
{
  "board": { "background": { "kind": "dots" }, "grid": { "visible": true, "size": 24 }, "enter": { "preset": "deal" } },
  "items": { "id": { "type": "text", "position": { "x": 0, "y": 0 }, "props": { "text": "Hi" } } },
  "animations": { "intro": { "duration": 800, "tracks": { "t": { "target": "id", "property": "opacity", "keyframes": [{ "at": 0, "value": 0 }, { "at": 800, "value": 1 }] } } } }
}
```

默认是**合并补丁**：`boards apply`（或 SDK 等价调用）把输入合并进文档。`--replace` 让文档等于输入。删除仍被引用的 item 会失败并列出引用；`--cascade` 同时删除子项与指向它的轨道。

## 几何

- `position` 相对 `parent`；根 item 位于世界坐标。
- `draw` 点与未绑定 `arrow` 端点为 item 局部坐标；绑定端点跟随引用 item。
- 盒状类型（`frame`、`shape`、媒体、`task`、`effect`、`custom`）显式编辑 `size`；`text`、`draw`、`arrow` 自动推导。
- `style` 支持调色板 token、CSS 颜色、light/dark 对，以及 `dash`、`radius`、`trim`。

用 `cohub boards schema <target> --field <path>` 查询准确的值类型、单位与组合（例如 camera 字段），不要猜测。

## 脚本

`custom` item 与原生 item 都可以挂 `script`（`src`、`params`、`targets`、`seed`、`enabled`）。脚本运行在浏览器、CLI 与导出共享的隔离模块运行时中，自行声明 `hitRegions()`，并显式提交文档变更。ESM 入口会连同传递依赖一起发布。

## 校验与并发

- 每次写入都会报告 Board 版本。传 `--base-version` 可在 Board 已前进时失败。
- 传 `--mutation-id`，重试不会重复应用。
- `--dry-run` 只校验不写入。
- 校验失败会给出编辑路径（例如 `items.0.props.text`）。

## CLI 流程

```bash
# 查看
cohub boards get <board> --only board,items --json
cohub boards get <board> --within <frame-id> --json
cohub boards schema <target> --field props.geometry

# 写入
cohub boards apply <board> -i patch.json --dry-run
cohub boards apply <board> -i patch.json --base-version 12 --mutation-id <stable-id>
cohub boards apply <board> -i doc.json --replace

# 历史与恢复
cohub boards history <board> --limit 20 --json
cohub boards history <board> --restore 12
```

## 动画预设

```bash
cohub boards preset <name> --at 0 --stagger 80 --duration 600 --ease ease-out --json
cohub boards preset <name> --animation intro --json
```

不传 `--animation` 时预设输出裸 `tracks`；传入时会把这些轨道包在该动画中。

## 重试规则

- 超时后复用相同的 `mutation-id`。
- 用 `--base-version` 拒绝过期快照。
- 版本冲突后读取最新 Board 并重新应用补丁。
- 修复报告的校验路径，不要原样重试。

## 避免

- 写入旧的 Node/Sequence 结构或 v3 之前的 `frame` 包裹。
- 把截图或渲染缓存当作真相来源。
- 发送无界 JSON 或不受支持的 item 属性。
- 超时后用新的 mutation id 重试。

---

[English](../../concepts/board-semantic-authoring.md)
