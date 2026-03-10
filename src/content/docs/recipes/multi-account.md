---
title: Multi-Account Management
description: Best practices for managing multiple accounts safely with Veilus.
sidebar:
  order: 1
---

## Overview

Multi-account management is the most common use case for anti-detect browsers. Veilus helps you run multiple accounts on any platform without them being linked to each other.

## Setting Up

### Profile Per Account

The golden rule: **one profile per account**. Each profile has:
- Unique browser fingerprint
- Separate cookies and storage
- Independent proxy (recommended)
- Isolated browsing history

### Naming Convention

Use a consistent naming pattern for easy management:

```
[Platform]-[Account Name]-[Region]
```

Examples:
- `FB-ShopA-US`
- `Amazon-Store1-UK`
- `IG-Brand-VN`

### Tags for Organization

Color-code your profiles by platform or purpose:
- 🔵 Blue → Facebook accounts
- 🟢 Green → Amazon stores
- 🟡 Yellow → Instagram accounts
- 🔴 Red → Testing / Flagged accounts

## Proxy Strategy

### One Proxy Per Account (Recommended)

Each account should have its own residential or mobile proxy to avoid IP correlation:

| Account | Proxy | Location |
|---------|-------|----------|
| FB-ShopA | `socks5://proxy1.example.com:1080` | US, New York |
| FB-ShopB | `socks5://proxy2.example.com:1080` | US, California |
| Amazon-Store1 | `http://proxy3.example.com:8080` | UK, London |

### Proxy Types by Use Case

| Type | Best For | Speed | Detection Risk |
|------|----------|-------|---------------|
| **Residential** | Social media, e-commerce | Medium | Low |
| **Mobile** | High-trust platforms (FB, Google) | Slow | Very Low |
| **Datacenter** | Scraping, testing | Fast | Medium-High |
| **ISP** | Long-term accounts | Fast | Low |

:::tip
For Facebook and Google accounts, **mobile proxies** have the lowest ban rate because many real users share mobile IPs.
:::

## Platform-Specific Tips

### Facebook
- Warm up new profiles: browse normally for 2-3 days before posting
- Use the same timezone as your proxy location
- Don't switch proxies mid-session
- Enable 2FA with an authenticator app (not SMS)

### Amazon
- Use ISP or residential proxies from the marketplace country
- Keep browser language consistent with the marketplace
- Don't open multiple Amazon profiles from the same IP

### Instagram
- Use mobile proxies for best results
- Gradually increase activity (don't follow/like 100 people on day 1)
- VeilusFlow can automate engagement safely with random delays

### E-commerce (Shopify, eBay)
- Use residential proxies from the target market
- Keep payment methods separated per profile
- Use VeilusFlow to automate inventory monitoring

## Automation with VeilusFlow

Automate repetitive tasks across multiple accounts:

1. **Record** the workflow on one profile
2. **Export** the VeilusFlow script
3. **Assign** the script to multiple profiles
4. **Schedule** execution (stagger times to appear natural)

### Safe Automation Practices
- Add **random delays** between actions (1-5 seconds)
- Vary typing speed (use "Human typing" mode in VeilusFlow)
- Stagger scheduled tasks across accounts (don't all post at 9:00 AM)
- Monitor for CAPTCHA triggers and pause accordingly

## Security Checklist

Before going live with multiple accounts:

- [ ] Each account has its own dedicated profile
- [ ] Each profile has a unique proxy (ideally different IP)
- [ ] Timezone matches proxy location
- [ ] Browser language matches account region
- [ ] No cross-profile cookie leaks (never copy-paste between profiles)
- [ ] 2FA enabled on all accounts
- [ ] VeilusFlow delays configured for natural behavior
