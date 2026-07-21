---
id: cohub.ap.raw-sandbox-launch
title: Raw sandbox URL as launch
title_zh: 用裸沙箱 URL 当上线
type: anti-pattern
related: [cohub.bp.publish-static-work, cohub.concept.work]
---

# Raw sandbox URL as launch · 用裸沙箱 URL 当上线

## Why it hurts · 伤害
Unstable endpoints, wrong audience, hibernation/restarts, no versioned publish semantics.

## Do this instead · 正确做法
Publish a **Work** (`file` / `directory` / carefully `port`). Give people `/:user/:space/w/:work`.

## Smell test
If the link dies when the sandbox sleeps, it is not a launch link.
