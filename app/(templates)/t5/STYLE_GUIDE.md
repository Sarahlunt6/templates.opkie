# T5 "Marigold" — Style Guide

Main-street retro warmth. This document is the single source of truth for how anything new on this site should look. When building out a page, follow this guide plus the page's wireframe (`/about`, `/services`, …).

## 1 · Identity

- **Thesis:** the neighborhood dental office as a beloved main-street storefront — honest posted prices, gentle hands, appointments that start on time.
- **Mood words:** sunny · plainspoken · retro · handmade · trustworthy.
- **Signature:** the striped awning with a scalloped hem, hanging under the nav.
- **Target patient:** families who want a dentist that feels like part of the neighborhood, not a clinic.
- **Voice:** warm and direct, like a shopkeeper who knows your name. Lowercase-friendly kickers, one brush-script flourish per section maximum.

## 2 · Color palette

All palette variables live in `app/t5-theme.css` (in the template repo: `app/(templates)/t5/t5-theme.css`), scoped under `.t5-marigold`.

| Variable | Hex | Role | Rules |
|---|---|---|---|
| `--t5-cream` | `#fff6e8` | Page canvas ("morning light") | The default ground everywhere |
| `--t5-butter` | `#ffe9c4` | Tinted blocks, menu board | Section alternation |
| `--t5-marigold` | `#f0a32f` | The awning, buttons, sunshine | Never use for small text on cream |
| `--t5-marigold-deep` | `#b26e0e` | AA-safe marigold ink on cream | Use THIS for marigold-colored text |
| `--t5-teal` | `#23655f` | Deep retro teal — secondary voice | Buttons, links, kickers |
| `--t5-teal-bright` | `#37847c` | Chips, hovers | Hover states |
| `--t5-teal-deep` | `#174a45` | Footer ground | Footer only |
| `--t5-walnut` | `#46312a` | Text ground | Warm brown — **never pure black** |
| `--t5-blush` | `#f8d7c4` | The comfort room | One warm section per page max |
| `--t5-paper` | `#fffdf7` | Cards, polaroid mats | Card surfaces |

Derived inks: `--t5-walnut-soft` (78%), `--t5-walnut-faint` (55%), `--t5-line` (16% rule lines), `--t5-shadow-print` (hard 6px offset shadow), `--t5-shadow-soft`.

Shared-variable overrides (also set in `t5-theme.css` under `.t5-marigold`): `--primary-brand: #23655f`, `--secondary-accent: #f0a32f`, `--bg-canvas: #fff6e8`, `--text-main: #46312a`.

## 3 · Typography

Fonts load once in `app/layout.tsx` via `next/font` CSS variables — swap families there, keep the variable names.

| Role | Family | CSS variable | Weights | Usage |
|---|---|---|---|---|
| Display | Young Serif | `--font-t5-display` | 400 | Headlines, the shop sign |
| Body | DM Sans | `--font-t5-body` | 400 / 500 / 700 | All body copy, UI |
| Script accent | Yellowtail | `--font-t5-script` | 400 | **One flourish per section max** |

Helper classes (defined in `t5-theme.css`):

- `.t5-display` — display face; sizes: `.t5-display-hero` (clamp 2.7–5.4rem), `.t5-display-lg`, `.t5-display-md`
- `.t5-script` — brush script, small doses only
- `.t5-kicker` — bold caps label, 0.72rem, 0.2em tracking (the shop sign's small print)

Casing: headlines in sentence case; kickers UPPERCASE; never letterspace the display face.

## 4 · Signature elements

| Class | What it is | Use when |
|---|---|---|
| `.t5-awning` / `.t5-awning--teal` | Striped canvas strip with scalloped hem (recolor via `--awning-a/b`) | Under the nav, on visit cards, footer hems — the brand ribbon |
| `.t5-sticker` / `--marigold` / `--teal` | Die-cut sticker badge with hard offset shadow | Prices, "new patients welcome" moments |
| `.t5-ticket` | Perforated ticket edge | Offers, first-visit steps |
| `.t5-polaroid` | Instant-photo mat with tape | Reviews, before/after |
| `.t5-tape` | Masking-tape strip | Pinning photos/cards |
| `.t5-board` + `.t5-dots` | Menu board with dotted price leaders | Services/pricing lists |
| `.t5-arch`, `.t5-wave`, `.t5-star`, `.t5-parade` | Retro shapes & marquee | Sparingly, one per section |

Don't stack two signature elements on the same card (a polaroid doesn't also get a sticker AND a ticket edge).

## 5 · Buttons & links

- `.t5-btn` — the sticker button: marigold fill, walnut border, hard offset shadow that flattens on press.
- `.t5-btn--teal` — teal variant (secondary actions).
- `.t5-btn--paper` — paper variant on dark/teal grounds (footer).
- Text links: walnut with teal hover, or `.t5-kicker` teal labels; underlines use dotted/dashed decoration, never default solid blue.

