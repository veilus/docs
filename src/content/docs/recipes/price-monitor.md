---
title: Price Monitor
description: Track prices on product pages with a ready-to-run Veilus Flow script and get told when one changes.
sidebar:
  order: 5
---

This recipe tracks prices on a list of product pages. Each run opens every page in a real profile, reads the price, compares it with the last run, and prints what changed.

**Script and example data:** [solutions/price-monitor on GitHub](https://github.com/veilus/sdk/tree/main/solutions/price-monitor). It runs daily on a real Veilus profile.

## Set it up

1. Create a script in **Veilus Flow → Scripts** and paste `script.ts`. See [Scripts](/automation/scripts/).
2. Import `dataset.csv` as a dataset and assign it to the profile. See [Datasets](/profiles/datasets/).
3. Run it once, then add a [schedule](/automation/schedules/), for example every 6 hours.

## What a run prints

```text
RESULT {"checked":2,"changed":[{"url":"https://…","from":51.77,"to":49.99}]}
```

The first run records prices only, so `changed` is empty. Later runs list the pages whose price changed.

## Change it for your sites

- `URL` column: your product pages. `SELECTOR` column: the CSS selector of the price (empty means `.price`).
- Profile variable `WEBHOOK_URL`: a Slack or Discord webhook to get a message on each change.
- Profile variable `OUT_DIR`: where the last prices are kept (default `~/veilus-solutions`).

## Legal considerations

:::caution
Check a website's Terms of Service and robots.txt before you monitor it. How you use Veilus is your responsibility.
:::
