# T3 "Haven" — Style Guide

Organic calm. This document is the single source of truth for how anything new on this site should look. When building out a page, follow this guide plus the page's wireframe (`/about`, `/services`, …).

## 1 · Identity

- **Thesis:** dentistry as a sanctuary — a soft, plant-lit room where anxious patients exhale. Everything breathes: colors, motion, copy.
- **Mood words:** calm · organic · gentle · unhurried · reassuring.
- **Signature:** the breath guide (guided-breathing comfort module) and drifting organic blobs.
- **Target patient:** anxious or avoidant patients, wellness-minded families.
- **Voice:** quiet, lowercase-leaning, second person, zero pressure ("whenever you're ready, we'll be gentle.").

## 2 · Color palette

All palette variables live in `app/t3-theme.css` (in the template repo: `app/(templates)/t3/t3-theme.css`), scoped under `.t3-haven`.

| Variable | Hex | Role | Rules |
|---|---|---|---|
| `--t3-sage` | `#e8efe3` | Main canvas — pale sage | Default ground |
| `--t3-sage-light` | `#f4f6ec` | Alternating lighter sections | Section alternation |
| `--t3-moss` | `#2e3b34` | Text ground; footer | The "black" here |
| `--t3-euc` | `#6d8b7d` | Eucalyptus accent | Marks, dots, large accents |
| `--t3-euc-deep` | `#566e61` | Button fills, big accent phrases | Primary actions |
| `--t3-euc-ink` | `#47594f` | AA-safe green for small text | Green TEXT goes here |
| `--t3-clay` | `#c97e5d` | The ONE warm clay moment per screen | Sparingly |
| `--t3-clay-deep` | `#9a4e28` | AA-safe clay for small text | Clay-colored text |
| `--t3-sand` | `#e7e0d2` | One warm section | Comfort/First-visit |

Derived: `--t3-moss-soft` (74%), `--t3-moss-faint` (50%, decorative/large only), `--t3-line`, `--t3-shadow-soft`, `--t3-shadow-bloom`, and the glass tokens `--t3-glass-bg / -border / -shadow` (frosted cards & the nav).

Shared-variable overrides under `.t3-haven` include `--text-main: #2e3b34`.

## 3 · Typography

Fonts load from this template's `fonts.ts` module (`app/fonts.ts` in a client repo) via `next/font` CSS variables, applied on the template wrapper — swap families there, keep the variable names. Only Inter (`--font-sans`) still loads globally in `app/layout.tsx`.

| Role | Family | CSS variable | Weights | Usage |
|---|---|---|---|---|
| Body & display | Outfit | `--font-sanctuary` | 200 / 300 / 400 | Everything structural — always light weights |
| Serif accent | Newsreader | `--font-t3-serif` | 300 / 400 / 500 (+italic) | Quotes, emphasized soft words |

Helper classes (in `t3-theme.css`):

- `.t3-display` / `.t3-display-hero` — light Outfit display sizes
- `.t3-serif` — the italic serif whisper (one soft phrase per section)
- `.t3-index` — small section index labels
- `.t3-marker` — the eucalyptus dot marker

Casing: mostly lowercase headings and labels; nothing shouts. Font weights stay ≤400 (500 only in the serif).

## 4 · Signature elements

| Class | What it is | Use when |
|---|---|---|
| `.t3-glass-card` / `.t3-glass-chip` | Frosted glass surfaces | Cards over blobs, the nav bar |
| `.t3-blob` / `.t3-blob-b` + `.t3-drift-a/b` | Soft organic shapes, slow drift | Ambient background, 1–2 per screen |
| `.t3-breathe` | Slow scale "breathing" animation | The breath guide & gentle accents |
| `.t3-grain` | Near-invisible paper grain overlay | Site-wide (already applied) |
| `.t3-marker` | Eucalyptus dot | List markers, wordmark |

The comfort module (`T3BreathGuide`) is the emotional centerpiece — new pages can reference it, never duplicate it.

## 5 · Buttons & links

- `.t3-btn.t3-btn-primary` — eucalyptus-deep fill, rounded-full, soft shadow.
- `.t3-btn.t3-btn-quiet` — ghost pill for secondary actions.
- Text links: moss with euc-ink hover, underline `decoration-[#6d8b7d]` offset 4 — soft, never abrupt.

