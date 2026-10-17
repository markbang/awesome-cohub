---
id: cohub.bp.board-export-and-playback
title: Author, export, replay, and play Boards
type: playbook
audience: [builder, agent]
features: [board, cli, export, playback, animation, replay]
difficulty: intermediate
related:
  - cohub.concept.board-runtime
  - cohub.concept.board-semantic-authoring
  - cohub.concept.space
sources:
  - https://cohub.live/changelog (v2.0-v2.70)
  - https://github.com/talesofai/cohub/blob/main/docs/board.md
  - https://github.com/talesofai/cohub/blob/main/docs/board-scripts.md
---

# Author, export, replay, and play Boards

## When

You want to arrange files, media, tasks, and embedded Apps on a Board, animate them, then export stills or video, replay edits, or present live.

## Outcome

- One JSON document with `board` settings, `items`, and `animations`.
- Writes are versioned, dry-runnable, and idempotent.
- Still and video exports use the same playback runtime as the web.
- Edit history can be replayed or restored.

## Steps

### A. Inspect and author

```bash
cohub boards get <board> --only board,items --json
cohub boards get <board> --within <frame-id> --json
cohub boards schema <target> --field props.geometry

cohub boards apply <board> -i patch.json --dry-run
cohub boards apply <board> -i patch.json --base-version 12 --mutation-id <stable-id>
```

`apply` merges by default; `--replace` sets the document; `--cascade` deletes children and targeting tracks together with a deleted item.

### B. Build animations

```bash
cohub boards preset <name> --at 0 --stagger 80 --duration 600 --ease ease-out --json
cohub boards preset <name> --animation intro --json
```

Animations live in `animations.<id>.tracks.<id>` and drive properties by JSON path (`opacity`, `scale`, `props.reveal`, ...). Entrance motion is opt-in through `board.enter.preset` (for example `deal`); it is skipped for bursts over 12 items and falls back to a fade under reduced motion.

### C. Present and control playback

```bash
cohub boards play <board> <animation> --at 2.5s --speed 1.5
cohub boards pause <board>
cohub boards resume <board>
cohub boards seek <board> 12.5s
cohub boards next <board>
cohub boards stop <board>
cohub boards watch <board>
```

Playback culls, preloads, and picks LOD from the animated camera; the `next` command continues past a marker a presentation holds at.

### D. Replay and restore history

```bash
cohub boards history <board> --limit 20 --json
cohub boards history <board> --restore 12
```

Restoring a version is a new write, not a rewrite of history.

### E. Export stills or video

```bash
# Single moment
cohub boards export <board> -o out.png --scale 2 --theme dark

# Several moments, or a range with a step
cohub boards export <board> --at 0,2.5s,5s -o frames/%04d.png --format png
cohub boards export <board> --at 0:6s:0.1s --camera --fps 30 -o out.mp4

# Region and paper
cohub boards export <board> --items title,hero -o selection.webp --paper transparent
cohub boards export <board> --rect 0,0,1920,1080 --size 1920x1080 -o frame.png
```

`--at` accepts a moment, a comma list, or `start:end:step`; `--camera` follows the animated camera; `--animation` says which animation the times refer to; `--image-memory` bounds decoded images. `--paper` replaced the old `--background` flag.

## Live Apps and scripts

Published Apps can sit on a Board as interactive frames (v2.40), placed by drag-and-drop from the sidebar. Script-driven `custom` items and `script` attachments (v2.64) run one isolated module runtime shared by browser, CLI, and export.

## Done when

- [ ] `apply --dry-run` passes before the real write
- [ ] A retry reuses the same mutation id
- [ ] Playback honors the animated camera; entrance motion falls back to a fade under reduced motion
- [ ] A restored version renders the intended historical state
- [ ] Exported stills/video match the Board preview and referenced assets

## Avoid

- Writing legacy Node/Sequence shapes or the pre-v3 `frame` envelope
- Treating a screenshot as the Board source of truth
- Exporting without a decoded-image budget for large Boards
- Expecting remote media URLs to be captured immutably on publish

---

[中文](../zh/playbooks/board-export-and-playback.md)
