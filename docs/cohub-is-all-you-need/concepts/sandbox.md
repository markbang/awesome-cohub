---
id: cohub.concept.sandbox
title: Sandbox
type: concept
related: [cohub.concept.execution-token, cohub.cheat.paths-mounts]
sources:
  - https://cohub.live/changelog (v2.9, v2.22, v2.51-v2.69)
---

# Sandbox

A Sandbox is the runtime where a Space Agent executes commands, skills, previews, and filesystem operations. Paths, network, and identity are Sandbox-shaped, not your laptop's.

## Filesystem concurrency (v2.22)

- File writes are serialized per path.
- Versioned writes can include the expected size and `mtime`; stale overwrites fail with `CONFLICT` instead of silently losing a concurrent edit.
- `fs.edit` applies a batch of text replacements atomically under the same path lock.
- Read the current version, apply a small edit, and retry from fresh content after a conflict. Do not blindly overwrite a newer draft.

## Local Runtime (v2.51+)

A Space can instead run on a **Local Runtime** bound to a folder on your machine (`cohub runtime up`), executing turns on local Pi or Codex Harnesses. Cloud Sandboxes remain the default when no Local Runtime is connected. See [Local Runtime](./local-runtime.md).

File watching uses the host's native backend (FSEvents on macOS, with a bounded scanner fallback), and an optional `cohub-search` binary can provide a workspace search index when present. Neither changes what a Space file is.

## Uploads

Durable file uploads share one set of caps and a per-user hourly quota: a single durable file may be up to **2 GiB**, a batch up to 2 GiB / 2000 files, and inline uploads up to 64 MiB. Published App targets have their own 1 GiB cap. Rejections carry machine-readable codes (`file_too_large`, `upload_batch_too_large`, `upload_too_many_files`, `upload_rate_limited`) and rate limits include `retryAfterSeconds`.

## Runtime assumptions

- Project files are under `/workspace`.
- Published config mounts under `/configs/*` are read-only.
- Mounted Mods are under `/mods/<slug>`.
- Agent tool calls carry an execution token for API identity.

## Practice

- [paths-and-mounts](../cheatsheets/paths-and-mounts.md)
- [local-runtime](./local-runtime.md)
- [execution-token](./execution-token.md)
- [egress-proxy](../playbooks/egress-proxy.md) when outbound network needs help

---

[中文](../zh/concepts/sandbox.md)
