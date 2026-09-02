---
id: cohub.bp.public-identity-slugs
title: 用户名、Space slug 与 App URL
type: playbook
audience: [builder]
features: [profile, space, work, app]
difficulty: starter
related: [cohub.bp.publish-static-work, cohub.bp.work-lifecycle, cohub.concept.work]
sources:
  - https://cohub.live/docs/workspace/spaces
  - https://cohub.live/docs/apps
  - https://github.com/talesofai/cohub/blob/main/docs/apps-guide.md
---

# 用户名、Space slug 与 App URL

## 何时使用

发布失败，或无法生成公开 App 链接。

## 结果

- 已设置账号 username、Space slug 与 App slug。
- 了解这些值可以修改，但设置后不能清空。

## URL 形状

```text
/:username/:spaceSlug/w/:appSlug
```

其中 `/w/` 片段为兼容原 Work 术语而保留；公开个人页使用 `/:username`。

## 步骤

1. 在账号/个人资料设置中设置 username。
2. 在 Space 设置中设置易读且稳定的 slug。
3. 发布时选择 App slug（如 `pitch`、`v1`、`docs-demo`）。
4. 如果 API 拒绝创建或发布，先检查 username 与 Space slug。
5. 需要时用规范引用解析 App：
   ```bash
   cohub apps resolve <app-slug> --owner <username> --space-slug <space-slug> --json
   ```

## 完成标准

- [ ] `apps.get` / publish 返回真实的 `publicUrl`
- [ ] 链接在隐私窗口中可以打开
- [ ] slug 指向预期 App，而不是临时预览

## 避免

- 使用会破坏分享的 Unicode slug
- 打印或嵌入 URL 后随意改名

---

[English](../../playbooks/public-identity-slugs.md)
