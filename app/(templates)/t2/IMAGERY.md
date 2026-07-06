# T2 "Precision" — Imagery & Motion Asset Spec

The whole template reads as a hardware launch on a near-black canvas
(`#060806`) lit by a volt-green scan light (`--t2p-volt`, #7EE04B).
Every asset must survive that environment: dark backdrops, directional
light, nothing bright-white or clinical-fluorescent.

## 1. Hero loop video (future asset)

**Slot:** `T2Hero.tsx` imagery plate — the full-bleed `<video>` behind
the headline (currently `/videos/hero-ambient-t2.mp4` with the
`/images/office-interior.jpg` poster). The plate is graded down hard
(85% black overlay + vertical gradient), so the source must carry its
own contrast.

**Concept:** a scanner light passing over a tooth / dental model — one
volt-green beam sweeping across an object on a black field. The beam in
the video should feel like the same light as the CSS scan beam that
sweeps the frame.

**Asset requirements**

- **Duration:** 6–8 s seamless loop (first and last frame identical or
  cross-dissolved; no visible loop seam).
- **Backdrop:** true dark — nothing in frame brighter than ~#1a1a1a
  except the scan light itself and its falloff on the model.
- **Resolution:** 1920×1080 minimum; 2560×1440 preferred (the plate is
  full-bleed and parallax-scaled to 1.12).
- **Format:** H.264 MP4 (baseline delivery) + WebM/VP9 or H.265
  alternate; target ≤ 3–4 MB for the MP4 at this duration. 24 or 30 fps.
- **Color:** the beam should sit near #7EE04B → #34D399; avoid warm
  highlights, they fight the grade.
- **No audio track** (strip it — the element is `muted` anyway).

**Playback contract (already how the slot is built / must stay):**

- `poster` first — a still frame of the model under the beam, so the
  first paint never waits on video.
- `muted`, `loop`, `playsinline`, `autoplay`.
- Lazy: the file must not block LCP; keep `preload="metadata"` or lazy
  swap-in after hydration.
- Hidden under reduced motion: when `prefers-reduced-motion: reduce`,
  render the poster only (no playing video), matching the template rule
  that all scan theatrics disable.

## 2. Dark-environment photo specs (existing image slots)

All photos sit on or near `#060806` and several get desaturation
filters in-template, so they must read well on near-black.

**General rules for every slot**

- Dark or shadowed backgrounds preferred; avoid pure-white walls and
  overhead fluorescent flatness.
- One directional key light (window light or a single soft source)
  so subjects hold shape after the template's desaturation.
- Expose for highlights; the template will crush shadows further.
- No busy backgrounds — the volt HUD dots and wireframe overlays need
  quiet areas to sit on.

**Per-slot notes**

| Slot | File(s) | Notes |
| --- | --- | --- |
| Hero poster / Final CTA | `/images/office-interior.jpg` | Office interior, dim ambient, practice lighting on; rendered under an 85–90% black overlay, so only midtone-and-up detail survives. Wide, uncluttered composition. |
| Care band | `/images/team-ortho.jpeg` | The one deliberately warm frame. Team photo, directional natural light, dark-ish background; gets only a faint green cast (`t2p-portrait`). Faces must stay warm and human. |
| Services accordion | `/images/services/*.jpg` | Rendered at `opacity-80 saturate-[0.6]` on `#060806`. Choose frames with strong tonal separation (subject clearly lighter than background) or they turn to mud. Dark or neutral-dark backgrounds, directional light. |
| Doctor portraits | `/images/team/doctor-portrait.jpeg` | 3:4 crop, subject lit from one side, background falling to shadow. Kept intentionally warm (`grayscale(0.15)` only) — do not shoot on white; a charcoal/deep-neutral backdrop reads best. |
| Before/after cases | data-driven (`sampleBeforeAfterCases`) | Clinical accuracy first; consistent framing and lighting between the before and after shots, since the scan beam wipes directly between them. The "before" side is additionally desaturated/darkened in-template. |

**Rule of thumb:** if a candidate photo looks good printed on black
paper, it will work here. If it needs a white page to read, it won't.
