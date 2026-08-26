---
id: cohub.bp.execution-token-identity
title: Execution token vs login identity
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
  - https://cohub.live/changelog (v2.29)
---

# Execution token vs login identity

## When

Debugging a CLI call that works interactively but fails in an Agent subprocess, a collaborator's skill set, or a request that sees the wrong resources.

## Three identities

| Identity | Typical carrier | Use |
|----------|-----------------|-----|
| **Interactive user** | Logto access token (`cohub auth login`) | Humans in CLI/UI |
| **Execution grant** | `COHUB_EXECUTION_TOKEN` | Agent/tool/`run_command` work inside a turn |
| **Work/App runtime** | Work session or preview cookie | Published App or workspace preview |

The API resolves principals in rough order: execution grant -> preview session -> Work/App session -> Logto user.

## Rules of thumb

1. In Agent tool shells, use the injected execution token; do not assume `~/.config/cohub/auth.json` exists in the Sandbox.
2. `COHUB_EXECUTION_TOKEN` in a laptop shell overrides stored Logto auth until it is unset.
3. An execution token is not an OIDC session and cannot be refreshed with `cohub auth refresh`.
4. Execution grants remain bound to their Space and optional session/turn.
5. Since v2.29, scoped execution permissions are **additive** with the actor's own account access. They do not replace it; filtering and direct checks use the same union.
6. User-config skills enter the system prompt only when `actorUserId === spaceOwnerUserId`. Project, Mod, and platform skills still apply to collaborators.
7. Token values are redacted from tool output; do not diagnose a missing token by copying secrets into logs.

## Playbook

1. Identify the auth source:
   ```bash
   cohub auth whoami
   env | rg "COHUB_EXECUTION_TOKEN|COHUB_USER_UUID|COHUB_SPACE_ID"
   ```
2. For human CLI operations, unset the execution token and use the interactive session:
   ```bash
   unset COHUB_EXECUTION_TOKEN
   cohub auth login
   ```
3. For Agent automation, use platform-injected turn credentials and keep them out of files.
4. If visibility differs, compare the target Space, session/turn binding, and the additive permission union before changing application code.
5. If collaborators lack personal skills, check ownership; this is an intentional system-prompt boundary.

## Done when

- [ ] The failing request's principal and target Space are known
- [ ] No local execution token is shadowing intended Logto auth
- [ ] Account access and execution scopes are interpreted as a union
- [ ] Owner/member skill expectations match the actor identity

## Avoid

- Committing execution tokens
- Assuming the Sandbox has a laptop login session
- Treating an execution grant as a general-purpose user token
- Expecting members to receive the owner's `/configs/user` skills

---

[中文](../zh/playbooks/execution-token-identity.md)
