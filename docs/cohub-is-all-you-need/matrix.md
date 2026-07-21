# Scenario Matrix · 场景矩阵

Use this table to jump from **intent** → **Cohub surfaces** → **skills/docs**.

按「你想做什么」定位能力、技能与文档。Playbook 卡片稍后补齐；现在先用主文 + 官方文档 + skill 安装命令落地。

## Legend · 图例

| Column | Meaning |
|--------|---------|
| ID | Stable id for later playbook cards |
| Scenario | Human intent (EN / 中文) |
| Surfaces | Cohub product surfaces |
| Skills | Installable agent skills (when relevant) |
| Depth | starter / intermediate / advanced |

---

## Matrix

| ID | Scenario · 场景 | Surfaces · 能力面 | Skills · 技能 | Depth |
|----|-----------------|-------------------|---------------|-------|
| `cohub.bp.scratch-to-checkpoint` | From blank Space to first Save · 从空白 Space 到第一次存档 | Space, Files, Chat, Checkpoint | `cohub` | starter |
| `cohub.bp.agent-with-skills` | Equip an agent and do real work · 给 agent 装 skill 干活 | Space, Sandbox, Skills, CLI | `cohub`, any ecosystem skill | starter |
| `cohub.bp.cross-space-context` | Pull context from another Space · 引用另一个 Space 的上下文 | `@space`, Sessions, Files | `cohub` | intermediate |
| `cohub.bp.multimodal-pipeline` | Generate image/video/music into Space assets · 多模态生成并落盘 | Generation, Files | `cohub-generate` | starter |
| `cohub.bp.publish-static-work` | Publish a static HTML/site Work · 发布静态 Work | Works (`file`/`directory`) | `cohub-works-share`, `public-share` | starter |
| `cohub.bp.work-kit-product` | Build a real Work product with runtime · 用 Work Kit 做真产品 | Works, SDK, Scopes | `cohub-work-kit`, `cohub-work-publish` | intermediate |
| `cohub.bp.minimal-scopes` | Ship with least privilege · 最小权限发布 | workScopes, viewerScopes | `cohub-work-publish` | intermediate |
| `cohub.bp.scheduled-loop` | Recurring / outer-loop automation · 定时与 outer loop | Scheduled prompts, Tasks, Files-as-state | `cohub` | advanced |
| `cohub.bp.space-knowledge-base` | Build a compounding wiki in a Space · 在 Space 里建复利知识库 | Files (`raw/` / `wiki/` / log), Sessions, Skills | `cohub` | intermediate |
| `cohub.bp.social-research` | Social fetch → write into wiki · 社媒采集写入知识库 | Sandbox, Files, wiki pages | `wgetx` | intermediate |
| `cohub.bp.egress-proxy` | Exit via Cloudflare WARP · 沙箱走 WARP 出口 | Sandbox network | `warp-proxy` | starter |
| `cohub.bp.channel-ops` | Operate from Discord / Feishu / WeChat · 外部频道入口 | Channels, Gateway | `cohub` | intermediate |
| `cohub.bp.fork-and-proposal` | Fork a Save, explore, propose back · Fork 存档并回馈 | Checkpoint, Fork, Proposal | `cohub` | intermediate |
| `cohub.bp.space-hooks-automation` | Event automation with Space Hooks · 用 Space Hooks 做事件自动化 | Hooks, Tasks, Files | `cohub` | advanced |
| `cohub.bp.mod-mount` | Mount Mods for shared tooling · 挂载 Mod 共享工具 | Mods, Skills, Sandbox | `cohub` | intermediate |
| `cohub.bp.skill-slash-discovery` | Discover skills with `/skill:` · 用 `/skill:` 发现技能 | Chat, Skills, Mods | `cohub` | starter |
| `cohub.bp.home-and-sessions-inbox` | Home Space & Sessions inbox · Home 与会话收件箱 | Home, `/sessions` | `cohub` | starter |
| `cohub.bp.port-preview` | Live port demo (dev, not default prod) · 端口预览（开发向） | Works (`port`), Sandbox ports | `cohub-works-share` | intermediate |

---

## Decision shortcuts · 决策捷径

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

## Knowledge base pattern · 知识库模式（Space 内）

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

## Install map · 安装速查

```bash
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

## Official docs · 官方文档

| Topic | Doc |
|-------|-----|
| Works | [works-guide.md](https://github.com/talesofai/cohub/blob/main/docs/works-guide.md) |
| Generations | [generations.md](https://github.com/talesofai/cohub/blob/main/docs/generations.md) |
| Work commerce | [work-commerce-guide.md](https://github.com/talesofai/cohub/blob/main/docs/work-commerce-guide.md) |
| Space hooks | [space-hooks.md](https://github.com/talesofai/cohub/blob/main/docs/space-hooks.md) |
| Product docs (EN/ZH) | [docs/product](https://github.com/talesofai/cohub/tree/main/docs/product) |

---

## Playbooks · 实践卡

All matrix scenario IDs now have cards under [playbooks/](./playbooks/).

## Maintain · 维护

1. Keep IDs stable; add new rows rather than renumbering
2. Align behavior notes with https://cohub.run/docs and https://cohub.run/changelog
3. Prefer updating a card over growing the manifesto forever
4. Anti-patterns live under [anti-patterns/](./anti-patterns/)
