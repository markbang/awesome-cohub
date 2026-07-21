---
id: cohub.bp.space-hooks-automation
title: Automate with Space Hooks
title_zh: 用 Space Hooks 做自动化
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

# Automate with Space Hooks · 用 Space Hooks 做自动化

## When · 何时用

EN: File changes, new Saves, or finished turns should trigger shell work or a follow-up prompt **inside the Space**.
中文：文件变更、新存档、回合结束时，要在 Space 内触发脚本或 follow-up prompt。

## Outcome · 结果

- Declarative hooks under `.cohub/hooks/*`
- Events matched without self-trigger loops
- Runs visible as tasks; failures don’t storm the parent work

## Steps · 步骤

### EN
1. Read supported events: `space.fs.changed`, `space.workspace.ready`, `session.turn.finalized`, `checkpoint.created`.
2. Add one file per hook:

```yaml
# .cohub/hooks/on-src-change.yml
schema: cohub.space-hook.v1
on:
  event: space.fs.changed
  paths: ["src/**"]
  ignore: ["src/generated/**"]
run: |
  npm test
```

3. Remember: `.cohub/**` is ignored for FS matching (prevents loops).
4. For turn hooks, filter with `sessionIds` / `sources` (`web_app`, `cli`, …) under `on` — orthogonal to `prompt.sessionId` action target.
5. Prefer `set -u` safe scripts; optional env keys are exported as empty strings (`COHUB_HOOK_*`).
6. Verify via Tasks UI / task runs after a real event.

### 中文
1. 事件：`space.fs.changed`、`space.workspace.ready`、`session.turn.finalized`、`checkpoint.created`。
2. 一个文件一个 hook（示例同上）。
3. FS 匹配默认忽略 `.cohub/**`，避免自触发。
4. turn 钩子用 `on.sessionIds` / `on.sources` 过滤；与 `prompt.sessionId`（行动目标）分离。
5. 脚本按 `set -u` 友好编写；可选 `COHUB_HOOK_*` 会以空串导出。
6. 用真实事件后在 Tasks 里验收。

## Scheduled prompts vs Hooks · 对比

| Mechanism | Good for |
|-----------|----------|
| **Scheduled prompt** | Time-based recurrence (“every Monday”) |
| **Space Hooks** | Domain events (fs/save/turn/workspace ready) |

## Done when · 完成标准

- [ ] Hook file committed in Space workspace
- [ ] One successful triggered run observed
- [ ] No retry storm / self-trigger loop

## Avoid · 别这样做

- Writing hooks that modify matched paths unboundedly (feedback loops)
- Putting secrets in hook YAML (use Space env)
- Using hooks as a substitute for product permissions design
