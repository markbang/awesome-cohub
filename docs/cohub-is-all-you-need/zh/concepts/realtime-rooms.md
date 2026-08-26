---
id: cohub.concept.realtime-rooms
title: Work App 实时房间
type: concept
related:
  - cohub.concept.work
  - cohub.concept.work-presentation
  - cohub.concept.task-browser
sources:
  - https://cohub.live/changelog（v2.11）
  - https://github.com/talesofai/cohub/blob/main/packages/sdk/docs/work-runtime-guide.md
---

# Work App 实时房间

**实时房间**让已发布的 Work/App 无需部署独立后端即可运行多人状态。当前 SDK 界面是 `client.app.realtime`；房间使用已发布 App 的运行时身份，不需要额外 scope。

## 工作方式

- 通过 `client.app.realtime` 创建或加入代码作用域的房间。
- 通过 Cohub Gateway WebSocket 交换通用 JSON 事件。
- 运行时提供 presence、房间排序、成员快照、发布确认与短期准入票。

```ts
const room = await client.app.realtime.createRoom({
  code: "TEAM-ALPHA",
  seatPerUser: true,
});

const stop = room.subscribe("shared.state.updated", (event) => {
  render(event.data);
});
await room.publish("shared.state.updated", { value: 42 });
stop();
await room.leave();
```

## 关键特性

- **高频发送**：`room.send()` 避免逐事件 ACK 往返；失败通过 `room.onSendError()` 报告。
- **每观众一个席位**：`seatPerUser` 让第二个标签页或重新连接接管原席位，而不是消耗新席位。
- **不透明 `userKey`**：无需看到账号 ID 即可分组同一观众的连接。
- **重连信号**：使用 `onStateChange()` 与 `onOutOfSync()` 重新同步权威应用状态；房间事件不会重放。
- **限制**：默认生命周期 2 小时（60 秒至 24 小时），默认参与者 16（2 至 128），事件载荷 16 KB，presence 2 KB，每个 App 最多 512 个活跃房间。
- **仅运行时可用**：普通 server auth 与 CLI 不能创建或加入这些房间。

## 适用场景

- 发布为 Work 的多人游戏与协作体验。
- 无需自建 WebSocket 服务的实时仪表盘与共享状态。

---

[English](../../concepts/realtime-rooms.md)
