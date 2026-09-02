---
id: cohub.bp.public-identity-slugs
title: Username, Space slug, and App URLs
type: playbook
audience: [builder]
features: [profile, space, work, app]
difficulty: starter
related: [cohub.bp.publish-static-work, cohub.bp.work-lifecycle, cohub.concept.work]
sources:
  - https://cohub.live/docs/workspace/spaces
  - https://cohub.live/docs/apps
  - https://github.com/talesofai/cohub/blob/main/docs/apps-guide.md
---

# Username, Space slug, and App URLs

## When

Publishing fails or a public App link cannot be formed.

## Outcome

- The account username, Space slug, and App slug are set.
- You understand these values can change but cannot be cleared once set.

## URL shape

```text
/:username/:spaceSlug/w/:appSlug
```

The `/w/` segment is retained for compatibility with the former Work vocabulary. A public profile uses `/:username`.

## Steps

1. Set the username in account/profile settings.
2. Set the Space slug in Space settings; keep it readable and stable.
3. Choose an App slug at publish time (`pitch`, `v1`, `docs-demo`).
4. If the API rejects create/publish, check the username and Space slug first.
5. Resolve an App by its canonical reference when needed:
   ```bash
   cohub apps resolve <app-slug> --owner <username> --space-slug <space-slug> --json
   ```

## Done when

- [ ] `apps.get` / publish returns a real `publicUrl`
- [ ] The link opens in a private window
- [ ] The slug identifies the intended App rather than a temporary preview

## Avoid

- Clever Unicode slugs that break sharing
- Renaming a slug casually after printing or embedding the URL

---

[中文](../zh/playbooks/public-identity-slugs.md)
