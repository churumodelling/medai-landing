---
name: medical-ai-landing
description: Generate modern single-page landing websites for AI/tech companies in healthcare and medicine. Use when the user asks to create a landing page, one-page site, portfolio, or company website related to AI, medical technology, healthtech, or clinic automation. Also use for any single-file HTML website with dark theme and neon/gradient styling.
---

# Medical AI Landing Page Builder

Build a single-file (`index.html`) landing page for an AI/medical tech company. No external dependencies — all CSS and JS are inline.

## Quick Start

1. Copy the template from [assets/template.html](assets/template.html) into the target directory as `index.html`
2. Customize the content (company name, descriptions, contacts) per user requirements
3. Adjust the color scheme via CSS custom properties in `:root`

## Template Structure

The template contains these sections in order:

| Section | HTML element | Purpose |
|---------|-------------|---------|
| Hero | `<header class="hero">` | Company name, tagline, CTA buttons |
| About / Products | `<section id="about">` | Product cards in a 2-column grid |
| Contacts | `<section id="contacts">` | Email + Telegram links |
| Footer | `<footer>` | Copyright |

## Customizing Colors

All colors are defined as CSS custom properties in `:root`. Swap the palette by changing these variables:

```css
:root {
  --bg-1: #000000;       /* page background */
  --bg-2: #05050a;       /* gradient end */
  --text: #e0ffe0;       /* primary text */
  --muted: #88cc88;      /* secondary text */
  --accent: #39ff14;     /* primary accent (neon green) */
  --accent-2: #ff00ff;   /* secondary accent (magenta) */
  --accent-3: #00ffff;   /* tertiary accent (cyan) */
  --card: rgba(5,10,5,0.85);
  --border: rgba(57,255,20,0.2);
  --shadow: 0 10px 40px rgba(57,255,20,0.15);
}
```

Also update `rgba()` values in `body background`, hover states, `body::before`/`::after`, and `@keyframes glowBorder` to match the new palette.

### Preset Palettes

**Corporate blue (TOKEN2049 style):**
```
--accent: #2563eb; --accent-2: #60a5fa; --accent-3: #93c5fd;
--text: #ffffff; --muted: #9ca3af;
```

**Purple (default medical):**
```
--accent: #7c3aed; --accent-2: #a78bfa; --accent-3: #c4b5fd;
--text: #f3f2ff; --muted: #c7c5df;
```

**Acid neon (current template):**
```
--accent: #39ff14; --accent-2: #ff00ff; --accent-3: #00ffff;
--text: #e0ffe0; --muted: #88cc88;
```

## Customizing Content

### Hero Section

Replace inside `<header class="hero">`:
- `.brand` — company name
- `h1` — main tagline (keep under ~15 words)
- `.lead` — 1–2 sentence value proposition
- `.hero-actions` — CTA buttons with `href` to section anchors

### Product Cards

Each `.product` card inside `.products` grid:
```html
<div class="product">
  <div class="product-name">Product Name — Short Label</div>
  <p>
    Description text.
    <span class="highlight">Key metric or result.</span>
  </p>
</div>
```

Add or remove cards as needed. The grid auto-adjusts (1 column mobile, 2 columns on 768px+).

### Contacts

Replace `href` values in `.contact-row` links:
- `mailto:` for email
- `https://t.me/` for Telegram
- Add more rows for other channels (WhatsApp, LinkedIn, phone)

## Built-in Features

- **Scroll animations**: `IntersectionObserver`-based reveal. Add class `reveal` to any element for fade-up on scroll.
- **Staggered cards**: `.product` and `.contact-row` elements animate in sequence via `transition-delay`.
- **Gradient text**: `h1` uses animated `background-clip: text` with shifting gradient.
- **Floating glow**: `body::before`/`::after` create pulsing background lights.
- **Reduced motion**: `prefers-reduced-motion` media query disables all animations.
- **Mobile-first**: Base styles for small screens, `@media (min-width: 768px)` and `1024px` breakpoints.

## Adding New Sections

Insert a new `<section>` between existing ones:

```html
<section id="new-section">
  <div class="container">
    <div class="section-card reveal">
      <h2>Section Title</h2>
      <p class="muted">Content here.</p>
    </div>
  </div>
</section>
```

Add matching nav link if navigation is present. Register the element with the `IntersectionObserver` in the `<script>` block if using `reveal`.

## Local Preview

```bash
python3 -m http.server 8080 --directory .
# Open http://localhost:8080/index.html
```
