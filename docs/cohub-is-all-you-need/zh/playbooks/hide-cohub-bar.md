---
id: cohub.bp.hide-cohub-bar
title: 隐藏公开 Work 的 Cohub 底栏
type: playbook
---

# 隐藏公开 Work 的 Cohub 底栏

## 何时

希望公开 Work 页更像**你的产品**，而不是带 Cohub 底栏的外框（演示、商业壳尤其如此）。

## 结果

- 公开页 footer 的 Cohub bar 隐藏（或恢复显示）
- 隐藏时分享/OG 更偏 Work 自身品牌
- 明确需要 **Pro / Max** 的 presentation 权益

## 是什么

`hideCohubBar` 是 Work 的 **presentation** meta：

- 隐藏公开 Work 页的 Cohub **footer bar**
- 隐藏后分享 meta 更偏 minimal Work branding
- 分享图里的 root-relative 媒体按已发布内容 URL 解析

## 要求

| 需要 | 说明 |
|------|------|
| 套餐 | **Pro** 或 **Max**（计费 entitlement） |
| 面 | 已发布 Work（不是 raw 沙箱 / 静态资源 URL） |
| 身份 | username + space slug + work slug 已就绪 |

## UI

1. 打开 `/spaces/:spaceId/works/:workId`
2. 在 Work 详情 / 发布设置里找到 **Hide Cohub bar**
3. 打开公开 URL 硬刷新确认

## CLI

```bash
cohub -s <spaceId> works publish my-demo --dir dist --hide-cohub-bar --json
cohub -s <spaceId> works update <workId> --hide-cohub-bar --json
cohub -s <spaceId> works update <workId> --show-cohub-bar --json
```

## 完成标志

- [ ] 公开页无 Cohub footer（Pro/Max）
- [ ] 隐藏时分享标题/品牌偏 Work
- [ ] `--show-cohub-bar` / UI 可恢复

## 避免

- 免费档期望能藏 bar  
- 把 SPA 自己的壳和宿主 Cohub footer 搞混  
- 藏了 bar 仍把沙箱 URL 当产品  

---

[English](../../playbooks/hide-cohub-bar.md)
