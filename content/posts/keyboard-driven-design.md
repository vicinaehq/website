---
title: "Keyboard-driven by design"
date: "2026-03-05"
summary: "Why every interaction in Vicinae is reachable from the keyboard, and how we handle key binding conflicts."
author: "Aurelien Brabant"
authorUsername: "aurelleb"
image: "/blog-placeholder.png"
---

A launcher is one of the few applications where the mouse is actively slower than the keyboard. You invoke it with a hotkey, type a query, and press Enter. Adding mouse interactions is fine, but they should never be required.

## The interaction model

Every action in Vicinae is reachable through the keyboard:

| Key | Action |
|-----|--------|
| `Super` or custom hotkey | Open/close launcher |
| `↑` `↓` | Navigate results |
| `Enter` | Execute selected result |
| `Tab` | Expand result actions |
| `Esc` | Dismiss |
| `Ctrl+1..9` | Jump to nth result |
| `Ctrl+K` | Open command palette |

Extensions can register additional key bindings, but they're namespaced to avoid conflicts with the core bindings.

## Conflict resolution

Key binding conflicts are inevitable on Linux. The compositor, desktop environment, and individual applications all compete for the same keys. We handle this pragmatically:

1. **The default hotkey is configurable.** We suggest `Super` but don't enforce it.
2. **We document known conflicts** with popular compositors and desktop environments.
3. **The command palette** (`Ctrl+K`) provides an alternative entry point if the primary hotkey is claimed by something else.

## Focus management

On Wayland, focus management is cooperative — the compositor decides who gets keyboard input. We use the `zwlr_layer_shell_v1` protocol to request exclusive keyboard focus when the launcher is visible, and release it immediately when dismissed.

On X11, we use `XGrabKeyboard` for the same effect. The grab is released on dismiss to avoid stealing focus from other applications.

## Accessibility

Keyboard-first design is inherently more accessible than mouse-first design, but we go further: result items are announced via AT-SPI (the Linux accessibility framework), and the launcher supports high-contrast themes for users with low vision.
