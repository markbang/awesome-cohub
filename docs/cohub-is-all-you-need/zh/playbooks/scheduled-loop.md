---
id: cohub.bp.scheduled-loop
title: 用定时 Prompt 做循环自动化
type: playbook
audience: [builder, agent]
features: [scheduled-prompt, files, chat, task]
difficulty: advanced
related: [cohub.bp.space-hooks-automation, cohub.bp.space-knowledge-base]
sources:
  - https://cohub.run/docs/developers/cli
  - https://cohub.run/docs/learn/core-concepts
---

# 用定时 Prompt 做循环自动化

## 何时用

任务必须按时间发生（日报、周报），不依赖有人打开 Chat。

## 结果

- Versioned prompt source file in the Space
- Schedule created with timezone + owner expectations
- Dated outputs + one stable `latest` entrance
- Idempotent per reporting window

## 步骤

1. 用 markdown 写清任务契约：目标、时间窗、时区、输入、输出路径、失败策略。
2. 复发 prompt 落成文件（例如 `scripts/jobs/daily/prompt.md`），不要只活在定时器文本框。
3. 约定输出：
   - `reports/daily/YYYY-MM-DD/...`
   - `reports/daily/latest`（原地刷新）
4. 用产品 UI 或 CLI 调度能力创建定时。
5. 运行用 prompt 默认禁止再创建新的定时任务（除非任务本身就是调度管理）。
6. 在 Tasks 观察到一次成功；把 schedule id / next run 记进 job README。
7. 事件驱动用 Hooks；时间驱动用 Schedule。

## 完成标准

- [ ] Prompt source is versioned in files
- [ ] One real successful run observed
- [ ] Latest entrance works without hunting dates
- [ ] Re-run same window does not explode duplicates (idempotent strategy documented)

## 别这样做

- Hidden state only in Chat memory
- Unbounded outputs with no retention policy
- Silent failure with no task visibility

---

[English](../../playbooks/scheduled-loop.md)
