---
id: cohub.concept.direct-generation
title: 直接生成回合
type: concept
related:
  - cohub.concept.task-browser
  - cohub.concept.context-compaction
  - cohub.bp.multimodal-pipeline
sources:
  - https://cohub.live/changelog（v2.23）
  - https://github.com/talesofai/cohub/blob/main/docs/generations.md
---

# 直接生成回合

**Direct Generation**（v2.23）是多模态工作的 Create 路径。它把生成作为 Chat 时间线中的一等回合，而不是藏在普通文本 Prompt 或无关的后台任务之后。

## 用户模型

- Composer 提供 **Agent / Create** 模式切换。
- Create 模式提供可搜索的生成模型选择器，并保存用户的模型偏好。
- 模式与模型原子提交，因此导航或重试后恢复的草稿仍保持原来的 Create 设置。
- 生成状态从排队进入终态，并同时显示在时间线与 Task Browser 中。

## 运行时模型

Direct Generation 请求携带 `mode: "create"` 与 generation payload。服务端以 `execution_kind = "direct_generation"` 记录，通过 `clientMessageId` 对重试去重，并发出常规 realtime turn/session 事件。`generation.request` 与 `generation.result` 会投影到 Agent session 文件中，便于持久检查。

未完成的生成会成为时间线屏障：后续 Agent 回合会等待 Create 操作完成，文本与媒体工作不会无声地乱序。Direct Generation 回合不参与普通 steering/abort 协调，并以生成终态更新结束。

## 费用与压缩

消息气泡区分已计费、待计费与未计费状态，并显示服务商费用细节与重试状态，用户无需从缺失的产物猜测计费结果。图像密集上下文使用固定视觉 tile 估算 token；除非显式强制压缩，压缩验证会跳过减少不足 20% 的改写。

## 选择合适路径

- 用户把媒体产物作为主要结果时，使用 **Direct Generation**。
- 生成只是更大的文件编辑流程中的一步时，使用普通 Agent 回合。
- 任一路径创建 Task Run 后，使用 **Task Browser** 管理历史、轮询与详情。

---

[English](../../concepts/direct-generation.md)
