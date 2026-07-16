# T4 "Atelier" — Style Guide

After-dark cosmetic couture. This document is the single source of truth for how anything new on this site should look. When building out a page, follow this guide plus the page's wireframe (`/about`, `/services`, …).

## 1 · Identity

- **Thesis:** cosmetic and general dentistry practiced like couture — measured, fitted, and finished by hand, presented in warm espresso darkness with brass fittings.
- **Mood words:** nocturnal · tailored · luxurious · warm · precise.
- **Signature:** the vitrine — before/after cases presented as lit display cases with engraved plaques.
- **Target patient:** adults investing in a transformation who expect a boutique experience.
- **Voice:** measured and assured; short declarative lines; numerals and letterspaced labels like engraved plates.

## 2 · Color palette

All palette variables live in `app/t4-theme.css` (in the template repo: `app/(templates)/t4/t4-theme.css`), scoped under `.t4-atelier`.

| Variable | Hex | Role | Rules |
|---|---|---|---|
| `--t4-noir` | `#17100a` | Footer, deepest room | Darkest ground |
| `--t4-espresso` | `#1e1410` | Main dark canvas | Warm brown-black — **never tech-black** |
| `--t4-umber` | `#291c15` | Elevated dark surfaces | Cards on dark |
| `--t4-mahogany` | `#362519` | Card hover, borders on dark | Hover states |
| `--t4-champagne` | `#c9a56a` | Brass accent on dark | Labels, rules, diamonds |
| `--t4-champagne-bright` | `#e6cb96` | Brass hover / highlights | Hover only |
| `--t4-brass-ink` | `#8a6a33` | AA-safe brass on porcelain | Brass-colored TEXT on light |
| `--t4-porcelain` | `#f2eadd` | Light "salon" rooms | The light sections |
| `--t4-porcelain-deep` | `#e9dfcd` | Alternate light surface, mats | Cards on light |
| `--t4-ivory` | `#f6f0e6` | Display text on dark | Headlines on espresso |
| `--t4-oxblood` | `#6e3a30` | ONE deep warm moment | Emergency callout only |

Derived inks: `--t4-ivory-soft` (74%), `--t4-ivory-faint` (48%), `--t4-espresso-soft/faint`, `--t4-line-dark` (brass hairline on dark), `--t4-line-light` (espresso hairline on porcelain), `--t4-shadow-deep`, `--t4-shadow-salon`.

Shared-variable overrides set under `.t4-atelier`: `--primary-brand`, `--secondary-accent`, `--bg-canvas`, `--text-main: #f6f0e6`.

## 3 · Typography

Fonts load from this template's `fonts.ts` module (`app/fonts.ts` in a client repo) via `next/font` CSS variables, applied on the template wrapper — swap families there, keep the variable names. Only Inter (`--font-sans`) still loads globally in `app/layout.tsx`.

| Role | Family | CSS variable | Weights | Usage |
|---|---|---|---|---|
| Display | Bodoni Moda | `--font-t4-display` | 400 / 500 / 600 (+italic) | Headlines, the lockup — high-contrast Didone |
| Body | Hanken Grotesk | `--font-t4-body` | 300 / 400 / 500 | Reading text on dark and light |

Helper classes (in `t4-theme.css`):

- `.t4-display` — Didone display; sizes `.t4-display-hero`, `.t4-display-lg`, `.t4-display-md`
- `.t4-label` / `.t4-label-wide` — letterspaced-caps labels (the couture label voice — **NOT mono**; mono belongs to T1/T2)
- `.t4-numeral` — engraved plate numerals

Casing: display in UPPERCASE with wide tracking for the lockup, sentence case for long headlines; labels always UPPERCASE letterspaced.

## 4 · Signature elements

| Class | What it is | Use when |
|---|---|---|
| `.t4-vitrine-case` | Lit display case for before/after | The results/gallery signature |
| `.t4-plaque` | Engraved plaque beneath a case | Captions for vitrines |
| `.t4-frame` / `.t4-frame-inner` | Double hairline frame | Portraits, featured cards |
| `.t4-diamond` | Tiny diamond pin | Separators in navs/lists |
| `.t4-rule` | Brass hairline rule | Section dividers |
| `.t4-leader` / `.t4-leader-dark` | Dotted price leaders | The price-book services list |
| `.t4-salon` | Porcelain "salon" room treatment | Light practical sections |
| `.t4-spot`, `.t4-grade`, `.t4-ticker` | Spotlight, tonal grade, ticker | Ambient accents, one per section |

Rhythm rule: dark "showcase" rooms alternate with porcelain "salon" rooms — never two salons in a row.

## 5 · Buttons & links

