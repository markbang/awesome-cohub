# 场景矩阵

Use this table to jump from **intent** → **Cohub surfaces** → **skills/docs**.

按「你想做什么」定位能力、技能与文档。Playbook 卡片稍后补齐；现在先用主文 + 官方文档 + skill 安装命令落地。

## 图例

| Column | Meaning |
|--------|---------|
| ID | Stable id for later playbook cards |
| Scenario | Human intent (EN / 中文) |
| Surfaces | Cohub product surfaces |
| Skills | Installable agent skills (when relevant) |
| Depth | starter / intermediate / advanced |
| 角色 / Role | builder / operator / agent-author |

---

## Matrix

| ID | 场景 | 能力面 | 技能 | Depth | 角色 |
|----|-----------------|-------------------|---------------|-------|------|------|
| `cohub.bp.scratch-to-checkpoint` | 从空白 Space 到第一次存档 | Space, Files, Chat, Checkpoint | `cohub` | starter | builder |
| `cohub.bp.agent-with-skills` | 给 agent 装 skill 干活 | Space, Sandbox, Skills, CLI | `cohub`, any ecosystem skill | starter | builder, agent-author |
| `cohub.bp.cross-space-context` | 引用另一个 Space 的上下文 | `@space`, Sessions, Files | `cohub` | intermediate | builder, operator |
| `cohub.bp.multimodal-pipeline` | 多模态生成并落盘 | Generation, Files | `cohub-generate` | starter | builder |
| `cohub.bp.publish-static-work` | 发布静态 Work | Works (`file`/`directory`) | `cohub-works-share`, `public-share` | starter | builder |
| `cohub.bp.work-kit-product` | 用 Work Kit 做真产品 | Works, SDK, Scopes | `cohub-work-kit`, `cohub-work-publish` | intermediate | builder |
| `cohub.bp.minimal-scopes` | 最小权限发布 | workScopes, viewerScopes | `cohub-work-publish` | intermediate | builder |
| `cohub.bp.scheduled-loop` | 定时与 outer loop | Scheduled prompts, Tasks, Files-as-state | `cohub` | advanced | operator, agent-author |
| `cohub.bp.space-knowledge-base` | 在 Space 里建复利知识库 | Files (`raw/` / `wiki/` / log), Sessions, Skills | `cohub` | intermediate | builder, agent-author |
| `cohub.bp.social-research` | 社媒采集写入知识库 | Sandbox, Files, wiki pages | `wgetx` | intermediate | builder |
| `cohub.bp.egress-proxy` | 沙箱走 WARP 出口 | Sandbox network | `warp-proxy` | starter | builder, operator |
| `cohub.bp.channel-ops` | 外部频道入口 | Channels, Gateway | `cohub` | intermediate | operator |
| `cohub.bp.fork-and-proposal` | Fork 存档并回馈 | Checkpoint, Fork, Proposal | `cohub` | intermediate | builder |
| `cohub.bp.space-hooks-automation` | 用 Space Hooks 做事件自动化 | Hooks, Tasks, Files | `cohub` | advanced | operator, agent-author |
| `cohub.bp.mod-mount` | 挂载 Mod 共享工具 | Mods, Skills, Sandbox | `cohub` | intermediate | builder, operator |
| `cohub.bp.skill-slash-discovery` | 用 `/skill:` 发现技能 | Chat, Skills, Mods | `cohub` | starter | builder, agent-author |
| `cohub.bp.home-and-sessions-inbox` | Home 与会话收件箱 | Home, `/sessions` | `cohub` | starter | builder |
| `cohub.bp.work-commerce` | Work 内售卖功能与积分 | Works, Billing, SDK | `cohub-work-kit` | advanced | builder |
| `cohub.bp.user-config-and-rules` | 用 config Space 管个人 Agent 默认 | config Space, User Rules, `/configs/user` | `cohub` | intermediate | builder, agent-author |
| `cohub.bp.platform-config` | 运营平台配置 Space | platform config, skills | `cohub` | advanced | operator |
| `cohub.bp.skill-catalog-cache` | 排查技能目录缓存 | Skills API, Redis | `cohub` | advanced | operator, agent-author |
| `cohub.bp.execution-token-identity` | 执行令牌与登录身份 | Auth, sandbox env | `cohub` | advanced | builder, agent-author |
| `cohub.bp.search-layers` | 三层搜索；网页用 hyper-search | Search API, config skills | `hyper-search` | starter | builder, agent-author |
| `cohub.bp.port-preview` | 端口预览（开发向） | Works (`port`), Sandbox ports | `cohub-works-share` | intermediate | builder |
| `cohub.bp.hide-cohub-bar` | 隐藏公开 Work 的 Cohub 底栏 | Works, 计费权益 | `cohub` CLI | starter | builder |
| `cohub.bp.work-lifecycle` | 发布 / 版本 / 停用 / 可见性 | Works | `cohub` | intermediate | builder |
| `cohub.bp.viewer-auth-user-scopes` | 访客授权 + `user.*` | Works, SDK | `cohub` | advanced | builder, agent-author |
| `cohub.bp.space-members-access` | 成员、host/builder/guest、访问策略 | Space 设置 | `cohub` | intermediate | builder, operator |
| `cohub.bp.space-env-sandbox` | 环境变量 + 沙箱规格/idle | Space 设置, Sandbox | `cohub` | intermediate | builder, operator |
| `cohub.bp.public-identity-slugs` | 用户名与 slug，拼公开 URL | Profile, Space, Works | `cohub` | starter | builder |
| `cohub.bp.dot-cohub-layers` | 按优先级配置 `.cohub` / `.agents` | config Space、Space 文件、斜杠目录 | `cohub` | intermediate | builder, agent-author |

