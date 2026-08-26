---
id: cohub.concept.thinking-level-and-models-status
title: Per-prompt thinking level & live model status
type: concept
related:
  - cohub.concept.user-config-space
  - cohub.bp.dot-cohub-layers
sources:
  - https://cohub.live/changelog (v1.108 - v1.110)
---

# Per-prompt thinking level & live model status

Cohub provides fine-grained control over model reasoning (`thinkingLevel`) and real-time operational health probes (`/api/models/status`).

## Per-prompt thinking level

You can set `thinkingLevel` per prompt in the composer, API, SDK, or CLI:

- **Flow**: Composer selector → turn metadata → Worker/Agent runtime → model provider.
- **Persistence**: Persists on turn metadata for multi-client recovery and continuation stability.

## Real-time model availability

The model selector displays live status dots and heartbeat metrics:

- **Telemetry**: Aggregates observed traffic success rates and 8-hour heartbeat probes via Redis.
- **Status levels**: `operational`, `degraded`, or `outage`.

---

[中文](../zh/concepts/thinking-level-and-models-status.md)
