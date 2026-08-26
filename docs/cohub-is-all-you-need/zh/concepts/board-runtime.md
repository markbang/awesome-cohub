---
id: cohub.concept.board-runtime
title: Board 运行时与 PixiJS 无限画布
type: concept
related:
  - cohub.concept.board-semantic-authoring
  - cohub.concept.space
  - cohub.bp.board-export-and-playback
  - cohub.cheat.config-layers
sources:
  - https://cohub.live/changelog（v2.0-v2.27 Board 运行时演进）
---

# Board 运行时与 PixiJS 无限画布

**Board 运行时**（v2.0+，前身为 `.covas` / Canvas）是 Cohub 的 2.5D 无限视觉画布，用于空间协作、实时文件卡片、媒体、任务产物与无头导出。从 v2.22 起，语义化编辑成为 API、SDK、CLI、Web 编辑器、Checkpoint 与已发布 Work 共享的真相来源。

## 核心概念

| 术语 | 说明 |
|------|------|
| **Board** | Space 作用域下的无限画布文档 (`.board` / board 扩展) |
| **Item** | 语义化画布元素：文本、几何图形、手绘、箭头、画框、图片、视频、音频、文件或任务 |
| **Task item**（v2.19） | 生成任务产物卡片，支持图片、视频、音频与文本预览 |
| **Connections**（v2.16） | Item 间的语义关系，包含锚点、路由、方向与标签 |
| **Effect** | 作用于 Item 的类型化视觉行为，包含生命周期与参数 |
| **Composition**（v2.26） | 由属性轨道、关键帧、过程片段与标记组成的原子动画时间线 |
| **File item** | 按路径映射工作区文件的实时预览卡片 |
| **Playback** | 显式的组合循环、结束行为、减少动态效果策略与共享状态 |
| **Export** | CLI 与无头渲染，支持整板、Item 选择或世界坐标矩形 |

`Node` 与 `Sequence` 是已移除旧线上结构中的历史名称。新集成应使用 `Item` 与 `Composition`。

## 关键特性（v2.8-v2.27）

- **语义化编辑**：原子变更覆盖 Board 元数据、Item、连接、效果与组合动画；服务端诊断和能力发现让契约可机器读取。
- **任务与媒体 Item**：生成任务可以上板并同步状态，支持多模态预览；音频带确定性波形与统一播放。
- **板内生成**：Board Composer 接收模型参数，以及从选中 Item 得到的类型化引用。
- **连接**：Connect 工具手势、自动/固定锚点、路由、标签、复制支持、实时感知、导出与 Checkpoint。
- **组合动画与效果**：属性轨道、过程片段、镜头聚焦、粒子、文字显现与减少动态效果播放，取代临时动画序列。
- **外观与镜头**：纯色或公开图片背景、适配/位置/透明度控制、语义化镜头聚焦，以及一致的浏览器与无头导出。
- **文件引用**：已发布 Board Work 只包含 Board 实际引用的工作区资源。
- **渲染规模**：视口裁剪、纹理 LRU 冷却、PixiJS 空间索引、批量刷新与无头任务卡片渲染支持密集画布。
- **移动端安全导航**：触控设备默认平移；点击选择使用指针检查与 8px 容错。

## CLI 速记

```bash
# 查看语义文档与支持的契约
cohub boards inspect <board> --json
cohub boards capabilities <board> --json

# 导出整板或指定 Item
cohub boards export <board> -o out.png --scale 2 --theme dark
cohub boards export <board> --items title,hero -o selection.webp

# 共享播放使用 composition id
cohub boards play <board> <composition-id>
```

编辑命令、校验、变更回执与 JSON 模板见[Board 语义化编辑](./board-semantic-authoring.md)。

---

[English](../../concepts/board-runtime.md)
