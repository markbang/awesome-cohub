---
id: cohub.bp.work-lifecycle
title: App 生命周期 - 发布、版本、停用、可见性
type: playbook
audience: [builder]
features: [work, app, publish, source, analytics]
difficulty: intermediate
related:
  - cohub.bp.publish-static-work
  - cohub.bp.hide-cohub-bar
  - cohub.bp.port-preview
  - cohub.bp.work-promotions
  - cohub.concept.app-center
sources:
  - https://cohub.live/docs/apps
  - https://github.com/talesofai/cohub/blob/main/docs/apps-guide.md
  - https://cohub.live/changelog（v2.14、v2.22、v2.24、v2.37、v2.42-v2.43）
---

# App 生命周期 - 发布、版本、停用、可见性

## 何时使用

你需要在首次发布后继续管理 App：校验目标、从本机或工作区发布、预览、统计、下线，或改变访问者范围。

## 模型

| 字段 | 含义 |
|------|------|
| `slug` | 公开 URL 片段 |
| `status` | `published` 或 `disabled` |
| `visibility` | `public` 或 `space` |
| `targetType` | `file`、`directory` 或 `port` |
| `targetRef` | Space 文件路径、目录路径或端口 |
| version | 发布 / publish-version 时创建的不可变快照 |

公开 URL：`/:username/:spaceSlug/w/:appSlug`。用户需要 username，Space 需要 slug；设置后都不能清空。

## 发布来源

`--file` 与 `--dir` 会按**来源**解析：

| 来源 | 含义 |
|------|------|
| `workspace` | 目标 Space 工作区内的路径 |
| `local` | 运行 CLI 的本机路径；CLI 会把它上传到不可变的 app-source 存储 |

默认来源按运行环境推断——Sandbox 内为 `workspace`，其他环境为 `local`——也可以显式指定：

```bash
cohub -s <spaceId> apps publish demo --dir ./dist --source local --json
```

本地来源限制为 1,000 个文件、1 GiB。发布 worker 会下载 bundle，按 manifest 重新校验每个对象（路径穿越、重复、大小上限），再渲染 App 或站点 artifact。`--source` 不适用于 `--port`。

## 限制与产物行为

- file、HTML、Board 或 directory 上限均为 **1 GiB**。
- directory 必须有 `index.html`，包含 1 到 1000 个文件，总大小为 1 byte 到 1 GiB。
- Board App 捕获 Board 状态以及它实际引用的工作区资源。
- file/directory App 带不可变 manifest，支持 checksum 校验下载；Board 与 port App 不是可下载文件产物。
- port 必须使用受支持的公开 Sandbox 端口。

## CLI

```bash
# 发布并发布新版本
cohub -s <spaceId> apps publish site --dir dist --json
cohub -s <spaceId> apps publish site --dir ./dist --source local --json
cohub -s <spaceId> apps publish-version <appId> --json

# 管理状态
cohub -s <spaceId> apps update <appId> --status disabled --json
cohub -s <spaceId> apps update <appId> --status published --json

# 解析、预览、统计与恢复文件产物
cohub apps resolve <appSlug> --owner <username> --space-slug <space> --json
cohub desktop open app://<owner>/<space>/<app>
cohub apps get <appId|url|owner/space/app> --json
cohub apps stats <appId|url|owner/space/app> --json
cohub apps download <appId|url|owner/space/app> --output <path>
```

仍支持旧客户端中的 `works` 与 `workScopes` 兼容别名。

## 发布规则

- 修改 target 只改变**下一版**的来源，不会热更新公开页面。
- 预览刷新按版本合并；刷新失败时保留当前内容并提供重试，不会清空面板。
- 重新发布只在「当前值恰好是上次提取写入的值」时更新页面派生元数据（title、description、icon、image、语言、theme color、surface），手工设置的值不会被覆盖。
- disable 会移除 by-slug 公开访问，但不会删除 App 记录、授权或版本。
- 推广链接指向当前已发布版本；需要归因时使用 [work-promotions](./work-promotions.md)。
- App Center 的已安装列表独立于此生命周期；从一个 Space 卸载不会删除已发布 App。

## 完成标准

- [ ] 公开 URL 打开的是预期的已发布版本
- [ ] 修改 target 后执行了明确的 publish-version
- [ ] 本地来源发布在 1,000 文件 / 1 GiB 预算内
- [ ] 限制与 Board 引用资源通过校验
- [ ] 需要时用统计或已校验下载确认发布结果
- [ ] 分享前已理解停用与恢复行为

## 避免

- 把 target 修改当作生产发布
- 把原始 Sandbox URL 当作产品入口
- 期待 Board 或 port App 下载为文件 bundle
- 把密钥或 access token 放进查询参数

---

[English](../../playbooks/work-lifecycle.md)
