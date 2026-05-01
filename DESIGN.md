# Vicinae Design System

A design language rooted in calm, clarity, and warmth. Every decision serves legibility and quiet confidence — nothing competes for attention, but nothing is bare either. The interface should feel like a well-furnished room: considered, warm, and inviting.

---

## Philosophy

**Zen, not sterile.** A zen garden isn't empty — it has rocks, raked sand, moss. Everything is placed with intention. Our pages have visual texture and warmth, but no noise.

**Warm neutrality.** The palette is stone, not steel. Backgrounds have a faint warmth. The accent is sand — earthy and grounding, never electric. The feeling is natural materials, not synthetic.

**Honest tone.** Copy is direct and factual. No superlatives, no breathless marketing, no exclamation marks. Describe what something does. If it's good, the reader will notice.

**Moments of delight.** Subtle hover glows, smooth transitions, a well-placed accent — these are the small things that make the page feel alive without being loud.

---

## Color

### Dark mode (default)

| Token         | Value       | Usage                          |
|---------------|-------------|--------------------------------|
| Background    | `#111110`   | Page background                |
| Background alt| `#161615`   | Alternating section background |
| Surface       | `stone-900` | Cards, header backdrop         |
| Text primary  | `stone-200` | Headings, body text            |
| Text muted    | `stone-400` | Descriptions, secondary info   |
| Text faint    | `stone-600` | Tertiary, decorative text      |
| Border        | `stone-800` | Card borders, dividers         |
| Icon default  | `stone-600` | Decorative icons               |
| Icon warm     | `sand-500`  | Feature icons, emphasis        |

### Light mode

| Token         | Value       | Usage                          |
|---------------|-------------|--------------------------------|
| Background    | `#FAFAF7`   | Page background (warm off-white)|
| Background alt| `#F5F4F0`   | Alternating section background |
| Surface       | `white`     | Cards, header backdrop         |
| Text primary  | `stone-900` | Headings, body text            |
| Text muted    | `stone-500` | Descriptions, secondary info   |
| Text faint    | `stone-400` | Tertiary, decorative text      |
| Border        | `stone-200` | Card borders, dividers         |
| Icon default  | `stone-400` | Decorative icons               |
| Icon warm     | `sand-600`  | Feature icons, emphasis        |

### Accent — Sand

A warm earth tone. Used for feature icons, the brand tagline, subtle hover glows, selection highlights, and small moments of warmth. It adds life without competing.

| Token      | Value     | Hex       |
|------------|-----------|-----------|
| `sand-200` | light     | `#DDD0BC` |
| `sand-300` | —         | `#C9B498` |
| `sand-400` | base      | `#B8A07C` |
| `sand-500` | —         | `#A08964` |
| `sand-600` | dark      | `#8B7654` |
| `sand-700` | darkest   | `#6E5E44` |

**Selection color:** `rgb(184 160 124 / 0.25)` — warm sand at 25% opacity.

### Buttons

Buttons are monochrome. No accent fills.

- **Primary:** `stone-900` text on `stone-50` background (dark mode: `stone-100` bg, `stone-900` text). Inverted from the page.
- **Secondary:** transparent with `stone-300` border (dark: `stone-700`). Text inherits muted color, darkens on hover.

---

## Typography

### Font stack

| Role     | Family              | Variable                      |
|----------|---------------------|-------------------------------|
| Display  | Instrument Serif    | `--font-instrument-serif`     |
| Body     | Geist               | `--font-geist-sans`           |
| Code     | Geist Mono          | `--font-geist-mono`           |

**Instrument Serif** is used for section headings and the brand name — large, elegant, and warm. It creates an editorial contrast with the clean sans-serif body text.

**Geist** handles all body copy, navigation, and UI text. Clean and neutral.

**Geist Mono** for code blocks, install commands, and technical content.

### Scale

| Element              | Class                          | Notes                       |
|----------------------|--------------------------------|-----------------------------|
| Hero title           | `text-6xl sm:text-7xl lg:text-8xl font-serif` | The biggest text on the page|
| Section heading      | `text-2xl sm:text-3xl font-serif`              | Calm, not shouting          |
| Section subtitle     | `text-lg text-muted`                           | One line below heading      |
| Feature title        | `text-base font-medium`                        | Sans-serif, understated     |
| Body text            | `text-sm` or `text-base`                       | `leading-relaxed`           |
| Small / tertiary     | `text-sm` or `text-xs`                         | Muted color                 |
| Code / commands      | `text-sm font-mono`                            | Monospace                   |

### Rules

- Never bold section headings. Instrument Serif at weight 400 has enough presence.
- Body text uses `leading-relaxed` for comfortable reading.
- Feature titles use `font-medium` (500) — the only place weight is used for emphasis.
- All-caps is acceptable for small labels only (tracking-wide, text-xs, muted).

---

## Spacing

Generous. The page should breathe.

| Context              | Value                    |
|----------------------|--------------------------|
| Section vertical     | `py-24 sm:py-32`         |
| Between heading and content | `mt-12` to `mt-16` |
| Between text blocks  | `mt-4` to `mt-6`         |
| Grid gap (features)  | `gap-6` or `gap-8`       |
| Hero top padding     | `pt-32 sm:pt-44`         |

### Content widths

