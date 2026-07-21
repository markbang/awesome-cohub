---
id: cohub.bp.work-commerce
title: Sell features and credits inside a Work
type: playbook
audience: [builder, agent]
features: [work, commerce, sdk, scopes]
difficulty: advanced
related: [cohub.bp.work-kit-product, cohub.bp.minimal-scopes, cohub.concept.work, cohub.concept.commerce]
sources:
  - https://github.com/talesofai/cohub/blob/main/docs/work-commerce-guide.md
  - https://cohub.run/docs/create/works
---

# Sell features and credits inside a Work

## When

A **published Work** should gate a capability or meter usage with one-time products (feature unlock and/or credit packs).

## Outcome

- Products + benefits configured at Space billing scope (`business = space`)
- Work hardcodes `productKey` / `benefitKey`
- Closed loop works **only** inside Cohub Work shell:
  - feature: `load → gate → purchase → return → load`
  - credits: `load → balance → consume → (insufficient? purchase) → return`

## Preconditions

1. Work is published (not raw static URL / local preview).
2. You develop commerce against the **public Work URL**.
3. Checkout state is owned by the **outer host** (sign-in, top-level navigation, return), not primarily by the iframe.

## Benefit types

| Type | Role |
|------|------|
| `feature` | Access gate via entitlement metadata (`enabled`, limits) |
| `credits` | Consumable balance auto-granted on paid order (`cohub_credit`) |

## Steps

1. Design keys as **versioned** product ids (`pro_unlock_v2`, `credit_pack_050`). Prices are immutable after create — change price by new product + bind same benefit + archive old.
2. In the Work (published runtime):
   ```ts
   const cohub = createCohubClient();
   await cohub.context(); // must be non-null in Work shell

   const { products } = await cohub.work.commerce.resolveProducts({
     productKeys: ["pro_unlock"],
   });
   const { entitlements, credits } = await cohub.work.commerce.getEntitlements();
   ```
3. **Feature gate**: if benefit not enabled → on user click → `purchase({ productKey })` → host checkout → return → re-read entitlements / order.
4. **Credits**: if `credits.available` enough → `consumeCredits({ amount, operationId, reason })` with unique `operationId` (idempotent retry). On `insufficient` → purchase pack.
5. After return URL (`cohub_checkout` / `cohub_order`), call `getCheckoutState()` and optionally `getOrder(orderId)`.
6. For expensive side effects: Work only triggers; agent/script consumes credits, writes result file; Work reads file (don’t parse chat turns as ledger).
7. Keep scopes minimal — commerce UI still does not justify blanket prompt/generation scopes.

## CLI helper

```bash
cohub works commerce credits consume --work-id <work-id> --amount 100
```

## Done when

- [ ] Feature and/or credit loop verified on **public Work URL**
- [ ] Purchase return restores coherent UI state
- [ ] `operationId` used for consumes
- [ ] Side effects persisted as Space files when metered work is heavy

## Avoid

- Testing commerce only on local static previews (`context()` is null)
- Letting the iframe own pending checkout as source of truth
- Mutating product price in place
- Double-charge retries without idempotency keys

---

[中文](../zh/playbooks/work-commerce.md)
