---
title: "Packaging for every distro"
date: "2026-03-20"
summary: "How we ship Vicinae to Arch, Fedora, Ubuntu, NixOS, and more — without losing our minds."
author: "Aurelien Brabant"
authorUsername: "aurelleb"
image: "/blog-placeholder.png"
---

Linux packaging is a famously fragmented problem. Every distribution has its own package format, dependency naming, and release cadence. We needed a strategy that scales without requiring a dedicated packager for each distro.

## The install script

The quickest way to install Vicinae is the shell script:

```bash
curl -fsSL https://vicinae.com/install | sh
```

This downloads a statically-linked binary and places it in `~/.local/bin`. No root required, no package manager involved. It's the escape hatch for any distribution we don't explicitly support.

## Native packages

For distributions where users expect native packages, we build and publish:

- **Arch Linux** — AUR package (`vicinae-bin`), updated on each release
- **Fedora / RHEL** — COPR repository with RPM packages
- **Ubuntu / Debian** — PPA with `.deb` packages
- **NixOS** — Flake in the repository, also submitted to nixpkgs

Each package is built in CI from the same source. The packaging metadata lives in the repository under `packaging/`, one directory per format.

## Static linking

The core binary is statically linked against musl libc. This eliminates the most common class of "works on my machine" problems — glibc version mismatches. The trade-off is a slightly larger binary (about 500KB more), which we consider acceptable.

Dynamic linking is used only for system libraries that must match the running system: `libwayland-client`, `libX11`, and graphics drivers. These are loaded at runtime via `dlopen`.

## Update mechanism

Vicinae checks for updates on launch (if telemetry is enabled) by comparing the local version against the latest release tag. If an update is available, a notification appears in the launcher — no auto-update, no background downloads. The user chooses when to update.
