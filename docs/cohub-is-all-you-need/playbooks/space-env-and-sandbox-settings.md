---
id: cohub.bp.space-env-sandbox
title: Space env vars and sandbox settings
type: playbook
audience: [builder, operator]
features: [space, sandbox, env]
difficulty: intermediate
related: [cohub.concept.sandbox, cohub.bp.egress-proxy, cohub.cheat.paths-mounts]
sources:
  - https://cohub.run/docs/workspace/spaces
  - https://cohub.run/docs/workspace/files-and-sandbox
---

# Space env vars and sandbox settings

## When

The agent needs API keys, model endpoints, or a different sandbox size/idle policy — without baking secrets into git.

## Outcome

- Secrets live in **Space env / config**, not in committed files  
- You know sandbox settings (spec, hibernation/auto-destroy) affect cost and cold start  
- Paths stay sandbox-shaped (`/workspace`, `/configs/*`)

## Steps

1. **Space settings → Env** — add runtime environment variables the sandbox should inject.
2. Prefer **config Space** for personal defaults that should follow you; project secrets stay on the project Space.
3. **Sandbox** — pick spec (e.g. boost) and idle/auto-destroy policy that matches the job.
4. Changing **Mods** may restart the sandbox — plan around that.
5. Verify in a prompt: `printenv | sort` (redact in logs) or a minimal script that reads only required keys.

## Done when

- [ ] Required keys exist in the running sandbox  
- [ ] Repo has no live secrets  
- [ ] Idle policy matches whether this is a 24/7 loop or a daytime builder Space  

## Avoid

- Committing `.env` with production tokens  
- Assuming laptop `~/.config` exists in sandbox ([execution-token](./execution-token-identity.md))  
- Infinite idle on expensive specs “just in case”  

---

[中文](../zh/playbooks/space-env-and-sandbox-settings.md)
