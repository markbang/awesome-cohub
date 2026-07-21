---
id: cohub.ap.static-work-as-api
title: Static Work as API backend
type: anti-pattern
related: [cohub.bp.publish-static-work, cohub.bp.work-kit-product, cohub.bp.port-preview]
---

# Static Work as API backend

## Why it hurts

Directory/static Works are files on a CDN-like surface. They do not host your Node API, websockets, or long-lived servers.

## Do this instead

- Static frontends call **platform/Work APIs** with scopes  
- Dev-only live servers → port preview, not default prod  
- True backends stay on proper hosts; Work is the shell  

## Smell test

Your `directory` Work README says “also runs Express on :3000”.

---

[中文](../zh/anti-patterns/static-work-as-api.md)
