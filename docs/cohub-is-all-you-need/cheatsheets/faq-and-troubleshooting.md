---
id: cohub.cheat.faq
title: FAQ and troubleshooting
type: cheatsheet
---

# FAQ and troubleshooting

## Skills and config

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| `/skill:foo` missing | Not installed in this Space / not published from config | Install into project or config Space + Save |
| Skill exists on disk, slash empty | Catalog/cache lag | Check [skill-catalog-cache](../playbooks/skill-catalog-cache.md); reopen Chat / wait for index |
| Scripts missing after install | Assets lived at repo root | Keep them under `skills/<name>/scripts/` |
| Wrong skill wins | Layer collision | platform -> mods -> user -> workspace |

## Works / Apps

| Symptom | Fix |
|---------|-----|
| Share link is a Sandbox host | Publish a Work/App; do not ship a raw Sandbox URL |
| Refresh 404 on routes | Static hosting + History API; use hash routing or prerender |
| White screen | Check `base: "./"`, asset paths, browser console, and rebuild `dist/` |
| File/dir publish rejected | File/directory limit or missing `index.html`; current limit is 1 GiB and directory count is 1-1000 |
| Target edited but public page is unchanged | Publish an explicit new version |
| Work preview turns blank after an update | Current preview should retain content on refresh failure; use its Retry action and inspect version state |
| `desktop open --call` does nothing | The App must register that exact method and be opened from an approved Cohub origin |
| Viewer API 403 | Check whether the call needs an App scope or a viewer grant on the target Space |
| `generation.create` succeeds but polling is 403 | Add/request `taskrun.view`; creation and result reading are separate permissions |
| Task Browser Mine view is empty | Request viewer-only `user.taskrun.list`; Space view uses `taskrun.view` instead |
| Commerce works only in preview | Use a published Work/App runtime; raw assets and local previews have no runtime context |

## Board

| Symptom | Fix |
|---------|-----|
| Legacy node/sequence payload rejected | Use semantic Items/Compositions and `boards capabilities` |
| Board mutation duplicated after retry | Reuse the same `mutationId`; inspect the receipt |
| Board mutation conflicts | Re-read the current version and retry with a fresh `baseVersion` |
| Composition renders differently after publish | Keep referenced assets in the Space and validate the semantic snapshot before publish |

## Files and identity

| Symptom | Fix |
|---------|-----|
| Concurrent edit was rejected | Handle `CONFLICT`: read the latest version, then use a smaller edit or `fs.edit` |
| API sees the wrong user | Check [execution-token-identity](../playbooks/execution-token-identity.md); execution scopes add to account access |
| Work re-implements login | Use the platform session/SDK |

## Autonomy

| Symptom | Fix |
|---------|-----|
| Loop forgets progress | Persist `runtime/state.json` or a wiki log |
| Agent wrecked the tree | Save/fork before high-autonomy work |
| Hook re-enters itself | Check `.cohub/**` ignores and `task.updated` filtering |

## Still stuck

1. Product docs: https://cohub.live/docs
2. [Paths and mounts](./paths-and-mounts.md)
3. [AGENT_BRIEF](../AGENT_BRIEF.md)

---

[中文](../zh/cheatsheets/faq-and-troubleshooting.md)
