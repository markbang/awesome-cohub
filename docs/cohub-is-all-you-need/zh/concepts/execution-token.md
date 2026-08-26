---
id: cohub.concept.execution-token
title: Execution token（执行令牌）
type: concept
related: [cohub.bp.execution-token-identity, cohub.concept.user-config-space]
sources:
  - packages/core/src/security/execution-grants.ts
  - apps/agent/src/execution-grants.ts
  - apps/agent/src/sandbox/tools.ts
  - packages/cli/src/auth.ts
  - apps/api/src/auth.ts / index.ts
  - https://cohub.live/changelog（v2.29）
---

# Execution token（执行令牌）

**Execution token** 是短期签名的执行授权，允许特定 Actor 在特定 Space、Session 或 turn 中调用工具和 CLI，而不需要完整的 Logto 交互登录。

## 结构

- `actorUserId` - 执行者
- `spaceId` - 绑定的 Space
- `sessionId` / `turnId` - 可选的回合绑定
- `source` - 例如 Prompt 或 `run_command`
- `scopes` - 存在时携带的委托权限
- `iat` / `exp` - 执行授权有效期（当前为 24 小时）

## 出现位置

| 场景 | 行为 |
|------|------|
| Agent 工具 / `run_command` | 将 `COHUB_EXECUTION_TOKEN` 与 `COHUB_USER_UUID` 注入 Sandbox 命令环境；流式日志会脱敏 token |
| CLI | 存在 `COHUB_EXECUTION_TOKEN` 时使用 `execution-token` 身份并覆盖保存的 Logto 身份；不能把它作为 OIDC 会话刷新 |
| API | 在普通用户或 Work/App 会话之前验证 bearer token，并建立 execution principal |

## 权限并集（v2.29）

带 scope 的执行令牌会把自身授权**加到**账号原有权限上，而不是替换账号权限。Session 与 Space 过滤现在和直接权限检查使用相同的并集，因此 execution-token 请求不会意外少看或多看对应并集之外的资源。

令牌仍绑定执行上下文：Space A 的额外授权不会让它可以调用 Space B，也不会把令牌变成通用用户会话。

## 身份耦合

- 每个 Agent turn 或命令都会针对该 turn 的 Actor 创建 grant。
- 只有 `actorUserId === spaceOwnerUserId` 时，用户配置 Space 的 skills 才进入 system prompt。
- 协作者回合仍会获得项目、Mod 与平台 skills，但不会注入所有者个人配置中的 skills。

## 不同于

- **Logto 用户会话** - 交互登录（`cohub auth login`）
- **Work/App 运行时会话** - 已发布 App 内的观众身份
- **Preview session cookie** - 工作区预览宿主身份

---

[English](../../concepts/execution-token.md)
