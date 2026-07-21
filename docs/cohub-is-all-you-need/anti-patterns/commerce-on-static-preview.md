---
id: cohub.ap.commerce-on-static-preview
title: Testing commerce on static preview
type: anti-pattern
related: [cohub.bp.work-commerce]
---

# Testing commerce on static preview

## Why it hurts
`context()` is null; purchase/entitlement APIs fail; you debug ghosts.

## Do this instead
Always exercise commerce on the **published Work URL** inside Cohub shell.

## Smell test
If `cohub.context()` is null, you are not in the Work runtime.

---

[中文](../zh/anti-patterns/commerce-on-static-preview.md)
