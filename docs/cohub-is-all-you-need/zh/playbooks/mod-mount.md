---
id: cohub.bp.mod-mount
title: 挂载 Mod 共享工具与技能
type: playbook
audience: [builder, agent]
features: [mod, skill, space, sandbox]
difficulty: intermediate
related: [cohub.concept.skill, cohub.bp.agent-with-skills, cohub.bp.space-knowledge-base]
sources:
  - https://cohub.run/docs/workspace/spaces
  - https://cohub.run/docs/learn/core-concepts
  - https://cohub.run/changelog#v1.99
---

# 挂载 Mod 共享工具与技能

## 何时用

多个 Space 要共享同一套 skill / prompt / 模板 / 基础工具，且不想靠手工复制漂移。

## 分工

| | **Mod** | **Skill** |
|--|---------|-----------|
| What | Another Space mounted read-only | A reusable procedure package (`SKILL.md` + assets) |
| Path | typically `/mods/<slug>/…` | `.agents/skills/<name>/` or via Mod |
| Best for | Shared bases, kits, org tooling | Mission playbooks, ops runbooks |
| Mutation | Source Space owns writes | Edit in source / reinstall package |

**Rule:** Mod is distribution & mount; Skill is the unit the Agent follows.

## 结果

- Mod appears under `/mods/<slug>` (or your mount slug)
- Agent can read mod files; skills/prompts from the mod show up when enabled
- Team knows: change the **source Space**, consumers remount/restart as needed

## 步骤

1. 提供方 Space 当产品养：稳定 slug、README、`AGENTS.md`、技能树。
2. 消费方 **设置 → Mods** 挂载，slug 可读。
3. 变更 Mod 可能重启沙箱；重启中途别瞎排查。
4. 先 `ls /mods` 再引用真实路径。
5. 让 Agent 读 mod 内 `SKILL.md`，或用 `/skill:` 发现。
6. 公开可安装包与 Space Mod 二选一作权威源，避免双份维护。
7. 必须分叉再拷贝；否则改上游。

## 权限

Filtered file view can be enough for some mod setups; don’t assume every mount needs full unrestricted file power. Follow current product permission labels.

## 完成标准

- [ ] `/mods/<slug>` readable in consumer Sandbox
- [ ] One smoke Agent task used mod content successfully
- [ ] Owner of the mod Space is explicit

## 别这样做

- Editing files under `/mods` in the consumer (read-only mental model)
- Mounting everything “just in case”
- Silent forks of mod trees with no upstream

---

[English](../../playbooks/mod-mount.md)
