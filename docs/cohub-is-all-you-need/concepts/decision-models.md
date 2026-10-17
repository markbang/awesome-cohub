---
id: cohub.concept.decision-models
title: Decision models
type: concept
related:
  - cohub.concept.thinking-level-and-models-status
  - cohub.bp.dot-cohub-layers
sources:
  - https://cohub.live/changelog (v2.66)
  - https://github.com/talesofai/cohub/blob/main/docs/decisions.md
---

# Decision models

**Decision models** (v2.66) answer structured questions about text, JSON, or images with calibrated probabilities. They are a separate model class: never shown in LLM pickers, configured in `.cohub/decisions.json`.

## Question types

| Type | Shape | Answer |
|------|-------|--------|
| `noul` | `{ type: "noul", instructions }` | Yes/no |
| `choice` | `{ type: "choice", instructions, criteria }` | One key of at least two `criteria` (a `Record<key, description>`) |
| `score` | `{ type: "score", instructions, criteria }` | A 0..1 score against at least two ordered `criteria` (a `string[]`) |

A request can ask up to 200 questions at once.

## API and CLI

```http
POST /api/spaces/:id/decisions
```

Requires `session.prompt.readonly`. The SDK exposes `space.decision()`; the CLI exposes `cohub decision` and `cohub spaces decision`.

```ts
const result = await client.space(spaceId).decision({
  state: "The launch slipped two weeks because of the migration.",
  questions: {
    risk: { type: "noul", instructions: "Does this indicate schedule risk?" },
    severity: { type: "score", instructions: "How severe is the risk?", criteria: ["Can wait", "Needs attention"] },
  },
});
```

`state` may be a string, a JSON object, or an array mixing strings and `{ type: "image_url", image_url: { url } }` entries; URLs must be publicly reachable, while `data:` URLs (PNG/JPEG/WebP) pass inline. The CLI accepts inline JSON or a file and uploads local images as WebP.

## Configuration

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

Saving the platform Space or a user's Home Space publishes this file to Redis (`configs:decisions:v1:*`). A provider without `baseUrl` or `apiKey` is skipped; with no usable model the endpoint returns `503 decisions_unavailable`, so an environment without the file simply has the feature off.

User configuration may change only `name` and `hidden` for platform models; connection fields are rejected because billing follows the upstream-reported cost.

## Billing and archives

Decisions are billed at the cost the upstream reports, not catalog prices. The balance gate (`llm.decision`) runs before the call, a successful `usage.cost` is recorded once as `generation.decision`, and failed or aborted calls are not charged. Every call is archived under `spaces/<spaceId>/decisions/<yyyy>/<mm>/<dd>/<decisionId>.json` with each upstream attempt's status and body.

## Avoid

- Treating a decision model as a general chat model; it is not exposed to the LLM picker.
- Using a decision model for free-form generation.
- Relying on decisions when the environment has no configured provider — handle `503 decisions_unavailable`.

---

[中文](../zh/concepts/decision-models.md)
