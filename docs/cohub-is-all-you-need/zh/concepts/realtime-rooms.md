---
id: cohub.concept.realtime-rooms
title: App 实时房间
type: concept
related:
  - cohub.concept.work
  - cohub.concept.work-presentation
  - cohub.concept.task-browser
sources:
  - https://cohub.live/changelog（v2.11、v2.64、v2.67）
  - https://github.com/talesofai/cohub/blob/main/docs/product/en/developers/apps.md
---

# App 实时房间

**实时房间**让已发布 App 在观众之间共享状态、presence 与 JSON 事件，也可以邀请外部参与者——终端里的人或 Agent。房间是运行时原生能力：不需要 scope，也不需要 consent。

## 基础用法

```ts
const room = await client.app.realtime.createRoom({ code: "TEAM-ALPHA" });
const stop = room.subscribe("shared.state.updated", ({ data }) => render(data));
await room.publish("shared.state.updated", { value: 42 });
```

- 每个事件占用一个房间级序号。`publish()` 事件保留在房间历史中（最新 1,000 条，最多 512 KB）；`send()` 用于高频无 ACK 流量，但不会保留。
- 重连会重放这期间 `publish()` 的内容。只有错过的内容超过历史容量时才触发 `onOutOfSync()`——此时需要自行重新同步状态。
- `room.history({ after })` 读取加入之前发生的事件。
- `seatPerUser: true` 让每个观众跨标签页只占一个席位。
- 房间生命周期从 1 分钟到 24 小时，归属单个 App。App 内按 code 创建与加入；用 `ctx.app.url + "?room=" + code` 从链接打开。
- 载荷限制：事件 16 KB，presence 2 KB。

## 成员

`room.members` 列出每个成员的 `participantId`、`presence` 与 `kind`：App 内观众为 `user`，通过 CLI 占座为 `agent` 或 `cli`。`agent` 会带上运行的 `model`。代表同一个人的成员共享 `userKey`，因此 App 可以显示 "Alice 的 Agent" 而不必看到账号 ID。

## 邀请与 Agent

`room.invite()` 返回邀请码，持有者在过期前（默认 10 分钟）即可加入：

```ts
const { invite } = await room.invite();
await space.prompt({ content: [{ type: "text", text: `Join our room: cohub rooms join ${invite}` }] });
```

```bash
cohub rooms join <invite> --presence '{"name":"Guide"}'
cohub rooms events <room> --type 'chat.*' --wait 10m   # Agent 后台等待，新事件到达时返回
cohub rooms publish <room> chat.message '{"text":"Hello"}'
```

CLI 不需要保持连接即可占住席位：每次调用都会续期，超过 `--idle`（默认 30 分钟）无调用才会失效。App 管理者可以用 `cohub rooms create --app <app>` 创建房间，命令会打印邀请码与打开房间的链接。Node 脚本通过 `client.rooms` 使用同一席位。

## Peer 通道（WebRTC）

`room.rtc()` 在房间观众之间添加 WebRTC 连接。当房间事件太慢、太小或需要严格顺序时使用它。Go/Pion 辅助进程（`cohub rooms rtc`）处理 PCM、Opus、I420 与 VP8，输出为有界二进制或文件。

设备权限按 App 授予，并在发布时声明：

```html
<meta name="cohub:devices" content="camera,microphone,screen" />
```

## 隐私边界

房间是临时应用状态而不是数据库：权威数据要持久化到 Space 文件。只会重放最新历史，席位也与房间生命周期绑定。

---

[English](../../concepts/realtime-rooms.md)
