---
id: cohub.concept.board-semantic-authoring
title: Board 语义化编辑
type: concept
related:
  - cohub.concept.board-runtime
  - cohub.bp.board-export-and-playback
sources:
  - https://cohub.live/changelog（v2.22-v2.27）
  - https://github.com/talesofai/cohub/blob/main/packages/protocol/src/board-authoring.ts
  - https://github.com/talesofai/cohub/blob/main/packages/protocol/src/board-composition.ts
---

# Board 语义化编辑

从 v2.22-v2.27 起，Board 编辑采用由 API、SDK、CLI、Web 编辑器、Checkpoint 与已发布 Work 共享的语义文档协议。稳定模型描述 Board 的含义，渲染器再从该模型推导几何与媒体呈现。

## 文档模型

Board 快照包含：

- **Items**：文本、几何图形、手绘、箭头、画框、图片、视频、音频、文件与任务。
- **Connections**：Item 之间的关系，包含锚点、方向、标签、路由与样式。
- **Effects**：可复用的类型化视觉效果，包含生命周期、目标、参数与资源引用。
- **Compositions**：由属性轨道、关键帧、过程片段与标记组成的原子动画时间线。
- **Playback**：显式的循环、结束行为、减少动态效果策略与共享播放状态。

线上的词汇现在使用 **item**，不再使用过去泛化的 node/sequence 表示。Checkpoint 与已发布的 Board Work 保存相同的语义 Item 快照。

## 原子变更

语义变更是由多个命令组成的单个事务，例如：

```text
board.patch
item.create / item.patch / item.replace / item.delete / item.reorder
connection.create / connection.patch / connection.delete
effect.apply / effect.delete
composition.apply / composition.delete
```

每次变更都带有稳定的 `mutationId` 和预期的 `baseVersion`。服务端在写入前统一校验 schema、引用、版本、级联规则与能力。`dryRun` 执行相同的服务端校验但不持久化。持久化回执使重试可以安全重放；未变化的组合轨道重新应用时可以成为 no-op。

机器可读诊断与 `boards capabilities` 会暴露支持的 Item 类型、颜色、坐标约定、动画通道、片段类型、效果类型与渲染限制。实时更新使用语义化的 `board.changed` 投影，而不是原始线上操作。Agent 应先发现能力，不要猜测扩展字段。

## CLI 流程

```bash
# 查看语义快照与支持的 schema
cohub boards inspect <board> --json
cohub boards capabilities <board> --json

# 用 JSON 创建或修改 Item；写入前先校验
cohub boards examples item text > item.json
cohub boards items create <board> --input item.json --dry-run
cohub boards items create <board> --input item.json --mutation-id <stable-id>
cohub boards items patch <board> <item-id> --input patch.json

# 应用效果或组合动画
cohub boards examples composition fade > intro.json
cohub boards compositions apply <board> --input intro.json
cohub boards effects apply <board> --input effect.json
```

串联已知快照的写入时使用 `--base-version`。遇到版本冲突后重新读取；除非客户端辅助函数已实现文档所述的幂等重试。

## 组合动画心智模型

使用轨道插值属性，例如透明度或位置；使用过程片段表达文字显现、运动路径、粒子与镜头聚焦。资源保存在 Space 文件中，并通过类型化引用连接。相同组合动画可以预览、无头导出、发布，并按照 Board 播放策略播放。

## 避免

- 直接写入已移除的旧 Sequence/Node 线上结构。
- 把 Board 渲染结果当作真相，而不是语义快照。
- 超时后生成新的 ID 重试；应复用相同的 `mutationId`。
- 不查询 `capabilities` 就发送无界 JSON 或扩展类型。

---

[English](../../concepts/board-semantic-authoring.md)
