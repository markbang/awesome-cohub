---
id: cohub.ap.raw-sandbox-launch
title: 把原始 Sandbox URL 当上线入口
type: anti-pattern
related: [cohub.bp.publish-static-work, cohub.concept.work]
---

# 把原始 Sandbox URL 当上线入口

## 为什么有问题

原始 Sandbox 端点会受休眠和重启影响、不适合目标观众，也没有 App 的版本发布语义。

## 正确做法

发布 **App**（`file` / `directory`，谨慎使用 `port`），分享 `/:username/:spaceSlug/w/:appSlug`。

## 嗅探标准

如果 Sandbox 休眠后链接失效，它就不是上线入口。

---

[English](../../anti-patterns/raw-sandbox-launch.md)
