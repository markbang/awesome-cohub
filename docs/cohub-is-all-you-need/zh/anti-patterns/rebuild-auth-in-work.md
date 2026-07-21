---
id: cohub.ap.rebuild-auth-in-work
title: 在 Work 里自建登录
type: anti-pattern
related: [cohub.bp.work-kit-product, cohub.bp.work-commerce]
---

# 在 Work 里自建登录

## 伤害
Duplicate identity, broken consent, security foot-guns, no shared billing/viewer model.

## 正确做法
Use published Work runtime + `cohub.auth.request` / host checkout. Don’t invent a second account system.

## Smell test
If your Work has its own password form for Cohub users, stop.

---

[English](../../anti-patterns/rebuild-auth-in-work.md)
