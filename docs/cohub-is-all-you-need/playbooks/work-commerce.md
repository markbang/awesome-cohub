---
id: cohub.bp.work-commerce
title: Sell features and credits inside a Work
title_zh: 在 Work 内售卖功能与积分
type: playbook
audience: [builder, agent]
features: [work, commerce, sdk, scopes]
difficulty: advanced
related: [cohub.bp.work-kit-product, cohub.bp.minimal-scopes, cohub.concept.work, cohub.concept.commerce]
sources:
  - https://github.com/talesofai/cohub/blob/main/docs/work-commerce-guide.md
  - https://cohub.run/docs/create/works
---

# Sell features and credits inside a Work · 在 Work 内售卖功能与积分

## When · 何时用

EN: A **published Work** should gate a capability or meter usage with one-time products (feature unlock and/or credit packs).
中文：已发布 Work 要用一次性商品做能力门槛或计量（功能解锁和/或积分包）。

## Outcome · 结果

- Products + benefits configured at Space billing scope (`business = space`)
- Work hardcodes `productKey` / `benefitKey`
- Closed loop works **only** inside Cohub Work shell:
  - feature: `load → gate → purchase → return → load`
  - credits: `load → balance → consume → (insufficient? purchase) → return`

## Preconditions · 前置

1. Work is published (not raw static URL / local preview).
2. You develop commerce against the **public Work URL**.
3. Checkout state is owned by the **outer host** (sign-in, top-level navigation, return), not primarily by the iframe.

## Benefit types · 权益类型

| Type | Role |
|------|------|
| `feature` | Access gate via entitlement metadata (`enabled`, limits) |
| `credits` | Consumable balance auto-granted on paid order (`cohub_credit`) |

## Steps · 步骤

### EN
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

### 中文
1. 商品 key **版本化**；价格创建后不可改，改价 = 新商品 + 绑定同一 benefit + 归档旧商品。
2. 仅在已发布 Work 壳内调用 `createCohubClient` / `context()` / `work.commerce.*`。
3. 功能门槛：未解锁 → 用户点击 → `purchase` → 宿主结账回流 → 再读权益/订单。
4. 积分：余额足够则 `consumeCredits`（`operationId` 幂等）；不足则引导购买。
5. 回流后 `getCheckoutState` / `getOrder`。
6. 重副作用放脚本：Work 触发 → agent 扣费并写结果文件 → Work 读文件。
7. 权限仍然最小集。

## CLI helper · CLI

```bash
cohub works commerce credits consume --work-id <work-id> --amount 100
```

## Done when · 完成标准

- [ ] Feature and/or credit loop verified on **public Work URL**
- [ ] Purchase return restores coherent UI state
- [ ] `operationId` used for consumes
- [ ] Side effects persisted as Space files when metered work is heavy

## Avoid · 别这样做

- Testing commerce only on local static previews (`context()` is null)
- Letting the iframe own pending checkout as source of truth
- Mutating product price in place
- Double-charge retries without idempotency keys
