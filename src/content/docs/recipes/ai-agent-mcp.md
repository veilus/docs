---
title: AI Agent over MCP
description: Let Claude drive a Veilus profile through MCP, fill a form, and save what it did as a script you approve.
sidebar:
  order: 7
---

This recipe lets Claude drive a Veilus profile: look at a page, fill a form, check the result, then save what it did as a script you approve and schedule. The example fills an order form once per row of a dataset.

**Prompt, script and example data:** [solutions/ai-agent-mcp on GitHub](https://github.com/veilus/sdk/tree/main/solutions/ai-agent-mcp). `script.ts` runs daily on a real Veilus profile.

## Two ways to use it

- **With Claude:** needs Claude Code with the Veilus plugin (`/plugin marketplace add veilus/claude-plugin`, then `/plugin install veilus@veilus`) and the Veilus app running with the local API on. Paste the prompt from `prompt.md`. Claude works in the profile through the [Veilus MCP server](/reference/mcp/) and saves a script. Nothing runs unattended until you approve it in **Veilus Flow → Scripts**. See also [Let an LLM do the automation for you](/recipes/llm-scripts/).
- **Without Claude:** paste `script.ts` into **Veilus Flow → Scripts** and approve it (dataset rows reach approved scripts only), import `dataset.csv` and assign it to a profile. See [Scripts](/automation/scripts/) and [Datasets](/profiles/datasets/).

## What a run prints

```text
RESULT {"submitted":2,"orders":[{"name":"Alex Doe","size":"medium"}, …]}
```

The script throws if the site did not take an order, so a failed submit shows as a failed run.

## Change it for your form

- Profile variable `FORM_URL`: your form. Then change the `page.fill` selectors and the check after the submit. The example reads httpbin's JSON echo, while a real site shows a confirmation page. Or ask Claude to redo step 4 of the prompt on your page.
- `dataset.csv`: one row per submission, columns `NAME`, `PHONE`, `EMAIL`, `SIZE`, `COMMENTS`.

The prompt is not tested automatically: an LLM writes different code on each run, so read the script before you approve it.

## Legal considerations

:::caution
Check a website's Terms of Service and robots.txt before you automate it. How you use Veilus is your responsibility.
:::
