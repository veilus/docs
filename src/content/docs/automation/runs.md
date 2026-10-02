---
title: Runs
description: Run a Veilus Flow script on one or more profiles, control how many run at once, and read the results.
sidebar:
  order: 3
---

A run executes one script on a set of profiles. For each profile, Veilus opens the browser, runs the script against it, records the result, and closes the browser again.

## Start a run

1. In **Veilus Flow → Scripts**, click **Run** on the script's card. You can also open the script and click **Test Run**.
2. Under **Select Profiles**, tick the profiles. Use **Search profiles...**, **Select All** or **Clear**.
3. Under **Execution Options**, set:
   - **Concurrency**: how many profiles run at the same time (1, 2, 3, 4, 5, 8 or 10).
   - **Delay Between**: the pause between two profile launches (**No delay**, 0.5s, 1s, 2s, 3s or 5s).
4. Click **Run on N profiles**.

The dialog shows a suggested maximum for **Concurrency** based on this computer's current load, and warns you if you pick more.

If the script uses variables that a selected profile doesn't have, the run button stays disabled with **Fill all required variables first**. Add the missing [profile variables](/automation/scripts/#what-a-script-receives) and open the dialog again.

Only approved scripts run. Running a script on several profiles at the same time is a Pro feature, also included in the trial. If your plan doesn't include it, set **Concurrency** to 1 and the profiles run one after another.

## What happens during a run

For each selected profile, in order:

1. **Pause between launches.** Veilus waits **Delay Between** before starting the next profile. If CPU use is above 75% or memory use above 80%, it waits 5 seconds instead. If either is above 90%, it holds new launches until the load drops, for up to 60 seconds.
2. **Wait for a turn.** No more than **Concurrency** profiles of this run are active at once.
3. **Take dataset rows.** If the profile has a content [dataset](/profiles/datasets/), its rows are reserved before the browser starts. If none are left, the profile fails here.
4. **Open the browser** with the profile's fingerprint and proxy. The run shares the app-wide limit of 16 open browsers with everything else, and waits for a free slot when they are all in use. The [timezone check](/profiles/proxy/#timezone-check) runs here, so a proxy that now exits in a different timezone can stop the profile from launching.
5. **Run the script** until it exits.
6. **Close the browser** and record the exit code and output.

A profile fails without running the script if it is already open, if it was deleted, or if its browser can't start. The other profiles carry on.

## Read the results

Open the script and go to the **Run History** tab, or click **History** on the script's card. Each run shows:

- where it came from: **App**, **Schedule** or **Agent**;
- its status: **running**, **completed** (no profile failed), **failed** (every profile failed), **partial** (some failed), or **skipped**;
- counts, as `done · failed · total`.

Click a run to see each profile's exit code, **Output (stdout)** and **Errors (stderr)**. Click **Refresh** to load new runs.

Run history starts from the version of Veilus that added it. Older runs aren't linked to a script.

## Runs started by an AI assistant or the API

Over [MCP](/reference/mcp/) or the [REST API](/reference/rest-api/):

- `run_script` is the trial run: up to 3 profiles, works before the script is approved, stops the script after 10 minutes.
- `run_batch` is the real run: the script must be approved. **Concurrency** defaults to 3 and goes from 1 to 16. The delay between launches defaults to 1500 ms and goes up to 10 minutes.
- `get_capacity` reports how many browsers are open, how many are waiting for a slot, and the maximum.
- `list_runs` and `get_run_result` read the same results the **Run History** tab shows.
