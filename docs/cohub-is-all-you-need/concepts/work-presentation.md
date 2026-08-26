---
id: cohub.concept.work-presentation
title: Work presentation and callable surfaces
type: concept
related:
  - cohub.bp.hide-cohub-bar
  - cohub.concept.work
  - cohub.bp.viewer-auth-user-scopes
sources:
  - https://cohub.live/changelog (v2.12, v2.15, v2.24, v2.26)
  - https://github.com/talesofai/cohub/blob/main/packages/sdk/docs/work-runtime-guide.md
---

# Work presentation and callable surfaces

A published Work/App can be more than a page in a new tab. Cohub can host it in a workspace preview, pass invocation context, attach a compact composer chip, and let an Agent call named methods that the App explicitly registers.

## Presentation surfaces

| Surface | Behavior |
|---------|----------|
| Public page | Opens the current published version at the `/w/` URL |
| Workspace preview | Opens beside the Work management page and refreshes in place when a new version is published |
| New Chat background | Can expose one compact composer context chip while visible |
| Desktop open | An Agent can open a file or Work in the originating Cohub tab |

Query parameters and URL fragments are forwarded to embedded web and port Works; `cohub_*` parameters are reserved for the host. Embedded Work frames can delegate user-activated clipboard, fullscreen, web-share, and pointer-lock capabilities according to the current surface.

## Runtime context

Inside a published App, `client.context()` can include the App, Space, viewer, permissions, and an `invocation` snapshot. An invocation identifies the originating Space/session/turn/tool call; it is provenance, not an authorization grant.

The SDK also exposes `client.app.onContextChanged()` so an App can refresh its UI after sign-in, invocation, or grant changes without polling.

## Callable surface

A Work registers named methods; Cohub never exposes arbitrary DOM access or script evaluation:

```ts
client.app.surface.handle("image.open", async (input, { commandId }) => {
  openImageStudio(input);
  return { accepted: true, commandId };
});
```

An Agent invokes a registered method:

```bash
cohub desktop open <work> --call image.open --data '{"id":"hero"}'
```

Calls are routed only to the frontend instance that originated the request and only from approved Cohub app origins. Delivery is at-least-once, so handlers should tolerate repeats. For long interactions, persist the command id and report the final result through the UI API. Native file and Board Works can be previewed but do not expose a callable surface.

## Cohub chrome

Pro/Max publishers can hide the public Cohub footer with `hideCohubBar` or the CLI flags `--hide-cohub-bar` / `--show-cohub-bar`. This changes host presentation and sharing metadata; it does not replace the App's own navigation.

---

[中文](../zh/concepts/work-presentation.md)
