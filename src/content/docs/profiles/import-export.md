---
title: Import & Export Profiles
description: Move profiles between computers with .veiluspack files, or keep them in step with Veilus Sync.
sidebar:
  order: 4
---

## Export a profile

Export saves one profile into a single `.veiluspack` file:

1. Click the profile's row to open its panel, then click **Export** at the top.
2. Optionally enter a **Password** (and re-enter it). Leave it empty for no encryption.
3. Click **Export** and choose where to save the file.

The file contains:

- The fingerprint configuration and proxy settings
- Cookies, bookmarks, browser preferences and site storage (Local Storage, Session Storage, IndexedDB)

It never contains browsing history, cache, or passwords saved in the browser.

With a password, the whole pack is encrypted. If you lose the password, the pack cannot be opened; there is no way to recover it.

:::caution
A `.veiluspack` file carries the profile's **live login sessions**. Without a password it is not encrypted, and anyone holding it can sign in to the profile's accounts. Set a password when the file leaves your own computer.
:::

## Import a profile

1. Click **Import** in the Profiles page header (or **Import .veiluspack** when the list is empty).
2. Click **Choose Files...** and select one or more `.veiluspack` files.
3. If a pack is password-protected, enter its password.
4. Click **Import**.

Each file becomes a new profile named after the original with **(imported)** added. It keeps the **same fingerprint** as the exported profile, so it looks like the same browser to websites.

:::note
Because the fingerprint is kept, don't run the original and the imported copy at the same time on the same accounts. To a website they are one device appearing in two places.
:::

To move only cookies, or to keep a restore point on the same computer, see [Cookies, Snapshots & Warming](/profiles/cookies/).

## Veilus Sync

To keep profiles in step between your computers instead of moving files by hand, use Veilus Sync. It copies profiles to a Git repository or a "Veilus Sync" folder in your Google Drive. See [Veilus Sync](/sync/overview/) and [Set up sync](/sync/set-up/).

:::caution
Veilus does not encrypt the profile data it copies there, and that data includes cookies: the live login sessions of every profile it copies. Use a private repository, and don't share its access token or your Google account.
:::
