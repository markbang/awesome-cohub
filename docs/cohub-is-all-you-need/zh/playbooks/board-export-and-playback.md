---
id: cohub.bp.board-export-and-playback
title: 编辑、导出与播放语义化 Board
type: playbook
audience: [builder, agent]
features: [board, cli, export, playback, composition]
difficulty: intermediate
related:
  - cohub.concept.board-runtime
  - cohub.concept.board-semantic-authoring
  - cohub.concept.space
sources:
  - https://cohub.live/changelog（v2.0-v2.38）
  - https://github.com/talesofai/cohub/blob/main/packages/protocol/src/board-authoring.ts
  - https://github.com/talesofai/cohub/blob/main/packages/cli/src/commands/boards/batch.ts
---

# 编辑、导出与播放语义化 Board

## 何时使用

你需要在 Board 上排列 Space 文件和生成媒体，添加连接或动画，并发布或导出确定性结果。

## 结果

- 语义化 Board 快照包含 Item、连接、效果、组合动画与播放策略。
- 变更经过校验、版本控制，并可安全重试。
- 浏览器预览、Checkpoint、已发布 App 的 Board 目标与无头导出使用同一模型。

## 步骤

### A. 解析并查看

Board 目标可以是 Board ID 或 `.board` 路径：

```bash
cohub boards inspect <board-or-path> --json
cohub boards capabilities <board-or-path> --json
```

通过 capabilities 发现支持的 Item 类型、动画通道、片段/效果类型、坐标空间与渲染限制。

### B. 应用一个原子批次

```bash
cohub boards examples create > board.json
cohub boards batch <board-or-path> --input changes.json --dry-run
cohub boards batch <board-or-path> --input changes.json \
  --base-version 12 --mutation-id <stable-id> --json
```

批次在一次往返中原子应用。超时重试时复用 `mutationId`；调用者必须拒绝过期快照时使用严格的 `baseVersion`。

针对单项修改时使用 `boards items`、`boards connections`、`boards effects` 与 `boards compositions`。这些命令使用语义 JSON，并支持按 ID 读取。

### C. 配置与控制播放

组合动画包含轨道、关键帧、过程片段与标记。共享播放统一在 `boards playback` 下：

```bash
cohub boards playback play <board-or-path> <composition-id> --time-scale 1
cohub boards playback pause <board-or-path> <playback-id>
cohub boards playback seek <board-or-path> <playback-id> 400
cohub boards playback stop <board-or-path> <playback-id>
```

Board 元数据选择 `compositionId`；已移除的旧 `sequenceId` 结构不再是新的编辑契约。

### D. 导出

```bash
# 整板
cohub boards export <board-or-path> --out out.png --scale 2 --theme dark

# 指定 Item 或世界坐标矩形
cohub boards export <board-or-path> --items title,hero --out selection.webp
cohub boards export <board-or-path> --rect 0,0,1920,1080 --out frame.png
```

## 完成标准

- [ ] 语义快照通过 capabilities 与 dry-run 校验
- [ ] 重试使用相同 mutation id
- [ ] 播放遵守当前减少动态效果策略
- [ ] 导出结果与 Board 预览及引用资源一致

## 避免

- 写入已移除的旧 Node/Sequence 线上结构
- 把截图当作 Board 真相来源
- 用新 ID 替换超时的批次重试
- 为了预览而发布 Board 未引用的工作区资源

---

[English](../../playbooks/board-export-and-playback.md)
