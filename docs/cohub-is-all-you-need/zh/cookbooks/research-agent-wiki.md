---
id: cohub.cb.research-agent-wiki
title: 调研 Agent → Wiki
type: cookbook
---

# 调研 Agent → Wiki

把抓取会话变成复利理解。

## 结果

- `raw/` + `wiki/` + 只追加 log
- 至少一轮写入 wiki（不只堆 raw）
- 可选：出站代理 + 社交/网页 skills

## 路径

1. [space-knowledge-base](../playbooks/space-knowledge-base.md) 搭骨架
2. 工具：`hyper-search` / `wgetx` / `wikis` / 可选 `warp-proxy`
3. 每批：raw 证据 → 更新已有 wiki → 追加 log → 刷新 index
4. Save 里程碑；自治循环必须有磁盘状态

## 完成标志

- [ ] 新 agent 只靠 `wiki/index.md` 能接上
- [ ] raw 是可引用证据，不是唯一语料

---

[English](../../cookbooks/research-agent-wiki.md)
