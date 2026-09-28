---
title: Import & Export Profiles
description: Move profiles between devices with .veiluspack files, or keep them in sync with Veilus Sync.
sidebar:
  order: 4
---

## Export a Profile

Export saves one profile into a single `.veiluspack` file:

1. In the profile list, open the **⋯** menu on the profile's row → **Export**
2. Optionally set a password to protect the file
3. Choose where to save it

The file contains:

- The fingerprint configuration and proxy settings
- Cookies, bookmarks, and site storage (Local Storage, Session Storage, IndexedDB)

It never contains browsing history, cache, or passwords saved in the browser.

:::caution
A `.veiluspack` file carries the profile's **live login sessions**. Anyone who opens it is logged in as you on those sites. Set a password when the file leaves your own machine.
:::

## Import a Profile

1. Click **Import** in the profile list toolbar
2. Select one or more `.veiluspack` files
3. If a file is password-protected, enter its password

Each file becomes a new profile named after the original with **(imported)** added. The imported profile keeps the **same fingerprint** as the exported one, so it looks like the same browser to websites.

:::note
Because the fingerprint is kept, don't run the original and the imported copy at the same time on the same accounts — to a website they are one device appearing in two places.
:::

## Veilus Sync

Veilus Sync keeps profiles in step between your devices through storage **you** own: a Git repository or a Google Drive folder. The **Plan** page in the app shows which plans include it.

1. Open **Veilus Sync** from the sidebar
2. Create a **Vault** password and save the recovery phrase it shows
3. Connect a provider:
   - **Git** — repository URL, branch, and a personal access token or SSH key
   - **Google Drive** — sign in with Google and pick a folder
4. Click **Sync now** whenever you want to push and pull changes

### What syncs

- ✅ Profile configurations, fingerprints, and proxy settings
- ✅ Cookies, bookmarks, and site storage
- ✅ Automation scripts
- ❌ Browsing history, cache, and saved browser passwords

### What is encrypted

The Vault password encrypts your **provider access token** (Git token or Google sign-in) on this device.

Synced profile data is **not** encrypted. It is stored as-is in your repository or Drive folder, and that includes cookies — the live login sessions of every synced profile. Anyone who can read that repository or folder, including the provider itself, can read them.

:::caution
Use a **private** repository or a folder only you can access, and don't share its access token.
:::
