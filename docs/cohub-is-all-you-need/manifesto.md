# Cohub Is All You Need

**v0.2** · Best practices for people and agents building in [Cohub](https://cohub.run)

> Your own space to create, play, and build with people and agents.

This manifesto is not a feature catalog. It is a **practice map**: how to think, choose surfaces, and ship work without fighting the product.

Companion: [Scenario matrix](./matrix.md) · [Playbooks](./playbooks/) · [中文](./zh/manifesto.md)

Official: [Product docs](https://cohub.run/docs) · [Changelog](https://cohub.run/changelog)

---

## 0. The claim

You do not need a separate “chat app + drive + CI + staging + CMS + bot host” to collaborate with agents.

You need:

1. a **live place** to work (Space)
2. a **time machine** for good moments (Checkpoint / Save)
3. a **shareable surface** for others (Work)
4. **agents and skills** that operate in the same place
5. **optional doors** (CLI, Discord, Feishu, WeChat, …)

That bundle is Cohub. Everything else is a specialization on top.

---

## 1. Mental model (learn these seven nouns)

| UI noun | Also called | Practice |
|---------|-------------|----------|
| **Space** | space | One Space ≈ one project / experiment / product line |
| **Chat** | session | One mission per Chat; fork to explore alternatives |
| **Save** | checkpoint | Save milestones & pre-risk states; read diffs |
| **Agent** | agent | Skills + files + smoke tests, not essay-only prompts |
| **Work** | work | Publish file / directory / port for others to open |
| **Channel** | channel | Same Space, different doors (Discord / Feishu / …) |
| **Sandbox** | sandbox | Where commands, ports, and skills execute |
| **Mod** | mod | Read-only mount under `/mods/<slug>` for shared tooling |
| **Skill** | skill | `/skill:name` reusable capability |
| **Task** | task run | Async jobs, generations, hook runs |
| **Space Hook** | `.cohub/hooks/*` | Event automation (fs / turn / save / workspace ready) |
| **User config Space** | `name=config` | Publishes personal rules/skills to `/configs/user` on Save |

### The core loop

```text
open / fork Space
  → talk + edit files with agents
  → Save (Checkpoint) when it matters
  → publish a Work when others should open it
  → fork again / propose back / iterate
```

If you only remember one diagram, remember that.

---

## 2. Principles

### P1 — Space is the unit of work
Don’t scatter truth across private DMs, random local folders, and three dashboards.  
Put code, prompts, outputs, and agent state in the **Space files**.

### P2 — Save is the unit of time
A Save is not “git, but worse”. It is a **product moment**: playable, forkable, restorable.  
Save when a human would say “keep this version”.

### P3 — Work is the unit of sharing
Sandbox links and local previews are for authors.  
**Works** are for viewers. Prefer published Works for demos and products.

### P4 — Least privilege by default
Grant `workScopes` for safe reads the Work always needs.  
Request `viewerScopes` only on **user gesture** for prompt / generation / account-level actions.

### P5 — Agents need skills and filesystem, not essays
Long system prompts without skills/files are fragile.  
Install skills, write small state files, run commands, verify outputs.

### P6 — Mutable truth stays out of `dist/`
Published static assets are snapshots.  
Live data belongs in Space files, sessions, billing, or APIs the Work is allowed to call.

### P7 — Same product surface, many doors
Web UI, CLI (`@neta-art/cohub-cli`), and channels should drive the **same Space**.  
Don’t invent a second ops path that bypasses Saves/Works.

---

## 3. Capability map (what to use when)

### 3.1 Spaces & Files
**Use for:** project home, assets, agent-readable state, configs.  
**Practice:** keep a clear tree (`src/`, `data/`, `docs/`, `.agents/skills/`).  
**Avoid:** only chatting; files are the durable memory.

### 3.2 Sessions & Agents
**Use for:** exploration, implementation, review, ops.  
**Practice:** one Session per mission; link skills; smoke-test after installs.  
**Avoid:** infinite mega-threads with no Saves.

### 3.3 Checkpoints
**Use for:** milestones, handoff, fork bases, recovery.  
**Practice:** Save before big refactors / publish / untrusted agent autonomy.  
**Avoid:** zero Saves until disaster.

### 3.4 Works
Targets:

| Target | Good for | Notes |
|--------|----------|-------|
| `file` | Single HTML artifact | `.html` only, size limits apply |
| `directory` | Sites / built apps | needs `index.html`; prefer `base: "./"` + hash routes |
| `port` | Live dev servers | great for preview; not the default production shape |

Runtime truth: `cohub.context()` / auth / commerce work **inside the published Work shell**, not on raw static asset URLs.

Official guide: [works-guide.md](https://github.com/talesofai/cohub/blob/main/docs/works-guide.md)

### 3.5 Generations
**Use for:** image / video / music (and related multimodal tasks) in Space context.  
**Practice:** write outputs into Space files; Save good results; track cost/credits.  
**Skill:** `cohub-generate`  
Official: [generations.md](https://github.com/talesofai/cohub/blob/main/docs/generations.md)

### 3.6 CLI & automation
**Use for:** scripts, CI-like loops, headless ops.  
**Practice:** `cohub -s <spaceId> …` against the real Space; store ids/slugs in files.  
Package: `@neta-art/cohub-cli` (npm scope) · monorepo [talesofai/cohub](https://github.com/talesofai/cohub)

### 3.7 Channels
**Use for:** meeting people where they already chat.  
**Practice:** channel → same Space → same files/Saves/Works.  
**Avoid:** channel-only workflows with no Space filesystem.

### 3.8 Mods & Skills
**Use for:** reusable agent capabilities.

| Skill package | Role |
|---------------|------|
| [markbang/wgetx-skill](https://github.com/markbang/wgetx-skill) | Social fetch (ESM, no npm for defaults) |
| [markbang/warp-proxy-skill](https://github.com/markbang/warp-proxy-skill) | WARP egress proxy in sandbox |
| [markbang/cohub-work-skill](https://github.com/markbang/cohub-work-skill) | Work kit template + publish flow |
| [talesofai/okp](https://github.com/talesofai/okp) | `okp` — structured knowledge search, navigation, and ingestion |
| Platform skills in monorepo | `cohub`, `cohub-generate`, works/public share |

Install pattern:

```bash
npx skills add <repo-url> --skill <name> --agent codex --yes --copy
```

Skills must ship assets **inside** `skills/<name>/` so install copies them.

---


### 3.9 In-Space knowledge base (wiki compound interest)

Cohub does not require an external knowledge product to start compounding context.
A Space **is** a knowledge base when files are structured for reuse.

Recommended layout (pattern used by long-running context Spaces):

```text
raw/                 # immutable evidence (exports, dumps, mirrored sources)
wiki/                # compounding understanding (edit in place)
  index.md           # living catalog — update when content changes
  log.md             # append-only timeline of ingests / decisions
  overview.md        # what this knowledge Space is for
  topics/ entities/ analyses/ queries/ ...
runtime/             # optional agent routes, source registry, protocols
.agents/skills/      # optional ops skills for this knowledge Space
```

Practice:

1. **raw is evidence** — don’t rewrite history; add sources  
2. **wiki is current understanding** — a new input should update 5–10 existing pages, not only create `+1` file  
3. **log is append-only** — what changed, when, with links back to pages  
4. **index is the query surface** — humans and agents start here  
5. Path: **semantic page first → confirm with evidence in raw → then act**

This is how teams and agents share memory without pasting essays into every prompt.


### 3.10 Space Hooks & scheduled prompts

**Scheduled prompts** — time-based recurrence (“every Monday review”).  
**Space Hooks** (v1.103+) — domain events declared as files:

```text
.cohub/hooks/*.yml
```

Events: `space.fs.changed` · `space.workspace.ready` · `session.turn.finalized` · `checkpoint.created`  
Actions: `run` (sandbox shell) or `prompt` (Chat/session)

Practice: one file per hook; FS matching ignores `.cohub/**` to prevent loops; filter turns with `sessionIds` / `sources`.  
Playbook: [space-hooks-automation](./playbooks/space-hooks-automation.md) · Doc: [space-hooks.md](https://github.com/talesofai/cohub/blob/main/docs/space-hooks.md)


### 3.11 Work commerce

One-time products on a **published Work**: feature unlocks and consumable credits.

- Runtime only inside Cohub Work shell (`context()` / `work.commerce.*`)
- Host owns checkout redirect state; Work displays gates/balances and triggers purchase/consume
- Version product keys; never mutate price in place; `operationId` for idempotent credit consumes

Playbook: [work-commerce](./playbooks/work-commerce.md) · Guide: [work-commerce-guide.md](https://github.com/talesofai/cohub/blob/main/docs/work-commerce-guide.md)


### 3.12 Home, Sessions inbox, Mods, `/skill:`

- **Home Space** — default landing Space (`home`); optional bootstrap checkpoint; still a full Space.
- **Sessions inbox (`/sessions`)** — cross-space Chat radar; new chat can target a Space without losing inbox chrome.
- **Mods** — mount shared Spaces at `/mods/<slug>`; source owns writes; consumers read.
- **`/skill:name`** — composer slash discovery across platform / mod / user / project skills (expand on send).

Playbooks: [home-and-sessions-inbox](./playbooks/home-and-sessions-inbox.md) · [mod-mount](./playbooks/mod-mount.md) · [skill-slash-discovery](./playbooks/skill-slash-discovery.md)


### 3.13 User config Space (not Home)

Cohub has a dedicated **owner config Space** recognized when **`space.name === "config"`**.

On **Save**, the worker publishes a whitelist (`AGENTS.md`, `CLAUDE.md`, `.agents/`, `.cohub/`) to owner storage and every sandbox mounts it read-only at **`/configs/user`**.

Effects:

- **User Rules** (`AGENTS.md`) enter chat system context automatically
- **User skills** appear under `/configs/user/.agents/skills` and in `/skill:` discovery
- Skill precedence: `platform → mods → user → workspace` (same name: later wins)

**Home Space is not config.** Home does not publish user config on Save.  
**Mods are not user config.** Mods share team/base tooling; config Space is personal defaults.

Playbook: [user-config-and-rules](./playbooks/user-config-and-rules.md) · Concept: [user-config-space](./concepts/user-config-space.md) · Cheat: [config-layers](./cheatsheets/config-layers.md)


### 3.14 Platform config Space

Pinned by **`PLATFORM_SPACE_ID`**. Saving it publishes whitelist → `/configs/platform` and refreshes platform skill/prompt/model caches. Mounted read-only as `/configs/platform/.agents` in every sandbox.

Playbook: [platform-config](./playbooks/platform-config.md)

### 3.15 Skill catalog & `/skill:` cache

`GET /api/skills` merges platform → mod → user → project. Redis catalogs TTL **24h**; user/platform Save **SETs** cache immediately; project/mod keys hash revisions. `/skill:name` expands server-side before the agent runs.

Playbook: [skill-catalog-cache](./playbooks/skill-catalog-cache.md) · Concept: [skill-discovery](./concepts/skill-discovery.md)

### 3.16 Execution token identity

Agent tools inject **`COHUB_EXECUTION_TOKEN`** (signed execution grant, **24h TTL**, space/turn scoped). CLI env overrides Logto. API verifies execution grants before user sessions. **User skills enter the system prompt only if actor === space owner.**

Playbook: [execution-token-identity](./playbooks/execution-token-identity.md) · Concept: [execution-token](./concepts/execution-token.md)


### 3.17 Search layers (and hyper-search)

Cohub **includes product search** for Spaces/Chats/turns/labels (`/api/search`).  
It does **not** ship a first-class **web SERP** or hosted RAG over your wiki.

For web search, install **[hyper-search](https://github.com/kjx-talesofai/claude-skill-hyper-search)** into your **config Space**, Save to publish, then use `/skill:hyper-search` or:

```bash
node /configs/user/.agents/skills/hyper-search/scripts/cli.js search "query"
```

Playbook: [search-layers](./playbooks/search-layers.md)

## 4. Builder playbook (human)

### Start
1. Create or fork a Space  
2. Write a 10-line goal in `README.md` or `GOAL.md`  
3. Install only the skills this mission needs  

### Build
4. Keep source and outputs in Space files  
5. Use Sessions for missions; Save when green  
6. Prefer small agent loops with verification commands  

### Ship
7. For static demos: build → publish **directory Work**  
8. For Cohub-interactive products: Work Kit runtime + minimal scopes  
9. Put the public URL in the Space README  

### Operate
10. Prefer scheduled prompts + on-disk state for recurrence  
11. Rotate secrets; don’t commit cookies/tokens  
12. Fork Saves to explore; don’t mutate the only good timeline blindly  

---

## 5. Agent playbook (operator model)

### Before coding
- Resolve Space id / paths; don’t invent mount points  
- Read AGENTS.md / skill SKILL.md if present  
- Prefer existing skills over re-implementing scrapers/tools  

### While coding
- Smallest correct change  
- Write artifacts under agreed directories (`data/`, `apps/`, …)  
- Smoke-test with low limits before large crawls/generations  

### When publishing
- Confirm `base: "./"` and hash routing for static Works  
- List scopes explicitly; refuse “full access just in case”  
- Return public Work URL + how to verify `ready`  

### When stuck
- Save progress  
- Record failure (HTTP status, path, command) in a file  
- Ask for the missing permission or product decision, not a blank rewrite  

---

## 6. Anti-patterns

See also expanded cards in [anti-patterns/](./anti-patterns/).

| Anti-pattern | Why it hurts | Do this instead |
|--------------|--------------|-----------------|
| Chat-only project | No durable truth | Files + Saves |
| Raw sandbox URL as “launch” | Unstable, wrong audience | Publish a Work |
| BrowserRouter on static Work | Asset/route 404s | HashRouter + `base: "./"` |
| Baking live data into `dist` | Stale + insecure | Read Space files/API at runtime |
| Auth on page load | Bad UX + over-permission | Gesture + viewer scopes |
| Mega skill dump unused | Noise, risk, cost | Install per mission |
| No Saves before agent autonomy | Hard to recover | Checkpoint first |
| Rebuilding Cohub auth in the Work | Duplicate identity | SDK `auth.request` |

---

## 7. Cheatsheet

### Public Work URL
```text
/:username/:spaceSlug/w/:workSlug
```

### Minimal static publish intent
```bash
pnpm build   # or your builder
cohub -s "$COHUB_SPACE_ID" works publish <slug> \
  --dir <space-relative-dist> \
  --work-scope file.view
```

### Work permissions (current mental split)
- **workScopes** (publisher grants to Work): e.g. `space.view`, `session.view`, `file.view`, `taskrun.view`
- **viewerScopes** (viewer may allow): e.g. `session.prompt.*`, `generation.create`, `user.*`

Always start smaller than you think.

---

## 8. How this doc will grow

| Layer | Now | Later |
|-------|-----|-------|
| Manifesto | this file (v0.2) | revise with product changes |
| [Matrix](./matrix.md) | scenario index | keep IDs stable |
| [Playbooks](./playbooks/) | 24 playbooks | add new scenarios as product grows |
| [Concepts](./concepts/) | core nouns | add sparingly |
| Knowledge-base pattern | §3.9 + playbook | evolve with real Spaces |

---

## 9. One-page summary

**Cohub is all you need** when your loop is:

```text
Space (work) → Agent+Skills (do) → Checkpoint (keep) → Work (share) → Fork (again)
```

Use the [scenario matrix](./matrix.md) and [playbooks](./playbooks/) to pick the next concrete path.

---

*Part of [awesome-cohub](https://github.com/markbang/awesome-cohub) · monorepo [talesofai/cohub](https://github.com/talesofai/cohub)*
