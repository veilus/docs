---
title: Devices, Activity, and Conflicts
description: See which computers sync, what happened in recent syncs, and what Veilus does when a profile changes in two places.
sidebar:
  order: 3
---

## Status tab

The **Status** tab shows:

- **Devices** — how many computers share this storage
- **Provider** — **Active** once Git or Google Drive is connected
- **Last Sync** — the time of the last sync since Veilus was opened
- **Recent Activity** — events recorded on this computer: every sync (provider, chunks pushed and pulled, conflicts, or the error if it failed) and profile snapshots

If a sync fails, the error appears at the top of this tab.

## Profile sync badges

The profile list shows each profile's state compared with the last sync:

| Badge | Meaning |
|---|---|
| **Never** | Not synced yet |
| **Synced** | Matches the last sync |
| **Modified** | Changed on this computer since the last sync |
| **Conflict** | Edited on two computers — one version is in use here, the other is kept in your storage |

## Devices tab

**Authorized Devices** lists the computers that have synced to the same storage, as of this computer's last sync. Each row shows the operating system, the computer name, and when it last synced. Your own computer is marked **This device**.

Another computer appears here only after it has synced and this computer has synced again afterwards.

:::caution
**Rename** changes a computer's name for every computer that syncs to this storage. **Deauthorize** removes a computer from the list and makes its next sync fail with *This device was deauthorized from another device and can no longer sync.* Both need the vault unlocked and the storage reachable. You can't deauthorize the computer you're using, and a deauthorized computer can't be authorized again from this screen.

Deauthorizing is enforced by the Veilus app. To also cut off access completely, revoke that computer's personal access token or SSH key at your Git host, or remove Veilus's access in your Google account settings.
:::

## Conflicts

A conflict happens when the same profile changed on two computers between syncs. Veilus does not merge the two versions — cookies can't be combined field by field — so it picks one and tells you. The sync still completes.

After the sync, the **Status** tab shows a warning such as *2 profiles were changed in two places*, with one line per profile:

| Situation | Message | Result |
|---|---|---|
| Edited on both computers | Profile "Shop A" was edited on two devices: MacBook at 09:10 and Office-PC at 09:25. The version from Office-PC is in use. | The other computer's version is used on this computer |
| Deleted here, edited on the other computer | Profile "Shop A" was deleted on this device, but Office-PC edited it at 09:25. Veilus kept their version. | The profile comes back with the other computer's changes |

The version that was not used is not deleted — it stays in your sync storage.

Veilus also sends a system notification when a sync hits a conflict. To turn it off, switch off **Sync hit a profile conflict** in **Settings → Notifications**.

### Avoiding conflicts

- Sync before you start working on a computer, and again when you finish
- Don't use the same profile on two computers at the same time — to websites, it is one browser appearing in two places
- Close a profile's browser before syncing: an open profile is not overwritten by incoming changes
