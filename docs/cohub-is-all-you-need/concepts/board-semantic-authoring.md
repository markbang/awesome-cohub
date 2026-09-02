---
id: cohub.concept.board-semantic-authoring
title: Semantic Board authoring
type: concept
related:
  - cohub.concept.board-runtime
  - cohub.bp.board-export-and-playback
sources:
  - https://cohub.live/changelog (v2.22-v2.38)
  - https://github.com/talesofai/cohub/blob/main/packages/protocol/src/board-authoring.ts
  - https://github.com/talesofai/cohub/blob/main/packages/protocol/src/board-composition.ts
---

# Semantic Board authoring

Board editing is a semantic document protocol shared by the API, SDK, CLI, Web editor, checkpoints, and published Apps. The stable model describes what a Board means; renderers derive geometry and presentation from it.

## Document model

A Board snapshot contains Items, connections, effects, compositions, and playback. Built-in Items include text, geo, draw, arrow, frame, image, video, audio, file, and task. Media Items use safe relative Space-file references; task Items carry a task-run snapshot for display.

The wire vocabulary uses **Item** rather than the removed generic Node/Sequence representation. Realtime `board.changed` events carry a semantic changed projection; pure animation updates may carry an `animationPatch` that can be applied without refetching the full Board.

## Atomic commands and batches

Semantic mutations accept commands such as:

```text
board.patch
item.create / item.patch / item.replace / item.delete / item.reorder
connection.create / connection.patch / connection.delete
effect.apply / effect.delete
composition.apply / composition.delete
```

A mutation has a stable `mutationId`, an expected `baseVersion`, a command list, and optional `dryRun`. `boards batch` sends many commands in one atomic round trip. The server checks schemas, references, versions, cascade rules, and capabilities before writing. A durable receipt makes retries replay-safe; unchanged composition tracks can be re-applied as a no-op.

## Validation contract

`boards capabilities` and the public SDK `BoardSemanticCommandSchema` expose the authoring contract: supported types, fields, coordinate spaces, animation channels, clip/effect kinds, and limits. Validation failures include machine-readable codes and paths such as `items.0.props.text`; the codec raises `BoardItemValidationError`. Server failures use a stable error shape with a diagnostic array and `requestId`.

Use the same schema locally and on the server. Do not guess extension fields or turn an internal renderer object into authoring JSON.

## CLI workflow

```bash
# Discover and validate a complete batch
cohub boards capabilities <board-or-path> --json
cohub boards examples create > board.json
cohub boards batch <board-or-path> --input changes.json --dry-run
cohub boards batch <board-or-path> --input changes.json \
  --base-version 12 --mutation-id <stable-id> --json

# Read individual semantic resources
cohub boards items get <board-or-path> <item-id> --json
cohub boards connections get <board-or-path> <connection-id> --json
cohub boards effects get <board-or-path> <effect-id> --json
cohub boards compositions get <board-or-path> <composition-id> --json
```

Playback commands are now grouped under `boards playback`:

```bash
cohub boards playback play <board-or-path> <composition-id> --time-scale 1
cohub boards playback pause <board-or-path> <playback-id>
cohub boards playback seek <board-or-path> <playback-id> 400
cohub boards playback stop <board-or-path> <playback-id>
```

## Retry rules

- Reuse the same `mutationId` after a timeout.
- Use `baseVersion` to make an expected snapshot explicit.
- On `VERSION_CONFLICT`, read the latest Board and rebase the intended commands.
- On a validation error, fix the reported authoring path; do not retry unchanged JSON.

## Avoid

- Writing the removed legacy Sequence/Node wire shape directly.
- Treating a screenshot or renderer cache as the source of truth.
- Replacing a timed-out batch with a new id.
- Sending unbounded JSON or unsupported capabilities.

---

[中文](../zh/concepts/board-semantic-authoring.md)
