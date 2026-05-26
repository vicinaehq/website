---
title: "Theming without complexity"
date: "2026-04-05"
summary: "How Vicinae's theming system works — CSS-inspired tokens, live preview, and community themes."
author: "Aurelien Brabant"
authorUsername: "aurelleb"
image: "/blog-placeholder.png"
---

Launchers sit at the intersection of utility and personal expression. Some people want a minimal dark bar. Others want rounded corners, custom colors, and background blur. We needed a theming system that serves both without becoming a configuration maze.

## Token-based approach

Themes in Vicinae are defined as a set of tokens — named values for colors, spacing, border radii, and typography. The format is intentionally close to CSS custom properties:

```toml
[colors]
background = "#0f1014"
surface = "#15161b"
accent = "#c9a76e"
text-primary = "#e7e5e4"
text-secondary = "#a8a29e"

[spacing]
item-gap = 4
padding = 12

[border]
radius = 8
width = 1
```

The launcher reads these values at startup and maps them to the rendering pipeline. No CSS engine, no web view — just direct pixel control.

## Live preview

The settings panel includes a live preview that updates as you change values. No restart required. Internally, the theme is hot-swapped by updating the token map and triggering a re-render.

## Community themes

Themes are distributed as `.toml` files through the extension registry. Installing a theme is the same flow as installing an extension: browse, click install, apply.

We ship three built-in themes: **Ink** (the default dark), **Parchment** (a warm light theme), and **Slate** (a cooler dark variant). Everything else comes from the community.
