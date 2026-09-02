---
id: cohub.bp.board-export-and-playback
title: Author, export, and play semantic Boards
type: playbook
audience: [builder, agent]
features: [board, cli, export, playback, composition]
difficulty: intermediate
related:
  - cohub.concept.board-runtime
  - cohub.concept.board-semantic-authoring
  - cohub.concept.space
sources:
  - https://cohub.live/changelog (v2.0-v2.38)
  - https://github.com/talesofai/cohub/blob/main/packages/protocol/src/board-authoring.ts
  - https://github.com/talesofai/cohub/blob/main/packages/cli/src/commands/boards/batch.ts
---

# Author, export, and play semantic Boards

## When

You want to arrange Space files and generated media on a Board, add connections or animation, and publish or export a deterministic result.

## Outcome

- A semantic Board snapshot contains Items, connections, effects, compositions, and playback policy.
- Mutations are validated, version-aware, and safe to retry.
- Browser previews, checkpoints, published App Board targets, and headless exports use the same model.

## Steps

### A. Resolve and inspect before editing

A Board target can be a Board ID or a `.board` path:

```bash
cohub boards inspect <board-or-path> --json
cohub boards capabilities <board-or-path> --json
```

Use capabilities to discover supported Item types, animation channels, clip/effect kinds, coordinate spaces, and render limits.

### B. Apply one atomic batch

```bash
cohub boards examples create > board.json
cohub boards batch <board-or-path> --input changes.json --dry-run
cohub boards batch <board-or-path> --input changes.json \
  --base-version 12 --mutation-id <stable-id> --json
```

A batch is one atomic round trip. Reuse `mutationId` when retrying a timed-out request; use a strict `baseVersion` when the caller must reject a stale snapshot.

For focused edits, use `boards items`, `boards connections`, `boards effects`, and `boards compositions`. Each supports semantic JSON and get-by-ID reads.

### C. Configure and control playback

Compositions hold tracks, keyframes, procedural clips, and markers. Shared playback is grouped under `boards playback`:

```bash
cohub boards playback play <board-or-path> <composition-id> --time-scale 1
cohub boards playback pause <board-or-path> <playback-id>
cohub boards playback seek <board-or-path> <playback-id> 400
cohub boards playback stop <board-or-path> <playback-id>
```

The Board metadata selects a `compositionId`; the removed legacy `sequenceId` shape is not a new authoring contract.

### D. Export

```bash
# Full board
cohub boards export <board-or-path> --out out.png --scale 2 --theme dark

# Selected Items or a world-space rectangle
cohub boards export <board-or-path> --items title,hero --out selection.webp
cohub boards export <board-or-path> --rect 0,0,1920,1080 --out frame.png
```

## Done when

- [ ] The semantic snapshot passes capabilities and dry-run validation
- [ ] A retry uses the same mutation id
- [ ] Playback honors the current reduced-motion policy
- [ ] Exported output matches the Board preview and referenced assets

## Avoid

- Writing the removed legacy Node/Sequence wire shape
- Treating a screenshot as the Board source of truth
- Replacing a timed-out batch with a new id
- Publishing unreferenced workspace assets just to satisfy a Board preview

---

[中文](../zh/playbooks/board-export-and-playback.md)
