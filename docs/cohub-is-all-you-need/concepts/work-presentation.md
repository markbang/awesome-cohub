---
id: cohub.concept.work-presentation
title: App presentation, surfaces, and runtime context
type: concept
related:
  - cohub.bp.hide-cohub-bar
  - cohub.concept.work
  - cohub.bp.viewer-auth-user-scopes
sources:
  - https://cohub.live/changelog (v2.12, v2.15, v2.24, v2.26, v2.35, v2.37, v2.39, v2.44-v2.46)
  - https://github.com/talesofai/cohub/blob/main/docs/apps-guide.md
  - https://github.com/talesofai/cohub/blob/main/packages/sdk/docs/app-runtime-guide.md
---

# App presentation, surfaces, and runtime context

A published App can run as a public page, a workspace window, a New Chat background, an overlay, or an embedded frame. App is the canonical SDK/API term; this card keeps Work in the filename and public `/w/` URL for compatibility.

## Presentation surfaces

| Surface | Behavior |
|---------|----------|
| Public page | Opens the current published App at `/:username/:spaceSlug/w/:appSlug` |
| Workspace window | Opens as an app tab and refreshes in place when the version changes; recently used tabs stay mounted (default 3) so runtime state survives tab switches |
| New Chat background | Can attach one compact Composer context chip while visible |
| Overlay (v2.45) | Transparent, chrome-free layer above the workspace, below system surfaces |
| Embed (v2.44) | An App renders another App's public page in an iframe and forwards its shell location |
| Desktop open | An Agent opens an App or file in the Cohub tab that originated the request |

Query parameters and URL fragments are forwarded to embedded web and port Apps; `cohub_*` parameters are reserved for the host. User-activated embedded capabilities include clipboard write, fullscreen, web share, and pointer lock where the surface permits them.

## Overlay surface (v2.45)

Overlays suit companions, heads-up displays, and one-shot effects:

```bash
cohub desktop open <app> --as overlay
cohub desktop open <app> --as overlay --call hud.ping --data '{"message":"Deploying..."}'
```

An App can also declare its surface at publish time; workspace opens (the Open button, installed Apps, chat links, App-to-App navigation) honor it, and `--as window` overrides for one command:

```html
<meta name="cohub:surface" content="overlay" />
```

The App controls its hit area and geometry:

```js
const rect = panel.getBoundingClientRect();
cohub.app.requestConfigure({
  inputRegion: [{ x: rect.left, y: rect.top, width: rect.width, height: rect.height }],
});
```

- `inputRegion` is `"none"` (default, fully click-through), `"all"`, or rectangles in overlay-local CSS pixels. It only decides where pointer events go; it never clips what the overlay paints.
- `geometry` (`anchor`, `x`, `y`, `width`, `height`) shrinks the overlay; the host clamps it on-screen.
- The App must paint its own transparency (`html, body { background: transparent }`) and declare `<meta name="color-scheme" content="light dark">`, or Chromium paints an opaque backdrop. Avoid `backdrop-filter`.
- Up to eight overlays mount at once; `cohub.app.requestClose()` closes one, and `Escape` dismisses all of them. The overlay cap surfaces a notice instead of silently falling back to a window.

## Embedding other Apps (v2.44)

An App can host other Apps in iframes; the public page keeps owning the embedded App's runtime (bridge, consent, commerce):

```js
const embed = cohub.app.embed.attach(frame, {
  appId: context.app.id,
  shell: context.shell ?? null,
  onCloseRequest: () => frame.remove(),
});
cohub.app.onContextChanged((next) => embed.setShell(next.shell ?? null));
embed.dispose();
```

The embedded App sees the forwarded location as `context.shell` with `surface: "embed"` and learns its host from `context.invocation.embedder` (`{ appId, slug }`), set only when the embedding page is verified. Forwarded ids are navigation hints, never authorization inputs. Any App can ask its host to close with `cohub.app.requestClose()`.

## Runtime context

Inside a published App, `client.context()` can include:

- `app` identity and `app.homeSpace` (the Space that owns the App)
- `viewer` and current permissions
- `invocation` provenance such as `surface` (`"workspace"`, `"background"`, `"overlay"`, `"embed"`, `"page"`, `"broker"`), `source`, `spaceId`, `sessionId`, `turnId`, and `toolCallId`
- `shell` (v2.39+) - the current workspace location: `space`, `session`, and viewed `turn` (each may be null), with `shell.surface` telling the App where it runs

```js
const ctx = await client.context();
const spaceId =
  ctx.shell?.space?.id ?? ctx.invocation?.spaceId ?? ctx.app.homeSpace?.id;
```

Use `client.app.onContextChanged()` to react to sign-in, invocation, navigation, and grant changes instead of polling. Invocation and shell are provenance, not authorization: reading anything still requires the App's own grants.

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