## 6 · Layout & spacing

- Container: `max-w-7xl mx-auto px-5 sm:px-8`.
- Nav is **fixed** (72px, frosted glass) — interior content offsets below it (see `T3WireShell`).
- Section rhythm: airy `py-20`+; alternate sage → sage-light; sand appears once; footer is moss with a `rounded-t-[3rem]` soft shoulder.
- Corners are generous (`rounded-3xl` family); nothing sharp.

## 7 · Motion

- Easing: `HAVEN_EASE = [0.22, 1, 0.36, 1]` exported from `T3Reveal.tsx`; long durations (0.8–1.6s), small distances.
- The nav's anchor clicks scroll via Lenis with a `-88px` offset for the fixed header — reuse that pattern for new in-page anchors.
- Blobs drift, cards breathe; motion is ambient, never attention-grabbing. Always respect `useReducedMotion()`.

## 8 · Imagery

Follow `app/(templates)/t3/IMAGERY.md` (copied into client repos alongside the template) for full art direction. Summary: soft natural light, plants, shallow depth of field, calm faces; duotone toward sage/moss when photos must sit on colored grounds.

## 9 · Voice & microcopy

- lowercase kickers and headings where the design uses them ("find us", "more to explore").
- Reassurance before instruction: "no judgment here" precedes "book a visit".
- Second person, present tense, short breath-length sentences.

## 10 · Do / Don't

**Do**
- Keep weights light (200–400) and sizes generous.
- Use `--t3-euc-ink` / `--t3-clay-deep` for small colored text (AA).
- Give clay exactly one moment per screen.
- Keep glass cards over blobs, grain over everything.
- Keep the rounded-top footer shoulder.

**Don't**
- Don't use bold weights, caps-lock shouting, or hard shadows.
- Don't use more than two blobs per screen.
- Don't put moss-faint text below 20px (decorative only).
- Don't introduce warm colors beyond clay/sand.
- Don't use mono faces or hard geometric chrome (other templates' voices).

## 11 · Client rebrand checklist

1. **`t3-theme.css` palette block** (manual): replace the nine palette hexes (§2), re-derive `--t3-moss-soft/faint`, `--t3-line`, both shadows, and the glass tokens from the new grounds; update the scoped shared-variable overrides and `::selection`.
   - Contrast contract: `--t3-euc-ink` and `--t3-clay-deep` must stay AA-safe on the new sage/sand.
2. **`app/globals.css` + `tailwind.config.js`** — the scaffold's `updateBrandColors` swaps `--primary-brand` + the tailwind brand teal from intake `brand.accent_color`. Verify they harmonize with the new palette.
3. **`fonts.ts` fonts** (`app/fonts.ts` in a client repo) — swap `Outfit` / `Newsreader` for the client's faces, KEEPING `--font-sanctuary` / `--font-t3-serif` variable names and the light weights.
4. **`data/master.ts` `theme` block** — update hexes to match.
5. **Logo & favicon** — `public/images/`, path from intake `brand.logo_path`.
6. Rebuild; verify calm is preserved: light weights, AA contrast, one clay moment.

After editing, update THIS file's tables so the guide stays true.

## 12 · Building out pages

Interior pages currently render wireframes (structure only) from `components/wireframe/pages/`. Home is the fully designed reference. To build out a page:

1. Open the wireframe route (e.g. `app/about/page.tsx` in a client repo; `app/(templates)/t3/about/page.tsx` in the hub) — its labeled sections are the agreed structure.
2. Replace the wire body with real sections in Haven language: glass cards, blob ambience, serif whispers, `T3Reveal` motion, palette/classes from §§2–7.
3. Keep real data flowing from `@/data/master`.
4. Remove `robots: { index: false, follow: false }` from the page's metadata once designed and approved.
5. Nav/footer stay untouched — shared with the homepage (fixed-nav offset: see `T3WireShell`).

**Suggested prompt for Claude:** "Build out the New Patients page (`app/new-patients/page.tsx`): replace the wireframe body with fully designed sections per `STYLE_GUIDE.md`, keeping the wireframe's section structure (`components/wireframe/pages/NewPatientsWire.tsx`), pulling practice facts from `data/master.ts`, and matching the homepage's glass-and-blob calm. Then remove the noindex metadata."
