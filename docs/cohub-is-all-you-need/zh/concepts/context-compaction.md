---
id: cohub.concept.context-compaction
title: 可恢复的上下文压缩
type: concept
related:
  - cohub.concept.chat
  - cohub.concept.direct-generation
  - cohub.bp.scheduled-loop
sources:
  - https://cohub.live/changelog（v2.5、v2.23）
---

# 可恢复的上下文压缩

**Context Compaction** 通过总结早期回合，让长会话在上下文窗口填满后继续工作。

## 可恢复行为

- 压缩可在**任意 LLM 回合边界**运行，不再局限于回合之间。
- 记录作用域、所属 turn、触发原因、token 增量、用量与耗时等结构化元数据。
- 失败时回滚到压缩前存档；坏摘要不会污染正在运行的回合。
- Web 端通过 SDK 实时显示可展开摘要、token 节省量与成本提示。

## 图像密集上下文（v2.23）

- 图像上下文使用固定视觉 tile token 成本估算，而不是原始 base64 长度。
- 除非调用者显式强制压缩，压缩效果校验要求至少减少 **20%**。
- 图像占主导且改写没有效果时会跳过，减少不必要的服务商调用。

## 对 Agent 的含义

- 摘要失败重试不会虚增 provider 调用计数，统计反映成功尝试。
- turn 序号反映压缩在回合内的位置，而不是全局消息序号。
- 长循环可以依赖可逆压缩，但仍应按 [scheduled-loop](../playbooks/scheduled-loop.md) 的模式把进度写入 Space 文件。

---

[English](../../concepts/context-compaction.md)
