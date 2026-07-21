---
id: cohub.bp.space-knowledge-base
title: 在 Space 里建复利知识库
type: playbook
audience: [builder, agent]
features: [files, chat, skill, save]
difficulty: intermediate
related: [cohub.concept.space, cohub.bp.agent-with-skills, cohub.bp.social-research]
sources:
  - https://github.com/markbang/awesome-cohub/blob/main/docs/cohub-is-all-you-need/manifesto/en.md
---

# 在 Space 里建复利知识库

## 何时用

多人/多 Agent 要共享不断演进的理解——而不是每次 Chat 重贴历史。

## 结果

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

## 步骤

1. 单独开知识 Space（或在项目 Space 划清子树）。
2. 写 `wiki/overview.md`（定位、受众、不做的事）。
3. 建 `wiki/index.md` + `wiki/log.md`。
4. 原料进 `raw/`（不改写 raw）。
5. 蒸馏进 **wiki 页**（尽量更新 5–10 个已有页，而不是只 +1 文件）。
6. `log.md` 只追加：变更、链接、置信度。
7. 维护 `index.md` 作为查询面。
8. 结构稳定时存档。

## Agent 规则

1. Semantic page first → confirm with `raw/` evidence → then act  
2. Don’t treat Chat as the catalog — update `index.md`  
3. Contradictions get an explicit page/section, not silent overwrite  
4. Minimize secrets/PII in wiki; keep credentials in Space env, not markdown  

## 完成标准

- [ ] New teammates/agents can start from `AGENTS.md` + `wiki/index.md`
- [ ] Log shows recent compounding updates
- [ ] Raw evidence is linkable from wiki claims

## 外部百科证据

For Fandom / MediaWiki lore dumps into `raw/` then distill to `wiki/`:

- **[wikis](https://github.com/markbang/wikis-skill)** — HTTP API (`fff-wiki.neta.art`), great for curl/agents
- **[fandom-cli](https://github.com/kjx-talesofai/claude-skill-fandom-cli)** — local MediaWiki CLI alternative

## 别这样做

- Archive pipeline that only adds files and never updates pages
- Using Chat transcripts as the only memory
- Editing history inside `raw/`

---

[English](../../playbooks/space-knowledge-base.md)
