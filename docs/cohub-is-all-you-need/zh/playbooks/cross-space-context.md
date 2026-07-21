---
id: cohub.bp.cross-space-context
title: 引用另一个 Space 的上下文
type: playbook
audience: [builder, agent]
features: [chat, space, references, files]
difficulty: intermediate
related: [cohub.concept.chat, cohub.concept.space, cohub.bp.agent-with-skills]
sources:
  - https://cohub.run/docs/workspace/chats
  - https://cohub.run/changelog#v1.101
  - https://cohub.run/changelog#v1.102
---

# 引用另一个 Space 的上下文

## 何时用

当前 Chat 需要你有权访问的另一个 Space 里的事实、文件或既有成果。

## 结果

- Agent reads external context deliberately (not by guessing)
- Cross-space intent is visible in the Chat transcript
- Optional: references graph / provenance helps later audit (platform-side)

## 步骤

1. 确认你对源 Space 有访问权。
2. Composer 用 **@space** 做有意识的跨 Space 引用。
3. 明确要拉什么（路径、存档备注、Work 链接、结论页），不要「全部读一遍」。
4. CLI/自动化时写明 space id（示例同上）。
5. 把蒸馏结论写回**当前** Space 文件，避免下个 Chat 重新盲抓。
6. 综合结果成为里程碑时存档。

## 平台提示

- Mentions are for deliberate context, not every message.
- Recent platform work records request provenance (`X-Cohub-Source-*`) and cross-space `tool_call` edges for successful inter-space API calls — useful for ops/analytics, not a substitute for writing wiki notes.

## 完成标准

- [ ] Source Space cited clearly in Chat or files
- [ ] Distilled notes exist in the consumer Space
- [ ] No secret leakage across Spaces

## 别这样做

- @mention spam on every turn
- Copying whole foreign workspaces without distillation
- Assuming Agents can see Spaces you cannot access

---

[English](../../playbooks/cross-space-context.md)
