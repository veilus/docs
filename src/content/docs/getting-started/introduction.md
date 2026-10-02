---
title: Introduction
description: What Veilus is, what it does, and where to start.
sidebar:
  order: 1
---

Veilus is a desktop app for Windows and macOS that runs many separate browser profiles side by side. Each profile has its own fingerprint, proxy, cookies and storage, so accounts kept in different profiles do not share browser data. Automation (Veilus Flow) is built into the same app.

The browser itself is Chromium, built and patched by Veilus. It is not bundled with the installer: you download it from inside the app the first time (see [Installation](/getting-started/installation/)).

## What you can do

| Area | What it does |
|------|--------------|
| **Profiles** | Create a profile for Windows or macOS with a language, region and timezone. Veilus generates a fingerprint that matches that OS. Duplicate, tag, filter and move profiles to the trash. |
| **Proxy** | Set a manual HTTP or SOCKS5 proxy per profile, or create **Proxy pools** (static or rotating) and assign profiles to them. Before each launch, Veilus can check that the profile's timezone matches where the proxy exits. |
| **Profile test** | **Test** a profile against a set of fingerprinting test sites and see how many it passed. |
| **Cookies & extensions** | Import, export or copy cookies between running profiles. Install extensions once in **Extensions** and assign them to profiles. |
| **Veilus Flow** | Build scripts in the diagram editor, start from a template, or let an AI assistant write Playwright scripts over MCP. Run them on one profile, as a batch, or on a schedule. |
| **Datasets** | Keep rows of data (accounts, URLs, and so on) that scripts read per profile. See [Datasets](/profiles/datasets/). |
| **Veilus Sync** | Copy profiles to a Git repository you choose or to your Google Drive. See [Veilus Sync](/sync/overview/). |
| **API & MCP** | A local REST API and MCP server on `127.0.0.1` so your own tools or AI assistant can list, open and close profiles and run scripts. |
| **Import / Export** | Save profiles as `.veiluspack` files, optionally protected with a password. See [Import & Export](/profiles/import-export/). |

Veilus Flow, schedules, batch runs, Veilus Sync, import/export, script templates and the local API/MCP need a paid plan or the 7-day trial. See [Plans & license](/reference/plans-and-license/).

## What Veilus does not promise

No tool can guarantee that a website will never detect or link your profiles, and Veilus does not claim to. How a site treats your accounts also depends on how you use them: proxy quality, behavior, and whether the profile's OS, language and timezone fit its proxy.

## Next steps

1. [Install Veilus](/getting-started/installation/) and download the browser engine.
2. [Create and launch your first profile](/getting-started/quickstart/).
3. [Set up proxies](/profiles/proxy/).
4. [Automate with Veilus Flow](/automation/overview/).

## Community

- [Telegram](https://t.me/veilusbrowser)
- [X](https://x.com/veilusbrowser)
- [GitHub](https://github.com/veilus)
