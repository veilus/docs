---
title: Set Up Veilus Sync
description: Create the vault, connect a Git repository or Google Drive, and run your first sync.
sidebar:
  order: 2
---

Open **Veilus Sync** from the sidebar, then the **Settings** tab. Setup has two parts: the vault, then a provider. Repeat both on every computer you want to sync.

## 1. Create the vault

The vault holds the access token Veilus uses to reach your storage, stored encrypted on this computer. While the vault is locked, syncing is unavailable.

1. In the **Vault** panel, enter a **New password** and **Re-enter password**
2. Click **Create vault**
3. Veilus shows a 12-word recovery phrase **once**. Write it down or click **Copy** and store it somewhere safe — no screen shows it again

The vault locks again every time Veilus restarts. Enter the **Vault password** and click **Unlock** before you sync.

:::note
The vault password protects only the access token. It does not encrypt your profile data — see [Who can read the copied data](/sync/overview/#who-can-read-the-copied-data).
:::

## 2. Connect a provider

You can connect Git, Google Drive, or both. Each has its own sync button.

### Git

Works with GitHub, GitLab, Gitea, Gitee, and self-hosted Git servers.

1. Create an **empty private repository** on your Git host
2. In the **Git Server** panel, fill in:
   - **Remote URL** — for example `https://github.com/you/veilus-data.git`
   - **Branch** — leave it as `main`. Veilus pushes to `main` (or `master` if the repository has no `main`)
   - **Authentication** — choose one:
     - **Personal Access Token** — a token that can read and push to the repository
     - **SSH Key** — paste the full private key, starting with `-----BEGIN OPENSSH PRIVATE KEY-----`
3. Click **Save Git Config**. Veilus saves the settings and connects to the repository; if it can't connect, the error appears under the form

:::caution
A pasted SSH private key is saved as a separate file in Veilus's data folder on this computer. Unlike a personal access token, it is **not** protected by the vault password. Use a key made only for this repository.
:::

### Google Drive

1. In the **Google Drive** panel, click **Connect Google Drive**
2. Your web browser opens. Sign in with Google and allow access within two minutes
3. Back in Veilus, the panel shows **Connected** and your account

Veilus stores its files in a folder named **Veilus Sync** in your Drive. It can only see files it created itself, not the rest of your Drive. To stop using Drive, click **Disconnect**.

## 3. Sync

Click **Git Sync** or **Drive Sync** at the top of the page. The page shows **Syncing…** while it runs, then the time of the last sync.

On your second computer, set up the vault and connect the **same** repository or Google account, then sync. Profiles from the first computer appear in its profile list.

## Common errors

| Message | What to do |
|---|---|
| Vault is locked. Unlock it in the Settings tab, then sync again. | Enter the vault password in **Settings → Vault** and click **Unlock** |
| Set up a provider in Settings first | Connect Git or Google Drive in the **Settings** tab |
| *Git is not set up — go to settings to configure it* (or *Google Drive is not set up…*) | You clicked the button for a provider you haven't connected on this computer |
| *Git authentication failed: …* | Check the Remote URL and that the token or SSH key can push to the repository |
| Passwords do not match | Type the same new vault password in both fields |
