---
id: cohub.ap.raw-sandbox-launch
title: Raw Sandbox URL as launch
type: anti-pattern
related: [cohub.bp.publish-static-work, cohub.concept.work]
---

# Raw Sandbox URL as launch

## Why it hurts

Raw Sandbox endpoints are unstable across hibernation and restarts, have the wrong audience, and do not provide App version semantics.

## Do this instead

Publish an **App** (`file` / `directory` / carefully `port`) and share `/:username/:spaceSlug/w/:appSlug`.

## Smell test

If the link dies when the Sandbox sleeps, it is not a launch link.

---

[中文](../zh/anti-patterns/raw-sandbox-launch.md)
