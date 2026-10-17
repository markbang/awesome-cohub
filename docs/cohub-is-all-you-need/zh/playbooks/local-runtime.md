---
id: cohub.bp.local-runtime
title: 在本机 Runtime 上运行 Space
type: playbook
audience: [builder, operator, agent-author]
features: [runtime, harness, local, cli, files]
difficulty: intermediate
related:
  - cohub.concept.local-runtime
  - cohub.concept.sandbox
  - cohub.concept.execution-token
sources:
  - https://github.com/talesofai/cohub/blob/main/docs/local-runtime.md
  - https://cohub.live/changelog（v2.51-v2.68）
---

# 在本机 Runtime 上运行 Space

## 何时使用

你希望 Space 用本机 Pi 或 Codex Harness 在本地目录上执行回合，同时 Session、文件与历史仍保存在 Cohub。

## 结果

- 一个 Local Runtime 绑定到项目目录与 Space。
- 所选 Harness 在本地执行；远端仍可流式查看、停止与恢复。
- 原生 Pi/Codex 会话作为普通 Chat 同步，历史会话可导入。

## 步骤

### A. 准备

- Node.js **24+**。
- 在本地安装并登录 Pi 和/或 Codex。Cohub 不会静默切换执行器。
- Windows：安装 Git for Windows（或设置 `COHUB_BASH`），并使用**非管理员**终端。

### B. 启动 Runtime

```bash
cohub auth login
cd ./project
cohub runtime up --harness pi --harness codex
```

首次启动会询问 Space 名称；之后默认复用目录绑定。

常用变体：

```bash
cohub runtime up -d                  # 后台
cohub runtime up -n --name project-next
cohub runtime up --space <space-id> --harness codex
cohub runtime up --no-display        # 跳过屏幕共享
cohub runtime up --display xvfb:1920x1080
```

`-n` 是 `--new` 的布尔简写；`--name` 设置名称。`--yes` 接受默认值与本地执行同意。`--pi` / `--codex` 指定可执行文件。

### C. 验证

```bash
cohub runtime status
cohub runtime logs --level warn -f
cohub spaces prompt "Continue" --harness codex
```

`status` 报告连接状态、同步是否启用、各 Harness 的待处理 turn 与档案状态。Harness 能力或认证失败会明确报错。

### D. 导入历史会话

```bash
cohub runtime import --dry-run
cohub runtime import --harness codex --concurrency 4
```

导入从新到旧执行，流式显示进度，可用 Ctrl-C 暂停，并保留原始时间戳与本地 transcript。

### E. 停止但保留数据

```bash
cohub runtime down
```

会保留 Space、目录绑定与原生文件。`runtime detach` 可暂停原生同步但保留全部数据。

## 设计说明

- Harness session 文件是持久记录与发件箱；服务端是唯一账本。重连时先询问服务端已有哪些 turn，因此重放不会重复。
- 同步是事件驱动的（turn 开始/结束），不是固定轮询。
- 丢失传输不会中止本地工作；结果在重连后重放。
- Codex 0.156+ 使用共享 app-server；否则 Cohub 运行私有 app-server，终端会话只读同步。
- 可配置端点：SDK 使用 `webBaseUrl`，CLI 使用 `--base-url` 与环境覆盖；登录、Home Space 缓存与目录绑定按 API base URL 隔离。

## 完成标准

- [ ] `runtime status` 显示预期 Harness 与同步状态
- [ ] 从 Web 或 CLI 发送的 prompt 在本地 Harness 执行
- [ ] 历史原生会话导入且不重复
- [ ] `runtime down` 干净停止，重启复用同一 Space
- [ ] Harness 配置中不保存凭据

## 避免

- 从管理员终端运行 `runtime up`
- 在 Windows 上假设终端 Codex 可被驱动（实际只读同步）
- 把原生 session 文件当“缓存”删除——它们是持久记录
- 旧 Runtime 仍在运行时重新绑定目录；应先停止

---

[English](../../playbooks/local-runtime.md)
