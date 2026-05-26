---
title: "Keeping the performance budget tight"
date: "2026-04-20"
summary: "How we ensure Vicinae stays under 50ms to first result, every time."
author: "Aurelien Brabant"
authorUsername: "aurelleb"
image: "/blog-placeholder.png"
---

A launcher that takes half a second to show results is a launcher you stop using. We set a hard target: 50ms from keypress to first result, on modest hardware.

## How we measure

Every search query is instrumented. We track three phases:

1. **Input processing** — from keypress event to query dispatch (~2ms)
2. **Search execution** — running the query against all active sources (~15-30ms)
3. **Render** — building the result list and painting pixels (~5-10ms)

The total stays under 50ms on a 4-core machine from 2020. If a commit pushes us over, CI flags it.

## The tricks

**Frecency scoring** — we pre-sort results by a combination of frequency and recency. The most likely result is computed first, so even if the full search takes longer, the top result appears instantly.

**Lazy extension queries** — extensions that aren't relevant to the current query prefix are skipped entirely. Typing `=` routes directly to the calculator; typing `/` goes to file search. No wasted work.

**Pre-warming** — the application index is loaded into memory at startup and kept hot. The cost is about 2MB of resident memory for a typical desktop with 500 installed applications.

## What we don't do

We don't use background threads for simple searches. The overhead of thread synchronization often exceeds the cost of just doing the work on the main thread. For expensive operations (file search, web queries), we do use async workers, but only when the expected latency exceeds 10ms.

## Monitoring

The [open data dashboard](/open-data) shows real-world latency percentiles across all users who opt in to telemetry. p50 is currently 18ms. p99 is 42ms.
