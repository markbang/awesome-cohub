---
id: cohub.bp.egress-proxy
title: Sandbox egress via WARP
title_zh: 沙箱走 WARP 出口
type: playbook
audience: [builder, agent]
features: [skill, sandbox, network]
difficulty: starter
related: [cohub.bp.social-research, cohub.bp.agent-with-skills]
sources:
  - https://github.com/markbang/warp-proxy-skill
---

# Sandbox egress via WARP · 沙箱走 WARP 出口

## When · 何时用

EN: Outbound requests from the Space sandbox need a Cloudflare WARP exit IP (or you must verify egress).
中文：Space 沙箱出站需要 Cloudflare WARP 出口（或你要验证出口 IP）。

## Outcome · 结果

- Local SOCKS5/HTTP proxy on `127.0.0.1:10800`
- `curl` via proxy shows WARP/Cloudflare egress
- Scripts/skills can opt into the proxy

## Steps · 步骤

### EN
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

### 中文
1. 安装 skill（脚本在 skill 目录内）。
2. `warp.sh` 启动并 `info` 查看。
3. 用 `warp-env.sh` 包裹命令或 `source` 进当前 shell。
4. 需要时让工具走 `127.0.0.1:10800`。
5. 需要新身份再 `rotate`（同 colo 内 IP 可能变；免费版不能指定地区）。
6. 结束后按需 `stop`。

## Limits · 限制

- Userspace WireGuard (sing-box); no TUN without privileges
- Free WARP cannot pin arbitrary regions/colos
- Not a general anonymity guarantee — just egress via Cloudflare

## Done when · 完成标准

- [ ] `info` shows healthy proxy
- [ ] A real request exits via the proxy
- [ ] Dependent skill/command documented to use it

## Avoid · 别这样做

- Assuming WARP is installed globally outside the skill scripts
- Hardcoding third-party paid proxies into shared Spaces without review
