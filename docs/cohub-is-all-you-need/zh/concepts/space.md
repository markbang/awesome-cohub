---
id: cohub.concept.space
title: Space（空间）
type: concept
---

# Space

A **Space** 是 Cohub 的主要创作界面：Chat、文件、Save、App、Task、成员、频道与设置位于同一隔离环境。

## Practice
- One Space ≈ one initiative when possible
- Files are durable truth; Chat is steering
- Configure members/access/channels/mods when collaboration needs it — not on day zero necessarily
- 工作区 Markdown 可以解析相对图片/视频/音频资源；请将这些文件保存在 Space 中
- Apps 面板将已安装 App 保存到 `.cohub/apps.json`；Activity 汇总用量与 App 浏览量，但不替代 Billing 记录
- 文件元数据可能包含 `mtimeMs`、`ctimeMs` 与 `isFile`，用于可靠同步和工具处理

## UI vs API
UI: Space · CLI/API: space id + workspace filesystem

## See also
- Playbook: `cohub.bp.scratch-to-checkpoint`
- Docs: https://cohub.live/docs/workspace/spaces

---

[English](../../concepts/space.md)
