---
id: cohub.cb.config-skills-setup
title: Config skills setup
type: cookbook
audience: [builder, operator]
difficulty: starter
related: [cohub.bp.user-config-and-rules, cohub.bp.search-layers, cohub.bp.skill-slash-discovery]
---

# Config skills setup

Make your agent defaults follow you across Spaces.

## Outcome

- A Space with `name === "config"` (not Home)
- Rules / AGENTS published to `/configs/user`
- Core skills available via `/skill:` after **Save**

## Path

1. **Create/open config Space** — [user-config-and-rules](../playbooks/user-config-and-rules.md)  
   Do **not** use Home as config ([home-as-config](../anti-patterns/home-as-config.md)).
2. **Write rules** in that Space (`AGENTS.md` / user rules as product expects).
3. **Install skills into the config Space** (then Save):

```bash
npx skills add https://github.com/kjx-talesofai/claude-skill-hyper-search \
  --skill "hyper-search" --agent codex --yes --copy

npx skills add https://github.com/markbang/wikis-skill \
  --skill "wikis" --agent codex --yes --copy

# optional
npx skills add https://github.com/kjx-talesofai/claude-skill-lark-lite \
  --skill "lark-lite" --agent codex --yes --copy
```

4. **Save** the config Space (publish whitelist → `/configs/user`).
5. **Verify in another Space** (as owner):  
   - Path exists: `/configs/user/.agents/skills/hyper-search/SKILL.md`  
   - `/skill:hyper-search` resolves — [skill-slash-discovery](../playbooks/skill-slash-discovery.md)  
6. **Search mental model** — [search-layers](../playbooks/search-layers.md)

## Done when

- [ ] New project Space sees published skills without reinstall
- [ ] You never “fix config” by editing `/configs/user` in a project sandbox ([edit-configs-user](../anti-patterns/edit-configs-user-in-project.md))

## Avoid

- Dumping every skill you find ([mega-skill-dump](../anti-patterns/mega-skill-dump.md))  
- Forgetting Save after install  

---

[中文](../zh/cookbooks/config-skills-setup.md)
