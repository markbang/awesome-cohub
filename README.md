<p align="center">
  <a href="https://cohub.run">
    <img
      width="1440"
      alt="Awesome Cohub"
      src="https://cdn.jsdelivr.net/gh/markbang/awesome-cohub@main/assets/banner.svg"
    />
  </a>
</p>

<div align="center">
  <strong>
    A curated list of the Cohub ecosystem — Spaces, Agents, Skills, Works, CLI, and community resources.
    <br />
    Hand-picked for people building with people and agents.
  </strong>
  <br />
  <br />
</div>

<div align="center">

[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)
[![Cohub](https://img.shields.io/badge/Cohub-Ecosystem-FF4500?style=flat-square)](https://cohub.run)
[![CLI](https://img.shields.io/npm/v/@neta-art/cohub-cli?label=cohub-cli&color=FF4500&style=flat-square)](https://www.npmjs.com/package/@neta-art/cohub-cli)
[![License: CC0-1.0](https://img.shields.io/badge/License-CC0_1.0-lightgrey.svg?style=flat-square)](LICENSE)

</div>

# Awesome Cohub

> Your own space to create, play, and build with people and agents.

[Cohub](https://cohub.run) is a living Space for people and agents. Start anywhere, make in any medium, share as Works.

This repository curates the best public entry points into the Cohub ecosystem:

- product surface and docs
- CLI / SDK
- official skills
- core concepts (Space, Checkpoint, Work, Channel)
- community tools, examples, and related projects

Inspired by the [Awesome](https://awesome.re) format and the VoltAgent awesome series presentation style.

## Contents

- [Official](#official)
- [Core Concepts](#core-concepts)
- [Product Surface](#product-surface)
- [CLI and SDK](#cli-and-sdk)
- [Official Skills](#official-skills)
- [Platform Architecture](#platform-architecture)
- [Related Projects](#related-projects)
- [Learning Resources](#learning-resources)
- [Cohub Is All You Need](#cohub-is-all-you-need)
- [Contributing](#contributing)

## Official

- **[Cohub](https://cohub.run)** - Browser-first creative space for people and agents.
- **[Cohub monorepo](https://github.com/talesofai/cohub)** - Source for API, agent, sandbox, gateway, web, and packages.
- **[talesofai](https://github.com/talesofai)** - GitHub org for Cohub and related open-source projects.

## Core Concepts

- **Space** - Live, isolated creative surface with chats, files, tasks, previews, and agents.
- **Checkpoint (Save)** - Immutable snapshot of a Space at a meaningful moment.
- **Proposal** - Collaboration flow for bringing checkpoint work back into another Space.
- **Session (Chat)** - Conversation context inside a Space.
- **Agent** - Active collaborator operating inside a Space.
- **Channel** - External entry point such as Discord, Telegram, Feishu, or WeChat.
- **Sandbox** - Execution runtime behind a Space.
- **Work** - Public share of a file, directory site, or live port from a Space.

## Product Surface

- **Spaces** - Create, fork, save, and collaborate in isolated environments.
- **Checkpoints / Saves** - Freeze progress and remix from a stable base.
- **Works** - Publish demos, pages, and live previews with shareable URLs.
- **Multimodal generation** - Text, image, video, and music generation from Space context.
- **External channels** - Talk to a Space from chat apps and CLIs.
- **Cross-space references** - Point agents at other Spaces with `@space` context.

## CLI and SDK

- **[@neta-art/cohub-cli](https://www.npmjs.com/package/@neta-art/cohub-cli)** - Official CLI for spaces, sessions, prompts, files, generation, and automation.
- **[@neta-art/cohub](https://www.npmjs.com/package/@neta-art/cohub)** - TypeScript SDK for spaces, sessions, checkpoints, and realtime collaboration.
- **[cohub-desktop](https://github.com/markbang/cohub-desktop)** - Desktop companion prototype for Cohub.

### Install CLI

```bash
npm install -g @neta-art/cohub-cli
cohub --help
```

### Common commands

```bash
cohub auth login
cohub spaces ls
cohub -s <space-id> prompt "Build a landing page"
cohub generate "neon city skyline at dusk" --model <model>
cohub -s <space-id> spaces files ls
```

## Official Skills

Standard agent skills for the Cohub ecosystem. Install with [`npx skills`](https://github.com/vercel-labs/skills).

### Cohub platform skills

| Skill | Repo / path | Description |
|---|---|---|
| **cohub** | [talesofai/cohub](https://github.com/talesofai/cohub/tree/main/skills/cohub) | Spaces, chats, files, saves, labels, search, tasks, scheduled prompts, cross-space run |
| **cohub-generate** | [talesofai/cohub](https://github.com/talesofai/cohub/tree/main/skills/cohub-generate) | Image, video, and music generation via `cohub generate` |
| **cohub-works-share** | [talesofai/cohub](https://github.com/talesofai/cohub/tree/main/skills/cohub-works-share) | Publish files, directory sites, or ports as public Works |
| **public-share** | [talesofai/cohub](https://github.com/talesofai/cohub/tree/main/skills/public-share) | Publish runtime files to `/public` and return direct public URLs |

### Ecosystem skills

| Skill | Repo | Description |
|---|---|---|
| **warp-proxy** | [markbang/warp-proxy-skill](https://github.com/markbang/warp-proxy-skill) | WARP proxy scripts + skill (SOCKS5/HTTP `:10800`) |
| **hyper-search** | [kjx-talesofai/claude-skill-hyper-search](https://github.com/kjx-talesofai/claude-skill-hyper-search) | Recommended **config Space** web search (multi-provider fallback) |
| **lark-lite** | [kjx-talesofai/claude-skill-lark-lite](https://github.com/kjx-talesofai/claude-skill-lark-lite) | Lightweight Feishu/Lark ops as **user identity** (not bot-first) via `lark-cli` |
| **fandom-cli** | [kjx-talesofai/claude-skill-fandom-cli](https://github.com/kjx-talesofai/claude-skill-fandom-cli) | Query Fandom/MediaWiki wikis (pages, infobox, search, images) without HTML scraping |
| **wikis** | [markbang/wikis-skill](https://github.com/markbang/wikis-skill) | HTTP API skill for 250K+ community wikis (search, md, infobox, image proxy) |
| **wgetx** | [markbang/wgetx-skill](https://github.com/markbang/wgetx-skill) | Pure ESM `.mjs` social fetch skill (no npm for default scrapers) |
| **cohub-work-kit** | [markbang/cohub-work-skill](https://github.com/markbang/cohub-work-skill) | Scaffold Cohub Works (Vite + React + TanStack Query template bundled) |
| **cohub-work-publish** | [markbang/cohub-work-skill](https://github.com/markbang/cohub-work-skill) | Build + publish directory Works with minimal scopes |

### Install (`.agents/`)

Skills install into **`.agents/skills/<name>/`**. Full catalog is the tables above — pick a repo + skill name from there.

```bash
# example: config Space web search (then Save to publish → /configs/user)
npx skills add https://github.com/kjx-talesofai/claude-skill-hyper-search \
  --skill "hyper-search" \
  --yes \
  --copy

# example: sandbox social fetch
npx skills add https://github.com/markbang/wgetx-skill \
  --skill "wgetx" \
  --yes \
  --copy
```

```bash
# list skills in a package first
npx skills add https://github.com/markbang/wgetx-skill --list
```

> **Note:** Prefer **config Space** for personal defaults (`hyper-search`, `lark-lite`, `fandom-cli`, `wikis`) — install there, then **Save** so they publish to `/configs/user/.agents/skills/`. Project/sandbox tools (`warp-proxy`, `wgetx`, work-kit) can live in the Space workspace. `npx skills add --copy` copies the skill tree; scripts under `skills/<name>/scripts/` land in `.agents/skills/<name>/scripts/`.

### Post-install runtime deps

```bash
# lark-lite
npm install -g @larksuite/cli
# then: lark-cli auth login --scope "$(cat lark-lite-scopes.txt)"  # see skill README; avoid --recommend alone

# fandom-cli (sandbox-local venv recommended on Cohub)
# python3 -m venv ~/venvs/fandom-cli && PIP_USER=false ~/venvs/fandom-cli/bin/pip install -e .agents/skills/fandom-cli

# wgetx: pure ESM .mjs — no npm for default HTTP scrapers
# optional browser flows only:
#   cd .agents/skills/wgetx && npm init -y && npm i playwright && npx playwright install chromium
```

### Why skills matter

Cohub agents become useful when they know:

1. which product nouns map to which CLI commands
2. how to keep outputs inside Space conventions
3. how to publish Works and share results cleanly
4. how to run multimodal generation without inventing fake APIs
5. how to pull external knowledge / social data / network egress tools on demand

## Platform Architecture

High-level shape of the Cohub monorepo:

```text
cohub/
├── apps/
│   ├── api/        # Hono API — orchestration, provisioning, session persistence
│   ├── agent/      # Agent control service
│   ├── sandbox/    # Sandbox executor
│   ├── gateway/    # External channel gateway
│   ├── web/        # SvelteKit web app
│   └── worker/     # Cron and async task processing
├── packages/
│   ├── protocol/   # Shared types and protocols
│   ├── sdk/        # Client SDK
│   └── cli/        # Cohub CLI
├── skills/         # Official agent skills
└── docs/           # Product and architecture docs
```

### Stack

- **Language**: TypeScript + Go
- **Frontend**: SvelteKit
- **Backend**: Hono
- **Database**: PostgreSQL + Drizzle ORM
- **Infra**: Kubernetes
- **Package manager**: pnpm monorepo

## Related Projects

Community and adjacent projects that pair well with Cohub workflows.

### Ecosystem packages

- **[kjx-talesofai/claude-skill-hyper-search](https://github.com/kjx-talesofai/claude-skill-hyper-search)** — config Space web search.
- **[kjx-talesofai/claude-skill-lark-lite](https://github.com/kjx-talesofai/claude-skill-lark-lite)** — Feishu/Lark lite (`lark-cli`, user identity).
- **[kjx-talesofai/claude-skill-fandom-cli](https://github.com/kjx-talesofai/claude-skill-fandom-cli)** — Fandom/MediaWiki CLI skill.
- **[markbang/wikis-skill](https://github.com/markbang/wikis-skill)** — Wikis HTTP API skill (`wikis`).
- **[markbang/warp-proxy-skill](https://github.com/markbang/warp-proxy-skill)** - Cloudflare WARP userspace proxy skill for sandboxes.
- **[markbang/wgetx-skill](https://github.com/markbang/wgetx-skill)** - Multi-platform social media fetch skill + scripts.
- **[markbang/cohub-work-skill](https://github.com/markbang/cohub-work-skill)** - Work Kit template + publish skills for Cohub Works.
- **[markbang/cohub-desktop](https://github.com/markbang/cohub-desktop)** - Desktop companion prototype for Cohub.

### Adjacent agent resources

- **[awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills)** - Broad curated catalog of agent skills across tools and ecosystems.
- **[awesome-design-md](https://github.com/VoltAgent/awesome-design-md)** - Brand `DESIGN.md` systems agents can apply to UI work.
- **[diffusionstudio/lottie](https://github.com/diffusionstudio/lottie)** - Text-to-Lottie skill pipeline for production motion assets.

> Have a Cohub-related project? Open a PR. See [Contributing](#contributing).


## Cohub Is All You Need

Best-practice series for **builders** and **agents** — from first Save to Works, config, and autonomy.

| | |
|--|--|
| **EN index** | [docs/cohub-is-all-you-need/README.md](docs/cohub-is-all-you-need/README.md) |
| **中文** | [docs/cohub-is-all-you-need/zh/README.md](docs/cohub-is-all-you-need/zh/README.md) |
| **Start** | [Learning path](docs/cohub-is-all-you-need/learning-path.md) · [AGENT_BRIEF](docs/cohub-is-all-you-need/AGENT_BRIEF.md) · [Cookbooks](docs/cohub-is-all-you-need/cookbooks/) · [FAQ](docs/cohub-is-all-you-need/cheatsheets/faq-and-troubleshooting.md) |
| **Manifesto** | [EN](docs/cohub-is-all-you-need/manifesto.md) · [中文](docs/cohub-is-all-you-need/zh/manifesto.md) |
| **Matrix** | [EN](docs/cohub-is-all-you-need/matrix.md) · [中文](docs/cohub-is-all-you-need/zh/matrix.md) |
| **Playbooks** | [EN](docs/cohub-is-all-you-need/playbooks/) · [中文](docs/cohub-is-all-you-need/zh/playbooks/) (30) |
| **Concepts / Anti-patterns / Cheatsheets** | [concepts](docs/cohub-is-all-you-need/concepts/) (20) · [anti-patterns](docs/cohub-is-all-you-need/anti-patterns/) (15) · [cheatsheets](docs/cohub-is-all-you-need/cheatsheets/) (6) |
| **Banner** | [animated SVG](https://cdn.jsdelivr.net/gh/markbang/awesome-cohub@main/docs/cohub-is-all-you-need/assets/banner.svg) · [architecture](docs/cohub-is-all-you-need/assets/architecture.svg) |
| **Changelog** | [guide CHANGELOG](docs/cohub-is-all-you-need/CHANGELOG.md) |


## Learning Resources

- **[Cohub README](https://github.com/talesofai/cohub/blob/main/README.md)** - Product pitch, concepts, and repo map.
- **[Co-creation model](https://github.com/talesofai/cohub/blob/main/docs/CO-CREATION-MODEL.md)** - Space / Checkpoint / Proposal mental model.
- **[Works guide](https://github.com/talesofai/cohub/blob/main/docs/works-guide.md)** - Publishing public Works.
- **[Self-hosting notes](https://github.com/talesofai/cohub/blob/main/docs/self-hosting.md)** - Deployment-oriented docs from the monorepo.


## Contributing

Contributions welcome.

1. Keep entries useful, public, and Cohub-related.
2. Prefer short descriptions.
3. Add links under the most specific section.
4. Avoid AI-slop dumps and unmaintained placeholders.

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[CC0 1.0 Universal](LICENSE) — public domain dedication for the list content.

---

<div align="center">
  <sub>Built for the Cohub ecosystem · <a href="https://cohub.run">cohub.run</a></sub>
</div>
