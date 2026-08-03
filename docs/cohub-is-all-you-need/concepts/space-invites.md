---
id: cohub.concept.space-invites
title: Space invitations & join links
type: concept
related:
  - cohub.concept.space-roles
  - cohub.bp.space-members-access
  - cohub.concept.public-identity-slugs
sources:
  - https://cohub.run/changelog (v2.7 friendly invitations)
---

# Space invitations & join links

**Friendly space invitations** (v2.7) let members join a Space through a shareable invite link instead of manual member management.

## How it works

- Invite links resolve as `/username/space-slug/join/<token>` with a shared invite page.
- Tokens are issued and consumed through the SDK and CLI:

```bash
cohub spaces invites create <spaceId>   # mint an invite token
cohub spaces invites ls <spaceId>       # list outstanding invites
cohub spaces invites revoke <spaceId> <token>  # revoke one
```

- Redis Lua-backed **atomic usage reservation** prevents double-spend of a limited-use invite.
- Per-space **invite caps** bound how many invites exist; revocation takes effect immediately.

## Notes

- Joining via invite lands the user in the Space with the appropriate member role (see [space-roles](./space-roles.md)).
- Pair invites with [space-members-access](../playbooks/space-members-access.md) for role hygiene.

---

[中文](../zh/concepts/space-invites.md)
