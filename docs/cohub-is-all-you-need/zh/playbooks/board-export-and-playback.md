---
id: cohub.bp.board-export-and-playback
title: 编辑、导出、回放与播放语义化 Board
type: playbook
audience: [builder, agent]
features: [board, cli, export, playback, composition, replay]
difficulty: intermediate
related:
  - cohub.concept.board-runtime
  - cohub.concept.board-semantic-authoring
  - cohub.concept.space
sources:
  - https://cohub.live/changelog（v2.0-v2.45）
  - https://github.com/talesofai/cohub/blob/main/packages/protocol/src/board-authoring.ts
  - https://github.com/talesofai/cohub/blob/main/packages/cli/src/commands/boards/batch.ts
---

# 编辑、导出、回放与播放语义化 Board

## 何时使用

你需要在 Board 上排列 Space 文件、生成媒体与嵌入 App，添加连接或动画，然后发布、回放或导出确定性结果。

## 结果

- 语义化 Board 快照包含 Item、连接、效果、组合动画与播放策略。
- 变更经过校验、版本控制，并可安全重试。
- 编辑历史可通过事务日志倒带。
- 浏览器预览、Checkpoint、已发布 App 的 Board 目标与无头导出使用同一模型。

## 步骤

### A. 解析并查看

Board 目标可以是 Board ID 或 `.board` 路径：

```bash
cohub boards inspect <board-or-path> --json
cohub boards capabilities <board-or-path> --json
```

通过 capabilities 发现支持的 Item 类型、动画通道、片段/效果类型、坐标空间与渲染限制。几何使用世界坐标编辑（`position` / `size` / `rotation`），手绘与箭头画框由边界自动推导。

### B. 应用一个原子批次

```bash
cohub boards examples create > board.json
cohub boards batch <board-or-path> --input changes.json --dry-run
cohub boards batch <board-or-path> --input changes.json \
  --base-version 12 --mutation-id <stable-id> --json
```

批次在一次往返中原子应用。超时重试时复用 `mutationId`；调用者必须拒绝过期快照时使用严格的 `baseVersion`。

针对单项修改时使用 `boards items`、`boards connections`、`boards effects` 与 `boards compositions`。`boards items list/get` 还会显示手绘与箭头 Item 推导出的 x/y/width/height 列，`boards create` 会报告创建出的 `.board` 路径。

### C. 配置与控制播放

组合动画包含轨道、关键帧、过程片段与标记。共享播放统一在 `boards playback` 下：

```bash
cohub boards playback play <board-or-path> <composition-id> --time-scale 1
cohub boards playback pause <board-or-path> <playback-id>
cohub boards playback seek <board-or-path> <playback-id> 400
cohub boards playback stop <board-or-path> <playback-id>
```

Board 元数据选择 `compositionId`；已移除的旧 `sequenceId` 结构不再是新的编辑契约。

### D. 回放编辑历史

编辑时保留 `--mutation-id` 记录，然后通过只读事务日志倒带：

```bash
cohub boards transactions <board-or-path> --limit 50 --json
cohub boards transactions <board-or-path> --before 120 --operations --json
```

第一页携带当前快照；SDK 的 `createBoardReplayPlayer()` 将其变成可拖动的时间线（旧分页向前补齐，实时编辑向后追加）。

### E. 导出

```bash
# 整板
cohub boards export <board-or-path> --out out.png --scale 2 --theme dark

# 指定 Item 或世界坐标矩形
cohub boards export <board-or-path> --items title,hero --out selection.webp
cohub boards export <board-or-path> --rect 0,0,1920,1080 --out frame.png
```

## Board 上的实况 App（v2.40）

已发布 App 可以作为可交互画框放到 Board 上：从侧栏把 App 拖到 Board（桌面端使用原生 HTML5 拖拽，触屏使用指针拖拽），画框会挂载真实的 App 界面及其 runtime shell。画框跟随平移、缩放、旋转与选择；iframe 内容只在画框可见且尺寸可读时惰性挂载，密集 Board 依然轻量。

## 完成标准

- [ ] 语义快照通过 capabilities 与 dry-run 校验
- [ ] 重试使用相同 mutation id
- [ ] 播放遵守当前减少动态效果策略
- [ ] 回放页能渲染预期的历史版本
- [ ] 导出结果与 Board 预览及引用资源一致

## 避免

- 写入已移除的旧 Node/Sequence 线上结构或旧的 `frame` 包裹格式
- 把截图当作 Board 真相来源
- 用新 ID 替换超时的批次重试
- 为了预览而发布 Board 未引用的工作区资源

---

[English](../../playbooks/board-export-and-playback.md)
