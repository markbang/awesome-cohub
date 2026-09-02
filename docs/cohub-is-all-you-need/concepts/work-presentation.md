---
id: cohub.concept.work-presentation
title: App presentation and runtime context
type: concept
related:
  - cohub.bp.hide-cohub-bar
  - cohub.concept.work
  - cohub.bp.viewer-auth-user-scopes
sources:
  - https://cohub.live/changelog (v2.12, v2.15, v2.24, v2.26, v2.35, v2.37)
  - https://github.com/talesofai/cohub/blob/main/docs/apps-guide.md
  - https://github.com/talesofai/cohub/blob/main/packages/sdk/docs/app-runtime-guide.md
---

# App presentation and runtime context

A published App can run as a public page, a workspace preview, a New Chat background, or a standalone brokered page. App is the canonical SDK/API term; this card keeps Work in the filename and public `/w/` URL for compatibility.

## Presentation surfaces

| Surface | Behavior |
|---------|----------|
| Public page | Opens the current published App at `/:username/:spaceSlug/w/:appSlug` |
| Workspace preview | Opens as a `?window=app:<appId>` tab and refreshes in place when the version changes |
| New Chat background | Can attach one compact Composer context chip while visible |
| Desktop open | An Agent opens an App or file in the Cohub tab that originated the request |

Query parameters and URL fragments are forwarded to embedded web and port Apps; `cohub_*` parameters are reserved for the host. User-activated embedded capabilities include clipboard write, fullscreen, web share, and pointer lock where the surface permits them.

## Runtime context (v2.35-v2.37)

Inside a published App, `client.context()` can include:

- `app` identity and `app.homeSpace` (the Space that owns the App)
- `viewer` and current permissions
- `invocation` provenance such as `surface`, `source`, `spaceId`, `sessionId`, `turnId`, and `toolCallId`

For a New Chat background, `invocation.spaceId` identifies the Space hosting the background; it may differ from `app.homeSpace.id`. The old top-level `context.space` field is deprecated. Invocation is provenance, not authorization.

Bridge mode is the normal Cohub iframe path. Standalone pages can opt into broker mode with an App id or owner/Space/App slug triple; broker mode obtains runtime auth through a popup and has no workspace navigation bridge.

## Callable surface

An App registers named methods; Cohub does not expose arbitrary DOM access or script evaluation:

```ts
client.app.surface.handle("image.open", async (input, { commandId }) => {
  openImageStudio(input);
  return { accepted: true };
});
```

An Agent invokes a registered method:

```bash
cohub desktop open <appId|url|app://...|username/space/app> \
  --call image.open --data '{"id":"hero"}'
```

Calls are routed only to the frontend instance that originated the request and only from approved Cohub App origins. Delivery is at-least-once, so handlers should tolerate repeats. Native file and Board Apps can be previewed but expose no callable surface.

## Cohub chrome

Pro/Max publishers can hide the public Cohub footer with `hideCohubBar` or `--hide-cohub-bar` / `--show-cohub-bar`. This changes host presentation and sharing metadata; it does not replace the App's own navigation.

---

[中文](../zh/concepts/work-presentation.md)
