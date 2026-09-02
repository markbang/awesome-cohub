---
id: cohub.bp.hide-cohub-bar
title: Hide the Cohub bar on a public App
type: playbook
audience: [builder]
features: [work, app, billing, presentation]
difficulty: starter
related: [cohub.bp.publish-static-work, cohub.bp.work-kit-product, cohub.concept.work]
sources:
  - https://cohub.live/docs/apps
  - https://github.com/talesofai/cohub/blob/main/docs/apps-guide.md
  - https://cohub.live/changelog
---

# Hide the Cohub bar on a public App

## When

You want a published App page to feel like your product rather than a Cohub host frame, especially for polished demos and commercial shells.

## Outcome

- The public App footer bar is hidden or restored.
- Share and OG metadata use the App's presentation settings.
- You know the option requires a **Pro / Max** entitlement.

## What it is

`hideCohubBar` is App presentation metadata. It hides the Cohub footer on the public App page; it does not remove the App runtime or replace your own navigation.

## Requirements

| Need | Detail |
|------|--------|
| Plan | **Pro** or **Max** billing entitlement |
| Surface | Published App, not a raw Sandbox or static asset URL |
| Identity | Username + Space slug + App slug are set |

## CLI

```bash
# at publish time
cohub -s <spaceId> apps publish my-demo --dir dist --hide-cohub-bar --json

# update an existing App
cohub -s <spaceId> apps update <appId> --hide-cohub-bar --json
cohub -s <spaceId> apps update <appId> --show-cohub-bar --json
```

The older `works` command spelling remains a compatibility alias in clients that expose it.

## Done when

- [ ] The public App has no Cohub footer bar on Pro/Max
- [ ] Share preview title and branding are App-first when hidden
- [ ] `--show-cohub-bar` or the UI restores the bar

## Avoid

- Expecting the feature on a plan without the entitlement
- Confusing the App's own UI with the Cohub host footer
- Hiding the bar while still sharing a raw Sandbox URL

---

[中文](../zh/playbooks/hide-cohub-bar.md)
