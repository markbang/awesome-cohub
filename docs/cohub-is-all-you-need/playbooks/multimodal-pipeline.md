---
id: cohub.bp.multimodal-pipeline
title: Multimodal generation into Space assets
type: playbook
audience: [builder, agent]
features: [generation, files, chat, task]
difficulty: starter
related: [cohub.bp.scratch-to-checkpoint, cohub.concept.task]
sources:
  - https://github.com/talesofai/cohub/blob/main/docs/generations.md
  - https://cohub.run/changelog#v1.92
  - https://cohub.run/changelog#v1.95
---

# Multimodal generation into Space assets

## When

You need image / video / music (or related multimodal outputs) as project files, not only as chat decorations.

## Outcome

- Generation task completes (Task run visible if async)
- Outputs saved under a clear Space path (`data/gen/…`, `assets/…`)
- Good results referenced from README/wiki; milestone Saved

## Steps

1. State the asset contract: path, filename pattern, aspect/duration constraints, license/safety notes.
2. Generate via UI composer/tools **or** CLI skill/platform flow (`cohub generate` / `cohub-generate` skill when available):
   ```bash
   cohub generate "product hero, dark studio, orange accent" --model <model> --json
   ```
3. As soon as URLs/files return, **materialize into the workspace** (download/write). Chat CDN links are not a library.
4. Record provenance next to the file (model, prompt short hash, task id) in a small markdown sidecar or table.
5. Preview; iterate with tight diffs (“same composition, less glow”).
6. Save when the set is demo-ready. Watch credit/discount behavior on paid models.

## Done when

- [ ] Files exist on stable paths
- [ ] Prompt/model provenance recoverable
- [ ] Task failure modes understood (retry vs content refusal)

## Avoid

- Leaving the only copy inside Chat attachments history
- Regenerating from scratch instead of editing constraints
- Committing secrets or customer PII into prompts written to git-tracked files without need

---

[中文](../zh/playbooks/multimodal-pipeline.md)
