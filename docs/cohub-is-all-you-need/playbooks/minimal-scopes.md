---
id: cohub.bp.minimal-scopes
title: Ship Works with least privilege
title_zh: 最小权限发布 Work
type: playbook
audience: [builder, agent]
features: [work, scopes, sdk]
difficulty: intermediate
related: [cohub.concept.work, cohub.bp.publish-static-work, cohub.bp.work-kit-product]
sources:
  - https://cohub.run/docs/create/works
  - https://github.com/talesofai/cohub/blob/main/docs/works-guide.md
---

# Ship Works with least privilege · 最小权限发布 Work

## When · 何时用

EN: Every Work publish — especially anything using the Cohub SDK.
中文：每次发布 Work，尤其是会调用 Cohub SDK 的产品。

## Two layers · 两层权限

| Layer | Meaning | Examples |
|-------|---------|----------|
| **workScopes** | Publisher grants to the Work itself | `file.view`, `space.view`, `session.view`, `taskrun.view` |
| **allowedViewerScopes** | Work may *ask* each viewer to grant | `session.prompt.*`, `generation.create`, `user.space.list`, `user.session.list`, `user.usage.read` |

Static brochure HTML often needs **no** runtime scopes.  
Interactive products request viewer scopes **on gesture**, never on page load.

## Steps · 步骤

### EN
1. List features the Work actually implements (read files? list sessions? prompt? generate? commerce?).
2. Map each feature to the smallest scope. Delete “nice to have”.
3. Publish with only those scopes.
4. In UI: authorize only after click; show why (`reason` string).
5. Re-test as a fresh viewer account when possible.
6. Document scopes in Space README next to the Work URL.

### 中文
1. 列出 Work **真实**功能（读文件？列会话？prompt？生成？商业化？）。
2. 映射到最小权限；删掉“以后可能要”。
3. 只带这些权限发布。
4. 授权必须出现在点击之后，并说明原因。
5. 有条件用干净观众账号复测。
6. 在 README 写清 URL + 权限清单。

## Heuristics · 经验

| Work type | Start with |
|-----------|------------|
| Static site | no special scopes |
| Read Space docs/files | `file.view` (+ maybe `space.view`) |
| Show chats metadata | `session.view` |
| Button runs agent | viewer `session.prompt.readonly` or `fullaccess` |
| Button generates media | viewer `generation.create` |
| Cross-account lists | viewer `user.*` (sensitive — justify hard) |

## Done when · 完成标准

- [ ] Every granted scope has a UI feature
- [ ] No auth-on-load
- [ ] Static demos don’t carry prompt/generation scopes

## Avoid · 别这样做

- “Full access just in case”
- Copying another Work’s scope set blindly
- Using `user.*` for vanity metrics on a public demo
