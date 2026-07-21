---
id: cohub.bp.scheduled-loop
title: Recurring automation with scheduled prompts
type: playbook
audience: [builder, agent]
features: [scheduled-prompt, files, chat, task]
difficulty: advanced
related: [cohub.bp.space-hooks-automation, cohub.bp.space-knowledge-base]
sources:
  - https://cohub.run/docs/developers/cli
  - https://cohub.run/docs/learn/core-concepts
---

# Recurring automation with scheduled prompts

## When

Work must happen on a clock (daily report, weekly review), independent of someone opening Chat.

## Outcome

- Versioned prompt source file in the Space
- Schedule created with timezone + owner expectations
- Dated outputs + one stable `latest` entrance
- Idempotent per reporting window

## Steps

1. Write the job contract in markdown: goal, window, timezone, inputs, output paths, failure behavior.
2. Store the recurring prompt as a file, e.g. `scripts/jobs/daily/prompt.md` (not only in cron UI text).
3. Make the Agent write:
   - `reports/daily/YYYY-MM-DD/...`
   - `reports/daily/latest` (refresh in place)
4. Schedule via product UI or CLI-style scheduling (`spaces prompt --at` / `--cron` depending on your CLI version).
5. Forbid recursive schedule creation inside the run prompt unless that is the job.
6. Observe one successful run in Tasks; record schedule id + next run in the job README.
7. Prefer Space Hooks for event triggers; use schedules for time triggers.

## Done when

- [ ] Prompt source is versioned in files
- [ ] One real successful run observed
- [ ] Latest entrance works without hunting dates
- [ ] Re-run same window does not explode duplicates (idempotent strategy documented)

## Avoid

- Hidden state only in Chat memory
- Unbounded outputs with no retention policy
- Silent failure with no task visibility

---

[中文](../zh/playbooks/scheduled-loop.md)
