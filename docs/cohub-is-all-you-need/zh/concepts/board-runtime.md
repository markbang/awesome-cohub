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
  - https://cohub.live/changelog（v2.0-v2.38 Board 运行时演进）
---

# Board 运行时与语义化画布

**Board 运行时**是 Cohub 的无限 2.5D 视觉画布，用于空间协作、实时文件卡片、媒体、任务产物、动画与无头导出。语义化文档由 API、SDK、CLI、Web 编辑器、Checkpoint 与已发布 App 共享。

## 核心概念

| 术语 | 说明 |
|------|------|
| **Board** | Space 作用域下的无限画布文档（`.board`） |
| **Item** | 语义化元素：文本、几何图形、手绘、箭头、画框、图片、视频、音频、文件或任务 |
| **Connection** | Item 间的语义关系，包含锚点、方向、标签、路由与样式 |
| **Effect** | 作用于 Item 的类型化视觉行为，包含生命周期与参数 |
| **Composition** | 由属性轨道、关键帧、过程片段与标记组成的原子动画时间线 |
| **Playback** | 共享组合动画控制：播放、暂停、跳转、停止、速度与减少动态效果策略 |
| **Board capability** | 用于机器校验和编辑发现的版本化 schema/renderer 契约 |
| **Export** | 无头渲染整板、Item 选择、frame 或世界坐标矩形 |

`Node` 与 `Sequence` 是已移除旧线上结构中的历史名称。新集成应使用 `Item` 与 `Composition`。

## 关键特性（v2.22-v2.38）

- **语义化编辑**：原子变更覆盖 Board 元数据、Item、连接、效果与组合动画；`boards batch` 一次往返应用多条命令，带严格乐观并发与幂等重放。
- **结构化校验**：codec 与 API 错误提供稳定 code、映射到编辑 JSON 的诊断路径，以及服务端失败的 `requestId`；SDK 暴露公开命令 schema 与 `BoardItemValidationError`。
- **任务与媒体 Item**：生成任务、音频、类型化引用、波形预览与统一播放成为一等 Board 内容。
- **动画实时同步**：小型纯效果/组合变更可作为 `board.changed` 中服务端生成的 `animationPatch` 到达，避免重新读取完整快照。
- **外观与镜头**：纯色或公开图片背景、适配/位置/透明度控制、语义化镜头聚焦，以及一致的浏览器/无头渲染。
- **渲染质量**：手绘路径使用带圆角连接的分段 tessellation，并携带显现进度；视口裁剪、纹理 LRU 冷却、空间索引、批量刷新与无头任务卡片支持密集画布。
- **已发布 App 捕获**：Board App 包含 Board 状态以及它实际引用的工作区资源。

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
