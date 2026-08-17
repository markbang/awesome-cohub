---
id: cohub.concept.board-runtime
title: Board runtime & PixiJS canvas
type: concept
related:
  - cohub.concept.space
  - cohub.bp.board-export-and-playback
  - cohub.cheat.config-layers
sources:
  - https://cohub.run/changelog (v2.0-v2.21 Board runtime evolution)
---

# Board runtime & PixiJS canvas

The **Board runtime** (v2.0+, formerly `.covas` / canvas) is Cohub's infinite 2.5D visual surface for spatial collaboration, live file cards, video previews, and media exports.

## Core concepts

| Term | Description |
|------|-------------|
| **Board** | Space-scoped infinite canvas document (`.board` / board domain) |
| **Node** | Element on a board (text, shape, image, video, audio, task, or generic `file` node) |
| **Task node** (v2.19) | Generation task output card with multimodal previews (image/video/audio/text) |
| **Audio node** (v2.20) | First-class audio node with deterministic waveform previews |
| **Connections** (v2.16) | Node-to-node relations with anchors, routing, direction, and labels |
| **File node** | Live preview wrapper for any workspace file (code, PDF, binary) mapped to its path |
| **Transactions & Order keys** | LIS-based mid-key allocation allowing 50k+ nodes without index-rekey churn |
| **Autoplay Policy** | Metadata-defined playback loop (`sequenceId`, `delayMs`, `loop`) per viewer |
| **Export** | CLI (`cohub boards export`) and web headless export (PNG/JPEG/WebP, `--frame`, `--rect`) |

## Key features (v2.8–v2.21)

- **Task nodes on boards** (v2.19): drag generation tasks from session tray onto boards with live status sync and multimodal output previews.
- **In-board media generation** (v2.19): floating generation composer with model search, reference inputs, and background task watchers.
- **Audio nodes** (v2.20): first-class audio with waveform previews and unified media playback.
- **Connections** (v2.16): node-to-node relations with Connect tool gestures, auto/pinned anchors, and realtime awareness.
- **Any file on board**: Binary/text workspace files preview on cards based on path rather than hardcoded display states.
- **Realtime awareness**: Cursors, selection bounding boxes, and Agent edit markers stream via gateway overlay.
- **Performance scale-up**: Viewport culling, texture LRU cooling pool, and PixiJS quadtree spatial indexing keep rendering smooth under thousands of nodes.
- **Mobile-safe navigation**: Touch input defaults to hand-panning; tap-to-select uses pointer checks and an 8px slop threshold.

## CLI Crumbs

```bash
# List and export boards
cohub boards ls
cohub boards export <boardId> -o out.png --scale 2 --theme dark
```

## See also

- Playbook: [board-export-and-playback](../playbooks/board-export-and-playback.md)

---

[中文](../zh/concepts/board-runtime.md)
