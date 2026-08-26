---
id: cohub.concept.commerce
title: Work/App 商业化
type: concept
related: [cohub.bp.work-commerce, cohub.bp.work-promotions]
sources:
  - https://github.com/talesofai/cohub/blob/main/docs/work-commerce-guide.md
  - https://cohub.live/changelog（v2.10、v2.23）
---

# Work/App 商业化

Work commerce 是基于 Space 级 Billing 售卖一次性产品。当前 SDK 规范写法为 `client.app.commerce.*`；旧的 `work.commerce` 写法可能仍作为别名存在。

## 运行时

商业化只在已发布 Work/App 壳中运行：`context()`、授权、购买与权益调用在原始静态 URL 或本地预览中都不可用。

## 核心对象

- **Product** - 售卖内容（`productKey`；价格与 Cohub Balance 金额创建后不可变）
- **Benefit** - `feature` 功能门槛或 `credits` 积分赠送
- **Order / checkout** - 由宿主控制的跳转闭环
- **Credits** - 虚拟 `cohub_credit` 余额；使用幂等 `operationId` 消费
- **Cohub Balance** - 产品可选的全局 USD 余额组件

## 可靠购买闭环

功能：load -> entitlement -> purchase -> return -> reload。

积分：load -> balance -> consume -> 不足时 purchase -> return -> reload。

购买调用带稳定的 `purchaseAttemptId`（或幂等键），超时重试会解析到原 Billing order，而不会重复创建订单。

## 参见

- [Work 商业化](../../playbooks/work-commerce.md)
- [Work 推广](../../playbooks/work-promotions.md)
- https://github.com/talesofai/cohub/blob/main/docs/work-commerce-guide.md

---

[English](../../concepts/commerce.md)
