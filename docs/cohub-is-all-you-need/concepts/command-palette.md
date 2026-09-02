---
id: cohub.concept.command-palette
title: Personal command palette and Recent
type: concept
related:
  - cohub.concept.space
  - cohub.concept.chat
  - cohub.bp.dot-cohub-layers
sources:
  - https://cohub.live/changelog (v2.31-v2.33)
  - https://github.com/talesofai/cohub/blob/main/apps/api/src/routes/palette-overview.route.ts
  - https://github.com/talesofai/cohub/tree/main/apps/web/src/lib/command-palette
---

# Personal command palette and Recent

The command palette is a cross-Space navigation surface for Spaces, Chats, turns, labels, and commands. Recent releases make its default view personal and cache-first rather than a generic global list.

## Ranking and tabs

- The overview endpoint (`GET /api/palette/overview`) groups recent sessions and ranks Spaces using personal activity, membership relation, and public relevance.
- Default relevance tiers are personal/owned first, Space-related next, and public-only last. A specific exact or prefix query can bypass tiers.
- **Recent** combines pinned state with personal activity from server participation, viewer-authored turns, and device-local visits. **All**, **Mine**, and **Pinned** remain available as explicit filters.
- Empty-query defaults render from IndexedDB and local caches immediately, then refresh stale server data without a visible re-sort or first-frame flicker.

## Prompt quick actions

A prompt template can opt into a button above the Chat composer with frontmatter:

```yaml
quick-action: true
button-label: Review
argument-hint: optional scope
order: 10
```

A no-argument action sends its slash template directly. A template with an argument hint prefills the composer so the user can complete it before sending. The action is still a prompt template under `.agents/prompts/`, with the same layer precedence as other templates.

## Space landing

The canonical new-Chat landing is the Space root (`/spaces/:id`). Starting a Chat no longer needs a redirect through `/sessions/new`, and preview windows stay mounted across the route transition.

## Privacy and resilience

The palette ranks resources using the current viewer relation; it is not a public popularity feed. Local Recent persistence is opportunistic and scoped to the cache identity. A failed overview request preserves the last-known-good snapshot or local derivation rather than blocking navigation.

---

[中文](../zh/concepts/command-palette.md)
