---
id: cohub.bp.hide-cohub-bar
title: Hide the Cohub bar on a public Work
type: playbook
audience: [builder]
features: [work, billing, presentation]
difficulty: starter
related: [cohub.bp.publish-static-work, cohub.bp.work-kit-product, cohub.concept.work]
sources:
  - https://cohub.run/docs/create/works
  - https://github.com/talesofai/cohub/blob/main/docs/works-guide.md
  - https://cohub.run/changelog
---

# Hide the Cohub bar on a public Work

## When

You want the public Work page to feel like **your product**, not a Cohub chrome frame — especially for polished demos and commercial shells.

## Outcome

- Public Work footer Cohub bar is hidden (or restored)
- Share/OG branding follows presentation meta when bar is hidden
- You know this requires **Pro / Max** presentation entitlement

## What it is

`hideCohubBar` is Work **presentation** meta:

- Hides the Cohub **footer bar** on the public Work page
- With bar hidden, share meta leans toward **minimal Work branding** (title/site_name) instead of a light Cohub host signal
- Root-relative media in share cards resolve against the published content URL

## Requirements

| Need | Detail |
|------|--------|
| Plan | **Pro** or **Max** (billing entitlement check) |
| Surface | Published Work (not raw sandbox / static asset URL) |
| Identity | Username + space slug + work slug already set |

If entitlement is missing, toggle/CLI will not stick as a free-tier feature.

## Steps (UI)

1. Open Work management: `/spaces/:spaceId/works/:workId`
2. In Work detail / publish settings, find **Hide Cohub bar** (presentation)
3. Enable for hide, disable for show
4. Open the **public** Work URL and hard-refresh to verify footer chrome

## Steps (CLI)

```bash
# at publish time
cohub -s <spaceId> works publish my-demo --dir dist \
  --hide-cohub-bar --json

# or update an existing work
cohub -s <spaceId> works update <workId> --hide-cohub-bar --json

# restore bar
cohub -s <spaceId> works update <workId> --show-cohub-bar --json
```

Flags also exist on `works publish` / `works update`:

- `--hide-cohub-bar`
- `--show-cohub-bar`

## Done when

- [ ] Public page has no Cohub footer bar (Pro/Max)
- [ ] Share preview title/branding looks Work-first when hidden
- [ ] Turning bar back on works with `--show-cohub-bar` / UI

## Avoid

- Expecting hide on free tier without entitlement  
- Confusing **app shell inside your SPA** with the **host Cohub footer bar**  
- Hiding bar but still shipping raw sandbox URLs as the “product”  

## See also

- [publish-static-work](./publish-static-work.md)  
- [work-kit-product](./work-kit-product.md)  
- Works limits & scopes: [works-guide](https://github.com/talesofai/cohub/blob/main/docs/works-guide.md)  

---

[中文](../zh/playbooks/hide-cohub-bar.md)
