---
id: cohub.ap.rebuild-auth-in-work
title: 在 App 里自建 Cohub 登录
type: anti-pattern
related: [cohub.bp.work-kit-product, cohub.bp.work-commerce]
---

# 在 App 里自建 Cohub 登录

## 为什么有问题

第二套身份系统会破坏 consent，重复安全边界，也无法正确复用 Cohub 的 Billing 与 viewer grant 模型。

## 正确做法

使用已发布 App runtime 的 `client.auth.request()` 与宿主控制的结账流程，不要另造账户系统。

## 嗅探标准

如果 App 有自己的 Cohub 密码表单，应停止并改用平台会话/SDK。

---

[English](../../anti-patterns/rebuild-auth-in-work.md)
