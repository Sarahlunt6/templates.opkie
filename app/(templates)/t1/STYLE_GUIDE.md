# T1 "Press" — Style Guide

Big graphic print editorial. This document is the single source of truth for how anything new on this site should look. When building out a page, follow this guide plus the page's wireframe (`/about`, `/services`, …).

## 1 · Identity

- **Thesis:** the practice as a great newspaper — giant wordmarks, ruled columns, chapter numerals, ink on paper. Confidence through typography, not decoration.
- **Mood words:** editorial · bold · inky · structured · charismatic.
- **Signature:** the masthead + giant cropped wordmark, chapter numerals `[01]…[10]`, and the page-turn reveal.
- **Target patient:** design-aware adults who respond to confidence and craft.
- **Voice:** headlines like front-page decks; one italic flourish per statement; mono bracket labels as the byline system.

## 2 · Color palette

All palette variables live in `app/t1-theme.css` (in the template repo: `app/(templates)/t1/t1-theme.css`), scoped under `.t1-root`.

| Variable | Hex | Role | Rules |
|---|---|---|---|
| `--t1-paper` | `#f3efe6` | The paper — page canvas | Default ground |
| `--t1-paper-deep` | `#e9e3d4` | Aged-paper alternate sections | Section alternation |
| `--t1-ink` | `#1a1713` | The ink — text, dark blocks, footer | The "black" |
| `--t1-red` | `#d92b21` | Press red — THE accent | Rules, buttons, large/italic moments |
| `--t1-stone` | `#6b675e` | Muted tone | Large secondary text, decorative |
| `--t1-red-ink` | `#c02015` | AA-safe red for small text | The 11.5px mono labels (`.t1-mono-label-red`) |
| `--t1-stone-ink` | `#5f5b52` | AA-safe stone for small text | The 11.5px mono labels (`.t1-mono-label-stone`) |
| `--t1-hairline` | rgba(ink, .15) | Ruled lines on paper | Column rules |
| `--t1-hairline-soft` | rgba(ink, .08) | Faint rules | Backgrounds |
| `--t1-hairline-light` | rgba(paper, .22) | Rules on ink | Footer/dark blocks |

Hardcoded companions appear throughout components as `#1A1713` / `#F3EFE6` / `#D92B21` — a rebrand must sweep those too (see §11).

## 3 · Typography

Fonts load from this template's `fonts.ts` module (`app/fonts.ts` in a client repo) via `next/font` CSS variables, applied on the template wrapper — swap families there, keep the variable names. Only Inter (`--font-sans`) still loads globally in `app/layout.tsx`.

| Role | Family | CSS variable | Weights | Usage |
|---|---|---|---|---|
| Press display | Anton | `--font-t1-press` | 400 | Wordmarks, giant headlines (`font-t1-press`) — caps |
| Editorial display | Fraunces | `--font-t1-display` | 300–600 (+italic) | Chapter headings, refined display (`font-t1-display`) |
| Mono labels | Courier Prime | `--font-t1-mono` | 400 / 700 | `[ BRACKET LABELS ]`, folios (`font-t1-mono`) |
| Body | Inter | `--font-sans` | 400–600 | Long-form copy |

Helper classes (in `t1-theme.css`):

- `.t1-display` — display treatment; `.t1-wordmark` — the giant cropped name
- `.t1-mono-label` (+ `-red`, `-stone`) — the bracket-label voice
- `.t1-italic` — the sanctioned italic flourish
- `.t1-rule` / `.t1-rule-red` / `.t1-col-rules` — ruled lines & column rules

Casing: Anton always UPPERCASE; Fraunces sentence case with italic accents; mono labels UPPERCASE in brackets. Anton below ~2xl sizes is reserved for the logotype only.

## 4 · Signature elements

| Class / pattern | What it is | Use when |
|---|---|---|
| Chapter numerals `[01]` | Mono folio indexes on every section | Every new section continues the sequence |
| `.t1-rule` / `.t1-rule-red` | Heavy + red rules | Section entries, emphasis |
| `.t1-col-rules` | Newspaper column rules | Multi-column text blocks |
| `.t1-halftone` / `.t1-halftone-paper` | Halftone dot textures | Image mats, feature blocks |
| `.t1-duotone` / `.t1-tint-red` | Ink/red photo treatments | All photography |
| `.t1-grain` | Paper grain overlay | Ambient |
| `.t1-folio-in`, `.t1-wipe-range` | Folio/page-turn motion helpers | Section reveals |
| `.t1-arrow-chip` | Directional chip | Link affordances |

## 5 · Buttons & links

- `.t1-btn.t1-btn-ink` — rectangular ink block button (primary on paper).
- `.t1-btn.t1-btn-paper` — paper button (on ink grounds).
- `.t1-btn.t1-btn-outline` — ruled outline variant.
- `.t1-link` — editorial underline; red hover (`#D92B21`). Mono-label links underline with red decoration.

