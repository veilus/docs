---
title: Web Scraping
description: How to use Veilus for reliable, undetectable web scraping.
sidebar:
  order: 2
---

## Why Use Veilus for Scraping?

Traditional scraping tools (Puppeteer, Playwright, Selenium) are easily detected by anti-bot systems. Veilus solves this by providing:

- **Real browser fingerprints** — pass Canvas, WebGL, and AudioContext checks
- **Residential proxy support** — rotate IPs per request
- **Profile persistence** — maintain cookies across scraping sessions
- **VeilusFlow** — build extraction scripts visually or in code, no separate scraping stack needed

## Quick Start: Scrape a Product Page

### Visual Method (VeilusFlow)

1. Create a profile with a proxy
2. In VeilusFlow, build a script that navigates to the target page
3. Add **Extract** / **Extract List** nodes for the data you want (price, title, rating)
4. Run the script on the profile

### Code Method (Automation API)

For programmatic access, use Veilus's local API:

```javascript
// Connect to a running Veilus profile
const response = await fetch('http://localhost:9222/json/version');
const { webSocketDebuggerUrl } = await response.json();

// Use Chrome DevTools Protocol (CDP)
const browser = await puppeteer.connect({
  browserWSEndpoint: webSocketDebuggerUrl
});

const page = await browser.newPage();
await page.goto('https://example.com/products');

// Extract data
const products = await page.evaluate(() => {
  return [...document.querySelectorAll('.product')].map(el => ({
    title: el.querySelector('.title')?.textContent,
    price: el.querySelector('.price')?.textContent,
  }));
});
```

## Anti-Detection Best Practices

### Rate Limiting
```
Rule: Max 1 request per 3-5 seconds
```

Don't scrape faster than a human would browse. Use random delays:
- Page load: wait 2-5 seconds
- Between items: wait 1-3 seconds
- Between pages: wait 5-10 seconds

### IP Rotation
- Use a different proxy for each scraping session
- Rotate IP after every 50-100 pages
- Use residential proxies for protected sites

### Fingerprint Rotation
- Create a pool of 5-10 profiles with different fingerprints
- Rotate between profiles during long scraping sessions
- Each profile should have its own proxy

### Session Management
- Save cookies and session data (profiles persist automatically)
- Reuse the same profile+proxy for subsequent visits to the same site
- This builds "reputation" with the target site

## Handling CAPTCHAs

When a CAPTCHA appears during scraping:

- **Third-party solvers** — Integrate 2captcha or anti-captcha via API in your script

## Legal Considerations

:::caution
Always check the website's Terms of Service and robots.txt before scraping. Some websites prohibit automated data collection. Veilus is a tool — how you use it is your responsibility.
:::
