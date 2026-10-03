---
title: Schedules
description: Run a Veilus Flow script on a set of profiles automatically, once at a set time, at an interval, daily, weekly, or on a cron expression.
sidebar:
  order: 4
---

A schedule runs one script on a set of profiles, again and again, without you starting it. Each scheduled run works like a [run you start by hand](/automation/runs/).

Schedules are a Pro feature, also included in the trial.

## Create a schedule

1. Open **Veilus Flow**, go to the **Schedule** tab, and click **New Schedule**.
2. Fill in the form:

| Field | What to enter |
|---|---|
| **Schedule Name** | A name for the list, such as "Daily login check" |
| **Script (optional)** | The script to run |
| **Run on** | **Pick manually** to tick profiles, or **By saved filter** to run on whatever profiles a saved filter matches |
| **Schedule Type** | **interval**, **daily**, **weekly**, **cron** or **once** (see below) |
| **Concurrency** | How many profiles run at the same time, from 1 up to the number of profiles picked |
| **Stagger Delay (ms)** | The pause between two profile launches, in milliseconds |
| **Enable schedule immediately** | Leave on to start the schedule now; turn off to create it paused |

3. Click **Create Schedule**.

### Schedule types

| Type | Settings | Runs |
|---|---|---|
| **interval** | **Interval** and **Unit** (minutes or seconds) | Every N minutes or seconds. The shortest interval is 5 seconds. |
| **daily** | **Hour (0-23)**, **Minute (0-59)** | Every day at that time |
| **weekly** | **Day**, **Hour (0-23)**, **Minute (0-59)** | Once a week, on that day at that time |
| **cron** | **Cron Expression** (5 fields) | Whenever the expression matches |
| **once** | **Run at** (date and time, this computer's local time) | One run at that time, then the schedule turns itself off. The time must be in the future, and a one-time schedule whose time has passed cannot be turned back on: create a new one. |

Times are in your computer's local time zone.

### Run on a saved filter

With **By saved filter**, the schedule doesn't keep a fixed list of profiles. The set is worked out again on every run, so profiles you add later that match the filter are included. The form shows how many profiles the filter matches right now.

Save a filter on the profile list first. A common pattern is to tag the profiles for one job, filter by that tag, and save the filter.

## Manage schedules

The **Schedule** tab lists every schedule with its **Status** (**Active** or **Paused**), timing, profiles, **Concurrency** and **Next Run**. Each row has:

- **Run Now**: start a run immediately, without waiting for the timer. It's refused while a run of the same schedule is still going.
- **Pause** / **Resume**: stop or restart the timer. Pausing keeps the schedule and its history.
- **Edit**: change any field.
- **Delete**: asks you to **Confirm delete** first.

**Recent Runs** shows a schedule's latest runs with **Started**, **Status**, **Profiles**, **Done**, **Failed** and **Duration**. The same runs appear in the script's **Run History** tab, marked **Schedule**.

## When a run doesn't happen as planned

| Situation | What Veilus does |
|---|---|
| The previous run of this schedule is still going | Skips this time and moves on to the next time |
| The script is waiting for approval | Records the run as **skipped** and keeps the schedule active, so it runs again once you approve the script |
| Your plan no longer includes schedules | Records the run as **skipped** and keeps the schedule |
| The script was deleted, or none of the schedule's profiles exist any more | Turns the schedule off |
| Veilus wasn't running at the scheduled time | Runs the schedule once when the app starts again, and tells you it missed its time |

## Keep schedules running

Schedules only run while the Veilus app is running on your computer, and the computer is awake.

- In **Settings → System → Run in background**, closing the window sends Veilus to the system tray and schedules keep running. Quit it from the tray icon to stop it fully.
- Turn on **Start with the computer** so Veilus starts in the tray when you log in. On macOS, the system asks for permission the first time ("Background Items Added"). Click Allow, or turn Veilus on in System Settings → General → Login Items.
- In **Settings → Notifications**, choose whether to get a system notification when **A schedule missed its time** or **A scheduled run finished — done or failed**.

## Schedules from an AI assistant

Over [MCP](/reference/mcp/), `create_schedule` creates a schedule for an approved script and refuses one that isn't approved. `list_schedules`, `set_schedule_enabled` and `run_schedule_now` cover the rest. An assistant can turn a schedule off but can't delete it.
