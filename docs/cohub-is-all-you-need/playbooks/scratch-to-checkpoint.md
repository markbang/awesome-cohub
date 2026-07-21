---
id: cohub.bp.scratch-to-checkpoint
title: From blank Space to first Save
type: playbook
audience: [builder, agent]
features: [space, chat, files, save]
difficulty: starter
related: [cohub.concept.space, cohub.concept.save, cohub.bp.agent-with-skills]
sources:
  - https://cohub.run/docs/learn/quick-start
  - https://github.com/talesofai/cohub/blob/main/docs/product/en/learn/quick-start.md
---

# From blank Space to first Save

## When

You need a durable place, not a one-off chat.

## Outcome

- One Space with a clear name/slug direction
- At least one focused Chat
- Files that matter live in the workspace
- One meaningful Save you could restore/fork

## Steps

1. Create a Space named for the job (`launch-page-v1`, not `test`).
2. Start a Chat with a concrete goal (“scaffold a minimal static site and explain layout”).
3. Keep Files/Preview open; verify paths, not only transcript text.
4. When a milestone works, **Save** with a scannable note (`v0-landing-working`).
5. Read the diff before celebrating.

## CLI

```bash
cohub spaces create --name "launch-page-v1" --json
cohub -s <spaceId> spaces prompt "Create a minimal static site and explain the file layout" --json
cohub -s <spaceId> spaces files ls
# Save from UI, or your team’s checkpoint CLI flow if enabled
```

## Done when

- [ ] Space exists and is the project home
- [ ] Chat history is useful, not noise-only
- [ ] Important outputs are files
- [ ] One Save marks a green milestone

## Avoid

- Chat-only “projects” with no files
- Saving every minor edit (or never saving)
- Renaming endlessly instead of labels + clear Save notes

---

[中文](../zh/playbooks/scratch-to-checkpoint.md)
