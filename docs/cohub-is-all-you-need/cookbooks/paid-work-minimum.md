---
id: cohub.cb.paid-work-minimum
title: Paid Work minimum
type: cookbook
audience: [builder]
difficulty: advanced
related: [cohub.bp.work-kit-product, cohub.bp.work-commerce, cohub.bp.minimal-scopes]
---

# Paid Work minimum

Smallest honest path to a commercelike Work (not a static mock).

## Outcome

- Work Kit (or equivalent) app with runtime
- Scopes sufficient for billing/session APIs — no “full access”
- Commerce flows tested on a **runtime** Work, not static preview alone

## Path

1. [work-kit-product](../playbooks/work-kit-product.md) — scaffold + local/dev port check  
2. [minimal-scopes](../playbooks/minimal-scopes.md) — list only APIs you call  
3. [work-commerce](../playbooks/work-commerce.md) — features/credits via platform patterns  
4. Anti-patterns:  
   - [commerce-on-static-preview](../anti-patterns/commerce-on-static-preview.md)  
   - [rebuild-auth-in-work](../anti-patterns/rebuild-auth-in-work.md)  
   - [static-work-as-api](../anti-patterns/static-work-as-api.md)  
5. Publish directory/runtime Work; Save `commerce-smoke-ok`.

## Done when

- [ ] Paid path fails closed without scopes (and succeeds with minimal set)  
- [ ] No custom login stack reinvented inside the Work  

---

[中文](../zh/cookbooks/paid-work-minimum.md)
