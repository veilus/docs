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

The slot follows from the kind of dataset, so a list of accounts is never "used up" by mistake and a list of posts is never pinned to one profile. A profile has at most one dataset per slot. `VEILUS_VAR_ROW_INDEX` holds the row's number (starting at 1), so a script can print it next to its result: the identity row when the profile has one, otherwise the first content row of the run.

## Create a dataset

1. Open **Datasets** in the sidebar and click **New from file**.
2. Choose a `.csv` or `.txt` file. Columns may be separated by `,`, `|` or `;`: the app detects the **Delimiter** from the first line (`|` first, then `;`, then `,`) and you can change it by hand. **First line is column names** is on by default; turn it off and the columns are named `COL_1`, `COL_2`… with the first line read as data. Quoted values may contain the delimiter and line breaks. A file with no delimiter is one value per line, in a column named `VALUE`.
3. Check the preview of the first 20 rows. Lines that cannot be read are listed by line number.
4. Enter a **Dataset name** (the file name is filled in).
5. Under **Kind**, pick **Fixed** or **Consume**. For Consume, set **Rows per run** (1 to 50).
6. Tick the **Secret columns**, such as passwords.
7. Click **Import**.

Column names become upper case, with any character other than `A-Z`, `0-9` and `_` turned into `_` (`First name` becomes `FIRST_NAME`). The preview shows the final names. `ROWS`, `ROW_INDEX`, `PROFILE_ID`, `RUN_ID` and `DEBUG_PORT` are reserved and cannot be column names.

**Assign by profile name:** if a Fixed dataset has a `PROFILE_NAME` column, you can tick **Assign rows to profiles by the PROFILE_NAME column**. Each row then goes to the profile with that name. Names that match no profile, or more than one, are listed after the import.

### On the dataset's page

Click a dataset in the list to see its rows, with the profile each row belongs to and its state: **Available**, **In use**, **Used** or **Unassigned**. From there:

- **Add rows from file** appends rows from another `.csv` or `.txt` file.
- **Export** saves the dataset as `.csv`. Secret columns are included only if you tick **Include secret columns**, and then they are written as plain text.
- **Return used rows** (Consume datasets) makes used rows available again.

Deleting a dataset from the **Datasets** list deletes its rows, and the profiles using it lose that data. This cannot be undone.

## Assign it to profiles

Select profiles in the profile list and click **Assign dataset** in the bulk action bar, then choose the dataset. It goes into the Identity or Content slot according to its kind.

- **Shortage:** a fixed dataset gives each selected profile the next unassigned row. If rows run out, the profiles that got no row are listed by name. Two profiles never share one row.
- **Replace:** if a profile already has a different dataset in that slot, the assignment is refused unless you tick **Replace a dataset already in this slot**.
- **Column clash:** if the dataset has a column with the same name as one in the profile's other slot, the assignment is refused and the clashing column is named.

When you create profiles with **Batch create**, the Organize step has **Identity dataset** and **Content dataset** selects, so new profiles are assigned as they are created.

Open a profile's panel and its **Data** tab to see the **Dataset** section: the profile's **Identity** row (secret values masked) and, for **Content**, rows per run and how many rows are left. Each slot has a **Remove** button. A profile assigned a Fixed dataset but given no row fails early when it runs.

The **Automation** tab lists, under **Variables from datasets**, the variable names a script will receive from each slot. They are read-only and override a manual variable of the same name.

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
