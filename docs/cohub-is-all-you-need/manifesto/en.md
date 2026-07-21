# Cohub Is All You Need

**v0.1** · Best practices for people and agents building in [Cohub](https://cohub.run)

> Your own space to create, play, and build with people and agents.

This manifesto is not a feature catalog. It is a **practice map**: how to think, choose surfaces, and ship work without fighting the product.

Companion: [Scenario matrix](../matrix.md) · [中文版](./zh.md)

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

| Noun | Meaning | Practice |
|------|---------|----------|
| **Space** | Live, isolated creative container | One Space ≈ one project / experiment / product line |
| **Checkpoint (Save)** | Immutable snapshot of a meaningful moment | Save before risky agent runs; Save when “this works” |
| **Session (Chat)** | Conversation context inside a Space | Split long threads; don’t overload one chat forever |
| **Agent** | Active collaborator inside the Space sandbox | Give skills + files; verify with small smoke tests |
| **Work** | Published page from file / directory / port | Share demos and products via public Work URLs |
| **Channel** | External entry into a Space | Same Space, different doors |
| **Sandbox** | Execution runtime behind the Space | Where commands, servers, and skills actually run |

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
| Manifesto | this file | revise with product changes |
| [Matrix](../matrix.md) | scenario index | each row → playbook card |
| Playbooks / concepts | folders ready | bilingual cards + frontmatter |
| Knowledge-base pattern | section 3.9 + matrix row | dedicated playbook cards |

---

## 9. One-page summary

**Cohub is all you need** when your loop is:

```text
Space (work) → Agent+Skills (do) → Checkpoint (keep) → Work (share) → Fork (again)
```

Use the [scenario matrix](../matrix.md) to pick the next concrete path.

---

*Part of [awesome-cohub](https://github.com/markbang/awesome-cohub) · monorepo [talesofai/cohub](https://github.com/talesofai/cohub)*
