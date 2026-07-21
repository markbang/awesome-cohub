---
id: cohub.concept.work
title: Work
title_zh: Work（作品）
type: concept
---

# Work

A **Work** is a published shareable surface from a Space target: `file` | `directory` | `port`.

URL: `/:username/:spaceSlug/w/:workSlug`

## Practice
- Static sites → directory + relative assets
- Interactive Cohub SDK features → published Work shell only
- Two permission layers: workScopes vs allowed viewerScopes
- Versions are deliberate releases, not autosaves

## See also
- https://cohub.run/docs/create/works
- Playbooks: `cohub.bp.publish-static-work`, `cohub.bp.work-kit-product`
