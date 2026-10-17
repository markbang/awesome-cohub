---
id: cohub.ap.home-as-config
title: Assuming Home configures other Spaces
type: anti-pattern
related: [cohub.bp.user-config-and-rules, cohub.concept.user-config-space, cohub.concept.home-space]
---

# Assuming Home configures other Spaces

## History

Before v2.66, a Home Save only created a Checkpoint: personal skills and rules stayed in Home's `/workspace` and never mounted as `/configs/user`. The original version of this card said Home could not be config.

Since v2.66 the Home Space **does** publish personal config on Save (`AGENTS.md`, `.agents/skills`, `.agents/prompts`, `.cohub/models.json`, `.cohub/theme.css`).

## Why it still hurts

1. A Home Save publishes more than people expect, so leftovers in Home silently become global defaults.
2. A Space named `config` stays an ordinary Space: it does **not** fall back to Home, and Home does not read it.
3. Editing `/configs/user` directly never works - it is a published snapshot.

## Do this instead

- Pick **one** personal-config source: Home Space or `name === "config"`; keep the other free of rules and skills.
- Put `AGENTS.md` + `.agents/skills` there and **Save**.
- Verify from another Space: `ls /configs/user/.agents/skills`.

## Smell test

`/configs/user/.agents/skills` is empty, or contains skills you thought you deleted - you are configuring one Space and expecting the other.

---

[中文](../zh/anti-patterns/home-as-config.md)
