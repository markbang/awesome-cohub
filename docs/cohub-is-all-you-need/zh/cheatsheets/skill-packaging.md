---
id: cohub.cheat.skill-packaging
title: Skill 包装
type: cheatsheet
---

# Skill 包装

面向 [`npx skills`](https://github.com/vercel-labs/skills) 安装的仓库。

## 纯 skill 仓布局

```text
my-skill-repo/
├── README.md
├── LICENSE
└── skills/
    └── my-skill/
        ├── SKILL.md
        ├── scripts/      # 必须在这里才会被安装
        ├── references/
        └── assets/
```

## 容易踩的坑

1. **可安装内容必须在 `skills/<name>/`** — 仓根 `scripts/` 不会被复制  
2. frontmatter 的 `name` = 安装 id = `/skill:name`  
3. 能不用强制 package.json 就不用；可选依赖写清楚  
4. config Space：安装 → **Save** → 其他 Space 消费  
5. 冒烟：`npx skills add` 后 `find .agents/skills/<name>`

---

[English](../../cheatsheets/skill-packaging.md)
