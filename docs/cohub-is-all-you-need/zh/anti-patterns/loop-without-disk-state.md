---
id: auto
title: 循环无磁盘状态
type: anti-pattern
---

# 循环无磁盘状态

只靠聊天「记住」的定时/钩子会丢进度、重复劳动、无法审计。

每 tick 读写 `runtime/state.json` / `wiki/log.md`。杀掉对话就没大脑 = 从未自治。


---

[English](../../anti-patterns/loop-without-disk-state.md)
