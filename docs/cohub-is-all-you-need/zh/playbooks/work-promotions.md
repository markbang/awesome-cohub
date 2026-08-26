---
id: cohub.bp.work-promotions
title: 在不泄露观众数据的前提下衡量 Work 推广
type: playbook
audience: [builder, operator]
features: [work, analytics, promotion, commerce]
difficulty: advanced
related:
  - cohub.bp.work-lifecycle
  - cohub.bp.work-commerce
  - cohub.concept.work
sources:
  - https://cohub.live/changelog（v2.22-v2.23）
  - https://github.com/talesofai/cohub/blob/main/docs/works-guide.md
---

# 在不泄露观众数据的前提下衡量 Work 推广

## 适用场景

你需要把流量和漏斗行为归因到已发布的 Work，同时不建立访客级别的跟踪数据库。

## 结果

- 不可变的 UTM 推广链接指向当前已发布的 Work。
- Landing、就绪、注册、付费墙与结账行为按推广、Work 版本、来源和小时聚合。
- 可选启用 Meta Pixel / Conversions API；使用通用分析时不加载第三方服务商。

## 步骤

1. 先发布并验证 Work。推广链接始终打开当前已发布版本，不能替代版本发布。
2. 使用明确的 UTM 字段创建推广：

```bash
cohub apps promotions create <work> \
  --name "Launch video A" \
  --provider generic \
  --utm-source instagram \
  --utm-medium paid_social \
  --utm-campaign launch_2026 \
  --utm-content video_a
```

3. 查看链接与聚合统计：

```bash
cohub apps promotions list <work>
cohub apps promotions stats <work> <promotion-id>
```

4. 认证或结账跳转时，使用浏览器保留的 30 天 Work 作用域最近触点归因。
5. 只有部署配置了 Meta Pixel 与 Conversions API 凭据时，才使用 `--provider meta`。正式流量前用可选的 Meta 测试事件代码验证集成。
6. 把统计当作聚合漏斗证据。Cohub 保留提供事件的不可变版本，不保留访客级推广记录。

## 事件契约

内置聚合键为 `landing`、`ready`、`registration_completed`、`paywall_viewed` 与 `checkout_started`。Meta 将支持的浏览器事件映射为 `ViewContent`、`CompleteRegistration`、`AddToCart` 与 `InitiateCheckout`。结账复用 purchase attempt id 作为服务商事件 ID，避免重试产生重复开始事件。

## 完成标准

- [ ] 推广链接能解析到已发布 Work
- [ ] UTM 字段能识别一个活动和创意
- [ ] 统计显示版本与按小时的来源细分
- [ ] 生产流量前已验证 Meta 凭据与测试事件
- [ ] 没有把访客级身份或原始密钥写入 Space 文件

## 避免

- 把推广链接当作不可变的 Work 版本
- 发送浏览器不允许记录的转化事件
- 通用聚合统计已经够用时仍添加 Meta 脚本
- 把 Pixel 或 CAPI 凭据放进 Work bundle

---

[English](../../playbooks/work-promotions.md)
