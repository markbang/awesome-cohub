---
title: CLI ↔ UI map & common commands
id: cohub.cheat.cli-ui
type: cheatsheet
---

# CLI ↔ UI map

| UI | CLI / API |
|----|-----------|
| Chat | Session |
| Save | Checkpoint |
| Tasks | Task runs |
| Scheduled prompt | `spaces prompt` schedule / cron jobs |
| Space files | `spaces files …` |
| Work | `works publish/ls/get` |

## Install CLI

```bash
npm install -g @neta-art/cohub-cli
cohub auth login
```

## Everyday

```bash
cohub spaces ls --json
cohub -s <spaceId> spaces prompt "…" --json
cohub -s <spaceId> spaces files ls
cohub -s <spaceId> spaces files upload ./src
cohub -s <spaceId> run -- git status
cohub -s <spaceId> works publish site --dir dist --json
cohub -s <spaceId> works ls --json
```

## Docs

- Product docs: https://cohub.run/docs
- Changelog: https://cohub.run/changelog
- CLI guide: https://cohub.run/docs/developers/cli

---

[English](../../cheatsheets/cli-and-ui.md)
