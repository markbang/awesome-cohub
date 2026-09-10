---
id: cohub.bp.work-commerce
title: Sell features and credits inside an App
type: playbook
audience: [builder, agent]
features: [work, app, commerce, sdk, scopes]
difficulty: advanced
related: [cohub.bp.work-kit-product, cohub.bp.minimal-scopes, cohub.bp.work-promotions, cohub.concept.work, cohub.concept.commerce]
sources:
  - https://github.com/talesofai/cohub/blob/main/docs/app-commerce-guide.md
  - https://github.com/talesofai/cohub/blob/main/docs/apps-guide.md
  - https://cohub.live/changelog (v2.39, v2.41)
---

# Sell features and credits inside an App

## When

A **published App** should gate a capability or meter usage with one-time products (feature unlock and/or credit packs).

## Outcome

- Products + benefits configured at Space billing scope (`business = space`)
- App hardcodes `productKey` / `benefitKey`
- Closed loop works **only** inside a published Cohub App shell:
  - feature: `load → gate → purchase → return → load`
  - credits: `load → balance → consume → (insufficient? purchase) → return`

## Preconditions

1. App is published (not raw static URL / local preview).
2. You develop commerce against the **public App URL**.
3. Checkout state is owned by the **outer host** (sign-in, top-level navigation, return), not primarily by the iframe.
4. Purchase is triggered by a **user action**, not during app initialization.

## Benefit types

| Type | Role |
|------|------|
| `feature` | Access gate via entitlement metadata (`enabled`, limits) |
| `credits` | Consumable balance auto-granted on paid order (`cohub_credit`) |

## Steps

1. Design keys as **versioned** product ids (`pro_unlock_v2`, `credit_pack_050`). Prices are immutable after create — change price by new product + bind same benefit + archive old.
2. In the App (published runtime):
   ```ts
   const cohub = createCohubClient();
   await cohub.context(); // must be non-null in App shell

   const { products } = await cohub.app.commerce.resolveProducts({
     productKeys: ["pro_unlock"],
   });
   const { entitlements, credits } = await cohub.app.commerce.getEntitlements();
   ```
3. **Feature gate**: if benefit not enabled → on user click → `purchase({ productKey })` → host transitions straight to checkout → return → re-read entitlements / order.
4. **Credits**: if `credits.available` enough → `consumeCredits({ amount, operationId, reason })` with unique `operationId` (idempotent retry). On `insufficient` → purchase pack.
5. After return URL (`cohub_checkout` / `cohub_order`), call `getCheckoutState()` and optionally `getOrder(orderId)`. Reuse the same `purchaseAttemptId` when retrying a timed-out purchase so Billing resolves the original order.
6. For expensive side effects: App only triggers; agent/script consumes credits, writes result file; App reads file (don't parse chat turns as ledger).
7. Keep scopes minimal — commerce UI still does not justify blanket prompt/generation scopes.

## Checkout behavior (v2.39-v2.41)

- In-app purchases go **straight to checkout**; the redundant host confirmation dialog is gone.
- Concurrent or repeated purchase requests for the same product are deduplicated and serialized by attempt id, so a double click cannot create two orders.
- Redirects carry a server-appended outcome and product key, and a checkout-confirmation endpoint reconciles each return against the provider's settlement state. Confirm success only when an order or subscription is actually paid or active — a forged URL cannot claim a purchase, and a stale redirect resolves to the correct product state.
- The billing catalog surfaces viewer-independent promotions (discount percent and end date) for pricing pages; priced offers are applied server-side only to eligible signed-in users.

## CLI helper

```bash
cohub apps commerce credits consume --app-id <app-id> --amount 100
cohub apps commerce products resolve --app-id <app-id> --product-key pro_unlock
cohub apps commerce entitlements --app-id <app-id> --json
```

## Done when

- [ ] Feature and/or credit loop verified on **public App URL**
- [ ] Purchase return restores coherent UI state
- [ ] Purchase success is confirmed against the order/subscription state, not only the return URL
- [ ] `operationId` used for consumes
- [ ] Purchase retries reuse `purchaseAttemptId`
- [ ] Side effects persisted as Space files when metered work is heavy

## Avoid

- Testing commerce only on local static previews (`context()` is null)
- Letting the iframe own pending checkout as source of truth
- Triggering purchase on app load instead of a user action
- Mutating product price in place
- Double-charge retries without idempotency keys

---

[中文](../zh/playbooks/work-commerce.md)
