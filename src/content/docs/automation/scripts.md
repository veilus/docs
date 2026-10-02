---
title: Scripts
description: Where Veilus Flow scripts come from, how to review and approve them, and what a script receives when it runs.
sidebar:
  order: 2
---

The **Scripts** tab of **Veilus Flow** lists every script. Each card has **Run**, **History**, an edit button and **Move to trash**. Use **Search scripts...** to find one by name. Click **Pending approval** to show only the scripts that still need your review.

## Where scripts come from

| Source | How | What you get |
|---|---|---|
| **AI assistant (MCP)** | An assistant such as Claude Code saves the script with the `save_script` tool. See [Let an LLM run your automation](/recipes/llm-scripts/). | A Playwright (TypeScript) script, marked **MCP** in the list. It waits for your approval. |
| **From Diagram** | **New Script → From Diagram** opens the drag-and-drop editor. | A diagram script. See [The diagram editor](#the-diagram-editor). |
| **From Template** | **New Script → From Template**, then **Use Template** on a card under **Server Templates**. | A copy of the template in your script list. |

## Review and approve a script

A script saved by an AI assistant can be trial-run on up to 3 profiles, but nothing else will run it until you approve it. That covers runs from the app, schedules, and batch runs over the API. This matters because an approved script runs unattended, with your profiles and their logins, as a Node program with your user's permissions.

1. Open the script from the list. A banner says the script was written by an agent and is waiting for approval.
2. Read what changed. The page shows **Changes since the last approved version** with a line count. Click **Show full source** to read the whole file.
3. Click **Approve this script**.

If the script changed after you opened the page, approval is refused with a message asking you to reload. Click **Reload**, read the new version, and approve again.

When the assistant saves a new version, the script goes back to **Pending approval**. Schedules skip it until you approve the new version.

## Edit a script

Open a Playwright script and click **Edit**. You can change **Script Name**, **Description** and the source, then click **Save Changes**.

- Saving a change to the code approves that version, because you are its author.
- The source is checked against the [script rules](#script-rules) before it is saved. A violation is refused, with the line it's on.

## Versions

Every saved change to a script's code creates a new version. The **Versions** tab lists them, with **approved** next to the version you approved.

- **View source** shows that version's code.
- **Compare with current** shows the differences.
- **Restore this version** makes it current again. For a script from an AI assistant, restoring the approved version keeps it approved, and restoring any other version puts it back to **Pending approval**.

Versions saved before Veilus started keeping script contents can't be viewed or restored.

## Script rules

Scripts connect to a browser Veilus has already started for the profile. Veilus checks these rules when a script is saved, whether you save it in the app or an assistant saves it over MCP:

1. Connect with `` chromium.connectOverCDP(`http://127.0.0.1:${process.env.VEILUS_DEBUG_PORT}`) `` (or `puppeteer.connect` with `puppeteer-core`).
2. Don't call `chromium.launch`, `launchPersistentContext` or `puppeteer.launch`. The profile's browser is already running.
3. Use `browser.contexts()[0]`, not `newContext()`. A new context has none of the profile's cookies or storage.
4. Don't call `setUserAgent`, `setViewportSize` or `setViewport`. The profile sets its own identity.
5. Exit with a non-zero code on error: `main().catch((e) => { console.error(e); process.exit(1); })`.
6. Import only `playwright`, `playwright-core`, `puppeteer-core` and Node built-in modules. The MCP tools tell assistants to use Playwright.
7. End `main()` with `await browser.close()`. It only disconnects from the profile's browser so the script can exit. Without it the run hangs until it times out.

The check reads the source as text. It catches mistakes. It does not stop a script that is trying to break the rules, so read a script before you approve it.

### A minimal script

```typescript
import { chromium } from "playwright";

async function main() {
  const browser = await chromium.connectOverCDP(
    `http://127.0.0.1:${process.env.VEILUS_DEBUG_PORT}`,
  );
  const context = browser.contexts()[0];
  const page = context.pages()[0] ?? (await context.newPage());

  await page.goto(process.env.VEILUS_VAR_TARGET_URL ?? "https://example.com");
  console.log(`title: ${await page.title()}`);

  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
```

## What a script receives

Every value arrives as an environment variable, and every value is a string.

| Variable | Value |
|---|---|
| `VEILUS_DEBUG_PORT` | The port to connect to the profile's browser |
| `VEILUS_VAR_PROFILE_ID` | The profile's ID |
| `VEILUS_VAR_RUN_ID` | The run's ID |
| `VEILUS_VAR_<NAME>` | A variable named `NAME`, from the sources below |
| `VEILUS_VAR_ROWS` | Rows from the profile's content [dataset](/profiles/datasets/), as a JSON array |
| `VEILUS_VAR_ROW_INDEX` | The number of the dataset row |

Variable names are upper-cased. `profile_id`, `run_id` and `debug_port` are set by Veilus, and a variable of yours with the same name is ignored.

`VEILUS_VAR_<NAME>` values come from three places. When the same name appears in more than one, the later one in this list wins:

1. **Profile variables**: open the profile's panel, go to the **Automation** tab, and add them under **Variables**.
2. **Datasets**: columns of the profile's assigned rows. See [Datasets](/profiles/datasets/).
3. **Run variables**: values passed to a single run, for example by an AI assistant through `run_script` or `run_batch`.

Profile variables and dataset rows only reach **approved** scripts. A trial run of an unapproved script gets only the variables passed to that run.

## Output and exit code

- Veilus keeps the last 4096 characters of each profile's stdout and stderr. They show in the script's **Run History** tab, so print what you need to check with `console.log`.
- Exit code `0` means the profile succeeded. Any other exit code marks the profile as failed, with an excerpt of the error output as the reason.
- A script that is still running after 1 hour is stopped and the profile fails. A trial run started by an AI assistant with `run_script` is stopped after 10 minutes.

## The diagram editor

**From Diagram** creates a script you build by dragging nodes from the **Node Palette** onto a canvas: Navigate, Click, Type Text, Wait, Extract, Extract List, Condition, Loop, and more. Changes on the canvas save automatically. Open the **Code** tab to see the Playwright code Veilus generates from the diagram.

:::caution
The diagram editor only suits short, straight sequences of steps. In the generated code:

- **Condition** and **Loop** nodes compile to empty blocks. No steps run inside the branch or the loop.
- **Extract** and **Extract List** store values but don't print them, so they don't show in the run's output.
- An error in a step is printed, but the script still exits with code `0`, so the run reports the profile as done.

For anything with branches, loops, output you need to read, or a reliable failure signal, use a Playwright script. An AI assistant can write one for you.
:::
