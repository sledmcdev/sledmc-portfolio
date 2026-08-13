# SLEDMC — Editorial Noir Style Guide

A reference for reproducing this site's visual system on a new project. Follow these rules and a new site will share the same high-contrast, editorial-noir aesthetic.

---

## 1. Color Palette (Noir Dark Mode)

All colors are HSL channels used with `hsl(var(--token))`.

| Token                    | Value        | Use                                |
| ------------------------ | ------------ | ---------------------------------- |
| `--background`           | `0 0% 4%`    | Near-black canvas                  |
| `--foreground`           | `0 0% 96%`   | Primary text                       |
| `--card`                 | `0 0% 9%`    | Cards / panels                     |
| `--popover`              | `0 0% 7%`    | Dropdowns                          |
| `--primary` / `--accent` | `31 95% 44%` | Signature amber — CTAs, highlights |
| `--secondary`            | `0 0% 15%`   | Subtle surfaces                    |
| `--muted`                | `0 0% 12%`   | Muted backgrounds                  |
| `--muted-foreground`     | `0 0% 64%`   | Secondary text                     |
| `--border`               | `0 0% 15%`   | Hairline dividers                  |

**Rule:** Monochrome grayscale for structure; a single amber accent for emphasis. Never introduce a second hue.

### CSS (index.css)

```css
:root {
  --background: 0 0% 4%;
  --foreground: 0 0% 96%;
  --card: 0 0% 9%;
  --card-foreground: 0 0% 96%;
  --popover: 0 0% 7%;
  --popover-foreground: 0 0% 96%;
  --primary: 31 95% 44%;
  --primary-foreground: 0 0% 4%;
  --secondary: 0 0% 15%;
  --secondary-foreground: 0 0% 96%;
  --muted: 0 0% 12%;
  --muted-foreground: 0 0% 64%;
  --accent: 31 95% 44%;
  --accent-foreground: 0 0% 4%;
  --destructive: 0 72% 51%;
  --destructive-foreground: 0 0% 98%;
  --border: 0 0% 15%;
  --input: 0 0% 15%;
  --ring: 31 95% 44%;
  --radius: 0.125rem;
}
```

---

## 2. Typography

- **Headings / UI:** `Inter Tight` — bold, tight tracking (`tracking-tighter`), large fluid sizes via `clamp()`, e.g. `clamp(2.6rem, 6.5vw, 6rem)` with `line-height: 0.92`.
- **Serif accents:** `Cormorant Garamond` — for pull-quotes / founder statements only.
- **Mono labels:** `ui-monospace` — uppercase, `tracking-[0.3em]`, `text-[10px]`–`text-[11px]`, amber or `white/40`. Used as eyebrow labels above every section.

### Font tokens

```css
--font-heading: "Inter Tight", ui-sans-serif, system-ui, sans-serif;
--font-body: "Inter Tight", ui-sans-serif, system-ui, sans-serif;
--font-display: "Inter Tight", ui-sans-serif, system-ui, sans-serif;
--font-serif: "Cormorant Garamond", Georgia, serif;
--font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
```

Load fonts at the top of `index.css` before `@tailwind base;`:

```css
@import url("https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700;800;900&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap");
```

---

## 3. Spatial System

- **Radius:** Near-zero — `--radius: 0.125rem`. Cards, buttons, inputs are essentially sharp-cornered. This is core to the editorial feel.
- **Max width:** `1500px`–`1600px` content container, `px-6` gutters.
- **Section rhythm:** `py-20`–`py-28` vertical padding; sections separated by `border-t border-white/10` hairlines.

---

## 4. Signature Visual Devices

### Grid Nexus background

Faint white grid lines over the canvas:

```css
.grid-nexus {
  background-image:
    linear-gradient(to right, hsl(0 0% 100% / 0.04) 1px, transparent 1px),
    linear-gradient(to bottom, hsl(0 0% 100% / 0.04) 1px, transparent 1px);
  background-size: 80px 80px;
}
```

### Eyebrow label pattern

Every section opens with a mono-caps amber label flanked by a 10px hairline:

```jsx
<span className="flex items-center gap-3 text-[10px] font-semibold tracking-[0.3em] text-[hsl(31_95%_44%)]">
  <span className="h-px w-10 bg-[hsl(31_95%_44%)]" />
  RECRUITMENT · REIMAGINED
</span>
```

### Marquee

Infinite-scroll row of awards/logos (duplicated array):

```css
.marquee-track {
  animation: marquee 40s linear infinite;
}
@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}
```

### Oversized watermark text

Translucent brand wordmark behind final CTAs:

```jsx
<span className="text-[20vw] font-black opacity-[0.04] text-white">SLEDMC</span>
```

---

## 5. Component Patterns

### Buttons — sharp, bordered, no radius

- **Primary:** `bg-amber px-7 py-4 text-sm font-semibold tracking-wide text-black`
- **Ghost:** `border border-white/25 px-7 py-4 ... hover:border-amber`
- Arrow icon (`ArrowUpRight`) that nudges right on hover (`hover:gap-3`).

```jsx
<Link className="group inline-flex items-center gap-2 bg-[hsl(31_95%_44%)] px-7 py-4 text-sm font-semibold tracking-wide text-[hsl(0_0%_4%)] transition-all hover:gap-3">
  I'm Looking for Talent
  <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} />
</Link>
```

### Cards

`bg-card border border-white/10`; hover lifts border to amber and shifts content slightly:

```jsx
<div className="border border-white/10 transition-all hover:border-[hsl(31_95%_44%)] hover:translate-x-0.5">
  {/* ... */}
</div>
```

### Stats

Large numeric display + mono caption underneath:

```jsx
<div>
  <span className="text-5xl font-bold text-white">98%</span>
  <span className="mt-2 block text-[10px] tracking-[0.3em] text-white/40">
    PLACEMENT RETENTION
  </span>
</div>
```

---

## 6. Motion (Framer Motion)

- **Entry:** `initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }}` with ease `[0.16, 1, 0.3, 1]` (custom "expo-out") and staggered delays (`0.2 → 0.4 → 0.55`).
- **Hover:** Subtle translate + gap widening on icon links.
- **Scroll-reveal:** `whileInView` with `viewport={{ once: true }}`.
- **Ambient:** Slow infinite loops (arrow bobbing `y:[0,8,0]`, glow pulse).

```jsx
<motion.h1
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
>
  Connecting visionary organizations with elite talent.
</motion.h1>
```

---

## 7. Imagery Direction

- **Subject:** Cinematic noir photography — moody architectural / corporate interiors, strong shadows.
- **Overlay:** Heavy dark gradients over images:
  ```jsx
  <div className="absolute inset-0 bg-gradient-to-r from-[hsl(0_0%_4%)] via-[hsl(0_0%_4%)/85] to-[hsl(0_0%_4%)/40]" />
  ```
- **Cropping:** Images cropped to fill (`fittingType="fill"`), often with a grid overlay on top.
- **Source:** Unsplash stock URLs (valid, high-resolution).

---

## 8. Overall Tone

Editorial, high-contrast, restrained:

- Lots of negative space.
- Hairline rules instead of boxes.
- One accent color only.
- Mono micro-type as structural punctuation.
- Motion that's slow and confident rather than playful.
