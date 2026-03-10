---
title: Fingerprinting
description: How Veilus generates and manages browser fingerprints.
---

## How Fingerprinting Works

Every browser has a unique "fingerprint" — a combination of hardware and software characteristics that websites use to identify you. Veilus creates **realistic, consistent fingerprints** for each profile.

## Fingerprint Components

Veilus manages these fingerprint properties per profile:

| Component | What it does |
|-----------|-------------|
| **Canvas** | Unique canvas rendering hash |
| **WebGL** | GPU renderer and vendor strings |
| **AudioContext** | Audio processing fingerprint |
| **Fonts** | Installed font list |
| **Screen** | Resolution, color depth, pixel ratio |
| **Navigator** | User agent, platform, hardware concurrency |
| **Timezone** | Geographic timezone (auto-matched to proxy) |
| **WebRTC** | Local IP leak protection |
| **ClientRects** | Element measurement fingerprint |

## Fingerprint Modes

### Auto (Recommended)
Veilus automatically generates a realistic fingerprint based on the selected OS and browser version. Components are internally consistent — for example, a Windows fingerprint won't have macOS-only fonts.

### Custom
Override specific fingerprint components manually. Useful for advanced users who need precise control.

:::caution
Modifying individual fingerprint components may create inconsistencies that could trigger detection. Use Auto mode unless you have a specific reason to customize.
:::

## Fingerprint Persistence

Each profile's fingerprint is **persistent** — it stays the same across sessions. This is critical for maintaining login sessions and avoiding detection.

## Verifying Your Fingerprint

After launching a profile, verify it's working:

1. Visit [creepjs.com](https://creepjs.com)
2. Check that the "Trust Score" is reasonable
3. Verify each component shows consistent values
4. Visit [iphey.com](https://iphey.com) — it should report "Real"

## Next Steps

- [Set up a proxy →](/profiles/proxy/)
- [Create automation scripts →](/automation/overview/)
