---
title: Fingerprinting
description: What a profile's fingerprint contains, what you can change, and how to check it.
sidebar:
  order: 2
---

## How Veilus builds a fingerprint

Websites read many properties of a browser at once: OS, screen, GPU, CPU cores, memory, fonts, language, timezone and more. Veilus generates these for each profile **as one consistent set** for the OS you picked when you created it. For example, a Windows profile gets Windows fonts and a GPU that exists on Windows machines.

When a profile uses the same OS as your computer, its hardware is matched to your computer. A profile for a different OS has to imitate more, so it is less likely to pass detection; the app warns you about this.

The fingerprint is saved with the profile and stays the same every time you open it, until you change or regenerate it.

## The Fingerprint tab

Open a profile's panel and go to **Fingerprint**. It has three parts.

### Your settings

Safe to change. The OS is fixed when the profile is created.

| Setting | What it does |
|---------|--------------|
| **Language** | The browser language websites see |
| **Timezone** | The timezone websites see. The profile's coordinates follow the timezone and update when you save |
| **WebRTC Mode** | What WebRTC reveals about your IP (see below) |
| **Add canvas/audio noise** | Gives this profile its own canvas and audio output (off by default) |

**WebRTC Mode**

| Mode | Effect |
|------|--------|
| **Disabled** (default) | Pages get no connection candidates, so WebRTC shows no IP. Video calls and other WebRTC connections will not work |
| **Proxy Only** | WebRTC connects only through relay (TURN) servers the page provides. Pages get no candidates with your local or public IP |
| **Fake IP** | Pages see the IP you enter instead of your real one. Local network addresses are not listed. Until you enter a valid IPv4 or IPv6 address, WebRTC stays disabled |

**Canvas/audio noise**

- **Off** (default): canvas and audio match real Chrome on this computer, so profiles on the same computer share them.
- **On**: each profile gets its own canvas and audio, but some detection sites flag canvas and audio values they have never seen as tampering.

### Hardware

A read-only summary: user agent, screen resolution, CPU cores, memory, WebGL renderer, battery, Bluetooth, color scheme and reduced motion. These values are generated together. To change them, click **Regenerate** to create a whole new set, then **Save Changes** to keep it.

### Advanced: edit fields one by one

Expand this to edit single fields:

- **User Agent**
- **Display & GPU**: Screen Resolution, CPU Cores, Memory, WebGL Vendor, WebGL Renderer
- **Noise**: Canvas Seed, Audio Seed, or **Random**
- **Privacy**: Color Scheme, Battery Level, Charging, Reduced Motion

:::caution
Hand-picked values can add up to a device that doesn't exist, and detection sites flag that. For a profile on your computer's OS, the lists only offer values that fit your computer. Prefer **Regenerate** over editing fields one by one.
:::

A **Config check** under the fields lists any contradictions as you edit, for example a GPU that doesn't match the OS or a language that doesn't match the timezone. It reads **No contradictions found** when the set is consistent. The same check appears on the **Overview** tab.

If you launch a profile whose fingerprint contradicts itself, Veilus shows the conflicting fields first and lets you choose **Edit profile** or **Open anyway**.

## Test a profile

Veilus can open a profile against several public fingerprint test sites and record how many it passes.

- Run it from the profile's **Test** tab (**Test Again**), from **Test again** on the Overview tab, or for many profiles with **Test** in the bulk action bar.
- The result appears in the **Score** column as *passed/measured*, for example `7/8`. The report lists each site as **Passed**, **Failed** or **Not measured**, and whether the network layer matched.
- If you change the fingerprint or proxy afterwards, the score is marked as out of date. Test again.
- A run that could not measure enough sites does not replace the previous score.

## Next steps

- [Set up a proxy →](/profiles/proxy/)
- [Automation overview →](/automation/overview/)
