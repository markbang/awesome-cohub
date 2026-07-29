---
id: cohub.concept.board-runtime
title: Board 运行时与 PixiJS 无限画布
type: concept
---

# Board 运行时与 PixiJS 无限画布

**Board 运行时**（v2.0+，前身为 `.covas` / Canvas）是 Cohub 的 2.5D 无限视觉画布，用于空间协作、实时文件卡片、视频预览与高清媒体导出。

## 核心概念

| 术语 | 说明 |
|------|------|
| **Board** | Space 作用域下的无限画布文档 (`.board` / board 扩展) |
| **Node** | 画布节点（文本、形状、图片、视频或通用 `file` 文件节点） |
| **File node** | 任意工作区文件（代码、PDF、二进制等）的实时预览卡片 |
| **Transactions & 排序键** | 邻近间隙发号算法，支持 5 万+ 节点无重新索引翻滚 |
| **Autoplay Policy** | 元数据定义的自动播放策略（`sequenceId`、`delayMs`、`loop`） |
| **Export** | CLI (`cohub boards export`) 与 Web 端无头导出 (PNG/JPEG/WebP) |

## 关键特性

- **工作区任意文件上板**：支持代码、PDF、二进制文件挂载，按路径动态呈现预览。
- **实时感知**：光标、选中框、Agent 写入标记通过 Gateway 实时流式广播。
- **高性能渲染**：视口裁剪、纹理 LRU 冷却池与 PixiJS 四叉树空间索引。
- **移动端安全导航**：触控设备默认平移手势，8px 容错防误触。

## 参见

- 实践卡：[board-export-and-playback](../playbooks/board-export-and-playback.md)

---

[English](../../concepts/board-runtime.md)
