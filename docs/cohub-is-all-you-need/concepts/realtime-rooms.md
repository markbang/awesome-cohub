---
id: cohub.concept.realtime-rooms
title: Realtime rooms for Apps
type: concept
related:
  - cohub.concept.work
  - cohub.concept.work-presentation
  - cohub.concept.task-browser
sources:
  - https://cohub.live/changelog (v2.11, v2.64, v2.67)
  - https://github.com/talesofai/cohub/blob/main/docs/product/en/developers/apps.md
---

# Realtime rooms for Apps

**Realtime rooms** let a published App share state, presence, and JSON events between its viewers and anyone it invites - a person in a terminal, or an Agent. Rooms are runtime-native: no scope and no consent.

## Basics

```ts
const room = await client.app.realtime.createRoom({ code: "TEAM-ALPHA" });
const stop = room.subscribe("shared.state.updated", ({ data }) => render(data));
await room.publish("shared.state.updated", { value: 42 });
```

- Every event takes one room-wide sequence. `publish()` events are kept in room history (latest 1,000, up to 512 KB); `send()` is for high-rate traffic, has no ack, and is never kept.
- A reconnect replays what `publish()` sent meanwhile. `onOutOfSync()` fires only when more was missed than history holds - then resync your own state.
- `room.history({ after })` reads what happened before you joined.
- `seatPerUser: true` gives each viewer one seat across tabs.
- Rooms live from a minute to 24 hours and belong to one App. Create and join them by code inside the App; open one from a link with `ctx.app.url + "?room=" + code`.
- Payload limits: 16 KB events, 2 KB presence.

## Members

`room.members` lists each member's `participantId`, `presence`, and `kind`: `user` for a viewer in the App, `agent` or `cli` for a seat taken through the CLI. An `agent` carries the `model` it runs on. Members acting for the same person share a `userKey`, so an App can show "Alice's Agent" without seeing an account id.

## Invites and Agents

`room.invite()` returns an invite that admits whoever holds it until it expires (10 minutes by default):

```ts
const { invite } = await room.invite();
await space.prompt({ content: [{ type: "text", text: `Join our room: cohub rooms join ${invite}` }] });
```

```bash
cohub rooms join <invite> --presence '{"name":"Guide"}'
cohub rooms events <room> --type 'chat.*' --wait 10m   # an Agent waits in the background and wakes on new events
cohub rooms publish <room> chat.message '{"text":"Hello"}'
```

The CLI holds its seat without a connection: every call keeps it, and it lapses after `--idle` (30 minutes by default). A manager of the App can create a room with `cohub rooms create --app <app>`, which prints an invite and the link that opens the room. Node scripts use the same seat through `client.rooms`.

## Peer channels (WebRTC)

`room.rtc()` adds a WebRTC connection relayed between the room's viewers. Reach for it when room events are too slow, too small, or too ordered. The Go/Pion helper (`cohub rooms rtc`) handles PCM, Opus, I420, and VP8 with bounded binary or file output.

Device access is granted per App and declared at publish time:

```html
<meta name="cohub:devices" content="camera,microphone,screen" />
```

## Privacy boundary

Rooms are transient application state, not a database: persist anything authoritative to Space files. Only the latest history is replayed, and seats are tied to the room's lifetime.

---

[中文](../zh/concepts/realtime-rooms.md)
