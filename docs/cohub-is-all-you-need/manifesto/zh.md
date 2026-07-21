# Cohub Is All You Need · Cohub 就是你需要的全部

**v0.1** · 写给在 [Cohub](https://cohub.run) 里共创的人与 Agent 的最佳实践

> 你的 Space：用来创造、玩耍，并与人、与 Agent 一起构建。

这篇不是功能说明书，而是 **用法地图**：怎么建立心智、怎么选能力面、怎么交付，而不和产品较劲。

配套：[场景矩阵](../matrix.md) · [English](./en.md)

---

## 0. 主张

你不一定需要同时拼：聊天工具 + 网盘 + CI + 预览环境 + CMS + Bot 托管。

你真正需要的是：

1. **活的工作处**（Space）
2. **好时刻的时间胶囊**（Checkpoint / 存档）
3. **给别人打开的表面**（Work）
4. **在同一处干活的 Agent 与 Skills**
5. **可选的门**（CLI、Discord、飞书、微信…）

这一整包就是 Cohub。其余都是在其上的特化。

---

## 1. 心智模型（先记住七个词）

| 名词 | 含义 | 实践 |
|------|------|------|
| **Space** | 活的、隔离的创造容器 | 一个 Space ≈ 一个项目 / 实验 / 产品线 |
| **Checkpoint（存档）** | 有意义时刻的不可变快照 | 冒险操作前存；“能用了”就存 |
| **Session（Chat）** | Space 内的对话上下文 | 按任务拆会话，别无限续一个长聊 |
| **Agent** | Space 沙箱里的协作者 | 给 skill + 文件；小范围冒烟验证 |
| **Work** | 由文件 / 目录 / 端口发布的页面 | 演示与产品用公开 Work URL |
| **Channel** | 进入 Space 的外部入口 | 同一 Space，不同的门 |
| **Sandbox** | Space 背后的执行环境 | 命令、服务、skill 实际跑在这里 |

### 主循环

```text
打开 / Fork Space
  → 与 Agent 对话并改文件
  → 关键要时存档（Checkpoint）
  → 需要给别人打开时发布 Work
  → 再 Fork / 提案回去 / 继续迭代
```

只记一张图，就记这个。

---

## 2. 原则

### P1 — Space 是工作的单位
别把真相拆散在私聊、本地文件夹和多个后台里。  
代码、提示词、产物、Agent 状态，优先落在 **Space 文件**。

### P2 — 存档是时间的单位
存档不是“不好用的 git”。它是 **产品时刻**：可玩、可 Fork、可恢复。  
当人会说「这个版本留住」时，就该存。

### P3 — Work 是分享的单位
沙箱链接和本地预览是给作者的。  
**Work** 是给观众的。演示与产品优先发 Work。

### P4 — 默认最小权限
`workScopes`：Work 始终需要的安全只读。  
`viewerScopes`：仅在 **用户手势** 下再请求 prompt / 生成 / 账号级能力。

### P5 — Agent 需要 skill 和文件系统，不是长篇作文
没有 skill/文件的长系统提示很脆。  
装 skill、写小状态文件、跑命令、验收输出。

### P6 — 可变真相不要烤进 `dist/`
静态发布是快照。  
活数据放在 Space 文件、会话、账单，或 Work 被允许调用的 API。

### P7 — 同一产品表面，多扇门
Web、CLI（`@neta-art/cohub-cli`）、频道应驱动 **同一个 Space**。  
不要另造一套绕过存档/Work 的运维路径。

---

## 3. 能力地图（什么时候用什么）

### 3.1 Spaces 与文件
**用于：** 项目之家、资产、给 Agent 读的状态、配置。  
**实践：** 目录清晰（`src/`、`data/`、`docs/`、`.agents/skills/`）。  
**避免：** 只聊天；文件才是耐久记忆。

### 3.2 会话与 Agent
**用于：** 探索、实现、审查、运维。  
**实践：** 一个 Session 一个任务；挂 skill；安装后冒烟。  
**避免：** 永不存档的超级长线程。

### 3.3 存档（Checkpoint）
**用于：** 里程碑、交接、Fork 基线、恢复。  
**实践：** 大重构 / 发布 / 高自主 Agent 前先存。  
**避免：** 出事了才第一次存档。

### 3.4 Works
目标类型：

| 类型 | 适合 | 注意 |
|------|------|------|
| `file` | 单个 HTML | 仅 HTML，有大小限制 |
| `directory` | 站点 / 构建产物 | 需 `index.html`；推荐 `base: "./"` + Hash 路由 |
| `port` | 在线开发服务 | 预览很好；默认生产形态仍偏静态目录 |

运行时事实：`cohub.context()` / 授权 / 商业能力在 **已发布 Work 壳** 内可用，不是裸静态资源 URL。

官方：[works-guide.md](https://github.com/talesofai/cohub/blob/main/docs/works-guide.md)

### 3.5 生成（Generations）
**用于：** 在 Space 上下文中做图/视频/音乐等。  
**实践：** 产物写入文件；好结果存档；关注积分与成本。  
**Skill：** `cohub-generate`  
官方：[generations.md](https://github.com/talesofai/cohub/blob/main/docs/generations.md)

### 3.6 CLI 与自动化
**用于：** 脚本、类 CI 循环、无头操作。  
**实践：** `cohub -s <spaceId> …` 打真 Space；id/slug 落盘。  
包名：`@neta-art/cohub-cli`（npm scope）· 仓库 [talesofai/cohub](https://github.com/talesofai/cohub)

### 3.7 频道（Channels）
**用于：** 人从已有聊天工具进入。  
**实践：** 频道 → 同一 Space → 同一文件/存档/Work。  
**避免：** 只有频道、没有 Space 文件系统的流程。

### 3.8 Mods 与 Skills
**用于：** 可复用的 Agent 能力。

| 技能包 | 作用 |
|--------|------|
| [talesofai/okp](https://github.com/talesofai/okp) | 结构化知识检索/导入 |
| [markbang/wgetx-skill](https://github.com/markbang/wgetx-skill) | 社媒采集（默认纯 ESM，无需 npm） |
| [markbang/warp-proxy-skill](https://github.com/markbang/warp-proxy-skill) | 沙箱 WARP 出口代理 |
| [markbang/cohub-work-skill](https://github.com/markbang/cohub-work-skill) | Work 模板 + 发布流程 |
| 平台 monorepo skills | `cohub`、`cohub-generate`、works/public share 等 |

安装模式：

```bash
npx skills add <repo-url> --skill <name> --agent codex --yes --copy
```

资源必须放在 `skills/<name>/` 内，安装才会带走。

---

## 4. 给建造者（人）

### 开始
1. 创建或 Fork 一个 Space  
2. 用 10 行写清目标（`README.md` / `GOAL.md`）  
3. 只装本任务需要的 skills  

### 构建
4. 源码与产物放 Space 文件  
5. 按任务开 Session；绿灯就存档  
6. 小步 Agent 循环 + 验证命令  

### 交付
7. 静态演示：构建 → 发 **directory Work**  
8. Cohub 内交互产品：Work Kit 运行时 + 最小权限  
9. 把公开 URL 写回 Space README  

### 运营
10. 周期性任务：定时 prompt + 磁盘状态  
11. 轮换密钥；不要提交 cookie/token  
12. 用 Fork 探索，别在唯一好时间线上盲改  

---

## 5. 给 Agent（操作模型）

### 动手前
- 解析 Space id / 路径；不要编造挂载点  
- 有 AGENTS.md / SKILL.md 就先读  
- 优先复用 skill，而不是重写采集器/工具  

### 动手时
- 最小正确改动  
- 产物写到约定目录（`data/`、`apps/`…）  
- 先小限制冒烟，再大规模爬取/生成  

### 发布时
- 静态 Work 确认 `base: "./"` 与 hash 路由  
- 权限清单写清楚；拒绝“先全开再说”  
- 返回公开 URL + 如何确认 `ready`  

### 卡住时
- 先存档  
- 把失败（HTTP 状态、路径、命令）写入文件  
- 问缺失权限或产品决策，而不是空白重写  

---

## 6. 反模式

| 反模式 | 伤害 | 正确做法 |
|--------|------|----------|
| 只聊天的项目 | 没有耐久真相 | 文件 + 存档 |
| 用裸沙箱 URL 当上线 | 不稳定、对象错误 | 发布 Work |
| 静态 Work 用 BrowserRouter | 资源/路由 404 | HashRouter + `base: "./"` |
| 把活数据烤进 `dist` | 过期且不安全 | 运行时读 Space/API |
| 页面加载就授权 | 体验差、权限过大 | 手势 + viewer scopes |
| 一次装一堆用不到的 skill | 噪音、风险、成本 | 按任务安装 |
| 高自主前不存档 | 难恢复 | 先 Checkpoint |
| 在 Work 里自建一套登录 | 身份重复 | SDK `auth.request` |

---

## 7. 速查

### 公开 Work URL
```text
/:username/:spaceSlug/w/:workSlug
```

### 静态发布意图（最小）
```bash
pnpm build
cohub -s "$COHUB_SPACE_ID" works publish <slug> \
  --dir <Space 内相对 dist 路径> \
  --work-scope file.view
```

### 权限心智（当前拆分）
- **workScopes**（发布者直接给 Work）：如 `space.view`、`session.view`、`file.view`、`taskrun.view`
- **viewerScopes**（观众可授权）：如 `session.prompt.*`、`generation.create`、`user.*`

永远从你以为的「更小」开始。

---

## 8. 文档会怎么长

| 层 | 现在 | 之后 |
|----|------|------|
| 主文 | 本文件 | 随产品迭代修订 |
| [矩阵](../matrix.md) | 场景索引 | 每行扩成 playbook 卡 |
| Playbooks / concepts | 目录已备 | 双语卡片 + frontmatter |
| OKP domain `cohub` | 尚未导入 | **文章稳定后再导入** |

---

## 9. 一页纸总结

当你的循环是下面这样时，**Cohub is all you need**：

```text
Space（做）→ Agent+Skills（干）→ Checkpoint（留）→ Work（享）→ Fork（再来）
```

具体选哪条路，看 [场景矩阵](../matrix.md)。

---

*收录于 [awesome-cohub](https://github.com/markbang/awesome-cohub) · 主仓库 [talesofai/cohub](https://github.com/talesofai/cohub)*
