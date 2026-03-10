---
title: Introduction
description: What is Veilus and why choose it over other anti-detect browsers.
sidebar:
  order: 1
---

## What is Veilus?

Veilus is a **free anti-detect browser** built on a native Chromium engine — not Electron. It's designed for professionals who need to manage multiple online identities with complete anonymity and efficiency.

Unlike traditional anti-detect browsers that wrap Chromium inside Electron (adding overhead and potential detection vectors), Veilus compiles directly against the Chromium source code. This architectural choice delivers:

- **3x faster** page load and rendering than typical anti-detect browsers
- **80% less RAM** per browser profile (~100 MB vs 300-500 MB)
- **Authentic browser behavior** — no Electron artifacts to detect
- **Built-in automation** with VeilusFlow visual recording

## Who is Veilus For?

Veilus is built for professionals who need browser isolation and identity management:

| User | Use Case |
|------|----------|
| **Affiliate Marketers** | Run multiple ad accounts without linking |
| **E-commerce Sellers** | Manage storefronts on Amazon, eBay, Shopify |
| **Social Media Managers** | Operate multiple social accounts safely |
| **Web Scrapers** | Collect data without IP/fingerprint bans |
| **QA Engineers** | Test apps under different device configurations |
| **Privacy Advocates** | Browse without leaving a trackable fingerprint |

## Feature Comparison

| Feature | Veilus | Multilogin | GoLogin | AdsPower |
|---------|-------|------------|---------|----------|
| **Engine** | Native Chromium | Mimic (Chromium) | Orbita (Chromium) | Sun Browser |
| **RAM per profile** | ~100 MB | ~350 MB | ~300 MB | ~400 MB |
| **Free profiles** | 5 forever | 0 (trial only) | 3 (trial) | 5 (limited) |
| **Built-in automation** | ✅ VeilusFlow | ❌ Separate tool | ❌ | ❌ |
| **Visual recording** | ✅ Point & click | ❌ | ❌ | ❌ |
| **Open source tools** | ✅ GitHub | ❌ | ❌ | ❌ |
| **Starting price** | Free | $99/mo | $49/mo | $9/mo |

## Core Technology

### Native Chromium Engine
Veilus doesn't use Electron or CEF. It directly patches and builds Chromium, giving you:
- Real Chrome DevTools
- Full Web API compatibility
- Hardware acceleration (WebGL, Canvas)
- Native PDF viewer, Web Workers, Service Workers

### Fingerprint Engine
Each browser profile gets a mathematically consistent fingerprint generated from a seed value:
- **Canvas** — Unique rendering via subtle pixel manipulation
- **WebGL** — Spoofed GPU renderer/vendor strings
- **AudioContext** — Modified audio processing signature
- **Navigator** — Customized user agent, platform, hardware concurrency
- **Fonts** — OS-appropriate font list
- **Screen** — Resolution, color depth, device pixel ratio
- **ClientRects** — Element measurement variations
- **WebRTC** — IP leak protection with configurable modes

### VeilusFlow Automation
Record browser actions visually — clicks, typing, scrolling, navigation — and Veilus auto-generates a replayable script. No coding needed.

## Architecture Overview

```
┌─────────────────────────────────────┐
│           Veilus Desktop App        │
│         (Tauri + Rust Core)         │
├─────────────────────────────────────┤
│   Profile Manager │  VeilusFlow     │
│   ┌───────────┐   │  ┌───────────┐  │
│   │ Profiles  │   │  │ Recorder  │  │
│   │ Settings  │   │  │ Editor    │  │
│   │ Proxy     │   │  │ Runner    │  │
│   └───────────┘   │  └───────────┘  │
├─────────────────────────────────────┤
│        Chromium Engine (Patched)     │
│  Canvas │ WebGL │ Audio │ Fonts │   │
│  Screen │ WebRTC│ TZ    │ Nav   │   │
└─────────────────────────────────────┘
```

## Getting Started

Ready to try Veilus? Follow these steps:

1. [Install Veilus](/getting-started/installation/) on your platform
2. [Create your first profile](/getting-started/quickstart/) in 2 minutes
3. [Configure fingerprints](/profiles/fingerprinting/) for your use case
4. [Set up proxies](/profiles/proxy/) for geographic targeting
5. [Automate workflows](/automation/overview/) with VeilusFlow

## Community & Support

- 💬 [Telegram Community](https://t.me/veilusbrowser) — Chat with other users
- 🐦 [Twitter/X](https://x.com/veilusbrowser) — Latest updates
- 🐙 [GitHub](https://github.com/veilus) — Open source tools
- 📧 Support: support@veilus.io
