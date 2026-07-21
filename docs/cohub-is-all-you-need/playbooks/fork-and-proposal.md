---
id: cohub.bp.fork-and-proposal
title: Fork a Save and explore safely
type: playbook
audience: [builder, agent]
features: [save, space, chat]
difficulty: intermediate
related: [cohub.concept.save, cohub.concept.space, cohub.bp.scratch-to-checkpoint]
sources:
  - https://cohub.run/docs/workspace/saves
  - https://cohub.run/docs/learn/core-concepts
---

# Fork a Save and explore safely

## When

You have a known-good Save and want a risky rewrite, alternate design, or collaborator experiment without destroying the mainline.

## Outcome

- Mainline Save remains restorable
- Exploration happens on a fork/branch of work (Space and/or Chat lineage)
- Decision recorded; optional merge-back discipline

## Steps

1. On mainline: create a clear Save (`v1-working-demo`).
2. Choose exploration shape:
   - **Chat fork** — same Space files, alternate conversation path
   - **Space-level fork / new Space from Save** — stronger isolation when files will diverge hard
3. Name the exploration explicitly (`exp/auth-rewrite`).
4. Let the Agent go bold **only after** the fork exists.
5. Compare via diffs / preview / notes; write a short decision memo in files.
6. If promoting results: port changes carefully to mainline (patch/PR-like discipline), then Save mainline again.
7. If discarding: keep the experimental Save/Space for archaeology or archive/disable.

## Done when

- [ ] Mainline green Save still intact
- [ ] Exploration path identifiable
- [ ] Decision memo exists (even if “abandon”)

## Avoid

- Bold agent cleanup on the only good timeline
- Fork without naming / ownership
- “Merge” by overwriting without diff review

---

[中文](../zh/playbooks/fork-and-proposal.md)
