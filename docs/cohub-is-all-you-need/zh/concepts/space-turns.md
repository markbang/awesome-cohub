---
id: cohub.concept.space-turns
title: Space 回合浏览
type: concept
related:
  - cohub.concept.chat
  - cohub.bp.channel-ops
sources:
  - https://cohub.live/changelog（v2.6、v2.39）
---

# Space 回合浏览

**Space 回合浏览**（v2.6）暴露 Space 内所有可见 Session 的权限感知回合列表。v2.39 增加单会话完整回合列表与持久化的中间消息档案。

## API / CLI

```bash
# 跨全部可见 Session 的回合（作者、时间过滤 + 游标分页）
cohub spaces turns ls <spaceId> --author self --limit 50 --json

# 单个 Session 的完整回合列表，按 sequence 游标分页
cohub spaces turns ls <spaceId> --session <sessionId> --limit 20 --direction older --json
cohub spaces turns ls <spaceId> --session <sessionId> --cursor 42 --direction newer

# 从 CDN 档案读取某个回合持久化的中间消息
cohub spaces turns intermediate <sessionId> <turnId> --json
```

- REST：`GET /api/spaces/:id/turns`
- SDK：`SpaceTurnsApi`，以及 `session.turns.listPaginated()` 与 `session.turns.intermediate.get()` / `getToolCalls()`（自动解析 message object key 与签名 URL，并导出档案类型）
- Web Session 视图运行在同一个 SDK 客户端上。Session 还会携带实时 `activeTurn` 状态（id、queued/running/abort-requested、provider、model），侧栏与生成指示在刷新与后台刷新后保持正确。

## Web 回放

- 工作区通过 **danmaku** 层回放其他成员最近的回合。
- 使用本地游标、跨标签页租约协调、去重与实时消息优先——追平过程不会淹没实时活动。

## 适用场景

- 运营仪表盘按 Space 汇总近期 Agent 活动。
- 跨会话审计一个 Space 随时间发生的事。
- 通过持久化的中间消息排查长回合，而不是重新运行。

---

[English](../../concepts/space-turns.md)
