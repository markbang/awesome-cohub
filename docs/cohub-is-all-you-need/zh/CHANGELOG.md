---
id: cohub.meta.changelog
title: 系列变更日志
type: meta
---

# Cohub Is All You Need — 变更日志

记录的是**本指南**，不是 Cohub 产品。产品变更见 [cohub.live/changelog](https://cohub.live/changelog)。

写法锚定当时的公开文档 + monorepo 行为；产品漂移时以产品文档为准并修指南。






## v0.19 — 2026-09-02

同步 **v2.31-v2.38** 重大更新：

- **App 术语与运行时**（v2.35-v2.37）：完成 Work -> App 词汇迁移，新增 `app.homeSpace`、invocation 承载上下文、bridge/broker 运行时模式、可调用 App 界面与 `app://` 引用 scheme
- **App Center 与 Marketplace**（v2.38）：Space Apps 面板、官方 Marketplace、经过校验的 `.cohub/apps.json` 已安装 App 清单、启用/停用/卸载状态、LRU 缓存与实时刷新
- **Space Activity**（v2.34）：按小时的 LLM/生成用量、贡献者与模型排名、App 浏览量排名、`cohub spaces activity`，以及按角色隐藏费用
- **命令面板**（v2.31-v2.33）：个人相关性排名、Recent/All/Mine/Pinned 筛选、缓存优先默认列表、Space 根路径新 Chat 与 Prompt quick-action 按钮
- **Board 编辑**（v2.37-v2.38）：原子 `boards batch`、Board ID/路径解析、统一 `boards playback`、类型化连接/资源读取、公开 `BoardSemanticCommandSchema`、结构化诊断路径、稳定错误 code 与 request ID
- **Board 实时与渲染**：语义化 `board.changed` 更新、小型动画 patch 无需重新读取快照、手绘 tessellation 修复与 schema 有效示例
- **运行时可靠性**（v2.31-v2.36）：兼容换行/BOM/行尾空格的可恢复编辑、明确的命令输出截断、`ctimeMs`/`isFile` 元数据、后台 CLI 自更新与更安全的跨客户端缓存刷新
- **官方入口更新**：`cohub-apps` 取代 `cohub-works-share`；`public-files` 取代 `public-share`；产品链接和 App 指南统一使用 `cohub.live`
- 更新 EN/ZH App、Board、Task Browser、导航、权限、配置与排障卡；新增 `app-center`、`space-activity`、`command-palette`
- 现有规模：**35** 篇实践卡，**33** 篇概念卡

## v0.18 — 2026-08-26

同步 **v2.22-v2.30** 重大更新：

- **Board 语义化编辑**（v2.22、v2.25-v2.27）：Item 取代旧线上 Node 结构；原子命令覆盖 Item、连接、效果与 Composition，并提供 capabilities、dry-run 诊断、版本校验与持久幂等回执
- **Board 媒体与呈现**：类型化生成引用、可配置背景、语义化镜头聚焦、组合动画播放、批量刷新，以及一致的 Checkpoint/Work 快照
- **Task Browser**（v2.26、v2.30）：专门的多模态 Task Run 界面、按权限的 Space/Mine 视图、按身份隔离的 stale-while-revalidate 缓存，生成任务跟踪从 Chat 移出
- **Direct Generation**（v2.23）：Agent/Create 模式、一等生成回合、`clientMessageId` 去重、时间线屏障、实时投影与明确费用状态
- **Work 操作**（v2.22-v2.24）：不可变 UTM 推广链接与聚合漏斗统计、实时预览刷新、`desktop open` 可调用界面与校验下载
- **工作区预览与媒体**（v2.22-v2.24）：Markdown 相对媒体资源、`file://` / `work://` 预览目标、`:create` Composer 模式，以及不销毁运行时即可恢复的挂起预览
- **权限与运行时安全**：明确 App scopes/viewer grant 模型；execution token 权限从 v2.29 起与账号权限相加；Sandbox 写入支持版本化乐观并发与原子 `fs.edit`
- **实时操作**（v2.28-v2.30）：独立 desktop 事件路由、编译期事件域校验、Task Browser 刷新保护，以及降低常规 auth/task-sync 日志噪声
- **配置与上下文**：Prompt 系统变量（`{{cohub.session.id}}`、`{{cohub.space.id}}`、`{{cohub.user.uuid}}`）与 `.cohub/model-tasks.json` 辅助任务模型
- 更新 EN/ZH Board、Work、生成、授权、execution-token、Sandbox、Hooks 与排障卡；新增 `board-semantic-authoring`、`task-browser`、`direct-generation`、`work-promotions`
- 产品链接统一使用 `cohub.live`；`cohub.run` 仍是历史备用域名
- 现有规模：**33** 篇实践卡，**30** 篇概念卡

## v0.17 — 2026-08-17

同步 **v2.8–v2.21** 重大更新：

- **Board** v2.8–v2.21：节点间连接（v2.16）、任务节点 + 板内媒体生成（v2.19）、音频节点（v2.20）、原生 Board 节点契约（v2.21）
- **实时房间**（v2.11）：Works/Apps 通过 `client.app.realtime` 运行多人状态，无需后端
- **Work 分析**（v2.14）：`cohub apps stats`、`GET /api/works/:id/stats`、按来源浏览量细分
- **Space 任务钩子**（v2.18）：`task.updated` 转换钩子
- **cohub.live 域名**（v2.21）：主域名迁移至 cohub.live；cohub.run 仍是历史备用域名
- 更新 board-runtime 概念卡；新增 realtime-rooms 概念卡
- 现有规模：**32** 篇实践卡，**27** 篇概念卡

## v0.16 — 2026-08-04

- 将 [markbang/cohub-pr-skill](https://github.com/markbang/cohub-pr-skill) 作为单条 `pr-workflow` 收录（基于 git worktree 的并行 PR 开发 + 每个 PR 独立 Cohub Session）
- 将 [kjx-talesofai/claude-skill-rtb-advisor](https://github.com/kjx-talesofai/claude-skill-rtb-advisor) 作为单条 `rtb-advisor` 收录（品牌策略 "Reason to Believe" 质询）

## v0.15 — 2026-08-03

- 将 [markbang/temp-mail-skill](https://github.com/markbang/temp-mail-skill) 作为单条 `temp-mail` 收录（reusable.email / temp-mail.org 临时邮箱）

## v0.14 — 2026-08-03

- 同步 **v2.5-v2.7** 更新：
  - Space 邀请与加入链接（`cohub spaces invites create/ls/revoke`、`/username/space-slug/join/<token>`）
  - 可恢复上下文压缩（v2.5）：任意 LLM 回合边界触发，失败自动回滚
  - Space 回合浏览（v2.6）：`GET /api/spaces/:id/turns`、`cohub spaces turns ls`
  - Work 发布提升至 1 GiB、Gateway 附件 500 MB（v2.6）
  - Mod 资源改为从 checkpoint 快照提供 + 沙箱注入 `COHUB_MODEL_PROVIDER` / `COHUB_MODEL_ID`（v2.7/v2.6）
  - Mod skill 来源标注（v2.5）与项目 skills 直读 live workspace（v2.7）
- 现有规模：**32** 篇实践卡，**26** 篇概念卡

## v0.13 — 2026-07-29

- 新增 **Board 运行时 v2.0-v2.4**（概念 + 实践卡）：PixiJS 2.5D 无限画布、`file` 文件节点、无头导出 (`cohub boards export`) 与自动播放策略
- 新增 **思考等级与模型状态** 概念：单 Prompt `thinkingLevel` 与模型实时可用性点阵图
- 更新最新规模：**32** 篇实践卡，**23** 篇概念卡

## v0.12 — 2026-07-22

- 将 [talesofai/okp](https://github.com/talesofai/okp) 作为单条 `okp` 收录进生态 Skill 目录
- 记录所需 `@markbangwu/okp` CLI，并同步 EN/ZH 目录

## v0.11 — 2026-07-21

- 新增 **`.cohub` 分层与优先级**（concept + playbook）：models / space.json 主题与 new-chat 背景 / hooks vs **`.agents/prompts` 斜杠模板**
- 合并顺序写清：skills & prompts `platform → mods → user → project`；models `platform → user`
- 同步 config-layers 速查、glossary、AGENT_BRIEF、learning path

## v0.10 — 2026-07-21

- 对照 monorepo 与官方 changelog 补缺口：
  - **隐藏 Cohub 底栏**（`hideCohubBar`，Pro/Max，`--hide-cohub-bar`）
  - Work 生命周期（限额、版本、停用、可见性）
  - 访客授权与 `user.*`
  - Space 成员/角色/访问
  - Space env + 沙箱设置
  - 公开身份 slug
- 概念：`work-presentation`、`space-roles`
- FAQ / 矩阵 +6 playbooks（共 **30**）

## v0.9 — 2026-07-21

- 一次性定格动画 SVG banner  
- EN/ZH 布局稳定（`zh/` 镜像）  
- **学习路径**、**AGENT_BRIEF**、**术语表**、**cookbooks**（4）、**FAQ**、**路径**、**skill 包装**  
- 概念：channel、task/schedule、sandbox、labels  
- 反模式：循环无盘状态、Home 垃圾桶、skill 资源在仓根、静态 Work 当 API  
- 矩阵 **角色**列；samples；系列 changelog  
- awesome 根入口加强  

## v0.8

- 24 playbooks · 14 concepts · 配置/搜索/执行令牌深潜  
- 生态 skills：hyper-search、lark-lite、fandom-cli、wikis、wgetx、warp-proxy、work-kit  

## v0.5–v0.7

- 宣言、矩阵、初版实践/概念/反模式/速查  

---

[English](../CHANGELOG.md)
