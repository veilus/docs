---
title: Veilus Flow Overview
description: What Veilus Flow does, and how scripts, runs and schedules fit together.
sidebar:
  order: 1
---

**Veilus Flow** is the automation part of Veilus. Open it from **Veilus Flow** in the app sidebar.

A Flow script is a Node program that connects to a profile's browser after Veilus has started it. The script drives the profile as it is, with its own fingerprint, proxy, cookies and logins. It never starts a separate browser of its own.

Veilus Flow needs a paid plan or the 7-day Pro trial. The Free plan doesn't include it.

## The pieces

| Piece | What it is | Page |
|---|---|---|
| **Script** | A saved automation, listed under the **Scripts** tab. Usually a Playwright (TypeScript) script written by an AI assistant over MCP, which you read and approve. | [Scripts](/automation/scripts/) |
| **Run** | One script run on one or more profiles. Veilus opens each profile, runs the script, records the exit code and output, and closes the profile again. | [Runs](/automation/runs/) |
| **Schedule** | Runs a script on a set of profiles at a fixed interval, daily, weekly, or on a cron expression. | [Schedules](/automation/schedules/) |

Two other features feed data into runs:

- **Profile variables** and **[datasets](/profiles/datasets/)** reach the script as `VEILUS_VAR_<NAME>` environment variables.
- The **[MCP server](/reference/mcp/)** lets an AI assistant such as Claude Code write, test and schedule scripts for you. See [Let an LLM run your automation](/recipes/llm-scripts/).

## Typical workflow

1. Ask an AI assistant connected over MCP to write a script for the job. It looks at the site in a real profile, saves a script, and trial-runs it on up to 3 profiles.
2. Open the script in **Veilus Flow**, read the source, and click **Approve this script**.
3. Run it on the profiles you choose, or create a schedule.
4. Check the script's **Run History** tab for each profile's exit code and output.

## Limits that apply to every run

- **One shared browser limit.** At most 16 profile browsers are open at once, counting all of them: those you open by hand, runs, schedules and the API. A run waits for a free slot instead of failing.
- **Load check.** Before each profile in a run starts, Veilus checks CPU and memory use. If either is high (CPU above 75% or memory above 80%), it waits 5 seconds between launches. If either is above 90%, it pauses starting new profiles until the load drops, for up to 60 seconds, and then continues anyway.
- **Approval.** Runs from the app, schedules and batch runs over the API only accept scripts that are approved. Scripts you write or edit in the app count as approved. An AI assistant's script needs your approval first.
