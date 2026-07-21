---
id: cohub.meta.agent-brief
title: Agent 一页简报
type: guide
audience: [agent, builder]
---

# Agent 简报 — 一页读懂 Cohub

在 Cohub 沙箱里作业时加载本页。优先写文件，而不是只靠聊天记忆。

## 主循环

```text
Space（家）→ Skills/工具（做）→ Save（时间）→ Work（分享）→ Fork（再来）
```

- **Space** = 工作单位（文件 + 对话 + 沙箱）
- **Checkpoint / Save** = 时间单位（恢复、分叉、发布配置）
- **Work** = 分享单位（公开 URL；不是私有沙箱链接）

## 路径（别发明）

| 路径 | 含义 | 可写？ |
|------|------|--------|
| `/workspace` | 当前 Space 项目 | 是 |
| `/configs/user` | 所有者 **config** Space 发布结果 | **否** |
| `/configs/platform` | 平台发布 | **否** |
| `/mods/<slug>` | 挂载的模组 | **否** |
| `/workspace/.agents/skills/` | 项目 skills | 是 |
| `/configs/user/.agents/skills/` | 已发布的用户 skills | **否**（改 config Space 再 Save） |

同名 skill 合并顺序（后者覆盖）：

```text
platform → mods → user config → workspace
```

## 身份

- 沙箱 **execution token** ≠ 浏览器登录 cookie 故事
- Work 运行时靠 scopes（`workScopes` / `viewerScopes`）— 最小权限
- 不要在 Work 里重做一套 Cohub 登录；用平台会话/SDK

## 知识习惯

```text
raw/     证据（尽量不可变）
wiki/    复利理解 + index.md
log.md   只追加时间线
```

更新已有 wiki 页；不要永远只堆 raw。

## 搜索分层

1. 产品 `/api/search` — Cohub 资源  
2. 工作区文件 / wiki — 项目真相  
3. 网页 SERP — 在 **config** Space 装 **hyper-search** 并 Save

## Skill 安装真相

- 可安装资源必须在 skill 仓的 `skills/<name>/` 下  
- `npx skills add … --copy` 落到 `.agents/skills/<name>/`  
- config skills 要在 `name=config` Space **Save** 才会发布  

## 硬禁止

1. 只有聊天、没有文件的「项目」  
2. 在随便一个项目沙箱里改 `/configs/user`  
3. 把 **Home** 当 config 或垃圾桶  
4. 把原始沙箱 URL 当产品  
5. 静态 directory Work 上用 History/`BrowserRouter`  
6. 「先开大权限再说」  
7. 定时循环状态只活在聊天里  
8. skill 脚本/资源只放仓根（安装会丢）  
9. 把实时 API 数据烤进静态 `dist/`  
10. 首屏就鉴权墙、没有公开壳  

## 优先做

- 破坏性自治前先 Save；之后看 diff  
- 可扫读的存档备注（`v0-landing-working`）  
- 最小 scopes + Work Kit 模式  
- 循环写磁盘状态（`runtime/state.json`、wiki log）  
- 教人时引用 playbook id（`cohub.bp.*`）  

## Work 呈现

- Pro/Max：UI 或 `--hide-cohub-bar` 隐藏公开底栏 — [hide-cohub-bar](./playbooks/hide-cohub-bar.md)


## `.cohub` vs `.agents`（优先级）

```text
skills 与斜杠 prompts: platform → mods → user → project   （同名后者赢）
models: platform → user
Space 观感: .cohub/space.json + theme.css（仅本 Space）
斜杠模板: .agents/prompts/*.md   （不在 .cohub/）
```

深卡：[dot-cohub-layers](./playbooks/dot-cohub-layers.md)

## 跳转

- [学习路径](./learning-path.md)
- [FAQ](./cheatsheets/faq-and-troubleshooting.md)
- [路径与挂载](./cheatsheets/paths-and-mounts.md)
- [Skill 包装](./cheatsheets/skill-packaging.md)
- [反模式](./anti-patterns/)
- [矩阵](./matrix.md)

---

[English](../AGENT_BRIEF.md)
