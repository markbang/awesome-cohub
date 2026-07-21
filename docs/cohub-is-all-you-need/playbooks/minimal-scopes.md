---
id: cohub.bp.minimal-scopes
title: Ship Works with least privilege
type: playbook
audience: [builder, agent]
features: [work, scopes, sdk]
difficulty: intermediate
related: [cohub.concept.work, cohub.bp.publish-static-work, cohub.bp.work-kit-product]
sources:
  - https://cohub.run/docs/create/works
  - https://github.com/talesofai/cohub/blob/main/docs/works-guide.md
---

# Ship Works with least privilege

## When

Every Work publish — especially anything using the Cohub SDK.

## Two layers

| Layer | Meaning | Examples |
|-------|---------|----------|
| **workScopes** | Publisher grants to the Work itself | `file.view`, `space.view`, `session.view`, `taskrun.view` |
| **allowedViewerScopes** | Work may *ask* each viewer to grant | `session.prompt.*`, `generation.create`, `user.space.list`, `user.session.list`, `user.usage.read` |

Static brochure HTML often needs **no** runtime scopes.  
Interactive products request viewer scopes **on gesture**, never on page load.

## Steps

1. List features the Work actually implements (read files? list sessions? prompt? generate? commerce?).
2. Map each feature to the smallest scope. Delete “nice to have”.
3. Publish with only those scopes.
4. In UI: authorize only after click; show why (`reason` string).
5. Re-test as a fresh viewer account when possible.
6. Document scopes in Space README next to the Work URL.

## Heuristics

| Work type | Start with |
|-----------|------------|
| Static site | no special scopes |
| Read Space docs/files | `file.view` (+ maybe `space.view`) |
| Show chats metadata | `session.view` |
| Button runs agent | viewer `session.prompt.readonly` or `fullaccess` |
| Button generates media | viewer `generation.create` |
| Cross-account lists | viewer `user.*` (sensitive — justify hard) |

## Done when

- [ ] Every granted scope has a UI feature
- [ ] No auth-on-load
- [ ] Static demos don’t carry prompt/generation scopes

## Avoid

- “Full access just in case”
- Copying another Work’s scope set blindly
- Using `user.*` for vanity metrics on a public demo

---

[中文](../zh/playbooks/minimal-scopes.md)
