---
id: cohub.bp.space-hooks-automation
title: Automate with Space Hooks
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

# Automate with Space Hooks

## When

File changes, new Saves, or finished turns should trigger shell work or a follow-up prompt **inside the Space**.

## Outcome

- Declarative hooks under `.cohub/hooks/*`
- Events matched without self-trigger loops
- Runs visible as tasks; failures don’t storm the parent work

## Steps

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

## Scheduled prompts vs Hooks

| Mechanism | Good for |
|-----------|----------|
| **Scheduled prompt** | Time-based recurrence (“every Monday”) |
| **Space Hooks** | Domain events (fs/save/turn/workspace ready) |

## Done when

- [ ] Hook file committed in Space workspace
- [ ] One successful triggered run observed
- [ ] No retry storm / self-trigger loop

## Avoid

- Writing hooks that modify matched paths unboundedly (feedback loops)
- Putting secrets in hook YAML (use Space env)
- Using hooks as a substitute for product permissions design

---

[中文](../zh/playbooks/space-hooks-automation.md)
