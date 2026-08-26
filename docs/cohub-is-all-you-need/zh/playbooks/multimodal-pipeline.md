---
id: cohub.bp.multimodal-pipeline
title: 生成、查看并落盘多模态资产
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
  - https://cohub.live/changelog（v2.8、v2.19-v2.23）
---

# 生成、查看并落盘多模态资产

## 何时使用

你需要把图片、视频、音乐或其他多模态产物变成持久的 Space 资产，而不只是 Chat 附件。

## 结果

- 创建生成任务，并能轮询或查看结果。
- 输出保存到清晰的 Space 路径（`data/gen/`、`assets/` 等）。
- 费用、模型与任务来源可追溯。

## 选择路径

- 媒体产物是 Chat 主要结果时，使用 **Direct Generation / Create 模式**。
- 生成只是更大文件流程中的一步时，使用普通 Agent 回合。
- 任一路径创建 Task Run 后，用 **Task Browser** 或 `client.tasks` 查看历史和详情。

## 步骤

1. 先定义资产契约：路径、命名、画幅/时长、安全与授权备注。
2. 从实时多模态模型目录选择模型，不要硬编码不可用的服务商：
   ```bash
   cohub models ls --model-type multimodal
   ```
3. 通过 Create 模式、UI 或 CLI 生成：
   ```bash
   cohub generate "product hero, dark studio, orange accent" \
     --model <model> --json
   ```
4. 在 App 中把创建和读取视为不同权限：`generation.create` 用于创建任务，轮询或查看需要 `taskrun.view`。
5. 产物可用后立即落盘到工作区。Chat 或服务商 URL 不是项目素材库。
6. 在资产旁记录模型、提示摘要、task id 与服务商费用。生成界面区分已计费、待计费和未计费状态；临时计费写入失败会在任务成功后重试。
7. 预览并小步迭代，演示级结果再 Save。

## 图像上下文与降级

文本模型收到图片时，Cohub 可以使用配置好的 `imageToText` 辅助任务模型。描述会按回合持久化并复用，重试不会重复为降级描述计费。图像密集的压缩使用视觉 tile 估算，而不是原始 base64 长度。

## 完成标准

- [ ] 文件存在于稳定的 Space 路径
- [ ] Prompt/模型/任务来源可恢复
- [ ] Task Browser 能显示最终结果
- [ ] 已理解计费与重试状态

## 避免

- 只把副本留在 Chat 附件历史中
- 以为 `generation.create` 自动包含结果轮询权限
- 不改约束就从头重复生成
- 无必要地把密钥或客户 PII 写入提示

---

[English](../../playbooks/multimodal-pipeline.md)
