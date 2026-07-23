<p align="center">
  <a href="https://cohub.run">
    <img
      width="1440"
      alt="Awesome Cohub"
      src="https://cdn.jsdelivr.net/gh/markbang/awesome-cohub@main/assets/banner.svg"
    />
  </a>
</p>

<div align="center">
  <strong>
    精选 Cohub 生态资源：Spaces、Agents、Skills、Works、CLI 与社区项目。
    <br />
    为使用人与 Agent 协作构建的创作者精心挑选。
  </strong>
  <br />
  <br />
  <a href="README.md">English</a> · 简体中文
</div>

<div align="center">

[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)
[![Cohub](https://img.shields.io/badge/Cohub-Ecosystem-FF4500?style=flat-square)](https://cohub.run)
[![CLI](https://img.shields.io/npm/v/@neta-art/cohub-cli?label=cohub-cli&color=FF4500&style=flat-square)](https://www.npmjs.com/package/@neta-art/cohub-cli)
[![License: CC0-1.0](https://img.shields.io/badge/License-CC0_1.0-lightgrey.svg?style=flat-square)](LICENSE)

</div>

# Awesome Cohub

> 属于你的空间，与人和 Agent 一起创造、玩耍和构建。

[Cohub](https://cohub.run) 是人与 Agent 共同工作的活态 Space。你可以从任何地方开始，用任何媒介创作，并将成果分享为 Works。

本仓库精选 Cohub 生态中最值得使用的公开入口：

- 产品界面与文档
- CLI / SDK
- 官方 Skills
- 核心概念（Space、Checkpoint、Work、Channel）
- 社区工具、示例和相关项目

灵感来自 [Awesome](https://awesome.re) 格式和 VoltAgent Awesome 系列的呈现方式。

## 目录

- [官方入口](#官方入口)
- [核心概念](#核心概念)
- [产品能力](#产品能力)
- [CLI 与 SDK](#cli-与-sdk)
- [官方 Skills](#官方-skills)
- [学习资源](#学习资源)
- [Cohub Is All You Need](#cohub-is-all-you-need)
- [贡献](#贡献)

## 官方入口

- **[Cohub](https://cohub.run)** - 面向人与 Agent 的浏览器优先创作空间。
- **[Cohub monorepo](https://github.com/talesofai/cohub)** - API、Agent、Sandbox、Gateway、Web 和各 packages 的源码。
- **[talesofai](https://github.com/talesofai)** - Cohub 及相关开源项目的 GitHub 组织。

## 核心概念

- **Space** - 包含聊天、文件、任务、预览与 Agent 的实时隔离创作界面。
- **Checkpoint（Save）** - Space 在重要时刻的不可变快照。
- **Proposal** - 将 Checkpoint 中的工作带回另一个 Space 的协作流程。
- **Session（Chat）** - Space 内的对话上下文。
- **Agent** - 在 Space 内执行工作的主动协作者。
- **Channel** - Discord、Telegram、飞书或微信等外部入口。
- **Sandbox** - Space 背后的执行运行时。
- **Work** - 从 Space 公开分享的文件、目录站点或实时端口。

## 产品能力

- **Spaces** - 在隔离环境中创建、Fork、Save 和协作。
- **Checkpoints / Saves** - 冻结进度，并从稳定基线继续 Remix。
- **Works** - 将 Demo、页面和实时预览发布为可分享 URL。
- **多模态生成** - 基于 Space 上下文生成文本、图片、视频和音乐。
- **外部 Channels** - 从聊天应用和 CLI 与 Space 对话。
- **跨 Space 引用** - 用 `@space` 上下文将 Agent 指向其他 Space。

## CLI 与 SDK

- **[@neta-art/cohub-cli](https://www.npmjs.com/package/@neta-art/cohub-cli)** - 用于 Spaces、Sessions、Prompts、Files、生成与自动化的官方 CLI。
- **[@neta-art/cohub](https://www.npmjs.com/package/@neta-art/cohub)** - 用于 Spaces、Sessions、Checkpoints 与实时协作的 TypeScript SDK。
- **[cohub-desktop](https://github.com/markbang/cohub-desktop)** - Cohub 桌面伴侣原型。

### 安装 CLI

```bash
npm install -g @neta-art/cohub-cli
cohub --help
```

### 常用命令

```bash
cohub auth login
cohub spaces ls
cohub -s <space-id> prompt "Build a landing page"
cohub generate "neon city skyline at dusk" --model <model>
cohub -s <space-id> spaces files ls
```

## 官方 Skills

Cohub 生态的标准 Agent Skills。使用 [`npx skills`](https://github.com/vercel-labs/skills) 安装。

### Cohub 平台 Skills

| Skill | 仓库 / 路径 | 说明 |
|---|---|---|
| **cohub** | [talesofai/cohub](https://github.com/talesofai/cohub/tree/main/skills/cohub) | Spaces、Chats、Files、Saves、Labels、Search、Tasks、定时 Prompt 与跨 Space 运行 |
| **cohub-generate** | [talesofai/cohub](https://github.com/talesofai/cohub/tree/main/skills/cohub-generate) | 通过 `cohub generate` 生成图片、视频和音乐 |
| **cohub-works-share** | [talesofai/cohub](https://github.com/talesofai/cohub/tree/main/skills/cohub-works-share) | 将文件、目录站点或端口发布为公开 Works |
| **public-share** | [talesofai/cohub](https://github.com/talesofai/cohub/tree/main/skills/public-share) | 将运行时文件发布到 `/public` 并返回公开直链 |

### 生态 Skills

| Skill | 仓库 | 说明 |
|---|---|---|
| **warp-proxy** | [markbang/warp-proxy-skill](https://github.com/markbang/warp-proxy-skill) | WARP 代理脚本与 Skill（SOCKS5/HTTP `:10800`） |
| **hyper-search** | [kjx-talesofai/claude-skill-hyper-search](https://github.com/kjx-talesofai/claude-skill-hyper-search) | 推荐安装到 **config Space** 的多服务商降级网页搜索 |
| **lark-lite** | [kjx-talesofai/claude-skill-lark-lite](https://github.com/kjx-talesofai/claude-skill-lark-lite) | 通过 `lark-cli` 以**用户身份**进行轻量飞书/Lark 操作，而非 Bot 优先 |
| **fandom-cli** | [kjx-talesofai/claude-skill-fandom-cli](https://github.com/kjx-talesofai/claude-skill-fandom-cli) | 无需抓取 HTML 即可查询 Fandom/MediaWiki 页面、信息框、搜索和图片 |
| **wikis** | [markbang/wikis-skill](https://github.com/markbang/wikis-skill) | 面向 25 万+ 社区 Wiki 的 HTTP API Skill，支持搜索、Markdown、信息框和图片代理 |
| **okp** | [talesofai/okp](https://github.com/talesofai/okp) | 用于结构化知识搜索、导航与导入的 Open Knowledge Protocol 工具 |
| **wgetx** | [markbang/wgetx-skill](https://github.com/markbang/wgetx-skill) | 纯 ESM `.mjs` 社交平台采集 Skill，默认采集器无需 npm 依赖 |
| **cohub-work-kit** | [markbang/cohub-work-skill](https://github.com/markbang/cohub-work-skill) | 搭建 Cohub Works，内置 Vite + React + TanStack Query 模板 |
| **cohub-work-publish** | [markbang/cohub-work-skill](https://github.com/markbang/cohub-work-skill) | 以最小权限构建并发布目录 Works |

### 安装（`.agents/`）

Skills 安装到 **`.agents/skills/<name>/`**。上方表格是完整目录，请从中选择仓库和 Skill 名称。

```bash
# 示例：config Space 网页搜索（安装后 Save，发布到 /configs/user）
npx skills add https://github.com/kjx-talesofai/claude-skill-hyper-search \
  --skill "hyper-search" \
  --yes \
  --copy

# 示例：Sandbox 社交平台采集
npx skills add https://github.com/markbang/wgetx-skill \
  --skill "wgetx" \
  --yes \
  --copy
```

```bash
# 先列出一个包内的 Skills
npx skills add https://github.com/markbang/wgetx-skill --list
```

> **注意：** 个人默认能力（`hyper-search`、`lark-lite`、`fandom-cli`、`wikis`、`okp`）优先安装到 **config Space**，再 **Save** 发布到 `/configs/user/.agents/skills/`。OKP 需要 `okp` CLI（`npm install -g @markbangwu/okp`）。项目/Sandbox 工具（`warp-proxy`、`wgetx`、work-kit）可以放在当前 Space 工作区。`npx skills add --copy` 会复制整个 Skill 树；`skills/<name>/scripts/` 下的脚本会进入 `.agents/skills/<name>/scripts/`。

### Skills 为什么重要

当 Cohub Agent 知道以下内容时，才能真正发挥作用：

1. 产品术语分别对应哪些 CLI 命令
2. 如何让输出符合 Space 目录约定
3. 如何发布 Works 并清晰分享结果
4. 如何运行多模态生成，而不是虚构不存在的 API
5. 如何按需引入外部知识、社交数据和网络出口工具

## Cohub Is All You Need

面向**构建者**与 **Agent** 的最佳实践系列：从第一次 Save，到 Works、配置和自治。

| | |
|--|--|
| **英文索引** | [docs/cohub-is-all-you-need/README.md](docs/cohub-is-all-you-need/README.md) |
| **中文索引** | [docs/cohub-is-all-you-need/zh/README.md](docs/cohub-is-all-you-need/zh/README.md) |
| **开始** | [学习路径](docs/cohub-is-all-you-need/zh/learning-path.md) · [AGENT_BRIEF](docs/cohub-is-all-you-need/zh/AGENT_BRIEF.md) · [Cookbooks](docs/cohub-is-all-you-need/zh/cookbooks/) · [FAQ](docs/cohub-is-all-you-need/zh/cheatsheets/faq-and-troubleshooting.md) |
| **宣言** | [英文](docs/cohub-is-all-you-need/manifesto.md) · [中文](docs/cohub-is-all-you-need/zh/manifesto.md) |
| **矩阵** | [英文](docs/cohub-is-all-you-need/matrix.md) · [中文](docs/cohub-is-all-you-need/zh/matrix.md) |
| **实践卡** | [英文](docs/cohub-is-all-you-need/playbooks/) · [中文](docs/cohub-is-all-you-need/zh/playbooks/)（31） |
| **概念 / 反模式 / 速查** | [概念](docs/cohub-is-all-you-need/zh/concepts/)（21）· [反模式](docs/cohub-is-all-you-need/zh/anti-patterns/)（15）· [速查](docs/cohub-is-all-you-need/zh/cheatsheets/)（6） |
| **Banner** | [动画 SVG](https://cdn.jsdelivr.net/gh/markbang/awesome-cohub@main/docs/cohub-is-all-you-need/assets/banner.svg) · [架构图](docs/cohub-is-all-you-need/assets/architecture.svg) |
| **变更日志** | [指南 CHANGELOG](docs/cohub-is-all-you-need/zh/CHANGELOG.md) |

## 学习资源

- **[Cohub README](https://github.com/talesofai/cohub/blob/main/README.md)** - 产品定位、概念与仓库地图。
- **[共创模型](https://github.com/talesofai/cohub/blob/main/docs/CO-CREATION-MODEL.md)** - Space / Checkpoint / Proposal 心智模型。
- **[Works 指南](https://github.com/talesofai/cohub/blob/main/docs/works-guide.md)** - 发布公开 Works。
- **[自托管说明](https://github.com/talesofai/cohub/blob/main/docs/self-hosting.md)** - Monorepo 中面向部署的文档。

## 贡献

欢迎贡献。

1. 保证条目有用、公开且与 Cohub 相关。
2. 描述保持简短。
3. 将链接添加到最具体的分类下。
4. 避免 AI 生成内容堆砌和无人维护的占位项目。

详见 [CONTRIBUTING.md](CONTRIBUTING.md)。

## 许可证

[CC0 1.0 Universal](LICENSE) — 本列表内容以公共领域贡献方式发布。

---

<div align="center">
  <sub>为 Cohub 生态构建 · <a href="https://cohub.run">cohub.run</a></sub>
</div>
