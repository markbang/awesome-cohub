---
id: cohub.bp.space-members-access
title: Space members, roles, and access policy
type: playbook
audience: [builder, operator]
features: [space, members, access]
difficulty: intermediate
related: [cohub.concept.space, cohub.bp.channel-ops, cohub.bp.minimal-scopes]
sources:
  - https://cohub.run/docs/workspace/spaces
  - https://cohub.run/docs/learn/core-concepts
---

# Space members, roles, and access policy

## When

More than one person (or anonymous viewers) should enter a Space without sharing your account.

## Outcome

- Clear **host / builder / guest** expectations
- Access policy set for signed-in vs anonymous defaults
- Collaboration without turning Home into a dumping ground

## Roles (Space)

| Role | Typical power |
|------|----------------|
| **host** | Full manage: members, settings, destroy-level ops |
| **builder** | Create/edit project work inside the Space |
| **guest** | Limited participate / view per access policy |

Exact capability matrix follows product; treat host as owner-operator.

## Steps

1. Open **Space settings → Members**.
2. Invite by account; assign the least role that works.
3. Open **Access**: set defaults for signed-in visitors and anonymous users (when the Space is exposed).
4. Prefer **labels + separate Spaces** over one mega-shared Home.
5. For public **Works**, remember Work scopes are a **second** permission layer — member role ≠ Work runtime scope.

## Done when

- [ ] Each collaborator has an explicit role  
- [ ] Anonymous/signed-in defaults match how you share  
- [ ] You are not DMing personal login sessions  

## Avoid

- Everyone as host  
- Using access policy as a substitute for Work scopes  
- Putting secrets only in Chat for “the intern”  

---

[中文](../zh/playbooks/space-members-access.md)
