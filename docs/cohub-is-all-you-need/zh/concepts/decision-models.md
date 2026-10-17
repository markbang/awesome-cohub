---
id: cohub.concept.decision-models
title: Decision 模型
type: concept
related:
  - cohub.concept.thinking-level-and-models-status
  - cohub.bp.dot-cohub-layers
sources:
  - https://cohub.live/changelog（v2.66）
  - https://github.com/talesofai/cohub/blob/main/docs/decisions.md
---

# Decision 模型

**Decision 模型**（v2.66）针对文本、JSON 或图片回答结构化问题，并给出校准概率。它是独立的模型类别：不会出现在 LLM 选择器中，配置在 `.cohub/decisions.json`。

## 问题类型

| 类型 | 结构 | 回答 |
|------|------|------|
| `noul` | `{ type: "noul", instructions }` | 是/否 |
| `choice` | `{ type: "choice", instructions, criteria }` | 至少两个 `criteria`（`Record<key, description>`）中的一个 key |
| `score` | `{ type: "score", instructions, criteria }` | 针对至少两个有序 `criteria`（`string[]`）打 0..1 分 |

单次请求最多 200 个问题。

## API 与 CLI

```http
POST /api/spaces/:id/decisions
```

需要 `session.prompt.readonly`。SDK 暴露 `space.decision()`；CLI 提供 `cohub decision` 与 `cohub spaces decision`。

```ts
const result = await client.space(spaceId).decision({
  state: "迁移导致发布推迟了两周。",
  questions: {
    risk: { type: "noul", instructions: "这是否表示进度风险？" },
    severity: { type: "score", instructions: "风险有多严重？", criteria: ["可以等", "需要关注"] },
  },
});
```

`state` 可以是字符串、JSON 对象，或混合字符串与 `{ type: "image_url", image_url: { url } }` 的数组；URL 必须公开可达，`data:` URL（PNG/JPEG/WebP）可直接内联。CLI 接受内联 JSON 或文件，并把本地图片上传为 WebP。

## 配置

```json
{
  "providers": {
    "cohub": {
      "baseUrl": "https://router.neta.art/openrouter",
      "apiKey": "PLATFORM_ENV_NAME",
      "models": [
        { "id": "openai/gpt-6-luna-decisions", "name": "Luna", "input": ["text", "image"], "maxImages": 128 },
        { "id": "jev-latest", "name": "Jev" }
      ]
    }
  }
}
```

保存 platform Space 或用户 Home Space 会把该文件发布到 Redis（`configs:decisions:v1:*`）。缺少 `baseUrl` 或 `apiKey` 的 provider 会被跳过；没有可用模型时端点返回 `503 decisions_unavailable`，因此未配置该文件的环境只是关闭此功能。

用户配置只能修改平台模型的 `name` 与 `hidden`；连接字段会被拒绝，因为计费以上游上报成本为准。

## 计费与档案

Decision 按上游上报成本计费，而不是目录价格。调用前执行余额门禁（`llm.decision`），成功后的 `usage.cost` 以 `generation.decision` 记录一次，失败或中止不收费。每次调用归档到 `spaces/<spaceId>/decisions/<yyyy>/<mm>/<dd>/<decisionId>.json`，包含每次上游尝试的状态与响应。

## 避免

- 把 decision 模型当作通用聊天模型；它不会出现在 LLM 选择器中。
- 用 decision 模型做开放式生成。
- 环境未配置 provider 时仍依赖 decision——需要处理 `503 decisions_unavailable`。

---

[English](../../concepts/decision-models.md)
