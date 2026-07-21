---
id: cohub.bp.work-kit-product
title: 用 Work Kit 做真 Work 产品
type: playbook
audience: [builder, agent]
features: [work, sdk, scopes, skill]
difficulty: intermediate
related: [cohub.bp.publish-static-work, cohub.bp.minimal-scopes]
sources:
  - https://github.com/markbang/cohub-work-skill
  - https://cohub.run/docs/create/works
---

# 用 Work Kit 做真 Work 产品

## 何时用

Work 需要读 Space 上下文、请求观众授权，或发起 prompt/生成——不只是静态页。

## 结果

- App scaffolded from bundled template
- Runtime seam preserved (`runtime` / `query` / `hooks`, `base: "./"`, HashRouter)
- Published directory Work with explicit scopes

## 步骤

1. 安装 skill（同上）。
2. 从**已安装 skill** 拷模板：
   ```bash
   cp -a .agents/skills/cohub-work-kit/template/. apps/my-work/
   ```
3. 产品 UI 放 `src/pages/*`；尽量别改 `src/lib/*` 运行时缝。
4. runtime `ready` 后再 Query 读取；写入必须用户手势 + `auth.request`。
5. `pnpm install && pnpm build`
6. 最小权限发布，用公开 Work URL 验证壳内 runtime。

## 完成标准

- [ ] Build OK
- [ ] Public Work becomes runtime-ready in Cohub shell
- [ ] Scopes listed and justified
- [ ] No parallel login system invented

## 别这样做

- BrowserRouter on static directory Works
- Authorizing on page load
- Treating port Works as the default production shape

---

[English](../../playbooks/work-kit-product.md)
