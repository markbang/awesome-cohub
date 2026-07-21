---
id: cohub.meta.glossary
title: 术语表
type: guide
---

# 术语表

中英对照。深挖见概念卡。

| Term | 中文 | 含义 | 概念 |
|------|------|------|------|
| **Space** | 空间 | 长期项目容器：文件、对话、沙箱、设置 | [space](./concepts/space.md) |
| **Home Space** | 主空间 | 个人默认空间；不能替代 `config` | [home-space](./concepts/home-space.md) |
| **config Space** | 配置空间 | `name === "config"`；Save 发布到 `/configs/user` | [user-config-space](./concepts/user-config-space.md) |
| **platform config** | 平台配置 | 运营级默认，发布到 `/configs/platform` | [platform-config](./concepts/platform-config.md) |
| **Chat / Session** | 对话 / 会话 | Space 内的 agent 线程 | [chat](./concepts/chat.md) |
| **Sessions inbox** | 会话收件箱 | 跨 Space 会话面 `/sessions` | [sessions-inbox](./concepts/sessions-inbox.md) |
| **Save / Checkpoint** | 存档 | 时间点快照；恢复、分叉、发布 | [save](./concepts/save.md) |
| **Fork / Proposal** | 分叉 / 提案 | 从存档探索；可选回提 | playbook fork-and-proposal |
| **Work** | 作品 | 公开分享单位（`file` / `directory` / `port`） | [work](./concepts/work.md) |
| **Skill** | 技能 | Agent 指令（+ 可选脚本），`/skill:` 调用 | [skill-and-mod](./concepts/skill-and-mod.md) |
| **Mod** | 模组 | 挂载工具包 `/mods/<slug>` | [skill-and-mod](./concepts/skill-and-mod.md) |
| **Hook** | 钩子 | `.cohub/hooks` 事件自动化 | [hooks](./concepts/hooks.md) |
| **Task / Schedule** | 任务 / 定时 | 可运行任务与周期 prompt | [task-and-schedule](./concepts/task-and-schedule.md) |
| **Channel** | 渠道 | 外部消息面（Discord / 飞书 / …） | [channel](./concepts/channel.md) |
| **Sandbox** | 沙箱 | Space agent 的隔离运行时 | [sandbox](./concepts/sandbox.md) |
| **Execution token** | 执行令牌 | 沙箱/API 运行时身份 | [execution-token](./concepts/execution-token.md) |
| **Scopes** | 权限范围 | Work 的 `workScopes` / `viewerScopes` | [scopes 速查](./cheatsheets/scopes.md) |
| **Labels** | 标签 | 轻量组织元数据 | [labels](./concepts/labels.md) |
| **Commerce** | 商业化 | Work 内付费能力/积分 | [commerce](./concepts/commerce.md) |
| **Search layers** | 搜索分层 | 产品 vs 工作区 vs 网页 | [search-layers](./concepts/search-layers.md) |

## 短原则

- Space = 工作 · Save = 时间 · Work = 分享  
- config ≠ Home  
- `/configs/*` 是发布产物，不是可写热挂载  

---

[English](../glossary.md)
