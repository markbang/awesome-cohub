---
id: cohub.bp.execution-token-identity
title: Execution token 与登录身份
type: playbook
audience: [builder, agent]
features: [auth, sandbox, skill, cli]
difficulty: advanced
related: [cohub.concept.execution-token, cohub.bp.user-config-and-rules, cohub.bp.skill-catalog-cache]
sources:
  - packages/core/src/security/execution-grants.ts（TTL 24h）
  - apps/agent/src/runtime/session-runtime.ts（shouldIncludeUserSkills）
  - packages/cli/src/auth.ts
  - apps/api/src/index.ts（principal 顺序）
  - https://cohub.live/changelog（v2.29）
---

# Execution token 与登录身份

## 何时使用

排查 CLI 交互登录可用但 Agent 子进程失败、协作者看到的 skills 不同，或请求读取了错误资源。

## 三种身份

| 身份 | 常见载体 | 用途 |
|------|----------|------|
| **Interactive user** | Logto access token（`cohub auth login`） | 人在 CLI/UI 中操作 |
| **Execution grant** | `COHUB_EXECUTION_TOKEN` | Agent/工具/`run_command` 在回合内工作 |
| **Work/App runtime** | Work session 或 preview cookie | 已发布 App 或工作区预览 |

API 大致按 execution grant -> preview session -> Work/App session -> Logto user 的顺序解析 principal。

## 经验法则

1. Agent 工具 shell 使用平台注入的 execution token，不要假设 Sandbox 有 `~/.config/cohub/auth.json`。
2. 笔记本 shell 中的 `COHUB_EXECUTION_TOKEN` 会覆盖保存的 Logto 身份，直到显式 unset。
3. execution token 不是 OIDC 会话，不能用 `cohub auth refresh` 刷新。
4. execution grant 仍绑定 Space 以及可选的 session/turn。
5. 从 v2.29 起，带 scope 的 execution 权限与 Actor 账号原有权限**相加**，不再替换；过滤和直接权限检查使用同一个并集。
6. 只有 `actorUserId === spaceOwnerUserId` 时，用户 config skills 才进入 system prompt；协作者仍可使用项目、Mod 与平台 skills。
7. 工具输出会脱敏 token；不要把秘密复制到日志中排查。

## 操作流程

1. 确认身份来源：
   ```bash
   cohub auth whoami
   env | rg "COHUB_EXECUTION_TOKEN|COHUB_USER_UUID|COHUB_SPACE_ID"
   ```
2. 人工 CLI 操作先关闭 execution token，再使用交互登录：
   ```bash
   unset COHUB_EXECUTION_TOKEN
   cohub auth login
   ```
3. Agent 自动化使用平台注入的回合凭据，不要写入文件。
4. 可见性异常时，先比较目标 Space、session/turn 绑定和权限并集，再改业务代码。
5. 协作者缺少个人 skills 时先检查所有权，这是有意设计的 system-prompt 边界。

## 完成标准

- [ ] 已知失败请求使用的 principal 与目标 Space
- [ ] 没有本地 execution token 覆盖预期的 Logto 身份
- [ ] 账号权限与 execution scope 按并集理解
- [ ] owner/member 的 skill 预期与 Actor 身份一致

## 避免

- 提交 execution token
- 假设 Sandbox 里有笔记本登录会话
- 把 execution grant 当作通用用户 token
- 期待成员收到所有者 `/configs/user` 中的 skills

---

[English](../../playbooks/execution-token-identity.md)
