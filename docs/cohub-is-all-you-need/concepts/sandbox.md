---
id: cohub.concept.sandbox
title: Sandbox
type: concept
related: [cohub.concept.execution-token, cohub.cheat.paths-mounts]
sources:
  - https://cohub.live/changelog (v2.9, v2.22)
---

# Sandbox

A Sandbox is the runtime where a Space Agent executes commands, skills, previews, and filesystem operations. Paths, network, and identity are Sandbox-shaped, not your laptop's.

## Filesystem concurrency (v2.22)

- File writes are serialized per path.
- Versioned writes can include the expected size and `mtime`; stale overwrites fail with `CONFLICT` instead of silently losing a concurrent edit.
- `fs.edit` applies a batch of text replacements atomically under the same path lock.
- Read the current version, apply a small edit, and retry from fresh content after a conflict. Do not blindly overwrite a newer draft.

## Runtime assumptions

- Project files are under `/workspace`.
- Published config mounts under `/configs/*` are read-only.
- Mounted Mods are under `/mods/<slug>`.
- Agent tool calls carry an execution token for API identity.

## Practice

- [paths-and-mounts](../cheatsheets/paths-and-mounts.md)
- [execution-token](./execution-token.md)
- [egress-proxy](../playbooks/egress-proxy.md) when outbound network needs help

---

[中文](../zh/concepts/sandbox.md)