---

## 决策捷径

### EN

| If you need… | Prefer… | Avoid… |
|--------------|---------|--------|
| A durable project home | **Space** | One-off chat with no files |
| Undo / share a moment | **Checkpoint (Save)** | Overwriting without Saves |
| Something others can open | **Work** | Sending private sandbox URLs |
| Static demo / site | Work `directory` + `base: "./"` | History API routes on static hosting |
| Interactive product in Cohub shell | Work + SDK + minimal scopes | Broad full-access “just in case” |
| Team / agent shared memory | **In-Space knowledge base** (`raw` + `wiki` + append-only log) | Pasting giant notes into every prompt |
| Agent that can run tools | Skills inside Space sandbox | Assuming host machine paths |
| Recurring jobs | Scheduled prompt + state on disk | Hidden memory only in chat |
| Event-driven automation | **Space Hooks** (`.cohub/hooks`) | Polling Chat manually forever |

### 中文

| 你需要… | 优先用… | 别用… |
|---------|---------|-------|
| 长期项目容器 | **Space** | 只有聊天、没有文件 |
| 可回退/可分享的时间点 | **Checkpoint（存档）** | 不存档就覆盖 |
| 给别人直接打开 | **Work** | 发私有沙箱链接 |
| 静态演示/站点 | `directory` Work + `base: "./"` | 静态托管上用 History 路由 |
| Cohub 壳里的交互产品 | Work + SDK + 最小权限 | 一上来全开权限 |
| 团队/Agent 共享记忆 | **Space 内知识库**（`raw` + `wiki` + 只追加 log） | 每次 prompt 粘贴超长笔记 |
| 能跑工具的 agent | Space 内 skills | 假设宿主机路径 |
| 周期性任务 | 定时 prompt + 磁盘状态 | 只靠聊天记忆 |
| 事件驱动自动化 | **Space Hooks**（`.cohub/hooks`） | 永远靠人肉轮询 Chat |

---



## Cookbooks（端到端）

| Cookbook | 结果 | 难度 | 角色 |
|----------|------|------|------|
| [weekend-static-work](./cookbooks/weekend-static-work.md) | 公开 directory Work | starter | builder |
| [config-skills-setup](./cookbooks/config-skills-setup.md) | 发布用户 skills + 规则 | starter | builder, operator |
| [research-agent-wiki](./cookbooks/research-agent-wiki.md) | 复利知识 Space | intermediate | builder, agent-author |
| [paid-work-minimum](./cookbooks/paid-work-minimum.md) | 可商业化 Work 壳 | advanced | builder |

另见：[学习路径](./learning-path.md) · [AGENT_BRIEF](./AGENT_BRIEF.md) · [FAQ](./cheatsheets/faq-and-troubleshooting.md)

## 知识库模式（Space 内）

Inspired by long-running context Spaces (wiki compound interest, not archive dumps):

```text
raw/          # immutable evidence: dumps, exports, mirrored sources
wiki/         # compounding pages: topics, entities, analyses, index
  index.md    # living catalog (update on every meaningful change)
  log.md      # append-only timeline of ingest/query/decisions
  topics/ entities/ analyses/ queries/ ...
runtime/      # optional: agent routes, source registry, protocols
.agents/skills/  # optional: operational skills for this knowledge Space
```

Rules of thumb:

1. **New input updates existing wiki pages** (5–10 touches), not only `+1` raw file  
2. **raw is evidence; wiki is current understanding**  
3. **log is append-only** — what changed, when, why  
4. **index is the query surface** for humans and agents  
5. Prefer “semantic page first → confirm with evidence → then act”

See manifesto § knowledge base for the full practice.

---

## 安装速查

```bash
# Web search (put in config Space, then Save)
npx skills add https://github.com/kjx-talesofai/claude-skill-hyper-search \
  --skill hyper-search --agent codex --yes --copy

# Network
npx skills add https://github.com/markbang/warp-proxy-skill \
  --skill warp-proxy --agent codex --yes --copy

# Social fetch
npx skills add https://github.com/markbang/wgetx-skill \
  --skill wgetx --agent codex --yes --copy

# Work products
npx skills add https://github.com/markbang/cohub-work-skill \
  --skill cohub-work-kit --agent codex --yes --copy
npx skills add https://github.com/markbang/cohub-work-skill \
  --skill cohub-work-publish --agent codex --yes --copy
```

---

## 官方文档

| Topic | Doc |
|-------|-----|
| Works | [works-guide.md](https://github.com/talesofai/cohub/blob/main/docs/works-guide.md) |
| Generations | [generations.md](https://github.com/talesofai/cohub/blob/main/docs/generations.md) |
| Work commerce | [work-commerce-guide.md](https://github.com/talesofai/cohub/blob/main/docs/work-commerce-guide.md) |
| Space hooks | [space-hooks.md](https://github.com/talesofai/cohub/blob/main/docs/space-hooks.md) |
| Product docs (EN/ZH) | [docs/product](https://github.com/talesofai/cohub/tree/main/docs/product) |

---

## 实践卡

All matrix scenario IDs now have cards under [playbooks/](./playbooks/).

## 维护

1. Keep IDs stable; add new rows rather than renumbering
2. Align behavior notes with https://cohub.run/docs and https://cohub.run/changelog
3. Prefer updating a card over growing the manifesto forever
4. Anti-patterns live under [anti-patterns/](./anti-patterns/)

---

[English](../matrix.md)
