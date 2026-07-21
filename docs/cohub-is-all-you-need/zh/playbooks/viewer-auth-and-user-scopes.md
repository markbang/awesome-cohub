---
id: cohub.bp.viewer-auth-user-scopes
title: 访客授权与 user.* scopes
type: playbook
---

# 访客授权与 user.* scopes

## 两层权限

| 层 | 谁授予 | 例子 |
|----|--------|------|
| `workScopes` | 发布者 | `space.view`, `file.view`… |
| `allowedViewerScopes` | 发布者白名单 + **访客**同意 | `session.prompt.*`, `generation.create`, `user.*` |

`user.*` 是**账号级**，不绑在 Work 所在 Space。

## 模式

仅在用户手势后 `cohub.auth.request({ scopes, reason })`。  
回访用户可能静默复用缓存授权（定期再同意）——白名单仍要正确。

## 避免

- 首屏鉴权墙  
- iframe 里重做登录  
- 无脑开大 `user.*`  

---

[English](../../playbooks/viewer-auth-and-user-scopes.md)
