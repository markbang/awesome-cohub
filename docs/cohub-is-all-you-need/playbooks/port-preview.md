---
id: cohub.bp.port-preview
title: Live port preview and port Apps
type: playbook
audience: [builder, agent]
features: [sandbox, work, app, files]
difficulty: intermediate
related: [cohub.concept.work, cohub.bp.publish-static-work]
sources:
  - https://cohub.live/docs/workspace/files-and-sandbox
  - https://cohub.live/docs/apps
---

# Live port preview and port Apps

## When

The artifact is a running app (development server) rather than static files, for demos, QA, or temporary sharing.

## Outcome

- The server listens on a supported public Sandbox port.
- Authors can open a live port preview in Cohub.
- A published **port App** is used only when viewers need the live process.
- The team understands that a port App is usually not the default production shape.

## Steps

1. Prefer a static directory App for production-oriented demos when possible.
2. Start the server inside the Space Sandbox (Agent or `cohub run`).
3. Bind a supported public port according to current product docs.
4. Open the port preview beside Chat and verify it after a cold Sandbox restart.
5. Publish as an App target `port` only if viewers need the live process:
   ```bash
   cohub -s <spaceId> apps publish live-demo --port 5173 --json
   ```
6. Document restart behavior and Save the configuration, not only the running process.
7. When stable, graduate to a directory App from `dist/`.

## Done when

- [ ] The preview loads for authors
- [ ] Restart instructions work on a cold Sandbox
- [ ] The port App's audience and lifetime are explicit

## Avoid

- Using a port App as a permanent production home without process supervision
- Forgetting that hibernation and restarts kill ad-hoc servers
- Shipping absolute localhost links to external users

---

[中文](../zh/playbooks/port-preview.md)
