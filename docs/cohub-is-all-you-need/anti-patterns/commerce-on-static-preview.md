---
id: cohub.ap.commerce-on-static-preview
title: Testing App commerce on static preview
type: anti-pattern
related: [cohub.bp.work-commerce]
---

# Testing App commerce on static preview

## Why it hurts

`context()` is null outside a published App; purchase and entitlement APIs fail, and the diagnosis becomes misleading.

## Do this instead

Exercise commerce on the **published App URL** inside the Cohub shell.

## Smell test

If `cohub.context()` is null, you are not in the App runtime.

---

[中文](../zh/anti-patterns/commerce-on-static-preview.md)
