---
id: cohub.bp.work-lifecycle
title: Work 生命周期 - 发布、版本、停用、可见性
type: playbook
audience: [builder]
features: [work, app, publish, analytics]
difficulty: intermediate
related:
  - cohub.bp.publish-static-work
  - cohub.bp.hide-cohub-bar
  - cohub.bp.port-preview
  - cohub.bp.work-promotions
sources:
  - https://cohub.live/docs/create/works
  - https://github.com/talesofai/cohub/blob/main/docs/works-guide.md
  - https://cohub.live/changelog（v2.14、v2.22、v2.24）
---

# Work 生命周期 - 发布、版本、停用、可见性

## 何时使用

你需要管理 Work/App 的完整生命周期：首次发布之后继续迭代、预览、统计、下线，或改变访问范围。

## 模型

| 字段 | 含义 |
|------|------|
| `slug` | 公开 URL 片段 |
| `status` | `published` 或 `disabled` |
| `visibility` | 例如 `public` 或 `space` |
| `targetType` | `file`、`directory` 或 `port` |
| `targetRef` | 文件路径、目录路径或端口 |
| version | 发布 / publish-version 时创建的不可变快照 |

公开 URL 为 `/:username/:spaceSlug/w/:workSlug`。用户需要 username，Space 需要 slug；设置后这两个身份字段都不能清空。

## 限制与产物行为

- file、HTML、Board 或 directory 上限均为 **1 GiB**。
- directory 必须有 `index.html`，包含 1 到 1000 个文件，总大小为 1 byte 到 1 GiB。
- Board 发布会捕获 Board 状态，以及它实际引用的工作区资源。
- file 与 directory 发布带不可变 manifest，可下载并校验 checksum；Board 与 port Work 不是可下载文件产物。
- port 必须使用受支持的公开 Sandbox 端口。

## CLI

```bash
# 发布并发布新版本
cohub -s <spaceId> apps publish site --dir dist --json
cohub -s <spaceId> apps publish-version <appId> --json

# 管理状态
cohub -s <spaceId> apps update <appId> --status disabled --json
cohub -s <spaceId> apps update <appId> --status published --json

# 预览、查看、统计与恢复文件产物
cohub ui preview work://<owner>/<space>/<app>
cohub apps get <appId|url|owner/space/app> --json
cohub apps stats <appId|url|owner/space/app> --json
cohub apps download <appId|url|owner/space/app> --output <path>
```

仍支持旧客户端中的 `works` 与 `workScopes` 兼容别名。

## 发布规则

- 修改 target 只改变**下一版**的来源，不会热更新公开页面。
- 预览刷新按版本合并；刷新失败时保留当前内容并提供重试，不会清空面板。
- disable 会移除 by-slug 公开访问，但不会删除管理记录、授权或版本。
- 推广链接指向当前已发布版本；需要归因时使用 [work-promotions](./work-promotions.md)。

## 完成标准

- [ ] 公开 URL 打开的是预期的已发布版本
- [ ] 修改 target 后执行了明确的 publish-version
- [ ] 限制与 Board 引用资源通过校验
- [ ] 需要时用统计或已校验下载确认发布结果
- [ ] 分享前已理解停用与恢复行为

## 避免

- 把 target 修改当作生产发布
- 把原始 Sandbox URL 当作产品入口
- 期待 Board 或 port Work 下载为文件 bundle
- 把密钥或 access token 放进查询参数

---

[English](../../playbooks/work-lifecycle.md)
