---
id: cohub.bp.space-activity
title: Read Space activity without leaking cost data
type: playbook
audience: [builder, operator]
features: [space, analytics, usage, app]
difficulty: intermediate
related:
  - cohub.concept.space-activity
  - cohub.concept.space
  - cohub.bp.minimal-scopes
sources:
  - https://cohub.live/changelog (v2.34)
  - https://github.com/talesofai/cohub/blob/main/apps/api/src/routes/spaces/activity.route.ts
  - https://github.com/talesofai/cohub/blob/main/packages/cli/src/commands/space-activity.ts
---

# Read Space activity without leaking cost data

## When

You need a bounded view of Space usage, contributors, model mix, and App views for a reporting window.

## Steps

1. Pick a window from 1 to 365 days. The default is 30:
   ```bash
   cohub -s <spaceId> spaces activity --json
   cohub -s <spaceId> spaces activity 90 --json
   ```
2. For an SDK client, use the Space-scoped API:
   ```ts
   const activity = await client.space(spaceId).activity.get(30);
   ```
3. Render the summary and hourly series first, then contributors and rankings. The response includes both token and generation usage, plus top Apps by view count.
4. Gate cost display on the viewer's management role. Hosts and builders can see costs; other viewers receive zeroed cost fields with the same response shape.
5. Use the App ranking as a directional signal. Follow a specific App's version and view details through `client.apps.getStats()` when you need release-level attribution.

## API contract

```http
GET /api/spaces/:id/activity?days=30
```

Invalid or unbounded day values should be rejected at the boundary. Keep the returned contributor and ranking lists as summaries; do not infer a complete audit trail from them.

## Done when

- [ ] The time range is explicit and within 1-365 days
- [ ] Cost fields are hidden for viewers without Space-management access
- [ ] LLM and generation usage are labeled separately
- [ ] App views are interpreted with the App's published versions

## Avoid

- Showing cost totals to every Space viewer
- Treating a cached dashboard as the Billing ledger
- Requesting account-wide scopes for a single-Space report
- Exporting contributor rows without an access policy

---

[中文](../zh/playbooks/space-activity.md)
