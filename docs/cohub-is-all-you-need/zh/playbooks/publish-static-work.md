---
id: cohub.bp.publish-static-work
title: 发布静态 App
type: playbook
audience: [builder, agent]
features: [work, app, files, save]
difficulty: starter
related: [cohub.concept.work, cohub.bp.minimal-scopes, cohub.bp.work-kit-product, cohub.bp.hide-cohub-bar, cohub.bp.work-lifecycle, cohub.bp.public-identity-slugs]
sources:
  - https://cohub.live/docs/apps
  - https://github.com/talesofai/cohub/blob/main/docs/apps-guide.md
---

# 发布静态 App

## 何时使用

希望别人打开页面或站点，而不需要进入你的 Sandbox。

## 结果

- 公开 URL 为 `/:username/:spaceSlug/w/:appSlug`
- 从稳定的 Space 目标发布版本
- 只提供最小直接 App scopes；纯静态 HTML 通常无需特殊权限

## 步骤

1. 先为干净的工作区创建 **Save**。
2. 选择目标：
   - **file** - 单个 `.html` / `.htm` 页面或其他受支持文件
   - **directory** - 有 `index.html` 和**相对**资源的站点（`base: "./"`）
3. SPA 使用 **HashRouter**（或 hash 链接）；静态托管上的 History API 路由会出错。
4. 从 UI 或 CLI 发布：
   ```bash
   cohub -s <spaceId> apps publish site --dir dist \
     --app-scope file.view --json
   ```
   `--dir` 是目标 Space 工作区的相对路径，不是运行 CLI 的本机路径。
5. 打开公开 App URL，而不是原始资源 URL，确认资源加载。
6. 把 URL 与权限清单写入 Space 的 `README.md`。

## 呈现

Pro/Max 可以隐藏公开 Cohub 底栏：

```bash
cohub -s <spaceId> apps publish site --dir dist --hide-cohub-bar --json
cohub -s <spaceId> apps update <appId> --show-cohub-bar --json
```

生命周期与限制见 [work-lifecycle](./work-lifecycle.md)；slug 见 [public-identity-slugs](./public-identity-slugs.md)。

## 运行时说明

`client.context()`、观众授权与 App 商业化只在**已发布 App 壳**内可用。本地预览与原始 CDN HTML 不提供 App runtime。

发布时会为公开 head 与分享卡提取 title、description、icon、image、语言与 theme color 等页面元数据。

## 完成标准

- [ ] 公开 App URL 可以打开
- [ ] CSS/JS 加载正常，没有绝对 `/assets` 失败
- [ ] 直接权限与 viewer grant 符合真实需求
- [ ] 已为发布状态创建 Save

## 避免

- 把私有 Sandbox port 链接当生产入口
- 把实时密钥写进静态 `dist`
- 为静态宣传页申请过宽的 viewer grant
- 发布 Space 中不存在的本机文件路径

---

[English](../../playbooks/publish-static-work.md)
