---
id: cohub.bp.channel-ops
title: Operate a Space from external channels
title_zh: 从外部频道运营 Space
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

# Operate a Space from external channels · 从外部频道运营 Space

## When · 何时用

EN: Humans already live in Discord / Feishu / WeChat / Telegram / QQ and should hit the same Space.
中文：人已经在 Discord / 飞书 / 微信 / Telegram / QQ，但要打到同一个 Space。

## Outcome · 结果

- Channel bound to a Space
- Channel-origin Chats labeled/system-grouped for navigation
- Files/Saves/Works remain the durable system of record

## Steps · 步骤

### EN
1. Open Space settings → Channels; bind the provider you need (permissions vary by provider).
2. Send a test message from the external app; confirm a Chat appears in the Space.
3. Use labels / system Channel grouping to keep sidebar scannable.
4. Teach the team: **channel is a door**, not a second filesystem — important outputs still go to files + Saves + Works.
5. For agent replies, keep prompts short; attach or point to Space paths for large context.
6. If model overrides exist in-channel, verify they map to Cohub identities correctly after platform updates.

### 中文
1. Space 设置 → Channels，绑定所需渠道。
2. 从外部发一条测试消息，确认 Space 内出现 Chat。
3. 用标签 / 系统 Channel 分组保持侧栏可读。
4. 团队约定：频道是门，不是第二文件系统；重要产出仍进文件 + 存档 + Work。
5. Agent 回复保持短指令；大上下文指向 Space 路径。
6. 渠道内模型覆盖等能力变更后做一次回归。

## Done when · 完成标准

- [ ] Round-trip message works
- [ ] Channel chats findable in UI
- [ ] On-call knows where durable outputs live

## Avoid · 别这样做

- Channel-only ops with no Saves/Works
- Dumping secrets into group chats
- Running unbounded agent autonomy from noisy public channels without Save gates
