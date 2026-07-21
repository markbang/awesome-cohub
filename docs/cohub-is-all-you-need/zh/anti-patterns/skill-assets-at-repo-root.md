---
id: auto
title: Skill 资源在仓根
type: anti-pattern
---

# Skill 资源在仓根

`npx skills add` 只复制 `skills/<name>/`。仓根脚本/模板到不了，agent 调缺失路径。

脚本放 `skills/<name>/…`，安装后 `find .agents/skills` 冒烟。


---

[English](../../anti-patterns/skill-assets-at-repo-root.md)
