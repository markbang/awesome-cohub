---
id: cohub.bp.agent-with-skills
title: Equip an agent and do real work
title_zh: 给 Agent 装 skill 并真实干活
type: playbook
audience: [builder, agent]
features: [chat, skill, mod, sandbox, files]
difficulty: starter
related: [cohub.concept.skill, cohub.concept.mod, cohub.bp.scratch-to-checkpoint]
sources:
  - https://cohub.run/docs/workspace/chats
  - https://github.com/talesofai/cohub/blob/main/docs/product/en/workspace/chats.md
---

# Equip an agent and do real work · 给 Agent 装 skill 并真实干活

## When · 何时用

EN: The Agent needs reusable capabilities (fetch, proxy, publish kit), not a longer system essay.
中文：Agent 需要可复用能力（采集、代理、发布脚手架），而不是更长的系统提示。

## Outcome · 结果

- Required skills installed **inside** the Space (or available via Mod)
- Agent can run a smoke command and write files
- You know how to invoke `/skill:name`

## Steps · 步骤

### EN
1. Decide the mission skill set (only what this Chat needs).
2. Install into the project/agent skills path used by this Space:
   ```bash
   npx skills add https://github.com/markbang/wgetx-skill \
     --skill wgetx --agent codex --yes --copy
   ```
3. Confirm assets landed under the skill directory (scripts/template must ship **inside** the skill).
4. In Chat composer, use `/skill:wgetx` (or tell the Agent to follow that SKILL.md).
5. Smoke test with low limits; then scale.

### 中文
1. 只装本任务需要的 skill。
2. 装到本 Space 使用的 skills 路径：
   ```bash
   npx skills add https://github.com/markbang/wgetx-skill \
     --skill wgetx --agent codex --yes --copy
   ```
3. 确认资源在 skill 目录内（scripts/template 必须打在 skill 里才能被 `npx skills` 拷走）。
4. Composer 用 `/skill:name`，或明确要求 Agent 遵循对应 `SKILL.md`。
5. 先小流量冒烟，再放大。

## Ecosystem starters · 生态起点

| Need | Skill repo |
|------|------------|
| WARP egress | `markbang/warp-proxy-skill` |
| Social fetch | `markbang/wgetx-skill` |
| Work product kit | `markbang/cohub-work-skill` |
| Platform ops | monorepo skills: `cohub`, `cohub-generate`, `cohub-works-share`, `public-share` |

## Done when · 完成标准

- [ ] Skill is discoverable (`/skill:` or path exists)
- [ ] Smoke command succeeded and wrote files
- [ ] No secrets committed

## Avoid · 别这样做

- Installing a pile of unused skills “for later”
- Putting scripts outside `skills/<name>/` (install will drop them)
- Trusting host paths that only exist on your laptop
