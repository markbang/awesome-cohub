---
id: cohub.concept.local-runtime
title: Local Runtime and native harnesses
type: concept
related:
  - cohub.concept.sandbox
  - cohub.concept.execution-token
  - cohub.bp.local-runtime
sources:
  - https://cohub.live/changelog (v2.51-v2.68)
  - https://github.com/talesofai/cohub/blob/main/docs/local-runtime.md
---

# Local Runtime and native harnesses

A **Local Runtime** connects a folder on your machine to a Space and runs turns on a local **Harness** (Pi or Codex). Sessions, turns, streaming, and resumption stay on the normal Cohub pipeline; model and tool execution happen on your machine.

`cohub runtime up` replaces the removed `cohub sandbox up`. Users choose a Harness, not a machine.

## Lifecycle

```bash
cohub auth login
cd ./project
cohub runtime up --harness pi --harness codex
cohub runtime status
cohub runtime logs --level warn -f
cohub runtime down
```

| Command | Purpose |
|---------|---------|
| `runtime up [dir]` | Create or reuse a Space, start the Runtime and selected Harnesses |
| `runtime status` | Local and server status, pending Turns, archive state |
| `runtime logs` | Redacted, machine-local JSONL diagnostics (`--follow`, `--level`, `--json`) |
| `runtime down` | Stop the Runtime; keeps Space, bindings, and native files |
| `runtime attach` / `detach` | Install/pause a harness integration without deleting data |
| `runtime import [dir]` | Import earlier local conversations, newest first (Ctrl-C pauses) |

`runtime up` remembers a Space per canonical directory, account, and environment. `-n` means `--new`; `--name` names the new Space; `--space` or `COHUB_SPACE_ID` overrides the directory binding.

## Native sync

A harness's own session file is the durable record and outbox; the server is the only ledger. There are no local delivery receipts. After a restart the Runtime asks which Turns the server already has and reads forward, so replay never duplicates. Sync is event-driven: a transcript is parsed only when a Turn begins or ends, not on a fixed poll.

- Pi connects through a self-contained extension; a Pi without it syncs read-only until `/reload`.
- Codex 0.156+ uses its shared app-server; if unavailable, Cohub runs a private `codex app-server --listen stdio://` and termina sessions sync read-only.
- Conflicting continuations fork at complete Turn boundaries; Codex rollout lineage (`history_base`) and `.zst` archives are followed so a rolled-over thread stays one Chat.
- Losing the transport does not abort local model or tool work; the durable result replays after reconnect.

## Platform notes

- **Node.js 24+** is required.
- **Windows**: install Git for Windows (or set `COHUB_BASH`), run from a non-elevated terminal, and expect named pipes for the sandboxd control channel. Terminal Codex syncs read-only there.
- **macOS**: native FSEvents file monitoring; screen sharing is offered by default on macOS and Linux X11. Use `--no-display` to opt out or `--display xvfb[:WxH]` for a virtual screen.
- Remote displays stream over WebRTC and can be watched or steered from the web; agents drive them through `cohub spaces displays`.

## Security boundary

Starting a Runtime requires explicit local-execution consent. Collaborators execute as your OS user, so an elevated terminal is refused. Harness integrations talk only to the Runtime's private IPC and never hold Cohub credentials.

---

[中文](../zh/concepts/local-runtime.md)
