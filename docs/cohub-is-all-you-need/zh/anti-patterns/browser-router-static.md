---
id: cohub.ap.browser-router-static
title: 静态 App 使用 BrowserRouter
type: anti-pattern
related: [cohub.bp.publish-static-work, cohub.bp.work-kit-product]
---

# 静态 App 使用 BrowserRouter

## 为什么有问题

深链接和刷新可能 404，绝对 `/assets` 路径也会破坏 directory App 托管。

## 正确做法

静态 directory App 使用 `base: "./"` + **HashRouter**（或 hash 链接），或者预渲染路由。

## 嗅探标准

嵌套路由刷新后仍应显示同一个 App，不依赖服务端额外的路由重写。

---

[English](../../anti-patterns/browser-router-static.md)
