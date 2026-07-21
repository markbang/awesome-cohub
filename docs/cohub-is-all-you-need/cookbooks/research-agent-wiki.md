---
id: cohub.cb.research-agent-wiki
title: Research agent → wiki
type: cookbook
audience: [builder, agent]
difficulty: intermediate
related: [cohub.bp.space-knowledge-base, cohub.bp.social-research, cohub.bp.search-layers, cohub.bp.egress-proxy]
---

# Research agent → wiki

Turn fetch sessions into compounding understanding.

## Outcome

- Knowledge layout: `raw/` + `wiki/` + append-only log  
- At least one research pass written into wiki pages (not only raw dumps)  
- Optional: egress proxy + social/web skills

## Path

1. **Space + knowledge skeleton** — [space-knowledge-base](../playbooks/space-knowledge-base.md)

```text
raw/
wiki/
  index.md
  log.md
  topics/ entities/ analyses/
```

2. **Tools**  
   - Web: `hyper-search` (config) — [search-layers](../playbooks/search-layers.md)  
   - Social: `wgetx` — [social-research](../playbooks/social-research.md)  
   - Wikis: `wikis` / `fandom-cli`  
   - Blocked egress: [egress-proxy](../playbooks/egress-proxy.md) (`warp-proxy`)
3. **Ingest loop** (each batch)  
   - Write evidence under `raw/<source>/<date>/`  
   - Update **existing** wiki pages (5–10 touches)  
   - Append `wiki/log.md`  
   - Refresh `wiki/index.md`
4. **Save** milestones: `ingest-YYYYMMDD`, `wiki-topic-x-v1`.
5. Optional autonomy: [scheduled-loop](../playbooks/scheduled-loop.md) with **disk state** — not chat-only ([loop-without-disk-state](../anti-patterns/loop-without-disk-state.md)).

## Done when

- [ ] A new agent can answer from `wiki/index.md` without the original chat  
- [ ] Raw dumps are citeable evidence, not the only corpus  

## Avoid

- Pasting giant notes into every prompt  
- `+1` raw file with zero wiki updates  

---

[中文](../zh/cookbooks/research-agent-wiki.md)
