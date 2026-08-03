---
id: cohub.concept.space-turns
title: Space turn browsing
type: concept
related:
  - cohub.concept.chat
  - cohub.bp.channel-ops
sources:
  - https://cohub.run/changelog (v2.6 turn browsing)
---

# Space turn browsing

**Space turn browsing** (v2.6) exposes a permission-aware list of turns across all visible Sessions in a Space.

## API / CLI

```bash
# List turns across all visible sessions (author, session, time filters + cursor pagination)
cohub spaces turns ls <spaceId>
cohub spaces turns ls <spaceId> --session <sessionId> --author <userId> --json
```

- REST: `GET /api/spaces/:id/turns`
- SDK: `SpaceTurnsApi`

## Web replay

- The workspace replays recent turns from other members through the **danmaku** layer.
- Uses local cursors, cross-tab lease coordination, deduplication, and live-message priority — catch-up never crowds out real-time activity.

## Use cases

- Operator dashboards that summarize recent agent activity per Space.
- Cross-session audit of what happened in a Space over time.

---

[中文](../zh/concepts/space-turns.md)
