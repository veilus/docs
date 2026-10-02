---
title: Web Scraping
description: Collect data from websites with Veilus Flow scripts that run in real profiles, with each profile's own proxy and cookies.
sidebar:
  order: 2
---

This recipe collects data from web pages with a Veilus Flow script. The script runs inside a profile's browser, so each request goes out with that profile's fingerprint, proxy and cookies. Logins and cookies stay in the profile between runs.

## What you need

- One or more profiles with proxies. See [Proxy Setup](/profiles/proxy/).
- A Playwright script. The easiest way is to ask an AI assistant connected over [MCP](/reference/mcp/) to write it. See [Let an LLM run your automation](/recipes/llm-scripts/).

:::note
Don't use the diagram editor for scraping. Its **Extract** and **Extract List** nodes don't print what they collect, so nothing reaches the run's output. See [The diagram editor](/automation/scripts/#the-diagram-editor).
:::

## Example: scrape a product list

This script opens a page, reads every product on it, and prints the result as one JSON line. Printing to stdout is how a script returns data: the output appears in the script's **Run History** tab, and an AI assistant reads it with `get_run_result`.

```typescript
import { chromium } from "playwright";

async function main() {
  const browser = await chromium.connectOverCDP(
    `http://127.0.0.1:${process.env.VEILUS_DEBUG_PORT}`,
  );
  const context = browser.contexts()[0];
  const page = context.pages()[0] ?? (await context.newPage());

  const url = process.env.VEILUS_VAR_TARGET_URL ?? "https://example.com/products";
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.waitForSelector(".product");

  const products = await page.$$eval(".product", (els) =>
    els.map((el) => ({
      title: el.querySelector(".title")?.textContent?.trim() ?? null,
      price: el.querySelector(".price")?.textContent?.trim() ?? null,
    })),
  );

  if (products.length === 0) {
    throw new Error(`no products found on ${url}`);
  }
  console.log(JSON.stringify({ url, count: products.length, products }));

  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
```

Replace `.product`, `.title` and `.price` with the selectors of the site you scrape. Throwing when nothing is found makes the run show as failed instead of quietly succeeding with no data.

Veilus keeps only the last 4096 characters of each profile's output. If you collect more than that, write it to a file with Node's `fs` module and print a short summary.

## Scrape a list of URLs

To work through many pages across several profiles, put the URLs in a **consume** dataset with a column named `URL`, set how many rows each run takes, and assign the dataset to the profiles. Each run takes new rows, and two profiles never get the same row. See [Datasets](/profiles/datasets/).

The rows reach an approved script in `VEILUS_VAR_ROWS`:

```typescript
const rows: Array<{ URL: string }> = JSON.parse(process.env.VEILUS_VAR_ROWS ?? "[]");
for (const row of rows) {
  await page.goto(row.URL, { waitUntil: "domcontentloaded" });
  // ... read the page and console.log the result
}
```

A run that fails returns its rows to the dataset, so no URL is lost.

## Run it

1. Approve the script in **Veilus Flow**.
2. Run it on your profiles, or create a [schedule](/automation/schedules/) to collect data at fixed times.
3. Read each profile's output in the **Run History** tab.

## Go easy on the site

- Keep **Concurrency** low and set a **Delay Between** launches. See [Runs](/automation/runs/).
- Wait inside the script between pages, for example `await page.waitForTimeout(3000)`.
- Reuse the same profile for the same site, so its cookies and logins carry over from run to run.

## Legal considerations

:::caution
Check a website's Terms of Service and robots.txt before you scrape it. Some websites prohibit automated data collection. How you use Veilus is your responsibility.
:::
