---
id: cohub.bp.scratch-to-checkpoint
title: From blank Space to first Save
title_zh: 从空白 Space 到第一次存档
type: playbook
audience: [builder, agent]
features: [space, chat, files, save]
difficulty: starter
related: [cohub.concept.space, cohub.concept.save, cohub.bp.agent-with-skills]
sources:
  - https://cohub.run/docs/learn/quick-start
  - https://github.com/talesofai/cohub/blob/main/docs/product/en/learn/quick-start.md
---

# From blank Space to first Save · 从空白 Space 到第一次存档

## When · 何时用

EN: You need a durable place, not a one-off chat.
中文：你需要长期工作容器，而不是一次性对话。

## Outcome · 结果

- One Space with a clear name/slug direction
- At least one focused Chat
- Files that matter live in the workspace
- One meaningful Save you could restore/fork

## Steps · 步骤

### EN
1. Create a Space named for the job (`launch-page-v1`, not `test`).
2. Start a Chat with a concrete goal (“scaffold a minimal static site and explain layout”).
3. Keep Files/Preview open; verify paths, not only transcript text.
4. When a milestone works, **Save** with a scannable note (`v0-landing-working`).
5. Read the diff before celebrating.

### 中文
1. 创建 Space，用任务命名（`launch-page-v1`，不要叫 `test`）。
2. 开 Chat，目标要具体（「搭一个最小静态站并说明目录」）。
3. 边聊边打开 Files/Preview，认路径，不只看对话。
4. 到可保留状态就 **存档**，备注可读（`v0-landing-working`）。
5. 先看 diff 再宣布完成。

## CLI · 命令

```bash
cohub spaces create --name "launch-page-v1" --json
cohub -s <spaceId> spaces prompt "Create a minimal static site and explain the file layout" --json
cohub -s <spaceId> spaces files ls
# Save from UI, or your team’s checkpoint CLI flow if enabled
```

## Done when · 完成标准

- [ ] Space exists and is the project home
- [ ] Chat history is useful, not noise-only
- [ ] Important outputs are files
- [ ] One Save marks a green milestone

## Avoid · 别这样做

- Chat-only “projects” with no files
- Saving every minor edit (or never saving)
- Renaming endlessly instead of labels + clear Save notes
