---
id: cohub.bp.space-activity
title: 在不泄露费用数据的前提下查看 Space 活动
type: playbook
audience: [builder, operator]
features: [space, analytics, usage, app]
difficulty: intermediate
related:
  - cohub.concept.space-activity
  - cohub.concept.space
  - cohub.bp.minimal-scopes
sources:
  - https://cohub.live/changelog（v2.34）
  - https://github.com/talesofai/cohub/blob/main/apps/api/src/routes/spaces/activity.route.ts
  - https://github.com/talesofai/cohub/blob/main/packages/cli/src/commands/space-activity.ts
---

# 在不泄露费用数据的前提下查看 Space 活动

## 何时使用

你需要在指定时间窗口内查看 Space 用量、贡献者、模型构成与 App 浏览量。

## 步骤

1. 选择 1 到 365 天的窗口，默认 30 天：
   ```bash
   cohub -s <spaceId> spaces activity --json
   cohub -s <spaceId> spaces activity 90 --json
   ```
2. SDK 使用 Space 作用域 API：
   ```ts
   const activity = await client.space(spaceId).activity.get(30);
   ```
3. 先呈现汇总和按小时序列，再呈现贡献者与排名。响应同时包含 token 与生成用量，以及按浏览量排名的 App。
4. 根据观众的管理角色控制费用显示。host/builder 可以看到费用；其他观众收到相同结构但费用归零的字段。
5. App 排名只作为方向信号。需要版本级归因时，再通过 `client.apps.getStats()` 查看具体 App 的统计。

## API 契约

```http
GET /api/spaces/:id/activity?days=30
```

无效或无界的 days 值应在入口处拒绝。贡献者和排名列表是汇总，不要从中推导完整审计轨迹。

## 完成标准

- [ ] 明确时间范围且在 1-365 天内
- [ ] 没有 Space 管理权限的观众看不到费用字段
- [ ] LLM 与生成用量分开标注
- [ ] App 浏览量结合其已发布版本理解

## 避免

- 向所有 Space 观众展示费用总额
- 把缓存仪表盘当作 Billing 账本
- 为单 Space 报表申请账户级权限
- 没有访问策略就导出贡献者数据

---

[English](../../playbooks/space-activity.md)
