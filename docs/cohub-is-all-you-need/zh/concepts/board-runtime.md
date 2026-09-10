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
  - https://cohub.live/changelog（v2.0-v2.46 Board 运行时演进）
---

# Board 运行时与语义化画布

**Board 运行时**是 Cohub 的无限 2.5D 视觉画布，用于空间协作、实时文件卡片、媒体、任务产物、嵌入 App、动画与无头导出。语义化文档由 API、SDK、CLI、Web 编辑器、Checkpoint 与已发布 App 共享。

## 核心概念

| 术语 | 说明 |
|------|------|
| **Board** | Space 作用域下的无限画布文档（`.board`） |
| **Item** | 语义化元素：文本、几何图形、手绘、箭头、画框、图片、视频、音频、文件、任务或 App |
| **Connection** | Item 间的语义关系，包含锚点、方向、标签、路由与样式 |
| **Effect** | 作用于 Item 的类型化视觉行为，包含生命周期与参数 |
| **Composition** | 由属性轨道、关键帧、过程片段与标记组成的原子动画时间线 |
| **Playback** | 共享组合动画控制：播放、暂停、跳转、停止、速度与减少动态效果策略 |
| **Transactions** | 服务端编辑日志，驱动回放；分页与快照一致，并提供计算好的逆操作 |
| **Board capability** | 用于机器校验和编辑发现的版本化 schema/renderer 契约 |
| **Export** | 无头渲染整板、Item 选择、frame 或世界坐标矩形 |

`Node` 与 `Sequence` 是已移除旧线上结构中的历史名称。新集成应使用 `Item` 与 `Composition`。

## 关键特性（v2.22-v2.46）

- **语义化编辑**：原子变更覆盖 Board 元数据、Item、连接、效果与组合动画；`boards batch` 一次往返应用多条命令，带严格乐观并发与幂等重放。
- **结构化校验**：codec 与 API 错误提供稳定 code、映射到编辑 JSON 的诊断路径，以及服务端失败的 `requestId`；SDK 暴露公开命令 schema 与 `BoardItemValidationError`。
- **世界坐标几何**：编辑格式使用 `position` / `size` / `rotation`；手绘与箭头在世界坐标中编辑，Item 画框由描边与曲线边界自动推导，并共享 protocol 层的几何核心。
- **任务、媒体与 App Item**：生成任务、音频、类型化引用、波形预览与可交互嵌入 App 都是一等 Board 内容。
- **编辑历史回放**（v2.45）：只读事务日志加上 SDK 回放播放器与 `cohub boards transactions`，让任意 Board 的历史可倒带；Web 工作区提供带拖动条的私有回放舞台。
- **动画实时同步**：小型纯效果/组合变更作为 `board.changed` 中服务端生成的 `animationPatch` 到达，避免重新读取完整快照。
- **入场动效**（v2.44-v2.45）：`effects.deal` 是可选的整板或单节点预设；本地新增与实时到达的 Item 会带入场动画，超过 12 个的批量被视为重新水合并跳过。
- **渲染质量**：手绘路径使用带圆角连接的分段 tessellation；图片纹理通过引用计数池共享；渲染上下文声明 `gpu` 或 `canvas`，无头导出与实时渲染保持一致。
- **已发布 App 捕获**：Board App 包含 Board 状态以及它实际引用的工作区资源。

## 事务与回放

```bash
# 最新优先的事务分页（别名：history）
cohub boards transactions <board-or-path> --limit 50 --json
cohub boards transactions <board-or-path> --before 120 --operations --json
```

第一页携带当前快照，因此 SDK 的 `createBoardReplayPlayer()` 可以来回拖动、向前补齐旧分页，并追加实时到达的事务。

## CLI 速记

```bash
# Board 可按 ID 或 .board 路径解析
cohub boards inspect <board-or-path> --json
cohub boards capabilities <board-or-path> --json

# 应用经过校验的原子批次
cohub boards batch <board-or-path> --input changes.json --dry-run
cohub boards batch <board-or-path> --input changes.json --base-version 12 --mutation-id <stable-id>

# 查看关系并控制共享播放
cohub boards connections list <board-or-path> --json
cohub boards connections get <board-or-path> <connection-id> --json
cohub boards playback play <board-or-path> <composition-id>
cohub boards playback pause <board-or-path> <playback-id>
```

变更结构、诊断与重试规则见 [Board 语义化编辑](./board-semantic-authoring.md)。

---

[English](../../concepts/board-runtime.md)
