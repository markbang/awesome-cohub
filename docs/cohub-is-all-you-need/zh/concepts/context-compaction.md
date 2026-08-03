---
id: cohub.concept.context-compaction
title: 可恢复的上下文压缩
type: concept
---

# 可恢复的上下文压缩

**上下文压缩**通过总结早期轮次，让长会话在上下文窗口填满时继续工作。

## v2.5 行为（可恢复）

- 压缩可在 **任意 LLM 回合边界** 触发，不再局限于回合之间。
- 记录结构化元数据：作用域、所属 turn、触发原因、token 增量、用量与耗时。
- 失败时，会话**回滚到压缩前存档**——坏总结不再污染正在进行的回合。
- Web 端显示内联提示：可展开的摘要、token 节省量与成本，经 SDK 实时推送。

## 对 Agent 的含义

- 失败重试不再虚增 provider 调用计数（统计只记成功的那次）。
- turn 序号反映压缩在回合内的位置，而非全局消息序号。
- 长循环可放心压缩可逆；配合 [scheduled-loop](../playbooks/scheduled-loop.md) 的盘态模式保存进度。

---

[English](../../concepts/context-compaction.md)
