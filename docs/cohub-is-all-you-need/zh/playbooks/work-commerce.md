---
id: cohub.bp.work-commerce
title: 在 Work/App 内售卖功能与积分
type: playbook
audience: [builder, agent]
features: [work, app, commerce, sdk, scopes]
difficulty: advanced
related: [cohub.bp.work-kit-product, cohub.bp.minimal-scopes, cohub.bp.work-promotions, cohub.concept.work, cohub.concept.commerce]
sources:
  - https://github.com/talesofai/cohub/blob/main/docs/work-commerce-guide.md
  - https://cohub.live/docs/create/works
---

# 在 Work/App 内售卖功能与积分

## 何时使用

已发布 Work 要用基于 Space Billing 的一次性商品做功能门槛或计量（功能解锁和/或积分包）。

## 结果

- 商品、权益与绑定位于 Space Billing scope（`business = space`）
- Work/App 固定使用 `productKey` / `benefitKey`
- 购买与回流只在已发布 Cohub Work/App 壳内成立：
  - 功能：`load -> gate -> purchase -> return -> load`
  - 积分：`load -> balance -> consume -> (insufficient? purchase) -> return`

## 前置条件

1. Work 已发布，不是原始静态 URL 或本地预览。
2. 使用公开 Work URL 开发和验证商业化。
3. 结账状态由外层宿主控制（登录、顶层跳转与回流），不要主要交给 iframe。

## 权益类型

| 类型 | 作用 |
|------|------|
| `feature` | 通过权益元数据（`enabled`、limits）控制功能 |
| `credits` | 付费订单后自动赠送可消费的 `cohub_credit` |

Cohub Balance 是可选的平台管理产品组件，用于全局 USD 余额；金额与商品价格创建后不可变。

## 步骤

1. 商品 key 版本化（如 `pro_unlock_v2`、`credit_pack_050`）。改价应创建新商品、绑定同一 benefit，并归档旧商品。
2. 在已发布壳中调用 `client.app.commerce.*`：
   ```ts
   const client = createCohubClient();
   await client.context();
   const { products } = await client.app.commerce.resolveProducts({
     productKeys: ["pro_unlock"],
   });
   const { entitlements, credits } = await client.app.commerce.getEntitlements();
   ```
3. 功能未解锁时，在用户点击后 `purchase({ productKey })`，等待宿主结账回流，再读取权益/订单。
4. 积分足够时用 `consumeCredits({ amount, operationId, reason })`；`operationId` 必须稳定以支持幂等重试。不足时引导购买。
5. 回流后读取 `getCheckoutState()` / `getOrder()`。购买超时重试时复用相同 `purchaseAttemptId`，避免创建重复 Billing order。
6. 重副作用放在脚本中：Work 触发，Agent 扣费并写结果文件，Work 读取结构化结果。
7. 商业化 UI 不意味着可以放开 prompt/generation 等无关权限。

## CLI

```bash
cohub apps commerce credits consume --app-id <app-id> --amount 100
```

## 完成标准

- [ ] 在公开 Work URL 验证功能或积分闭环
- [ ] 购买回流后 UI 状态一致
- [ ] 消费使用稳定的 `operationId`
- [ ] 购买重试使用 `purchaseAttemptId`
- [ ] 重副作用结果持久化为 Space 文件

## 避免

- 只在本地静态预览测试商业化（`context()` 为 null）
- 让 iframe 单独持有待结账状态
- 原地修改商品价格
- 重试购买或扣费却更换幂等 ID

---

[English](../../playbooks/work-commerce.md)
