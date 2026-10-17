---
id: cohub.concept.home-space
title: Home Space
type: concept
related:
  - cohub.concept.user-config-space
  - cohub.bp.home-and-sessions-inbox
sources:
  - https://cohub.live/changelog (v2.66)
---

# Home Space

The default personal Space many accounts land in (`slug=home` when bootstrapped).

- Still a full Space (files, Chats, Saves, Apps)
- May be created empty or forked from a platform bootstrap checkpoint
- Best as a hub/staging area - spin up named Spaces for real initiatives
- CLI default target: when no `-s` or `COHUB_SPACE_ID` is given, commands resolve the account's Home Space via `GET /api/spaces/default`

## Home as personal config (v2.66)

Saving the Home Space now publishes personal configuration through the same Save pipeline used by config Spaces:

| Published from Home | Effect |
|---------------------|--------|
| `AGENTS.md` / `CLAUDE.md` | User Rules (`source: "home-space"`) |
| `.agents/skills/` | Personal skills for the owner |
| `.agents/prompts/` | Personal slash templates |
| `.cohub/models.json` | Owner model overrides |
| `.cohub/theme.css` | Personal theme applied across the app |

An existing `name === "config"` Space keeps working as an ordinary Space: there is no automatic migration and no fallback between the two.

## See also

- Playbook: [home-and-sessions-inbox](../playbooks/home-and-sessions-inbox.md)
- [User config Space](./user-config-space.md) - the older dedicated config Space

---

[中文](../zh/concepts/home-space.md)
