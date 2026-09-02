---
id: cohub.concept.work
title: App (formerly Work)
type: concept
related:
  - cohub.concept.work-presentation
  - cohub.concept.app-center
  - cohub.bp.work-lifecycle
sources:
  - https://cohub.live/docs/apps
  - https://github.com/talesofai/cohub/blob/main/docs/apps-guide.md
  - https://cohub.live/changelog (v2.26, v2.37)
---

# App (formerly Work)

An **App** is a published, shareable surface from a Space target: `file` | `directory` | `port`. The product's older user-facing name was **Work**.

The v2.37 vocabulary migration makes App the canonical developer term:

- SDK/API: `client.apps`, `appScopes`, `apps.getBySlug()`
- CLI: `cohub apps ...`
- Management route: `/spaces/:spaceId/apps/:appId`
- Public URL: `/:username/:spaceSlug/w/:appSlug` (the `/w/` segment remains)
- Legacy `client.works`, `workScopes`, and `works` CLI spellings remain compatibility aliases where exposed

## Practice

- Static sites: publish a directory with relative assets and `base: "./"`.
- Interactive Cohub features: use the published App shell, not a raw asset URL or local preview.
- App scopes are direct publisher grants for the App's home Space; viewer grants are consented per Space at runtime.
- File and directory Apps publish immutable manifests and support checksum-verified downloads. Board and port Apps are runtime surfaces, not restorable file bundles.
- Query parameters and URL fragments are forwarded to embedded Apps; the `cohub_*` namespace is reserved for the host.
- The App Center's `.cohub/apps.json` is an installed-App list, separate from published App records.

## See also

- [Work/App presentation](./work-presentation.md)
- [App Center](./app-center.md)
- [App lifecycle](../playbooks/work-lifecycle.md)
- [Viewer authorization](../playbooks/viewer-auth-and-user-scopes.md)
- https://cohub.live/docs/apps

---

[中文](../zh/concepts/work.md)
