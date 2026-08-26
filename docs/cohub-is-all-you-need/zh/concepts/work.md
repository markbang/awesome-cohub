---
id: cohub.concept.work
title: Work / App（作品 / 应用）
type: concept
related:
  - cohub.concept.work-presentation
  - cohub.bp.work-lifecycle
sources:
  - https://cohub.live/docs/create/works
  - https://github.com/talesofai/cohub/blob/main/docs/works-guide.md
---

# Work / App（作品 / 应用）

**Work** 是面向用户的称呼，表示从 Space 目标发布出的可分享界面：`file`、`directory` 或 `port`。

从 v2.26 起，SDK 与 API 使用 **App** 作为开发者侧的规范术语：

- `client.apps` 与 `appScopes` 是规范写法。
- `client.works` 与 `workScopes` 仍是已弃用的别名。
- 现有 `/w/` 公开 URL 继续有效。

公开 URL：

```text
/:username/:spaceSlug/w/:workSlug
```

## 实践

- 静态站点：发布带相对资源、`base: "./"` 的 directory。
- Cohub 交互能力：使用已发布 Work/App 壳，不要使用原始资源 URL 或本地预览。
- App scopes 是发布者给 App 自己所在 Space 的直接授权；viewer grant 在运行时按 Space 由观众同意。
- 版本是有意发布的版本，不是自动保存。
- 文件和目录发布带不可变 manifest，可下载并校验 checksum；Board 和 port Work 不是可恢复的文件产物。
- URL 查询参数和 hash 会转发给嵌入的 Work；`cohub_*` 命名空间由宿主保留。

## 参见

- [Work 生命周期](../../playbooks/work-lifecycle.md)
- [观众授权](../../playbooks/viewer-auth-and-user-scopes.md)
- [Work 呈现](./work-presentation.md)
- https://cohub.live/docs/create/works
- 实践卡：`cohub.bp.work-kit-product`

---

[English](../../concepts/work.md)
