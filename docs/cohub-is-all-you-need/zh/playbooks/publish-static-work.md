---
id: cohub.bp.publish-static-work
title: 发布静态 Work
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

# 发布静态 Work

## 何时用

别人要直接打开页面/站点，而不是进你的沙箱。

## 结果

- Public URL `/:username/:spaceSlug/w/:workSlug`
- Version published from a stable target
- Minimal scopes (often none beyond defaults for pure static HTML)

## 步骤

1. 先 **存档** 绿灯状态。
2. 选目标：
   - **file** — 单个 `.html`
   - **directory** — 含 `index.html` + **相对路径** 资源（`base: "./"`）
3. SPA 用 **Hash 路由**；History API 在静态托管上会挂。
4. UI 预览发布，或 CLI：
   ```bash
   cohub -s <spaceId> works publish site --dir dist \
     --work-scope file.view --json
   ```
5. 打开 **公开 Work URL**（不是裸静态资源 URL）检查资源。
6. 把链接写回 Space `README.md`。

## 运行时

`cohub.context()` / viewer auth / Work commerce only work inside the **published Work shell**.  
Local preview and raw CDN HTML are not the Work runtime.

Publish also extracts title/description/icon for OG/share meta (see changelog v1.105).

## 完成标准

- [ ] Public URL opens
- [ ] CSS/JS load (no absolute `/assets` 404)
- [ ] Scopes match actual needs
- [ ] A Save exists for the published state

## 别这样做

- Sharing private sandbox port links as “production”
- Baking live secrets into static `dist`
- Broad `viewerScopes` for a static brochure page

---

[English](../../playbooks/publish-static-work.md)
