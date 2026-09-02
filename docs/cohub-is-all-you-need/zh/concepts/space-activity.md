---
id: cohub.concept.space-activity
title: Space 活动总览
type: concept
related:
  - cohub.concept.space
  - cohub.concept.work
  - cohub.bp.space-activity
sources:
  - https://cohub.live/changelog（v2.34）
  - https://github.com/talesofai/cohub/blob/main/apps/api/src/routes/spaces/activity.route.ts
  - https://github.com/talesofai/cohub/blob/main/packages/sdk/src/apis/spaces.ts
---

# Space 活动总览

**Space Activity** 为一个 Space 和一个时间窗口汇总用量、贡献者、模型排名与 App 浏览量，可在 Web、CLI 和 SDK 中使用。

## 入口

```text
GET /api/spaces/:id/activity?days=N
cohub spaces activity [days]
client.space(spaceId).activity.get(days)
```

默认窗口为 30 天，有效范围是 1 到 365 天。响应包含按小时的 LLM 用量、生成用量、汇总、贡献者列表、LLM 与生成模型排名，以及浏览量最高的 App。

## 隐私边界

- 读取 Space 活动需要 `space.view`。
- 拥有 Space 管理权限的 host/builder 可以看到费用字段。
- 其他观众收到相同响应结构，但费用字段会归零，仪表盘可以一致渲染，同时不会暴露支出或套餐折扣。
- 贡献者与 App 排名有数量上限，是汇总而不是所有事件导出。

Web 界面使用 IndexedDB 缓存活动响应，并展示热力图、汇总条、贡献者列表与排名。个人账户活动仍是独立的账户级界面。

## 适用场景

- 比较一个项目时间窗口内的 LLM 与生成用量。
- 找到贡献者以及获得浏览的 App。
- 修改 Space 流程前确认某个模型或 App 是否活跃。

不要把仪表盘当作 Billing 账本；单笔费用应以 Billing 与任务记录为准。

---

[English](../../concepts/space-activity.md)
