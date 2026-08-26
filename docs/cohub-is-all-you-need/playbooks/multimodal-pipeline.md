---
id: cohub.bp.multimodal-pipeline
title: Generate, inspect, and materialize multimodal assets
type: playbook
audience: [builder, agent]
features: [generation, files, chat, task, billing]
difficulty: starter
related:
  - cohub.concept.direct-generation
  - cohub.concept.task-browser
  - cohub.bp.scratch-to-checkpoint
sources:
  - https://github.com/talesofai/cohub/blob/main/docs/generations.md
  - https://cohub.live/changelog (v2.8, v2.19-v2.23)
---

# Generate, inspect, and materialize multimodal assets

## When

You need image, video, music, or other multimodal output as a durable Space asset rather than only a Chat attachment.

## Outcome

- A generation task is created and its result can be polled or inspected.
- Outputs are saved under a clear Space path (`data/gen/`, `assets/`, ...).
- Cost, model, and task provenance remain recoverable.

## Choose a path

- Use **Direct Generation / Create mode** when the media artifact is the primary result in the Chat timeline.
- Use a normal Agent turn when generation is one step in a broader file workflow.
- Use **Task Browser** or `client.tasks` for task history and detail after either path.

## Steps

1. Define the asset contract: path, filename pattern, aspect/duration constraints, license and safety notes.
2. Select a model from the live multimodal catalog rather than hardcoding an unavailable provider:
   ```bash
   cohub models ls --model-type multimodal
   ```
3. Generate through Create mode, the UI, or CLI:
   ```bash
   cohub generate "product hero, dark studio, orange accent" \
     --model <model> --json
   ```
4. Treat creation and reading as separate permissions in an App: `generation.create` creates a task; `taskrun.view` is required to poll or inspect it.
5. Materialize returned media into the workspace as soon as it is available. Chat or provider URLs are not a project library.
6. Record model, prompt summary, task id, and provider cost beside the asset. Generation cost UI distinguishes charged, pending, and not-charged outcomes; transient billing writes may retry after task success.
7. Preview, iterate with constrained changes, and Save when the set is demo-ready.

## Image context and fallback

When a text-only model receives an image, Cohub can use the configured `imageToText` auxiliary task model. Descriptions are persisted per turn and reused, so retries do not repeatedly bill the fallback. Image-heavy compaction uses a vision-tile estimate rather than raw base64 length.

## Done when

- [ ] Files exist on stable Space paths
- [ ] Prompt/model/task provenance is recoverable
- [ ] Task Browser can show the final result
- [ ] Billing and retry status is understood

## Avoid

- Leaving the only copy inside Chat attachment history
- Assuming `generation.create` also grants result polling
- Re-generating from scratch instead of editing constraints
- Committing secrets or customer PII into prompts without need

---

[中文](../zh/playbooks/multimodal-pipeline.md)
