---
id: cohub.bp.work-lifecycle
title: Work lifecycle — publish, version, disable, visibility
type: playbook
audience: [builder]
features: [work]
difficulty: intermediate
related: [cohub.bp.publish-static-work, cohub.bp.hide-cohub-bar, cohub.bp.port-preview]
sources:
  - https://cohub.run/docs/create/works
  - https://github.com/talesofai/cohub/blob/main/docs/works-guide.md
---

# Work lifecycle — publish, version, disable, visibility

## When

You manage a Work beyond “first publish”: iterate, take offline, or change who can open it.

## Outcome

- Know `status` vs `visibility` vs **version snapshot**
- Can disable without deleting; republish from current target
- Know target limits (file / directory / port)

## Model

| Field | Meaning |
|-------|---------|
| `slug` | Public name segment |
| `status` | `published` \| `disabled` |
| `visibility` | e.g. `public` \| `space` (CLI `--visibility`) |
| `targetType` | `file` \| `directory` \| `port` |
| `targetRef` | path or port |
| version | Snapshot created on publish / publish-version |

URL:

```text
/:username/:spaceSlug/w/:workSlug
```

Requires username + space slug + work slug (cannot clear username/slug once set).

## Limits (works guide)

| Target | Rules |
|--------|--------|
| **file** | `.html`/`.htm`, 1 byte–**5 MB** |
| **directory** | must include `index.html`, 1–**1000** files, total ≤ **100 MB** |
| **port** | supported public sandbox ports only |

## CLI

```bash
# create/publish
cohub -s <spaceId> works publish demo --dir dist --json
cohub -s <spaceId> works publish one --file index.html --json
cohub -s <spaceId> works publish live --port 5173 --json

# new version from current target
cohub -s <spaceId> works publish-version <workId> --json

# settings
cohub -s <spaceId> works update <workId> --status disabled --json
cohub -s <spaceId> works update <workId> --status published --json
cohub -s <spaceId> works update <workId> --visibility space --json
cohub -s <spaceId> works update <workId> --hide-cohub-bar --json

# inspect
cohub -s <spaceId> works get <workId> --json
cohub -s <spaceId> works versions <workId> --json
```

## UI

Management page: `/spaces/:spaceId/works/:workId`

- Edit slug/target/permissions  
- Disable removes public by-slug access  
- Delete removes management record, grants, versions  
- Editing target only affects the **next** published version  

## Done when

- [ ] You can take a Work offline without deleting  
- [ ] Republish updates what the public URL serves  
- [ ] Failures map to limit/slug/runtime checks  

## Avoid

- Expecting target edit to hot-swap production without publish-version  
- Port Works as default production ([port-preview](./port-preview.md))  
- Skipping username/space slug setup  

---

[中文](../zh/playbooks/work-lifecycle.md)
