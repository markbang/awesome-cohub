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
  - https://cohub.live/changelog (v2.0-v2.46 Board runtime evolution)
---

# Board runtime and semantic canvas

The **Board runtime** is Cohub's infinite 2.5D visual surface for spatial collaboration, live file cards, media, task outputs, embedded Apps, animation, and headless exports. Its semantic document is shared by the API, SDK, CLI, Web editor, checkpoints, and published Apps.

## Core concepts

| Term | Description |
|------|-------------|
| **Board** | Space-scoped infinite canvas document (`.board`) |
| **Item** | Semantic element: text, geo, draw, arrow, frame, image, video, audio, file, task, or app |
| **Connection** | Semantic relation between Items with anchors, direction, labels, routing, and style |
| **Effect** | Typed visual behavior targeting an Item, with lifecycle and parameters |
| **Composition** | Atomic animation timeline of property tracks, keyframes, procedural clips, and markers |
| **Playback** | Shared composition control with play, pause, seek, stop, time scale, and reduced-motion policy |
| **Transactions** | Server-side edit log powering replay, with snapshot-consistent pages and computed inverses |
| **Board capability** | Versioned schema/renderer contract exposed for machine validation and authoring discovery |
| **Export** | Headless rendering of a full Board, Item selection, frame, or world rectangle |

`Node` and `Sequence` are historical names from the removed legacy wire shape. New integrations use `Item` and `Composition`.

## Key features (v2.22-v2.46)

- **Semantic authoring**: atomic mutations cover Board metadata, Items, connections, effects, and compositions. `boards batch` applies many commands in one round trip with strict optimistic concurrency and idempotent replay.
- **Structured validation**: codec and API errors expose stable codes, JSON-mapped diagnostic paths, and `requestId` for server failures; the SDK exports the public command schema and `BoardItemValidationError`.
- **World-space geometry**: authoring uses `position` / `size` / `rotation`; draw and arrow geometry is authored in world space and item frames derive from stroke and curve bounds through a shared protocol geometry core.
- **Task, media, and app Items**: generation tasks, audio, typed references, waveform previews, and embedded interactive Apps are first-class Board content.
- **Edit-history replay** (v2.45): a read-only transaction log plus the SDK replay player and `cohub boards transactions` make any Board's history rewindable; the web workspace adds a private replay stage with a scrubber.
- **Animation realtime sync**: small pure effect/composition changes arrive as a server-authored `animationPatch` inside `board.changed`, avoiding a full snapshot refetch.
- **Entrance motion** (v2.44-v2.45): `effects.deal` is an optional Board-wide or per-node preset; local additions and realtime arrivals animate in, while bursts over 12 items are treated as rehydration and skipped.
- **Rendering quality**: freehand paths use segment tessellation with round joins; image textures are shared through a reference-counted pool; render context declares `gpu` vs `canvas`, and headless export converges with live rendering.
- **Published App capture**: a Board App includes the Board state and only the workspace assets it references.

## Transactions and replay

```bash
# Newest-first transaction pages (alias: history)
cohub boards transactions <board-or-path> --limit 50 --json
cohub boards transactions <board-or-path> --before 120 --operations --json
```

The first page carries the current snapshot, so the SDK `createBoardReplayPlayer()` can scrub back and forth, prepend older pages, and append live transactions.

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
