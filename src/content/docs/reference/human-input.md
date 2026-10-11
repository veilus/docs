---
title: veilus-human-input (Rust crate)
description: The open-source Rust crate behind Veilus's human-like clicks, typing and scrolling — functions, parameters, and what has been measured.
---

[`veilus-human-input`](https://crates.io/crates/veilus-human-input) is an open-source Rust crate (MIT or Apache-2.0) that generates human-like mouse paths, wheel scrolls and typing rhythm for browser automation. The source is on [GitHub](https://github.com/veilus/human-input). You don't need it to use Veilus; this page is for developers who want the same models in their own automation.

Every function is pure: it takes parameters and a random number generator and returns points, wheel deltas and durations. Sending them to a browser — CDP, WebDriver or operating-system events — is up to you. A seeded RNG gives the same result every time.

## Install

```bash
cargo add veilus-human-input rand@0.8
```

The [README](https://github.com/veilus/human-input#readme) has a complete example that drives a click, a scroll and a typed word.

## Functions

| Module | Function | Returns |
|---|---|---|
| `mouse` | `bounds(quad)` | Bounding box of a CDP `DOM.getContentQuads` quad, or `None` if it is malformed or under 1 px wide |
| `mouse` | `pick_point(box, params, rng)` | A random point in the middle part of the box — never the exact center, never the edge |
| `mouse` | `first_start(target, params, rng)` | A starting point for the first move, when the pointer position is unknown |
| `mouse` | `path(from, to, width, params, rng)` | The points of one move, each with the delay before it; may wander through a few waypoints first |
| `mouse` | `direct_path(…)` | The same without waypoints: one curve, or an overshoot and a short correction for long moves |
| `mouse` | `hover_pause` · `press_hold` · `press_wiggle` | Pause on the target before pressing; how long the button stays down; 1 px drifts while it is held (usually none) |
| `wheel` | `wheel_events(style, amount, params, rng)` | Wheel deltas and the pause after each; the deltas add up to exactly `amount` |
| `wheel` | `scroll_distance(style, amount, params, rng)` | Distance actually scrolled: exact for `Notched`, slightly varied for `MacAccelerated` |
| `keyboard` | `timings(text, params, rng)` | Hold time and following pause for every character (characters, not bytes) |
| `keyboard` | `us_key(ch)` | `KeyboardEvent.code`, Windows `keyCode` and Shift state on a US layout; `None` for characters that need an input method |

## Parameters

Every number is a field of one of three structs, passed by reference. Each has a `Default`.

- **`MouseParams`** — `tick` (interval between pointer events, default 8 ms, a 125 Hz USB mouse), Fitts' law coefficients for movement time, how far the curve bends, when and how far a long move overshoots, the chance of wandering through waypoints, how far from the edge the click point stays, hover and press durations, and the chance of a drift while the button is held.
- **`WheelParams`** — for `Notched`: the step size (default 100 px), its jitter and the pause between steps. For `MacAccelerated`: the first deltas of a flick, the size and spread of the plateau, the gap between events, and how much the scrolled distance varies.
- **`TypingParams`** — median and spread of the log-normal pause between keys, its minimum and maximum, how much longer the pause is after a space or punctuation, the chance and length of a hesitation, how long a key is held, and an optional `total_budget` that caps the time for long text.

Field names and units are listed in the [API documentation on docs.rs](https://docs.rs/veilus-human-input).

## What has been measured

The crate's defaults were compared with one person on one page — 20 clicks, three typed sentences, one long scroll — using a cross-validated classifier (0.5 accuracy means it cannot tell the two apart):

| Parameters | Mouse | Keyboard |
|---|---:|---:|
| `Default`, unchanged | 1.00 | 0.63 ± 0.08 |
| `Default`, `tick` set to the recorded mouse's report interval | 0.38 ± 0.14 | 0.59 ± 0.05 |

With the defaults, one feature — the median gap between pointer events — separated the two every time: the recorded mouse reported every 11 ms, the default is 8 ms. **Set `tick` to the device you are modelling first.**

Limits: one session of one person, on macOS, with a wheel mouse; 20 mouse segments and 142 key pairs. That is "close to this person", not "close to people". The crate does not promise that automation goes unnoticed; it removes the most obvious machine signatures from input timing and geometry.

## How Veilus uses it

The models in this crate come from the code behind Veilus's MCP `click`, `type` and `scroll` tools and the matching [REST API](/reference/rest-api/) endpoints; the app is moving onto the crate in an upcoming release. Veilus passes its own parameter set, which is not published: the crate's `Default` is a different set chosen from public knowledge, and the measurements above are of that default set. Publishing the exact values Veilus uses would let anyone train a detector on unlimited samples of them.

Scripts you write with Playwright control the mouse and keyboard themselves; this crate does not change them.
