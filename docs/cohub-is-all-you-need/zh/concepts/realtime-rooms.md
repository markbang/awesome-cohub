---
id: cohub.concept.realtime-rooms
title: Works 实时房间
type: concept
---

# Works 实时房间

**实时房间**（v2.11）让已发布的 Works 无需自己的后端即可运行多人状态。

## 工作方式

- Works 通过 `client.work.realtime` 创建或加入代码作用域的房间。
- 房间通过现有 Gateway WebSocket 交换通用 JSON 事件。
- 成员在场、房间作用域排序、发布 ACK 与短期准入票内置。

## 关键特性

- **高频发送**：`room.send()` 省略逐事件 ACK 往返，适合输入帧与高流量（~1000/RTT 事件/秒）。
- **每观众一个席位**：`seatPerUser` 创建的房间每个观众最多一个席位——第二个标签页或重新加入会接管现有席位。
- **不透明 userKey**：成员携带不透明 `userKey`，应用可分组观众连接而无需看到账号 ID。
- **纯 Redis 基础设施**：可续期成员租约、有界序列化变更队列、速率限制、16 KB 载荷上限与绝对 24 小时生命周期。
- **配额**：每个 Work 限制 512 个活跃房间（HTTP 429 `ROOM_QUOTA_EXCEEDED`）。

## 适用场景

- 发布为 Works 的多人游戏与协作体验。
- 无需部署独立后端的实时仪表盘与共享状态。

---

[English](../../concepts/realtime-rooms.md)
