# T2 "Precision" — Style Guide

Porcelain-lab precision. This document is the single source of truth for how anything new on this site should look. When building out a page, follow this guide plus the page's wireframe (`/about`, `/services`, …).

## 1 · Identity

- **Thesis:** digital dentistry as an engineering discipline — 3D imaging, same-day ceramic crowns, guide-planned implants — presented like a precision instrument's spec sheet.
- **Mood words:** precise · clinical-calm · indexed · engineered · transparent.
- **Signature:** the scan beam / blueprint motifs and mono-indexed sections ("01 Technology…").
- **Target patient:** research-minded adults comparing practices on technology and rigor.
- **Voice:** spec-sheet concision; numbered everything; claims backed by process.

## 2 · Color palette

All palette variables live in `app/t2-theme.css` (in the template repo: `app/(templates)/t2/t2-theme.css`), scoped under `.t2p`.

| Variable | Hex | Role | Rules |
|---|---|---|---|
| `--t2p-bg` | `#F6F8FA` | Page canvas — porcelain gray-blue | Default ground |
| `--t2p-surface` | `#FFFFFF` | Cards, panels | Card surfaces |
| `--t2p-surface-2` | `#EDF1F5` | Recessed wells | Inputs, insets |
| `--t2p-graphite` | `#10161D` | Dark panels (tech sections) | The dark rooms |
| `--t2p-scan` | `#38BDF8` | The scan-beam cyan | Beams, live accents |
| `--t2p-scan-dim` | rgba 45% | Dimmed scan traces | Ambient lines |
| `--t2p-blue` | `#0369A1` | Primary action blue | Buttons, links |
| `--t2p-blue-deep` | `#075985` | Hover / pressed | Hover states |
| `--t2p-text` | `#17202A` | Ink | Body text |
| `--t2p-text-70` / `-50` | rgba | Secondary / tertiary text | Never below 50 for copy |
| `--t2p-line` / `-strong` | rgba | Hairlines / strong rules | Borders |
| `--t2p-duo` | gradient | Blue→cyan duotone | `.t2p-duotext` moments |

Also defined here: `--t2p-ease: cubic-bezier(0.22, 1, 0.36, 1)` for CSS transitions.

Note: `globals.css` also carries legacy `--t2-*` dark-cinematic tokens — new work should use the `--t2p-*` system above.

## 3 · Typography

Fonts load once in `app/layout.tsx` via `next/font` CSS variables — swap families there, keep the variable names.

| Role | Family | CSS variable | Weights | Usage |
|---|---|---|---|---|
| Headings & UI | Sora | `--font-innovator` | 400 / 500 / 600 | Wordmark, headlines (`font-innovator`) |
| Telemetry / labels | JetBrains Mono | `--font-t2-mono` | 400 / 500 | `.t2p-mono` indexes, specs, HUD readouts |
| Body | Inter | `--font-sans` | 400–600 | Long-form copy (`font-sans`) |

Helper classes (in `t2-theme.css`):

- `.t2p-mono` — mono telemetry text (uppercase, tracked)
- `.t2p-label` — section label
- `.t2p-duotext` — duotone gradient display text

Casing: mono labels UPPERCASE with 0.12–0.22em tracking; headlines sentence case in Sora.

## 4 · Signature elements

| Class | What it is | Use when |
|---|---|---|
| `.t2p-blueprint` | Blueprint grid overlay | Dark/technical backdrops |
| `.t2p-beam-h` / `.t2p-beam-v` | Scan beams | One live beam per screen max |
| `.t2p-frame` | Instrument frame with corner ticks | Featured media/cards |
| `.t2p-card` | Standard surface card | Default card |
| `.t2p-dark-panel` | Graphite tech panel | Technology sections |
| `.t2p-hud-dot`, `.t2p-tick`, `.t2p-eq` | HUD particles | Sparingly, ambient |
| `.t2p-verdict-yes/-no` | Comparison verdict chips | Spec tables |
| Index numerals (`01`, `02` …) | Mono section indexes | Nav, footer, section heads |

## 5 · Buttons & links

- `.t2p-btn.t2p-btn-primary` — blue fill, precise radius.
- `.t2p-btn.t2p-btn-ghost` — hairline ghost.
- Text links: `.t2p-mono` labels or blue text with `--t2p-blue-deep` hover; indexes tint `rgba(3,105,161,0.65)` → blue on hover.

## 6 · Layout & spacing

