---
id: cohub.bp.work-kit-product
title: Build a Work product with Work Kit
title_zh: 用 Work Kit 做真 Work 产品
type: playbook
audience: [builder, agent]
features: [work, sdk, scopes, skill]
difficulty: intermediate
related: [cohub.bp.publish-static-work, cohub.bp.minimal-scopes]
sources:
  - https://github.com/markbang/cohub-work-skill
  - https://cohub.run/docs/create/works
---

# Build a Work product with Work Kit · 用 Work Kit 做真 Work 产品

## When · 何时用

EN: The Work must read Space context, request viewer consent, or act (prompt/generate) — not only show static HTML.
中文：Work 需要读 Space 上下文、请求观众授权，或发起 prompt/生成——不只是静态页。

## Outcome · 结果

- App scaffolded from bundled template
- Runtime seam preserved (`runtime` / `query` / `hooks`, `base: "./"`, HashRouter)
- Published directory Work with explicit scopes

## Steps · 步骤

### EN
1. Install skills:
   ```bash
   npx skills add https://github.com/markbang/cohub-work-skill \
     --skill cohub-work-kit --agent codex --yes --copy
   npx skills add https://github.com/markbang/cohub-work-skill \
     --skill cohub-work-publish --agent codex --yes --copy
   ```
2. Copy template from the **installed skill**:
   ```bash
   cp -a .agents/skills/cohub-work-kit/template/. apps/my-work/
   ```
3. Implement product UI under `src/pages/*`; keep `src/lib/*` stable.
4. Reads via Query when runtime is `ready`; writes only after user gesture + `auth.request`.
5. `pnpm install && pnpm build`
6. Publish with least scopes; open public Work URL to verify shell runtime.

### 中文
1. 安装 skill（同上）。
2. 从**已安装 skill** 拷模板：
   ```bash
   cp -a .agents/skills/cohub-work-kit/template/. apps/my-work/
   ```
3. 产品 UI 放 `src/pages/*`；尽量别改 `src/lib/*` 运行时缝。
4. runtime `ready` 后再 Query 读取；写入必须用户手势 + `auth.request`。
5. `pnpm install && pnpm build`
6. 最小权限发布，用公开 Work URL 验证壳内 runtime。

## Done when · 完成标准

- [ ] Build OK
- [ ] Public Work becomes runtime-ready in Cohub shell
- [ ] Scopes listed and justified
- [ ] No parallel login system invented

## Avoid · 别这样做

- BrowserRouter on static directory Works
- Authorizing on page load
- Treating port Works as the default production shape
