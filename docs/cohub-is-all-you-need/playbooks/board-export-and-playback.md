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
  - https://cohub.live/changelog (v2.0-v2.27)
  - https://github.com/talesofai/cohub/blob/main/packages/protocol/src/board-authoring.ts
---

# Author, export, and play semantic Boards

## When

You want to arrange Space files and generated media on a Board, add connections or animation, and publish or export a deterministic result.

## Outcome

- A semantic Board snapshot contains Items, connections, effects, compositions, and playback policy.
- Mutations are validated, version-aware, and safe to retry.
- Browser previews, checkpoints, published Board Works, and headless exports use the same model.

## Steps

### A. Inspect before editing

```bash
cohub boards inspect <board> --json
cohub boards capabilities <board> --json
```

Use capabilities to discover supported Item types, animation channels, clip/effect kinds, coordinate spaces, and render limits.

### B. Create semantic content

```bash
cohub boards examples item image > hero.json
cohub boards items create <board> --input hero.json --dry-run
cohub boards items create <board> --input hero.json --mutation-id <stable-id>
cohub boards items patch <board> <item-id> --input patch.json
```

Connections, effects, and compositions use the same atomic mutation protocol. Reuse `mutationId` when retrying a timed-out request; use `baseVersion` when chaining from a known snapshot.

### C. Configure composition playback

Compositions hold tracks, keyframes, procedural clips, and markers. Board metadata selects the composition rather than the removed legacy `sequenceId` shape:

```json
{
  "playback": {
    "compositionId": "intro",
    "delayMs": 500
  }
}
```

```bash
cohub boards play <board> intro
cohub boards pause <board> <playback-id>
cohub boards seek <board> <playback-id> 400
```

### D. Export

```bash
# Full board
cohub boards export <board> -o out.png --scale 2 --theme dark

# Selected Items or a world-space rectangle
cohub boards export <board> --items title,hero -o selection.webp
cohub boards export <board> --rect 0,0,1920,1080 -o frame.png
```

## Done when

- [ ] The semantic snapshot passes `capabilities` and dry-run validation
- [ ] A retry uses the same mutation id
- [ ] Playback honors the current reduced-motion policy
- [ ] Exported output matches the Board preview and referenced assets

## Avoid

- Writing the removed legacy Node/Sequence wire shape
- Treating a screenshot as the Board source of truth
- Replacing a timed-out mutation with a new id
- Publishing unreferenced workspace assets just to satisfy a Board preview

---

[中文](../zh/playbooks/board-export-and-playback.md)
