---
id: cohub.concept.commerce
title: Work commerce
title_zh: Work 商业化
type: concept
---

# Work commerce

Work commerce sells **one-time products** backed by Space-level billing.

## Runtime
Only inside published Work shell: `cohub.context()`, `cohub.auth.*`, `cohub.work.commerce.*`.

## Core objects
- **Product** — what is sold (`productKey`, immutable price after create)
- **Benefit** — `feature` gate or `credits` grant
- **Order / checkout** — host-owned redirect loop
- **Credits** — virtual `cohub_credit` balance; consume with idempotent `operationId`

## Loops
- Feature: load → entitlement → purchase → return
- Credits: load → balance → consume → purchase when empty

## See also
- Guide: https://github.com/talesofai/cohub/blob/main/docs/work-commerce-guide.md
- Playbook: `cohub.bp.work-commerce`
