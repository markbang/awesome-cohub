---
id: cohub.concept.sandbox
title: Sandbox
type: concept
related: [cohub.concept.execution-token, cohub.cheat.paths-mounts]
---

# Sandbox

Isolated runtime where the Space agent executes commands, skills, and previews.

## Why it matters

Paths, network, and identity are **sandbox-shaped**, not “your laptop”. Assume:

- Project files under `/workspace`
- Published config under `/configs/*` (read-only)
- Optional mods under `/mods/*`
- Execution token for API identity

## Practice

- [paths-and-mounts](../cheatsheets/paths-and-mounts.md)  
- [execution-token](./execution-token.md)  
- [egress-proxy](../playbooks/egress-proxy.md) when outbound network needs help  

---

[中文](../zh/concepts/sandbox.md)
