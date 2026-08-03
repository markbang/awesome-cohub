---
id: cohub.concept.space-invites
title: Space 邀请与加入链接
type: concept
---

# Space 邀请与加入链接

**友好邀请**（v2.7）让成员通过可分享的邀请链接加入 Space，不再依赖手动成员管理。

## 工作方式

- 邀请链接解析为 `/username/space-slug/join/<token>`，带统一邀请落地页。
- 通过 SDK 与 CLI 签发/消费：

```bash
cohub spaces invites create <spaceId>   # 铸造邀请 token
cohub spaces invites ls <spaceId>       # 列出未过期邀请
cohub spaces invites revoke <spaceId> <token>  # 撤销指定邀请
```

- Redis Lua **原子用量预留**，防止限次邀请被并发重复消耗。
- 每个 Space 有 **邀请上限**；撤销立即生效。

## 注意

- 通过邀请加入后，用户会获得对应成员角色（见 [space-roles](./space-roles.md)）。
- 邀请应配合 [space-members-access](../playbooks/space-members-access.md) 做角色治理。

---

[English](../../concepts/space-invites.md)
