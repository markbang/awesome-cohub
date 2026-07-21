---
id: cohub.ap.auth-on-load
title: 页面加载就授权
type: anti-pattern
related: [cohub.bp.minimal-scopes, cohub.bp.work-kit-product]
---

# 页面加载就授权

## 伤害
Consent fatigue, over-permission, blocked first paint, scary demos.

## 正确做法
Request viewer scopes **on gesture** with a clear `reason`. Keep workScopes to safe reads.

## Smell test
A first-time viewer should understand the page before any auth dialog.

---

[English](../../anti-patterns/auth-on-load.md)
