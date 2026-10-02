---
title: Veilus Sync
description: Copy your profiles between computers through a Git repository or Google Drive that you own.
sidebar:
  order: 1
---

Veilus Sync copies your profiles between computers through storage you own: a **Git repository** or your **Google Drive**. There is no Veilus server in the middle — each computer pushes and pulls directly to your storage.

Veilus Sync is included in the paid plans. On the Free plan, **Veilus Sync** in the sidebar is locked.

## What is copied

For each profile:

- Profile settings — name, fingerprint, proxy settings (including the proxy username and password), tags, notes, and variables
- Cookies, bookmarks, and browser preferences
- Site storage: Local Storage, Session Storage, and IndexedDB
- Autofill data stored by the browser

For the app:

- Your scripts
- Your tag list (names and colors)

## What stays on this computer

- Browsing history and cache
- Passwords saved in the browser
- Everything not listed above — for example proxy pools, datasets, schedules, and installed extensions

## Who can read the copied data

:::caution
Veilus does **not** encrypt profile data before uploading it. Files in your repository or Drive folder are stored as-is, including cookies — the live login sessions of every profile you sync. Anyone who can read that repository or folder, including the storage provider, can read them.
:::

What the vault password does protect is the **credential** Veilus uses to reach your storage (a Git personal access token or SSH private key, or your Google sign-in). It is stored encrypted on this computer. See [Set up Veilus Sync](/sync/set-up/).

To keep your data safe:

- Use a **private** repository, or a Google account only you use
- Don't share the repository's access token or SSH key
- With Git, every past version stays in the repository's history — deleting a profile does not remove its old files from history

## How syncing works

Syncing is manual. Each time you click **Git Sync** or **Drive Sync**, Veilus:

1. Uploads the profiles that changed on this computer
2. Downloads the profiles that changed on your other computers

A profile whose browser is **open** on this computer is not overwritten. Close it and sync again to receive the other computer's changes.

## Next steps

- [Set up Veilus Sync](/sync/set-up/)
- [Devices, activity, and conflicts](/sync/devices-and-conflicts/)
- To move a single profile without syncing, use [Import & Export](/profiles/import-export/)
