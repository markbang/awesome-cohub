---
id: cohub.concept.execution-token
title: Execution token
type: concept
related: [cohub.bp.execution-token-identity, cohub.concept.user-config-space]
sources:
  - packages/core/src/security/execution-grants.ts
  - apps/agent/src/execution-grants.ts
  - apps/agent/src/sandbox/tools.ts
  - packages/cli/src/auth.ts
  - apps/api/src/auth.ts / index.ts
---

# Execution token

An **execution token** is a short-lived, signed **execution grant** (JWT-like HS256) that authorizes tool/CLI calls **as a specific actor in a specific Space/turn**, without using a full interactive Logto browser session.

## Shape (payload ideas)

- `actorUserId` — who is acting
- `spaceId` — bound space
- `sessionId` / `turnId` — optional turn binding
- `source` — e.g. prompt / run_command
- `scopes` — optional permission scopes (from work/delegated prompt auth when present)
- `iat` / `exp` — TTL **`EXECUTION_GRANT_TTL_SECONDS = 24h`**

## How it shows up

| Context | Behavior |
|---------|----------|
| Agent tools / `run_command` | Injects `COHUB_EXECUTION_TOKEN` (+ `COHUB_USER_UUID`) into sandbox command env; redacts token from streamed logs |
| CLI | If `COHUB_EXECUTION_TOKEN` set, auth source becomes `execution-token` and **overrides** stored Logto session; cannot refresh via `auth refresh` |
| API | Bearer token verified as execution grant **before** Logto/work session; principal type `execution` |

## Not the same as

- **Logto user session** — long-lived interactive login (`cohub auth login`)
- **Work session token** — viewer Work runtime identity
- **Preview session cookie** — preview host principal

## Identity coupling

- Grants are created per agent turn/command for the **actor** of that turn.
- User-config skills in the **system prompt** are included only if `actorUserId === spaceOwnerUserId`.
- Collaborator turns: no owner user-skill injection into prompt (even if sandbox mount exists).

## See also
- Playbook: `cohub.bp.execution-token-identity`

---

[中文](../zh/concepts/execution-token.md)
