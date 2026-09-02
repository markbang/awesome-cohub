---
id: cohub.ap.static-work-as-api
title: 把静态 App 当 API 后端
type: anti-pattern
related: [cohub.bp.publish-static-work, cohub.bp.work-kit-product, cohub.bp.port-preview]
---

# 把静态 App 当 API 后端

## 为什么有问题

directory/静态 App 是类 CDN 文件界面，不托管你的 Node API、WebSocket 或长驻服务器。

## 正确做法

- 静态前端调用平台/App API，并只申请实际需要的权限。
- 开发期活服务器使用 port preview，不把它当默认生产形态。
- 真正后端放在合适的主机；App 是壳和客户端界面。

## 嗅探标准

你的 directory App README 写着“还会在 :3000 运行 Express”。

---

[English](../../anti-patterns/static-work-as-api.md)
