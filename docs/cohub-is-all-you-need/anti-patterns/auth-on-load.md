---
id: cohub.ap.auth-on-load
title: Auth on page load
title_zh: 页面加载就授权
type: anti-pattern
related: [cohub.bp.minimal-scopes, cohub.bp.work-kit-product]
---

# Auth on page load · 页面加载就授权

## Why it hurts · 伤害
Consent fatigue, over-permission, blocked first paint, scary demos.

## Do this instead · 正确做法
Request viewer scopes **on gesture** with a clear `reason`. Keep workScopes to safe reads.

## Smell test
A first-time viewer should understand the page before any auth dialog.
