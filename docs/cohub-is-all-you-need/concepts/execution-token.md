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
  - https://cohub.live/changelog (v2.29)
---

# Execution token

An **execution token** is a short-lived, signed execution grant that authorizes tool and CLI calls as a specific actor in a specific Space, session, or turn without requiring a full interactive Logto session.

## Shape

- `actorUserId` - who is acting
- `spaceId` - bound Space
- `sessionId` / `turnId` - optional turn binding
- `source` - for example prompt or `run_command`
- `scopes` - delegated permissions, when present
- `iat` / `exp` - execution-grant lifetime (currently 24 hours)

## How it appears

| Context | Behavior |
|---------|----------|
| Agent tools / `run_command` | Injects `COHUB_EXECUTION_TOKEN` and `COHUB_USER_UUID` into the Sandbox command environment; streamed logs redact the token |
| CLI | A present `COHUB_EXECUTION_TOKEN` selects `execution-token` auth and overrides stored Logto auth; it cannot be refreshed as an OIDC session |
| API | The bearer token is verified as an execution principal before ordinary user or Work/App sessions |

## Permission union (v2.29)

A scoped execution token adds its grants to the account's own access. It does not replace the actor's normal permissions. Session and Space filtering now use the same additive union as direct permission checks, so an execution-token request cannot see less or more than the corresponding union allows.

The token remains bound to its execution context: an extra grant for Space A does not authorize a call against Space B, and a token does not become a general-purpose user session.

## Identity coupling

- Grants are created per agent turn or command for the actor of that turn.
- User-config skills enter the system prompt only when `actorUserId === spaceOwnerUserId`.
- Collaborator turns still receive project, mod, and platform skills, but not the owner's personal user-config skills.

## Not the same as

- **Logto user session** - interactive login (`cohub auth login`)
- **Work/App runtime session** - viewer identity inside a published App
- **Preview session cookie** - workspace preview host identity

---

[中文](../zh/concepts/execution-token.md)