Buttons are RECTANGLES — no rounded corners in this template.

## 6 · Layout & spacing

- Container: `max-w-[1500px] px-4 md:px-8 xl:px-12`.
- Chrome: `T1UtilityBar` (hours strip) + `T1Masthead` (sticky, ruled) — both in normal flow; no spacer needed.
- Rhythm: ruled sections `py-16`–`py-24`; ink blocks (dark sections) punctuate the paper; the footer closes with the cropped giant wordmark.
- Grids: newspaper columns with visible rules; images sit in halftone/duotone mats.

## 7 · Motion

- Easing: `T1_EASE = [0.25, 1, 0.4, 1]` exported from `components/T1Motion.tsx`.
- `T1PageTurnReveal` — the page-turn is the signature reveal; folios fade in with `.t1-folio-in`.
- Motion is snappy and mechanical (0.3–0.6s), like a press run. Always respect `useReducedMotion()`.
- `T1Cursor` provides the custom cursor on desktop — leave it global.

## 8 · Imagery

Follow `app/(templates)/t1/IMAGERY.md` (copied into client repos alongside the template). Summary: photojournalistic black-and-white or ink-duotone; halftone treatments; red tint reserved for one feature image per page.

## 9 · Voice & microcopy

- Bracket labels are the metadata voice: `[ THE LAST WORD ]`, `[ VISIT ]`, `[ HOURS ]`.
- Headlines read like decks: short, declarative, one italic red flourish.
- Captions in stone; facts in mono; never more than one exclamation per page (ideally zero).

## 10 · Do / Don't

**Do**
- Continue the chapter-numeral sequence on new sections.
- Keep every photo duotoned/halftoned — no full-color candids on paper.
- Use red as punctuation, not decoration (a rule, a label, an italic word).
- Keep buttons rectangular and ruled.
- Alternate paper / paper-deep / ink grounds deliberately.

**Don't**
- Don't round corners or add soft shadows.
- Don't set Anton in mixed case or below logotype sizes.
- Don't use more than one red italic flourish per statement.
- Don't introduce colors beyond paper/ink/red/stone.
- Don't use script faces or pastel accents (other templates' voices).

## 11 · Client rebrand checklist

1. **`t1-theme.css` palette block** (manual): replace `--t1-paper, --t1-paper-deep, --t1-ink, --t1-red, --t1-stone` and re-derive the three hairlines.
2. **Sweep hardcoded hexes in T1 components** (this template inlines its palette): search `app/components/` (client repo) or `app/(templates)/t1/components/` (hub) for `#1A1713`, `#F3EFE6`, `#D92B21`, `rgba(26, 23, 19`, `rgba(243, 239, 230` and replace with the new ink/paper/red. This step is unique to T1 — budget for it.
3. **`app/globals.css` + `tailwind.config.js`** — the scaffold's `updateBrandColors` swaps `--primary-brand` + the tailwind brand teal from intake `brand.accent_color`. Verify against the new red/ink.
4. **`fonts.ts` fonts** (`app/fonts.ts` in a client repo) — swap `Anton` / `Fraunces` / `Courier_Prime` for the client's faces, KEEPING `--font-t1-press` / `--font-t1-display` / `--font-t1-mono` variable names. The press face must be a heavy condensed sans; the label face must be a typewriter mono.
5. **`data/master.ts` `theme` block** — update hexes to match.
6. **Logo & favicon** — `public/images/`, path from intake `brand.logo_path`. (T1's logotype is set live in Anton from the practice name — a graphic logo is optional here.)
7. Rebuild; check ink-on-paper and paper-on-ink contrast both ways, and the giant footer wordmark at mobile widths.

After editing, update THIS file's tables so the guide stays true.

## 12 · Building out pages

Interior pages currently render wireframes (structure only) from `components/wireframe/pages/`. Home is the fully designed reference. To build out a page:

1. Open the wireframe route (e.g. `app/about/page.tsx` in a client repo; `app/(templates)/t1/about/page.tsx` in the hub) — its labeled sections are the agreed structure.
2. Replace the wire body with real sections in Press language: chapter numerals, ruled columns, duotone imagery, bracket labels, `T1PageTurnReveal` motion, palette/classes from §§2–7.
3. Keep real data flowing from `@/data/master`.
4. Remove `robots: { index: false, follow: false }` from the page's metadata once designed and approved.
5. Chrome (utility bar, masthead, footer) stays untouched — shared with the homepage.

**Suggested prompt for Claude:** "Build out the Doctors page (`app/doctors/page.tsx`): replace the wireframe body with fully designed sections per `STYLE_GUIDE.md`, keeping the wireframe's section structure (`components/wireframe/pages/DoctorsWire.tsx`), pulling practice facts from `data/master.ts`, and matching the homepage's editorial chapter system (continue the numeral sequence). Then remove the noindex metadata."
