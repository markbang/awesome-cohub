---
id: cohub.concept.board-runtime
title: Board runtime and semantic canvas
type: concept
related:
  - cohub.concept.board-semantic-authoring
  - cohub.concept.app-center
  - cohub.bp.board-export-and-playback
  - cohub.cheat.config-layers
sources:
  - https://cohub.live/changelog (v2.0-v2.38 Board runtime evolution)
---

# Board runtime and semantic canvas

The **Board runtime** is Cohub's infinite 2.5D visual surface for spatial collaboration, live file cards, media, task outputs, animation, and headless exports. Its semantic document is shared by the API, SDK, CLI, Web editor, checkpoints, and published Apps.

## Core concepts

| Term | Description |
|------|-------------|
| **Board** | Space-scoped infinite canvas document (`.board`) |
| **Item** | Semantic element: text, geo, draw, arrow, frame, image, video, audio, file, or task |
| **Connection** | Semantic relation between Items with anchors, direction, labels, routing, and style |
| **Effect** | Typed visual behavior targeting an Item, with lifecycle and parameters |
| **Composition** | Atomic animation timeline of property tracks, keyframes, procedural clips, and markers |
| **Playback** | Shared composition control with play, pause, seek, stop, time scale, and reduced-motion policy |
| **Board capability** | Versioned schema/renderer contract exposed for machine validation and authoring discovery |
| **Export** | Headless rendering of a full Board, Item selection, frame, or world rectangle |

`Node` and `Sequence` are historical names from the removed legacy wire shape. New integrations use `Item` and `Composition`.

## Key features (v2.22-v2.38)

- **Semantic authoring**: atomic mutations cover Board metadata, Items, connections, effects, and compositions. `boards batch` applies many commands in one round trip with strict optimistic concurrency and idempotent replay.
- **Structured validation**: codec and API errors expose stable codes, JSON-mapped diagnostic paths, and `requestId` for server failures; the SDK exports the public command schema and `BoardItemValidationError`.
- **Task and media Items**: generation tasks, audio, typed references, waveform previews, and unified playback are first-class Board content.
- **Animation realtime sync**: small pure effect/composition changes can arrive as a server-authored `animationPatch` inside `board.changed`, avoiding a full snapshot refetch.
- **Appearance and camera**: solid or public-image backgrounds, fit/position/opacity controls, semantic camera focus, and consistent browser/headless rendering.
- **Rendering quality**: freehand paths use segment tessellation with round joins and reveal progress; viewport culling, texture LRU cooling, spatial indexing, batched refreshes, and headless task cards support dense boards.
- **Published App capture**: a Board App includes the Board state and only the workspace assets it references.

## CLI crumbs

```bash
# A Board resolves by id or .board path
cohub boards inspect <board-or-path> --json
cohub boards capabilities <board-or-path> --json

# Apply a validated atomic batch
cohub boards batch <board-or-path> --input changes.json --dry-run
cohub boards batch <board-or-path> --input changes.json --base-version 12 --mutation-id <stable-id>

# Inspect relations and control shared playback
cohub boards connections list <board-or-path> --json
cohub boards connections get <board-or-path> <connection-id> --json
cohub boards playback play <board-or-path> <composition-id>
cohub boards playback pause <board-or-path> <playback-id>
```

For mutation shape, diagnostics, and retry rules, see [semantic Board authoring](./board-semantic-authoring.md).

---

[中文](../zh/concepts/board-runtime.md)
