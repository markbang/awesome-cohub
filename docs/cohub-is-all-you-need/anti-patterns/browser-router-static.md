---
id: cohub.ap.browser-router-static
title: BrowserRouter on static Works
type: anti-pattern
related: [cohub.bp.publish-static-work, cohub.bp.work-kit-product]
---

# BrowserRouter on static Works

## Why it hurts
Deep links and refresh 404; absolute `/assets` paths break directory hosting.

## Do this instead
`base: "./"` + **HashRouter** (or hash links) for static directory Works.

## Smell test
Refresh on a nested route should still render.

---

[中文](../zh/anti-patterns/browser-router-static.md)
