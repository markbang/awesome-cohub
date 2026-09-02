---
id: cohub.ap.static-work-as-api
title: Static App as API backend
type: anti-pattern
related: [cohub.bp.publish-static-work, cohub.bp.work-kit-product, cohub.bp.port-preview]
---

# Static App as API backend

## Why it hurts

Directory/static Apps are files on a CDN-like surface. They do not host your Node API, WebSockets, or long-lived servers.

## Do this instead

- Static frontends call platform/App APIs with the scopes they need.
- Dev-only live servers use port preview, not the default production shape.
- True backends stay on proper hosts; the App is the shell and client surface.

## Smell test

Your directory App README says it “also runs Express on :3000”.

---

[中文](../zh/anti-patterns/static-work-as-api.md)
