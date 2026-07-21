---
id: cohub.bp.port-preview
title: Live port preview and port Works
title_zh: 端口预览与 port Work
type: playbook
audience: [builder, agent]
features: [sandbox, work, files]
difficulty: intermediate
related: [cohub.concept.work, cohub.bp.publish-static-work]
sources:
  - https://cohub.run/docs/workspace/files-and-sandbox
  - https://cohub.run/docs/create/works
---

# Live port preview and port Works · 端口预览与 port Work

## When · 何时用

EN: The artifact is a running app (dev server) rather than static files — for demos, QA, or temporary sharing.
中文：产物是跑着的应用（开发服务器）而不是静态文件——用于演示、QA 或临时分享。

## Outcome · 结果

- Dev server listens on a **supported public sandbox port**
- Preview works in Cohub UI
- Optional: published **port Work** for shareable live URL
- Team understands this is usually **not** the default production shape

## Steps · 步骤

### EN
1. Prefer static directory Works for production-ish demos when possible.
2. Start the server inside the Space sandbox (Agent or `cohub run`).
3. Bind a supported public port (e.g. common web ports your Space exposes — follow current product docs).
4. Open port preview beside Chat; use Preview Mark (changelog) to annotate screenshots into Chat when reporting bugs.
5. Publish as Work target `port` only if viewers need the live process.
6. Document how to restart the server; Save configs, not only the running memory.
7. When stabilizing, graduate to `directory` publish from `dist/`.

### 中文
1. 能静态化的演示优先 directory Work。
2. 在 Space 沙箱内启动服务（Agent 或 `cohub run`）。
3. 监听产品支持的公开端口。
4. 在 UI 打开 port preview；需要时用 Preview Mark 批注截图丢回 Chat。
5. 仅当观众必须碰活进程时，才发 **port Work**。
6. 写清如何重启；配置要进文件/存档，不能只活在进程里。
7. 稳定后毕业到 `dist/` directory 发布。

## Done when · 完成标准

- [ ] Preview loads for authors
- [ ] Restart instructions work on a cold sandbox
- [ ] Audience + lifetime of the port Work are explicit

## Avoid · 别这样做

- Using port Works as the permanent production home without process supervision expectations
- Forgetting that hibernation/restarts kill ad-hoc servers
- Shipping absolute localhost links to external users
