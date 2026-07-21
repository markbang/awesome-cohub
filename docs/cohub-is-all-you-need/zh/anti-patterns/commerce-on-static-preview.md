---
id: cohub.ap.commerce-on-static-preview
title: 在静态预览上测商业化
type: anti-pattern
related: [cohub.bp.work-commerce]
---

# 在静态预览上测商业化

## 伤害
`context()` is null; purchase/entitlement APIs fail; you debug ghosts.

## 正确做法
Always exercise commerce on the **published Work URL** inside Cohub shell.

## Smell test
If `cohub.context()` is null, you are not in the Work runtime.

---

[English](../../anti-patterns/commerce-on-static-preview.md)
