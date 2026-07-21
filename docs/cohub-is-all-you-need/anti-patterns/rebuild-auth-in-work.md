---
id: cohub.ap.rebuild-auth-in-work
title: Rebuilding Cohub auth inside the Work
type: anti-pattern
related: [cohub.bp.work-kit-product, cohub.bp.work-commerce]
---

# Rebuilding Cohub auth inside the Work

## Why it hurts
Duplicate identity, broken consent, security foot-guns, no shared billing/viewer model.

## Do this instead
Use published Work runtime + `cohub.auth.request` / host checkout. Don’t invent a second account system.

## Smell test
If your Work has its own password form for Cohub users, stop.

---

[中文](../zh/anti-patterns/rebuild-auth-in-work.md)