- Containers: `max-w-[1440px] px-6 md:px-12` (nav/major sections); `max-w-7xl` for the footer.
- Nav is **fixed** (4rem/4.5rem, transparent → white blur on scroll) — interior content offsets below it (see `T2WireShell`).
- Rhythm: porcelain sections with hairline rules; graphite panels for technology; generous whitespace, engineering-drawing alignment.
- Rules are 1px `--t2p-line`; strong dividers use `-strong` sparingly.

## 7 · Motion

- Easing: `EASE = [0.22, 1, 0.36, 1]` exported from `components/t2-lib.ts` (CSS twin: `--t2p-ease`).
- Framer reveals are short (0.3–0.6s) and exact; scan-beam sweeps are the one theatrical allowance.
- `T2MagneticButton` exists for magnetic CTAs — use for primary CTAs only. Always respect `useReducedMotion()`.

## 8 · Imagery

Follow `app/(templates)/t2/IMAGERY.md` (copied into client repos alongside the template). Summary: clean specular lighting, macro shots of instruments/scanners, cool neutral grading; people appear composed and lit like product photography.

## 9 · Voice & microcopy

- Everything indexed: "01 / Technology", "Sections indexed in FDI tooth notation."
- Numbers over adjectives: "0.06 mm margin fit" beats "incredibly precise".
- Mono labels for facts, Sora for promises.

## 10 · Do / Don't

**Do**
- Keep the porcelain ground; graphite only for tech panels.
- Index new sections in the mono voice and continue the numbering system.
- Use `.t2p-frame` corner ticks for featured media.
- Keep text at `--t2p-text-70` or stronger for copy.
- Route data claims through real `data/master.ts` facts.

**Don't**
- Don't introduce warm/pastel colors — the only accents are scan cyan and action blue.
- Don't use serif or script faces anywhere.
- Don't run two scan beams on one screen.
- Don't use soft blob shapes or rounded-full cards (T3's voice).
- Don't set long copy in JetBrains Mono.

## 11 · Client rebrand checklist

1. **`t2-theme.css` palette block** (manual): replace the `--t2p-*` hexes (§2) — canvas, surfaces, graphite, scan, blue pair, text/lines — and the `--t2p-duo` gradient stops; update `::selection` if present.
   - Contrast contract: `--t2p-blue` must stay AA-safe on `--t2p-bg` and `--t2p-surface`; text-70 must stay readable on all surfaces.
2. **`app/globals.css` + `tailwind.config.js`** — the scaffold's `updateBrandColors` swaps `--primary-brand` + the tailwind brand teal from intake `brand.accent_color`. Verify they match the new blue. (globals.css `--secondary-accent: #38bdf8` pairs with the scan cyan.)
3. **`app/layout.tsx` fonts** — swap `Sora` / `JetBrains_Mono` for the client's faces, KEEPING `--font-innovator` / `--font-t2-mono` variable names. Keep a true monospace for the telemetry voice.
4. **`data/master.ts` `theme` block** — update hexes to match.
5. **Logo & favicon** — `public/images/`, path from intake `brand.logo_path`.
6. Rebuild; verify the instrument feel: hairlines crisp, indexes aligned, AA contrast.

After editing, update THIS file's tables so the guide stays true.

## 12 · Building out pages

Interior pages currently render wireframes (structure only) from `components/wireframe/pages/`. Home is the fully designed reference. To build out a page:

1. Open the wireframe route (e.g. `app/about/page.tsx` in a client repo; `app/(templates)/t2/about/page.tsx` in the hub) — its labeled sections are the agreed structure.
2. Replace the wire body with real sections in Precision language: indexed section heads, spec-sheet lists, `.t2p-frame` media, `EASE` motion, palette/classes from §§2–7. T2 chrome self-feeds from `components/t2-lib.ts` — reuse its `practice` / `location` / `bookingHref` exports.
3. Keep real data flowing from `@/data/master` (via `t2-lib` where convenient).
4. Remove `robots: { index: false, follow: false }` from the page's metadata once designed and approved.
5. Nav/footer stay untouched — shared with the homepage (fixed-nav offset: see `T2WireShell`).

**Suggested prompt for Claude:** "Build out the Smile Gallery page (`app/smile-gallery/page.tsx`): replace the wireframe body with fully designed sections per `STYLE_GUIDE.md`, keeping the wireframe's section structure (`components/wireframe/pages/SmileGalleryWire.tsx`), pulling practice facts from `data/master.ts`, and matching the homepage's indexed spec-sheet voice. Then remove the noindex metadata."
