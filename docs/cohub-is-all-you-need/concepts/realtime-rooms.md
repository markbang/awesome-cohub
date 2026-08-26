---
id: cohub.concept.realtime-rooms
title: Realtime rooms for Work Apps
type: concept
related:
  - cohub.concept.work
  - cohub.concept.work-presentation
  - cohub.concept.task-browser
sources:
  - https://cohub.live/changelog (v2.11)
  - https://github.com/talesofai/cohub/blob/main/packages/sdk/docs/work-runtime-guide.md
---

# Realtime rooms for Work Apps

**Realtime rooms** let a published Work/App run multiplayer state without deploying a separate backend. The current SDK surface is `client.app.realtime`; rooms use the published App runtime identity and need no additional scope.

## How it works

- Create or join a code-scoped room through `client.app.realtime`.
- Exchange generic JSON events over the Cohub Gateway WebSocket.
- Use presence, room-scoped sequencing, membership snapshots, publish acknowledgments, and short-lived admission tickets supplied by the runtime.

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

## Key features

- **High-frequency sends**: `room.send()` avoids the per-event ACK round trip; failures are reported through `room.onSendError()`.
- **Per-viewer seats**: `seatPerUser` lets a second tab or reconnect take over the viewer's existing seat instead of consuming another one.
- **Opaque `userKey`**: group a viewer's connections without seeing the account id.
- **Reconnect signals**: use `onStateChange()` and `onOutOfSync()` to resync authoritative application state; room events are not replayed.
- **Limits**: default lifetime is 2 hours (60 seconds to 24 hours), default participants are 16 (2 to 128), payloads are 16 KB, presence is 2 KB, and each App may have 512 active rooms.
- **Runtime-only**: normal server auth and the CLI cannot create or join these rooms.

## Use cases

- Multiplayer games and collaborative experiences published as Works.
- Real-time dashboards and shared state without a custom websocket service.

---

[中文](../zh/concepts/realtime-rooms.md)
