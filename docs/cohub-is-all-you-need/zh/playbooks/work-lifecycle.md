---
id: cohub.bp.work-lifecycle
title: Work 生命周期 — 发布、版本、停用、可见性
type: playbook
---

# Work 生命周期

## 模型

| 字段 | 含义 |
|------|------|
| `slug` | 公开名 |
| `status` | `published` \| `disabled` |
| `visibility` | 如 `public` \| `space` |
| `targetType` | `file` \| `directory` \| `port` |
| version | 发布 / publish-version 时的快照 |

URL：`/:username/:spaceSlug/w/:workSlug`

## 限额

| 目标 | 规则 |
|------|------|
| file | html，≤ **5 MB** |
| directory | 含 `index.html`，≤1000 文件、≤ **100 MB** |
| port | 仅支持的公开沙箱端口 |

## CLI 要点

```bash
cohub -s <spaceId> works publish demo --dir dist --json
cohub -s <spaceId> works publish-version <workId> --json
cohub -s <spaceId> works update <workId> --status disabled --json
cohub -s <spaceId> works update <workId> --hide-cohub-bar --json
```

改 target 只影响**下一次**发布版本；disable 去掉 by-slug 公开访问。

---

[English](../../playbooks/work-lifecycle.md)
