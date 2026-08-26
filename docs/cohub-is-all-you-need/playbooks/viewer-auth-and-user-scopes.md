---
id: cohub.bp.viewer-auth-user-scopes
title: Viewer authorization and account scopes
type: playbook
audience: [builder, agent-author]
features: [work, app, sdk, auth, scopes]
difficulty: advanced
related: [cohub.bp.minimal-scopes, cohub.bp.work-kit-product, cohub.concept.task-browser]
sources:
  - https://github.com/talesofai/cohub/blob/main/docs/works-guide.md
  - https://github.com/talesofai/cohub/blob/main/packages/sdk/docs/work-runtime-guide.md
  - https://cohub.live/docs/developers/sdk
---

# Viewer authorization and account scopes

## When

A published Work/App must call Cohub APIs as the viewer, access another Space, or perform an action that cannot be pre-granted by the publisher.

## Grant rules

- App scopes are direct publisher grants, limited to the App's own Space.
- Viewer grants are requested with `client.auth.request()` or `client.auth.requestSpace()` from a user gesture.
- The viewer must currently hold every requested permission on the target Space at grant time and use time.
- Grants are per Space and last 14 days. Revocation is immediate; silent reuse cannot revive a revoked grant.
- `allowedViewerScopes` is a deprecated compatibility field, not a current allow-list boundary.

## Request pattern

```js
const ctx = await client.context();

// Known target Space; silent if an existing grant covers the request.
await client.auth.request({
  scopes: ["generation.create"],
  reason: "Generate an image for this action.",
});

// Let the viewer choose a Space in the same consent flow.
const result = await client.auth.requestSpace({
  scopes: ["file.view", "session.view"],
  reason: "Read the Space you choose.",
});
if (result.granted && result.space) {
  const space = client.space(result.space.id);
}
```

Use `alwaysAsk: true` when the viewer must explicitly reconfirm or choose a different Space. Read `ctx.permissions.viewerGrants` to render state without opening a dialog.

## Account-level scopes

| Scope | Enables |
|-------|---------|
| `user.space.list` | `client.spaces.list()` |
| `user.session.list` | `client.user.listSessions()` |
| `user.taskrun.list` | Unscoped `client.tasks.list()` for Task Runs owned by the viewer |
| `user.usage.read` | `client.user.getActivity()` |

These scopes are viewer-grant-only and are not bound to the App's Space. Listing a Space or an owned Task Run does not grant access to that Space or to other users' data.

## Scope pairing

- `generation.create` creates a generation task; `taskrun.view` reads or polls it.
- `session.prompt.*` sends a prompt; `session.view` reads the resulting turn.
- A viewer grant for Space A does not authorize the same call against Space B.

## Done when

- [ ] Authorization happens after a meaningful user action
- [ ] The consent reason names the user-visible operation
- [ ] Cross-Space targets are explicit
- [ ] 403s are diagnosed as missing or stale grants rather than hidden retries

## Avoid

- Auth on load
- A second login system inside the iframe
- Treating `viewerScopes` in a token as authoritative grant state
- Requesting account-wide scopes for a Space-local feature

---

[中文](../zh/playbooks/viewer-auth-and-user-scopes.md)
