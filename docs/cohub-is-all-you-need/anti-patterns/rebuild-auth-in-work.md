---
id: cohub.ap.rebuild-auth-in-work
title: Rebuilding Cohub auth inside an App
type: anti-pattern
related: [cohub.bp.work-kit-product, cohub.bp.work-commerce]
---

# Rebuilding Cohub auth inside an App

## Why it hurts

A second identity system breaks consent, duplicates security boundaries, and cannot share Cohub's billing and viewer-grant model correctly.

## Do this instead

Use the published App runtime with `client.auth.request()` and host-owned checkout. Do not invent a second account system.

## Smell test

If an App has its own Cohub password form, stop and use the platform session/SDK.

---

[中文](../zh/anti-patterns/rebuild-auth-in-work.md)
