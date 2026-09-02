---
id: cohub.bp.work-kit-product
title: Build an App product with Work Kit
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

# Build an App product with Work Kit

## When

The App must read Space context, request viewer consent, or act through Cohub APIs, rather than only show static HTML.

## Outcome

- App scaffolded from the bundled Work Kit template
- Runtime boundary preserved (`runtime` / `query` / `hooks`, `base: "./"`, HashRouter)
- Published directory App with explicit `appScopes` and viewer-grant requests

## Steps

1. Install the kit and publish skills:
   ```bash
   npx skills add https://github.com/markbang/cohub-work-skill \
     --skill cohub-work-kit --agent codex --yes --copy
   npx skills add https://github.com/markbang/cohub-work-skill \
     --skill cohub-work-publish --agent codex --yes --copy
   ```
2. Copy the template from the installed skill:
   ```bash
   cp -a .agents/skills/cohub-work-kit/template/. apps/my-app/
   ```
3. Implement product UI under `src/pages/*`; keep the runtime helpers in `src/lib/*` stable.
4. Read through Query when runtime is `ready`; request viewer grants only after a user gesture.
5. Keep App-specific context explicit: `app.homeSpace` is the owning Space, while `invocation.spaceId` may identify the Space hosting a preview or background.
6. `pnpm install && pnpm build`
7. Publish with least privilege and verify the public App URL inside the Cohub shell.

## Done when

- [ ] Build succeeds
- [ ] Public App becomes runtime-ready in Cohub
- [ ] App scopes and viewer grants are listed and justified
- [ ] No parallel login system is invented

## Avoid

- BrowserRouter on static directory Apps
- Authorizing on page load
- Treating a port App as the default production shape
- Assuming `app.homeSpace` and invocation Space are always the same

---

[中文](../zh/playbooks/work-kit-product.md)
