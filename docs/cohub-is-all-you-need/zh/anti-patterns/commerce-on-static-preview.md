---
id: cohub.ap.commerce-on-static-preview
title: 只在静态预览测试 App 商业化
type: anti-pattern
related: [cohub.bp.work-commerce]
---

# 只在静态预览测试 App 商业化

## 为什么有问题

已发布 App 之外 `context()` 为 null，购买和权益 API 会失败，排查结果也会误导。

## 正确做法

在 Cohub 壳内通过**已发布 App URL**验证商业化。

## 嗅探标准

如果 `cohub.context()` 为 null，你就不在 App runtime 中。

---

[English](../../anti-patterns/commerce-on-static-preview.md)
