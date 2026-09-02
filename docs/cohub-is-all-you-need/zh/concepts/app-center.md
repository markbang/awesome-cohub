---
id: cohub.concept.app-center
title: App Center 与已安装 App
type: concept
related:
  - cohub.concept.work
  - cohub.concept.dot-cohub-layers
  - cohub.bp.app-center
sources:
  - https://cohub.live/changelog（v2.38）
  - https://github.com/talesofai/cohub/blob/main/packages/protocol/src/app-catalog.ts
  - https://github.com/talesofai/cohub/tree/main/cohub-apps/marketplace
---

# App Center 与已安装 App

**App Center** 是 Space 内管理已安装 App 的入口。桌面端它位于 Files 旁边的侧栏，移动端位于抽屉中，支持启用、停用与卸载。官方 Marketplace App 负责发现和安装。

## 已安装 App 清单

已安装 App 保存在当前 Space 的经过校验的文件中：

```text
.cohub/apps.json
```

文档格式为 `cohub.space-apps`，版本 `1`，最多支持 1,000 个条目。每个条目记录 UUID、规范化的 `username/space/app` 引用、启动 URL、启用状态、来源、展示快照与安装时间。来源可以是 Marketplace 目录项或经过校验的 HTTP(S) URL。

这个文件是当前 Space 的已安装 App 目录，不是已发布 App 的数据库。安装条目不会额外授予 App 权限，也不会改变发布者或观众 grant。

## 运行时行为

- Marketplace App 通过 invocation Space 打开，并申请 `file.view` 浏览文件、`file.edit` 写入安装变更。
- 观众可以通过 `client.auth.requestSpace()` 选择另一个 Space；App 只知道被选中的 Space，不会获得观众完整列表。
- 目录与清单读取使用有上限的校验和小型 LRU 缓存。
- 写入携带文件预期的 `mtimeMs`、`size` 与 mutation id，避免两个客户端静默覆盖彼此的修改。
- App Center 状态通过 Space realtime/file-change 路径跨客户端刷新。

## 区分三层

| 层 | 含义 |
|----|------|
| 已发布 App | 由某个 Space 拥有的公开 file、directory 或 port 界面 |
| Marketplace 目录 | 经过校验的发现元数据与启动 URL |
| 已安装 App 清单 | 当前 Space 在 `.cohub/apps.json` 中的启用/停用列表 |

用户流程与安全清单更新见 [App Center 安装](../../playbooks/app-center.md)。

---

[English](../../concepts/app-center.md)
