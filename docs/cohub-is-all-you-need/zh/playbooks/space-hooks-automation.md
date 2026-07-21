---
id: cohub.bp.space-hooks-automation
title: 用 Space Hooks 做自动化
type: playbook
audience: [builder, agent]
features: [hooks, sandbox, chat, files]
difficulty: advanced
related: [cohub.bp.scheduled-loop, cohub.concept.task]
sources:
  - https://github.com/talesofai/cohub/blob/main/docs/space-hooks.md
  - https://cohub.run/changelog#v1.103
  - https://cohub.run/changelog#v1.104
---

# 用 Space Hooks 做自动化

## 何时用

文件变更、新存档、回合结束时，要在 Space 内触发脚本或 follow-up prompt。

## 结果

- Declarative hooks under `.cohub/hooks/*`
- Events matched without self-trigger loops
- Runs visible as tasks; failures don’t storm the parent work

## 步骤

1. 事件：`space.fs.changed`、`space.workspace.ready`、`session.turn.finalized`、`checkpoint.created`。
2. 一个文件一个 hook（示例同上）。
3. FS 匹配默认忽略 `.cohub/**`，避免自触发。
4. turn 钩子用 `on.sessionIds` / `on.sources` 过滤；与 `prompt.sessionId`（行动目标）分离。
5. 脚本按 `set -u` 友好编写；可选 `COHUB_HOOK_*` 会以空串导出。
6. 用真实事件后在 Tasks 里验收。

## 对比

| Mechanism | Good for |
|-----------|----------|
| **Scheduled prompt** | Time-based recurrence (“every Monday”) |
| **Space Hooks** | Domain events (fs/save/turn/workspace ready) |

## 完成标准

- [ ] Hook file committed in Space workspace
- [ ] One successful triggered run observed
- [ ] No retry storm / self-trigger loop

## 别这样做

- Writing hooks that modify matched paths unboundedly (feedback loops)
- Putting secrets in hook YAML (use Space env)
- Using hooks as a substitute for product permissions design

---

[English](../../playbooks/space-hooks-automation.md)
