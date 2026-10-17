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
  - https://cohub.live/changelog (v2.0-v2.70 Board evolution)
  - https://github.com/talesofai/cohub/blob/main/docs/board.md
---

# Board runtime and semantic canvas

The **Board runtime** is Cohub's infinite 2.5D visual surface for spatial collaboration, live file cards, media, task outputs, embedded Apps, scripts, animation, and headless exports. Board v3 (v2.61+) is the current document model.

## Document model

A Board is one JSON document with three collections: settings (`board`), items, and animations.

```json
{
  "board": { "background": { "kind": "dots" }, "grid": { "visible": true, "size": 24 }, "enter": { "preset": "deal" } },
  "items": { "title": { "type": "text", "position": { "x": 80, "y": 60 }, "props": { "text": "Launch" } } },
  "animations": { "intro": { "duration": 800, "tracks": { "fade": { "target": "title", "property": "opacity", "keyframes": [{ "at": 0, "value": 0 }, { "at": 800, "value": 1 }] } } } }
}
```

## Items

| Group | Types |
|-------|-------|
| Structure | `frame` (the only parent type), `shape` (including `path`), `text`, `draw`, `arrow` |
| Media | `image`, `video`, `audio`, `file`; `file` cards for `.glb` / `.gltf` / `.stl` / `.obj` render a 3D preview |
| Runtime | `task` (a Task Run card), `effect`, `custom` (script-driven), extension types such as `acme.order` |

Common fields: `parent`, `z`, `position` (relative to parent; root is world space), `size`, `rotation`, `scale`, `origin`, `opacity`, `style`, `props`, `locked`, `metadata`, optional `script` (`src`, `params`, `targets`, `seed`, `enabled`).

- Children inherit the parent's transform and opacity.
- Draw points and unbound arrow endpoints are item-local; bound endpoints follow the referenced item.
- `size` is authored for boxes and derived for `text`, `draw`, and `arrow`.
- `style` supports palette tokens, CSS colors, light/dark pairs, `dash`, `radius`, and `trim`.

## Media and tasks

Media sources accept a stable public HTTP(S) URL **or** a relative Space path. A Space path keeps live file updates; a URL loads directly without importing the file. Publishing captures Space file dependencies and records remote references in `externalUrls` — remote media stays live and is not an immutable captured asset.

Task items store only `taskRunId`; the server reads the run and maintains `props.snapshot`. When a run finishes, the final snapshot is written to every Board in its Space that shows it, one version per Board, attributed to the task. Clients never win over the run's snapshot, and writing a run the author cannot view fails with `TASK_FORBIDDEN`.

## Scripts

Board scripts (v2.64+) replace the old Sketch item and run in one isolated module runtime shared by the browser, CLI, and exports. Scripts can draw with Canvas/WebGL, declare `hitRegions()`, observe selection/view/transform events, and commit document changes explicitly. ESM entry modules are published together with their transitive dependencies.

## SDK layers

Since v2.63 the Board SDK is split into framework-free layers:

- `board/editor` — document editing and interactions
- `board/replica` — read-only synchronized replica
- `board/stage` — PixiJS rendering
- `board/export/node` — headless Node export (formerly `board/headless`)

Instances use an item registry (`defineBoardItem` / `createBoardRegistry`), and stored documents remain compatible.

## Playback and export

One playback runtime is shared by the web, CLI, and exports. Playback culls, preloads, and picks LOD from the **animated** camera; the far layer is double-buffered; connections cache per-layer geometry and cull to a rect. Exports release intermediate canvases eagerly, enforce a configurable decoded-image budget, and preflight video dimensions.

## CLI crumbs

```bash
cohub boards get <board> --only board,items --json
cohub boards get <board> --items a,b --within <item-id> --json
cohub boards preset rise --targets title --json
cohub boards schema camera --json
cohub boards export <board> --paper dark -o out.png
```

For authoring, scripts, and retries, see [semantic Board authoring](./board-semantic-authoring.md).

---

[中文](../zh/concepts/board-runtime.md)
