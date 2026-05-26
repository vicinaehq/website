---
title: "Our commitment to open data"
date: "2026-04-28"
summary: "Why we publish our telemetry data publicly and what you can learn from it."
author: "Aurelien Brabant"
authorUsername: "aurelleb"
image: "/blog-placeholder.png"
---

We collect anonymous telemetry to understand how Vicinae is used — launch counts, search latency, extension popularity. Unlike most projects, we publish all of it.

## Why open data?

Trust is earned. When a desktop application says "we collect anonymous telemetry," the natural response is skepticism. What are they collecting? Who sees it? Is it really anonymous?

We answer those questions by making the data public. Visit the [open data dashboard](/open-data) to see exactly what we collect and the aggregated results.

## What we collect

- **Launch events** — how often the launcher is opened, not what you search for
- **Extension installs** — which extensions are popular, to help prioritize maintenance
- **Performance metrics** — startup time, search latency, memory usage
- **Platform info** — compositor type, display server, Linux distribution

We do not collect search queries, clipboard contents, file paths, or any personally identifiable information.

## The schema

Our telemetry schema is defined in the repository and versioned alongside the code. Every field has a documented purpose. If a field doesn't have a clear reason to exist, it gets removed.

## Opting out

Telemetry is opt-in during the installer flow. You can also disable it at any time in the settings. No nagging, no "are you sure?" dialogs.
