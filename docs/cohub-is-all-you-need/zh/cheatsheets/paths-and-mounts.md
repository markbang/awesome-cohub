---
id: cohub.cheat.paths-mounts
title: 路径与挂载
type: cheatsheet
---

# 路径与挂载

## 运行时地图

云端 Sandbox 与 **Local Runtime**（v2.51+）使用同一套路径。Local Runtime 把 `/workspace` 绑定到本机目录；`/configs/*` 与 `/mods/*` 仍由宿主挂载。


| 路径 | 来源 | 可写 | 备注 |
|------|------|------|------|
| `/workspace` | 当前 Space | **是** | 项目根 |
| `/workspace/.agents/skills/` | 项目 skills | 是 | 同名时优先 |
| `/workspace/.cohub/apps.json` | 当前 Space 的已安装 App 清单 | 是 | 经过 schema 校验 |
| `/configs/user` | 个人配置 Save（Home 或 config Space） | **否** | 发布快照 |
| `/configs/platform` | 平台配置发布 | **否** | |
| `/mods/<slug>` | 挂载模组 | **否** | |
| `/public` | 公开前缀 | 特殊 | App/public-files 资产 |
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

在 **Home Space** 或 `name=config` 的 Space 中 Save 都会发布到 `/configs/user/.agents/skills/`。

## 配置发布

```text
改 Home（或 config）Space → Save → 出现在 /configs/user
```

自 v2.66 起，Home Space 的 Save 会把 `AGENTS.md`、`.agents/`、`.cohub/models.json` 与 `.cohub/theme.css` 作为个人配置发布。

---

[English](../../cheatsheets/paths-and-mounts.md)
