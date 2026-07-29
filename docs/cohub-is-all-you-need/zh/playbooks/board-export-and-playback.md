---
id: cohub.bp.board-export-and-playback
title: 掌握 Board 导出、播放策略与文件卡片
type: playbook
---

# 掌握 Board 导出、播放策略与文件卡片

## 何时

需要在 Board 上直观排布工作区文件、配置自动播放演示序列，或通过 CLI 导出高分辨率图片。

## 步骤

### A. 将工作区文件挂载到 Board

1. 将任意文件路径拖入 Board 或通过 API/CLI 写入 `file` 节点。
2. 代码与二进制文件按路径展现实时卡片。
3. PDF 文件支持连续滚动与顶部控制条预览。

### B. 配置 Board 自动播放策略

在 Board 元数据中配置 autoplay，使访客打开时自动循环播放：

```json
{
  "autoplay": {
    "sequenceId": "demo-intro",
    "delayMs": 500,
    "loop": true
  }
}
```

### C. 通过 CLI 无头导出 Board 图片

无需打开浏览器即可导出高清图片：

```bash
# 导出全画布 2x PNG
cohub boards export <boardId> -o out.png --scale 2

# 导出指定区域与主题
cohub boards export <boardId> --rect 0,0,1920,1080 --theme dark -o frame.webp
```

## 参见

- 概念：[board-runtime](../concepts/board-runtime.md)

---

[English](../../playbooks/board-export-and-playback.md)
