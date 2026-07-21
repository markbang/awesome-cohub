---
id: cohub.concept.search-layers
title: Search layers
title_zh: 搜索分层
type: concept
related: [cohub.bp.search-layers, cohub.concept.user-config-space]
---

# Search layers · 搜索分层

1. **Product search** — built-in Cohub resource search (`/api/search`, command palette): spaces, chats, turns, labels…
2. **Workspace knowledge** — files in a Space (wiki/raw/code); tools like `rg`, not a hosted RAG product
3. **Web search** — **not** a core Cohub product feature; use an Agent skill

**Recommended web skill for config Space:**  
[hyper-search](https://github.com/kjx-talesofai/claude-skill-hyper-search)

Publish path: config Space (name=`config`) → Save → `/configs/user/.agents/skills/hyper-search`.
