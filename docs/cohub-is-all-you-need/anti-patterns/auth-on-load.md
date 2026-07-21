---
id: cohub.ap.auth-on-load
title: Auth on page load
type: anti-pattern
related: [cohub.bp.minimal-scopes, cohub.bp.work-kit-product]
---

# Auth on page load

## Why it hurts
Consent fatigue, over-permission, blocked first paint, scary demos.

## Do this instead
Request viewer scopes **on gesture** with a clear `reason`. Keep workScopes to safe reads.

## Smell test
A first-time viewer should understand the page before any auth dialog.

---

[中文](../zh/anti-patterns/auth-on-load.md)
