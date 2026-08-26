---
id: cohub.concept.sandbox
title: Sandbox（沙箱）
type: concept
related: [cohub.concept.execution-token, cohub.cheat.paths-mounts]
sources:
  - https://cohub.live/changelog（v2.9、v2.22）
---

# Sandbox（沙箱）

Sandbox 是 Space Agent 执行命令、skills、预览与文件系统操作的运行时。路径、网络和身份以 Sandbox 为准，不等同于你的笔记本。

## 文件并发（v2.22）

- 文件写入按路径串行化。
- 版本化写入可以携带预期 size 与 `mtime`；过期覆盖会以 `CONFLICT` 失败，不会静默丢失并发修改。
- `fs.edit` 在同一路径锁内原子执行一批文本替换。
- 先读取当前版本，再做小范围编辑；冲突后基于最新内容重试，不要盲目覆盖更新的草稿。

## 运行时假设

- 项目文件在 `/workspace`。
- `/configs/*` 下的已发布配置挂载为只读。
- 挂载的 Mod 在 `/mods/<slug>`。
- Agent 工具调用携带用于 API 身份的 execution token。

## 实践

- [路径与挂载](../cheatsheets/paths-and-mounts.md)
- [Execution token](./execution-token.md)
- 出站网络需要帮助时使用 [egress-proxy](../../playbooks/egress-proxy.md)

---

[English](../../concepts/sandbox.md)
