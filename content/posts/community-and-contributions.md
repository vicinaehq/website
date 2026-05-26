---
title: "Building a community, not just a project"
date: "2026-03-12"
summary: "Our approach to open source community — how we handle contributions, decisions, and communication."
author: "Aurelien Brabant"
authorUsername: "aurelleb"
image: "/blog-placeholder.png"
---

Open source projects often struggle with the gap between "the code is public" and "the community is healthy." We've been intentional about how we build around Vicinae.

## Decision making

Architecture decisions are discussed in GitHub issues before implementation. We use a lightweight RFC process for changes that affect the extension API or user-facing behavior. Anyone can propose an RFC, and we aim to respond within a week.

For smaller changes, a pull request with a clear description is enough. We don't require RFCs for bug fixes, documentation, or self-contained features that don't change existing interfaces.

## Code review

Every change goes through review, including changes from maintainers. We optimize for two things: correctness and readability. Performance matters, but we'd rather ship correct code and optimize later than ship fast code that's hard to understand.

Review turnaround target is 48 hours. We don't always hit it, but we track it.

## Communication

- **GitHub Issues** — bug reports, feature requests, RFCs
- **Discord** — real-time discussion, support, and general chat
- **This blog** — announcements, deep dives, and project updates

We don't use Twitter/X or other social media for official communication. If it's not on GitHub, Discord, or this blog, it's not official.

## First-time contributors

We maintain a set of issues tagged `good first issue` that are scoped, well-described, and have a mentor assigned. The goal is to make the first contribution experience smooth enough that people come back for a second one.

We also accept non-code contributions: documentation, translations, theme design, and extension development all count.
