---
title: Chromium Engine
description: Understanding and managing the Chromium engine in Veilus.
sidebar:
  order: 1
---

## Overview

Veilus uses a custom-patched Chromium engine — not Electron, not CEF. This means you get the same browser engine that powers Google Chrome, with modifications for fingerprint spoofing and anti-detection.

## Engine Manager

The Engine Manager (**Settings → Engine**) shows:

| Info | Description |
|------|-------------|
| **Current version** | e.g., Chromium 124.0.6367.91 |
| **Status** | Up to date / Update available |
| **Disk usage** | ~200-250 MB per engine |
| **Auto-update** | On/Off toggle |

## Engine Updates

### Automatic Updates
By default, Veilus checks for engine updates daily. When a new version is available:

1. A notification appears in the profile manager
2. Click **"Update Engine"**
3. The new engine downloads in the background (~150 MB)
4. Existing profiles continue working during download
5. New engine is applied when all profiles are closed

### Manual Update
**Settings → Engine → Check for Updates**

### Version Pinning
For consistency (e.g., running automation tests), you can pin to a specific engine version:

1. **Settings → Engine → Version**
2. Select a version from the dropdown
3. Auto-update will be paused until you unpin

:::caution
Using older engine versions may cause detection on sites that check for the latest Chrome version. Only pin when you have a specific reason.
:::

## Why Not Electron?

| | Veilus (Native Chromium) | Electron-based |
|---|------------------------|----------------|
| **Binary** | Single Chromium binary | Electron + Chromium + Node.js |
| **Startup** | ~2 seconds | ~5-8 seconds |
| **RAM baseline** | ~80 MB | ~200 MB |
| **Detection risk** | Low (real Chrome fingerprint) | Medium (Electron markers) |
| **Web API support** | 100% Chrome compatibility | 95% (some APIs excluded) |
| **DevTools** | Full Chrome DevTools | Modified DevTools |

## Troubleshooting

### Engine won't download
- Check your internet connection
- Ensure firewall allows HTTPS connections to `engine.veilus.io`
- Try: **Settings → Engine → Clear Cache → Re-download**

### Engine crash on launch
- Delete the engine cache: close Veilus → delete `~/.veilus/engine/` → reopen
- Check if antivirus is quarantining engine files
- Try running Veilus as administrator (Windows)

### Sites detect wrong Chrome version
- Update to the latest engine version
- Check that your profile's User Agent matches the engine version
- Use Auto fingerprint mode for automatic version matching
