---
id: cohub.bp.hide-cohub-bar
title: 隐藏公开 App 的 Cohub 底栏
type: playbook
audience: [builder]
features: [work, app, billing, presentation]
difficulty: starter
related: [cohub.bp.publish-static-work, cohub.bp.work-kit-product, cohub.concept.work]
sources:
  - https://cohub.live/docs/apps
  - https://github.com/talesofai/cohub/blob/main/docs/apps-guide.md
  - https://cohub.live/changelog
---

# 隐藏公开 App 的 Cohub 底栏

## 何时使用

希望已发布 App 页面更像你的产品，而不是 Cohub 宿主外框，尤其适合精致 Demo 与商业化壳。

## 结果

- 公开 App 底部栏可以隐藏或恢复。
- 分享和 OG 元数据遵循 App 的呈现设置。
- 明确该选项需要 **Pro / Max** 权益。

## 是什么

`hideCohubBar` 是 App 的呈现元数据。它隐藏公开 App 页的 Cohub 底栏，不会移除 App runtime，也不会替代你自己的导航。

## 要求

| 需要 | 说明 |
|------|------|
| 套餐 | **Pro** 或 **Max** Billing 权益 |
| 界面 | 已发布 App，不是原始 Sandbox 或静态资源 URL |
| 身份 | username、Space slug 与 App slug 已设置 |

## CLI

```bash
# 发布时设置
cohub -s <spaceId> apps publish my-demo --dir dist --hide-cohub-bar --json

# 更新已有 App
cohub -s <spaceId> apps update <appId> --hide-cohub-bar --json
cohub -s <spaceId> apps update <appId> --show-cohub-bar --json
```

旧客户端中的 `works` 命令写法仍可能作为兼容别名存在。

## 完成标准

- [ ] Pro/Max 公开 App 页没有 Cohub 底栏
- [ ] 隐藏时分享标题和品牌偏 App 自身
- [ ] `--show-cohub-bar` 或 UI 可以恢复底栏

## 避免

- 没有对应权益时期待免费隐藏
- 把 App 自己的 UI 和 Cohub 宿主底栏混淆
- 隐藏底栏后仍分享原始 Sandbox URL

---

[English](../../playbooks/hide-cohub-bar.md)
