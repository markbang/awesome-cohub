---
id: cohub.bp.egress-proxy
title: Sandbox egress via WARP
type: playbook
audience: [builder, agent]
features: [skill, sandbox, network]
difficulty: starter
related: [cohub.bp.social-research, cohub.bp.agent-with-skills]
sources:
  - https://github.com/markbang/warp-proxy-skill
---

# Sandbox egress via WARP

## When

Outbound requests from the Space sandbox need a Cloudflare WARP exit IP (or you must verify egress).

## Outcome

- Local SOCKS5/HTTP proxy on `127.0.0.1:10800`
- `curl` via proxy shows WARP/Cloudflare egress
- Scripts/skills can opt into the proxy

## Steps

1. Install skill (scripts ship inside the skill directory):
   ```bash
   npx skills add https://github.com/markbang/warp-proxy-skill \
     --skill warp-proxy --agent codex --yes --copy
   ```
2. Start:
   ```bash
   bash .agents/skills/warp-proxy/scripts/warp.sh
   bash .agents/skills/warp-proxy/scripts/warp.sh info
   ```
3. Use proxy for a command:
   ```bash
   bash .agents/skills/warp-proxy/scripts/warp-env.sh curl https://api.ipify.org
   # or
   source .agents/skills/warp-proxy/scripts/warp-env.sh
   ```
4. Point tools at `127.0.0.1:10800` (socks5/http) when needed.
5. `rotate` if you need a new device identity (IP may change within colo constraints).
6. `stop` when finished if policy wants idle cleanliness.

## Limits

- Userspace WireGuard (sing-box); no TUN without privileges
- Free WARP cannot pin arbitrary regions/colos
- Not a general anonymity guarantee — just egress via Cloudflare

## Done when

- [ ] `info` shows healthy proxy
- [ ] A real request exits via the proxy
- [ ] Dependent skill/command documented to use it

## Avoid

- Assuming WARP is installed globally outside the skill scripts
- Hardcoding third-party paid proxies into shared Spaces without review

---

[中文](../zh/playbooks/egress-proxy.md)
