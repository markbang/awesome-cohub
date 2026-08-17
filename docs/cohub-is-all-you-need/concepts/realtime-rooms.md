---
id: cohub.concept.realtime-rooms
title: Realtime rooms for Works
type: concept
related:
  - cohub.concept.work
  - cohub.concept.work-presentation
sources:
  - https://cohub.run/changelog (v2.11 realtime rooms)
---

# Realtime rooms for Works

**Realtime rooms** (v2.11) let published Works run multiplayer state with no backend of their own.

## How it works

- Works create or join code-scoped rooms through `client.work.realtime`.
- Rooms exchange generic JSON events over the existing Gateway WebSocket.
- Member presence, room-scoped sequencing, publish ACKs, and short-lived admission tickets are built in.

## Key features

- **High-frequency sends**: `room.send()` omits per-event ACK round trips, suitable for input frames and high-rate traffic (~1000/RTT events/sec).
- **Per-viewer seats**: rooms created with `seatPerUser` give each viewer at most one seat — a second tab or rejoin takes over the existing seat.
- **Opaque userKey**: members carry an opaque `userKey` so applications can group a viewer's connections without seeing the account id.
- **Redis-only infrastructure**: renewable membership leases, bounded serialized mutation queue, rate limits, 16 KB payload caps, and absolute 24-hour lifetime.
- **Quota**: each Work is limited to 512 active rooms (HTTP 429 `ROOM_QUOTA_EXCEEDED`).

## Use cases

- Multiplayer games and collaborative experiences published as Works.
- Real-time dashboards and shared state without deploying a separate backend.

---

[中文](../zh/concepts/realtime-rooms.md)
