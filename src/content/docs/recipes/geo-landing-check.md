---
title: Geo Landing Check
description: See your landing pages the way visitors in each country see them, with a ready-to-run Veilus Flow script.
sidebar:
  order: 6
---

This recipe opens your landing pages the way visitors in each country see them: which country the visit really came from, where redirects end up, the page language, and a screenshot. Use it to check ads, affiliate links and localized stores before you spend on traffic.

**Script and example data:** [solutions/geo-landing-check on GitHub](https://github.com/veilus/sdk/tree/main/solutions/geo-landing-check). It runs daily on a real Veilus profile.

## Set it up

1. Create one profile per country, each with a proxy in that country. See [Proxy setup](/profiles/proxy/). On each profile, add a profile variable `COUNTRY` with the two-letter code (`DE`, `JP`, …).
2. Paste `script.ts` into **Veilus Flow → Scripts** and approve it (dataset rows reach approved scripts only), import `dataset.csv` with your landing pages and assign it to all the profiles. See [Scripts](/automation/scripts/) and [Datasets](/profiles/datasets/).
3. Run the script on all the profiles at once and read each profile's `RESULT` line in **Run History**. See [Runs](/automation/runs/).

If a profile's proxy exits from the wrong country, that profile fails with `this profile exits from US, not DE: check its proxy`, so you never compare pages from the wrong place.

## What a run prints

```text
RESULT {"country":"DE","timezone":"Europe/Berlin","outDir":"…/geo-landing-check/<run>","pages":[{"url":"…","finalUrl":"…","status":200,"lang":"de","title":"…","screenshot":"DE-1.png"}]}
```

Each run saves its screenshots in its own folder, `OUT_DIR/geo-landing-check/<run>/`. The `RESULT` line gives that folder once as `outDir` and each page's file name. `finalUrl` appears only when the page ended somewhere else. Veilus keeps the last 4096 characters of a run's output: measured, 16 pages fit in one `RESULT` line (11 if every page redirects), so keep each profile's list to 15 pages or fewer.

## Change it for your sites

- `URL` column: your landing pages.
- Profile variable `OUT_DIR`: where screenshots go (default `~/veilus-solutions`).
- Leave `COUNTRY` unset to skip the country check; the exit country is still recorded.

## Legal considerations

:::caution
Check a website's Terms of Service and robots.txt before you visit it automatically. How you use Veilus is your responsibility.
:::
