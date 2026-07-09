# Design

## Theme

A warm, premium "legal vault" aesthetic: deep burgundy darkness lit by warm sand and gold. The mood is confidential, calm, and human — an expensive private study rather than a corporate office or a tech app. Light surfaces (warm cream) carry the readable, reassuring content; dark burgundy surfaces (hero, footer, feature moments) carry gravitas and atmosphere. Atmospheric touches — concentric circle line-work, a giant Playfair quotation-mark watermark, a "33/2021" jurisdiction block — signal legal authority without shouting. Restraint everywhere: the luxury comes from typography, space, and a tight palette, not effects.

## Color Palette

Defined as CSS variables in `src/styles.css` (`@theme inline` + `:root` / `.dark`).

**Burgundy (dark surfaces / brand depth)**

- `--color-burg-deep` `#1E0A0E` — primary dark background, ink, hero
- `--color-burg-mid` `#2D1018` — dark cards / raised dark surfaces
- `--color-burg-surf` `#3D1820` — elevated dark surface
- `--color-burg-acc` `#8B2D3A` — burgundy accent (used at low opacity for atmosphere)

**Sand / gold (warmth, text on dark, accents)**

- `--color-sand-warm` / `--color-accent` / `--color-action-accent` `#D4A882` — primary accent & CTA fill; gold
- `--color-sand-light` `#EDD8B8` — primary text on dark; soft highlight
- `--color-sand-pale` / `--color-bg-light` `#FAF3E8` — primary light background (warm cream)
- `--color-sand-muted` / `--color-text-muted-dark` `#C4A882` — muted text on dark
- `--color-rose-dust` `#C4867A` — soft rose accent

**Semantic (light mode `:root`)**

- `--background` `#FAF3E8` · `--foreground` `#1E0A0E`
- `--primary` `#1E0A0E` (on `--primary-foreground` `#FAF3E8`)
- `--secondary` / `--muted` `#EDD8B8` · `--muted-foreground` `#6B4550`
- `--accent` `#D4A882` (on `--accent-foreground` `#1E0A0E`)
- `--destructive` / `--color-warn` `#B83A2A` (on `#FAF3E8`)
- `--border` / `--input` `rgba(30,10,14,0.12)` · `--ring` `#D4A882`

**Dark mode (`.dark`)**

- `--background` `#1E0A0E` · `--foreground` `#EDD8B8` · `--card` `#2D1018` · `--border` `rgba(212,168,130,0.15)`

**Contrast note:** gold/sand text is frequently used at reduced opacity on burgundy (e.g. `rgba(237,216,184,0.6)`). Verify these clear WCAG AA 4.5:1 at their rendered size; bump opacity or weight on small text if not.

## Typography

Loaded from Google Fonts in `src/routes/index.tsx` (preconnect + `css2`). `display=swap`.

- **Display — Playfair Display** (`--font-display`): serif, used for all headings (`h1`–`h4`), blockquotes, and decorative watermarks. Weights 400 & 700; italic 400/700 used expressively (h3 and `<em>` are italic 400). Headings use tight tracking (`letter-spacing: -0.02em`).
- **Body — Plus Jakarta Sans** (`--font-sans`): used for body, UI, labels, eyebrows. Weights 300/400/500/600 (+ italic 300/400). Body is `font-weight: 300–400`, `line-height: 1.75`. Eyebrow/label text is uppercase with wide tracking (`letter-spacing: 3px`, ~13px).
- **Lead paragraph** utilities `.text-lead` / `.text-lead-light`: 18px (→20px ≥768px), weight 300, relaxed line-height — for intros on dark / light respectively.

## Components

shadcn/ui (Radix primitives + Tailwind) under `src/components/ui`; landing sections under `src/components/landing`.

- **Landing sections:** `Navbar`, `Hero`, `AudienceBento`, `HowItWorks`, `ExposureCalculator`, `JurisdictionRibbon`, `KnowledgeBase`, `Testimonials`, `About`, `StickyCTA`, `SiteFooter`.
- **Buttons / CTAs:** fully rounded (`border-radius: 999px`). Primary = gold fill `#D4A882` on burgundy text; secondary = 1px gold-border outline on dark. Hover: `motion-safe:hover:scale-[1.02]`; visible focus outline. Primary CTA routes to WhatsApp booking.
- **Pills / eyebrows:** rounded-full, thin gold border at low opacity, uppercase wide-tracked label (e.g. "CONFIDENTIAL UAE EMPLOYMENT REVIEW", "AED 999 · 48h turnaround").
- **Radius:** `--radius: 0.75rem` for cards/inputs; CTAs and pills use full `999px`.
- **Shadows:** `--shadow-premium` `0 8px 30px rgb(0 0 0 / 0.04)` (subtle, light surfaces); `--shadow-vault` `0 30px 80px rgb(0 0 0 / 0.35)` (deep, dark/feature surfaces).

## Layout

- **Containers:** centered, `max-w-6xl` with `px-6`; section padding ~`py-16` (→`py-24` on `md`). Hero content column capped ~720px for readable measure.
- **Rhythm:** generous vertical spacing; alternating dark (burgundy) and light (cream) section bands create the premium pace.
- **Atmosphere:** absolutely-positioned decorative SVG (concentric circles) and oversized Playfair watermarks, `pointer-events-none` + `aria-hidden`, desktop-only (`hidden lg:flex`).
- **Responsive:** mobile-first; CTAs stack full-width on small screens, inline (`sm:w-auto`) above `sm`; decorative elements hidden below `lg`.

## Motion

- Custom keyframes in `styles.css`: `pulse-dot` (1.8s, attention dot) and `slide-up` (0.4s ease-out, e.g. sticky CTA entrance) exposed as `--animate-*`.
- All motion is gated behind a `motion-safe` custom variant / `prefers-reduced-motion`. Hover transforms use `motion-safe:transition-* / ease-out`. **Keep this discipline** — every new animation must respect reduced motion.
- Easing: prefer `ease-out` and subtle scale (1.02) / translate (0.5) — restrained, never bouncy or flashy.
