---
id: cohub.bp.board-export-and-playback
title: 编辑、导出、回放与播放 Board
type: playbook
audience: [builder, agent]
features: [board, cli, export, playback, animation, replay]
difficulty: intermediate
related:
  - cohub.concept.board-runtime
  - cohub.concept.board-semantic-authoring
  - cohub.concept.space
sources:
  - https://cohub.live/changelog（v2.0-v2.70）
  - https://github.com/talesofai/cohub/blob/main/docs/board.md
  - https://github.com/talesofai/cohub/blob/main/docs/board-scripts.md
---

# 编辑、导出、回放与播放 Board

## 何时使用

你需要在 Board 上排布文件、媒体、任务与嵌入 App，添加动画，然后导出静帧或视频、回放编辑历史，或进行现场演示。

## 结果

- 一份 JSON 文档，包含 `board` 设置、`items` 与 `animations`。
- 写入有版本、可 dry-run、可幂等重试。
- 静帧与视频导出使用与 Web 相同的播放运行时。
- 编辑历史可以回放或恢复。

## 步骤

### A. 查看与编辑

```bash
cohub boards get <board> --only board,items --json
cohub boards get <board> --within <frame-id> --json
cohub boards schema <target> --field props.geometry

cohub boards apply <board> -i patch.json --dry-run
cohub boards apply <board> -i patch.json --base-version 12 --mutation-id <stable-id>
```

`apply` 默认合并；`--replace` 直接替换文档；`--cascade` 在删除 item 时一并删除子项与指向它的轨道。

### B. 构建动画

```bash
cohub boards preset <name> --at 0 --stagger 80 --duration 600 --ease ease-out --json
cohub boards preset <name> --animation intro --json
```

动画位于 `animations.<id>.tracks.<id>`，按 JSON 路径驱动属性（`opacity`、`scale`、`props.reveal` 等）。入场动效可选，由 `board.enter.preset` 控制（例如 `deal`）；超过 12 个 item 的批量会被跳过，减少动态效果时退化为淡入。

### C. 演示与播放控制

```bash
cohub boards play <board> <animation> --at 2.5s --speed 1.5
cohub boards pause <board>
cohub boards resume <board>
cohub boards seek <board> 12.5s
cohub boards next <board>
cohub boards stop <board>
cohub boards watch <board>
```

播放按动画相机裁剪、预加载与选择 LOD；`next` 会越过演示停留的 marker。

### D. 回放与恢复历史

```bash
cohub boards history <board> --limit 20 --json
cohub boards history <board> --restore 12
```

恢复某个版本是一次新的写入，不会改写历史。

### E. 导出静帧或视频

```bash
# 单个时刻
cohub boards export <board> -o out.png --scale 2 --theme dark

# 多个时刻，或带步长的区间
cohub boards export <board> --at 0,2.5s,5s -o frames/%04d.png --format png
cohub boards export <board> --at 0:6s:0.1s --camera --fps 30 -o out.mp4

# 区域与纸张
cohub boards export <board> --items title,hero -o selection.webp --paper transparent
cohub boards export <board> --rect 0,0,1920,1080 --size 1920x1080 -o frame.png
```

`--at` 接受单个时刻、逗号列表或 `start:end:step`；`--camera` 跟随动画相机；`--animation` 指定时间所对应的动画；`--image-memory` 限制解码图像内存。`--paper` 已取代旧的 `--background`。

## 实况 App 与脚本

已发布 App 可以作为可交互画框放在 Board 上（v2.40），从侧栏拖放即可。脚本驱动的 `custom` item 与 `script` 附件（v2.64）运行在浏览器、CLI 与导出共享的隔离模块运行时中。

## 完成标准

- [ ] 正式写入前 `apply --dry-run` 通过
- [ ] 重试复用相同 mutation id
- [ ] 播放遵循动画相机；减少动态效果时入场动效退化为淡入
- [ ] 恢复的版本渲染出预期的历史状态
- [ ] 导出静帧/视频与 Board 预览及引用资源一致

## 避免

- 写入旧 Node/Sequence 结构或 v3 之前的 `frame` 包裹
- 把截图当作 Board 真相来源
- 大 Board 导出不设解码图像预算
- 以为远程媒体 URL 会在发布时被不可变捕获

---

[English](../../playbooks/board-export-and-playback.md)
