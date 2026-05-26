---
title: "Introducing Vicinae"
date: "2026-05-13"
summary: "A focused launcher for your Linux desktop. Native, fast, extensible, and open source."
author: "Aurelien Brabant"
authorUsername: "aurelleb"
image: "/blog-placeholder.png"
---

Vicinae is a launcher built for people who care about their desktop workflow. It runs natively on Linux, supports X11, Hyprland, GNOME, KDE, and Niri, and is designed to stay out of your way until you need it.

## Why another launcher?

Most launchers fall into two camps: feature-packed but slow, or fast but limited. Vicinae aims for a third option — fast by default, extensible when you need it.

The core is written in Rust with a minimal footprint. Extensions are sandboxed and loaded on demand, so unused features don't cost you anything at runtime.

## What you get today

- **Application search** with frecency-based ranking
- **File search** powered by your existing index (locate, fd, or similar)
- **Calculator** with unit conversions
- **Clipboard history** across sessions
- **Extension system** with a growing registry

## What's next

We're focused on stability and the extension API. The goal is to make it trivial for anyone to add their own workflows — whether that's a password manager integration, a Kubernetes dashboard, or a quick note capture.

If you're interested, grab the installer from the homepage or join us on [Discord](https://discord.com/invite/rP4ecD42p7).
