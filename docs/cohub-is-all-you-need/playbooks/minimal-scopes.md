---
id: cohub.bp.minimal-scopes
title: Ship Work Apps with least privilege
type: playbook
audience: [builder, agent]
features: [work, app, scopes, sdk]
difficulty: intermediate
related:
  - cohub.concept.work
  - cohub.concept.task-browser
  - cohub.bp.publish-static-work
  - cohub.bp.work-kit-product
  - cohub.bp.viewer-auth-user-scopes
sources:
  - https://cohub.live/docs/create/works
  - https://github.com/talesofai/cohub/blob/main/docs/works-guide.md
  - https://github.com/talesofai/cohub/blob/main/packages/sdk/docs/work-runtime-guide.md
---

# Ship Work Apps with least privilege

## The current model

The user-facing product still calls a published surface a **Work**; the SDK/API canonical vocabulary is **App** (`client.apps`, `appScopes`).

| Grant source | Who supplies it | Scope boundary |
|--------------|-----------------|----------------|
| **App scopes** | Publisher at publish time | Bounded direct grants on the App's own Space |
| **Viewer grant** | Viewer, through a runtime consent flow | Any permission the viewer currently holds on a selected Space |

`allowedViewerScopes` is deprecated and no longer gates what a viewer may request. Keep it only when maintaining an old payload; do not design a new App around it.

Direct App scopes are limited to:

```text
space.view  session.view  file.view  file.edit
taskrun.view  session.prompt.readonly  session.prompt.fullaccess  command.execute
```

`generation.create`, account-level `user.*`, and other management permissions require a viewer grant. `taskrun.view` is separate from `generation.create`: a generation App needs create permission plus permission to poll the returned Task Run.

## Steps

1. List the features the App actually implements.
2. Map each feature to the smallest App scope or user-gesture viewer grant.
3. Publish only direct scopes needed for reads on the App's own Space.
4. Request action or cross-Space scopes only after a clear user gesture and explain the `reason`.
5. Re-test as a fresh viewer where possible. Grants are per Space, last 14 days, and are revalidated against current membership/role.
6. Render current grant state from `client.context().permissions`; do not build a second grant cache.

## Common sets

| App type | Direct App scopes | Runtime viewer grant |
|----------|-------------------|----------------------|
| Static site | none | none |
| File reader | `space.view`, `file.view` | none |
| LLM chat on own Space | `space.view`, `session.view` | `session.prompt.fullaccess` or `readonly` |
| Image generation | `space.view`, `taskrun.view` | `generation.create` |
| Task Browser - Mine | none or own-Space reads | `user.taskrun.list` |
| Cross-Space reader | own-Space scopes as needed | `auth.requestSpace()` with `file.view` / `session.view` |

## Done when

- [ ] Every grant corresponds to a visible feature
- [ ] No authorization wall appears on first paint
- [ ] Generation creation and result polling both work
- [ ] A static App carries no prompt, generation, or account-wide scope

## Avoid

- Asking for `fullaccess` or `user.*` “just in case”
- Treating `allowedViewerScopes` as a current security boundary
- Assuming a viewer grant on one Space transfers to another
- Copying another App's scope set without checking its API calls

---

[中文](../zh/playbooks/minimal-scopes.md)
