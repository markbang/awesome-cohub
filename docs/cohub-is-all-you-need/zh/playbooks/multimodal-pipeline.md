---
id: cohub.bp.multimodal-pipeline
title: 多模态生成并落入 Space 资产
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

# 多模态生成并落入 Space 资产

## 何时用

需要把图/视频/音乐等产物变成项目文件，而不只是聊天里的装饰。

## 结果

- Generation task completes (Task run visible if async)
- Outputs saved under a clear Space path (`data/gen/…`, `assets/…`)
- Good results referenced from README/wiki; milestone Saved

## 步骤

1. 先约定资产契约：路径、命名、尺寸/时长、安全与授权备注。
2. UI 或 CLI 生成（有 `cohub generate` / `cohub-generate` 就用）。
3. 结果立刻**落盘到工作区**；聊天里的临时链接不当素材库。
4. 在文件旁记录来源（模型、提示摘要、task id）。
5. 预览后小步迭代。
6. 演示级结果再存档；关注积分/折扣与失败计费语义。

## 完成标准

- [ ] Files exist on stable paths
- [ ] Prompt/model provenance recoverable
- [ ] Task failure modes understood (retry vs content refusal)

## 别这样做

- Leaving the only copy inside Chat attachments history
- Regenerating from scratch instead of editing constraints
- Committing secrets or customer PII into prompts written to git-tracked files without need

---

[English](../../playbooks/multimodal-pipeline.md)
