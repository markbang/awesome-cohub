---
id: cohub.cb.weekend-static-work
title: Weekend static App
type: cookbook
audience: [builder]
difficulty: starter
related: [cohub.bp.scratch-to-checkpoint, cohub.bp.publish-static-work, cohub.bp.work-kit-product, cohub.bp.minimal-scopes]
---

# Weekend static App

Ship something people can open without a Sandbox invite.

## Outcome

- A Space with a real site (or SPA with hash/static-friendly routing)
- At least one Save
- A **directory** App URL you can send

## Path

1. **Space + Save habit** - [scratch-to-checkpoint](../playbooks/scratch-to-checkpoint.md)
2. **Build in `/workspace`**
   - Simple: static `index.html` + assets
   - App-shaped: [work-kit-product](../playbooks/work-kit-product.md), then `build` -> `dist/`
3. **Routing check** - [browser-router-static](../anti-patterns/browser-router-static.md)
   Prefer `HashRouter` or pre-rendered paths; set App `base: "./"` when needed.
4. **Publish** - [publish-static-work](../playbooks/publish-static-work.md)
   Use `cohub-apps` / Work Kit publish; never send a raw Sandbox URL.
5. **Scopes** - [minimal-scopes](../playbooks/minimal-scopes.md)
   Static brochure -> no special scopes; add only what an interactive App uses.
6. **Save** again with note `v0-app-public`.

## Done when

- [ ] An incognito/private window opens the App URL
- [ ] Deep-link refresh does not 404, or the App uses hash routes
- [ ] A Save exists that you would restore from

## Avoid

- Testing only inside Sandbox preview
- Baking private API data into `dist/`
- An auth wall on first paint

---

[中文](../zh/cookbooks/weekend-static-work.md)
