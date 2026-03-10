---
title: Troubleshooting
description: Solutions to common issues with Veilus.
sidebar:
  order: 1
---

## Installation Issues

### "App can't be opened" on macOS

**Cause:** macOS Gatekeeper blocks apps from unidentified developers.

**Fix:**
1. **System Settings → Privacy & Security**
2. Scroll to "Security" section
3. Click **"Open Anyway"** next to the Veilus warning
4. Or: Right-click Veilus.app → "Open" → "Open"

### Windows SmartScreen warning

**Cause:** New apps without established reputation trigger SmartScreen.

**Fix:** Click "More info" → "Run anyway"

### Linux: Missing dependencies

**Error:** `error while loading shared libraries: libwebkit2gtk-4.1.so`

**Fix:**
```bash
# Ubuntu/Debian
sudo apt install libgtk-3-0 libwebkit2gtk-4.1-0 libayatana-appindicator3-1

# Fedora
sudo dnf install gtk3 webkit2gtk4.1 libayatana-appindicator-gtk3
```

---

## Profile Issues

### Profile won't launch

**Symptoms:** Clicking Launch does nothing, or window opens and closes immediately.

**Try:**
1. **Close other Chromium browsers** — resource conflicts
2. **Check RAM** — minimum ~200 MB free per profile
3. **Restart Veilus** — clears temporary state
4. **Delete profile cache:**
   ```bash
   # Find profile data
   # Windows: %APPDATA%\Veilus\profiles\<profile-id>
   # macOS: ~/Library/Application Support/Veilus/profiles/<profile-id>
   # Linux: ~/.config/veilus/profiles/<profile-id>

   # Delete the cache subfolder (keeps cookies and settings)
   rm -rf <profile-path>/cache
   ```

### Profile loads slowly

**Causes:**
- Too many extensions installed in the profile
- Large cookie database
- Slow proxy connection

**Fixes:**
- Remove unused extensions
- Clear profile cookies: Profile Settings → Clear Data → Cookies
- Test proxy speed: Profile Settings → Proxy → Check Proxy
- Enable profile hibernation for inactive profiles

### Profiles linking to each other

If platforms detect your profiles are related:

1. **Check proxies** — Are multiple profiles sharing the same IP?
2. **Check timezone** — Does it match the proxy location?
3. **Clear DNS cache** — Settings → Privacy → Clear DNS cache
4. **Verify fingerprints** — Each profile should have different Canvas/WebGL hashes
5. **Check WebRTC** — Settings → Privacy → Disable WebRTC or enable spoofing

---

## Fingerprint Issues

### Fingerprint test failing on creepjs.com

**Check these in order:**

1. **Engine version** — Update to latest: Settings → Engine → Update
2. **Fingerprint mode** — Use "Auto" not "Custom"
3. **Extensions** — Some extensions modify fingerprint. Disable all and test
4. **Canvas** — Profile Settings → Fingerprint → Canvas → ensure "Noise" mode is on
5. **WebGL** — Ensure WebGL spoofing is enabled

### iphey.com shows "Bot" or low score

Common causes:
- **WebRTC leak** — Enable WebRTC protection in fingerprint settings
- **Timezone mismatch** — Enable "Auto timezone from proxy"
- **Screen resolution** — Use a common resolution (1920x1080, 1366x768)
- **User agent** — Ensure it matches the engine version

---

## Proxy Issues

### Proxy connection failed

1. **Verify credentials** — username:password correct?
2. **Test from terminal:**
   ```bash
   curl -x socks5://user:pass@host:port https://httpbin.org/ip
   ```
3. **Check proxy type** — SOCKS5 vs HTTP/HTTPS mismatch
4. **Firewall** — Some networks block SOCKS5 connections
5. **Proxy expired** — Check with your proxy provider

### Slow page loading with proxy

1. **Check proxy latency** — Profile Settings → Proxy → Check Proxy
2. **Try a closer server** — Choose proxy in your geographic region
3. **Switch proxy type** — HTTP is generally faster than SOCKS5
4. **Check bandwidth** — Some proxy plans have bandwidth limits

### IP leak detected

1. **Enable WebRTC protection** — Fingerprint Settings → WebRTC → Disabled
2. **Check DNS** — Settings → Privacy → DNS over HTTPS → Enabled
3. **Verify on browserleaks.com** — Should show proxy IP, not real IP

---

## Automation Issues

### VeilusFlow recording doesn't capture clicks

1. **Check DevTools** — Close DevTools while recording (it can interfere)
2. **Iframe content** — Switch to the iframe context in VeilusFlow
3. **Shadow DOM** — Use "Pierce Shadow DOM" option in VeilusFlow settings
4. **Dynamic elements** — Add explicit waits before clicking

### Automation runs too fast / gets blocked

1. Add **random delays**: VeilusFlow → Settings → Delay → 1-3 seconds
2. Enable **human typing**: VeilusFlow → Settings → Typing → Natural
3. Reduce **speed**: Flow → Run Settings → Speed → Slow

---

## Performance Issues

### High RAM usage

| Symptom | Solution |
|---------|----------|
| >500 MB per profile | Close unused tabs, disable extensions |
| System slowdown | Enable auto-hibernation (Settings → Performance) |
| Disk thrashing | Move profile data to SSD |

### Slow startup

1. **Disable auto-launch** for profiles you don't need
2. **Reduce startup profiles** — don't restore 20 profiles at boot
3. **Update engine** — newer versions have performance improvements
4. **SSD** — Store engine and profile data on SSD, not HDD

---

## Getting More Help

If none of the above solve your issue:

1. 💬 **Telegram**: [t.me/veilusbrowser](https://t.me/veilusbrowser) — Community support
2. 🐛 **GitHub Issues**: [github.com/veilus/veilus/issues](https://github.com/veilus/veilus/issues) — Bug reports
3. 📧 **Email**: support@veilus.io — Direct support (Pro/Enterprise)

When reporting a bug, include:
- Veilus version (Settings → About)
- Engine version
- Operating system
- Steps to reproduce
- Screenshots or screen recordings
