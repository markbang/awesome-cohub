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
| Work（API 规范术语：App） | `apps publish/get/stats/download` |
| Board | `boards items/effects/compositions/export` |

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
```

## Board 编辑

```bash
cohub boards inspect <board> --json
cohub boards capabilities <board> --json
cohub boards items list <board> --json
cohub boards examples composition fade > intro.json
cohub boards compositions apply <board> --input intro.json --json
cohub boards export <board> --items title,hero -o selection.webp
```

## 预览与驱动 Work/App

```bash
cohub ui preview file://src/main.ts
cohub ui preview work://owner/space/app
cohub desktop open <work-or-file>
cohub desktop open <work> --call selection.get
```

## 文档

- 产品文档：https://cohub.live/docs
- Changelog：https://cohub.live/changelog
- CLI 指南：https://cohub.live/docs/developers/cli

---

[English](../../cheatsheets/cli-and-ui.md)
