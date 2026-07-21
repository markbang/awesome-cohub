---
id: cohub.ap.raw-sandbox-launch
title: Raw sandbox URL as launch
type: anti-pattern
related: [cohub.bp.publish-static-work, cohub.concept.work]
---

# Raw sandbox URL as launch

## Why it hurts
Unstable endpoints, wrong audience, hibernation/restarts, no versioned publish semantics.

## Do this instead
Publish a **Work** (`file` / `directory` / carefully `port`). Give people `/:user/:space/w/:work`.

## Smell test
If the link dies when the sandbox sleeps, it is not a launch link.

---

[中文](../zh/anti-patterns/raw-sandbox-launch.md)
