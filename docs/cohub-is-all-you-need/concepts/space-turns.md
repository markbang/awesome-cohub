---
id: cohub.concept.space-turns
title: Space turn browsing
type: concept
related:
  - cohub.concept.chat
  - cohub.bp.channel-ops
sources:
  - https://cohub.live/changelog (v2.6, v2.39)
---

# Space turn browsing

**Space turn browsing** (v2.6) exposes a permission-aware list of turns across all visible Sessions in a Space. v2.39 adds full per-session turn lists and persisted intermediate archives.

## API / CLI

```bash
# Turns across all visible sessions (author, time filters + cursor pagination)
cohub spaces turns ls <spaceId> --author self --limit 50 --json

# Full turn list for one session, sequence-cursor paginated
cohub spaces turns ls <spaceId> --session <sessionId> --limit 20 --direction older --json
cohub spaces turns ls <spaceId> --session <sessionId> --cursor 42 --direction newer

# Read a turn's persisted intermediate messages from its CDN archive
cohub spaces turns intermediate <sessionId> <turnId> --json
```

- REST: `GET /api/spaces/:id/turns`
- SDK: `SpaceTurnsApi`, plus `session.turns.listPaginated()` and `session.turns.intermediate.get()` / `getToolCalls()` (resolves message object keys and signed URLs automatically and exports the archive types)
- The Web session view runs on the same SDK client. Sessions also carry live `activeTurn` state (id, queued/running/abort-requested, provider, model) so sidebars and generation indicators stay current across reloads and background refreshes.

## Web replay

- The workspace replays recent turns from other members through the **danmaku** layer.
- Uses local cursors, cross-tab lease coordination, deduplication, and live-message priority - catch-up never crowds out real-time activity.

## Use cases

- Operator dashboards that summarize recent agent activity per Space.
- Cross-session audit of what happened in a Space over time.
- Debugging a long turn through its persisted intermediate messages instead of re-running it.

---

[中文](../zh/concepts/space-turns.md)
