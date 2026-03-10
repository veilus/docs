---
title: Proxy Setup
description: Configure proxies for browser profiles in Veilus.
---

## Overview

Each Veilus profile can have its own proxy, making it appear to browse from a different location. The timezone fingerprint is automatically matched to the proxy's geographic location.

## Supported Proxy Types

| Type | Format | Use Case |
|------|--------|----------|
| **HTTP** | `http://host:port` | General browsing |
| **HTTPS** | `https://host:port` | Secure connections |
| **SOCKS5** | `socks5://host:port` | Full TCP tunneling |

All types support authentication: `protocol://user:pass@host:port`

## Configuring a Proxy

### Per Profile

1. Open the profile settings (gear icon)
2. Go to the **Proxy** tab
3. Select proxy type (HTTP / HTTPS / SOCKS5)
4. Enter host, port, username, password
5. Click **Check Proxy** to verify
6. Save

### Proxy Check

The built-in proxy checker verifies:
- ✅ Connection is working
- ✅ Your real IP is hidden
- ✅ Geographic location detected
- ✅ Timezone auto-matched to location

## Timezone Auto-Match

When a proxy is configured, Veilus automatically sets the profile's timezone fingerprint to match the proxy's geographic location. This prevents timezone leaks — a common detection vector.

## Rotating Proxies

For automation workflows, you can configure rotating proxies:

1. Enter the rotating proxy endpoint as the proxy address
2. Each new session will use a different IP
3. The timezone fingerprint updates accordingly

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Proxy connection failed | Check host:port and credentials |
| Slow loading | Try a different proxy server |
| Timezone mismatch | Enable "Auto timezone" in profile settings |
| WebRTC leak | Enable WebRTC protection in fingerprint settings |
