---
id: cohub.bp.space-env-sandbox
title: Space 环境变量与沙箱设置
type: playbook
---

# Space 环境变量与沙箱设置

密钥放 **Space env / config**，别进 git。  
Sandbox 规格与 idle/auto-destroy 影响成本和冷启动；改 Mods 可能重启沙箱。  
路径仍是沙箱形：`/workspace`、`/configs/*`。

## 模型上下文（v2.6）

沙箱命令会注入两个环境变量，描述当前回合驱动模型：

```text
COHUB_MODEL_PROVIDER   # 如 openai / anthropic / local
COHUB_MODEL_ID         # 当前回合的模型 id
```

工具与脚本可按它们分支，自适应输出、格式或成本策略，无需猜测。

---

[English](../../playbooks/space-env-and-sandbox-settings.md)
