---
title: Create a Profile
description: Create browser profiles one at a time or in batches, open them, and manage them from the profile panel.
sidebar:
  order: 1
---

## What a profile is

A **profile** is a separate browser with its own:

- Fingerprint, generated for the operating system you choose
- Cookies, site storage and bookmarks
- Proxy (a manual proxy or a proxy pool)
- Tags, notes, variables and extensions

Profiles do not share browser data with each other.

## Create one profile

1. On the **Profiles** page, click **Create**.
2. **Language** step:
   - Under **Operating System**, pick Windows, macOS or Linux. Every fingerprint field is generated to match this OS, and it cannot be changed later.
   - Under **Language & Region**, click a market to fill in both fields, or set **Language** and **Timezone** yourself. Changing the timezone suggests a matching language.
3. Click **Next**.
4. **Organize** step: pick or add tags (optional).
5. Click **Create Profile**.

The profile gets a name like `Profile 3`. Rename it in the profile panel.

:::tip[Pick this computer's OS]
If you choose an OS other than the one your computer runs, the dialog warns you. A profile for a different OS has to imitate more (fonts, CPU architecture), so it is less likely to pass detection. Pick your own OS unless you need another one.
:::

The OS here is the system the profile presents to websites. The Veilus app runs on macOS and Windows.

## Create many profiles at once

Click **Batch create**. Each profile gets its own randomized fingerprint.

1. **Basics** step: pick the **Operating System**, a market or **Language** and **Timezone**, and the **Number of Profiles** (1 to 50).
2. **Organize** step, applied to every profile in the batch:
   - Tags
   - **Proxy pool**: assigns the new profiles to a pool (see [Proxy Setup](/profiles/proxy/))
   - **Identity dataset** and **Content dataset** (see [Datasets](/profiles/datasets/))
3. Click **Create N Profiles**.

## Open a profile

Click the play button on the profile's row, or **Launch** in the profile panel. A dialog asks what to run:

- **Browser Only**: open the browser without a script
- **Run Script (Optional)**: pick a Veilus Flow script to run in it

Before opening, Veilus checks two things:

- **Does the fingerprint contradict itself?** If it does, you see the conflicting fields and can choose **Edit profile** or **Open anyway**.
- **Does the timezone match where the proxy exits?** See [Timezone check](/profiles/proxy/#timezone-check).

To stop a running profile, click the stop button on its row or **Stop** in the panel.

## The profile panel

Click a profile's row (or the **⋯** button) to open its panel. At the top are **Launch**/**Stop**, **Duplicate** and **Export**. The tabs are:

| Tab | What's in it |
|-----|--------------|
| **Overview** | Name, tags, proxy summary, test score, notes, dates, and a **Config check** of the fingerprint |
| **Fingerprint** | Language, timezone, WebRTC, noise and hardware. See [Fingerprinting](/profiles/fingerprinting/) |
| **Network** | Proxy pool and manual proxy. See [Proxy Setup](/profiles/proxy/) |
| **Data** | Cookies, snapshots and datasets. See [Cookies, Snapshots & Warming](/profiles/cookies/) |
| **Automation** | Profile variables and the variables a profile gets from its datasets |
| **Extension** | Extensions this profile loads. See [Extensions](/profiles/extensions/) |
| **Test** | The latest test report. See [Test a profile](/profiles/fingerprinting/#test-a-profile) |

Click **Save Changes** to keep your edits. If you close the panel with unsaved changes, Veilus asks before discarding them.

### Duplicate

**Duplicate** makes a copy named `<name> (copy)`. The copy gets a **new** fingerprint with the same OS, language and timezone. Proxy, pool, tags, variables and extensions are copied. Cookies and other browsing data are not.

If the original uses a manual proxy, both profiles go out through the same IP.

### Delete

**Delete** (at the bottom of the panel, or in the bulk action bar) moves profiles to the [Trash](/profiles/trash/). You can restore them from there.

## Work on several profiles

Tick profiles in the list to show the bulk action bar: **Launch**, **Assign Pool**, **Assign dataset**, **Test**, **Warm Cookies** and **Delete**.

## Profile limits

The Free plan opens 5 profiles. The **Plan** page in the app shows the limit of your plan.

If you have more profiles than your plan allows (for example after a plan ends), nothing is deleted. The oldest profiles up to the limit still open; the rest show a lock and cannot be launched until you upgrade or delete other profiles. Profiles in the Trash do not count.

## Next steps

- [Fingerprinting →](/profiles/fingerprinting/)
- [Proxy Setup →](/profiles/proxy/)
- [Tags & Filters →](/profiles/organize/)
