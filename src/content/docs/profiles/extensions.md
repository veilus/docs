---
title: Extensions
description: Install browser extensions once in a shared library and choose which profiles load them.
sidebar:
  order: 6
---

## The extension library

Extensions live in one shared library: install once, assign to many profiles.

1. Open **Extensions** in the sidebar.
2. Install an extension:
   - **From folder**: pick an unpacked extension folder.
   - **Install .zip / .crx**: pick a downloaded `.zip` or `.crx` file.

Each extension in the library shows its name, description, source and the permissions it asks for. Use the pencil button to rename it, or the bin button to delete it.

Deleting an extension removes it from the library and from every profile using it. Extension data already stored in each profile is not deleted.

:::caution
Extensions run **inside** the profile and can read its cookies and login sessions. Only install extensions whose source you know. This is riskier than running a script, because scripts run outside the browser.
:::

## Choose extensions for a profile

1. Open the profile's panel and go to the **Extension** tab.
2. Tick the extensions this profile should load.
3. Click **Save**.

The profile loads its extensions when it launches. **Duplicate** copies a profile's extensions to the copy.

:::tip[Vary the set between profiles]
Websites can detect which extensions a browser has. If other profiles use exactly the same set, the Extension tab tells you how many: on this point those profiles look identical. Swap a few extensions between profiles to tell them apart.
:::
