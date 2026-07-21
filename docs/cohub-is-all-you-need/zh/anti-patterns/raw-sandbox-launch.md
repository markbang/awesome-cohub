---
id: cohub.ap.raw-sandbox-launch
title: 用裸沙箱 URL 当上线
type: anti-pattern
related: [cohub.bp.publish-static-work, cohub.concept.work]
---

# 用裸沙箱 URL 当上线

## 伤害
Unstable endpoints, wrong audience, hibernation/restarts, no versioned publish semantics.

## 正确做法
Publish a **Work** (`file` / `directory` / carefully `port`). Give people `/:user/:space/w/:work`.

## Smell test
If the link dies when the sandbox sleeps, it is not a launch link.

---

[English](../../anti-patterns/raw-sandbox-launch.md)
