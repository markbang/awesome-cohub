---
id: cohub.bp.minimal-scopes
title: Ship Apps with least privilege
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
  - https://cohub.live/docs/apps
  - https://github.com/talesofai/cohub/blob/main/docs/apps-guide.md
  - https://github.com/talesofai/cohub/blob/main/packages/sdk/docs/app-runtime-guide.md
---

# Ship Apps with least privilege

## Current model

The product now calls the published surface an **App**. `client.apps` and `appScopes` are canonical; `client.works` and `workScopes` remain compatibility aliases for older clients.

| Grant source | Who supplies it | Scope boundary |
|--------------|-----------------|----------------|
| **App scopes** | Publisher at publish time | Bounded direct grants on the App's home Space |
| **Viewer grant** | Viewer, through runtime consent | Any permission the viewer currently holds on a selected Space |

`allowedViewerScopes` is deprecated and no longer gates viewer consent. Do not use it as a new security boundary.

Direct App scopes are limited to:

```text
space.view  session.view  file.view  file.edit
taskrun.view  session.prompt.readonly  session.prompt.fullaccess  command.execute
```

`generation.create`, account-level `user.*`, and other management permissions require a viewer grant. `generation.create` is also separate from `taskrun.view`: creating a task does not grant permission to poll its result.

## Steps

1. List the features the App actually implements.
2. Map each feature to the smallest direct App scope or user-gesture viewer grant.
3. Publish only direct scopes needed for reads on the App's home Space.
4. Request actions or another Space only after a clear user gesture, with a useful `reason`.
5. Re-test as a fresh viewer. Grants are per Space, last 14 days, and are revalidated against current membership and role.
6. Render state from `client.context().permissions`; let the host own grant caching and renewal.

## Common sets

| App type | Direct App scopes | Runtime viewer grant |
|----------|-------------------|----------------------|
| Static site | none | none |
| File reader | `space.view`, `file.view` | none |
| LLM chat on home Space | `space.view`, `session.view` | matching `session.prompt.*` |
| Image generation | `space.view`, `taskrun.view` | `generation.create` |
| Task Browser - Mine | none or home-Space reads | `user.taskrun.list` |
| Cross-Space reader | home-Space scopes as needed | `auth.requestSpace()` with `file.view` / `session.view` |

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
