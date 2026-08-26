---
id: cohub.concept.board-runtime
title: Board runtime & PixiJS canvas
type: concept
related:
  - cohub.concept.board-semantic-authoring
  - cohub.concept.space
  - cohub.bp.board-export-and-playback
  - cohub.cheat.config-layers
sources:
  - https://cohub.live/changelog (v2.0-v2.27 Board runtime evolution)
---

# Board runtime & PixiJS canvas

The **Board runtime** (v2.0+, formerly `.covas` / canvas) is Cohub's infinite 2.5D visual surface for spatial collaboration, live file cards, media, task outputs, and headless exports. Since v2.22, semantic authoring is the source of truth shared by the API, SDK, CLI, Web editor, checkpoints, and published Works.

## Core concepts

| Term | Description |
|------|-------------|
| **Board** | Space-scoped infinite canvas document (`.board` / board domain) |
| **Item** | Semantic Board element: text, geo, draw, arrow, frame, image, video, audio, file, or task |
| **Task item** (v2.19) | Generation task output card with image, video, audio, or text previews |
| **Connections** (v2.16) | Semantic item relations with anchors, routing, direction, and labels |
| **Effect** | Typed visual behavior targeting an item, with lifecycle and parameters |
| **Composition** (v2.26) | Atomic animation timeline of property tracks, keyframes, procedural clips, and markers |
| **File item** | Live preview wrapper for a workspace file mapped to its path |
| **Playback** | Explicit composition loop, end behavior, reduced-motion policy, and shared state |
| **Export** | CLI and headless rendering of full boards, item selections, or world rectangles |

`Node` and `Sequence` are historical names from the removed legacy wire shape. New integrations should use `Item` and `Composition`.

## Key features (v2.8-v2.27)

- **Semantic authoring**: atomic mutations cover board metadata, items, connections, effects, and compositions; server diagnostics and capability discovery make the contract machine-readable.
- **Task and media items**: generation tasks can be placed on Boards with live status and multimodal previews; audio has deterministic waveform previews and unified playback.
- **In-board generation**: a Board composer accepts model parameters and typed references from selected items.
- **Connections**: Connect-tool gestures, auto or pinned anchors, routing, labels, clipboard/duplicate support, realtime awareness, exports, and checkpoints.
- **Compositions and effects**: property tracks, procedural clips, camera focus, particles, text reveal, and reduced-motion-aware playback replace ad hoc animation sequences.
- **Appearance and camera**: solid or public-image backgrounds, fit/position/opacity controls, semantic camera focus, and consistent browser/headless export behavior.
- **File references**: published Board Works include only workspace assets actually referenced by the Board.
- **Rendering scale**: viewport culling, texture LRU cooling, PixiJS spatial indexing, batched refreshes, and headless task-card rendering support dense boards.
- **Mobile-safe navigation**: touch input defaults to hand-panning; tap-to-select uses pointer checks and an 8px slop threshold.

## CLI crumbs

```bash
# Inspect the semantic document and its supported contract
cohub boards inspect <board> --json
cohub boards capabilities <board> --json

# Export a complete board or selected items
cohub boards export <board> -o out.png --scale 2 --theme dark
cohub boards export <board> --items title,hero -o selection.webp

# Shared playback uses a composition id
cohub boards play <board> <composition-id>
```

For authoring commands, validation, mutation receipts, and JSON templates, see [semantic Board authoring](./board-semantic-authoring.md).

---

[中文](../zh/concepts/board-runtime.md)
