---
id: cohub.ap.browser-router-static
title: BrowserRouter on static Apps
type: anti-pattern
related: [cohub.bp.publish-static-work, cohub.bp.work-kit-product]
---

# BrowserRouter on static Apps

## Why it hurts

Deep links and refreshes can 404, and absolute `/assets` paths break directory App hosting.

## Do this instead

Use `base: "./"` plus **HashRouter** (or hash links) for static directory Apps, or pre-render the routes.

## Smell test

A refresh on a nested route should render the same App without requiring a server-side route rewrite.

---

[中文](../zh/anti-patterns/browser-router-static.md)
