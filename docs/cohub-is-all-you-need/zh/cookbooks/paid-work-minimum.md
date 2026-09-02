---
id: cohub.cb.paid-work-minimum
title: 付费 App 最小闭环
type: cookbook
audience: [builder]
difficulty: advanced
related: [cohub.bp.work-kit-product, cohub.bp.work-commerce, cohub.bp.minimal-scopes]
---

# 付费 App 最小闭环

最小诚实路径：做出可商业化的 App，而不是静态假页。

## 结果

- 带 runtime 的 Work Kit（或等价）App
- 只配置 App 实际调用 API 所需的权限
- 在**已发布** App 中验证商业化，而不是只测静态预览

## 路径

1. [work-kit-product](../playbooks/work-kit-product.md) - 搭建与本地/开发 port 检查
2. [minimal-scopes](../playbooks/minimal-scopes.md) - 只列出 App 实际调用的 API
3. [work-commerce](../playbooks/work-commerce.md) - 使用 App commerce 实现功能/积分
4. 可选：[work-promotions](../playbooks/work-promotions.md) - 聚合推广漏斗统计
5. 避开[只在静态预览测试商业化](../anti-patterns/commerce-on-static-preview.md)、[在 App 里自建登录](../anti-patterns/rebuild-auth-in-work.md)与[把静态 App 当 API](../anti-patterns/static-work-as-api.md)
6. 发布 directory/runtime App，并 Save `commerce-smoke-ok`。

## 完成标准

- [ ] 缺少必要 grant 时付费路径失败关闭，最小集合时成功
- [ ] 没有在 App 内重造登录栈
- [ ] 购买重试使用稳定的 purchase attempt id

---

[English](../../cookbooks/paid-work-minimum.md)
