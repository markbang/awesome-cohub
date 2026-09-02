---
id: cohub.bp.publish-static-work
title: Publish a static App
type: playbook
audience: [builder, agent]
features: [work, app, files, save]
difficulty: starter
related: [cohub.concept.work, cohub.bp.minimal-scopes, cohub.bp.work-kit-product, cohub.bp.hide-cohub-bar, cohub.bp.work-lifecycle, cohub.bp.public-identity-slugs]
sources:
  - https://cohub.live/docs/apps
  - https://github.com/talesofai/cohub/blob/main/docs/apps-guide.md
---

# Publish a static App

## When

Others should open a page or site without entering your Sandbox.

## Outcome

- Public URL `/:username/:spaceSlug/w/:appSlug`
- Version published from a stable Space target
- Minimal direct App scopes, often none for pure static HTML

## Steps

1. **Save** a green workspace first.
2. Choose a target:
   - **file** - a single `.html` / `.htm` page or another supported file
   - **directory** - a site with `index.html` and **relative** assets (`base: "./"`)
3. For SPAs, use **HashRouter** (or hash links). History API routes break on static hosting.
4. Publish from the UI or CLI:
   ```bash
   cohub -s <spaceId> apps publish site --dir dist \
     --app-scope file.view --json
   ```
   The `--dir` path is relative to the target Space workspace, not the local machine running the CLI.
5. Open the public App URL, not a raw asset URL, and verify assets load.
6. Put the URL and its scopes in the Space `README.md`.

## Presentation

Pro/Max can hide the public Cohub footer:

```bash
cohub -s <spaceId> apps publish site --dir dist --hide-cohub-bar --json
cohub -s <spaceId> apps update <appId> --show-cohub-bar --json
```

Lifecycle and limits: [work-lifecycle](./work-lifecycle.md) · slugs: [public-identity-slugs](./public-identity-slugs.md)

## Runtime note

`client.context()`, viewer authorization, and App commerce only work inside the **published App shell**. Local previews and raw CDN HTML do not provide the App runtime.

Publishing extracts page metadata such as title, description, icon, image, language, and theme color for public heads and sharing cards.

## Done when

- [ ] The public App URL opens
- [ ] CSS and JS load without absolute `/assets` failures
- [ ] Direct and viewer scopes match actual needs
- [ ] A Save exists for the published state

## Avoid

- Sharing private Sandbox port links as production
- Baking live secrets into static `dist`
- Broad viewer grants for a static brochure page
- Publishing a local filesystem path that is not present in the Space

---

[中文](../zh/playbooks/publish-static-work.md)
