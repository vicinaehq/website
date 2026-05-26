---
title: "Why we chose Rust"
date: "2026-04-12"
summary: "The practical reasons behind choosing Rust for a desktop launcher, and the trade-offs we accepted."
author: "Aurelien Brabant"
authorUsername: "aurelleb"
image: "/blog-placeholder.png"
---

Rust wasn't an obvious choice for a launcher. The ecosystem for Linux desktop development is smaller than C/C++ or Python. But the trade-offs worked in our favor.

## What we gained

**Memory safety without GC pauses.** A launcher runs in the background permanently. Garbage collector pauses — even short ones — are noticeable when the user expects instant response. Rust's ownership model gives us deterministic memory management.

**Fearless concurrency.** Extensions run in separate processes, but the core launcher coordinates between multiple search sources concurrently. Rust's type system catches data races at compile time.

**Small binary size.** The core launcher is under 4MB stripped. No runtime to bundle, no VM to start.

**Excellent FFI.** We interface with X11 (via `x11rb`), Wayland (via `wayland-client`), and D-Bus (via `zbus`) directly. Rust's C FFI makes this straightforward.

## What we gave up

**Slower iteration speed.** Compile times are real. A full rebuild takes about 30 seconds. We mitigate this with `cargo check` and incremental compilation, but it's still slower than a scripting language.

**Smaller talent pool.** Finding contributors who know Rust and Linux desktop development is harder than finding Python developers. We accept this trade-off because the codebase quality matters more than contributor count at this stage.

**UI toolkit maturity.** Rust GUI toolkits are still evolving. We ended up building our rendering layer on top of raw Wayland/X11 primitives rather than using an existing toolkit. More work upfront, but no framework churn.

## Would we choose it again?

Yes. The reliability gains alone justify it. We've had zero memory-related crashes in production, and the performance characteristics are exactly what a launcher needs.
