---
title: "Wayland-first, X11-compatible"
date: "2026-05-06"
summary: "How we built Vicinae to work natively on Wayland compositors while keeping X11 support."
author: "Aurelien Brabant"
authorUsername: "aurelleb"
image: "/blog-placeholder.png"
---

Linux desktops are in the middle of a long transition from X11 to Wayland. Most launchers were built for X11 and bolt on Wayland support as an afterthought. We went the other direction.

## The Wayland approach

Vicinae uses the layer-shell protocol on Wayland compositors. This gives us proper overlay behavior — the launcher appears above all windows, captures keyboard focus, and dismisses cleanly. No hacks, no workarounds.

We test against four compositors:

- **Hyprland** — our primary development target
- **GNOME (Mutter)** — the most widely deployed Wayland compositor
- **KDE (KWin)** — full layer-shell support since Plasma 6
- **Niri** — a tiling compositor with excellent protocol support

## X11 compatibility

For users still on X11 (or running XWayland apps), Vicinae falls back to the EWMH window type hints. The launcher window is set as a dock/dialog, positioned at the top of the screen, and grabs keyboard focus via `XGrabKeyboard`.

The experience is nearly identical. The main difference is that some X11 window managers may not respect the overlay stacking — in those cases, the launcher might appear behind fullscreen windows. We document the known cases and workarounds.

## What this means for you

If you're on Wayland, everything just works. If you're on X11, everything just works too — we just use different system calls under the hood.
