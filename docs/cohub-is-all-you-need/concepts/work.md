---
id: cohub.concept.work
title: Work / App
type: concept
related:
  - cohub.concept.work-presentation
  - cohub.bp.work-lifecycle
sources:
  - https://cohub.live/docs/create/works
  - https://github.com/talesofai/cohub/blob/main/docs/works-guide.md
---

# Work / App

A **Work** is the user-facing name for a published, shareable surface from a Space target: `file` | `directory` | `port`.

Since v2.26, the SDK and API use **App** as the canonical developer vocabulary:

- `client.apps` and `appScopes` are canonical.
- `client.works` and `workScopes` remain deprecated aliases.
- Existing `/w/` public URLs continue to work.

URL:

```text
/:username/:spaceSlug/w/:workSlug
```

## Practice

- Static sites: publish a directory with relative assets and `base: "./"`.
- Interactive Cohub features: use the published Work/App shell, not a raw asset URL or local preview.
- App scopes are direct publisher grants for the App's own Space; viewer grants are consented per Space at runtime.
- Versions are deliberate releases, not autosaves.
- File and directory publishes have immutable manifests and can be downloaded with checksum verification; Board and port Works are not restorable file artifacts.
- Query parameters and URL fragments are forwarded to embedded Works. The `cohub_*` namespace is reserved for the host.

## See also

- [Works lifecycle](../playbooks/work-lifecycle.md)
- [Viewer authorization](../playbooks/viewer-auth-and-user-scopes.md)
- [Work presentation](./work-presentation.md)
- https://cohub.live/docs/create/works
- Playbook: `cohub.bp.work-kit-product`

---

[中文](../zh/concepts/work.md)
