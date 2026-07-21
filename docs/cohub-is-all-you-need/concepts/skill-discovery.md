---
id: cohub.concept.skill-discovery
title: Skill discovery & cache
title_zh: Skill 发现与缓存
type: concept
related: [cohub.bp.skill-slash-discovery, cohub.bp.skill-catalog-cache, cohub.concept.skill]
sources:
  - packages/infra/src/config-runtime/skills.ts
  - apps/api/src/skills.ts
  - apps/api/src/routes/skills.route.ts
  - apps/worker/src/skills-cache.ts
---

# Skill discovery & cache · Skill 发现与缓存

## Catalog API

`GET /api/skills?spaceId=<optional>`

- No auth and no spaceId → empty list
- With `spaceId` requires `space.view`
- Loads merged catalog for `{ userId, spaceId }`

## Scopes in catalog

| scope | Directory (control plane) | Sandbox path shown to agents |
|-------|---------------------------|------------------------------|
| `platform` | `{platformConfigRoot}/platform/.agents/skills` | `/configs/platform/.agents/skills` |
| `mod` | checkpoint-cache `{modSpaceId}/latest/.agents/skills` | `/mods/<slug>/.agents/skills` |
| `user` | `{platformConfigRoot}/users/{userId}/.agents/skills` | `/configs/user/.agents/skills` |
| `project` | `{space}/workspace/.agents/skills` | `/workspace/.agents/skills` |

Merge: later scope overrides **same skill name**.

## Slash expansion

Composer input starting with `/skill:name` is expanded server-side (`expandSkillCommand`) into skill body + args before the agent run. Invalid/unknown names error.

## Redis cache

- TTL: **`SKILLS_CACHE_TTL_SEC = 24h`**
- Keys (simplified):
  - platform: fixed platform key
  - user: per `userId`
  - project: per `spaceId` + content/revision hash
  - mod: per `modSpaceId` + revision hash
  - space×mods aggregate: per space + mount signature + revisions fingerprint
- **Publish path**: saving user/platform config calls `publishSkillsCacheFromDir` and **SETs** Redis immediately (does not wait for TTL).
- Project/mod caches also key by directory revision (checkpoint meta) so new Saves tend to miss old entries.

## Implications

- After editing **project** skills in `/workspace`, slash catalog may lag until revision/TTL refresh — prefer Save or expect cache key change via revision.
- After editing **user/platform** skills, **Save the config Space** to republish files **and** refresh Redis.
- Agent runtime also walks skill dirs from disk for system prompt listings (parallel path to API catalog).
