---
id: cohub.concept.space-activity
title: Space activity overview
type: concept
related:
  - cohub.concept.space
  - cohub.concept.work
  - cohub.bp.space-activity
sources:
  - https://cohub.live/changelog (v2.34)
  - https://github.com/talesofai/cohub/blob/main/apps/api/src/routes/spaces/activity.route.ts
  - https://github.com/talesofai/cohub/blob/main/packages/sdk/src/apis/spaces.ts
---

# Space activity overview

The **Space Activity** surface combines usage, contributors, model rankings, and App views for one Space and one time window. It is available in the Web dashboard, CLI, and SDK.

## Surfaces

```text
GET /api/spaces/:id/activity?days=N
cohub spaces activity [days]
client.space(spaceId).activity.get(days)
```

The default window is 30 days; valid windows are 1 through 365 days. The response includes hourly LLM usage, generation usage, a summary, contributor rows, top LLM and generation models, and the most-viewed Apps.

## Privacy boundary

- `space.view` is required to load the Space activity response.
- Hosts and builders with Space-management access see cost figures.
- Other viewers receive the same response shape with cost fields zeroed, so a dashboard can render consistently without exposing spend or plan discounts.
- Contributor and App rankings are bounded; they are summaries, not an export of every event.

The Web view uses an IndexedDB cache for the activity response and renders a heatmap, summary strip, contributor list, and rankings. Personal account activity remains a separate account-level surface.

## Use it for

- Comparing LLM and generation usage across a project window.
- Finding contributors and the Apps that receive views.
- Checking whether a model or App is active before changing a Space workflow.

Do not treat the dashboard as a billing ledger. Use authoritative Billing and task records for individual charges.

---

[中文](../zh/concepts/space-activity.md)
