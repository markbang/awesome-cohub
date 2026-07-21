---
id: cohub.ap.no-save-before-autonomy
title: No Save before agent autonomy
type: anti-pattern
related: [cohub.bp.fork-and-proposal, cohub.bp.scratch-to-checkpoint]
---

# No Save before agent autonomy

## Why it hurts
Broad cleanups and refactors become unrecoverable archaeology.

## Do this instead
Save (or fork from Save) **before** “rewrite everything” prompts. Read diffs after.

## Smell test
If you fear the next prompt, you needed a Save five minutes ago.

---

[中文](../zh/anti-patterns/no-save-before-autonomy.md)
