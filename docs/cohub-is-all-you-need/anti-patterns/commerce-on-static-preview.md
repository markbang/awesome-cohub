---
id: cohub.ap.commerce-on-static-preview
title: Testing commerce on static preview
title_zh: 在静态预览上测商业化
type: anti-pattern
related: [cohub.bp.work-commerce]
---

# Testing commerce on static preview · 在静态预览上测商业化

## Why it hurts · 伤害
`context()` is null; purchase/entitlement APIs fail; you debug ghosts.

## Do this instead · 正确做法
Always exercise commerce on the **published Work URL** inside Cohub shell.

## Smell test
If `cohub.context()` is null, you are not in the Work runtime.
