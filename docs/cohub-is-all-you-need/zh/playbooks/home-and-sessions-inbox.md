---
id: cohub.bp.home-and-sessions-inbox
title: Home Space 与 Sessions 收件箱
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

# Home Space 与 Sessions 收件箱

## 何时用

同时泡在很多 Space 里，需要默认落点 + 跨 Space 的 Chat 雷达。

## 两个表面

### Home Space
- Empty accounts get a real **Home** space (`slug=home`) via default-space resolution instead of a dead-end “new space only” wall.
- Optional platform bootstrap: first-time Home may fork from `HOME_BOOTSTRAP_CHECKPOINT_ID` when configured; otherwise blank workspace.
- Home is still a normal Space — files, Chats, Saves, Works apply.

### Sessions inbox (`/sessions`)
- Cross-space recent Chats (desktop split list + conversation).
- **New chat from inbox** stays in inbox chrome: `/sessions/new?space=…` with space picker (does not always yank you into a random workspace shell mid-draft).
- Continuity: restore last chat / scroll where the product supports it.

## 结果

- You know where first login lands
- You can triage Chats across Spaces without losing the thread
- Project work still graduates into **named Spaces** (not infinite Home clutter)

## 步骤

1. 登录后在切换器确认默认/Home Space。
2. Home 放轻量笔记/个人自动化/中转，不要塞所有生产系统。
3. 每个事项用**具名 Space**。
4. 每天用 **`/sessions`** 当收件箱：回复、贴标签；要改文件再进对应 Space。
5. 还没想好落点时，可在收件箱起稿并挑选 Space；长程 Agent 跑之前先固定 Space。
6. 收件箱分诊 ≠ 知识沉淀；结论写进目标 Space 的文件/存档。

## Agent 注意

- Prefer explicit `-s <spaceId>` in CLI; don’t assume Home is the mission Space.
- When user says “my chats”, they may mean inbox across spaces — ask which Space owns the files.
- `COHUB_SPACE_ID` in a sandbox is the **current** Space, not necessarily Home.

## 完成标准

- [ ] Default/Home identified
- [ ] At least one initiative has its own Space
- [ ] Daily Chat triage path uses `/sessions` without losing file context

## 别这样做

- Dumping every experiment into Home forever
- Running destructive agents from the wrong Space because the inbox focused a foreign thread
- Treating inbox order as project priority without labels/Saves

---

[English](../../playbooks/home-and-sessions-inbox.md)
