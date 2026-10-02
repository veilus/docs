---
title: Settings
description: What each section of the Veilus Settings screen does.
---

Open **Settings** from the sidebar. It has six sections.

## Appearance & language

- **Appearance:** **System** (follow your computer), **Light** or **Dark**.
- **Language:** English, Tiếng Việt, 中文 or Русский. The change takes effect immediately.

## Engine & updates

- **Updates** shows the **Engine in use**, the browser build that profiles launch with.
- **Chromium Version Manager** lists the engine versions you can download:
  - **Sync from Cloud** refreshes the list.
  - **Download** installs a version. The first one you download becomes active.
  - **Activate** switches profiles to another downloaded version.
  - **Redownload** fetches a version again; the delete button removes it from disk.
  - **Cleanup Old** deletes every downloaded version except the active one.

The Free plan can keep one engine version installed; paid plans can keep several. See [Installation](/getting-started/installation/#download-the-browser-engine).

## Timezone check

Before every launch, Veilus can check whether the profile's timezone matches where its proxy exits. A profile that goes out through a US IP but reports Vietnam time is easy for a website to spot.

| Option | What happens on a mismatch |
|--------|----------------------------|
| **Block** (default) | The profile does not launch; Veilus shows the two conflicting values. |
| **Warn** | The profile launches anyway and the mismatch is written to the log. |
| **Off** | No check. Launches can be up to about 9 seconds faster, because the check calls through the proxy and then looks up the IP's location. |

To fix a mismatch, open the profile's **Network** tab and click **Match to proxy**.

## Notifications

System notifications, sent even while Veilus is hidden in the tray. Turn each one on or off:

- A schedule missed its time
- A scheduled run finished (done or failed)
- Sync hit a profile conflict

## System

**Run in background:** closing the window sends Veilus to the system tray, and schedules keep running. To quit fully, choose **Quit Veilus** in the tray menu.

- **Start with the computer** opens Veilus straight to the tray at login, without a window.
- On macOS, the system asks for permission the first time (**Background Items Added**). Click **Allow**, or turn Veilus on in **System Settings → General → Login Items**.

The local API and MCP server have their own page: click **Open API & MCP**, or use **API & MCP** in the sidebar. See [REST API](/reference/rest-api/) and [MCP](/reference/mcp/).

## License

Shows your plan, profile limit, key, status, expiry date and when the key was last validated.

- **Validate Now** checks the key with the license server.
- **Activate License Key** / **Change License Key** enters a new key.
- **Deactivate** switches this device to the Free plan.
- **Try Pro free for 7 days** (Free plan only) requests a trial key by email.
- **Renew** and **Add a device** appear when they apply to your key.

See [Plans & license](/reference/plans-and-license/).
