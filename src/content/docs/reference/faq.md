---
title: FAQ
description: Frequently asked questions about Veilus.
---

## General

### Is Veilus free?
Yes! The free plan includes **5 browser profiles forever** — no credit card required, no time limit. Premium plans offer more profiles and advanced features.

### What platforms does Veilus support?
Veilus runs on **Windows 10/11**, **macOS 12+** (Intel and Apple Silicon), and **Linux** (Ubuntu 20.04+, Fedora 36+).

### Is Veilus open source?
Veilus uses open-source components and contributes community tools to GitHub. The core application is proprietary.

## Detection & Fingerprinting

### Does Veilus pass anti-detect tests?
Yes. Veilus profiles consistently pass tests on [creepjs.com](https://creepjs.com) and [iphey.com](https://iphey.com). Each profile has a unique, internally consistent fingerprint.

### How is Veilus different from other anti-detect browsers?
Most anti-detect browsers are built on Electron, which wraps Chromium in a Node.js layer. Veilus uses **native Chromium** directly, resulting in:
- 3x faster performance
- 80% less RAM per profile
- More authentic browser behavior

### Can websites detect that I'm using Veilus?
Veilus is designed to be undetectable. Each profile appears as a regular Chrome browser with a unique device fingerprint. There are no Veilus-specific markers.

## Performance

### How much RAM does each profile use?
Approximately **100 MB per profile**, compared to 300-500 MB in Electron-based alternatives.

### Can I run many profiles at once?
Yes. On a system with 16 GB RAM, you can comfortably run **50-100+ profiles** simultaneously.

### Does Veilus slow down my computer?
Veilus includes smart resource monitoring that auto-throttles background profiles when your system is under load.

## Automation

### What is VeilusFlow?
VeilusFlow is Veilus's built-in visual automation system. Record your browser actions, and Veilus generates automation scripts automatically. [Learn more →](/automation/overview/)

### Do I need coding skills for automation?
No. VeilusFlow's visual recorder lets you create automations by simply performing actions in the browser. For advanced users, scripts can be edited directly.

## Troubleshooting

### Veilus won't start
1. Ensure your system meets the [minimum requirements](/getting-started/installation/)
2. Try running as administrator (Windows) or with `sudo` (Linux)
3. Check if antivirus is blocking Veilus

### Profile won't launch  
1. Close any other Chromium-based browsers
2. Check available RAM
3. Try creating a new profile

### Fingerprint test failing
1. Make sure you're using the latest version
2. Clear the profile's cache and cookies
3. Try Auto fingerprint mode instead of Custom

Still have questions? Join our [Telegram community](https://t.me/veilusbrowser) for help.
