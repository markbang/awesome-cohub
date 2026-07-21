---
id: cohub.ap.browser-router-static
title: 静态 Work 使用 BrowserRouter
type: anti-pattern
related: [cohub.bp.publish-static-work, cohub.bp.work-kit-product]
---

# 静态 Work 使用 BrowserRouter

## 伤害
Deep links and refresh 404; absolute `/assets` paths break directory hosting.

## 正确做法
`base: "./"` + **HashRouter** (or hash links) for static directory Works.

## Smell test
Refresh on a nested route should still render.

---

[English](../../anti-patterns/browser-router-static.md)
