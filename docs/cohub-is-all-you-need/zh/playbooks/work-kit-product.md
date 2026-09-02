---
id: cohub.bp.work-kit-product
title: 用 Work Kit 构建 App 产品
type: playbook
audience: [builder, agent]
features: [work, app, sdk, scopes, skill]
difficulty: intermediate
related: [cohub.bp.publish-static-work, cohub.bp.minimal-scopes, cohub.concept.work-presentation]
sources:
  - https://github.com/markbang/cohub-work-skill
  - https://cohub.live/docs/apps
  - https://github.com/talesofai/cohub/blob/main/packages/sdk/docs/app-runtime-guide.md
---

# 用 Work Kit 构建 App 产品

## 何时使用

App 需要读取 Space 上下文、请求观众授权或通过 Cohub API 执行操作，而不只是展示静态 HTML。

## 结果

- 从内置 Work Kit 模板搭建 App
- 保留 runtime 边界（`runtime` / `query` / `hooks`、`base: "./"`、HashRouter）
- 发布带明确 `appScopes` 与 viewer grant 请求的 directory App

## 步骤

1. 安装 kit 与发布技能：
   ```bash
   npx skills add https://github.com/markbang/cohub-work-skill \
     --skill cohub-work-kit --agent codex --yes --copy
   npx skills add https://github.com/markbang/cohub-work-skill \
     --skill cohub-work-publish --agent codex --yes --copy
   ```
2. 从已安装的 skill 复制模板：
   ```bash
   cp -a .agents/skills/cohub-work-kit/template/. apps/my-app/
   ```
3. 产品 UI 放在 `src/pages/*`；尽量保持 `src/lib/*` runtime helpers 稳定。
4. runtime 为 `ready` 后通过 Query 读取；viewer grant 只在用户手势后申请。
5. 明确 App 上下文：`app.homeSpace` 是拥有 App 的 Space，而 `invocation.spaceId` 可能是承载预览或背景的 Space。
6. `pnpm install && pnpm build`
7. 以最小权限发布，并在 Cohub 壳内验证公开 App URL。

## 完成标准

- [ ] 构建成功
- [ ] 公开 App 在 Cohub 中进入 runtime-ready
- [ ] App scopes 与 viewer grant 已列出并有理由
- [ ] 没有另造一套登录系统

## 避免

- 静态 directory App 使用 BrowserRouter
- 页面加载时申请授权
- 把 port App 当作默认生产形态
- 假设 `app.homeSpace` 与 invocation Space 总是相同

---

[English](../../playbooks/work-kit-product.md)
