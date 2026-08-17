---
id: cohub.meta.changelog
title: Series changelog
type: meta
---

# Cohub Is All You Need — changelog

This tracks **the guide**, not the Cohub product. Product changes: [cohub.run/changelog](https://cohub.run/changelog).

Assumptions are pinned to public docs + monorepo behavior at write time. When product drifts, prefer product docs and file a guide fix.






## v0.17 — 2026-08-17

Sync **v2.8–v2.21** major updates:

- **Board** v2.8–v2.21: Board connections (v2.16), task nodes + in-board media generation (v2.19), audio nodes (v2.20), native Board node contract (v2.21)
- **Realtime rooms** (v2.11): Works run multiplayer state via `client.work.realtime` with no backend
- **Work analytics** (v2.14): `cohub works stats`, `GET /api/works/:id/stats`, per-source view breakdown
- **Space task hooks** (v2.18): `task.updated` transition hooks
- **cohub.live domain** (v2.21): primary domain migrated to cohub.live; cohub.run is legacy secondary
- Updated board-runtime concept; new realtime-rooms concept
- Total: **32** Playbooks, **27** Concepts

## v0.16 — 2026-08-04

- Add [markbang/cohub-pr-skill](https://github.com/markbang/cohub-pr-skill) as single `pr-workflow` catalog entry (parallel PR development with git worktrees + one Cohub session per PR)
- Add [kjx-talesofai/claude-skill-rtb-advisor](https://github.com/kjx-talesofai/claude-skill-rtb-advisor) as single `rtb-advisor` catalog entry (brand strategist for "Reason to Believe")

## v0.15 — 2026-08-03

- Add [markbang/temp-mail-skill](https://github.com/markbang/temp-mail-skill) as single `temp-mail` catalog entry (disposable email via reusable.email / temp-mail.org)

## v0.14 — 2026-08-03

- Add **v2.5-v2.7** updates:
  - Space invitations & join links (`cohub spaces invites create/ls/revoke`, `/username/space-slug/join/<token>`)
  - Recoverable context compaction (v2.5): runs at any LLM round boundary, rolls back on failure
  - Space turn browsing (v2.6): `GET /api/spaces/:id/turns`, `cohub spaces turns ls`
  - 1 GiB Work publishes and 500 MB gateway attachments (v2.6)
  - Mod resources served from checkpoint snapshots + `COHUB_MODEL_PROVIDER` / `COHUB_MODEL_ID` in sandbox (v2.7/v2.6)
  - Mod skill provenance (v2.5) and live-workspace project skills (v2.7)
- Total: **32** Playbooks, **26** Concepts

## v0.13 — 2026-07-29

- Add **Board runtime v2.0-v2.4** updates (concept + playbook): PixiJS 2.5D infinite canvas, `file` nodes, live export (`cohub boards export`), and autoplay policy
- Add **Thinking level & Models status** concept: per-prompt `thinkingLevel` and live model availability metrics
- Update total count: **32** Playbooks, **23** Concepts

## v0.12 — 2026-07-22

- Add [talesofai/okp](https://github.com/talesofai/okp) to the ecosystem skill catalog as a single `okp` entry
- Record the required `@markbangwu/okp` CLI and sync EN/ZH catalogs

## v0.11 — 2026-07-21

- Add **`.cohub` layers & priority** (concept + playbook): models / space.json theme & new-chat background / hooks vs **`.agents/prompts` slash templates**
- Document merge order: skills & prompts `platform → mods → user → project`; models `platform → user`
- Sync config-layers cheatsheet, glossary, AGENT_BRIEF, learning path

## v0.10 — 2026-07-21

- Gap fill vs monorepo `talesofai/cohub` + product docs / changelog:
  - **hide Cohub bar** (`hideCohubBar`, Pro/Max, `--hide-cohub-bar`)
  - Work lifecycle (limits, version, disable, visibility)
  - Viewer auth + `user.*` scopes
  - Space members/roles/access
  - Space env + sandbox settings
  - Public identity slugs
- Concepts: `work-presentation`, `space-roles`
- FAQ Works rows expanded; matrix +6 playbooks (**30** total)

## v0.9 — 2026-07-21

- One-shot animated SVG banner (title → loop graph → freeze)
- EN/ZH i18n layout stabilized (`zh/` mirror)
- **Learning path**, **AGENT_BRIEF**, **glossary**, **cookbooks** (4), **FAQ**, **paths**, **skill packaging**
- Concepts: channel, task/schedule, sandbox, labels
- Anti-patterns: loop without disk state, Home dumping ground, skill assets at repo root, static Work as API
- Matrix **Role** column; samples index; series changelog
- Root awesome-cohub entry strengthened

## v0.8

- 24 playbooks · 14 concepts · config/search/execution-token deep dives
- Ecosystem skills: hyper-search, lark-lite, fandom-cli, wikis, wgetx, warp-proxy, work-kit

## v0.5–v0.7

- Manifesto, matrix, initial playbook/concept/anti-pattern/cheatsheet sets

---

[中文](./zh/CHANGELOG.md)
