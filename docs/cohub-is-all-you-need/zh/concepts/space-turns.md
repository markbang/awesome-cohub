---
id: cohub.concept.space-turns
title: Space 回合浏览
type: concept
---

# Space 回合浏览

**Space 回合浏览**（v2.6）提供权限感知的接口，列出 Space 内所有可见 Session 的回合。

## API / CLI

```bash
# 跨所有可见 Session 列回合（作者/session/时间过滤 + 游标分页）
cohub spaces turns ls <spaceId>
cohub spaces turns ls <spaceId> --session <sessionId> --author <userId> --json
```

- REST：`GET /api/spaces/:id/turns`
- SDK：`SpaceTurnsApi`

## Web 回放

- 工作区通过 **danmaku（弹幕）层** 回放其他成员的近期回合。
- 本地游标、跨标签页租约协调、去重与实时消息优先级——补播不会挤掉实时活动。

## 适用场景

- 运维看板按 Space 汇总近期 Agent 活动。
- 跨 Session 审计一段时间内 Space 内发生的事。

---

[English](../../concepts/space-turns.md)
