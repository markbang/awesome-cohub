---
id: cohub.bp.board-export-and-playback
title: Author, export, replay, and play semantic Boards
type: playbook
audience: [builder, agent]
features: [board, cli, export, playback, composition, replay]
difficulty: intermediate
related:
  - cohub.concept.board-runtime
  - cohub.concept.board-semantic-authoring
  - cohub.concept.space
sources:
  - https://cohub.live/changelog (v2.0-v2.45)
  - https://github.com/talesofai/cohub/blob/main/packages/protocol/src/board-authoring.ts
  - https://github.com/talesofai/cohub/blob/main/packages/cli/src/commands/boards/batch.ts
---

# Author, export, replay, and play semantic Boards

## When

You want to arrange Space files, generated media, and embedded Apps on a Board, add connections or animation, then publish, replay, or export a deterministic result.

## Outcome

- A semantic Board snapshot contains Items, connections, effects, compositions, and playback policy.
- Mutations are validated, version-aware, and safe to retry.
- Edit history is rewindable through the transaction log.
- Browser previews, checkpoints, published App Board targets, and headless exports use the same model.

## Steps

### A. Resolve and inspect before editing

A Board target can be a Board ID or a `.board` path:

```bash
cohub boards inspect <board-or-path> --json
cohub boards capabilities <board-or-path> --json
```

Use capabilities to discover supported Item types, animation channels, clip/effect kinds, coordinate spaces, and render limits. Geometry is authored in world coordinates (`position` / `size` / `rotation`), and draw/arrow frames are derived from their bounds.

### B. Apply one atomic batch

```bash
cohub boards examples create > board.json
cohub boards batch <board-or-path> --input changes.json --dry-run
cohub boards batch <board-or-path> --input changes.json \
  --base-version 12 --mutation-id <stable-id> --json
```

A batch is one atomic round trip. Reuse `mutationId` when retrying a timed-out request; use a strict `baseVersion` when the caller must reject a stale snapshot.

For focused edits, use `boards items`, `boards connections`, `boards effects`, and `boards compositions`. `boards items list/get` also show derived x/y/width/height columns for draw and arrow items, and `boards create` reports the created `.board` path.

### C. Configure and control playback

Compositions hold tracks, keyframes, procedural clips, and markers. Shared playback is grouped under `boards playback`:

```bash
cohub boards playback play <board-or-path> <composition-id> --time-scale 1
cohub boards playback pause <board-or-path> <playback-id>
cohub boards playback seek <board-or-path> <playback-id> 400
cohub boards playback stop <board-or-path> <playback-id>
```

The Board metadata selects a `compositionId`; the removed legacy `sequenceId` shape is not a new authoring contract.

### D. Replay edit history

Keep a `--mutation-id` journal while editing, then rewind with the read-only transaction log:

```bash
cohub boards transactions <board-or-path> --limit 50 --json
cohub boards transactions <board-or-path> --before 120 --operations --json
```

The first page carries the current snapshot; `createBoardReplayPlayer()` in the SDK turns it into a scrub-able timeline (older pages via prepend, live edits via append).

### E. Export

```bash
# Full board
cohub boards export <board-or-path> --out out.png --scale 2 --theme dark

# Selected Items or a world-space rectangle
cohub boards export <board-or-path> --items title,hero --out selection.webp
cohub boards export <board-or-path> --rect 0,0,1920,1080 --out frame.png
```

## Live Apps on Boards (v2.40)

Published Apps can be placed on a Board as interactive frames: drag an App from the sidebar onto the Board (native HTML5 drag on desktop, pointer drag on touch), and the frame mounts the real App surface with its runtime shell. Frames track pan, zoom, rotation, and selection; iframe content mounts lazily only while a frame is on screen at a readable size, so a dense Board stays cheap.

## Done when

- [ ] The semantic snapshot passes capabilities and dry-run validation
- [ ] A retry uses the same mutation id
- [ ] Playback honors the current reduced-motion policy
- [ ] A replay page renders the intended historical version
- [ ] Exported output matches the Board preview and referenced assets

## Avoid

- Writing the removed legacy Node/Sequence wire shape or the old `frame` envelope
- Treating a screenshot as the Board source of truth
- Replacing a timed-out batch with a new id
- Publishing unreferenced workspace assets just to satisfy a Board preview

---

[中文](../zh/playbooks/board-export-and-playback.md)
