---
id: cohub.concept.app-actions
title: App Actions
type: concept
related:
  - cohub.concept.work
  - cohub.concept.hooks
  - cohub.bp.work-lifecycle
sources:
  - https://cohub.live/changelog（v2.41）
  - https://github.com/talesofai/cohub/blob/main/docs/apps-guide.md
  - https://github.com/talesofai/cohub/blob/main/packages/core/src/apps/action-command.ts
---

# App Actions

**App Actions**（v2.41）是已发布 **directory App** 通过 `.cohub/actions/` 暴露的服务端入口。它们在 App home Space 的 Sandbox 内运行，因此 App 无需把凭据下发到浏览器即可完成真实工作。

## 目录结构

```text
my-app/
├── index.html
└── .cohub/
    └── actions/
        ├── summarize.ts
        └── convert.sh
```

文件名的 stem 就是 action 名称（`summarize`、`convert`）。key 只能包含小写字母、数字、`-` 与 `_`，且同一 key 只能匹配唯一入口。无需 manifest；`.cohub/` 会随可下载的 App artifact 一起发布。

## 运行 Action

在 App 前端调用：

```ts
const task = await cohub.app.actions.run({
  action: "summarize",
  input: { text: "Long document..." },
});
const result = await cohub.tasks.get(task.taskRunId);
```

通过 CLI 调用：

```bash
cohub apps actions run <app> <action> --input '{"text":"..."}' --json
```

运行时会把不可变、按版本固定的 artifact 下载到 Sandbox 并执行：

- `.ts` / `.mts` / `.cts` / `.js` / `.mjs` / `.cjs` 通过 Node 24 原生类型擦除运行（仅可擦除语法——不支持 enum、namespace、parameter properties）。
- 其他文件直接执行，依赖可执行位、shebang 或二进制格式。

输入以 JSON 形式通过 stdin 传入（上限 16 KB）；stdout 与 stderr 由 Run Command Task Run 捕获。Action 输入会随 Task Run 保存，App 所有者与有权限查看任务的 Space 成员可见——它不是秘密通道。

## 谁执行、谁付费

- 执行身份与平台成本归属是 **App 所有者**。
- 权益读取与积分扣费作用于**已登录观众**。
- Action 继承 Sandbox 的 execution token，因此代码可以直接使用常规 Cohub SDK 或 CLI，无需管理凭据。

## 边界

- Action 内部不能再调用 `cohub.app.actions.run()`；应直接调用底层脚本或 Cohub API。
- `.cohub/actions/` 会进入已发布 artifact，敏感实现细节应放在 home Space 的脚本中，入口保持精简。
- Hook 可以通过 `uses: owner/space/app/action` 直接运行 Action——见 [Space Hooks](./hooks.md)。

## 参见

- https://cohub.live/docs/apps
- `docs/examples/app-capability-lab/`——由 `.cohub/actions/inspect-ts.ts` 与 `inspect-bash.sh` 支持的浏览器探针

---

[English](../../concepts/app-actions.md)
