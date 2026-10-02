---
title: Multi-Account Management
description: Set up one profile per account, give each its own proxy and login data, and automate across them with Veilus Flow.
sidebar:
  order: 1
---

This recipe sets up a group of accounts so each one lives in its own profile, goes out through its own proxy, and can be automated without the accounts sharing anything.

## 1. One profile per account

Give every account its own profile. A profile has its own fingerprint, cookies, site storage and proxy, and profiles don't share browser data. If two accounts share a profile, they share cookies and look like the same visitor.

To set up many accounts at once, use **Batch create** on the **Profiles** page (up to 50 per batch). See [Create a Profile](/profiles/create/).

**Name and tag them consistently.** Rename each profile after its account, for example `ShopA-US`, and add a tag per platform or job. Tags have colors you pick, and you can filter the profile list by tag. Save that filter: a [schedule](/automation/schedules/) can run **By saved filter**, so profiles you tag later are picked up automatically.

## 2. One proxy per account

If accounts share an IP address, a site can link them. Give each profile its own proxy:

1. Open **Proxy pools** in the sidebar and create a **static pool** with one proxy per line.
2. Set **Assignment Mode** to **1:1 Dedicated**, so each profile gets its own proxy.
3. Pick the pool in **Batch create**, or assign it to existing profiles with **Assign Pool**.

See [Proxy Setup](/profiles/proxy/) for rotating pools and the other options.

**Keep the timezone consistent with the proxy.** A profile whose proxy exits in one country while it reports another country's time contradicts itself. Veilus checks this before every launch and, by default, blocks the launch. Use **Match to proxy** in the profile's **Network** tab to line them up. See [Timezone check](/profiles/proxy/#timezone-check).

Prefer proxies pinned to a state or city. A proxy pinned only to a country can move between cities in different timezones, and the timezone check will then stop the profile from launching.

## 3. Keep each account's login data with its profile

Put account details, such as usernames and passwords, in a **fixed dataset** and assign it to the profiles. Each profile gets its own row, and no two profiles share one. See [Datasets](/profiles/datasets/).

For a single value on one profile, add a profile variable instead: open the profile's panel, go to the **Automation** tab, and add it under **Variables**.

Approved scripts read both as `VEILUS_VAR_<NAME>`, for example `process.env.VEILUS_VAR_USERNAME`.

## 4. Automate across the accounts

1. **Get a script.** Ask an AI assistant connected over [MCP](/reference/mcp/) to write it, as in [Let an LLM run your automation](/recipes/llm-scripts/). It trial-runs the script on up to 3 profiles.
2. **Approve it** in **Veilus Flow**. See [Scripts](/automation/scripts/#review-and-approve-a-script).
3. **Run it** on the account profiles with a low **Concurrency** and a **Delay Between** launches. See [Runs](/automation/runs/).
4. **Schedule it** if it should repeat. See [Schedules](/automation/schedules/).
5. **Check the results** in the script's **Run History** tab. Have the script print what it did with `console.log`, and exit with a non-zero code when something goes wrong, so a failed account shows as failed.

To spread activity out, use a **Stagger Delay** on the schedule, and add waits between actions inside the script.

## Checklist

- [ ] Each account has its own profile
- [ ] Each profile has its own proxy (static pool, **1:1 Dedicated**)
- [ ] Each profile's timezone matches where its proxy exits
- [ ] Login data is in a fixed dataset or profile variables, not written into the script
- [ ] Profiles for one job share a tag, and a saved filter selects them
- [ ] The script is approved, and you read it before approving
