---
title: Account Health
description: Check that each profile is still signed in to its own account and read a few numbers from it, with a ready-to-run Veilus Flow script.
sidebar:
  order: 8
---

This recipe checks that each profile is still signed in to its own account and reads a few numbers from it (followers, notifications, orders). Run it on a schedule to find a signed-out account before you need it.

It only reads your own account: it never signs in for you, never sees a password, and never posts, likes, follows or sends messages. You sign in once yourself, in the profile's window; the profile keeps that session.

**Script and prompt:** [solutions/account-health on GitHub](https://github.com/veilus/sdk/tree/main/solutions/account-health).

## Set it up

Try it first with no account (the built-in `demo` entry):

1. Paste `script.ts` into **Veilus Flow → Scripts** and approve it. See [Scripts](/automation/scripts/).
2. On a profile, add the profile variable `PLATFORM` = `demo`.
3. Run it. The profile is signed out, so the run prints `"status":"logged_out"`.
4. Open this link in that profile to "sign in" (it sets a cookie that lasts 30 days, like a real sign-in, so it survives the profile restarting), then run again: `"status":"logged_in"` with a `session` metric.

   ```text
   https://httpbin.org/response-headers?Set-Cookie=veilus_demo_session%3D1%3B+Max-Age%3D2592000%3B+Path%3D%2F
   ```

   This link signs out again:

   ```text
   https://httpbin.org/cookies/delete?veilus_demo_session
   ```

For your own accounts:

1. Sign in to your account in the profile's window, once.
2. Set the profile variable `PLATFORM` to a key of `PLATFORMS` in `script.ts`. Set `URL` if the page differs (your store's admin, your own profile page).
3. Approve the script and put it on a [schedule](/automation/schedules/) across all your profiles.

Only the `demo` entry ships today. You add another platform by measuring its selectors by hand and adding an entry to `PLATFORMS` (see the README in the repo), or by letting Claude do it with `prompt.md`.

## What a run prints

```text
RESULT {"platform":"demo","status":"logged_out","metrics":{}}
```

Signed in:

```text
RESULT {"platform":"demo","status":"logged_in","metrics":{"session":{"value":1,"raw":"{\n  \"cookies\": {\n    \"veilus_demo_sessio"}}}
```

`value` is the first number in the element's text; `raw` keeps up to 40 characters of the text as it was (so `1.2K` is still readable).

- Exit code 0: the page was read, signed in or not, and any alert was delivered.
- Exit code 1: the page did not load, `PLATFORM` is wrong, or a signed-in page did not show a metric. It also means the webhook did not accept the alert (the `RESULT` line is still printed).

A run that exits 1 with `metric … not found` means the site changed its page: update that entry in `PLATFORMS`.

## Change it

- Profile variable `PLATFORM` (required): which entry of `PLATFORMS` to check.
- Profile variable `URL` (optional): the page to read, when it differs from the entry's default.
- Profile variable `WEBHOOK_URL` (optional): a webhook URL that accepts JSON. It receives a message when the status is `logged_out`. The body carries `text` (read by Slack) and `content` (read by Discord).
- Another site: add an entry to `PLATFORMS` with the page, a selector that only exists when signed in, and a selector per number.
- Other numbers: add a key to that platform's `metrics`.

## Legal considerations

:::caution
Read each platform's Terms of Service. This script reads your own account only; how you use Veilus is your responsibility.
:::
