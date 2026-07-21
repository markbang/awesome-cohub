---
id: cohub.ap.bake-live-data-dist
title: Baking live data into dist
title_zh: 把活数据烤进 dist
type: anti-pattern
related: [cohub.bp.work-kit-product, cohub.bp.space-knowledge-base]
---

# Baking live data into dist · 把活数据烤进 dist

## Why it hurts · 伤害
Stale snapshots, leaked secrets, impossible multi-viewer freshness.

## Do this instead · 正确做法
Publish UI shell; read Space files / APIs at runtime with proper scopes.

## Smell test
If a re-publish is required for every data change, data is in the wrong layer.
