---
id: cohub.cheat.cli-ui
title: CLI ↔ UI 与常用命令
type: cheatsheet
---

# CLI ↔ UI 映射

| UI | CLI / API |
|----|-----------|
| Chat | Session |
| Save | Checkpoint |
| Tasks | Task runs / Task Browser |
| Scheduled prompt | `spaces prompt` schedule / cron jobs |
| Space 文件 | `spaces files ...` |
| Apps（原 Work） | `apps publish/ls/get/stats/download` |
| App Center | `.cohub/apps.json` 与 Marketplace App |
| Space Activity | `spaces activity [days]` / `space.activity.get()` |
| Board | `boards batch/items/connections/effects/compositions/playback/export` |
| Command palette | `GET /api/palette/overview` 与本地 Recent/缓存 |

## 安装 CLI

```bash
npm install -g @neta-art/cohub-cli
cohub auth login
```

## 日常操作

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

## Board 编辑

```bash
cohub boards inspect <board-or-path> --json
cohub boards capabilities <board-or-path> --json
cohub boards batch <board-or-path> --input changes.json --dry-run
cohub boards items get <board-or-path> <item-id> --json
cohub boards connections list <board-or-path> --json
cohub boards compositions get <board-or-path> <composition-id> --json
cohub boards playback play <board-or-path> <composition-id>
cohub boards export <board-or-path> --items title,hero --out selection.webp
```

## 预览与驱动 App

```bash
cohub desktop open file://src/main.ts
cohub desktop open app://owner/space/app
cohub desktop open <appId|url|app://...|username/space/app>
cohub desktop open <app> --call selection.get
```

## 文档

- 产品文档：https://cohub.live/docs
- Apps 指南：https://cohub.live/docs/apps
- Changelog：https://cohub.live/changelog
- CLI 指南：https://cohub.live/docs/developers/cli

---

[English](../../cheatsheets/cli-and-ui.md)
