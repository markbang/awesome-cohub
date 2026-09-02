---
id: cohub.bp.viewer-auth-user-scopes
title: App viewer authorization and account scopes
type: playbook
audience: [builder, agent-author]
features: [work, app, sdk, auth, scopes]
difficulty: advanced
related: [cohub.bp.minimal-scopes, cohub.bp.work-kit-product, cohub.concept.task-browser, cohub.concept.work-presentation]
sources:
  - https://github.com/talesofai/cohub/blob/main/docs/apps-guide.md
  - https://github.com/talesofai/cohub/blob/main/packages/sdk/docs/app-runtime-guide.md
  - https://cohub.live/docs/developers/sdk
---

# App viewer authorization and account scopes

## When

A published App must act as the viewer, access another Space, or perform an action that the publisher cannot grant directly to the App's home Space.

## Grant rules

- App scopes are direct publisher grants, limited to the App's home Space.
- Viewer grants use `client.auth.request()` or `client.auth.requestSpace()` and must start from a user gesture.
- At grant time and use time, the viewer must hold every requested Space permission on the target Space.
- Grants are per Space and last 14 days. Revocation takes effect immediately; silent reuse cannot revive a revoked grant.
- `allowedViewerScopes` is a deprecated compatibility field, not a current allow-list boundary.

## Request pattern

```js
const ctx = await client.context();

// Known Space; silent when an existing grant covers the request.
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

Use `alwaysAsk: true` when the viewer must reconfirm or choose a different Space. Render `ctx.permissions.viewerGrants` without opening a dialog.

`ctx.app.homeSpace` identifies the Space that owns the App. `ctx.invocation?.spaceId` identifies the Space that hosted the current invocation, such as a New Chat background or `desktop open`; these are context/provenance fields, not authorization grants. The old top-level `ctx.space` field is deprecated.

## Bridge and broker modes

Bridge mode is the normal Cohub iframe path. A standalone App can use broker mode with an App id or owner/Space/App slug triple; authorization occurs in a popup. In broker mode, request authorization before public SDK calls that may acquire a token, or the browser may block the second popup.

## Account-level scopes

| Scope | Enables |
|-------|---------|
| `user.space.list` | `client.spaces.list()` |
| `user.session.list` | `client.user.listSessions()` |
| `user.taskrun.list` | Unscoped `client.tasks.list()` for Task Runs owned by the viewer |
| `user.usage.read` | `client.user.getActivity()` |

These scopes are viewer-grant-only and are not bound to the App's home Space. Listing a Space or an owned Task Run does not grant access to that Space or to other users' data.

## Scope pairing

- `generation.create` creates a generation task; `taskrun.view` reads or polls it.
- `session.prompt.*` sends a prompt; `session.view` reads the resulting turn.
- A viewer grant for Space A does not authorize the same call against Space B.

## Done when

- [ ] Authorization follows a meaningful user action
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
