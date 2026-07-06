# T2 "Precision" — Imagery & Motion Asset Spec

The whole template reads as a porcelain lab on a cool clinical white
canvas (`--t2p-bg`, #F6F8FA) with graphite ink and a blue scan-light
accent (`--t2p-scan`, #38BDF8). Every asset must survive that
environment: bright, clean, cool-graded — daylight or bright operatory
light over white, steel, and glass. Nothing moody, nothing warm-cast.

## 1. Hero loop video (future asset)

**Slot:** `T2Hero.tsx` imagery plate — the full-bleed `<video>` behind
the headline (currently `/videos/hero-ambient-t2.mp4` with the
`/images/office-interior.jpg` poster). The plate is washed toward
porcelain (85% #F6F8FA overlay + vertical gradient), so the source
must carry its own contrast against a bright field.

**Concept:** a scanner light passing over a tooth / dental model — one
blue beam sweeping across an object on a BRIGHT field (white or pale
steel surface, softbox-lit). The beam in the video should feel like
the same light as the CSS scan beam that sweeps the frame.
*Option:* the model may instead sit inside a framed dark plate (a
graphite lightbox insert) if the beam needs a dark surround to read —
but the plate must then be clearly a framed object on the bright page,
not a full-bleed dark grade.

**Asset requirements**

- **Duration:** 6–8 s seamless loop (first and last frame identical or
  cross-dissolved; no visible loop seam).
- **Backdrop:** bright and even — white/pale-neutral field; nothing in
  frame darker than mid-grey except the model's own shadows (or the
  optional framed dark plate above).
- **Resolution:** 1920×1080 minimum; 2560×1440 preferred (the plate is
  full-bleed and parallax-scaled to 1.12).
- **Format:** H.264 MP4 (baseline delivery) + WebM/VP9 or H.265
  alternate; target ≤ 3–4 MB for the MP4 at this duration. 24 or 30 fps.
- **Color:** the beam should sit near #38BDF8 → #22D3EE; cool grading
  throughout. Avoid warm highlights — they fight the porcelain wash.
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

## 2. Bright-clinical photo specs (existing image slots)

All photos sit on or near #F6F8FA / white cards, and several get gentle
desaturation in-template, so they must read well on a bright page.

**General rules for every slot**

- Bright, clean environments: daylight or bright operatory light;
  white, steel, and glass surroundings preferred.
- Cool or neutral grading — no warm/orange casts; whites should stay
  white, not cream (cream drifts toward T1's paper palette).
- Even, open exposure; keep highlight detail — the template lightens
  and washes rather than crushes.
- No busy backgrounds — the blue HUD dots and wireframe overlays need
  quiet areas to sit on.

**Per-slot notes**

| Slot | File(s) | Notes |
| --- | --- | --- |
| Hero poster / Final CTA | `/images/office-interior.jpg` | Office interior, bright practice lighting or daylight; rendered under an 85–90% porcelain wash, so strong shapes and cool tones survive best. Wide, uncluttered composition. |
| Care band | `/images/team-ortho.jpeg` | The one deliberately warm-feeling frame (people, not machines). Team photo in a bright space, natural light; gets only a faint cool cast (`t2p-portrait`). Faces must stay warm and human even under cool grading. |
| Services accordion | `/images/services/*.jpg` | Rendered at `opacity-80 saturate-[0.6]` on white. Choose bright, clinical frames with clear subject separation; white or pale backgrounds read cleanest. |
| Doctor portraits | `/images/team/doctor-portrait.jpeg` | 3:4 crop, soft directional light, bright neutral backdrop (white, pale grey, or glass). Kept intentionally human (`grayscale(0.15)` only) — a light studio-clinical backdrop reads best. |
| Before/after cases | data-driven (`sampleBeforeAfterCases`) | Clinical accuracy first; consistent framing and lighting between the before and after shots, since the scan beam wipes directly between them. The "before" side is additionally desaturated/darkened in-template. The VITA shade strip renders directly below — the "after" should plausibly land near shade B1. |

**Rule of thumb:** if a candidate photo looks good printed in a
clinical equipment catalog — bright page, cool light, white surfaces —
it will work here. If it needs a dark, moody surround to read, it won't.
