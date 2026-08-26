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
  - https://cohub.live/changelog（v2.0-v2.27）
  - https://github.com/talesofai/cohub/blob/main/packages/protocol/src/board-authoring.ts
---

# 编辑、导出与播放语义化 Board

## 何时使用

你需要在 Board 上排列 Space 文件和生成媒体，添加连接或动画，并发布或导出确定性结果。

## 结果

- 语义化 Board 快照包含 Item、连接、效果、组合动画与播放策略。
- 变更经过校验、版本控制，并可安全重试。
- 浏览器预览、Checkpoint、已发布 Board Work 与无头导出使用同一模型。

## 步骤

### A. 编辑前先查看

```bash
cohub boards inspect <board> --json
cohub boards capabilities <board> --json
```

通过 capabilities 发现支持的 Item 类型、动画通道、片段/效果类型、坐标空间与渲染限制。

### B. 创建语义内容

```bash
cohub boards examples item image > hero.json
cohub boards items create <board> --input hero.json --dry-run
cohub boards items create <board> --input hero.json --mutation-id <stable-id>
cohub boards items patch <board> <item-id> --input patch.json
```

连接、效果与组合动画使用同一套原子变更协议。超时重试时复用 `mutationId`；从已知快照串联写入时使用 `baseVersion`。

### C. 配置组合动画播放

组合动画包含轨道、关键帧、过程片段与标记。Board 元数据现在选择 composition，不再使用已移除的旧 `sequenceId` 结构：

```json
{
  "playback": {
    "compositionId": "intro",
    "delayMs": 500
  }
}
```

```bash
cohub boards play <board> intro
cohub boards pause <board> <playback-id>
cohub boards seek <board> <playback-id> 400
```

### D. 导出

```bash
# 整板
cohub boards export <board> -o out.png --scale 2 --theme dark

# 指定 Item 或世界坐标矩形
cohub boards export <board> --items title,hero -o selection.webp
cohub boards export <board> --rect 0,0,1920,1080 -o frame.png
```

## 完成标准

- [ ] 语义快照通过 capabilities 与 dry-run 校验
- [ ] 重试使用相同 mutation id
- [ ] 播放遵守当前减少动态效果策略
- [ ] 导出结果与 Board 预览及引用资源一致

## 避免

- 写入已移除的旧 Node/Sequence 线上结构
- 把截图当作 Board 真相来源
- 超时后换一个新 ID 重试
- 为了预览而发布 Board 未引用的工作区资源

---

[English](../../playbooks/board-export-and-playback.md)
