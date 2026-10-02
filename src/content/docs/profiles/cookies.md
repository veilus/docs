---
title: Cookies, Snapshots & Warming
description: Import, export and copy cookies, keep restore points of a profile's browser data, and build up browsing history on a schedule.
sidebar:
  order: 7
---

Open a profile's panel and go to the **Data** tab. **Browser data** holds the cookie tools and **Snapshots** holds restore points.

## Cookies

The profile must be **running**. Cookies are kept in the browser's own encrypted store, so Veilus reads and writes them through the running browser.

### Import cookies

Click **Import Cookies**, then either:

- **Choose file and import**: a `.json` file (JSON array of cookies) or a `.txt` file in the `cookies.txt` format, or
- Paste cookies into the box: a JSON array, `cookies.txt` text, or a `Cookie: a=1; b=2` header. For a header, also enter the **Domain** (for example `example.com`). Click **Preview**, then **Import pasted cookies**.

Lines that can't be read are skipped and listed with the reason.

### Export cookies

Click **Export Cookies**, then **Choose location and export**. Save as `.json` or `.txt` (`cookies.txt` format).

:::caution
The exported file is **not encrypted**. Cookies are login credentials: anyone holding the file can access the accounts signed in to this profile.
:::

### Copy cookies to another profile

Click **Copy Cookies to Another Profile**.

1. Pick domains to copy, or none to copy all cookies.
2. Pick the target profiles. Only running profiles are listed, so launch the target first.
3. Click **Copy to N profiles**.

## Snapshots

A snapshot is a local copy of a profile's cookies, site storage and bookmarks that you can go back to.

- **Create Snapshot** saves one now.
- **Restore Snapshot…** lists the profile's snapshots. The profile must be stopped. Restoring replaces its cookies, storage and bookmarks with the snapshot's copy.

Both are also on the right-click menu of a profile's row.

## Warm cookies

A freshly created profile has no history. Cookie warming opens profiles on a schedule and browses a few sites normally, so their cookies and history look long-used.

Warming runs as Veilus Flow schedules, so it needs a plan that includes Veilus Flow.

1. Tick profiles in the list and click **Warm Cookies** in the bulk action bar.
2. Pick the **Intensity**: **Light** (3 sites per run), **Medium** (6) or **Heavy** (10).
3. Set **Run again every (hours)**, from 1 to 168.
4. Edit **Sites**, one address per line. The box starts with a list of common sites.
5. Click **Create schedules**.

Veilus creates **one schedule per profile**, and each profile takes a different path. A single shared schedule would make every profile visit the same sites in the same order, which is itself an identifying trace.
