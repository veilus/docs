---
title: Import & Export Profiles
description: Share profiles between devices or team members.
sidebar:
  order: 4
---

## Export a Profile

Export saves all profile data into a single `.veilus` file:

1. Right-click the profile → **Export**
2. Choose save location
3. The file includes:
   - Fingerprint configuration
   - Cookies and session data
   - Proxy settings
   - VeilusFlow automations (optional)
   - Bookmarks and history (optional)

### Export Options

| Option | Default | Description |
|--------|---------|-------------|
| **Include cookies** | ✅ On | Session data, login states |
| **Include automations** | ✅ On | VeilusFlow scripts |
| **Include bookmarks** | ❌ Off | Browser bookmarks |
| **Include history** | ❌ Off | Browsing history |
| **Encrypt export** | ❌ Off | Password-protect the file |

### Bulk Export
Select multiple profiles (Ctrl/Cmd + click) → right-click → **Export Selected**. Each profile is saved as a separate `.veilus` file in the chosen directory.

## Import a Profile

1. **File → Import Profile** (or drag a `.veilus` file into the profile manager)
2. Veilus creates a new profile with the imported configuration
3. A new fingerprint is generated (the original fingerprint data is not copied for security)

:::caution
Imported profiles get a **new fingerprint** by default. If you need to preserve the exact fingerprint (e.g., transferring between your own devices), enable "Keep original fingerprint" during import.
:::

## Team Sharing

### Profile Templates
Create a template from any profile and share it with your team:

1. Right-click profile → **Save as Template**
2. Templates include: proxy type, OS preference, browser settings
3. Templates do **not** include: cookies, history, or specific fingerprints
4. Share the `.veilus-template` file with teammates

### Batch Creation
Use a template to create multiple profiles at once:

1. **File → Batch Create from Template**
2. Select the template
3. Enter the number of profiles to create
4. Each gets a unique fingerprint and name (auto-numbered)

## Cloud Sync (Veilus Sync)

:::note
Veilus Sync is available on Starter, Pro, and Enterprise plans.
:::

Sync profiles across devices automatically:

1. **Settings → Sync → Enable**
2. Sign in with your Veilus account
3. Choose which profiles to sync
4. Changes propagate within seconds

### What syncs:
- ✅ Profile configurations
- ✅ Fingerprint settings
- ✅ Proxy configurations
- ✅ VeilusFlow automations
- ⚠️ Cookies (optional, encrypted)
- ❌ Browsing history (never synced)

### End-to-End Encryption
All synced data is encrypted with a key derived from your account password. Veilus servers never see your unencrypted profile data.
