---
id: cohub.concept.thinking-level-and-models-status
title: 单 Prompt 思考等级与模型实时状态
type: concept
---

# 单 Prompt 思考等级与模型实时状态

Cohub 支持针对单次 Prompt 动态调整模型思考深度 (`thinkingLevel`)，并提供模型实时可用性监控 (`/api/models/status`)。

## 单 Prompt 思考等级 (`thinkingLevel`)

可在 Web 输入框、API、SDK 或 CLI 中指定：

- **流程**：输入框选择器 → Turn 元数据 → Worker/Agent 运行时 → 模型服务商。
- **持久化**：随 Turn 元数据落盘，保证多端同步与会话恢复的一致性。

## 模型实时可用性

模型选择器展示实时状态点与心跳图表：

- **遥测数据**：结合实际请求成功率与 8 小时探测心跳。
- **状态等级**：`operational`（正常）、`degraded`（降级）、`outage`（故障）。

---

[English](../../concepts/thinking-level-and-models-status.md)
