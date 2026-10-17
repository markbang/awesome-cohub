---
id: cohub.concept.board-semantic-authoring
title: Semantic Board authoring
type: concept
related:
  - cohub.concept.board-runtime
  - cohub.bp.board-export-and-playback
sources:
  - https://cohub.live/changelog (v2.22-v2.70)
  - https://github.com/talesofai/cohub/blob/main/docs/board.md
  - https://github.com/talesofai/cohub/blob/main/docs/board-scripts.md
---

# Semantic Board authoring

Board editing is a JSON document protocol shared by the API, SDK, CLI, web editor, checkpoints, and published Apps. The document describes what a Board means; renderers derive geometry and presentation from it.

## Document

```json
{
  "board": { "background": { "kind": "dots" }, "grid": { "visible": true, "size": 24 }, "enter": { "preset": "deal" } },
  "items": { "id": { "type": "text", "position": { "x": 0, "y": 0 }, "props": { "text": "Hi" } } },
  "animations": { "intro": { "duration": 800, "tracks": { "t": { "target": "id", "property": "opacity", "keyframes": [{ "at": 0, "value": 0 }, { "at": 800, "value": 1 }] } } } }
}
```

Authoring is a **merge patch** by default: `boards apply` (or the SDK equivalent) merges the input into the document. `--replace` makes the document equal to the input. Deleting a referenced item fails and lists references; `--cascade` also deletes children and targeting tracks.

## Geometry

- `position` is relative to `parent`; a root item is in world space.
- `draw` points and unbound `arrow` endpoints are item-local; bound endpoints follow the referenced item.
- `size` is authored for boxes (`frame`, `shape`, media, `task`, `effect`, `custom`) and derived for `text`, `draw`, and `arrow`.
- `style` accepts palette tokens, CSS colors, light/dark pairs, plus `dash`, `radius`, and `trim`.

Use `cohub boards schema <target> --field <path>` to read the exact value type, units, and composition (for example camera fields) instead of guessing.

## Scripts

`custom` items and native items can carry a `script` attachment (`src`, `params`, `targets`, `seed`, `enabled`). Scripts run in one isolated module runtime shared by browser, CLI, and exports, declare their own `hitRegions()`, and commit document changes explicitly. ESM entry modules publish with their transitive dependencies.

## Validation and concurrency

- Every write reports a Board version. Pass `--base-version` to fail when the Board has moved past it.
- Pass `--mutation-id` so a retry never applies twice.
- `--dry-run` validates without writing.
- Validation failures name the authoring path (for example `items.0.props.text`).

## CLI workflow

```bash
# Inspect
cohub boards get <board> --only board,items --json
cohub boards get <board> --within <frame-id> --json
cohub boards schema <target> --field props.geometry

# Write
cohub boards apply <board> -i patch.json --dry-run
cohub boards apply <board> -i patch.json --base-version 12 --mutation-id <stable-id>
cohub boards apply <board> -i doc.json --replace

# History and restore
cohub boards history <board> --limit 20 --json
cohub boards history <board> --restore 12
```

## Animation presets

```bash
cohub boards preset <name> --at 0 --stagger 80 --duration 600 --ease ease-out --json
cohub boards preset <name> --animation intro --json
```

Without `--animation`, presets emit bare `tracks`; with it, they wrap the tracks in that animation.

## Retry rules

- Reuse the same `mutation-id` after a timeout.
- Use `--base-version` to reject a stale snapshot.
- After a version conflict, read the latest Board and rebase the patch.
- Fix a reported validation path; do not retry unchanged JSON.

## Avoid

- Writing legacy Node/Sequence shapes or the pre-v3 `frame` envelope.
- Treating a screenshot or renderer cache as the source of truth.
- Sending unbounded JSON or unsupported item properties.
- Replacing a timed-out write with a new mutation id.

---

[中文](../zh/concepts/board-semantic-authoring.md)
