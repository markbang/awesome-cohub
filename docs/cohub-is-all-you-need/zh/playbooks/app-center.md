---
id: cohub.bp.app-center
title: 在 Space 中安装与维护 App
type: playbook
audience: [builder, operator]
features: [app, marketplace, space, files, permissions]
difficulty: intermediate
related:
  - cohub.concept.app-center
  - cohub.concept.work
  - cohub.bp.minimal-scopes
sources:
  - https://cohub.live/changelog（v2.38）
  - https://github.com/talesofai/cohub/tree/main/cohub-apps/marketplace
  - https://github.com/talesofai/cohub/blob/main/packages/protocol/src/app-catalog.ts
---

# 在 Space 中安装与维护 App

## 何时使用

Space 需要从 Apps 面板直接使用可复用的已发布 App，并且要有受控的启用、停用与卸载生命周期。

## 结果

- Space 拥有经过校验的 `.cohub/apps.json` 清单。
- 安装前检查 Marketplace 元数据与启动 URL。
- 多个客户端不会静默覆盖彼此的已安装 App 列表。

## 步骤

1. 在 Space 侧栏或移动抽屉打开 **Apps**，启动官方 Marketplace App。
2. 选择 invocation Space，或使用其 Space picker。Marketplace 流程只申请所需的两个文件权限：
   - `file.view`：读取 `.cohub/apps.json`
   - `file.edit`：安装、启用、停用或卸载条目
3. 按名称、发布者、关键词或规范化的 `username/space/app` 引用搜索 Marketplace。安装前核对显示的 URL 和发布者。
4. 安装 App。Marketplace 校验目录和清单后，将格式 `cohub.space-apps`、版本 `1` 写入 `.cohub/apps.json`。
5. 在 Apps 面板启用或停用已安装条目。卸载只会从当前 Space 清单移除条目，不会删除已发布 App。
6. 如果其他客户端修改了清单，重新读取当前文件并合并自己的修改；下一次写入保留最新的 `mtimeMs` 与 `size` 预期值。

最小清单结构：

```json
{
  "format": "cohub.space-apps",
  "version": 1,
  "apps": []
}
```

## 边界

安装 App 是 Space 文件操作，不是新的 App 管理权限。已安装列表只控制发现与启用状态；已发布 App 仍自行执行 `appScopes` 与 viewer grant。

Marketplace 目录项不代表 App 适合所有流程。启用前检查发布者、URL、运行时请求的权限和 App 会读取的数据。

## 完成标准

- [ ] 清单可以解析且不超过 1,000 条
- [ ] App 能从当前 Space 的 Apps 面板打开
- [ ] 启用/停用/卸载在所有客户端反映一致
- [ ] 并发写入冲突会基于最新文件状态重试
- [ ] 已发布 App 的运行时权限仍保持最小化

## 避免

- 用未经校验的任意 schema 修改 `.cohub/apps.json`
- 从过期读取结果整体替换清单
- 以为安装会授予文件、Prompt、生成或管理权限
- 只想从一个 Space 卸载时误删已发布 App

---

[English](../../playbooks/app-center.md)
