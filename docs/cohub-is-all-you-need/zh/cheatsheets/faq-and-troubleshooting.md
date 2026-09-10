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
| `apps publish` 报目标不存在 | `--file` / `--dir` 按来源解析；Sandbox 内是工作区，其他环境是本机。可以显式传 `--source workspace` 或 `--source local` |
| 修改 target 但公开页面没变 | 明确发布新版本 |
| Work 预览更新后变空 | 当前预览刷新失败应保留原内容；点击 Retry 并检查版本状态 |
| `desktop open --call` 没反应 | App 必须注册完全相同的方法，并从获准 Cohub origin 打开 |
| 访客 API 403 | 检查调用需要 App scope，还是目标 Space 上的 viewer grant |
| `generation.create` 成功但轮询 403 | 另加/申请 `taskrun.view`；创建和读取结果是两种权限 |
| Task Browser 的 Mine 为空 | 申请仅 viewer 可授予的 `user.taskrun.list`；Space 视图使用 `taskrun.view` |
| 商业化只在预览能用 | 使用已发布 Work/App 运行时；原始资源与本地预览没有 runtime context |
| 结账回流了但 UI 没确认 | 成功以订单/订阅状态为准；伪造或过期的回流 URL 不再能冒充购买 |
| Apps 面板找不到 App | 检查 `.cohub/apps.json`、已安装条目的 `enabled` 状态与 Marketplace 权限 |
| 安装 App 覆盖了别人的修改 | 重新读取清单并基于最新文件版本重试，不要整体替换过期快照 |
| Space Activity 费用为零 | 没有 Space 管理权限的观众会被有意隐藏费用字段 |
| 命令面板默认列表闪烁 | 先让本地/IndexedDB 缓存渲染；只有过期总览无法刷新时才排查请求 |

## App 表面与 Actions

| 现象 | 处理 |
|------|------|
| Overlay 打开了但点不动 | `inputRegion` 默认为 `"none"`；需要 App 调用 `cohub.app.requestConfigure()`。固定面板用 `geometry` + `"all"`，移动元素用矩形（矩形响应悬停，但不响应触屏第一次点按） |
| Overlay 不透明或持续模糊 | 自绘透明背景（`html, body { background: transparent }`）、声明 `<meta name="color-scheme" content="light dark">`，并避免 `backdrop-filter` |
| Overlay 悄悄退回了窗口 | 达到了 Overlay 上限（8 个）；用 `Escape` 关闭，或让各 App `requestClose()` |
| 被嵌入 App 无法自关 | `cohub.app.requestClose()` 会转发给 embedder 的 `onCloseRequest`；embedder 必须传入该回调且通过宿主校验 |
| `app.actions.run()` 立即失败 | 检查 action key（`[a-z0-9_-]`）、发布版本中是否有且仅有一个匹配入口，以及是否目录 App |
| Action 报 timeout/abort/exit code | 失败原因通过统一执行来源契约上报；查看 Task Run。Action 不能递归调用 `actions.run()` |
| Action input 出现在 Task Run 里 | 预期行为：输入随 run 保存，所有者与可查看任务的 Space 成员可见。不要传密钥 |

## Hooks 与 webhook

| 现象 | 处理 |
|------|------|
| Webhook 返回 404 | 端点名就是 hook 文件名：`.cohub/hooks/mail.yml` -> `POST /api/spaces/:id/webhooks/mail`，且需 `on.event: webhook` |
| Webhook 拒绝请求 | 检查 `on.secret`（`x-cohub-webhook-secret` 或 `?secret=`）；webhook 还按 Space 限流 |
| 恢复后 webhook hook 不执行 | `space.workspace.ready` 会刷新 hook 缓存；workspace 未就绪时不会被当作“没有 hook”缓存 |
| `uses:` hook 失败 | 目标必须是已发布 App Action（`owner/space/app/action`）；见 [App Actions](../../concepts/app-actions.md) |
| Hook 反复触发自身 | 检查 `.cohub/**` 忽略规则与 `task.updated` 过滤 |

## Board

| 现象 | 处理 |
|------|------|
| 旧 node/sequence payload 被拒 | 使用语义化 Item/Composition，并先查看 `boards capabilities` |
| 旧 `frame` 包裹格式被拒 | 使用 `position` / `size` / `rotation` 编辑；手绘与箭头为世界坐标，画框自动推导 |
| Board batch 返回 diagnostic | 先修复报告的编辑路径（例如 `items.0.props.text`），再重试 |
| Board API 错误缺少上下文 | 保存稳定 error code、diagnostics 与 `requestId` |
| Board 动画更新不应重新读取 | 纯效果/组合变更时直接应用 `board.changed` 中的 `animationPatch` |
| 回放报“需要第一页事务” | 先加载最新一页（携带快照）。需要逆操作与快照行时加 `--operations` |
| Board 重试后内容重复 | 复用相同 `mutationId`，检查回执 |
| Board 变更冲突 | 重新读取当前版本，用新的 `baseVersion` 重试 |
| 发布后组合动画效果不同 | 资源放在 Space，并在发布前校验语义快照 |

## 文件、任务与身份

| 现象 | 处理 |
|------|------|
| 并发编辑被拒绝 | 处理 `CONFLICT`：读取最新版本，再缩小编辑或使用 `fs.edit` |
| 并发上传被拒 | 上传会通过快照校验拒绝并发本地编辑；重新读取文件后重试 |
| 无害格式差异导致编辑失败 | 基于规范化的最新快照重试；可恢复编辑容忍换行、BOM 和行尾空格，但歧义匹配仍会失败 |
| 命令输出看起来不完整 | 先检查明确的截断标志/详情，不要把输出当作完整结果 |
| CLI 在命令运行时更新 | 自更新在前台命令结束后后台执行，下次调用生效；设置 `COHUB_CLI_AUTO_UPDATE=0` 可关闭 |
| Task run 隐藏了命令/结果字段 | 按权限脱敏：没有 Space 数据权限的观众看不到执行字段与计费。查看完整 run 需要 Space 访问权 |
| API 识别了错误用户 | 查看 [execution-token-identity](../../playbooks/execution-token-identity.md)；execution scope 会与账号权限相加 |
| Work 自己重做登录 | 使用平台会话/SDK |

## 自治

| 现象 | 处理 |
|------|------|
| 循环忘记进度 | 持久化 `runtime/state.json` 或 wiki log |
| Agent 搞乱目录 | 高自主操作前先 Save/Fork |

## 仍然卡住

1. 产品文档：https://cohub.live/docs
2. [路径与挂载](./paths-and-mounts.md)
3. [AGENT_BRIEF](../AGENT_BRIEF.md)

---

[English](../../cheatsheets/faq-and-troubleshooting.md)
