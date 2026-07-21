---
id: cohub.ap.no-save-before-autonomy
title: No Save before agent autonomy
title_zh: 高自主前不存档
type: anti-pattern
related: [cohub.bp.fork-and-proposal, cohub.bp.scratch-to-checkpoint]
---

# No Save before agent autonomy · 高自主前不存档

## Why it hurts · 伤害
Broad cleanups and refactors become unrecoverable archaeology.

## Do this instead · 正确做法
Save (or fork from Save) **before** “rewrite everything” prompts. Read diffs after.

## Smell test
If you fear the next prompt, you needed a Save five minutes ago.
