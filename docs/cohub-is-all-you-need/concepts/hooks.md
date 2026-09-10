---
id: cohub.concept.hooks
title: Space Hooks
type: concept
related: [cohub.bp.space-hooks-automation, cohub.concept.task-schedule, cohub.concept.app-actions]
sources:
  - https://github.com/talesofai/cohub/blob/main/docs/space-hooks.md
  - https://cohub.live/changelog (v2.18, v2.46)
---

# Space Hooks

Space Hooks are file-declared asynchronous automation under `.cohub/hooks/*` (v1.103+). One file is one hook identity, with exactly one of `run`, `prompt`, or `uses`.

## Events

- `space.fs.changed`
- `space.workspace.ready`
- `session.turn.finalized`
- `checkpoint.created`
- `app.version.published`
- `task.updated` — Task Run state transitions with task id/type/status, changed fields, and errors
- `webhook` (v2.46) — an inbound HTTP trigger addressed by file name

`task.updated` filters out `space_hook` tasks and their `run_command` children, preventing a hook from re-entering itself.

## Actions

- `run` - a sandbox shell command
- `prompt` - a follow-up session prompt
- `uses` (v2.46) - run a published **App Action**: `owner/space/app/action`, with a JSON payload passed via `with` and delivered on stdin

```yaml
schema: cohub.space-hook.v1
on:
  event: checkpoint.created
uses: alice/tools/mail-inbox/deliver
with:
  dir: inbox/mail
```

## Webhook triggers (v2.46)

A hook with `on.event: webhook` is addressed by its file name rather than broadcast:

```text
.cohub/hooks/mail.yml  ->  POST /api/spaces/:spaceId/webhooks/mail
```

- Optional `on.secret`, passed as `x-cohub-webhook-secret` or `?secret=`.
- JSON body (64 KB max) is available as `COHUB_HOOK_WEBHOOK_BODY`.
- Per-space rate limiting; the response is `{ taskRunId, hook, eventId }`.
- Works for local Sandboxes too: hook definitions load through the provider-aware Space FS facade.

```bash
cohub spaces webhooks ls --json
cohub spaces webhooks url mail
cohub spaces webhooks trigger mail --body '{"messageId":"..."}'
```

## Practice

- FS matching ignores `.cohub/**` to avoid self-trigger loops.
- Turn filters (`sessionIds`, `sources`, and optional label filters) are separate from the `prompt.sessionId` action target.
- Hook context is exposed through curated `COHUB_HOOK_*` environment variables; absent optional values are empty strings.
- The hook cache is invalidated by `space.workspace.ready` and by FS changes under `.cohub/hooks/**`; a workspace that is still missing is never cached as "no hooks".
- Treat hook runs as Tasks and inspect their terminal status instead of polling Chat.

## See also

- https://github.com/talesofai/cohub/blob/main/docs/space-hooks.md
- [Space Hooks automation](../playbooks/space-hooks-automation.md) · [App Actions](./app-actions.md)

---

[中文](../zh/concepts/hooks.md)
