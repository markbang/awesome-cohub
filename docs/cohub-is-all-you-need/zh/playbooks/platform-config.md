---
id: cohub.bp.platform-config
title: 运营 platform config Space
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

# 运营 platform config Space

## 何时用

你在运营 Cohub 部署/内部平台 Space，需要**环境级**默认 skills、prompts、models 或 agent 规则。

## 结果

- The Space id equals `PLATFORM_SPACE_ID`
- After Save, files exist under platform config root and sandboxes see `/configs/platform/.agents`
- Platform skills show up in `/skill:` / `GET /api/skills` with scope `platform`
- Redis skills cache for platform is refreshed on publish

## 步骤

1. 确认 `PLATFORM_SPACE_ID` / `PLATFORM_CONFIG_ROOT`。
2. 该 Space 只放**平台默认**，不做业务项目。
3. 目录结构同上。
4. **存档**触发平台发布与缓存刷新。
5. 在普通项目沙箱检查 `/configs/platform/.agents` 与 `/skill:`。
6. 按生产配置管理：看 diff、写 Save 备注。

## 完成标准

- [ ] Save on platform Space publishes without warnings (or warnings understood)
- [ ] New sandbox sees platform skills/rules
- [ ] Project workspace can still override same-named skills

## 别这样做

- Putting one customer’s kit into platform config
- Confusing platform Space with user `name=config` Space
- Editing `/configs/platform` inside a sandbox (read-only projection)


另见：[`.cohub` 分层与优先级](../concepts/dot-cohub-layers.md) · [实践卡](../playbooks/dot-cohub-layers.md)。

---

[English](../../playbooks/platform-config.md)
