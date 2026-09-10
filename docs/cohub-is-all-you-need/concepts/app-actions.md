---
id: cohub.concept.app-actions
title: App Actions
type: concept
related:
  - cohub.concept.work
  - cohub.concept.hooks
  - cohub.bp.work-lifecycle
sources:
  - https://cohub.live/changelog (v2.41)
  - https://github.com/talesofai/cohub/blob/main/docs/apps-guide.md
  - https://github.com/talesofai/cohub/blob/main/packages/core/src/apps/action-command.ts
---

# App Actions

**App Actions** (v2.41) are server-side entrypoints that a published **directory App** exposes under `.cohub/actions/`. They run inside the App home Space Sandbox, so an App can do real work without shipping credentials to the browser.

## Layout

```text
my-app/
├── index.html
└── .cohub/
    └── actions/
        ├── summarize.ts
        └── convert.sh
```

The file stem is the action name (`summarize`, `convert`). Keys use lowercase letters, numbers, `-`, and `_`, and exactly one entrypoint may match a key. No manifest is required; `.cohub/` ships inside the downloadable App artifact.

## Running an Action

From the App frontend:

```ts
const task = await cohub.app.actions.run({
  action: "summarize",
  input: { text: "Long document..." },
});
const result = await cohub.tasks.get(task.taskRunId);
```

From the CLI:

```bash
cohub apps actions run <app> <action> --input '{"text":"..."}' --json
```

A run downloads the immutable, version-pinned artifact into the Sandbox and executes:

- `.ts` / `.mts` / `.cts` / `.js` / `.mjs` / `.cjs` through Node 24 with native type stripping (erasable syntax only — no enums, namespaces, or parameter properties).
- Anything else directly, via executable bit, shebang, or binary format.

Input arrives as JSON on stdin (16 KB max); stdout and stderr are captured into a Run Command Task Run. Action input is stored with that Task Run and is visible to the App owner and to Space members who can inspect the task — it is not a secret transport.

## Who acts and who pays

- The execution actor and platform cost owner is the **App owner**.
- Entitlement reads and credit metering apply to the **signed-in viewer**.
- The action inherits the Sandbox's execution token, so action code can use the regular Cohub SDK or CLI without managing credentials.

## Boundaries

- An Action cannot invoke `cohub.app.actions.run()` from inside another Action; call the underlying script or Cohub API directly.
- Because `.cohub/actions/` ships with the published artifact, keep private implementation details out of the entrypoint or delegate to a script in the home Space.
- A hook can run an Action directly with `uses: owner/space/app/action` — see [Space Hooks](./hooks.md).

## See also

- https://cohub.live/docs/apps
- `docs/examples/app-capability-lab/` — a browser probe backed by `.cohub/actions/inspect-ts.ts` and `inspect-bash.sh`

---

[中文](../zh/concepts/app-actions.md)
