---
id: cohub.concept.work-presentation
title: App presentation, surfaces, and runtime context
type: concept
related:
  - cohub.bp.hide-cohub-bar
  - cohub.concept.work
  - cohub.bp.viewer-auth-user-scopes
  - cohub.concept.realtime-rooms
sources:
  - https://cohub.live/changelog (v2.12-v2.70)
  - https://github.com/talesofai/cohub/blob/main/docs/product/en/developers/apps.md
  - https://github.com/talesofai/cohub/blob/main/docs/product/en/developers/apps.md
---

# App presentation, surfaces, and runtime context

A published App can run as a public page, a workspace window, a New Chat background, an overlay, or an embedded frame. App is the canonical SDK/API term; this card keeps Work in the filename and public `/w/` URL for compatibility.

## Presentation surfaces

| Surface | Behavior |
|---------|----------|
| Public page | Docked Cohub bar above the App (identity, views, publisher, version switcher); the App viewport is exactly what the viewer sees |
| Workspace window | App tab that refreshes in place on version change; recently used tabs stay mounted (default 3) |
| New Chat background | One compact Composer context chip while visible |
| Overlay | Transparent, chrome-free layer above the workspace, below system surfaces |
| Embed | An App renders another App's public page in an iframe and forwards its shell location |
| Desktop open | An Agent opens an App or file in the Cohub tab that originated the request |

Query parameters and URL fragments are forwarded to embedded web and port Apps; `cohub_*` parameters are reserved for the host. User-activated embedded capabilities include clipboard write, fullscreen, web share, and pointer lock where the surface permits them.

## Version history and provenance (v2.50)

Published Apps expose immutable version history:

- Public version switcher uses `?cohub_v=<n>`; SDK `getBySlug(..., { version })` and `listPublicVersions()`.
- Every version deep-links to the session and turn that produced it, validated against the App's own Space and gated on `session.view`.
- The raw publish-time `meta.source` is no longer emitted; viewer-scoped responses are never shared-cached.

## Overlay surface

```bash
cohub desktop open <app> --as overlay
cohub desktop open <app> --as overlay --call hud.ping --data '{"message":"Deploying..."}'
```

An App can declare its surface at publish time; workspace opens (Open button, installed Apps, chat links, App-to-App navigation) honor it, and `--as window` overrides for one command:

```html
<meta name="cohub:surface" content="overlay" />
```

`cohub.app.requestConfigure({ inputRegion, geometry })` claims pointer regions (`"none"`, `"all"`, or rectangles) and can shrink the overlay. The region only routes pointer events; it never clips painting. The App must paint its own transparency and declare `<meta name="color-scheme" content="light dark">`, or Chromium paints an opaque backdrop. Avoid `backdrop-filter`.

Up to eight overlays mount at once; `cohub.app.requestClose()` closes one, and `Escape` dismisses all. The host coalesces pointer hit-testing to one pass per frame, and rect regions release as soon as the pointer leaves them.

## Embedding other Apps

```js
const embed = cohub.app.embed.attach(frame, {
  appId: context.app.id,
  shell: context.shell ?? null,
  onCloseRequest: () => frame.remove(),
});
cohub.app.onContextChanged((next) => embed.setShell(next.shell ?? null));
embed.dispose();
```

The embedded App sees `context.shell` with `surface: "embed"` and `context.invocation.embedder` (`{ appId, slug }`), set only for a verified host. Forwarded ids are navigation hints, never authorization inputs.

## App platform (v2.59)

Apps published or installed in the **Shell Space** are trusted: they receive host consent and run without an authorization dialog. Apps can also:

- Declare file handlers with `<meta name="cohub:file-handlers" content=".board" />`; installing registers them in `.cohub/apps.json` without replacing an existing default, and viewers change defaults under **Open with...**.
- Own their window through the `cohub.app.runtime` protocol and SDK `client.app.window`, `onBeforeClose`, `onDrop`, and `onLaunch` (one file per window; it also fires on re-open and rename/move).
- Get `file.view` / `file.edit` on the Space that published or installed them without a dialog, which makes installing App a trust decision for the whole Space.
- Follow host appearance and locale, and receive dropped or opened Cohub resources.
- Request camera, microphone, and screen grants with `<meta name="cohub:devices">`.

Resource Apps (task inspector, checkpoint explorer, schedule manager, App manager) run in dedicated App tabs on a shared resource kit.

## Runtime context

Inside a published App, `client.context()` can include:

- `app` identity and `app.homeSpace` (the Space that owns the App)
- `viewer` and current permissions
- `invocation` provenance (`surface`, `source`, `spaceId`, `sessionId`, `turnId`, `toolCallId`)
- `shell` — the current workspace location (`space`, `session`, `turn`), with `shell.surface` telling the App where it runs

Use `client.app.onContextChanged()` to react to sign-in, navigation, invocation, and grant changes instead of polling. Invocation and shell are provenance, not authorization.

## Callable surface

An App registers named methods; Cohub exposes no arbitrary DOM access or script evaluation:

```ts
client.app.surface.handle("image.open", async (input, { commandId }) => {
  openImageStudio(input);
  return { accepted: true };
});
```

```bash
cohub desktop open <app> --call image.open --data '{"id":"hero"}'
```

Calls route only to the frontend instance that originated the request and only from approved Cohub App origins. Delivery is at-least-once. `cohub desktop open` fails fast with `no_active_client` when the originating desktop is gone (10s accept window; 30s for a plain open, 10 minutes for `--call`).

## Cohub chrome

Pro/Max publishers can hide the public Cohub footer with `hideCohubBar` or `--hide-cohub-bar` / `--show-cohub-bar`. This changes host presentation and sharing metadata; it does not replace the App's own navigation.

---

[中文](../zh/concepts/work-presentation.md)
