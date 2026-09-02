---
id: cohub.concept.commerce
title: App 商业化
type: concept
related: [cohub.bp.work-commerce, cohub.bp.work-promotions]
sources:
  - https://github.com/talesofai/cohub/blob/main/docs/app-commerce-guide.md
  - https://cohub.live/changelog（v2.10、v2.23）
---

# App 商业化

App commerce 是基于 Space 级 Billing 售卖一次性产品。SDK 规范界面是 `client.app.commerce.*`；旧 Work 时代的 `work.commerce` 写法可能仍作为别名。

## 运行时

商业化只在已发布 App 壳中运行：`context()`、授权、购买与权益调用在原始静态 URL 或本地预览中都不可用。

## 核心对象

- **Product** - 售卖内容（`productKey`；价格与 Cohub Balance 金额创建后不可变）
- **Benefit** - `feature` 功能门槛或 `credits` 积分赠送
- **Order / checkout** - 由宿主控制的跳转闭环
- **Credits** - 虚拟 `cohub_credit` 余额；使用幂等 `operationId` 消费
- **Purchase attempt** - 超时重试时复用的稳定 `purchaseAttemptId`
- **Cohub Balance** - 产品可选的跨 Space 全局 USD 余额组件

## 可靠购买闭环

功能：load -> entitlement -> purchase -> return -> reload。

积分：load -> balance -> consume -> 不足时 purchase -> return -> reload。

## 参见

- [App 商业化](../../playbooks/work-commerce.md)
- [App 推广](../../playbooks/work-promotions.md)
- https://github.com/talesofai/cohub/blob/main/docs/app-commerce-guide.md

---

[English](../../concepts/commerce.md)
