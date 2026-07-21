---
id: cohub.bp.execution-token-identity
title: Execution token 与登录身份
type: playbook
audience: [builder, agent]
features: [auth, sandbox, skill, cli]
difficulty: advanced
related: [cohub.concept.execution-token, cohub.bp.user-config-and-rules, cohub.bp.skill-catalog-cache]
sources:
  - packages/core/src/security/execution-grants.ts (TTL 24h)
  - apps/agent/src/runtime/session-runtime.ts (shouldIncludeUserSkills)
  - packages/cli/src/auth.ts
  - apps/api/src/index.ts (principal order)
---

# Execution token 与登录身份

## 何时用

排查「我登录了但 agent 子进程 401」「协作者吃不到我的 user skills」「这次工具调用到底是谁」。

## 三种身份

| Identity | Typical carrier | Use |
|----------|-----------------|-----|
| **Interactive user** | Logto access token (`cohub auth login`) | Humans in CLI/UI |
| **Execution grant** | `COHUB_EXECUTION_TOKEN` | Agent/tool/run_command acting inside a turn |
| **Work / preview principal** | work session / preview cookie | Published Work or preview host |

API resolves token in rough order: **execution grant → preview session (preview host) → work session → Logto user**.

## 经验法则

1. Inside Agent tool shells, prefer the injected **execution token**; don’t assume `~/.config/cohub/auth.json` exists in the sandbox.
2. `COHUB_EXECUTION_TOKEN` in your laptop shell **overrides** Logto for CLI until unset — easy foot-gun in local envs.
3. You **cannot** `cohub auth refresh` an execution token; it’s not a refreshable OIDC session.
4. Execution grants are **space-bound** (+ optional session/turn). Cross-space CLI needs a grant/token valid for that space or a real user session with rights.
5. **User skills in prompts** only when actor is the **space owner**:
   ```ts
   shouldIncludeUserSkills = actorUserId === spaceOwnerUserId
   ```
   Members/guests: project + mod + platform skills still apply; owner personal skills are not injected into their prompt.
6. Token streams are redacted in tool output — don’t chase “missing token” in logs.

## 步骤

1. `cohub auth whoami` + 检查 env 里是否残留 `COHUB_EXECUTION_TOKEN`。
2. 人机操作：关掉 execution token，改用 `auth login`。
3. Agent 自动化：用平台注入的 turn grant，不要把长期 token 写进仓库。
4. 协作者缺 user skills：先看是不是非 owner（设计如此）。
5. Work 触发的 prompt：检查 delegated/work scopes。

## 完成标准

- [ ] You can state which principal a failing call used
- [ ] No accidental local `COHUB_EXECUTION_TOKEN` shadowing Logto
- [ ] Owner vs member skill expectations match `shouldIncludeUserSkills`

## 别这样做

- Committing execution tokens
- Assuming sandbox has your laptop Logto session
- Expecting members to load the owner’s `/configs/user` skills in system prompt

---

[English](../../playbooks/execution-token-identity.md)
