---
title: Proxy Setup
description: Give a profile a manual proxy or a proxy pool, import proxy lists, test them, and keep the timezone consistent with the proxy.
sidebar:
  order: 3
---

## Two ways to give a profile a proxy

| | Manual proxy | Proxy pool |
|---|---|---|
| Set in | The profile's **Network** tab | **Proxy pools** in the sidebar, then assign to profiles |
| Good for | One profile, one proxy | Many profiles sharing a list of proxies or one provider gateway |

If a profile has both, the **pool proxy takes priority** at launch. A profile with neither connects directly.

The **Proxy** column of the profile list shows what each profile uses: **No Proxy**, **Manual**, the pool's name, or **Dead Proxy** when the proxy at the profile's slot failed a health check.

## Manual proxy

1. Open the profile's panel and go to **Network**.
2. Under **Manual Proxy**, turn on **Enable Proxy**.
3. Pick the **Type**:
   - **HTTP**
   - **SOCKS5**
   - **Residential**: for residential proxies that work over HTTP
4. Enter **Host** and **Port**, and **Username** and **Password** if the proxy needs them.
5. Click **Test Proxy**. On success it shows `Connected • <latency>ms • IP: <exit IP>`.
6. Click **Save Changes**.

## Proxy pools

Open **Proxy pools** in the sidebar and click **New Pool**. There are two kinds.

### Static pool

A list of proxies, one per line, in any of these forms:

```
host:port
host:port:user:pass
user:pass@host:port
```

Static pool proxies are used as HTTP proxies.

Choose an **Assignment Mode**:

- **1:1 Dedicated**: each profile gets its own proxy (slot).
- **Round Robin**: profiles share the proxies in turn.

### Rotating pool

One gateway URL from your proxy provider, for example `http://user:pass@gate.example.com:8000`. Use `socks5://` at the start for a SOCKS5 gateway.

Set **Session Type** to match how your provider's gateway behaves: **Sticky (same IP per session)** or **Per Request (rotate each call)**. The provider does the rotation.

A pool's type cannot be changed after it is created.

### Assign a pool

- **To selected profiles**: tick profiles, click **Assign Pool** in the bulk action bar, pick a pool.
- **To every profile in a filtered list**: filter the list, then click **Assign Pool** in the page header.
- **To one profile**: in its **Network** tab, pick a pool under **Proxy Pool**.
- **When creating profiles**: pick a **Proxy pool** in **Batch create**.

If a 1:1 pool has fewer free proxies than the profiles you are assigning, choose:

- **Strict 1:1**: only the first profiles get a proxy; the rest are skipped.
- **Round-robin**: every profile is assigned, and some share a proxy.

A profile in the Trash keeps its slot in a static pool. Delete it forever from the Trash to free that proxy for other profiles. Deleting a pool removes all of its slot assignments.

## Import and export proxy lists

On the **Proxy pools** page, click **Import** and choose a `.txt` or `.csv` file.

- **TXT**: one proxy per line, in the forms shown above.
- **CSV**: a header row with `host` and `port`, and optionally `username`, `password`, `country`, `timezone`, `city`. Other columns are ignored.

The preview counts valid proxies and lists skipped lines with the reason. Import into a **New pool** or **Add to existing pool** (static pools). Proxies already in the pool, with the same host, port and username, are skipped.

To export, use **Export all** on the Proxy pools page, or **Export** on a pool's page. Choose **TXT** (one proxy per line; a rotating pool is written as its endpoint URL) or **CSV** (with location columns; rotating pools are left out).

:::caution
Exported files contain proxy passwords in plain text. A username or password containing `:` `@` `,` `"` or a line break does not read back correctly from these files; the app warns you when that applies.
:::

## Test proxies

- **Test Proxy** in a profile's Network tab tests the manual proxy.
- **Test** on a pool runs a **Health Check** of every proxy: alive or dead, latency, external IP and location.
- **Geo** on a pool looks up each proxy's country, city and timezone.

## Timezone check

A profile that goes out through a US IP but reports a Vietnam timezone contradicts itself. Before every launch, Veilus compares the profile's timezone with where its proxy (or your own network, with no proxy) exits.

Choose what happens in **Settings → Timezone check**:

| Setting | Behavior |
|---------|----------|
| **Block** (default) | Don't launch; show the two conflicting timezones |
| **Warn** | Show the conflict, but let you open the profile anyway |
| **Off** | No check. Launches faster, because the check calls through the proxy and then looks up the IP's location |

When the check stops a launch, you can choose **Edit profile** or **Change proxy**.

Veilus does not change a profile's timezone on its own when you assign a proxy. To bring them in line:

- In the **Network** tab, with a pool selected, click **Match to proxy**. Veilus measures the proxy's real exit IP and proposes the matching timezone; coordinates follow when you save.
- If a static pool's proxies have a detected location (from **Geo** or a health check) that differs from the profile's timezone, the Network tab shows **Proxy location mismatch** with a **Fix** button.
- Or set the **Timezone** yourself on the Fingerprint tab.

:::tip
Pin a state or city at your proxy provider, not just a country, so every proxy in a pool shares one timezone. When a pool's proxies exit in different timezones, the app warns you, because a profile can be blocked at launch if its proxy moves to another city.
:::

## Troubleshooting

| Problem | What to do |
|---------|------------|
| **Test Proxy** fails | Check host, port, type and credentials |
| Launch blocked by the timezone check | Use **Match to proxy** or change the profile's timezone, or pick a proxy in the profile's region |
| **Dead Proxy** in the list | Run the pool's health check, replace the dead proxy |
| WebRTC shows your real IP | Set **WebRTC Mode** on the Fingerprint tab (see [Fingerprinting](/profiles/fingerprinting/)) |
