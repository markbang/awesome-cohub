---
id: cohub.concept.board-semantic-authoring
title: Board 语义化编辑
type: concept
related:
  - cohub.concept.board-runtime
  - cohub.bp.board-export-and-playback
sources:
  - https://cohub.live/changelog（v2.22-v2.38）
  - https://github.com/talesofai/cohub/blob/main/packages/protocol/src/board-authoring.ts
  - https://github.com/talesofai/cohub/blob/main/packages/protocol/src/board-composition.ts
---

# Board 语义化编辑

Board 编辑采用由 API、SDK、CLI、Web 编辑器、Checkpoint 与已发布 App 共享的语义文档协议。稳定模型描述 Board 的含义，渲染器再从中推导几何与呈现。

## 文档模型

Board 快照包含 Item、连接、效果、Composition 与 Playback。内置 Item 包括文本、几何图形、手绘、箭头、画框、图片、视频、音频、文件与任务。媒体 Item 使用安全的相对 Space 文件引用；任务 Item 携带用于显示的 task-run 快照。

线上词汇使用 **Item**，不再使用已移除的泛化 Node/Sequence 结构。实时 `board.changed` 事件携带语义化 changed 投影；纯动画变更可以携带 `animationPatch`，无需重新读取完整 Board。

## 原子命令与批次

语义变更支持以下命令：

```text
board.patch
item.create / item.patch / item.replace / item.delete / item.reorder
connection.create / connection.patch / connection.delete
effect.apply / effect.delete
composition.apply / composition.delete
```

变更带稳定的 `mutationId`、预期 `baseVersion`、命令列表与可选 `dryRun`。`boards batch` 在一次原子往返中发送多条命令。服务端写入前检查 schema、引用、版本、级联规则与 capabilities。持久回执让重试可以安全重放；未变化的组合轨道重新应用时可成为 no-op。

## 校验契约

`boards capabilities` 与公开 SDK 的 `BoardSemanticCommandSchema` 暴露编辑契约：支持的类型、字段、坐标空间、动画通道、片段/效果类型与限制。校验失败包含机器可读 code 和类似 `items.0.props.text` 的路径；codec 抛出 `BoardItemValidationError`。服务端失败使用稳定错误结构、diagnostics 数组与 `requestId`。

本地和服务端使用同一 schema。不要猜测扩展字段，也不要把内部渲染对象直接当成编辑 JSON。

## CLI 流程

```bash
# 发现并校验完整批次
cohub boards capabilities <board-or-path> --json
cohub boards examples create > board.json
cohub boards batch <board-or-path> --input changes.json --dry-run
cohub boards batch <board-or-path> --input changes.json \
  --base-version 12 --mutation-id <stable-id> --json

# 读取单个语义资源
cohub boards items get <board-or-path> <item-id> --json
cohub boards connections get <board-or-path> <connection-id> --json
cohub boards effects get <board-or-path> <effect-id> --json
cohub boards compositions get <board-or-path> <composition-id> --json
```

播放命令现在统一在 `boards playback` 下：

```bash
cohub boards playback play <board-or-path> <composition-id> --time-scale 1
cohub boards playback pause <board-or-path> <playback-id>
cohub boards playback seek <board-or-path> <playback-id> 400
cohub boards playback stop <board-or-path> <playback-id>
```

## 重试规则

- 超时后复用相同的 `mutationId`。
- 使用 `baseVersion` 明确预期快照。
- 遇到 `VERSION_CONFLICT` 时读取最新 Board，并重新应用原意命令。
- 遇到校验错误时修复报告的编辑路径，不要原样重试。

## 避免

- 直接写入已移除的旧 Sequence/Node 线上结构。
- 把截图或渲染缓存当作真相来源。
- 用新 ID 替换超时的批次重试。
- 发送无界 JSON 或不受支持的 capability。

---

[English](../../concepts/board-semantic-authoring.md)
