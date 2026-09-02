---
id: cohub.bp.work-promotions
title: Measure App promotions without leaking visitor data
type: playbook
audience: [builder, operator]
features: [work, app, analytics, promotion, commerce]
difficulty: advanced
related:
  - cohub.bp.work-lifecycle
  - cohub.bp.work-commerce
  - cohub.concept.work
sources:
  - https://cohub.live/changelog (v2.22-v2.23)
  - https://github.com/talesofai/cohub/blob/main/docs/apps-guide.md
---

# Measure App promotions without leaking visitor data

## When

You need to attribute traffic and funnel activity to a published App without building a visitor-level tracking database.

## Outcome

- Immutable UTM promotion links point to the current published App.
- Landing, readiness, registration, paywall, and checkout activity is aggregated by promotion, App version, source, and hour.
- Optional Meta Pixel / Conversions API delivery is enabled without loading a third-party provider for generic analytics.

## Steps

1. Publish and verify the App first. Promotions always open the current published version; they are not a substitute for a release.
2. Create a promotion with explicit UTM fields:

```bash
cohub apps promotions create <app> \
  --name "Launch video A" \
  --provider generic \
  --utm-source instagram \
  --utm-medium paid_social \
  --utm-campaign launch_2026 \
  --utm-content video_a
```

3. Inspect links and aggregate statistics:

```bash
cohub apps promotions list <app>
cohub apps promotions stats <app> <promotion-id>
```

4. Use the 30-day App-scoped last-touch attribution maintained in browser storage when authentication or checkout redirects occur.
5. For Meta delivery, use `--provider meta` only when the deployment has configured the Meta Pixel and Conversions API credentials. Test integrations with the optional Meta test event code before sending live traffic.
6. Treat statistics as aggregate funnel evidence. Cohub retains the immutable App version that served each event, not a visitor-level promotion record.

## Event contract

The built-in aggregate keys are `landing`, `ready`, `registration_completed`, `paywall_viewed`, and `checkout_started`. Meta maps the supported browser events to `ViewContent`, `CompleteRegistration`, `AddToCart`, and `InitiateCheckout`. Checkout reuses the purchase attempt id as the provider event id, preventing duplicate starts on retries.

## Done when

- [ ] The promotion link resolves to a published App
- [ ] UTM fields identify one campaign and creative
- [ ] Stats show version and hourly source breakdown
- [ ] Meta credentials and test events are validated before production traffic
- [ ] No visitor-level identity or raw secrets are written to Space files

## Avoid

- Treating a promotion link as an immutable App version
- Sending conversion events that the browser is not allowed to record
- Adding Meta scripts when generic aggregate analytics is sufficient
- Putting Pixel or CAPI credentials in the App bundle

---

[中文](../zh/playbooks/work-promotions.md)
