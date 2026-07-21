---
id: cohub.bp.port-preview
title: Live port preview and port Works
type: playbook
audience: [builder, agent]
features: [sandbox, work, files]
difficulty: intermediate
related: [cohub.concept.work, cohub.bp.publish-static-work]
sources:
  - https://cohub.run/docs/workspace/files-and-sandbox
  - https://cohub.run/docs/create/works
---

# Live port preview and port Works

## When

The artifact is a running app (dev server) rather than static files — for demos, QA, or temporary sharing.

## Outcome

- Dev server listens on a **supported public sandbox port**
- Preview works in Cohub UI
- Optional: published **port Work** for shareable live URL
- Team understands this is usually **not** the default production shape

## Steps

1. Prefer static directory Works for production-ish demos when possible.
2. Start the server inside the Space sandbox (Agent or `cohub run`).
3. Bind a supported public port (e.g. common web ports your Space exposes — follow current product docs).
4. Open port preview beside Chat; use Preview Mark (changelog) to annotate screenshots into Chat when reporting bugs.
5. Publish as Work target `port` only if viewers need the live process.
6. Document how to restart the server; Save configs, not only the running memory.
7. When stabilizing, graduate to `directory` publish from `dist/`.

## Done when

- [ ] Preview loads for authors
- [ ] Restart instructions work on a cold sandbox
- [ ] Audience + lifetime of the port Work are explicit

## Avoid

- Using port Works as the permanent production home without process supervision expectations
- Forgetting that hibernation/restarts kill ad-hoc servers
- Shipping absolute localhost links to external users

---

[中文](../zh/playbooks/port-preview.md)
