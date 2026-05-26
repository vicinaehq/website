---
title: "A deep dive into the extension system"
date: "2026-05-10"
summary: "How Vicinae extensions work under the hood — sandboxing, lifecycle, and the registry."
author: "Aurelien Brabant"
authorUsername: "aurelleb"
image: "/blog-placeholder.png"
---

Extensions are central to how Vicinae works. Rather than shipping every feature in the core binary, we built a system that lets anyone add functionality without touching the main codebase.

## Architecture

Each extension runs in its own sandboxed process. Communication with the launcher happens through a typed IPC protocol — extensions declare what they need (search results, UI panels, system access) and the launcher grants only those capabilities.

```
┌─────────────┐     IPC      ┌──────────────┐
│   Vicinae   │◄────────────►│  Extension   │
│   (core)    │   protocol   │  (sandboxed) │
└─────────────┘              └──────────────┘
```

This means a broken extension can't crash the launcher. It also means extensions can be written in any language that speaks the protocol, though we provide first-class support for Rust and TypeScript.

## Lifecycle

1. **Discovery** — Vicinae scans the extension directory at startup
2. **Activation** — Extensions are loaded lazily, only when triggered
3. **Execution** — The extension runs in its sandbox, sends results back via IPC
4. **Deactivation** — Idle extensions are unloaded after a configurable timeout

## The registry

Extensions are published to the Vicinae registry, which is just a Git repository. Each extension has a manifest that describes its metadata, permissions, and entry point. The registry is indexed and served through our API for fast lookups.

## Writing your first extension

Check the [extension docs](https://docs.vicinae.com) for a step-by-step guide. The short version: create a manifest, implement the handler trait, and publish with `vicinae ext publish`.
