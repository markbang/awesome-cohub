---
id: cohub.bp.multimodal-pipeline
title: Multimodal generation into Space assets
title_zh: 多模态生成并落入 Space 资产
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

# Multimodal generation into Space assets · 多模态生成并落入 Space 资产

## When · 何时用

EN: You need image / video / music (or related multimodal outputs) as project files, not only as chat decorations.
中文：需要把图/视频/音乐等产物变成项目文件，而不只是聊天里的装饰。

## Outcome · 结果

- Generation task completes (Task run visible if async)
- Outputs saved under a clear Space path (`data/gen/…`, `assets/…`)
- Good results referenced from README/wiki; milestone Saved

## Steps · 步骤

### EN
1. State the asset contract: path, filename pattern, aspect/duration constraints, license/safety notes.
2. Generate via UI composer/tools **or** CLI skill/platform flow (`cohub generate` / `cohub-generate` skill when available):
   ```bash
   cohub generate "product hero, dark studio, orange accent" --model <model> --json
   ```
3. As soon as URLs/files return, **materialize into the workspace** (download/write). Chat CDN links are not a library.
4. Record provenance next to the file (model, prompt short hash, task id) in a small markdown sidecar or table.
5. Preview; iterate with tight diffs (“same composition, less glow”).
6. Save when the set is demo-ready. Watch credit/discount behavior on paid models.

### 中文
1. 先约定资产契约：路径、命名、尺寸/时长、安全与授权备注。
2. UI 或 CLI 生成（有 `cohub generate` / `cohub-generate` 就用）。
3. 结果立刻**落盘到工作区**；聊天里的临时链接不当素材库。
4. 在文件旁记录来源（模型、提示摘要、task id）。
5. 预览后小步迭代。
6. 演示级结果再存档；关注积分/折扣与失败计费语义。

## Done when · 完成标准

- [ ] Files exist on stable paths
- [ ] Prompt/model provenance recoverable
- [ ] Task failure modes understood (retry vs content refusal)

## Avoid · 别这样做

- Leaving the only copy inside Chat attachments history
- Regenerating from scratch instead of editing constraints
- Committing secrets or customer PII into prompts written to git-tracked files without need
