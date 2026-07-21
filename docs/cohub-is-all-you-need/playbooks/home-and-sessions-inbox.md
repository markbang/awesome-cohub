---
id: cohub.bp.home-and-sessions-inbox
title: Home Space and Sessions inbox
type: playbook
audience: [builder, agent]
features: [space, chat, navigation]
difficulty: starter
related: [cohub.concept.space, cohub.concept.chat, cohub.bp.cross-space-context]
sources:
  - https://cohub.run/docs/learn/product-map
  - https://cohub.run/docs/workspace/chats
  - https://cohub.run/changelog#v1.94
  - https://cohub.run/changelog#v1.98
  - https://cohub.run/changelog#v1.101
  - https://cohub.run/changelog#v1.105
---

# Home Space and Sessions inbox

## When

You live across many Spaces and need a default landing place plus a cross-space Chat radar.

## Two surfaces

### Home Space
- Empty accounts get a real **Home** space (`slug=home`) via default-space resolution instead of a dead-end “new space only” wall.
- Optional platform bootstrap: first-time Home may fork from `HOME_BOOTSTRAP_CHECKPOINT_ID` when configured; otherwise blank workspace.
- Home is still a normal Space — files, Chats, Saves, Works apply.

### Sessions inbox (`/sessions`)
- Cross-space recent Chats (desktop split list + conversation).
- **New chat from inbox** stays in inbox chrome: `/sessions/new?space=…` with space picker (does not always yank you into a random workspace shell mid-draft).
- Continuity: restore last chat / scroll where the product supports it.

## Outcome

- You know where first login lands
- You can triage Chats across Spaces without losing the thread
- Project work still graduates into **named Spaces** (not infinite Home clutter)

## Steps

1. After sign-in, confirm your default/Home Space in the switcher.
2. Use **Home** for lightweight notes, personal automation, or staging — not every production system.
3. Create **named Spaces** per initiative (`launch-page`, `customer-x`, `wiki-context`).
4. Use **`/sessions`** each day like an inbox: reply, label, jump to the owning Space when file work is needed.
5. Start cross-space drafts from the inbox when you are still choosing where the work belongs; pin the Space before long agent runs.
6. Don’t confuse inbox triage with knowledge capture — durable conclusions go to the target Space’s files/Saves.

## Agent notes

- Prefer explicit `-s <spaceId>` in CLI; don’t assume Home is the mission Space.
- When user says “my chats”, they may mean inbox across spaces — ask which Space owns the files.
- `COHUB_SPACE_ID` in a sandbox is the **current** Space, not necessarily Home.

## Done when

- [ ] Default/Home identified
- [ ] At least one initiative has its own Space
- [ ] Daily Chat triage path uses `/sessions` without losing file context

## Avoid

- Dumping every experiment into Home forever
- Running destructive agents from the wrong Space because the inbox focused a foreign thread
- Treating inbox order as project priority without labels/Saves

---

[中文](../zh/playbooks/home-and-sessions-inbox.md)
