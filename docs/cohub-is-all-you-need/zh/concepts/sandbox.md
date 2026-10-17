---
id: cohub.concept.sandbox
title: Sandbox（沙箱）
type: concept
related: [cohub.concept.execution-token, cohub.cheat.paths-mounts]
sources:
  - https://cohub.live/changelog（v2.9、v2.22、v2.51-v2.69）
---

# Sandbox（沙箱）

Sandbox 是 Space Agent 执行命令、skills、预览与文件系统操作的运行时。路径、网络和身份以 Sandbox 为准，不等同于你的笔记本。

## 文件并发（v2.22）

- 文件写入按路径串行化。
- 版本化写入可以携带预期 size 与 `mtime`；过期覆盖会以 `CONFLICT` 失败，不会静默丢失并发修改。
- `fs.edit` 在同一路径锁内原子执行一批文本替换。
- 先读取当前版本，再做小范围编辑；冲突后基于最新内容重试，不要盲目覆盖更新的草稿。

## Local Runtime（v2.51+）

Space 也可以运行在绑定本机目录的 **Local Runtime** 上（`cohub runtime up`），用本地 Pi 或 Codex Harness 执行回合。未连接 Local Runtime 时仍默认使用云端 Sandbox。见 [Local Runtime](./local-runtime.md)。

文件监控使用宿主机原生后端（macOS 为 FSEvents，并带有限扫描兜底）；存在可选 `cohub-search` 二进制时可提供工作区搜索索引。这些都不改变 Space 文件的语义。

## 上传

持久文件上传共享一套上限与按用户的小时配额：单文件最大 **2 GiB**，批次最大 2 GiB / 2000 文件，内联上传最大 64 MiB。已发布 App 目标另有 1 GiB 上限。拒绝会带机器可读 code（`file_too_large`、`upload_batch_too_large`、`upload_too_many_files`、`upload_rate_limited`），限流响应包含 `retryAfterSeconds`。

## 运行时假设

- 项目文件在 `/workspace`。
- `/configs/*` 下的已发布配置挂载为只读。
- 挂载的 Mod 在 `/mods/<slug>`。
- Agent 工具调用携带用于 API 身份的 execution token。

## 实践

- [路径与挂载](../cheatsheets/paths-and-mounts.md)
- [Local Runtime](./local-runtime.md)
- [Execution token](./execution-token.md)
- 出站网络需要帮助时使用 [egress-proxy](../../playbooks/egress-proxy.md)

---

[English](../../concepts/sandbox.md)
