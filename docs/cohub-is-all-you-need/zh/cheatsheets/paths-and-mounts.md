---
id: cohub.cheat.paths-mounts
title: 路径与挂载
type: cheatsheet
---

# 路径与挂载

## 沙箱地图

| 路径 | 来源 | 可写 | 备注 |
|------|------|------|------|
| `/workspace` | 当前 Space | **是** | 项目根 |
| `/workspace/.agents/skills/` | 项目 skills | 是 | 同名时优先 |
| `/configs/user` | config Space 的 Save | **否** | 发布快照 |
| `/configs/platform` | 平台配置发布 | **否** | |
| `/mods/<slug>` | 挂载模组 | **否** | |
| `/public` | 公开前缀 | 特殊 | |
| `/sessions` | 会话产物 | **否** | |

## Skill 合并

```text
platform → mods → user config → workspace
```

## `npx skills add --copy` 落点

```text
./.agents/skills/<name>/…
```

仅复制 skill 仓内 `skills/<name>/` 下的文件。

## 配置发布

```text
改 config Space → Save → 出现在 /configs/user
```

---

[English](../../cheatsheets/paths-and-mounts.md)
