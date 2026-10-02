---
title: Troubleshooting
description: Fixes for common problems with installing Veilus, activating a license, the browser engine, proxies, launching profiles, and Veilus Sync.
sidebar:
  order: 1
---

## Installing and first launch

### macOS: "Apple could not verify Veilus…"

The macOS build is not notarized by Apple, so macOS blocks the first launch.

1. Open Veilus once. When macOS says it cannot verify the developer, click **Done**
2. Open **System Settings → Privacy & Security**, scroll down, and click **Open Anyway** next to the Veilus message
3. Confirm **Open Anyway**

Later launches work normally.

### macOS: Veilus doesn't start at login

If you turned on **Start with the computer** in **Settings → System**, macOS asks for permission the first time ("Background Items Added"). Click **Allow**, or turn Veilus on in **System Settings → General → Login Items**. Until then, Veilus won't start at login.

### Windows: SmartScreen warning

Windows may show "Windows protected your PC" when you run the installer, because the app is new and has no reputation score yet. Click **More info → Run anyway**.

---

## License and activation

Activate or change your key in **Settings → License**.

| Message | What to do |
|---|---|
| Please enter a license key | The key field is empty. Paste your key and try again |
| Invalid license key | Check that you pasted the whole key, with no extra spaces |
| Couldn't reach the license server. Check your connection and try again. | Check your internet connection, VPN, or firewall, then retry |
| This license has expired | Renew the license, then click **Validate Now** |
| This license has been revoked / This license has been disabled | The key can no longer be used. Contact us on [Telegram](https://t.me/veilusbrowser) |
| Activation failed (HTTP …) | A server error. Wait a moment and try again; if it keeps happening, contact us |
| Your license uses … signing, which this app version cannot verify. Update Veilus to restore your plan. | Install the latest Veilus version |

### "This license is already activated on N devices — the most it allows."

Every computer you activate counts as one device, and your key allows a fixed number. **Deactivate** in **Settings → License** switches only this computer back to the Free plan — it does not free the device slot. Contact us on [Telegram](https://t.me/veilusbrowser) to free up a device, then try again.

Veilus recognizes a computer partly by its computer name and your operating-system user account. Renaming the computer, or running Veilus under a different user account, can make the same machine count as a new device.

---

## Browser engine

The engine is not included in the installer. A new install has no engine until you download one. For full details, see [Chromium Engine](/engine/chromium/).

| Problem | What to do |
|---|---|
| **Settings → Engine & updates** says *No engine activated yet — download one in Chromium Version Manager.* | Click **Sync from Cloud**, then **Download** the version tagged **Latest**. Veilus activates your first download automatically |
| A profile won't open and the error starts with *Chromium binary not found* | The active engine is missing from disk. Download or **Redownload** it in **Settings → Engine & updates** |
| *Build … is no longer in the signed engine list — keeping the installed build* | Click **Sync from Cloud**, then download the version tagged **Latest** |
| A message that you've reached the version limit on the Free plan | The Free plan keeps one engine version on disk. Delete the old one before downloading another, or upgrade |
| Download fails | Check your connection and that your firewall allows HTTPS to `api.veilus.io` and to Cloudflare R2 |

---

## Proxies

### "Test Proxy" fails

**Test Proxy** in a profile's proxy settings loads `https://httpbin.org/ip` through the proxy and shows the latency and exit IP on success.

| Message | Likely cause |
|---|---|
| Connection timeout (10s) | The proxy is too slow or unreachable, or the host or port is wrong |
| Connection refused | The proxy did not accept the connection. Check the host, port, username and password, and whether your proxy plan is still active |
| Proxy not configured (empty host or port) | Fill in **Host** and **Port** |
| Connection failed: … | Often the wrong **Type** — check whether your provider gave you an HTTP or SOCKS5 proxy |

If the proxy works elsewhere but the test still fails, check that `httpbin.org` isn't blocked on your network.

For proxy pools, use **Run health check** on the pool to test every proxy at once.

### A profile won't open: "Cannot open …" with two time zones

Before each launch, Veilus compares the profile's time zone with where its proxy exits. When they don't match, the dialog shows **Profile declares** and **Proxy exits in** and how many hours apart they are. Click **Change proxy** or **Edit profile** to fix the mismatch.

You choose what happens on a mismatch in **Settings → Timezone check**: **Block**, **Warn** (launch anyway and log it), or **Off**.

---

## Launching profiles

### "Too many browsers are already open (16 of 16). Close one and try again."

Veilus runs at most 16 browsers at the same time. Close a profile to free a slot.

Script runs started from Veilus Flow or a schedule don't fail straight away at this limit — they wait for a slot to free up.

### "You've reached the 5-profile limit on the Free plan."

The Free plan allows 5 profiles. Delete profiles you no longer need, or upgrade.

---

## Veilus Sync

| Problem | What to do |
|---|---|
| *Vault is locked. Unlock it in the Settings tab, then sync again.* | The vault locks every time Veilus restarts. Open **Veilus Sync → Settings**, enter the vault password, and click **Unlock** |
| *Set up a provider in Settings first* | Connect Git or Google Drive in **Veilus Sync → Settings** |
| A warning like *2 profiles were changed in two places* | Both computers changed the same profile between syncs. Veilus used one version and kept the other in your storage — see [Conflicts](/sync/devices-and-conflicts/#conflicts) |
| Changes from another computer didn't arrive for one profile | A profile whose browser is open is not overwritten. Close it and sync again |
| Another computer is missing from **Devices** | It appears after that computer has synced and this computer has synced again |

See [Set Up Veilus Sync](/sync/set-up/) for more error messages.

---

## Getting more help

Ask on Telegram: [t.me/veilusbrowser](https://t.me/veilusbrowser). For billing and refunds, email billing@veilus.io.

When you report a problem, include:

- Your Veilus version and operating system
- The engine version (**Settings → Engine & updates**, "Engine in use")
- The exact error message, and the steps that lead to it
