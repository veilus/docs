---
title: Trash
description: Restore deleted profiles and scripts, or delete them forever.
sidebar:
  order: 9
---

Deleting a profile or a Veilus Flow script moves it to the **Trash**. It stays there, with its cookies, sessions and settings, until you restore it or delete it forever. Nothing is removed from the Trash automatically.

Open **Trash** in the sidebar. It has two tabs: **Profiles** and **Scripts**.

## Restore

- Click the restore button on a row, or
- Tick several rows and click **Restore selected**.

A restore can be refused, with the reason shown:

- **Profiles**: your plan's profile limit is reached. Upgrade, or delete other profiles first. Profiles in the Trash don't count toward the limit.
- **Scripts**: your plan does not include Veilus Flow.

## Delete forever

- **Delete forever** on a row, then click again to confirm.
- **Delete all profiles forever** (or **Delete all scripts forever**), then click again to confirm.

This cannot be undone.

## Profiles in static proxy pools

While in the Trash, a profile keeps its proxy (slot) in a static proxy pool, so restoring it brings back the same proxy. Deleting it forever returns that proxy to the pool for other profiles. See [Proxy Setup](/profiles/proxy/).
