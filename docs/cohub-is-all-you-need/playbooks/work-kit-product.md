---
id: cohub.bp.work-kit-product
title: Build a Work product with Work Kit
type: playbook
audience: [builder, agent]
features: [work, sdk, scopes, skill]
difficulty: intermediate
related: [cohub.bp.publish-static-work, cohub.bp.minimal-scopes]
sources:
  - https://github.com/markbang/cohub-work-skill
  - https://cohub.run/docs/create/works
---

# Build a Work product with Work Kit

## When

The Work must read Space context, request viewer consent, or act (prompt/generate) — not only show static HTML.

## Outcome

- App scaffolded from bundled template
- Runtime seam preserved (`runtime` / `query` / `hooks`, `base: "./"`, HashRouter)
- Published directory Work with explicit scopes

## Steps

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

## Done when

- [ ] Build OK
- [ ] Public Work becomes runtime-ready in Cohub shell
- [ ] Scopes listed and justified
- [ ] No parallel login system invented

## Avoid

- BrowserRouter on static directory Works
- Authorizing on page load
- Treating port Works as the default production shape

---

[中文](../zh/playbooks/work-kit-product.md)
