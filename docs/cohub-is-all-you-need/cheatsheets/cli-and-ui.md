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
| Work (canonical API: App) | `apps publish/get/stats/download` |
| Board | `boards items/effects/compositions/export` |

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
```

## Board authoring

```bash
cohub boards inspect <board> --json
cohub boards capabilities <board> --json
cohub boards items list <board> --json
cohub boards examples composition fade > intro.json
cohub boards compositions apply <board> --input intro.json --json
cohub boards export <board> --items title,hero -o selection.webp
```

## Preview and drive a Work/App

```bash
cohub ui preview file://src/main.ts
cohub ui preview work://owner/space/app
cohub desktop open <work-or-file>
cohub desktop open <work> --call selection.get
```

## Docs

- Product docs: https://cohub.live/docs
- Changelog: https://cohub.live/changelog
- CLI guide: https://cohub.live/docs/developers/cli

---

[中文](../zh/cheatsheets/cli-and-ui.md)
