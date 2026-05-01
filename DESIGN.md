# Vicinae Design System

A design language rooted in calm, clarity, and warmth. Every decision serves legibility and quiet confidence — nothing competes for attention, but nothing is bare either. The interface should feel like a well-furnished room: considered, warm, and inviting.

Dark mode only.

---

## Philosophy

**Zen, not sterile.** A zen garden isn't empty — it has rocks, raked sand, moss. Everything is placed with intention. Our pages have visual texture and warmth, but no noise.

**Temperature contrast.** Cool ink backgrounds provide depth. Warm sand accents create focal points. Cool sage metadata recedes. This dual-temperature palette avoids the flat monotone of single-temperature dark UIs.

**Honest tone.** Copy is direct and factual. No superlatives, no breathless marketing, no exclamation marks. Describe what something does. If it's good, the reader will notice.

**Moments of delight.** Subtle hover glows, smooth transitions, a well-placed accent — these are the small things that make the page feel alive without being loud.

---

## Color

Three-tier color system: ink (cool backgrounds), sand (warm action accents), sage (cool secondary for metadata).

### Ink — Backgrounds

Cool-toned dark backgrounds that provide depth without being pure black.

| Token      | Hex       | Usage                          |
|------------|-----------|--------------------------------|
| `ink-900`  | `#0f1014` | Page background                |
| `ink-800`  | `#15161b` | Cards, surfaces                |
| `ink-700`  | `#1c1d23` | Hover states, elevated surfaces|

### Sand — Warm accents

Earthy amber tone for actions, links, and focal points. The primary accent color.

| Token      | Hex       | Usage                          |
|------------|-----------|--------------------------------|
| `sand-200` | `#e8d5b8` | Hover text, light accent       |
| `sand-300` | `#d4b88e` | —                              |
| `sand-400` | `#c9a76e` | Links, tagline, hover states   |
| `sand-500` | `#b8944e` | Primary buttons, active pills  |
| `sand-600` | `#9a7b3f` | Button gradient end            |
| `sand-700` | `#7a6132` | Borders (at low alpha)         |

### Sage — Cool secondary

Teal-green for metadata, code, and supporting information. Recedes visually.

| Token      | Hex       | Usage                          |
|------------|-----------|--------------------------------|
| `sage-300` | `#8aaa9c` | Inline code text, download counts |
| `sage-400` | `#6a8a7c` | Category pills, metadata       |
| `sage-500` | `#567a6c` | Muted metadata                 |
| `sage-600` | `#44635a` | —                              |
| `sage-700` | `#354d46` | Code/pill backgrounds (at low alpha) |

### Text

Uses Tailwind `stone` scale on ink backgrounds.

| Token         | Usage                          |
|---------------|--------------------------------|
| `stone-100`   | Headings, hero title           |
| `stone-200`   | Body text, primary content     |
| `stone-300`   | Secondary text, metadata values|
| `stone-400`   | Descriptions                   |
| `stone-500`   | Muted text, author names       |
| `stone-600`   | Tertiary, icons, placeholders  |

### Borders

Borders use `sand-700` at low alpha to stay warm but subtle:
- Default: `border-sand-700/8` or `border-sand-700/10`
- Hover: `border-sand-600/18`
- Header scrolled: `border-sand-700/10`
- Always use alpha transparency, never solid border colors.

### Selection

`rgb(201 167 110 / 0.3)` — warm sand at 30% opacity.

---

## Typography

### Font stack

Single font family for all text. No serif/sans contrast.

| Role     | Family     | Variable           |
|----------|------------|--------------------|
| Body     | Outfit     | `--font-outfit`    |
| Display  | Outfit     | `--font-outfit`    |
| Code     | Geist Mono | `--font-geist-mono`|

**Outfit** handles everything — headings, body, nav, UI. It's a geometric sans with slightly rounded terminals that stays elegant at both display and body sizes.

**Geist Mono** for code blocks, install commands, and technical content.

### Scale

| Element              | Class                                    |
|----------------------|------------------------------------------|
| Hero title           | `text-5xl sm:text-6xl lg:text-7xl tracking-tight` |
| Section heading      | `text-2xl sm:text-3xl`                   |
| Section subtitle     | `text-lg text-muted`                     |
| Feature title        | `text-base font-medium`                  |
| Body text            | `text-sm` or `text-base leading-relaxed` |
| Small / tertiary     | `text-sm` or `text-xs`                   |
| Code / commands      | `text-sm font-mono`                      |

### Rules

- Body text uses `leading-relaxed` for comfortable reading.
- Feature titles use `font-medium` (500) — the only place weight is used for emphasis.
- All-caps is acceptable for small labels only (tracking-wider, text-xs, muted).

---

## Spacing

Generous. The page should breathe.

| Context                      | Value              |
|------------------------------|---------------------|
| Section vertical             | `py-24 sm:py-32`    |
| Between heading and content  | `mt-12` to `mt-16`  |
| Between text blocks          | `mt-4` to `mt-6`    |
| Grid gap (features)          | `gap-6` or `gap-8`  |
| Hero top padding             | `pt-32 sm:pt-44`    |

### Content widths

| Element              | Max width    |
|----------------------|--------------|
| Header nav           | `max-w-5xl`  |
| Hero text block      | `max-w-3xl`  |
| Hero screenshot      | `max-w-3xl`  |
| Feature grid         | `max-w-5xl`  |
| Body text blocks     | `max-w-2xl`  |
| Full sections        | `max-w-5xl`  |

---

## Motion

Subtle and intentional. The page should feel alive, not frantic.

### Landing page

Uses Framer Motion for entrance animations.

