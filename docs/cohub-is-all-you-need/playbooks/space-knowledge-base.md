---
id: cohub.bp.space-knowledge-base
title: Build a compounding wiki in a Space
title_zh: 在 Space 里建复利知识库
type: playbook
audience: [builder, agent]
features: [files, chat, skill, save]
difficulty: intermediate
related: [cohub.concept.space, cohub.bp.agent-with-skills, cohub.bp.social-research]
sources:
  - https://github.com/markbang/awesome-cohub/blob/main/docs/cohub-is-all-you-need/manifesto/en.md
---

# Build a compounding wiki in a Space · 在 Space 里建复利知识库

## When · 何时用

EN: Multiple people/agents must share evolving understanding — not re-paste history every Chat.
中文：多人/多 Agent 要共享不断演进的理解——而不是每次 Chat 重贴历史。

## Outcome · 结果

A Space filesystem shaped like:

```text
raw/                 # immutable evidence
wiki/
  overview.md
  index.md           # living catalog
  log.md             # append-only timeline
  topics/ entities/ analyses/ queries/ ...
runtime/             # optional routes / registries
.agents/skills/      # optional ops skills
AGENTS.md            # how agents should navigate this knowledge Space
```

## Steps · 步骤

### EN
1. Create a dedicated knowledge Space (or a clear subtree in a project Space).
2. Seed `wiki/overview.md` (purpose, audience, non-goals).
3. Create empty `wiki/index.md` + `wiki/log.md`.
4. Ingest: put source material under `raw/` (never rewrite raw).
5. Distill into **wiki pages** (update 5–10 existing pages when possible).
6. Append a log entry: what changed, links to pages, confidence.
7. Refresh `index.md` so humans/agents can query by scanning.
8. Save periodically when the knowledge shape stabilizes.

### 中文
1. 单独开知识 Space（或在项目 Space 划清子树）。
2. 写 `wiki/overview.md`（定位、受众、不做的事）。
3. 建 `wiki/index.md` + `wiki/log.md`。
4. 原料进 `raw/`（不改写 raw）。
5. 蒸馏进 **wiki 页**（尽量更新 5–10 个已有页，而不是只 +1 文件）。
6. `log.md` 只追加：变更、链接、置信度。
7. 维护 `index.md` 作为查询面。
8. 结构稳定时存档。

## Agent rules · Agent 规则

1. Semantic page first → confirm with `raw/` evidence → then act  
2. Don’t treat Chat as the catalog — update `index.md`  
3. Contradictions get an explicit page/section, not silent overwrite  
4. Minimize secrets/PII in wiki; keep credentials in Space env, not markdown  

## Done when · 完成标准

- [ ] New teammates/agents can start from `AGENTS.md` + `wiki/index.md`
- [ ] Log shows recent compounding updates
- [ ] Raw evidence is linkable from wiki claims

## External wiki evidence · 外部百科证据

For Fandom / MediaWiki lore dumps into `raw/` then distill to `wiki/`, use **[fandom-cli](https://github.com/kjx-talesofai/claude-skill-fandom-cli)** (API, not HTML scrape). Good companion to config-space skills.

## Avoid · 别这样做

- Archive pipeline that only adds files and never updates pages
- Using Chat transcripts as the only memory
- Editing history inside `raw/`
