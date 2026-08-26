---
id: cohub.concept.direct-generation
title: Direct Generation turns
type: concept
related:
  - cohub.concept.task-browser
  - cohub.concept.context-compaction
  - cohub.bp.multimodal-pipeline
sources:
  - https://cohub.live/changelog (v2.23)
  - https://github.com/talesofai/cohub/blob/main/docs/generations.md
---

# Direct Generation turns

**Direct Generation** (v2.23) is the create path for multimodal work. It treats a generation as a first-class turn in a Chat timeline instead of hiding it behind an ordinary text prompt or an unrelated background task.

## User model

- The composer has an **Agent / Create** mode switch.
- Create mode offers a searchable generation-model picker and persists the user's model preference.
- Mode and model are submitted atomically, so restored drafts keep the exact create settings they had before navigation or retry.
- Generation status moves through queued and terminal states and is visible in the timeline and Task Browser.

## Runtime model

A direct-generation request carries `mode: "create"` and a generation payload. The server records it with `execution_kind = "direct_generation"`, deduplicates retries by `clientMessageId`, and emits normal realtime turn/session events. `generation.request` and `generation.result` are projected into the Agent session files for durable inspection.

Pending generations act as timeline barriers: later Agent turns wait behind the pending create operation, so text and media work cannot silently reorder. Direct-generation turns are excluded from ordinary steering/abort coordination and finish from terminal generation updates.

## Cost and compaction

Message bubbles distinguish charged, pending, and not-charged outcomes. Provider cost details and retry state remain visible without making the user infer billing from a missing artifact. Image-heavy context accounting uses a flat vision-tile estimate, and compaction validation skips rewrites that reduce context by less than 20% unless explicitly forced.

## Choose the right path

- Use **Direct Generation** when the user is asking for a media artifact as the primary result.
- Use a normal Agent turn when generation is one step in a broader file-editing workflow.
- Use the **Task Browser** for history, polling, and inspection after either path creates a Task Run.

---

[中文](../zh/concepts/direct-generation.md)
