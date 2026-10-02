---
title: Datasets
description: Import data once and let each profile take its share when a script runs.
sidebar:
  order: 5
---

## Overview

A dataset is a table stored in Veilus: accounts, posts, keywords, links. You import it once, assign it to profiles, and every run of an **approved** script on those profiles receives that profile's share as environment variables. Schedules and batch runs need no new setting.

Each profile has two dataset slots:

| Slot | Dataset kind | What a run gets |
|------|--------------|-----------------|
| **Identity** | **Fixed**: one row per profile, kept for good | Each column as `VEILUS_VAR_<COLUMN>` |
| **Content** | **Consume**: each run takes new rows | `VEILUS_VAR_ROWS`, a JSON array of rows (plus each column, when the dataset takes 1 row per run) |

The slot follows from the kind of dataset, so a list of accounts is never "used up" by mistake and a list of posts is never pinned to one profile. A profile has at most one dataset per slot. `VEILUS_VAR_ROW_INDEX` holds the row's number (starting at 1), so a script can print it next to its result.

## Create a dataset

1. Open **Data** in the sidebar, go to **Datasets**, and click **New from file**.
2. Choose a `.csv` file (the first line holds the column names) or a `.txt` file (one value per line, in a column named `VALUE`).
3. Check the preview. Lines that cannot be read are listed by line number.
4. Pick **Fixed** or **Consume**. For Consume, set how many rows each run takes (1 to 50).
5. Mark the **secret** columns, such as passwords.

Column names become `UPPER_SNAKE_CASE` (`First name` becomes `FIRST_NAME`). `ROWS` and `ROW_INDEX` are reserved and cannot be column names.

To export a dataset to `.csv`, secret columns are included only if you tick **include secret columns**.

## Assign it to profiles

Select profiles in the profile list and click **Assign dataset** in the bulk action bar, then choose the dataset. It goes into the Identity or Content slot according to its kind.

- **Shortage:** a fixed dataset gives each selected profile the next unassigned row. If rows run out, the profiles that got no row are listed by name. Two profiles never share one row.
- **Replace:** if a profile already has a different dataset in that slot, the assignment is refused unless you tick **Replace**.
- **Column clash:** if the dataset has a column with the same name as one in the profile's other slot, the assignment is refused and the clashing column is named.

When you create profiles in bulk, the form has an identity dataset select and a content dataset select, so new profiles are assigned as they are created.

Open a profile's panel and its **Data** tab to see the **Datasets** section: the profile's row (secret values masked) and how many content rows are left. Each slot has a button to remove the dataset.

## How consume rows are used

Before a run starts, the profile reserves up to *rows per run* unused rows, lowest row number first. If fewer remain, it gets what is left; the script can read the length of `ROWS`.

- A run that **succeeds** marks its rows as used.
- A run that **fails** returns all of its rows to the dataset, so nothing is lost.
- Profiles running at the same time never get the same row.
- When no unused row is left, the profile fails before the browser starts, with an error saying the dataset is out of unused rows. Add rows, or use **Return used rows** on the dataset's page to make used rows available again.

## Read the data in a script

Values arrive as environment variables. Fixed (identity) columns and, when a content dataset takes 1 row per run, its columns too:

```ts
const user = process.env.VEILUS_VAR_USERNAME;
const password = process.env.VEILUS_VAR_PASSWORD;
```

With more than one row per run, parse `ROWS`:

```ts
const rows: Array<Record<string, string>> = JSON.parse(
  process.env.VEILUS_VAR_ROWS ?? '[]',
);
for (const row of rows) {
  console.log(row.KEYWORD);
}
console.log('row', process.env.VEILUS_VAR_ROW_INDEX);
```

If the same name is set in several places, run variables win over dataset rows, and dataset rows win over a profile's stored variables.

## Approved scripts only

Dataset values reach **approved** scripts only. A trial run of an unapproved script gets none of them and reserves no rows; pass the values it needs as run variables instead.

## Security

- Secret columns are masked in the app and are never returned over the local API or MCP. They reach approved scripts, because the script needs them.
- Dataset values are **not encrypted at rest**. They are stored on your computer in plain text, the same way profile variables are.
- An approved script can still print a value it received. Review a script before you approve it.

## Use datasets through Claude (MCP)

An agent connected over [MCP](/reference/mcp/) can manage datasets with `create_dataset`, `append_dataset_rows`, `list_datasets`, `get_dataset_rows`, `assign_dataset`, `unassign_dataset` and `reset_dataset_rows`. `create_profiles` also accepts an identity and a content dataset. Listing and reading rows never return secret column values. For example, give Claude a spreadsheet of accounts and ask it to create a fixed dataset and assign it to your profiles.
