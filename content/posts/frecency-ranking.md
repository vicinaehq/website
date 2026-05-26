---
title: "How frecency ranking works"
date: "2026-03-28"
summary: "The algorithm behind Vicinae's result ordering — a blend of frequency and recency that adapts to your habits."
author: "Aurelien Brabant"
authorUsername: "aurelleb"
image: "/blog-placeholder.png"
---

Search results are only useful if the right one is at the top. Alphabetical ordering fails. Pure frequency fails (you launched Firefox 10,000 times, but haven't used it in months). Pure recency fails (you launched a random app once yesterday, and now it's the top result).

Frecency combines both signals.

## The formula

Each application maintains a score that decays over time:

```
score = Σ (weight(age) × count_in_bucket)
```

We divide time into buckets:

| Age | Weight |
|-----|--------|
| Last 4 hours | 100 |
| Last 24 hours | 70 |
| Last 3 days | 50 |
| Last 7 days | 30 |
| Last 30 days | 10 |
| Older | 1 |

When you launch an application, its count in the most recent bucket increments. Over time, those counts naturally migrate to older buckets with lower weights.

## In practice

If you open VS Code every morning, it accumulates a high score that stays high because the recent buckets keep refilling. If you stop using it, the score decays within a week.

If you launch a new app for the first time, it gets a single count in the most recent bucket (weight 100). This is enough to push it near the top for a few hours, but if you don't launch it again, it drops quickly.

## Storage

Frecency data is stored in a SQLite database alongside other launcher state. The entire table is typically under 10KB — one row per known application, with six integer columns for the bucket counts.

## Comparison with alternatives

Mozilla Firefox popularized frecency for URL bar suggestions. Our implementation is simpler — Firefox uses a more complex formula with visit types and transition bonuses. For a launcher, the simpler version performs just as well because the action space is smaller (you either launch something or you don't).
