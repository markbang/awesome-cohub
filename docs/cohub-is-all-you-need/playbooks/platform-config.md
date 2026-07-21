---
id: cohub.bp.platform-config
title: Operate the platform config Space
title_zh: 运营 platform config Space
type: playbook
audience: [builder, agent]
features: [platform-config, skills, prompts, models]
difficulty: advanced
related: [cohub.concept.platform-config, cohub.concept.user-config-space, cohub.bp.user-config-and-rules, cohub.bp.skill-slash-discovery]
sources:
  - PLATFORM_SPACE_ID / PLATFORM_CONFIG_ROOT
  - apps/worker/src/tasks/save-checkpoint-task.ts
  - apps/worker/src/skills-cache.ts
---

# Operate the platform config Space · 运营 platform config Space

## When · 何时用

EN: You run a Cohub deployment (or internal platform Space) and need **environment-wide** default skills, prompts, models, or agent rules.
中文：你在运营 Cohub 部署/内部平台 Space，需要**环境级**默认 skills、prompts、models 或 agent 规则。

## Outcome · 结果

- The Space id equals `PLATFORM_SPACE_ID`
- After Save, files exist under platform config root and sandboxes see `/configs/platform/.agents`
- Platform skills show up in `/skill:` / `GET /api/skills` with scope `platform`
- Redis skills cache for platform is refreshed on publish

## Steps · 步骤

### EN
1. Confirm env: `PLATFORM_SPACE_ID`, `PLATFORM_CONFIG_ROOT` (default often `/configs`).
2. Open that Space only for **platform defaults** — not customer project work.
3. Layout:
   ```text
   AGENTS.md
   CLAUDE.md
   .agents/skills/<name>/SKILL.md
   .agents/prompts/…
   .cohub/models.json
   .cohub/… (generations, explore, etc.)
   ```
4. **Save** on that Space → `publishPlatformConfig` + cache publishers (models/prompts/generations/skills).
5. Smoke in a **normal** project sandbox:
   ```bash
   ls /configs/platform/.agents/skills
   # Chat: /skill:<platform-skill-name>
   ```
6. Change management: treat like production config — review diffs, Save notes, avoid drive-by experiments.

### 中文
1. 确认 `PLATFORM_SPACE_ID` / `PLATFORM_CONFIG_ROOT`。
2. 该 Space 只放**平台默认**，不做业务项目。
3. 目录结构同上。
4. **存档**触发平台发布与缓存刷新。
5. 在普通项目沙箱检查 `/configs/platform/.agents` 与 `/skill:`。
6. 按生产配置管理：看 diff、写 Save 备注。

## Done when · 完成标准

- [ ] Save on platform Space publishes without warnings (or warnings understood)
- [ ] New sandbox sees platform skills/rules
- [ ] Project workspace can still override same-named skills

## Avoid · 别这样做

- Putting one customer’s kit into platform config
- Confusing platform Space with user `name=config` Space
- Editing `/configs/platform` inside a sandbox (read-only projection)
