---
id: cohub.bp.social-research
title: Social fetch into a Space knowledge base
title_zh: 社媒采集写入 Space 知识库
type: playbook
audience: [builder, agent]
features: [skill, sandbox, files]
difficulty: intermediate
related: [cohub.bp.space-knowledge-base, cohub.bp.agent-with-skills, cohub.bp.egress-proxy]
sources:
  - https://github.com/markbang/wgetx-skill
---

# Social fetch into a Space knowledge base · 社媒采集写入 Space 知识库

## When · 何时用

EN: You need public social signals as evidence, then durable wiki understanding.
中文：需要公开社媒信号作证据，并沉淀成可复利的 wiki 理解。

## Outcome · 结果

```text
raw/social/<platform>/<date>/...   # evidence JSON/media
wiki/topics/<topic>.md             # current understanding
wiki/log.md                        # append-only ingest record
wiki/index.md                      # catalog entry updated
```

## Steps · 步骤

### EN
1. Install wgetx (pure ESM; no npm for default HTTP scrapers):
   ```bash
   npx skills add https://github.com/markbang/wgetx-skill \
     --skill wgetx --agent codex --yes --copy
   ```
2. Smoke with tiny limits:
   ```bash
   node .agents/skills/wgetx/scripts/weibo/weibo.mjs hot 5
   ```
3. Copy/move outputs into `raw/social/...` (treat as immutable evidence).
4. Distill: update topic pages with Fact / Interpretation / Unknown / links to raw files.
5. Append `wiki/log.md` with query, time range, commands, file paths.
6. Update `wiki/index.md`.
7. If egress is blocked, use WARP playbook first — don’t invent random proxies.

### 中文
1. 安装 wgetx（默认纯 ESM，HTTP 采集无需 npm）。
2. 小限制冒烟（示例同上）。
3. 产物归入 `raw/social/...`，当作不可变证据。
4. 蒸馏进 topic 页：事实 / 解释 / 未知 / 链回 raw。
5. `wiki/log.md` 追加：查询、时间窗、命令、路径。
6. 更新 `wiki/index.md`。
7. 出口受限先走 WARP 实践卡，不临时乱挂代理。

## Optional browser flows · 可选浏览器流

Some platforms need Playwright. Only then:

```bash
cd .agents/skills/wgetx
npm init -y && npm i playwright && npx playwright install chromium
```

## Done when · 完成标准

- [ ] Raw evidence paths stable
- [ ] Wiki pages updated (not only raw dump)
- [ ] Log + index refreshed
- [ ] Rate limits / ToS caution noted when relevant

## Avoid · 别这样做

- Giant one-off JSON dumps with no distillation
- Storing cookies/tokens in git-tracked raw files
- Treating chat paste of hot lists as the archive
