---
id: cohub.cheat.faq
title: FAQ 与排障
type: cheatsheet
---

# FAQ 与排障

## Skills 与配置

| 现象 | 可能原因 | 处理 |
|------|----------|------|
| `/skill:foo` 不见了 | 当前 Space 未安装 / config 未发布 | 安装到项目或 config Space，再 Save |
| 磁盘有 skill，斜杠目录为空 | 目录或缓存延迟 | 查看 [skill-catalog-cache](../../playbooks/skill-catalog-cache.md)，重开 Chat 或等待索引 |
| 安装后缺脚本 | 资源在仓根 | 放到 `skills/<name>/scripts/` |
| 同名 skill 结果不对 | 分层冲突 | platform -> mods -> user -> workspace |

## Work / App

| 现象 | 处理 |
|------|------|
| 分享的是 Sandbox 域名 | 发布 Work/App，不要发原始 Sandbox URL |
| 刷新 404 | 静态托管 + History API，改用 hash 路由或预渲染 |
| 白屏 | 检查 `base: "./"`、资源路径、浏览器控制台并重新构建 `dist/` |
| 文件/目录发布被拒 | 超出限制或缺 `index.html`；当前上限为 1 GiB，目录 1-1000 个文件 |
| 修改 target 但公开页面没变 | 明确发布新版本 |
| Work 预览更新后变空 | 当前预览刷新失败应保留原内容；点击 Retry 并检查版本状态 |
| `desktop open --call` 没反应 | App 必须注册完全相同的方法，并从获准 Cohub origin 打开 |
| 访客 API 403 | 检查调用需要 App scope，还是目标 Space 上的 viewer grant |
| `generation.create` 成功但轮询 403 | 另加/申请 `taskrun.view`；创建和读取结果是两种权限 |
| Task Browser 的 Mine 为空 | 申请仅 viewer 可授予的 `user.taskrun.list`；Space 视图使用 `taskrun.view` |
| 商业化只在预览能用 | 使用已发布 Work/App 运行时；原始资源与本地预览没有 runtime context |

## Board

| 现象 | 处理 |
|------|------|
| 旧 node/sequence payload 被拒 | 使用语义化 Item/Composition，并先查看 `boards capabilities` |
| Board 重试后内容重复 | 复用相同 `mutationId`，检查回执 |
| Board 变更冲突 | 重新读取当前版本，用新的 `baseVersion` 重试 |
| 发布后组合动画效果不同 | 资源放在 Space，并在发布前校验语义快照 |

## 文件与身份

| 现象 | 处理 |
|------|------|
| 并发编辑被拒绝 | 处理 `CONFLICT`：读取最新版本，再缩小编辑或使用 `fs.edit` |
| API 识别了错误用户 | 查看 [execution-token-identity](../../playbooks/execution-token-identity.md)；execution scope 会与账号权限相加 |
| Work 自己重做登录 | 使用平台会话/SDK |

## 自治

| 现象 | 处理 |
|------|------|
| 循环忘记进度 | 持久化 `runtime/state.json` 或 wiki log |
| Agent 搞乱目录 | 高自主操作前先 Save/Fork |
| Hook 反复触发自身 | 检查 `.cohub/**` 忽略规则与 `task.updated` 过滤 |

## 仍然卡住

1. 产品文档：https://cohub.live/docs
2. [路径与挂载](./paths-and-mounts.md)
3. [AGENT_BRIEF](../AGENT_BRIEF.md)

---

[English](../../cheatsheets/faq-and-troubleshooting.md)
