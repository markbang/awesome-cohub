---
id: cohub.bp.port-preview
title: 端口预览与 port App
type: playbook
audience: [builder, agent]
features: [sandbox, work, app, files]
difficulty: intermediate
related: [cohub.concept.work, cohub.bp.publish-static-work]
sources:
  - https://cohub.live/docs/workspace/files-and-sandbox
  - https://cohub.live/docs/apps
---

# 端口预览与 port App

## 何时使用

产物是运行中的应用（开发服务器）而不是静态文件，用于演示、QA 或临时分享。

## 结果

- 服务监听受支持的公开 Sandbox 端口。
- 作者可以在 Cohub 中打开实时端口预览。
- 只有观众必须访问活进程时才发布 **port App**。
- 团队理解 port App 通常不是默认生产形态。

## 步骤

1. 能静态化的生产向 Demo 优先使用 directory App。
2. 在 Space Sandbox 内启动服务（Agent 或 `cohub run`）。
3. 按当前产品文档监听受支持的公开端口。
4. 在 Chat 旁打开端口预览，并在冷启动 Sandbox 后复验。
5. 观众确实需要活进程时才发布 port App：
   ```bash
   cohub -s <spaceId> apps publish live-demo --port 5173 --json
   ```
6. 写清重启方式，并把配置 Save，而不是只依赖运行中的进程。
7. 稳定后从 `dist/` 发布 directory App。

## 完成标准

- [ ] 作者可以打开预览
- [ ] 冷启动 Sandbox 后重启说明仍有效
- [ ] port App 的观众范围和生命周期明确

## 避免

- 没有进程监控预期却把 port App 当永久生产入口
- 忘记休眠和重启会杀掉临时服务器
- 给外部用户发送绝对 localhost 链接

---

[English](../../playbooks/port-preview.md)
