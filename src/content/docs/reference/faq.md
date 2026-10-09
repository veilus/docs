---
title: FAQ
description: Frequently asked questions about Veilus.
---

## General

### Is Veilus free?
The Free plan gives you 5 profiles on 1 device, with no time limit and no card. Veilus Flow, schedules, batch runs, Veilus Sync, import/export, script templates and the local API/MCP need a paid plan. You can try all of them with a 7-day Pro trial. See [Plans & license](/reference/plans-and-license/).

### Which operating systems does it run on?
Windows 10/11 (x64) and macOS 13 or later on Apple Silicon. There are no other builds.

### Why do I have to download the engine separately?
The installer contains only the app. The browser engine is a separate download so you can choose and switch engine versions in **Settings → Engine & updates**. See [Installation](/getting-started/installation/#download-the-browser-engine).

### Does Veilus update itself?
Yes, from version 0.2.6. The app checks for a new version each time it starts and, when one exists, offers **Update and restart**; nothing installs until you click it. You can also click **Check for updates** in **Settings → Engine & updates**. On 0.2.5 or earlier, install the latest version from [veilus.io/download](https://veilus.io/download/) once over the current one. Engine versions are updated separately, on the same settings page. See [Updating Veilus](/getting-started/installation/#updating-veilus).

## Profiles and fingerprints

### Will websites detect my profiles?
No tool can promise that, and Veilus does not. Each profile runs on Veilus's own patched Chromium build with its own fingerprint and proxy. You can check a profile yourself with **Test**, which opens it on a set of fingerprinting test sites. How your accounts are treated also depends on how you use them.

### Should a profile use the same OS as my computer?
Preferably. A profile for a different OS has to imitate more (fonts, CPU architecture), so it is less likely to pass detection. Veilus warns you when you pick a different OS.

### How many profiles can I run at once?
Up to 16 browsers at the same time, counting every way of opening them: by hand, from a schedule, from a batch run, or through the API. During batch runs and schedules, Veilus also waits before opening the next browser when CPU or memory use is high.

### What happens to my profiles when the trial or a license ends?
Nothing is deleted. The Free plan opens 5 of them; the rest are locked until you upgrade or delete other profiles.

## Proxies

### Can I use my own proxies?
Yes. Each profile can have its own HTTP or SOCKS5 proxy, or take one from a **Proxy pool**. See [Proxy setup](/profiles/proxy/).

### Why won't my profile launch with a proxy?
By default, Veilus checks before each launch that the profile's timezone matches where its proxy exits, and blocks the launch if they don't. Open the profile's **Network** tab and click **Match to proxy**, or change the behavior in **Settings → Timezone check** (**Block**, **Warn** or **Off**).

## Data and sync

### Where is my data stored?
Profile data is stored on your computer, in the `.veilus` folder in your home directory. Veilus does not copy profiles anywhere else unless you turn on Veilus Sync.

Veilus Sync copies profiles to a Git repository you choose or to a **Veilus Sync** folder in your Google Drive. Veilus does not encrypt the synced profile data, only the access token for that remote, so use a private repository and an account you control. See [Veilus Sync](/sync/overview/).

### Can I back up or move a profile?
Yes. Export it to a `.veiluspack` file and import it elsewhere. You can set a password to encrypt the file; without one, anyone holding the file can use the profile's logged-in sessions. See [Import & Export](/profiles/import-export/).

## Automation

### What is Veilus Flow?
The automation part of Veilus. You can build a script in the diagram editor, start from a template, or connect an AI assistant that supports MCP (such as Claude Code or Cursor) and let it write a Playwright script, run it and fix it. Scripts run on one profile, as a batch, or on a schedule. See [Automation](/automation/overview/).

### Why does my assistant's script only run on 3 profiles?
Scripts added over MCP or the REST API run on at most 3 profiles per run until you approve them. Open the script in **Veilus Flow** and click **Approve this script**. Batch runs and schedules also need that approval, and a changed script must be approved again.

## License

### My key says it is already activated on too many devices
Each key covers a fixed number of devices. Contact support to free up a device, then activate again.

### How do I get help?
Ask in the [Telegram community](https://t.me/veilusbrowser) or see [Common issues](/troubleshooting/common-issues/).
