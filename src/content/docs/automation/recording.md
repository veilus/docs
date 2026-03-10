---
title: Recording Actions
description: Record browser actions and generate automation scripts with VeilusFlow.
---

## How Recording Works

1. Open a profile and navigate to the target website
2. Click the **Record** button (🔴) in the VeilusFlow panel
3. Perform your actions normally in the browser
4. Click **Stop** when done
5. Review the generated script

VeilusFlow captures every interaction: clicks, typing, scrolling, navigation, and more.

## Starting a Recording

### From the Profile Manager
1. Right-click a profile → **Start Recording**
2. The profile launches with the recorder active

### From an Active Profile
1. Open the VeilusFlow panel (sidebar or keyboard shortcut)
2. Click the **Record** button

## Recorded Action Types

| Action | Captured Data |
|--------|--------------|
| **Click** | Element selector, coordinates |
| **Type** | Input text, target field |
| **Navigate** | URL |
| **Scroll** | Direction, distance |
| **Select** | Dropdown option |
| **File Upload** | File path |
| **Wait** | Duration or element |
| **Keyboard** | Key combinations |

## Editing a Recording

After stopping the recording, you can:

- **Delete** unwanted steps
- **Reorder** steps via drag-and-drop
- **Edit** step parameters (selectors, text, delays)
- **Add** new steps manually
- **Add waits** between steps for reliability

## Running a Flow

1. Select the flow in VeilusFlow
2. Choose which profile(s) to run it on
3. Click **Run**

### Run Options

| Option | Description |
|--------|-------------|
| **Speed** | Fast / Normal / Slow (adds delays between actions) |
| **On Error** | Stop / Skip / Retry |
| **Screenshots** | Capture after each step |
| **Headless** | Run without showing the browser window |

## Tips

:::tip
Add explicit **wait** steps after navigation and dynamic content loading. This makes automation more reliable.
:::

:::tip
Use **CSS selectors** instead of XPath when possible — they're faster and more maintainable.
:::
