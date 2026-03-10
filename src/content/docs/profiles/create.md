---
title: Create a Profile
description: How to create and manage browser profiles in Veilus.
---

## Overview

A **profile** in Veilus is an isolated browser environment with its own:

- Browser fingerprint (Canvas, WebGL, fonts, etc.)
- Cookies and local storage
- Proxy configuration
- User agent and timezone

Each profile appears as a completely different device to websites.

## Creating a Profile

### Basic Profile

1. Click **"+ New Profile"** in the profile manager
2. Enter a name for the profile
3. Click **Create**

Veilus automatically generates a realistic fingerprint for the profile.

### Advanced Options

When creating a profile, you can customize:

| Option | Description | Default |
|--------|-------------|---------|
| **OS** | Windows, macOS, or Linux fingerprint | Random |
| **Browser** | Chrome version to emulate | Latest |
| **Screen** | Resolution and color depth | Common resolution |
| **Language** | Browser language | System language |
| **Timezone** | Geographic timezone | Auto (from proxy) |
| **WebRTC** | WebRTC leak protection mode | Disabled |

## Managing Profiles

### Tags and Groups

Organize profiles with color-coded tags:

- Right-click a profile → **Add Tag**
- Use the filter bar to show profiles by tag

### Import / Export

- **Export**: Right-click → Export Profile (saves as `.veilus` file)
- **Import**: File → Import Profile

### Profile Limits

| Plan | Profiles |
|------|----------|
| Free | 5 |
| Starter | 50 |
| Pro | 200 |
| Enterprise | Unlimited |

## Next Steps

- [Configure fingerprint details →](/profiles/fingerprinting/)
- [Set up proxy for a profile →](/profiles/proxy/)
