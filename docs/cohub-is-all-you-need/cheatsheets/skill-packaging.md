---
id: cohub.cheat.skill-packaging
title: Skill packaging
type: cheatsheet
---

# Skill packaging

For repos installed with [`npx skills`](https://github.com/vercel-labs/skills).

## Pure skill repo layout

```text
my-skill-repo/
├── README.md
├── LICENSE
└── skills/
    └── my-skill/
        ├── SKILL.md          # required frontmatter name + description
        ├── scripts/          # optional — MUST be here to install
        ├── references/       # optional
        └── assets/           # optional
```

## Rules that bite

1. **Everything installable lives under `skills/<name>/`.**  
   Root-level `scripts/` are **not** copied → [anti-pattern](../anti-patterns/skill-assets-at-repo-root.md).
2. **`name` in frontmatter** = install id = `/skill:name`.
3. Prefer **no required package.json** when Node built-ins suffice; document optional peers (Playwright, ffmpeg).
4. Use `node:` imports and ESM (`.mjs`) when you want zero-install scripts.
5. README should show:

```bash
npx skills add https://github.com/<org>/<repo> \
  --skill "<name>" \
  --agent codex \
  --yes \
  --copy
```

6. **Config Space skills:** install → **Save** → consume from other Spaces as owner.
7. Do not ship secrets in the skill tree.

## Smoke test

```bash
rm -rf /tmp/skill-smoke && mkdir /tmp/skill-smoke && cd /tmp/skill-smoke
npx skills add <url> --skill <name> --agent codex --yes --copy
find .agents/skills/<name> -type f | sort
```

Confirm scripts/assets exist under `.agents/skills/<name>/`.

## Related ecosystem examples

- [warp-proxy-skill](https://github.com/markbang/warp-proxy-skill)  
- [wgetx-skill](https://github.com/markbang/wgetx-skill)  
- [wikis-skill](https://github.com/markbang/wikis-skill)  
- [cohub-work-skill](https://github.com/markbang/cohub-work-skill)  

---

[中文](../zh/cheatsheets/skill-packaging.md)
