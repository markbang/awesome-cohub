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
| Board (v3) | `boards create/get/apply/history/schema/preset/export` plus `playback` transactions |
| Decision models | `cohub decision` / `space.decision()` · `.cohub/decisions.json` |
| Local Runtime | `cohub runtime up/status/down/logs/attach/detach/import` |
| Rooms | `cohub rooms connect/rtc` |
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
cohub models ls
cohub generate "isometric server room" -m <model> --json
```

When no Space is given, commands resolve `-s`, then `COHUB_SPACE_ID`, then the account's Home Space — so `cohub prompt` / `cohub run` work right after login without flags.

## Board v3

```bash
cohub boards create launch.board --title "Launch" --json
cohub boards get <board-or-path> --json
cohub boards schema --json
cohub boards preset rise --targets title --json
cohub boards apply <board-or-path> --input changes.json --dry-run --json
cohub boards history <board-or-path> --limit 20 --json
cohub boards playback play <board-or-path> --animation launch
cohub boards export <board-or-path> --items title,hero --paper dark --out selection.webp
```

`boards get` replaces `inspect`; `--paper` replaces `--background`; scripts replace Sketch blocks; active operations replace `capabilities`.

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

## Local Runtime and rooms

```bash
cohub runtime up -d --harness pi
cohub runtime status --json
cohub runtime logs --follow
cohub runtime attach
cohub runtime import <sandboxId> --space <spaceId>
cohub runtime down

cohub rooms connect <room> --after <sequence>
cohub rooms rtc
```

## Preview and drive an App

```bash
cohub desktop open file://src/main.ts
cohub desktop open app://owner/space/app
cohub desktop open <appId|url|app://...|username/space/app>
cohub desktop open <app> --call selection.get
cohub desktop open <app> --as overlay
cohub desktop open <app> --call image.open --data '{"id":"hero"}'
```

## Docs

- Product docs: https://cohub.live/docs
- Apps guide: https://cohub.live/docs/apps
- Changelog: https://cohub.live/changelog
- CLI guide: https://cohub.live/docs/developers/cli

---

[中文](../zh/cheatsheets/cli-and-ui.md)
