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
| App Actions | `apps actions run <app> <action>` |
| Space Activity | `spaces activity [days]` / `space.activity.get()` |
| Webhooks | `spaces webhooks ls/url/trigger` |
| Turns | `spaces turns ls` / `spaces turns intermediate` |
| Board | `boards batch/items/connections/effects/compositions/playback/transactions/export` |
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

未指定 Space 时，命令按 `-s` -> `COHUB_SPACE_ID` -> 账号 Home Space 的顺序解析，因此登录后直接运行 `cohub prompt` / `cohub run` 也能工作。

## Board 编辑

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

## Apps、Actions 与 webhook

```bash
# 本地来源发布（自动推断，可显式指定）
cohub -s <spaceId> apps publish demo --dir ./dist --source local --json

# 运行已发布 App Action
cohub apps actions run <app> <action> --input '{"text":"..."}' --json

# 已声明的 webhook
cohub -s <spaceId> spaces webhooks ls --json
cohub -s <spaceId> spaces webhooks url mail
cohub -s <spaceId> spaces webhooks trigger mail --body '{"messageId":"..."}'
```

## 回合

```bash
cohub spaces turns ls <spaceId> --author self --json
cohub spaces turns ls <spaceId> --session <sessionId> --direction older --json
cohub spaces turns intermediate <sessionId> <turnId> --json
```

## 预览与驱动 App

```bash
cohub desktop open file://src/main.ts
cohub desktop open app://owner/space/app
cohub desktop open <appId|url|app://...|username/space/app>
cohub desktop open <app> --call selection.get
cohub desktop open <app> --as overlay
```

## 文档

- 产品文档：https://cohub.live/docs
- Apps 指南：https://cohub.live/docs/apps
- Changelog：https://cohub.live/changelog
- CLI 指南：https://cohub.live/docs/developers/cli

---

[English](../../cheatsheets/cli-and-ui.md)
