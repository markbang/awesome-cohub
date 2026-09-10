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
| `apps publish` says the target is missing | `--file` / `--dir` resolve against a source; inside a Sandbox that is the workspace, elsewhere it is the local machine. Pass `--source workspace` or `--source local` explicitly |
| Target edited but public page is unchanged | Publish an explicit new version |
| Work preview turns blank after an update | Current preview should retain content on refresh failure; use its Retry action and inspect version state |
| `desktop open --call` does nothing | The App must register that exact method and be opened from an approved Cohub origin |
| Viewer API 403 | Check whether the call needs an App scope or a viewer grant on the target Space |
| `generation.create` succeeds but polling is 403 | Add/request `taskrun.view`; creation and result reading are separate permissions |
| Task Browser Mine view is empty | Request viewer-only `user.taskrun.list`; Space view uses `taskrun.view` instead |
| Commerce works only in preview | Use a published Work/App runtime; raw assets and local previews have no runtime context |
| Checkout returned but the UI does not confirm | Success is confirmed against the order/subscription state; a forged or stale return URL no longer claims a purchase |
| App is missing from the Space Apps panel | Check `.cohub/apps.json`, the installed entry's `enabled` flag, and Marketplace permissions |
| App install overwrites someone else's change | Reload the manifest and retry with the latest file revision; do not replace a stale snapshot |
| Space Activity costs are zero | Cost fields are intentionally redacted for viewers without Space-management access |
| Command palette default list flickers | Let the local/IndexedDB cache render first; inspect the overview request only if the stale snapshot cannot refresh |

## App surfaces and Actions

| Symptom | Fix |
|---------|-----|
| Overlay opens but nothing is clickable | `inputRegion` defaults to `"none"`; call `cohub.app.requestConfigure()` from the App. Use `geometry` + `"all"` for fixed panels, rects for moving elements (rects respond to hover, not the first touch tap) |
| Overlay looks opaque or blurs constantly | Paint transparency (`html, body { background: transparent }`), declare `<meta name="color-scheme" content="light dark">`, and avoid `backdrop-filter` |
| An overlay silently became a window | The overlay cap (8) was reached; dismiss overlays with `Escape` or ask each App to `requestClose()` |
| Embedded App cannot close itself | `cohub.app.requestClose()` relays to the embedder's `onCloseRequest`; the embedder must pass that callback and be a verified host |
| `app.actions.run()` fails immediately | Check the action key (`[a-z0-9_-]`), that exactly one entrypoint matches in the published version, and that the artifact is a directory App |
| Action fails with timeout/abort/exit code | Reasons are reported via the shared execution-source contract; inspect the Task Run. Actions cannot call `actions.run()` recursively |
| Action input shows up in a Task Run | Expected: input is stored with the run and visible to the owner and Space members who can inspect tasks. Do not pass secrets |

## Hooks and webhooks

| Symptom | Fix |
|---------|-----|
| Webhook returns 404 | The endpoint name is the hook file stem: `.cohub/hooks/mail.yml` -> `POST /api/spaces/:id/webhooks/mail`, with `on.event: webhook` |
| Webhook rejects the request | Check `on.secret` (`x-cohub-webhook-secret` or `?secret=`); webhooks are also rate-limited per Space |
| A webhook hook never runs after a restore | `space.workspace.ready` refreshes the hook cache; a workspace that is still missing is not cached as "no hooks" |
| `uses:` hook fails | The target must be a published App Action (`owner/space/app/action`); see [App Actions](../concepts/app-actions.md) |
| Hook re-enters itself | Check `.cohub/**` ignores and `task.updated` filtering |

## Board

| Symptom | Fix |
|---------|-----|
| Legacy node/sequence payload rejected | Use semantic Items/Compositions and `boards capabilities` |
| Old `frame` envelope rejected | Author with `position` / `size` / `rotation`; draw and arrow geometry is world-space and frames are derived |
| Board batch fails with a diagnostic | Fix the reported authoring path (for example `items.0.props.text`) before retrying |
| Board API error lacks context | Capture the stable error code, diagnostics, and `requestId` |
| Board animation update refetches unnecessarily | Apply the `animationPatch` from `board.changed` when the update is a pure effect/composition patch |
| Replay throws "needs the first transactions page" | Load the newest page first; it carries the snapshot. Use `--operations` for inverses and snapshot rows |
| Board mutation duplicated after retry | Reuse the same `mutationId`; inspect the receipt |
| Board mutation conflicts | Re-read the current version and retry with a fresh `baseVersion` |
| Composition renders differently after publish | Keep referenced assets in the Space and validate the semantic snapshot before publish |

## Files, tasks, and identity

| Symptom | Fix |
|---------|-----|
| Concurrent edit was rejected | Handle `CONFLICT`: read the latest version, then use a smaller edit or `fs.edit` |
| Concurrent upload rejected | Uploads detect and reject concurrent local edits via snapshot validation; re-read the file and retry |
| Edit fails after harmless formatting drift | Retry with the normalized current snapshot; recoverable edits tolerate line endings, BOM, and trailing whitespace, but ambiguous matches still fail |
| Command output appears incomplete | Check the explicit truncation flag/details before treating the output as a complete result |
| CLI updates while a command is running | Self-updates are detached and apply on the next invocation; set `COHUB_CLI_AUTO_UPDATE=0` to disable them |
| Task run hides command/result fields | Permission-based privacy: viewers without Space data access see execution fields and billing redacted. Full runs require viewing the Space |
| API sees the wrong user | Check [execution-token-identity](../playbooks/execution-token-identity.md); execution scopes add to account access |
| Work re-implements login | Use the platform session/SDK |

## Autonomy

| Symptom | Fix |
|---------|-----|
| Loop forgets progress | Persist `runtime/state.json` or a wiki log |
| Agent wrecked the tree | Save/fork before high-autonomy work |

## Still stuck

1. Product docs: https://cohub.live/docs
2. [Paths and mounts](./paths-and-mounts.md)
3. [AGENT_BRIEF](../AGENT_BRIEF.md)

---

[中文](../zh/cheatsheets/faq-and-troubleshooting.md)
