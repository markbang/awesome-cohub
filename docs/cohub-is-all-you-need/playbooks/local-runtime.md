---
id: cohub.bp.local-runtime
title: Run a Space on a local Runtime
type: playbook
audience: [builder, operator, agent-author]
features: [runtime, harness, local, cli, files]
difficulty: intermediate
related:
  - cohub.concept.local-runtime
  - cohub.concept.sandbox
  - cohub.concept.execution-token
sources:
  - https://github.com/talesofai/cohub/blob/main/docs/local-runtime.md
  - https://cohub.live/changelog (v2.51-v2.68)
---

# Run a Space on a local Runtime

## When

You want a Space to run turns on a local Pi or Codex Harness against a folder on your machine, while keeping sessions, files, and history in Cohub.

## Outcome

- One local Runtime is bound to the project directory and a Space.
- Selected Harnesses run turns locally; remote turns can still stream, stop, and resume.
- Native Pi/Codex conversations sync as ordinary Chats, with earlier ones importable.

## Steps

### A. Prepare

- Node.js **24+**.
- Install and authenticate Pi and/or Codex locally. Cohub never silently switches executors.
- On Windows: install Git for Windows (or set `COHUB_BASH`) and use a **non-elevated** terminal.

### B. Start the Runtime

```bash
cohub auth login
cd ./project
cohub runtime up --harness pi --harness codex
```

The first start asks for a Space name; later starts default to reusing the directory binding.

Useful variants:

```bash
cohub runtime up -d                  # background
cohub runtime up -n --name project-next
cohub runtime up --space <space-id> --harness codex
cohub runtime up --no-display        # skip screen sharing
cohub runtime up --display xvfb:1920x1080
```

`-n` is the boolean shorthand for `--new`; `--name` sets the name. `--yes` accepts defaults and the local-execution consent. `--pi` / `--codex` point at explicit executables.

### C. Verify

```bash
cohub runtime status
cohub runtime logs --level warn -f
cohub spaces prompt "Continue" --harness codex
```

`status` reports connection state, sync enablement, pending turns per Harness, and archive state. Harness capability or authentication failures stay explicit.

### D. Import earlier conversations

```bash
cohub runtime import --dry-run
cohub runtime import --harness codex --concurrency 4
```

Imports run newest-first, stream progress, can be paused with Ctrl-C, and preserve original timestamps and local transcripts.

### E. Stop without losing data

```bash
cohub runtime down
```

This keeps the Space, directory binding, and native files. Use `runtime detach` to pause native sync while keeping all data.

## Design notes

- The harness session file is the durable record and outbox; the server is the only ledger. Reconnecting asks the server what it already has, so replay never duplicates.
- Sync is event-driven (turn begin/end), not a fixed poll.
- Losing the transport does not abort local work; the durable result replays after reconnect.
- Codex 0.156+ uses its shared app-server; otherwise Cohub runs a private app-server and terminal sessions sync read-only.
- Configurable endpoints: the SDK takes `webBaseUrl`, the CLI takes `--base-url` plus environment overrides; logins, Home Space caches, and directory bindings are isolated per API base URL.

## Done when

- [ ] `runtime status` shows the expected Harness and sync state
- [ ] A prompt sent from the web or CLI runs on the local Harness
- [ ] Earlier native conversations import without duplicates
- [ ] `runtime down` stops cleanly and a restart reuses the same Space
- [ ] No credentials live in Harness configs

## Avoid

- Running `runtime up` from an elevated/administrator terminal
- Assuming terminal Codex can be driven on Windows (it syncs read-only)
- Deleting native session files as "cache" — they are the durable record
- Rebinding a directory while an old Runtime still runs; stop it first

---

[中文](../zh/playbooks/local-runtime.md)
