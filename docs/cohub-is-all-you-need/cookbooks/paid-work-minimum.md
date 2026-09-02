---
id: cohub.cb.paid-work-minimum
title: Paid App minimum
type: cookbook
audience: [builder]
difficulty: advanced
related: [cohub.bp.work-kit-product, cohub.bp.work-commerce, cohub.bp.minimal-scopes]
---

# Paid App minimum

The smallest honest path to a commerce-ready App, not a static mock.

## Outcome

- Work Kit (or equivalent) App with runtime
- Scopes sufficient for the APIs the App actually calls
- Commerce tested on a **published** App, not only a static preview

## Path

1. [work-kit-product](../playbooks/work-kit-product.md) - scaffold and local/dev port check
2. [minimal-scopes](../playbooks/minimal-scopes.md) - list only APIs the App calls
3. [work-commerce](../playbooks/work-commerce.md) - features/credits via App commerce
4. [work-promotions](../playbooks/work-promotions.md) - optional aggregate funnel measurement
5. Avoid [commerce-on-static-preview](../anti-patterns/commerce-on-static-preview.md), [rebuild-auth-in-work](../anti-patterns/rebuild-auth-in-work.md), and [static-work-as-api](../anti-patterns/static-work-as-api.md)
6. Publish the directory/runtime App and Save `commerce-smoke-ok`.

## Done when

- [ ] The paid path fails closed without required grants and succeeds with the minimal set
- [ ] No custom login stack is reinvented inside the App
- [ ] Purchase retries use a stable purchase attempt id

---

[中文](../zh/cookbooks/paid-work-minimum.md)
