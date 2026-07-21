---
id: cohub.bp.skill-catalog-cache
title: Debug skill slash catalog and cache
type: playbook
audience: [builder, agent]
features: [skill, cache, slash]
difficulty: advanced
related: [cohub.concept.skill-discovery, cohub.bp.skill-slash-discovery, cohub.bp.user-config-and-rules]
sources:
  - packages/infra/src/config-runtime/skills.ts (TTL 24h)
  - apps/api/src/routes/skills.route.ts
  - apps/worker/src/skills-cache.ts
---

# Debug skill slash catalog and cache

## When

`/skill:foo` missing, stale, wrong body, or works in Agent disk read but not in slash menu (or the reverse).

## Decision tree

### 1) Is the skill in the right layer?
| Intent | Put files in | Then |
|--------|--------------|------|
| Only this Space | `/workspace/.agents/skills/<name>/` | Save project; reload chat |
| Personal all Spaces | config Space (`name=config`) `.agents/skills/` | **Save config Space** (publish + Redis SET) |
| Whole deployment | platform Space id | **Save platform Space** |
| Shared subset of Spaces | mod Space `.agents/skills/` | Save mod + ensure consumer mounts mod |

### 2) Packaging
```text
.agents/skills/<name>/SKILL.md   # required
# assets beside SKILL.md inside <name>/
```
Frontmatter `name:` should match `/skill:name` (valid name regex enforced).

### 3) Visibility API
```bash
# authenticated
curl -sS -H "Authorization: Bearer $TOKEN" \
  "https://api.cohub.run/api/skills?spaceId=$SPACE_ID" | jq .
```
Empty without auth+space is expected.

### 4) Cache freshness
- Redis TTL **24 hours** if nothing republishes.
- User/platform Save → `publishSkillsCacheFromDir` overwrites cache key.
- Project/mod keys include **revision hash**; new checkpoint meta usually busts cache.
- If still stale: Save again, remount mod, hard refresh composer, new Chat (system prompt skill list rebuilds per identity state).

### 5) Owner vs collaborator
Slash/API may list user skills for the **authenticated user**.  
Agent **prompt injection of user skills** only when `actorUserId === space.ownerUserId` (see execution-identity playbook). Collaborators can see different behavior.

## Done when

- [ ] Skill appears in `GET /api/skills?spaceId=`
- [ ] `/skill:name` expands without Unknown skill
- [ ] Agent can `read` the sandbox path from the catalog entry
- [ ] You know which layer owns the file

## Avoid

- Editing only Redis mental model without fixing source files
- Expecting Home project skills to become user-scope without config publish
- Duplicate names across layers without intending override

---

[中文](../zh/playbooks/skill-catalog-cache.md)
