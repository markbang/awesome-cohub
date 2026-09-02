---
id: cohub.concept.app-center
title: App Center and installed Apps
type: concept
related:
  - cohub.concept.work
  - cohub.concept.dot-cohub-layers
  - cohub.bp.app-center
sources:
  - https://cohub.live/changelog (v2.38)
  - https://github.com/talesofai/cohub/blob/main/packages/protocol/src/app-catalog.ts
  - https://github.com/talesofai/cohub/tree/main/cohub-apps/marketplace
---

# App Center and installed Apps

The **App Center** is the Space-level home for installed Apps. It appears alongside Files in the desktop sidebar and mobile drawer, and provides enable, disable, and uninstall controls. A first-party Marketplace App supplies discovery and installation.

## Installed-App manifest

Installed Apps are stored in the current Space as a validated file:

```text
.cohub/apps.json
```

The document uses format `cohub.space-apps`, version `1`, and supports up to 1,000 entries. Each entry records a UUID, canonical `username/space/app` reference, launch URL, enabled state, source, display snapshot, and installation timestamp. Sources can be a Marketplace catalog entry or a validated HTTP(S) URL.

This file is an installed-App catalog, not the database of published Apps. Installing an entry does not grant the App extra permissions and does not change its publisher or viewer grants.

## Runtime behavior

- The Marketplace App is opened with an invocation Space and asks for `file.view` to browse it and `file.edit` to install changes.
- A viewer can choose a different Space through `client.auth.requestSpace()`; the App learns the selected Space rather than the viewer's complete list.
- Catalog and manifest reads use bounded validation and small LRU caches.
- Writes include the file's expected `mtimeMs` and `size`, plus a mutation id, so two clients do not silently overwrite one another.
- App Center state refreshes across clients through the Space realtime/file-change path.

## Distinguish the layers

| Layer | Meaning |
|------|---------|
| Published App | A public file, directory, or port surface owned by a Space |
| Marketplace catalog | Validated discoverability metadata and launch URLs |
| Installed-App manifest | This Space's enabled/disabled local list in `.cohub/apps.json` |

See [App Center installation](../playbooks/app-center.md) for the user flow and safe manifest updates.

---

[中文](../zh/concepts/app-center.md)
