# T1 "Press" — Imagery Spec & Swap Points

T1 reproduces photography as print: every image renders through the `.t1-duotone`
filter (grayscale, +12% contrast) with a halftone edge overlay, and develops into
full color on hover. That treatment is forgiving — but it amplifies contrast and
texture, so flat, evenly-lit clinical photos read as gray mush while directional,
high-contrast photos read as art.

## Art-direction spec (applies to every slot)

- **Monochrome-first**: the photo must work in black and white. Check every
  candidate through a grayscale filter before approving it.
- **Directional light**: one clear light source (window light, practice spotlights).
  Avoid overhead fluorescent flatness.
- **High contrast, real blacks**: the duotone treatment lifts brightness 4%;
  images need true shadow areas or they wash out against the paper (#F3EFE6).
- **People in action** over empty rooms: a doctor mid-conversation, gloved hands
  at work, a patient reacting to a mirror. The hero especially should have a
  human subject — it is the "cover photograph."
- **Color payoff**: because hover reveals full color, the color version should
  reward it — warm skin tones, a colored garment, environment color. A photo
  that is nearly monochrome in color wastes the signature interaction.
- **Resolution**: hero and doctor portrait minimum 1600px on the long edge;
  before/after cases minimum 1200px (the proof plate now renders at max-w-6xl
  and is one class away from full-bleed once assets can support it).

## Swap points

| Slot | File path | Component | Current placeholder | Shot brief |
|---|---|---|---|---|
| Hero cover | `/public/images/office-interior.jpg` | `T1Hero.tsx` (FIG. 01) | Empty operatory, flat light | Doctor + patient moment in the practice, window light, shot slightly wide (4:3 / 16:10 crop safe) |
| Doctor portrait | `/public/images/team/doctor-portrait.jpeg` | `T1DoctorFeature.tsx` (FIG. 02) | Stock-style portrait | Environmental portrait, 3:4 vertical, subject looking at camera, strong side light |
| Services × 4 | `/public/images/services/*.jpg` | `T1ServicesGallery.tsx` | Generic service stock | Macro/detail shots: aligner in hand, shade-matching, implant model, finished smile — one clear subject each |
| Before/after | `/public/images/cases/smile-before.png`, `smile-after.png` | `T1PageTurnReveal` via `page.tsx` | One identical pair reused ×3 | Real consented cases, identical framing/lighting between before and after, one pair per case in `sampleBeforeAfterCases` |

## Notes

- No code changes are needed to swap: replace files at the same paths (or update
  paths in `data/master.ts` / component constants) and the duotone system applies
  automatically.
- After swapping, verify the hover color-develop on each image and the halftone
  edge legibility over the new shadows.
