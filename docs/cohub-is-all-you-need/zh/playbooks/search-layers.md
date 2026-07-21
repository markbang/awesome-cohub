---
id: cohub.bp.search-layers
title: 三层搜索（产品内 / 工作区 / 网页）
type: playbook
audience: [builder, agent]
features: [search, skill, config-space]
difficulty: starter
related: [cohub.bp.user-config-and-rules, cohub.bp.space-knowledge-base, cohub.bp.skill-slash-discovery]
sources:
  - apps/api/src/routes/search.route.ts
  - https://github.com/kjx-talesofai/claude-skill-hyper-search
---

# 三层搜索

## 主张

Cohub is **not** “searchless”. It has **different search layers**. Mixing them causes bad Agent behavior.

| Layer | What it searches | Built-in? | How |
|-------|------------------|-----------|-----|
| **1. Product search** | Spaces, Chats/sessions, turns, labels… | **Yes** | UI command palette / `GET /api/search` |
| **2. Workspace knowledge** | Files in the Space (`wiki/`, `raw/`, code) | Partial (fs tools, not a RAG product) | `rg`, read files, your wiki index |
| **3. Web search** | Public internet | **No first-class product** | **Agent skill** (recommended below) |

Do **not** say “Cohub has no search.”  
Say: **no built-in web/RAG search**; product resource search exists; web search is a **config-space skill**.

## 推荐网页搜索 skill

**[hyper-search](https://github.com/kjx-talesofai/claude-skill-hyper-search)** (`kjx-talesofai/claude-skill-hyper-search`)

Why prefer it as the **config Space web search skill**:

- Multi-provider: Tavily, Exa, Firecrawl, SerpAPI, DuckDuckGo (+ WeChat via `weixin-search`)
- Auto-fallback + normalized agent-readable output
- Bundled CLI (`node scripts/cli.js`) — no fragile ad-hoc scrapers
- Optional multi-provider blend, freshness, domain filters
- Installable as a standard skill (`npx skills add` discovers `hyper-search`)

Install into **your user config Space** (the Space with `name === "config"`), then **Save** so it publishes to `/configs/user/.agents/skills`.

### Install (config Space / personal)

```bash
# Inside the config Space workspace (or any checkout, then copy into config Space skills)
npx skills add https://github.com/kjx-talesofai/claude-skill-hyper-search \
  --skill "hyper-search" \
  --agent codex \
  --yes \
  --copy
```

Ensure files land under the config Space tree as:

```text
.agents/skills/hyper-search/
  SKILL.md
  scripts/cli.js
  reference/…
```

Then **Save** the config Space → user config publish → other Spaces mount:

```text
/configs/user/.agents/skills/hyper-search/
```

### Use (any Space, as owner)

```bash
# Prefer installed skill path after publish
node /configs/user/.agents/skills/hyper-search/scripts/cli.js search "latest Cohub changelog"

# Or invoke skill
# /skill:hyper-search
```

First-time providers:

```bash
node …/scripts/cli.js setup
```

Store API keys in **Space env / secret surfaces**, not in committed SKILL files.

### Paths after install

| Context | CLI path |
|---------|----------|
| Config Space workspace | `node .agents/skills/hyper-search/scripts/cli.js …` |
| Other Spaces (published user config) | `node /configs/user/.agents/skills/hyper-search/scripts/cli.js …` |
| Project-local only (not account-wide) | `node .agents/skills/hyper-search/scripts/cli.js …` in that project |

## 何时用哪一层

| Need | Use |
|------|-----|
| Find a Chat / Space / label in Cohub | **Product search** |
| Find a decision in this Space’s wiki | **Workspace** (`wiki/index.md`, `rg`) |
| Fresh public facts / links / news | **hyper-search** (web skill) |
| Social platform dumps | **wgetx** (not web SERP) |

## 产品内搜索

- Endpoint: `/api/search`
- Types include space / session / turn / label (query params)
- Requires appropriate visibility; not a replacement for web search

## 完成标准

- [ ] Team wording distinguishes the three layers
- [ ] `hyper-search` lives in **config Space** and is Saved/published
- [ ] Owner sandboxes can run CLI under `/configs/user/.agents/skills/hyper-search`
- [ ] Agents default to hyper-search for “search the web”, not inventing curl scrapers

## 别这样做

- Claiming Cohub has zero search
- Putting web search only in a random project Space (won’t follow you)
- Using product `/api/search` to “google” the internet
- Hardcoding one flaky HTML scraper as the org standard when hyper-search exists

---

[English](../../playbooks/search-layers.md)
