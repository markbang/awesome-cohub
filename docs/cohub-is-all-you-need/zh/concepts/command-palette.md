---
id: cohub.concept.command-palette
title: 个性化命令面板与 Recent
type: concept
related:
  - cohub.concept.space
  - cohub.concept.chat
  - cohub.bp.dot-cohub-layers
sources:
  - https://cohub.live/changelog（v2.31-v2.33）
  - https://github.com/talesofai/cohub/blob/main/apps/api/src/routes/palette-overview.route.ts
  - https://github.com/talesofai/cohub/tree/main/apps/web/src/lib/command-palette
---

# 个性化命令面板与 Recent

命令面板是跨 Space 导航 Spaces、Chats、回合、标签和命令的界面。最近版本让默认列表以个人相关性和缓存优先，而不是通用的全局列表。

## 排名与标签页

- 总览接口 `GET /api/palette/overview` 汇总最近 Session，并按个人活动、成员关系与公开相关性排列 Space。
- 默认相关性分层是个人/自己拥有的资源优先，其次是有关联的 Space，最后是纯公开资源。精确或前缀查询可以越过分层。
- **Recent** 综合置顶状态，以及服务端参与记录、观众自己创建的回合和设备本地访问记录。仍可显式选择 **All**、**Mine** 与 **Pinned**。
- 空查询默认内容先从 IndexedDB 和本地缓存立即显示，再静默刷新过期服务端数据，不会出现明显的重新排序或首帧闪烁。

## Prompt 快捷操作

Prompt 模板可以通过 frontmatter 在 Chat Composer 上方显示按钮：

```yaml
quick-action: true
button-label: Review
argument-hint: optional scope
order: 10
```

无参数操作会直接发送 slash 模板；带 argument hint 的模板会先填入 Composer，用户补充后再发送。它仍然位于 `.agents/prompts/`，并遵循其他模板相同的分层优先级。

## Space 落地页

规范的新 Chat 落地页是 Space 根路径（`/spaces/:id`）。开始 Chat 不再需要经过 `/sessions/new` 重定向，预览窗口在路由切换时也会保持挂载。

## 隐私与韧性

面板根据当前观众关系排序，不是公开热度榜。Recent 本地持久化按缓存身份隔离，并且是机会式的，不会阻塞导航。总览请求失败时保留最近一次有效快照或本地推导结果。

---

[English](../../concepts/command-palette.md)
