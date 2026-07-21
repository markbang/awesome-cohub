# Scenario Matrix

Use this table to jump from **intent** → **Cohub surfaces** → **skills/docs**.

## Legend

| Column | Meaning |
|--------|---------|
| ID | Stable id for later playbook cards |
| Scenario | Human intent (EN / 中文) |
| Surfaces | Cohub product surfaces |
| Skills | Installable agent skills (when relevant) |
| Depth | starter / intermediate / advanced |

---

## Matrix

| ID | Scenario | Surfaces | Skills | Depth |
|----|-----------------|-------------------|---------------|-------|
| `cohub.bp.scratch-to-checkpoint` | From blank Space to first Save | Space, Files, Chat, Checkpoint | `cohub` | starter |
| `cohub.bp.agent-with-skills` | Equip an agent and do real work | Space, Sandbox, Skills, CLI | `cohub`, any ecosystem skill | starter |
| `cohub.bp.cross-space-context` | Pull context from another Space | `@space`, Sessions, Files | `cohub` | intermediate |
| `cohub.bp.multimodal-pipeline` | Generate image/video/music into Space assets | Generation, Files | `cohub-generate` | starter |
| `cohub.bp.publish-static-work` | Publish a static HTML/site Work | Works (`file`/`directory`) | `cohub-works-share`, `public-share` | starter |
| `cohub.bp.work-kit-product` | Build a real Work product with runtime | Works, SDK, Scopes | `cohub-work-kit`, `cohub-work-publish` | intermediate |
| `cohub.bp.minimal-scopes` | Ship with least privilege | workScopes, viewerScopes | `cohub-work-publish` | intermediate |
| `cohub.bp.scheduled-loop` | Recurring / outer-loop automation | Scheduled prompts, Tasks, Files-as-state | `cohub` | advanced |
| `cohub.bp.space-knowledge-base` | Build a compounding wiki in a Space | Files (`raw/` / `wiki/` / log), Sessions, Skills | `cohub` | intermediate |
| `cohub.bp.social-research` | Social fetch → write into wiki | Sandbox, Files, wiki pages | `wgetx` | intermediate |
| `cohub.bp.egress-proxy` | Exit via Cloudflare WARP | Sandbox network | `warp-proxy` | starter |
| `cohub.bp.channel-ops` | Operate from Discord / Feishu / WeChat | Channels, Gateway | `cohub` | intermediate |
| `cohub.bp.fork-and-proposal` | Fork a Save, explore, propose back | Checkpoint, Fork, Proposal | `cohub` | intermediate |
| `cohub.bp.space-hooks-automation` | Event automation with Space Hooks | Hooks, Tasks, Files | `cohub` | advanced |
| `cohub.bp.mod-mount` | Mount Mods for shared tooling | Mods, Skills, Sandbox | `cohub` | intermediate |
| `cohub.bp.skill-slash-discovery` | Discover skills with `/skill:` | Chat, Skills, Mods | `cohub` | starter |
| `cohub.bp.home-and-sessions-inbox` | Home Space & Sessions inbox | Home, `/sessions` | `cohub` | starter |
| `cohub.bp.work-commerce` | Sell features/credits in a Work | Works, Billing, SDK | `cohub-work-kit` | advanced |
| `cohub.bp.user-config-and-rules` | Own agent defaults in config Space | config Space, User Rules, `/configs/user` | `cohub` | intermediate |
| `cohub.bp.platform-config` | Operate platform config Space | platform config, skills | `cohub` | advanced |
| `cohub.bp.skill-catalog-cache` | Debug `/skill:` catalog & cache | Skills API, Redis | `cohub` | advanced |
| `cohub.bp.execution-token-identity` | Execution token vs login identity | Auth, sandbox env | `cohub` | advanced |
| `cohub.bp.search-layers` | Product vs workspace vs web search | Search API, config skills | `hyper-search` | starter |
| `cohub.bp.port-preview` | Live port demo (dev, not default prod) | Works (`port`), Sandbox ports | `cohub-works-share` | intermediate |

---

## Decision shortcuts

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

## Knowledge base pattern

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

## Install map

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

## Official docs

| Topic | Doc |
|-------|-----|
| Works | [works-guide.md](https://github.com/talesofai/cohub/blob/main/docs/works-guide.md) |
| Generations | [generations.md](https://github.com/talesofai/cohub/blob/main/docs/generations.md) |
| Work commerce | [work-commerce-guide.md](https://github.com/talesofai/cohub/blob/main/docs/work-commerce-guide.md) |
| Space hooks | [space-hooks.md](https://github.com/talesofai/cohub/blob/main/docs/space-hooks.md) |
| Product docs (EN/ZH) | [docs/product](https://github.com/talesofai/cohub/tree/main/docs/product) |

---

## Playbooks

All matrix scenario IDs now have cards under [playbooks/](./playbooks/).

## Maintain

1. Keep IDs stable; add new rows rather than renumbering
2. Align behavior notes with https://cohub.run/docs and https://cohub.run/changelog
3. Prefer updating a card over growing the manifesto forever
4. Anti-patterns live under [anti-patterns/](./anti-patterns/)

---

[中文](./zh/matrix.md)