## 6 · Layout & spacing

- Container: `max-w-7xl mx-auto px-5 lg:px-10`.
- Section rhythm: generous `py-16`–`py-24`; alternate cream → butter → cream; blush appears once (comfort), teal-deep grounds the footer.
- Dividers: awnings and dotted rules (`--t5-line`), not plain gray `<hr>`.
- Cards sit on `--t5-paper` with `--t5-shadow-print` (hard offset) — this template does NOT use soft blurry shadows for cards.

## 7 · Motion

- Easing: `MARIGOLD_EASE = [0.34, 1.3, 0.5, 1]` exported from `T5Reveal.tsx` — springy overshoot, like a sign swinging.
- Reveal: `T5Reveal` wrapper for scroll-in; durations 0.45–0.7s.
- Every animated component checks `useReducedMotion()` — keep that in new work.
- Hovers: small rotations (±2°) and shadow-flattening on stickers; nothing slides far.

## 8 · Imagery

- Warm, sunlit, candid; real people over stock-looking smiles.
- Duotone/warm-tint photos to sit on cream; polaroid mats for gallery/reviews.
- Team photos: relaxed, storefront/neighborhood context beats clinical rooms.

## 9 · Voice & microcopy

- Kickers read like shop signage: "The menu", "Come say hi", "Fair & square".
- Prices are posted proudly (menu-board style) — never hide pricing.
- Contractions welcome; sentences short; no clinical jargon without a plain-language gloss.

## 10 · Do / Don't

**Do**
- Keep walnut (never black) as the text color everywhere.
- Use `--t5-marigold-deep` for marigold text on cream (AA contrast).
- Give every section exactly one focal flourish (script word, sticker, or awning).
- Post prices in the diner-menu style with dotted leaders.
- Keep focus-visible outlines (3px teal) on all interactive elements.

**Don't**
- Don't use pure black or pure white anywhere.
- Don't letterspace Young Serif or set it in all caps.
- Don't use more than one script moment per section.
- Don't introduce soft/blurry card shadows — hard print offsets only.
- Don't use mono/typewriter faces (those belong to T1/T2).

## 11 · Client rebrand checklist

When adapting this template to a client's brand, edit these in order:

1. **`t5-theme.css` palette block** (manual, the big one): replace the hex values of `--t5-cream, --t5-butter, --t5-marigold, --t5-marigold-deep, --t5-teal, --t5-teal-bright, --t5-teal-deep, --t5-walnut, --t5-blush, --t5-paper` and re-derive the rgba inks (`--t5-walnut-soft/faint`, `--t5-line`, both shadows) from the new text color. Also update the scoped `--primary-brand / --secondary-accent / --bg-canvas / --text-main` overrides at the bottom of the block, and `::selection`.
   - Keep the contrast contract: the "-deep" variants must stay AA-safe (≥4.5:1) for small text on the canvas color.
2. **`app/globals.css` + `tailwind.config.js`** — the scaffold's `updateBrandColors` already swaps `--primary-brand` and the tailwind brand teal from `client-intake.json`'s `brand.accent_color`. Verify they match the new theme.
3. **`app/layout.tsx` fonts** — swap `Young_Serif` / `DM_Sans` / `Yellowtail` imports for the client's faces but KEEP the variable names (`--font-t5-display`, `--font-t5-body`, `--font-t5-script`) so every component keeps working.
4. **`data/master.ts` `theme` block** — update `primaryBrandHex` etc. to match (used by shared tokens and schema).
5. **Logo & favicon** — drop files in `public/images/`, wire the path from `client-intake.json`'s `brand.logo_path`.
6. Rebuild and eyeball every section against §10's contrast rules.

After editing, update the palette/typography tables in THIS file so the guide stays true — future pages are built from it.

## 12 · Building out pages

Interior pages currently render wireframes (structure only) from `components/wireframe/pages/`. Home is the fully designed reference. To build out a page:

1. Open the wireframe route (e.g. `app/about/page.tsx` in a client repo; `app/(templates)/t5/about/page.tsx` in the hub) and the corresponding wire body — its labeled sections are the agreed page structure.
2. Replace the wire body with real sections composed in this guide's language: T5 components as reference (`T5Menu` for menu-board lists, `T5Polaroid`-style cards, `T5Reveal` for motion), palette and classes from §§2–7.
3. Keep the real data flowing from `@/data/master` — no hardcoded practice facts.
4. Remove `robots: { index: false, follow: false }` from that page's metadata once it's designed and approved.
5. Keep the nav/footer untouched — they're shared with the homepage.

**Suggested prompt for Claude:** "Build out the About page (`app/about/page.tsx`): replace the wireframe body with fully designed sections per `STYLE_GUIDE.md`, keeping the section structure from the wireframe (`components/wireframe/pages/AboutWire.tsx`), pulling all practice facts from `data/master.ts`, and matching the homepage's component patterns. Then remove the noindex metadata from the page."
