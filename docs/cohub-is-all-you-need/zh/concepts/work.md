---
id: cohub.concept.work
title: App（原 Work）
type: concept
related:
  - cohub.concept.work-presentation
  - cohub.concept.app-center
  - cohub.bp.work-lifecycle
sources:
  - https://cohub.live/docs/apps
  - https://github.com/talesofai/cohub/blob/main/docs/apps-guide.md
  - https://cohub.live/changelog（v2.26、v2.37）
---

# App（原 Work）

**App** 是从 Space 目标发布出的可分享界面：`file`、`directory` 或 `port`。产品过去面向用户的名称是 **Work**。

v2.37 完成词汇迁移后，App 成为开发者侧规范术语：

- SDK/API：`client.apps`、`appScopes`、`apps.getBySlug()`
- CLI：`cohub apps ...`
- 管理路径：`/spaces/:spaceId/apps/:appId`
- 公开 URL：`/:username/:spaceSlug/w/:appSlug`（其中 `/w/` 片段仍保留）
- 旧的 `client.works`、`workScopes` 与 `works` CLI 写法在支持的客户端中作为兼容别名保留

## 实践

- 静态站点：发布带相对资源、`base: "./"` 的 directory。
- Cohub 交互能力：使用已发布 App 壳，不要使用原始资源 URL 或本地预览。
- App scopes 是发布者给 App home Space 的直接授权；viewer grant 在运行时按 Space 由观众同意。
- file/directory App 发布带不可变 manifest，并支持 checksum 校验下载；Board 与 port App 是运行时界面，不是可恢复文件 bundle。
- URL 查询参数和 hash 会转发给嵌入的 App；`cohub_*` 命名空间由宿主保留。
- App Center 的 `.cohub/apps.json` 是已安装 App 列表，与已发布 App 记录分离。

## 参见

- [Work/App 呈现](./work-presentation.md)
- [App Center](./app-center.md)
- [App 生命周期](../../playbooks/work-lifecycle.md)
- [观众授权](../../playbooks/viewer-auth-and-user-scopes.md)
- https://cohub.live/docs/apps

---

[English](../../concepts/work.md)
