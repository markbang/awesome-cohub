---
id: cohub.cb.weekend-static-work
title: 周末静态 Work
type: cookbook
---

# 周末静态 Work

做出别人不用进沙箱就能打开的东西。

## 结果

- 有真实站点的 Space（或 **hash** / 静态友好路由的 SPA）
- 至少一次 Save
- 可发送的 **directory** Work URL

## 路径

1. **Space + 存档习惯** — [scratch-to-checkpoint](../playbooks/scratch-to-checkpoint.md)
2. **在 `/workspace` 构建** — 简单静态页，或 [work-kit-product](../playbooks/work-kit-product.md) → `dist/`
3. **路由检查** — [browser-router-static](../anti-patterns/browser-router-static.md)
4. **发布** — [publish-static-work](../playbooks/publish-static-work.md)；别发沙箱 URL
5. **权限** — [minimal-scopes](../playbooks/minimal-scopes.md)
6. 再 Save：`v0-work-public`

## 完成标志

- [ ] 无痕窗口能打开 Work
- [ ] 深链刷新不 404（或用 hash）
- [ ] 有愿意恢复的 Save

---

[English](../../cookbooks/weekend-static-work.md)
