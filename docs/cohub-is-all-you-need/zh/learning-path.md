---
id: cohub.meta.learning-path
title: 学习路径
type: guide
---

# 学习路径

选一条线走。每一步链到已有实践卡或 cookbook。

## 30 分钟 — 第一次完整闭环

1. [从空白 Space 到第一次存档](./playbooks/scratch-to-checkpoint.md)
2. [装备 Agent 并做实事](./playbooks/agent-with-skills.md)
3. [发布静态 Work](./playbooks/publish-static-work.md)

**完成标志：** 有 Space、有 Save、有可分享的 Work URL。

## 半天 — 个人 Agent OS

1. [在 config Space 管好默认规则](./playbooks/user-config-and-rules.md)
2. Cookbook：[配置常用 Skills](./cookbooks/config-skills-setup.md)
3. [三层搜索](./playbooks/search-layers.md)
4. [用 /skill: 发现技能](./playbooks/skill-slash-discovery.md)
5. 可选：[经 WARP 出站](./playbooks/egress-proxy.md)

**完成标志：** Save 之后 `/configs/user` 带上规则 + `hyper-search` 等。

## 半天 — 产品型 Work

1. Cookbook：[周末静态 Work](./cookbooks/weekend-static-work.md)
2. [Work Kit 产品](./playbooks/work-kit-product.md)
3. [最小权限](./playbooks/minimal-scopes.md)
4. [隐藏 Cohub 底栏](./playbooks/hide-cohub-bar.md)（Pro/Max）
5. [Work 生命周期](./playbooks/work-lifecycle.md)
6. 反模式：[静态 Work 上的 BrowserRouter](./anti-patterns/browser-router-static.md)、[把沙箱 URL 当上线](./anti-patterns/raw-sandbox-launch.md)

**完成标志：** directory Work 公网可开、权限收敛。

## 进阶 — 自治与运维

1. [定时循环](./playbooks/scheduled-loop.md) + 反模式 [循环无磁盘状态](./anti-patterns/loop-without-disk-state.md)
2. [Space Hooks 自动化](./playbooks/space-hooks-automation.md)
3. [分叉与提案](./playbooks/fork-and-proposal.md)
4. [执行令牌与身份](./playbooks/execution-token-identity.md)
5. [Skill 目录缓存](./playbooks/skill-catalog-cache.md)
6. Cookbook：[调研 Agent → Wiki](./cookbooks/research-agent-wiki.md)

## 角色入口

| 角色 | 从这里开始 |
|------|------------|
| 建造者 | 30 分钟 → 半天产品 Work |
| 运营者 | config skills + channel-ops + scheduled-loop |
| Agent 作者 | [AGENT_BRIEF.md](./AGENT_BRIEF.md) + skill 包装速查 |

## 常开

- [矩阵](./matrix.md)
- [FAQ 与排障](./cheatsheets/faq-and-troubleshooting.md)
- [术语表](./glossary.md)

---

[English](../learning-path.md)
