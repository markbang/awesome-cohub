---
id: cohub.bp.fork-and-proposal
title: Fork a Save and explore safely
title_zh: Fork 存档并安全探索
type: playbook
audience: [builder, agent]
features: [save, space, chat]
difficulty: intermediate
related: [cohub.concept.save, cohub.concept.space, cohub.bp.scratch-to-checkpoint]
sources:
  - https://cohub.run/docs/workspace/saves
  - https://cohub.run/docs/learn/core-concepts
---

# Fork a Save and explore safely · Fork 存档并安全探索

## When · 何时用

EN: You have a known-good Save and want a risky rewrite, alternate design, or collaborator experiment without destroying the mainline.
中文：已有绿灯存档，想做高风险改写/另一方案/协作实验，且不毁掉主线。

## Outcome · 结果

- Mainline Save remains restorable
- Exploration happens on a fork/branch of work (Space and/or Chat lineage)
- Decision recorded; optional merge-back discipline

## Steps · 步骤

### EN
1. On mainline: create a clear Save (`v1-working-demo`).
2. Choose exploration shape:
   - **Chat fork** — same Space files, alternate conversation path
   - **Space-level fork / new Space from Save** — stronger isolation when files will diverge hard
3. Name the exploration explicitly (`exp/auth-rewrite`).
4. Let the Agent go bold **only after** the fork exists.
5. Compare via diffs / preview / notes; write a short decision memo in files.
6. If promoting results: port changes carefully to mainline (patch/PR-like discipline), then Save mainline again.
7. If discarding: keep the experimental Save/Space for archaeology or archive/disable.

### 中文
1. 主线先打清晰存档（`v1-working-demo`）。
2. 选择探索形态：
   - **Chat Fork** — 同一文件树，对话分叉
   - **从存档开新 Space / 强隔离** — 文件会大幅分叉时
3. 探索命名清楚（`exp/auth-rewrite`）。
4. **先有分叉，再让 Agent 放开改**。
5. 用 diff/预览/笔记比较；把决策写成文件。
6. 若晋升主线：谨慎合入，主线再存档。
7. 若放弃：保留考古价值或归档/停用。

## Done when · 完成标准

- [ ] Mainline green Save still intact
- [ ] Exploration path identifiable
- [ ] Decision memo exists (even if “abandon”)

## Avoid · 别这样做

- Bold agent cleanup on the only good timeline
- Fork without naming / ownership
- “Merge” by overwriting without diff review
