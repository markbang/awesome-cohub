---
id: cohub.bp.space-hooks-automation
title: Automate with Space Hooks and webhooks
type: playbook
audience: [builder, agent]
features: [hooks, sandbox, chat, files, task, webhook]
difficulty: advanced
related: [cohub.bp.scheduled-loop, cohub.concept.hooks, cohub.concept.app-actions, cohub.concept.task-schedule]
sources:
  - https://github.com/talesofai/cohub/blob/main/docs/space-hooks.md
  - https://cohub.live/changelog (v1.103-v2.46)
---

# Automate with Space Hooks and webhooks

## When

A file change, Save, finalized turn, published App version, Task Run transition, or inbound HTTP request should trigger work inside the Space.

## Outcome

- Declarative hooks under `.cohub/hooks/*`
- Event matching without self-trigger loops
- Webhook endpoints addressed by hook file name
- Runs visible as Tasks with curated event context

## Steps

1. Choose an event:
   ```text
   space.fs.changed
   space.workspace.ready
   session.turn.finalized
   checkpoint.created
   app.version.published
   task.updated
   webhook
   ```
2. Add one YAML/JSON file per hook. Exactly one of `run`, `prompt`, or `uses` is required:
   ```yaml
   schema: cohub.space-hook.v1
   on:
     event: task.updated
   run: |
     echo "task=$COHUB_HOOK_TASK_ID status=$COHUB_HOOK_TASK_STATUS"
   ```
3. Use `paths`, `ignore`, `kinds`, `sessionIds`, `sources`, or label filters under `on` where supported. `prompt.sessionId` is the action target, not a trigger filter.
4. Remember that FS matching ignores `.cohub/**`, and `task.updated` filters out `space_hook` tasks and their `run_command` children to prevent re-entry.
5. Read event context from `COHUB_HOOK_*` variables. Optional values are exported as empty strings; file paths and changed fields are bounded.
6. Verify the resulting Task Run in the Tasks surface.

## Webhook triggers (v2.46)

A hook with `on.event: webhook` becomes an endpoint named after its file:

```yaml
# .cohub/hooks/mail.yml  ->  POST /api/spaces/:spaceId/webhooks/mail
schema: cohub.space-hook.v1
on:
  event: webhook
  secret: wh_a1b2c3
uses: alice/tools/mail-inbox/deliver
```

```bash
# External service
curl -X POST https://<api>/api/spaces/<spaceId>/webhooks/mail \
  -H 'content-type: application/json' \
  -H 'x-cohub-webhook-secret: wh_a1b2c3' \
  -d '{"messageId":"...","from":"..."}'

# Local testing and endpoint discovery
cohub spaces webhooks ls --json
cohub spaces webhooks url mail
cohub spaces webhooks trigger mail --body '{"messageId":"..."}'
```

The JSON body (64 KB max) arrives as `COHUB_HOOK_WEBHOOK_BODY`; the response is `{ taskRunId, hook, eventId }`. Webhooks are rate-limited per Space. The secret is optional and can also be passed as `?secret=`.

## Task Run hooks (v2.18)

`task.updated` fires on Task Run state transitions (`pending` -> `running` -> `completed`/`failed`) and exposes the task id/type/status, changed fields, and error. Use it to launch follow-up validation or notification work without polling generation or Chat state.

## `uses`: run an App Action (v2.46)

Instead of a shell command or prompt, a hook can run a published App Action:

```yaml
schema: cohub.space-hook.v1
on:
  event: checkpoint.created
uses: alice/tools/mail-inbox/deliver
with:
  dir: inbox/mail
```

The payload in `with` is delivered as JSON on stdin to the Action. See [App Actions](../concepts/app-actions.md).

## Scheduled prompts vs Hooks

| Mechanism | Good for |
|-----------|----------|
| **Scheduled prompt** | Time-based recurrence |
| **Space Hooks** | Domain events, state transitions, inbound webhooks |

## Done when

- [ ] The hook file is in the Space workspace
- [ ] A real event produces one expected Task Run
- [ ] Filters and action target are distinct
- [ ] A webhook endpoint responds and (when configured) rejects a wrong or missing secret
- [ ] No retry storm or self-trigger loop occurs

## Avoid

- Modifying matched paths without an exit condition
- Putting secrets in hook YAML instead of Space env (`on.secret` is a trigger credential, not a storage location for other secrets)
- Polling Chat when `task.updated` provides the event boundary
- Using hooks as a substitute for product permission design

---

[中文](../zh/playbooks/space-hooks-automation.md)