| Property         | Value              | Notes                                 |
|------------------|--------------------|---------------------------------------|
| Fade-in opacity  | `0 -> 1`           | Primary entrance animation            |
| Y offset         | `10px` max         | Subtle upward drift                   |
| Duration         | `0.5s - 0.8s`      | Slow enough to feel intentional       |
| Easing           | default (ease-out)  | No springs, no bouncing               |
| Stagger delay    | `0.08s - 0.1s`     | Between sibling elements              |
| Scroll trigger   | `whileInView`, `once: true` | Animate once, don't repeat   |

### Extension pages

CSS-only animations. No Framer Motion.

| Animation          | Keyframes            | Usage                    |
|--------------------|----------------------|--------------------------|
| `animate-fade-in`  | opacity + translateY | Card/section entrances   |
| `animate-fade-in-subtle` | opacity only   | Dropdown menus           |

Staggered card entrance via `animationDelay` (capped at 300ms).

### Hero carousel

Crossfade transition (opacity + subtle scale + blur). 3-second interval. No controls, no indicators.

### Hover states

Interactive elements respond to hover with `transition-colors` (links) or a subtle warm glow and border shift (cards). Non-interactive elements stay still.

---

## Components

### Buttons

Two variants.

**Primary (`.btn-warm`):** Warm gradient from `sand-500` to `sand-600` with `ink-900` text. Hover adds glow (`box-shadow: 0 0 28px -4px rgb(184 148 78 / 0.35)`) and shifts gradient lighter.

**Secondary:** `bg-ink-800/50` with `border-sand-700/10`. Text `stone-400`, hover to `stone-200` with `border-sand-600/18`.

Sizes: `sm` (h-8), `md` (h-10), `lg` (h-12). Rounded with `rounded-lg`.

If the button links somewhere, it renders as `<a>`. Otherwise `<button>`.

### Cards

Lightweight containers with warm-tinted borders.

```
Base:   bg-ink-800/40 border border-sand-700/8 rounded-xl p-5
Hover:  bg-ink-800/70 border-sand-600/18 -translate-y-0.5
        shadow-[0_16px_48px_-12px_rgba(154,123,63,0.08)]
```

### Section headings

`text-2xl sm:text-3xl text-stone-200`. Centered or left-aligned depending on context. Optional subtitle in `stone-400`, one line, directly below.

### Code blocks / install commands

Monospace, `text-sm`. Background `ink-800/60` with `border-sand-700/10`. Click-to-copy on install commands with checkmark feedback.

### Category pills

`text-sage-400/60 bg-sage-700/10 rounded-md px-1.5 py-0.5 text-[10px]`. Active state: `bg-sand-500 text-ink-900` with warm glow shadow.

### Links

Text links use `stone-500` and transition to `stone-200` or `sand-400` on hover. No underlines. `transition-colors` only.

---

## Layout patterns

### Hero

```
[generous top space]
    Title (display size, tracking-tight)
    Tagline (sand-400)
    [Platform switcher: Linux | macOS | Windows]
    [Install command or "not available yet" with register interest link]
[generous space]
    [screenshot carousel — crossfading, slow, ambient]
```

### Header

Fixed top, transparent by default. On scroll: `bg-ink-900/80 backdrop-blur-xl` with `border-sand-700/10` border fade-in (border transitions from `border-transparent` to avoid white flash).

Nav: Logo + name on left, links center-left, Discord icon + GitHub stars on right.

### Feature grid

Section heading centered + subtitle. 4 columns at lg, 2 at sm. Ink/sand cards. Sand-colored icons. Subtle warm border glow on hover.

### Extension store

Search + sort dropdown (z-indexed above card grid). Category filter pills. 3-column card grid with staggered entrance animation. Ambient glow orbs (warm amber + cool sage).

### Extension detail

Two-column: sticky sidebar (280px) + README main area. Sidebar has icon, title, author, description, install button, metadata table, categories, commands. README in rounded container with sand gradient accent bar at top.

### Backgrounds

All sections use `ink-900` base. Cards and surfaces use `ink-800` at varying alpha. Ambient radial gradient orbs (sand and sage at low opacity with heavy blur) add depth to key sections.

---

## Copy guidelines

- Describe what the product does, not how amazing it is.
- One sentence per idea. Short paragraphs.
- No exclamation marks. No "revolutionary", "blazing fast", "supercharge".
- Acceptable: "fast", "native", "open source", "extensible". These are facts.
- Platform names listed plainly, separated by middots: `X11 . Hyprland . GNOME . KDE . Niri`

---

## Visual texture

### Grain overlay

Full-page SVG noise texture at `opacity: 0.025`, `pointer-events: none`, applied via `::before` pseudo-element on `body`. Adds subtle organic feel.

### Scrollbar

Thin (5px), warm-tinted thumb (`sand` at low alpha), transparent track.

### Ambient glows

Radial gradient orbs placed behind content for depth:
- Warm: `rgba(154,123,63,0.07)` with 180px blur
- Cool: `rgba(86,122,108,0.06)` with 150px blur

---

## Don'ts

- Don't use light mode. Dark only.
- Don't use serif fonts. Outfit everywhere.
- Don't use solid borders. Always use alpha transparency.
- Don't animate on scroll more than a simple fade.
- Don't use orange. The accent is sand — earthy and grounding.
- Don't uppercase headings. Only small labels may use uppercase.
- Don't write multi-line descriptions where one line will do.
- Don't make sections completely empty — add visual texture through cards, grids, or subtle backgrounds.
- Don't use white-alpha values for borders/backgrounds — use `sand-700` or `sage-700` at low alpha to keep warmth.
