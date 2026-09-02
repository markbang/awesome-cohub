---
id: cohub.bp.app-center
title: Install and maintain Apps in a Space
type: playbook
audience: [builder, operator]
features: [app, marketplace, space, files, permissions]
difficulty: intermediate
related:
  - cohub.concept.app-center
  - cohub.concept.work
  - cohub.bp.minimal-scopes
sources:
  - https://cohub.live/changelog (v2.38)
  - https://github.com/talesofai/cohub/tree/main/cohub-apps/marketplace
  - https://github.com/talesofai/cohub/blob/main/packages/protocol/src/app-catalog.ts
---

# Install and maintain Apps in a Space

## When

A Space needs a reusable published App available from its Apps panel, with a controlled enable/disable/uninstall lifecycle.

## Outcome

- The Space has a validated `.cohub/apps.json` manifest.
- Marketplace metadata and launch URLs are checked before installation.
- Concurrent clients cannot silently replace one another's installed-App list.

## Steps

1. Open **Apps** in the Space sidebar or mobile drawer and launch the first-party Marketplace App.
2. Select the invocation Space, or use its Space picker. Grant only the two file permissions needed by the Marketplace flow:
   - `file.view` to read `.cohub/apps.json`
   - `file.edit` to install, enable, disable, or uninstall entries
3. Search the Marketplace by name, publisher, keyword, or canonical `username/space/app` reference. Verify the displayed URL and publisher before installing.
4. Install the App. The Marketplace validates the catalog and app manifest, then writes format `cohub.space-apps`, version `1` to `.cohub/apps.json`.
5. Use the Apps panel to enable or disable an installed entry. Uninstall removes the entry from this Space's manifest; it does not delete the published App.
6. If another client changed the manifest, reload the current file and merge the intended change. Preserve its expected `mtimeMs` and `size` on the next write.

Minimal manifest shape:

```json
{
  "format": "cohub.space-apps",
  "version": 1,
  "apps": []
}
```

## Boundaries

App installation is a Space file operation, not a new App-management permission. The installed list controls discoverability and enabled state; the published App still enforces its own runtime `appScopes` and viewer grants.

A Marketplace catalog entry is not proof that an App is safe for every workflow. Review publisher, URL, requested runtime scopes, and the data the App will read before enabling it.

## Done when

- [ ] The manifest parses and stays below the 1,000-entry limit
- [ ] The App opens from the current Space's Apps panel
- [ ] Enable/disable/uninstall is reflected on every client
- [ ] A concurrent-write conflict is retried from fresh file state
- [ ] Published-App runtime permissions remain least-privilege

## Avoid

- Editing `.cohub/apps.json` with an unvalidated arbitrary schema
- Replacing the whole manifest from a stale read
- Assuming installation grants file, prompt, generation, or admin access
- Deleting the published App when you only want to uninstall it from one Space

---

[中文](../zh/playbooks/app-center.md)
