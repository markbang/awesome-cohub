---
id: cohub.bp.skill-slash-discovery
title: Discover and invoke skills with /skill:
title_zh: 用 /skill: 发现并调用技能
type: playbook
audience: [builder, agent]
features: [skill, chat, mod]
difficulty: starter
related: [cohub.bp.agent-with-skills, cohub.bp.mod-mount, cohub.concept.skill]
sources:
  - https://cohub.run/docs/workspace/chats
  - https://cohub.run/changelog#v1.97
---

# Discover and invoke skills with /skill: · 用 /skill: 发现并调用技能

## When · 何时用

EN: You need the Agent to load a **named capability** with its instructions/assets, not a vague “try to scrape/publish”.
中文：要让 Agent 加载**具名能力**（含说明与资产），而不是含糊地说「去采集/发布一下」。

## Outcome · 结果

- Skills visible from composer `/` menu
- Invocation via `/skill:name` expands on send (platform discovery; Redis-backed catalog)
- Agent executes against skill files that were actually installed/mounted

## Where skills come from · 来源

| Source | Typical location / mechanism |
|--------|-------------------------------|
| Project / Space | workspace `.agents/skills/<name>/` |
| User config | user-level skills (host-dependent) |
| Platform | built-in Cohub skills |
| Mod | skills shipped by mounted Spaces |

`npx skills add … --copy` installs into agent/project skill dirs so composer/CLI can see them.

## Steps · 步骤

### EN
1. Install or mount only mission skills (see `agent-with-skills` + `mod-mount`).
2. In Chat composer type `/` → browse categories → pick a skill, or type `/skill:wgetx`.
3. Confirm assets exist (scripts/template **inside** the skill folder). Missing assets ⇒ bad package layout.
4. Give a tight mission after the skill token (“hot 5 only”, “publish dist with file.view only”).
5. For headless ops, CLI/SDK may list skills (`skills.list` / `cohub` skill workflows) — still keep files as source of truth.
6. If a skill doesn’t appear: remount mod / reinstall / restart sandbox / check name slug.

### 中文
1. 只装/挂本任务 skill。
2. Composer 输入 `/` 浏览，或直接 `/skill:name`。
3. 确认 skill 目录内有脚本/模板；缺资产多半是包装错（资源没打进 skill）。
4. skill 标记后再给硬约束任务。
5. 无头场景用 CLI/SDK 列表能力；仍以文件为准。
6. 看不见时：重装、重挂 mod、重启沙箱、核对 name。

## Authoring reminder · 编写提醒

Skill packages for `npx skills add` must look like:

```text
skills/<name>/
  SKILL.md
  scripts/… or template/…   # bundled assets
```

Root-level `scripts/` next to `skills/` will **not** install.

## Done when · 完成标准

- [ ] `/skill:name` resolves in composer (or explicit path fallback works)
- [ ] Smoke action succeeded using skill assets
- [ ] No mystery duplicate skill names

## Avoid · 别这样做

- Pasting entire SKILL.md into every prompt instead of invoking it
- Relying on skill names that never shipped to the Space
- Dumping 30 skills then wondering why the Agent flails
