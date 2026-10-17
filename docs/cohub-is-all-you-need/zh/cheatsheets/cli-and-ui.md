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
| Board（v3） | `boards create/get/apply/history/schema/preset/export` 与 `playback` 事务 |
| Decision 模型 | `cohub decision` / `space.decision()` · `.cohub/decisions.json` |
| Local Runtime | `cohub runtime up/status/down/logs/attach/detach/import` |
| Rooms | `cohub rooms connect/rtc` |
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
cohub models ls
cohub generate "isometric server room" -m <model> --json
```

未指定 Space 时，命令按 `-s` -> `COHUB_SPACE_ID` -> 账号 Home Space 的顺序解析，因此登录后直接运行 `cohub prompt` / `cohub run` 也能工作。

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

`boards get` 取代 `inspect`；`--paper` 取代 `--background`；脚本取代 Sketch 块；active operations 取代 `capabilities`。

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

## Local Runtime 与房间

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

## 预览与驱动 App

```bash
cohub desktop open file://src/main.ts
cohub desktop open app://owner/space/app
cohub desktop open <appId|url|app://...|username/space/app>
cohub desktop open <app> --call selection.get
cohub desktop open <app> --as overlay
cohub desktop open <app> --call image.open --data '{"id":"hero"}'
```

## 文档

- 产品文档：https://cohub.live/docs
- Apps 指南：https://cohub.live/docs/apps
- Changelog：https://cohub.live/changelog
- CLI 指南：https://cohub.live/docs/developers/cli

---

[English](../../cheatsheets/cli-and-ui.md)
