---
id: cohub.cb.weekend-static-work
title: 周末静态 App
type: cookbook
---

# 周末静态 App

做出别人不用进入 Sandbox 就能打开的东西。

## 结果

- 有真实站点的 Space（或使用 hash/静态友好路由的 SPA）
- 至少一次 Save
- 可发送的 **directory** App URL

## 路径

1. **Space + 存档习惯** - [scratch-to-checkpoint](../playbooks/scratch-to-checkpoint.md)
2. **在 `/workspace` 构建** - 简单静态页，或 [work-kit-product](../playbooks/work-kit-product.md) -> `dist/`
3. **路由检查** - [browser-router-static](../anti-patterns/browser-router-static.md)；静态 App 使用 HashRouter 或预渲染路径
4. **发布** - [publish-static-work](../playbooks/publish-static-work.md)，使用 `cohub-apps`，不要发送原始 Sandbox URL
5. **权限** - [minimal-scopes](../playbooks/minimal-scopes.md)；静态宣传页不带特殊权限，交互能力按需增加
6. 再 Save：`v0-app-public`

## 完成标准

- [ ] 隐私窗口能打开 App URL
- [ ] 深链刷新不 404（或使用 hash）
- [ ] 有可恢复的 Save

---

[English](../../cookbooks/weekend-static-work.md)
