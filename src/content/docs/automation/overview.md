---
title: VeilusFlow Overview
description: Browser automation scripts — visual node canvas or raw Playwright/Puppeteer code.
---

## What is VeilusFlow?

VeilusFlow is Veilus's **built-in automation platform**. You write a script, then run it against one or more profiles.

Scripts come in two modes:

1. **Visual** — Build a flow by dragging action nodes onto a canvas and connecting them.
2. **Code** — Write a raw TypeScript script using Playwright or Puppeteer. It connects to the already-running profile browser over the Chrome DevTools Protocol, so it drives the real fingerprinted session instead of a separate headless browser.

## Key Concepts

### Scripts
A script is a saved automation — either a visual node graph or a raw TypeScript file — listed on the Scripts tab.

### Running a Script
Pick a script, select which profile(s) to run it on, and set a concurrency limit (how many profiles run at once) and a delay between launches. The app shows each profile's progress and result as the run goes.

### Schedules
Run a script automatically on a recurring schedule instead of triggering it by hand.

## Getting Started

Open the **Scripts** tab to create a new script, either from the node palette or as a raw TypeScript file.