| Element              | Max width    | Reason                      |
|----------------------|--------------|-----------------------------|
| Header nav           | `max-w-5xl`  | Comfortable nav spacing     |
| Hero text block      | `max-w-3xl`  | Readable line length        |
| Hero screenshot      | `max-w-5xl`  | Let the product breathe     |
| Feature grid         | `max-w-5xl`  | 4-column with good margins  |
| Body text blocks     | `max-w-2xl`  | Ideal reading width         |
| Full sections        | `max-w-5xl`  | General content ceiling     |

---

## Motion

Subtle and intentional. The page should feel alive, not frantic.

| Property         | Value              | Notes                                 |
|------------------|--------------------|---------------------------------------|
| Fade-in opacity  | `0 → 1`           | Primary entrance animation            |
| Y offset         | `10px` max         | Subtle upward drift, barely noticeable|
| Duration         | `0.5s – 0.8s`     | Slow enough to feel intentional       |
| Easing           | default (ease-out) | No springs, no bouncing               |
| Stagger delay    | `0.08s – 0.1s`    | Between sibling elements              |
| Scroll trigger   | `whileInView`, `once: true` | Animate once, don't repeat   |

### Hero carousel
The hero cycles through product screenshots to showcase the product's breadth.
- Crossfade transition (opacity + subtle scale + blur)
- 3-second interval between images
- No controls, no indicators — it flows on its own

### Hover states
Interactive elements respond to hover with `transition-colors` (links, buttons) or a subtle warm glow (feature cards). Non-interactive elements stay still.

---

## Icons

All icons are inline SVGs from the Lucide icon set, styled to match the current context.

| Context           | Size     | Stroke width | Color                         |
|-------------------|----------|--------------|-------------------------------|
| Feature icons     | `20×20`  | `1.5`        | `sand-600` / `dark:sand-500`  |
| Module grid icons | `18×18`  | `1.5`        | `stone-400` / `dark:stone-600`|
| Header / nav      | `16–18`  | `2`          | Inherits text color           |
| Inline with text  | `14–16`  | `2`          | Inherits text color           |

Feature icons use the sand accent to add warmth. All other icons stay neutral.

---

## Components

### Buttons

Two variants only. No ghost, no outline-accent.

```
Primary:    bg-stone-900 text-stone-50     → hover: bg-stone-800
            dark: bg-stone-100 text-stone-900 → hover: bg-white

Secondary:  border border-stone-300 text-stone-600 → hover: text-stone-900
            dark: border-stone-700 text-stone-400  → hover: text-stone-200
```

Sizes: `sm` (h-8), `md` (h-10), `lg` (h-12). Rounded with `rounded-lg`.

If the button links somewhere, it renders as `<a>`. Otherwise `<button>`.

### Feature cards

Lightweight containers with a thin border that glows warm on hover.

```
Base:   border border-stone-200 dark:border-stone-800 rounded-xl p-6
        bg-white dark:bg-transparent
Hover:  border-sand-300/50 dark:border-sand-600/30
        shadow-sm shadow-sand-400/5
```

No background fill change on hover. Just the border warms up.

### Section headings

Instrument Serif, `text-2xl sm:text-3xl`. Centered or left-aligned depending on context. Optional subtitle in `text-stone-500 dark:text-stone-400`, one line, directly below.

### Code blocks / install commands

Monospace, `text-sm`. Bordered with `stone-200`/`stone-800`. Background slightly elevated from page. Dollar-sign prompt in faint color, non-selectable. Optional copy button on the right.

### Links

Text links inherit muted color and transition to primary on hover. No underlines by default — underline on hover is acceptable for body links but not nav. `transition-colors` only.

---

## Layout patterns

### Hero
```
[generous top space]
    Title (serif, display size)
    Tagline (sand accent color)
    Description (muted, one line)
    [Primary CTA]  [Secondary CTA]
    [install command block]
    Platform names as dot-separated text
[generous space]
    [screenshot carousel — crossfading, slow, ambient]
```

### Feature grid
```
Section heading (serif, centered) + subtitle
4 columns at lg, 2 at sm. Thin-bordered cards.
Each card: sand-colored icon → title (font-medium) → description (muted).
Subtle warm border glow on hover.
```

### Module grid
```
Serif heading centered.
3-4 column grid of icon + name pairs.
Subtle hover color shift on each item.
```

### Section backgrounds
Alternate between the base background and a slightly warmer/darker shade
to create visual rhythm without borders:
- Odd sections: base bg (`#111110` dark / `#FAFAF7` light)
- Even sections: alt bg (`#161615` dark / `#F5F4F0` light)

---

## Copy guidelines

- Describe what the product does, not how amazing it is.
- One sentence per idea. Short paragraphs.
- No exclamation marks. No "revolutionary", "blazing fast", "supercharge".
- Acceptable: "fast", "native", "open source", "extensible". These are facts.
- CTAs: "Get Started", "Documentation", "View on GitHub". Direct, lowercase-friendly.
- Platform names listed plainly, separated by middots: `X11 · Hyprland · GNOME · KDE · Niri`

---

## Don'ts

- Don't use colored button fills. Buttons are monochrome.
- Don't use gradients on backgrounds or text.
- Don't animate on scroll more than a simple fade.
- Don't use orange. The old brand accent is replaced by sand.
- Don't uppercase headings. Only small labels may use uppercase.
- Don't write multi-line descriptions where one line will do.
- Don't make sections completely empty — add visual texture through cards, grids, or subtle backgrounds.
