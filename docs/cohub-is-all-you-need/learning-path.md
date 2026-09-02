---
id: cohub.meta.learning-path
title: Learning path
type: guide
---

# Learning path

Pick a track. Each step links to an existing playbook or cookbook.

## 30 minutes — first durable loop

1. [From blank Space to first Save](./playbooks/scratch-to-checkpoint.md)
2. [Equip an agent and do real work](./playbooks/agent-with-skills.md)
3. [Publish a static App](./playbooks/publish-static-work.md)

**Done when:** you have a Space, a Save, and a shareable App URL.

## Half day — personal agent OS

1. [Own agent defaults in config Space](./playbooks/user-config-and-rules.md)
2. Cookbook: [Config skills setup](./cookbooks/config-skills-setup.md)
2b. [`.cohub` / `.agents` layers & priority](./playbooks/dot-cohub-layers.md)
3. [Three search layers](./playbooks/search-layers.md)
4. [Discover skills with /skill:](./playbooks/skill-slash-discovery.md)
5. Optional: [Sandbox egress via WARP](./playbooks/egress-proxy.md)

**Done when:** `/configs/user` carries your rules + `hyper-search` (and friends) after Save.

## Half day — product-shaped App

1. Cookbook: [Weekend static Work](./cookbooks/weekend-static-work.md)
2. [Work Kit product](./playbooks/work-kit-product.md)
3. [Minimal scopes](./playbooks/minimal-scopes.md)
4. [Hide Cohub bar](./playbooks/hide-cohub-bar.md) (Pro/Max presentation)
5. [Work lifecycle](./playbooks/work-lifecycle.md)
6. [Work/App presentation](./concepts/work-presentation.md)
7. Skim anti-patterns: [BrowserRouter on static Works](./anti-patterns/browser-router-static.md), [Raw sandbox URL as launch](./anti-patterns/raw-sandbox-launch.md)

**Done when:** directory App opens on a public URL with least privilege.

## Half day — Board and generation surfaces

1. [Semantic Board authoring](./concepts/board-semantic-authoring.md)
2. [Author, export, and play Boards](./playbooks/board-export-and-playback.md)
3. [Direct Generation turns](./concepts/direct-generation.md)
4. [Task Browser](./concepts/task-browser.md)
5. [Work promotions](./playbooks/work-promotions.md) when measuring public traffic

**Done when:** a Board snapshot validates before publish, a generation Task Run is inspectable, and a Work funnel has an explicit attribution policy.

## Half day — App Center and Space insight

1. [App Center](./playbooks/app-center.md) - install and maintain Apps in a Space
2. [Space Activity](./playbooks/space-activity.md) - usage, contributors, model rankings, and App views
3. [Command palette](./concepts/command-palette.md) - Recent, personal relevance, and Prompt quick actions

**Done when:** installed-App state is validated, activity data respects viewer cost visibility, and navigation starts from a useful personal Recent list.

## Advanced — autonomy & ops

1. [Scheduled loop](./playbooks/scheduled-loop.md) + anti-pattern [Loop without disk state](./anti-patterns/loop-without-disk-state.md)
2. [Space Hooks automation](./playbooks/space-hooks-automation.md)
3. [Fork and proposal](./playbooks/fork-and-proposal.md)
4. [Execution token identity](./playbooks/execution-token-identity.md)
5. [Skill catalog cache](./playbooks/skill-catalog-cache.md)
6. Cookbook: [Research agent → wiki](./cookbooks/research-agent-wiki.md)

## Roles

| Role | Start here |
|------|------------|
| Builder (human) | 30 minutes → Half day product App |
| Operator | config skills + channel-ops + scheduled-loop |
| Agent author | [AGENT_BRIEF.md](./AGENT_BRIEF.md) + skill packaging cheatsheet |

## Always open

- [Matrix](./matrix.md) — intent → card
- [FAQ & troubleshooting](./cheatsheets/faq-and-troubleshooting.md)
- [Glossary](./glossary.md)

---

[中文](./zh/learning-path.md)
