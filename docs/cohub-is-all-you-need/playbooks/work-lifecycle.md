---
id: cohub.bp.work-lifecycle
title: Work lifecycle - publish, version, disable, visibility
type: playbook
audience: [builder]
features: [work, app, publish, analytics]
difficulty: intermediate
related:
  - cohub.bp.publish-static-work
  - cohub.bp.hide-cohub-bar
  - cohub.bp.port-preview
  - cohub.bp.work-promotions
sources:
  - https://cohub.live/docs/create/works
  - https://github.com/talesofai/cohub/blob/main/docs/works-guide.md
  - https://cohub.live/changelog (v2.14, v2.22, v2.24)
---

# Work lifecycle - publish, version, disable, visibility

## When

You manage a Work/App beyond its first publish: iterate, preview, measure, take it offline, or change who can open it.

## Model

| Field | Meaning |
|-------|---------|
| `slug` | Public name segment |
| `status` | `published` or `disabled` |
| `visibility` | For example `public` or `space` |
| `targetType` | `file`, `directory`, or `port` |
| `targetRef` | File path, directory path, or port |
| version | Immutable snapshot created on publish / publish-version |

The public URL is `/:username/:spaceSlug/w/:workSlug`. The owner needs a username and the Space needs a slug; neither identity component can be cleared once set.

## Limits and artifact behavior

- A file, HTML page, Board, or directory is limited to **1 GiB**.
- A directory needs `index.html`, contains 1 to 1000 files, and totals 1 byte to 1 GiB.
- A Board publish captures the Board state and only the workspace assets it references.
- File and directory publishes include an immutable manifest and can be downloaded with checksum verification. Board and port Works are not downloadable artifacts.
- A port must use a supported public Sandbox port.

## CLI

```bash
# Publish and release a new version
cohub -s <spaceId> apps publish site --dir dist --json
cohub -s <spaceId> apps publish-version <appId> --json

# Manage state
cohub -s <spaceId> apps update <appId> --status disabled --json
cohub -s <spaceId> apps update <appId> --status published --json

# Preview, inspect, measure, and restore file artifacts
cohub ui preview work://<owner>/<space>/<app>
cohub apps get <appId|url|owner/space/app> --json
cohub apps stats <appId|url|owner/space/app> --json
cohub apps download <appId|url|owner/space/app> --output <path>
```

`works` and `workScopes` spellings remain compatibility aliases in clients that still expose them.

## Release rules

- Editing a target changes the source for the **next** version; it does not hot-swap the public page.
- Preview refresh is version-aware. A failed refresh keeps the existing content and offers retry instead of blanking the panel.
- Disable removes public by-slug access without deleting the management record, grants, or versions.
- Promotions point to the current published version; use [work-promotions](./work-promotions.md) when attribution is needed.

## Done when

- [ ] The public URL opens the intended published version
- [ ] A target change was followed by an explicit publish-version
- [ ] Limits and referenced Board assets pass validation
- [ ] Stats or a verified download confirms the release when relevant
- [ ] Disable/restore behavior is understood before sharing widely

## Avoid

- Treating a target edit as a production release
- Using a raw Sandbox URL as the product
- Expecting Board or port Works to download as file bundles
- Leaving secrets or access tokens in query parameters

---

[中文](../zh/playbooks/work-lifecycle.md)
