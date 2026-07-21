---
id: cohub.ap.browser-router-static
title: BrowserRouter on static Works
title_zh: 静态 Work 使用 BrowserRouter
type: anti-pattern
related: [cohub.bp.publish-static-work, cohub.bp.work-kit-product]
---

# BrowserRouter on static Works · 静态 Work 使用 BrowserRouter

## Why it hurts · 伤害
Deep links and refresh 404; absolute `/assets` paths break directory hosting.

## Do this instead · 正确做法
`base: "./"` + **HashRouter** (or hash links) for static directory Works.

## Smell test
Refresh on a nested route should still render.
