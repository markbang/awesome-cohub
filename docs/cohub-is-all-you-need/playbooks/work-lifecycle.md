---
id: cohub.bp.work-lifecycle
title: App lifecycle - publish, version, disable, visibility
type: playbook
audience: [builder]
features: [work, app, publish, analytics]
difficulty: intermediate
related:
  - cohub.bp.publish-static-work
  - cohub.bp.hide-cohub-bar
  - cohub.bp.port-preview
  - cohub.bp.work-promotions
  - cohub.concept.app-center
sources:
  - https://cohub.live/docs/apps
  - https://github.com/talesofai/cohub/blob/main/docs/apps-guide.md
  - https://cohub.live/changelog (v2.14, v2.22, v2.24, v2.37)
---

# App lifecycle - publish, version, disable, visibility

## When

You manage a published App beyond its first release: validate a target, preview it, measure it, take it offline, or change who can open it.

## Model

| Field | Meaning |
|-------|---------|
| `slug` | Public name segment |
| `status` | `published` or `disabled` |
| `visibility` | `public` or `space` |
| `targetType` | `file`, `directory`, or `port` |
| `targetRef` | Space file path, directory path, or port |
| version | Immutable snapshot created on publish / publish-version |

Public URL: `/:username/:spaceSlug/w/:appSlug`. The owner needs a username and the Space needs a slug; neither can be cleared once set.

## Limits and artifact behavior

- A file, HTML page, Board, or directory is limited to **1 GiB**.
- A directory needs `index.html`, contains 1 to 1000 files, and totals 1 byte to 1 GiB.
- A Board App captures the Board state and only the workspace assets it references.
- File and directory Apps include an immutable manifest and support checksum-verified downloads. Board and port Apps are not downloadable artifacts.
- `--file` and `--dir` targets are Space workspace paths, not paths on the machine running the CLI; publish preflight reports missing or invalid targets clearly.
- A port must use a supported public Sandbox port.

## CLI

```bash
# Publish and release a new version
cohub -s <spaceId> apps publish site --dir dist --json
cohub -s <spaceId> apps publish-version <appId> --json

# Manage state
cohub -s <spaceId> apps update <appId> --status disabled --json
cohub -s <spaceId> apps update <appId> --status published --json

# Resolve, preview, measure, and restore file artifacts
cohub apps resolve <appSlug> --owner <username> --space-slug <space> --json
cohub desktop open app://<owner>/<space>/<app>
cohub apps get <appId|url|owner/space/app> --json
cohub apps stats <appId|url|owner/space/app> --json
cohub apps download <appId|url|owner/space/app> --output <path>
```

`works` and `workScopes` spellings remain compatibility aliases in clients that still expose them.

## Release rules

- Editing a target changes the source for the **next** version; it does not hot-swap the public page.
- Preview refresh is version-aware. A failed refresh keeps existing content and offers retry instead of blanking the panel.
- Disable removes public by-slug access without deleting the App record, grants, or versions.
- Promotions point to the current published version; use [work-promotions](./work-promotions.md) for attribution.
- The App Center's installed list is separate from this lifecycle; uninstalling an App from one Space does not delete it.

## Done when

- [ ] The public URL opens the intended published version
- [ ] A target change was followed by an explicit publish-version
- [ ] Limits and referenced Board assets pass validation
- [ ] Stats or a verified download confirms the release when relevant
- [ ] Disable/restore behavior is understood before sharing widely

## Avoid

- Treating a target edit as a production release
- Using a raw Sandbox URL as the product
- Expecting Board or port Apps to download as file bundles
- Leaving secrets or access tokens in query parameters

---

[中文](../zh/playbooks/work-lifecycle.md)
