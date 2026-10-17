---
id: cohub.concept.home-space
title: Home Space（主空间）
type: concept
related:
  - cohub.concept.user-config-space
  - cohub.bp.home-and-sessions-inbox
sources:
  - https://cohub.live/changelog（v2.66）
---

# Home Space（主空间）

许多账号默认落点的个人 Space（初始化时 `slug=home`）。

- 仍是完整 Space（文件、Chat、Save、App）
- 可以创建为空，或从平台 bootstrap checkpoint 分叉
- 适合作为枢纽/暂存区——真正的工作线另建具名 Space
- CLI 默认目标：未提供 `-s` 或 `COHUB_SPACE_ID` 时，命令通过 `GET /api/spaces/default` 解析账号的 Home Space

## Home 作为个人配置（v2.66）

现在 Save Home Space 会通过与 config Space 相同的 Save 管线发布个人配置：

| 从 Home 发布 | 效果 |
|--------------|------|
| `AGENTS.md` / `CLAUDE.md` | User Rules（`source: "home-space"`） |
| `.agents/skills/` | 所有者个人 skills |
| `.agents/prompts/` | 个人斜杠模板 |
| `.cohub/models.json` | 所有者模型覆盖 |
| `.cohub/theme.css` | 全应用生效的个人主题 |

已有的 `name === "config"` Space 仍作为普通 Space 工作：不会自动迁移，两者之间也不做回退。

## 参见

- 实践卡：[home-and-sessions-inbox](../../playbooks/home-and-sessions-inbox.md)
- [用户 config Space](./user-config-space.md) - 较早的专用配置 Space

---

[English](../../concepts/home-space.md)
