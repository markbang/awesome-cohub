---
id: cohub.bp.channel-ops
title: Operate a Space from external channels
type: playbook
audience: [builder, agent]
features: [channel, chat, space, label]
difficulty: intermediate
related: [cohub.concept.chat, cohub.concept.space, cohub.bp.scheduled-loop]
sources:
  - https://cohub.run/docs/workspace/spaces
  - https://cohub.run/docs/learn/core-concepts
  - https://cohub.run/changelog#v1.91
---

# Operate a Space from external channels

## When

Humans already live in Discord / Feishu / WeChat / Telegram / QQ and should hit the same Space.

## Outcome

- Channel bound to a Space
- Channel-origin Chats labeled/system-grouped for navigation
- Files/Saves/Works remain the durable system of record

## Steps

1. Open Space settings → Channels; bind the provider you need (permissions vary by provider).
2. Send a test message from the external app; confirm a Chat appears in the Space.
3. Use labels / system Channel grouping to keep sidebar scannable.
4. Teach the team: **channel is a door**, not a second filesystem — important outputs still go to files + Saves + Works.
5. For agent replies, keep prompts short; attach or point to Space paths for large context.
6. If model overrides exist in-channel, verify they map to Cohub identities correctly after platform updates.

## Done when

- [ ] Round-trip message works
- [ ] Channel chats findable in UI
- [ ] On-call knows where durable outputs live

## Feishu / Lark from Agent

For **user-identity** Feishu ops (not bot-first), prefer skill **[lark-lite](https://github.com/kjx-talesofai/claude-skill-lark-lite)** (`lark-cli`) — install into config Space, then Save. Avoid `lark-cli auth login --recommend` alone (missing high-frequency scopes); see skill README / `lark-lite-scopes.txt`.

Cohub Channel binding (Space settings) is still the product “door” into a Space; lark-lite is for **operating Feishu itself**.

## Avoid

- Channel-only ops with no Saves/Works
- Dumping secrets into group chats
- Running unbounded agent autonomy from noisy public channels without Save gates

---

[中文](../zh/playbooks/channel-ops.md)
