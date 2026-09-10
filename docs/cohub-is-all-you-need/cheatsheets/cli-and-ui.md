---
id: cohub.cheat.cli-ui
title: CLI <-> UI map and common commands
type: cheatsheet
---

# CLI <-> UI map

| UI | CLI / API |
|----|-----------|
| Chat | Session |
| Save | Checkpoint |
| Tasks | Task runs / Task Browser |
| Scheduled prompt | `spaces prompt` schedule / cron jobs |
| Space files | `spaces files ...` |
| Apps (formerly Works) | `apps publish/ls/get/stats/download` |
| App Center | `.cohub/apps.json` and Marketplace App |
| App Actions | `apps actions run <app> <action>` |
| Space Activity | `spaces activity [days]` / `space.activity.get()` |
| Webhooks | `spaces webhooks ls/url/trigger` |
| Turns | `spaces turns ls` / `spaces turns intermediate` |
| Board | `boards batch/items/connections/effects/compositions/playback/transactions/export` |
| Command palette | `GET /api/palette/overview` plus local Recent/cache |

## Install CLI

```bash
npm install -g @neta-art/cohub-cli
cohub auth login
```

## Everyday

```bash
cohub spaces ls --json
cohub -s <spaceId> spaces prompt "Fix the failing tests" --json
cohub -s <spaceId> spaces files ls
cohub -s <spaceId> spaces files upload ./src
cohub -s <spaceId> run -- git status
cohub -s <spaceId> apps publish site --dir dist --json
cohub apps stats <appId|url> --json
cohub tasks ls --json
cohub -s <spaceId> spaces activity 30 --json
```

When no Space is given, commands resolve `-s`, then `COHUB_SPACE_ID`, then the account's Home Space — so `cohub prompt` / `cohub run` work right after login without flags.

## Board authoring

```bash
cohub boards inspect <board-or-path> --json
cohub boards capabilities <board-or-path> --json
cohub boards batch <board-or-path> --input changes.json --dry-run
cohub boards items get <board-or-path> <item-id> --json
cohub boards connections list <board-or-path> --json
cohub boards compositions get <board-or-path> <composition-id> --json
cohub boards playback play <board-or-path> <composition-id>
cohub boards transactions <board-or-path> --limit 50 --json
cohub boards export <board-or-path> --items title,hero --out selection.webp
```

## Apps, Actions, and webhooks

```bash
# Local source publish (auto-detected; explicit override)
cohub -s <spaceId> apps publish demo --dir ./dist --source local --json

# Run a published App Action
cohub apps actions run <app> <action> --input '{"text":"..."}' --json

# Declared webhooks
cohub -s <spaceId> spaces webhooks ls --json
cohub -s <spaceId> spaces webhooks url mail
cohub -s <spaceId> spaces webhooks trigger mail --body '{"messageId":"..."}'
```

## Turns

```bash
cohub spaces turns ls <spaceId> --author self --json
cohub spaces turns ls <spaceId> --session <sessionId> --direction older --json
cohub spaces turns intermediate <sessionId> <turnId> --json
```

## Preview and drive an App

```bash
cohub desktop open file://src/main.ts
cohub desktop open app://owner/space/app
cohub desktop open <appId|url|app://...|username/space/app>
cohub desktop open <app> --call selection.get
cohub desktop open <app> --as overlay
```

## Docs

- Product docs: https://cohub.live/docs
- Apps guide: https://cohub.live/docs/apps
- Changelog: https://cohub.live/changelog
- CLI guide: https://cohub.live/docs/developers/cli

---

[中文](../zh/cheatsheets/cli-and-ui.md)
