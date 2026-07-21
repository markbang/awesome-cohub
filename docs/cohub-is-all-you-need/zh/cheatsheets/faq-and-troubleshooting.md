---
id: cohub.cheat.faq
title: FAQ 与排障
type: cheatsheet
---

# FAQ 与排障

## Skills

| 现象 | 可能原因 | 处理 |
|------|----------|------|
| `/skill:foo` 没有 | 本 Space 未装 / config 未发布 | 装到项目或 config + **Save** |
| 磁盘有 skill，斜杠没有 | 目录/缓存延迟 | 见 skill-catalog-cache；重开对话 |
| 安装后缺脚本 | 资源在仓根 | skill-packaging · skill-assets-at-repo-root |
| 同名 skill 错乱 | 合并顺序 | platform → mods → user → workspace |

## 配置发布

| 现象 | 处理 |
|------|------|
| 改了 `/configs/user` 又没了 | 只读发布面；改 **config Space** 再 Save |
| 把 Home 当 config | 建 `name=config` |
| 装了 skill 其他 Space 没有 | config 忘了 Save |

## Works

| 现象 | 处理 |
|------|------|
| 分享的是沙箱域名 | 发 **Work**，别发 raw sandbox |
| 刷新 404 | 静态 + History API → hash/预渲染 |
| 白屏 | 查 `base: "./"`、资源路径、重建 dist |
| 藏不掉 Cohub 底栏 | 非 Pro/Max，或不是已发布 Work | [hide-cohub-bar](../playbooks/hide-cohub-bar.md)；`--hide-cohub-bar` |
| 拼不出公开 URL | 缺 username / space slug / work slug | [public-identity-slugs](../playbooks/public-identity-slugs.md) |
| 文件/目录发布被拒 | 体积/数量限额 | file≤5MB；dir≤1000 文件/≤100MB+[work-lifecycle](../playbooks/work-lifecycle.md) |
| 访客 API 403 | 白名单或未授权 | [viewer-auth](../playbooks/viewer-auth-and-user-scopes.md) |
| 改了 target 公网页没变 | 需要 publish-version | [work-lifecycle](../playbooks/work-lifecycle.md) |
| 401 / scope | 收敛权限再发 |
| 商业化只在预览「能用」 | 需要运行时 Work |

## 网络 / 身份 / 自治

- 出站问题 → egress-proxy + warp-proxy  
- 身份错乱 → execution-token-identity  
- 循环失忆 → 磁盘状态（loop-without-disk-state）  
- 被 agent 搞炸 → 自治前 Save  

## 仍卡住

1. https://cohub.run/docs  
2. [路径与挂载](./paths-and-mounts.md)  
3. [AGENT_BRIEF](../AGENT_BRIEF.md)  

---

[English](../../cheatsheets/faq-and-troubleshooting.md)
