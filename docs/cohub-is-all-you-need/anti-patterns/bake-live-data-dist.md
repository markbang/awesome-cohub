---
id: cohub.ap.bake-live-data-dist
title: Baking live data into dist
type: anti-pattern
related: [cohub.bp.work-kit-product, cohub.bp.space-knowledge-base]
---

# Baking live data into dist

## Why it hurts
Stale snapshots, leaked secrets, impossible multi-viewer freshness.

## Do this instead
Publish UI shell; read Space files / APIs at runtime with proper scopes.

## Smell test
If a re-publish is required for every data change, data is in the wrong layer.

---

[中文](../zh/anti-patterns/bake-live-data-dist.md)
