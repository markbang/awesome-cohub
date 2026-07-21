---
id: cohub.cheat.faq
title: FAQ & troubleshooting
type: cheatsheet
---

# FAQ & troubleshooting

## Skills

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| `/skill:foo` missing | Not installed in this Space / not published from config | Install into project **or** config Space + **Save**; see [skill-slash-discovery](../playbooks/skill-slash-discovery.md) |
| Skill exists on disk, slash empty | Catalog/cache lag | [skill-catalog-cache](../playbooks/skill-catalog-cache.md); reopen chat / wait for index |
| Scripts missing after `npx skills add` | Assets lived at repo root | [skill-packaging](./skill-packaging.md) · [skill-assets-at-repo-root](../anti-patterns/skill-assets-at-repo-root.md) |
| Wrong skill wins | Name collision in merge order | platform → mods → user → workspace; rename or override intentionally |

## Config publish

| Symptom | Fix |
|---------|-----|
| Edited `/configs/user` and it reset | Mount is **read-only publish**; edit **config Space** + Save ([edit-configs-user](../anti-patterns/edit-configs-user-in-project.md)) |
| Used Home as config | Create `name=config` Space ([home-as-config](../anti-patterns/home-as-config.md)) |
| Skills installed but other Spaces lack them | Forgot Save on config Space |

## Works

| Symptom | Fix |
|---------|-----|
| Share link is sandbox host | Publish a **Work**; don’t ship raw sandbox ([raw-sandbox-launch](../anti-patterns/raw-sandbox-launch.md)) |
| Refresh 404 on routes | Static hosting + History API — use hash/prerender ([browser-router-static](../anti-patterns/browser-router-static.md)) |
| White screen | Check `base: "./"`, asset paths, browser console; rebuild `dist/` |
| 401 / scope errors | Tighten to required scopes only; re-publish ([minimal-scopes](../playbooks/minimal-scopes.md)) |
| Commerce “works” only on preview | Need runtime Work ([commerce-on-static-preview](../anti-patterns/commerce-on-static-preview.md)) |

## Network / fetch

| Symptom | Fix |
|---------|-----|
| Outbound blocked / geo issues | [egress-proxy](../playbooks/egress-proxy.md) + `warp-proxy` |
| wgetx / browser skills fail | Playwright browsers installed? ffmpeg/whisper only if you use those flags |

## Identity

| Symptom | Fix |
|---------|-----|
| API thinks wrong user | [execution-token-identity](../playbooks/execution-token-identity.md) — token ≠ browser cookie story |
| Work re-implements login | Use platform session/SDK ([rebuild-auth-in-work](../anti-patterns/rebuild-auth-in-work.md)) |

## Autonomy

| Symptom | Fix |
|---------|-----|
| Loop forgets progress | Persist `runtime/state.json` / wiki log ([loop-without-disk-state](../anti-patterns/loop-without-disk-state.md)) |
| Agent wrecked the tree | Save/fork before autonomy ([no-save-before-autonomy](../anti-patterns/no-save-before-autonomy.md)) |

## Still stuck

1. Product docs: https://cohub.run/docs  
2. [Paths & mounts](./paths-and-mounts.md)  
3. [AGENT_BRIEF](../AGENT_BRIEF.md)  

---

[中文](../zh/cheatsheets/faq-and-troubleshooting.md)