- `.t4-btn-solid` — champagne fill, espresso text (primary).
- `.t4-btn-outline` — brass hairline outline, ivory text (secondary, on dark).
- `.t4-link` — underline grows from a brass hairline; pair with `.t4-label` for label-links.

## 6 · Layout & spacing

- Container: `max-w-[88rem] mx-auto px-6 lg:px-12`.
- Nav is **fixed** and transparent until scroll (then espresso + blur) — interior content needs a dark band or generous top offset beneath it.
- Section rhythm: tall dark rooms (`py-24`+) with brass hairline entries/exits; salon rooms slightly tighter.
- Hairlines everywhere: `--t4-line-dark` on dark, `--t4-line-light` on porcelain. No heavy borders.

## 7 · Motion

- Easing: `ATELIER_EASE = [0.22, 1, 0.36, 1]` exported from `T4Reveal.tsx`; durations run long (0.6–1.0s) — nothing snaps.
- Reveal: `T4Reveal` wrapper; champagne light-sweep moments are reserved for hero/finale.
- Every animated component checks `useReducedMotion()` — keep that in new work.

## 8 · Imagery

- Low-key lighting, warm shadows; skin tones lit like portraiture.
- Before/after cases live in vitrines with plaques — never bare image grids.
- Avoid bright clinical white photography; if unavoidable, mat it on porcelain.

## 9 · Voice & microcopy

- Labels read like engraved plates: "THE WORK", "BY APPOINTMENT".
- Services presented as a price book — quiet confidence about cost.
- Short sentences. No exclamation marks. "Book a consultation", never "Book now!".

## 10 · Do / Don't

**Do**
- Keep the espresso/champagne/porcelain triad — warmth is the brand.
- Use `--t4-brass-ink` for brass-colored text on porcelain (AA).
- Alternate dark showcase and porcelain salon rooms.
- Keep hairlines 1px and brass-tinted on dark.
- Reserve oxblood for exactly one urgent/emergency moment per site.

**Don't**
- Don't use cool grays or pure black (this is not T2's tech darkness).
- Don't set body copy in Bodoni Moda — it's display only.
- Don't use mono/typewriter faces (T1/T2 territory) — labels are letterspaced Hanken caps.
- Don't put ivory long-form text on porcelain (contrast) — use espresso ink there.
- Don't stack vitrines without plaques.

## 11 · Client rebrand checklist

1. **`t4-theme.css` palette block** (manual): replace the eleven palette hexes (§2) and re-derive the rgba inks and hairlines from the new grounds; update the scoped `--primary-brand / --secondary-accent / --bg-canvas / --text-main` overrides and `::selection`.
   - Contrast contract: `--t4-brass-ink` must stay AA-safe on the new porcelain; ivory must stay AA on espresso/umber.
2. **`app/globals.css` + `tailwind.config.js`** — the scaffold's `updateBrandColors` swaps `--primary-brand` + the tailwind brand teal from `client-intake.json`'s `brand.accent_color`. Verify they match.
3. **`fonts.ts` fonts** (`app/fonts.ts` in a client repo) — swap `Bodoni_Moda` / `Hanken_Grotesk` for the client's faces, KEEPING `--font-t4-display` / `--font-t4-body` variable names.
4. **`data/master.ts` `theme` block** — update the hexes to match.
5. **Logo & favicon** — `public/images/`, path from intake `brand.logo_path`.
6. Rebuild; check both dark and salon rooms against §10.

After editing, update THIS file's tables so the guide stays true.

## 12 · Building out pages

Interior pages currently render wireframes (structure only) from `components/wireframe/pages/`. Home is the fully designed reference. To build out a page:

1. Open the wireframe route (e.g. `app/about/page.tsx` in a client repo; `app/(templates)/t4/about/page.tsx` in the hub) — its labeled sections are the agreed structure.
2. Replace the wire body with real sections in Atelier language: dark/salon room rhythm, vitrines for results, price-book lists, `T4Reveal` motion, palette/classes from §§2–7.
3. Keep real data flowing from `@/data/master`.
4. Remove `robots: { index: false, follow: false }` from the page's metadata once designed and approved.
5. Nav/footer stay untouched — shared with the homepage (note the fixed-nav dark band: see `T4WireShell` for the pattern).

**Suggested prompt for Claude:** "Build out the Services page (`app/services/page.tsx`): replace the wireframe body with fully designed sections per `STYLE_GUIDE.md`, keeping the wireframe's section structure (`components/wireframe/pages/ServicesWire.tsx`), pulling practice facts from `data/master.ts`, and matching the homepage's dark/salon room rhythm. Then remove the noindex metadata."
