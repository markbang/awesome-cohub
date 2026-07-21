---
id: cohub.bp.public-identity-slugs
title: Username, space slug, and Work URLs
type: playbook
audience: [builder]
features: [profile, space, work]
difficulty: starter
related: [cohub.bp.publish-static-work, cohub.bp.work-lifecycle, cohub.concept.work]
sources:
  - https://cohub.run/docs/workspace/spaces
  - https://cohub.run/docs/create/works
  - https://github.com/talesofai/cohub/blob/main/docs/works-guide.md
---

# Username, space slug, and Work URLs

## When

Publish fails or public links cannot be formed.

## Outcome

- Account **username**, Space **slug**, Work **slug** all set  
- You understand they can change but **cannot be cleared** once set  

## URL shape

```text
/:username/:spaceSlug/w/:workSlug
```

Also: public profile `/:username`.

## Steps

1. Set username in **account / profile** settings.
2. Set Space **slug** in Space settings (readable, stable).
3. Choose Work slug at publish (`pitch`, `v1`, `docs-demo`).
4. If API rejects create/publish, check missing username or space slug first.

## Done when

- [ ] `works.get` / publish returns a real `publicUrl`  
- [ ] Link opens in a private window  

## Avoid

- Clever Unicode slugs that break sharing  
- Renaming slugs casually after you printed posters  

---

[中文](../zh/playbooks/public-identity-slugs.md)
