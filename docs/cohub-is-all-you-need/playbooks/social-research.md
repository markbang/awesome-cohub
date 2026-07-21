---
id: cohub.bp.social-research
title: Social fetch into a Space knowledge base
type: playbook
audience: [builder, agent]
features: [skill, sandbox, files]
difficulty: intermediate
related: [cohub.bp.space-knowledge-base, cohub.bp.agent-with-skills, cohub.bp.egress-proxy]
sources:
  - https://github.com/markbang/wgetx-skill
---

# Social fetch into a Space knowledge base

## When

You need public social signals as evidence, then durable wiki understanding.

## Outcome

```text
raw/social/<platform>/<date>/...   # evidence JSON/media
wiki/topics/<topic>.md             # current understanding
wiki/log.md                        # append-only ingest record
wiki/index.md                      # catalog entry updated
```

## Steps

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

## Optional browser flows

Some platforms need Playwright. Only then:

```bash
cd .agents/skills/wgetx
npm init -y && npm i playwright && npx playwright install chromium
```

## Done when

- [ ] Raw evidence paths stable
- [ ] Wiki pages updated (not only raw dump)
- [ ] Log + index refreshed
- [ ] Rate limits / ToS caution noted when relevant

## Avoid

- Giant one-off JSON dumps with no distillation
- Storing cookies/tokens in git-tracked raw files
- Treating chat paste of hot lists as the archive

---

[中文](../zh/playbooks/social-research.md)
