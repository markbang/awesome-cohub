---
id: cohub.bp.viewer-auth-user-scopes
title: Viewer authorization and user.* scopes
type: playbook
audience: [builder, agent-author]
features: [work, sdk, auth]
difficulty: advanced
related: [cohub.bp.minimal-scopes, cohub.bp.work-kit-product, cohub.cheat.scopes]
sources:
  - https://github.com/talesofai/cohub/blob/main/docs/works-guide.md
  - https://cohub.run/docs/developers/sdk
  - https://cohub.run/docs/create/works
---

# Viewer authorization and user.* scopes

## When

A published Work must call Cohub APIs **as the viewer** (or with viewer consent), not only with publisher-granted `workScopes`.

## Outcome

- Correct split: **workScopes** vs **allowedViewerScopes**  
- Consent only on user gesture (never on load)  
- Understand silent re-auth cache for returning viewers  

## Two layers

| Layer | Who grants | Examples |
|-------|------------|----------|
| `workScopes` | Publisher at publish time | `space.view`, `file.view`, `session.view`, `taskrun.view` |
| `allowedViewerScopes` | Publisher allow-list; **viewer** approves | `session.prompt.*`, `generation.create`, `user.*` |

### user.* (account-level)

| Scope | Enables |
|-------|---------|
| `user.space.list` | `cohub.spaces.list()` |
| `user.session.list` | `cohub.user.listSessions()` across spaces viewer can already see |
| `user.usage.read` | `cohub.user.getUsage()` |

These are **not** bound to the Work’s Space. They do not widen space-scoped Work permissions.

## Pattern

```js
const cohub = createCohubClient();
const ctx = await cohub.context(); // null outside published shell

// only after a click/gesture:
await cohub.auth.request({
  scopes: ["session.prompt.readonly"],
  reason: "Read session context for this viewer.",
});
```

Returning viewers may **silently reuse** cached grants (periodic re-consent) — still declare allow-list correctly.

## Done when

- [ ] Allow-list includes only scopes you request  
- [ ] No auth wall on first paint  
- [ ] 403 on user.* → missing viewer grant, not “broken SDK”  

## Avoid

- Auth on load ([auth-on-load](../anti-patterns/auth-on-load.md))  
- Rebuilding Cohub login inside the iframe ([rebuild-auth-in-work](../anti-patterns/rebuild-auth-in-work.md))  
- Broad `user.*` “just in case”  

---

[中文](../zh/playbooks/viewer-auth-and-user-scopes.md)
