---
id: cohub.concept.local-runtime
title: Local Runtime 与原生 Harness
type: concept
related:
  - cohub.concept.sandbox
  - cohub.concept.execution-token
  - cohub.bp.local-runtime
sources:
  - https://cohub.live/changelog（v2.51-v2.68）
  - https://github.com/talesofai/cohub/blob/main/docs/local-runtime.md
---

# Local Runtime 与原生 Harness

**Local Runtime** 把本机目录连接到 Space，并用本地 **Harness**（Pi 或 Codex）执行回合。Session、turn、流式输出与恢复仍走常规 Cohub 管线；模型与工具执行发生在你的机器上。

`cohub runtime up` 取代已移除的 `cohub sandbox up`。用户选择的是 Harness，而不是某台机器。

## 生命周期

```bash
cohub auth login
cd ./project
cohub runtime up --harness pi --harness codex
cohub runtime status
cohub runtime logs --level warn -f
cohub runtime down
```

| 命令 | 用途 |
|------|------|
| `runtime up [dir]` | 创建或复用 Space，启动 Runtime 与所选 Harness |
| `runtime status` | 本地与服务端状态、待处理 Turn、档案状态 |
| `runtime logs` | 本机脱敏 JSONL 诊断（`--follow`、`--level`、`--json`） |
| `runtime down` | 停止 Runtime；保留 Space、绑定与原生文件 |
| `runtime attach` / `detach` | 安装/暂停 Harness 集成，不删除数据 |
| `runtime import [dir]` | 从新到旧导入历史本地会话（Ctrl-C 暂停） |

`runtime up` 会按规范目录、账号与环境记住一个 Space。`-n` 表示 `--new`，`--name` 指定新 Space 名称；`--space` 或 `COHUB_SPACE_ID` 覆盖目录绑定。

## 原生同步

Harness 自己的 session 文件是唯一持久记录与发件箱；服务端是唯一账本。本地不保存投递回执。重启后 Runtime 先询问服务端已有哪些 Turn，再继续读取，因此重放不会重复。同步是事件驱动的：只在 Turn 开始或结束时解析 transcript，而不是固定轮询。

- Pi 通过自包含扩展连接；未安装扩展的 Pi 以只读方式同步，`/reload` 后接入。
- Codex 0.156+ 使用共享 app-server；不可用时 Cohub 启动私有 `codex app-server --listen stdio://`，终端 Codex 会话只读同步。
- 冲突的继续执行会在完整 Turn 边界分叉；会跟踪 Codex rollout lineage（`history_base`）与 `.zst` 档案，滚动/压缩过的线程仍是一条 Chat。
- 丢失传输不会中止本地模型或工具工作；结果会在重连后重放。

## 平台说明

- 需要 **Node.js 24+**。
- **Windows**：安装 Git for Windows（或设置 `COHUB_BASH`），从非管理员终端运行，sandboxd 控制通道使用命名管道。终端 Codex 在 Windows 上只读同步。
- **macOS**：原生 FSEvents 文件监控；macOS 与 Linux X11 默认提供屏幕共享。用 `--no-display` 关闭，或 `--display xvfb[:WxH]` 使用虚拟屏幕。
- 远程显示通过 WebRTC 传输，可在 Web 中观看或操作；Agent 通过 `cohub spaces displays` 驱动。

## 安全边界

启动 Runtime 需要显式的本地执行同意。协作者会以你的 OS 用户身份执行，因此拒绝管理员终端。Harness 集成只与 Runtime 私有 IPC 通信，不持有 Cohub 凭据。

---

[English](../../concepts/local-runtime.md)
