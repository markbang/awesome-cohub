---
id: cohub.bp.publish-static-work
title: Publish a static Work
type: playbook
audience: [builder, agent]
features: [work, files, save]
difficulty: starter
related: [cohub.concept.work, cohub.bp.minimal-scopes, cohub.bp.work-kit-product]
sources:
  - https://cohub.run/docs/create/works
  - https://github.com/talesofai/cohub/blob/main/docs/works-guide.md
  - https://cohub.run/changelog#v1.105
---

# Publish a static Work

## When

Others should open a page/site without entering your Sandbox.

## Outcome

- Public URL `/:username/:spaceSlug/w/:workSlug`
- Version published from a stable target
- Minimal scopes (often none beyond defaults for pure static HTML)

## Steps

1. **Save** a green workspace first.
2. Choose target:
   - **file** — single `.html`
   - **directory** — site with `index.html` + **relative** assets (`base: "./"`)
3. For SPAs: use **HashRouter** (or hash links). History API routes break on static hosting.
4. Publish from UI preview **or** CLI:
   ```bash
   cohub -s <spaceId> works publish site --dir dist \
     --work-scope file.view --json
   ```
5. Open the public Work URL (not a raw asset URL) and verify assets load.
6. Put the URL in Space `README.md`.

## Runtime note

`cohub.context()` / viewer auth / Work commerce only work inside the **published Work shell**.  
Local preview and raw CDN HTML are not the Work runtime.

Publish also extracts title/description/icon for OG/share meta (see changelog v1.105).

## Done when

- [ ] Public URL opens
- [ ] CSS/JS load (no absolute `/assets` 404)
- [ ] Scopes match actual needs
- [ ] A Save exists for the published state

## Avoid

- Sharing private sandbox port links as “production”
- Baking live secrets into static `dist`
- Broad `viewerScopes` for a static brochure page

---

[中文](../zh/playbooks/publish-static-work.md)
