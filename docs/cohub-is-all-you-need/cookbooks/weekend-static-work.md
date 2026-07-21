---
id: cohub.cb.weekend-static-work
title: Weekend static Work
type: cookbook
audience: [builder]
difficulty: starter
related: [cohub.bp.scratch-to-checkpoint, cohub.bp.publish-static-work, cohub.bp.work-kit-product, cohub.bp.minimal-scopes]
---

# Weekend static Work

Ship something people can open without a sandbox invite.

## Outcome

- A Space with a real site (or SPA with **hash** / static-friendly routing)
- At least one Save
- A **directory** Work URL you can send

## Path

1. **Space + Save habit** — [scratch-to-checkpoint](../playbooks/scratch-to-checkpoint.md)  
   Name the Space for the product (`portfolio-v1`), not `test`.
2. **Build in `/workspace`**  
   - Simple: static `index.html` + assets  
   - App-shaped: [work-kit-product](../playbooks/work-kit-product.md) then `build` → `dist/`
3. **Routing check** — anti-pattern [browser-router-static](../anti-patterns/browser-router-static.md)  
   Prefer `HashRouter` or pre-rendered paths; set Work `base: "./"` when needed.
4. **Publish** — [publish-static-work](../playbooks/publish-static-work.md)  
   Use `cohub-works-share` / Work Kit publish; never send raw sandbox URL ([raw-sandbox-launch](../anti-patterns/raw-sandbox-launch.md)).
5. **Scopes** — [minimal-scopes](../playbooks/minimal-scopes.md)  
   Static brochure → tiny scopes; interactive later.
6. **Save** again with note `v0-work-public`.

## Done when

- [ ] Incognito/private window opens the Work URL
- [ ] Refresh on deep links does not 404 (or you use hash routes)
- [ ] Save exists you would restore from

## Avoid

- Testing only inside sandbox preview  
- Baking private API data into `dist/` ([bake-live-data-dist](../anti-patterns/bake-live-data-dist.md))  
- Auth wall on first paint ([auth-on-load](../anti-patterns/auth-on-load.md))

---

[中文](../zh/cookbooks/weekend-static-work.md)
