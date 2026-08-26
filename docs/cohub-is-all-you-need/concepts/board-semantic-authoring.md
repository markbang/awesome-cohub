---
id: cohub.concept.board-semantic-authoring
title: Semantic Board authoring
type: concept
related:
  - cohub.concept.board-runtime
  - cohub.bp.board-export-and-playback
sources:
  - https://cohub.live/changelog (v2.22-v2.27)
  - https://github.com/talesofai/cohub/blob/main/packages/protocol/src/board-authoring.ts
  - https://github.com/talesofai/cohub/blob/main/packages/protocol/src/board-composition.ts
---

# Semantic Board authoring

Since v2.22-v2.27, Board editing is a semantic document protocol shared by the API, SDK, CLI, Web editor, checkpoints, and published Works. The stable model describes what a Board means; the renderer derives geometry and media presentation from that model.

## Document model

A Board snapshot contains:

- **Items**: text, geo, draw, arrow, frame, image, video, audio, file, and task items.
- **Connections**: relations between items with anchors, direction, labels, routing, and style.
- **Effects**: reusable, typed visual effects with lifecycle, target, parameters, and asset references.
- **Compositions**: atomic animation timelines made from property tracks, keyframes, procedural clips, and markers.
- **Playback**: explicit loop, end behavior, reduced-motion, and shared playback state.

The wire vocabulary now uses **item** rather than the former generic node/sequence representation. Checkpoints and published Board Works persist the same semantic Item snapshot.

## Atomic mutations

Semantic mutations are one transaction containing commands such as:

```text
board.patch
item.create / item.patch / item.replace / item.delete / item.reorder
connection.create / connection.patch / connection.delete
effect.apply / effect.delete
composition.apply / composition.delete
```

Each mutation carries a stable `mutationId` and an expected `baseVersion`. The server validates schemas, references, versions, cascade rules, and capabilities before writing. `dryRun` performs the same server-side validation without persistence. A durable receipt makes retries replay-safe; unchanged composition tracks can be re-applied as a no-op.

Machine-readable diagnostics and `boards capabilities` expose supported item types, colors, coordinate conventions, animation channels, clip kinds, effect kinds, and render limits. Realtime updates use the semantic `board.changed` projection rather than raw wire operations. Agents should discover capabilities instead of guessing extension fields.

## CLI workflow

```bash
# Inspect the semantic snapshot and supported schemas
cohub boards inspect <board> --json
cohub boards capabilities <board> --json

# Create or patch an item from JSON; validate before writing
cohub boards examples item text > item.json
cohub boards items create <board> --input item.json --dry-run
cohub boards items create <board> --input item.json --mutation-id <stable-id>
cohub boards items patch <board> <item-id> --input patch.json

# Apply an effect or composition
cohub boards examples composition fade > intro.json
cohub boards compositions apply <board> --input intro.json
cohub boards effects apply <board> --input effect.json
```

Use `--base-version` when chaining writes from a known snapshot. Re-read after a version conflict unless the client helper performs the documented idempotent retry.

## Composition mental model

Use tracks for interpolated properties such as opacity or position. Use procedural clips for behavior such as text reveal, motion paths, particles, and camera focus. Keep assets in Space files and refer to them through typed references. The same composition can be previewed, exported headlessly, published, and played with the Board playback policy.

## Avoid

- Writing the removed legacy Sequence/Node wire shape directly.
- Treating a Board render as the source of truth instead of its semantic snapshot.
- Retrying a mutation with a new id after a timeout; reuse the same `mutationId`.
- Sending unbounded JSON or extension kinds without checking `capabilities`.

---

[中文](../zh/concepts/board-semantic-authoring.md)
