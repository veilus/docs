---
title: Chromium Engine
description: How Veilus downloads, updates, and manages the Chromium engine builds your profiles run on.
sidebar:
  order: 1
---

## Overview

Veilus profiles run on a standalone, custom-patched Chromium build, launched as its own process. This engine is downloaded and managed separately from the Veilus app itself: a fresh install has no engine until you download one in the **Chromium Version Manager**, at which point Veilus activates it automatically.

## Engine Manager

Open **Settings** from the sidebar and go to **Engine & updates**. The **Chromium Version Manager** section shows:

- The version currently in use, if any (for example, `153.0.8010.37`)
- **Sync from Cloud** — fetches the list of available versions from Veilus's servers, along with their signed checksums. This also runs once, silently, whenever you open the **Engine & updates** page.
- Total disk space used by the builds you've downloaded, and a **Cleanup Old** button (shown once you have more than one build downloaded) that deletes every downloaded build except the one currently active
- A list of versions available for your platform, each showing:

| Badge / info | Meaning |
|---|---|
| **Active** | The build new profiles launch with |
| **Latest** | The newest build available for your Veilus version and platform |
| Size, or "Not downloaded" | Whether the build is on disk, and how much space it uses |
| Released date | When that Chromium build was released |

Depending on its state, a version's row offers **Download**, **Activate**, **Redownload**, and **Delete**.

On the Free plan you can keep one downloaded build at a time; paid plans have no limit.

Every download is checked against Veilus's signed version index (SHA-256) before it's kept. If a build has since dropped out of that signed index, Veilus keeps your installed copy as it is and says the build is no longer in the signed engine list.

## Updates

The **Updates** section, below the Chromium Version Manager on the same page, only shows the engine build currently in use ("Engine in use: `<version>`"). It doesn't check for new versions or switch builds.

There is no scheduled or background check for new engine versions, and no setting to turn one on or off. Veilus syncs the version list once, silently, whenever you open **Settings → Engine & updates**; otherwise, syncing happens only when you click **Sync from Cloud** yourself.

## Getting a newer engine version

1. **Settings → Engine & updates → Sync from Cloud**
2. Find the version tagged **Latest**
3. **Download** it, then **Activate** it

Profiles you open afterward use the newly activated build. Profiles that are already open keep running on whichever engine they were launched with — activating a different version doesn't restart them.

## Switching between installed versions

Click **Activate** on any already-downloaded version to make it the one new profiles use. There's no separate "pin" step: whatever you last activated stays active until you activate something else — Veilus never switches it back on its own, since there's no automatic update to begin with.

:::caution
Older engine builds can fail checks on sites that look at the Chrome version. Keep the active build reasonably current unless you have a specific reason to stay on an older one — for example, matching a fixed version across automation runs.
:::

## Troubleshooting

### Engine won't download
- Check your internet connection
- Make sure your firewall allows HTTPS to `api.veilus.io` (the version list and download links) and to Cloudflare R2 (the engine package itself)
- If the error says a build is no longer in the signed list, click **Sync from Cloud** and try again

### Engine won't start, or delete/redownload fails
- On Windows, close any profile windows still using that build first — Windows keeps its files locked while a browser built from it is running, which makes delete and redownload fail
- From **Settings → Engine & updates**, use **Delete** then **Download** to reinstall the build (or **Redownload** if it's the active one)
- If Veilus itself won't start, quit it, remove the version's folder under `~/.veilus/engines/<version>/` by hand, then relaunch and download the engine again

### Sites detect an outdated Chrome version
- **Settings → Engine & updates → Sync from Cloud**, then download and activate the version tagged **Latest**
