---
id: cohub.bp.agent-with-skills
title: Equip an agent and do real work
type: playbook
audience: [builder, agent]
features: [chat, skill, mod, sandbox, files]
difficulty: starter
related: [cohub.concept.skill, cohub.concept.mod, cohub.bp.scratch-to-checkpoint]
sources:
  - https://cohub.run/docs/workspace/chats
  - https://github.com/talesofai/cohub/blob/main/docs/product/en/workspace/chats.md
---

# Equip an agent and do real work

## When

The Agent needs reusable capabilities (fetch, proxy, publish kit), not a longer system essay.

## Outcome

- Required skills installed **inside** the Space (or available via Mod)
- Agent can run a smoke command and write files
- You know how to invoke `/skill:name`

## Steps

1. Decide the mission skill set (only what this Chat needs).
2. Install into the project/agent skills path used by this Space:
   ```bash
   npx skills add https://github.com/markbang/wgetx-skill \
     --skill wgetx --agent codex --yes --copy
   ```
3. Confirm assets landed under the skill directory (scripts/template must ship **inside** the skill).
4. In Chat composer, use `/skill:wgetx` (or tell the Agent to follow that SKILL.md).
5. Smoke test with low limits; then scale.

## Ecosystem starters

| Need | Skill repo |
|------|------------|
| WARP egress | `markbang/warp-proxy-skill` |
| Social fetch | `markbang/wgetx-skill` |
| Work product kit | `markbang/cohub-work-skill` |
| Platform ops | monorepo skills: `cohub`, `cohub-generate`, `cohub-works-share`, `public-share` |

## Done when

- [ ] Skill is discoverable (`/skill:` or path exists)
- [ ] Smoke command succeeded and wrote files
- [ ] No secrets committed

## Avoid

- Installing a pile of unused skills “for later”
- Putting scripts outside `skills/<name>/` (install will drop them)
- Trusting host paths that only exist on your laptop

---

[中文](../zh/playbooks/agent-with-skills.md)
