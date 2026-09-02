---
id: cohub.concept.commerce
title: App commerce
type: concept
related: [cohub.bp.work-commerce, cohub.bp.work-promotions]
sources:
  - https://github.com/talesofai/cohub/blob/main/docs/app-commerce-guide.md
  - https://cohub.live/changelog (v2.10, v2.23)
---

# App commerce

App commerce sells one-time products backed by Space-level billing. The SDK surface is `client.app.commerce.*`; older Work-era `work.commerce` spellings may remain as aliases.

## Runtime

Commerce runs only inside a published App shell: `context()`, authorization, purchase, and entitlement calls do not work on raw static URLs or local previews.

## Core objects

- **Product** - what is sold (`productKey`; price and Cohub Balance amount are immutable after creation)
- **Benefit** - a `feature` gate or `credits` grant
- **Order / checkout** - host-owned redirect loop
- **Credits** - virtual `cohub_credit` balance; consume with an idempotent `operationId`
- **Purchase attempt** - stable `purchaseAttemptId` reused across timeout retries
- **Cohub Balance** - optional global USD balance component on a product

## Reliable purchase loop

Feature: load -> entitlement -> purchase -> return -> reload.

Credits: load -> balance -> consume -> purchase when empty -> return -> reload.

Purchase calls carry a stable `purchaseAttemptId` (or idempotency key) so a timeout retry resolves to the original Billing order instead of creating a duplicate.

## See also

- [App commerce](../playbooks/work-commerce.md)
- [App promotions](../playbooks/work-promotions.md)
- https://github.com/talesofai/cohub/blob/main/docs/app-commerce-guide.md

---

[中文](../zh/concepts/commerce.md)
