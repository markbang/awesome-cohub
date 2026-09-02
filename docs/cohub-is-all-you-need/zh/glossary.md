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
| **App** | 应用（旧称 Work） | 公开分享单位（`file` / `directory` / `port`）；v2.37 起是 SDK/API 规范术语 | [work](./concepts/work.md) |
| **Skill** | 技能 | Agent 指令（+ 可选脚本），`/skill:` 调用 | [skill-and-mod](./concepts/skill-and-mod.md) |
| **Mod** | 模组 | 挂载工具包 `/mods/<slug>` | [skill-and-mod](./concepts/skill-and-mod.md) |
| **Hook** | 钩子 | `.cohub/hooks` 事件自动化 | [hooks](./concepts/hooks.md) |
| **Task / Schedule** | 任务 / 定时 | 可运行任务与周期 prompt | [task-and-schedule](./concepts/task-and-schedule.md) |
| **Task Browser** | 任务浏览器 | 浏览 Task Run 历史、生成结果与按权限分视图的界面 | [task-browser](./concepts/task-browser.md) |
| **App Center** | 应用中心 | Space 中发现、安装、启用、停用与卸载 App 的面板和 Marketplace 流程 | [app-center](./concepts/app-center.md) |
| **Space Activity** | Space 活动 | 单个 Space 的有限用量、贡献者、模型与 App 浏览量摘要 | [space-activity](./concepts/space-activity.md) |
| **Command palette** | 命令面板 | 带 Recent、缓存默认列表和搜索的个人相关性导航 | [command-palette](./concepts/command-palette.md) |
| **Prompt quick action** | Prompt 快捷操作 | 通过 `quick-action` frontmatter 声明的 Prompt 模板按钮 | [command-palette](./concepts/command-palette.md) |
| **Direct Generation** | 直接生成 | 带时间线顺序与费用状态的 Create 模式多模态回合 | [direct-generation](./concepts/direct-generation.md) |
| **Channel** | 渠道 | 外部消息面（Discord / 飞书 / …） | [channel](./concepts/channel.md) |
| **Sandbox** | 沙箱 | Space agent 的隔离运行时 | [sandbox](./concepts/sandbox.md) |
| **Execution token** | 执行令牌 | 沙箱/API 运行时身份 | [execution-token](./concepts/execution-token.md) |
| **Scopes** | 权限范围 | `appScopes` 与按 Space 的 viewer grant（`workScopes` / `viewerScopes` 为旧兼容别名） | [scopes 速查](./cheatsheets/scopes.md) |
| **Labels** | 标签 | 轻量组织元数据 | [labels](./concepts/labels.md) |
| **Commerce** | 商业化 | App 内付费能力/积分 | [commerce](./concepts/commerce.md) |
| **Board Item** | Board 项 | 取代旧线上 Node 的语义化 Board 元素 | [board-semantic-authoring](./concepts/board-semantic-authoring.md) |
| **Composition** | 组合动画 | 由轨道、关键帧、片段与标记组成的原子 Board 时间线 | [board-semantic-authoring](./concepts/board-semantic-authoring.md) |
| **Promotion** | 推广 | 带聚合归因与漏斗统计的不可变 App 链接 | [work-promotions](./playbooks/work-promotions.md) |
| **Search layers** | 搜索分层 | 产品 vs 工作区 vs 网页 | [search-layers](./concepts/search-layers.md) |

| **`.cohub/`** | `.cohub/` | 平台向 Space 配置：models、generations、space.json 主题/背景、hooks | [dot-cohub-layers](./concepts/dot-cohub-layers.md) |
| **`.agents/prompts`** | 斜杠模板 | 斜杠 `/name` 模板（不在 `.cohub/`） | [dot-cohub-layers](./concepts/dot-cohub-layers.md) |

## 短原则

- Space = 工作 · Save = 时间 · Work = 分享  
- config ≠ Home  
- `/configs/*` 是发布产物，不是可写热挂载  

---

[English](../glossary.md)
