---
id: cohub.ap.home-as-config
title: 误以为 Home 会给其他 Space 配默认
type: anti-pattern
related: [cohub.bp.user-config-and-rules, cohub.concept.user-config-space, cohub.concept.home-space]
---

# 误以为 Home 会给其他 Space 配默认

## 历史

v2.66 之前，Save Home 只生成 Checkpoint：个人 skills 与规则留在 Home 的 `/workspace`，不会挂载为 `/configs/user`。本卡最初版本据此说 Home 不能当配置。

自 v2.66 起，Save **Home Space** 确实会发布个人配置（`AGENTS.md`、`.agents/skills`、`.agents/prompts`、`.cohub/models.json`、`.cohub/theme.css`）。

## 为什么仍然会踩坑

1. Home 的 Save 发布的比预期多，Home 里的杂物会悄悄变成全局默认。
2. 名为 `config` 的 Space 仍是普通 Space：它**不会**回退到 Home，Home 也不会读取它。
3. 直接改 `/configs/user` 永远无效——那是发布快照。

## 正确做法

- 只选**一个**个人配置来源：Home Space 或 `name === "config"`；另一个不要放规则和 skills。
- 在里面放 `AGENTS.md` + `.agents/skills`，然后 **Save**。
- 从其他 Space 验证：`ls /configs/user/.agents/skills`。

## 味道测试

`/configs/user/.agents/skills` 是空的，或者出现了你以为已经删掉的 skill——你在配置其中一个 Space，却期待另一个生效。

---

[English](../../anti-patterns/home-as-config.md)
