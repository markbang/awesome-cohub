---
id: cohub.cb.config-skills-setup
title: 配置常用 Skills
type: cookbook
---

# 配置常用 Skills

让 Agent 默认配置跟着你跨 Space 走。

## 结果

- `name === "config"` 的 Space（不是 Home）
- 规则发布到 `/configs/user`
- Save 后核心 skills 可用 `/skill:`

## 路径

1. [user-config-and-rules](../playbooks/user-config-and-rules.md) — 别用 Home 当 config
2. 在 config Space 写规则
3. 安装 skills 后 **Save**：

```bash
npx skills add https://github.com/kjx-talesofai/claude-skill-hyper-search \
  --skill "hyper-search" --agent codex --yes --copy
npx skills add https://github.com/markbang/wikis-skill \
  --skill "wikis" --agent codex --yes --copy
```

4. 在其他 Space 验证 `/configs/user/.agents/skills/…` 与 `/skill:`
5. [search-layers](../playbooks/search-layers.md)

## 完成标志

- [ ] 新项目 Space 无需重装即可看到已发布 skills
- [ ] 从不在项目沙箱里「修」`/configs/user`

---

[English](../../cookbooks/config-skills-setup.md)
