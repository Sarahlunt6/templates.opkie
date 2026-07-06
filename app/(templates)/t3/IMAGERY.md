# T3 Haven — Imagery Shot List

T3 is the sanctuary template for anxious patients: **spa, not clinic**. Every
photo should feel like an exhale.

## Grading & art direction (applies to every slot)

- **Daylight over fluorescent.** Window light, sheer curtains, morning sun on a
  wall. No overhead operatory glare, no blue-white color casts.
- **Plants, linen, wood.** Eucalyptus stems, potted greenery, oak or ash
  furniture, textured throws — organic textures beat stainless steel every time.
- **People breathing, not equipment working.** Relaxed shoulders, closed eyes,
  a hand resting on an armrest. Instruments only ever soft and out of focus in
  the background. Never a needle, drill, or tray of tools in focus.
- **Soft depth of field.** f/2–f/2.8 feel; one calm subject, everything else
  melting away.
- **Warm-neutral grading.** Lift shadows slightly, desaturate greens toward
  sage so the photo harmonizes with the `#E8EFE3` canvas and the warmed
  `#F4F6EC` section tone. Avoid clinical cyan and oversaturated teal.

## Slots

| Slot | Path | Component | Current placeholder | Shot brief |
| --- | --- | --- | --- | --- |
| Hero photo panel | `/images/office-interior.jpg` | `T3HavenHero.tsx` | Office interior | The money shot: a wide, light-filled treatment or lounge space in morning daylight — plants near a window, linen or wood tones, maybe one relaxed person mid-breath. **Glass annotation chips float over this image** (upper-left ~5%/14%, upper-right ~6%/24%, mid-left ~9%/52%, mid-right ~10%/58%, plus an anchored card lower-left) — candidates need calm, low-detail regions in those zones: plain walls, soft bokeh, sky, or fabric. Busy shelving or high-contrast edges under the chips disqualify the shot. Works at 4:5, 16:9, and 21:9 crops. |
| Services — sedation & comfort | `/images/office-interior.jpg` | `T3HavenServices.tsx` | Office interior (reused from hero) | A treatment room staged for rest, not procedure: dimmed daylight, a blanket folded on the chair, headphones on a side table. Should read "nap," matching the card copy ("a long, uneventful nap"). Replace the hero reuse with its own frame. |
| Services — Invisalign | `/images/services/invisalign.jpg` | `T3HavenServices.tsx` | Aligner tray to the light | A clear aligner held up in window light by a relaxed hand, shallow focus, warm skin tones — product-as-still-life, not lab shot. |
| Services — veneers | `/images/services/full-mouth-smile.jpg` | `T3HavenServices.tsx` | Natural post-veneer smile | A genuine, unforced smile in soft daylight — candid over posed, no ring-light gloss. The smile should look like a person, not a catalog. |
| Services — implants | `/images/services/implant.jpg` | `T3HavenServices.tsx` | Ceramic crown on neutral bg | Still life: a single ceramic crown on linen or warm stone, soft side light. Absolutely no surgical hardware, jaw models, or titanium screws in focus. |
| Services — whitening | `/images/services/full-mouth-shade.jpg` | `T3HavenServices.tsx` | Shade guide next to teeth | Warm close-up of a bright natural smile; if a shade guide appears, keep it soft-focus and incidental. Should feel "morning light," not "before/after ad." |
| Services — braces | `/images/services/braces.jpg` | `T3HavenServices.tsx` | Low-profile braces, smiling patient | A relaxed adult or teen with modern low-profile brackets, laughing or at ease outdoors / near a window — the story is comfort, not appliance. |
| Doctor portrait A | `/images/team/doctor-portrait.png` | `T3HavenDoctors.tsx` | Demo portrait | Environmental portrait in the practice's calmest corner: daylight, plant or linen texture behind, soft depth of field, warm genuine expression. No white-coat-against-white-wall. 4:5 crop, headroom for `object-top`. |
| Doctor portrait B | `/images/team/doctor-portrait.jpeg` | `T3HavenDoctors.tsx` | Demo portrait | Same direction as portrait A but visually distinct (different corner, pose, or wardrobe tone) since portraits alternate down the page. 4:5 crop. |
| Review image card — sedation (`rev-005`) | `/images/office-interior.jpg` | `T3HavenReviews.tsx` | Office interior (third reuse) | The room where sedation visits happen, shot at rest: chair reclined, blanket, warm lamp against daylight. A glass name-chip overlays the bottom edge — keep the lower quarter of the frame low-detail. 4:5 crop. |
| Review image card — Invisalign (`rev-004`) | `/images/services/invisalign.jpg` | `T3HavenReviews.tsx` | Aligner tray (reused from services) | A patient-side moment: someone placing or admiring an aligner in natural light, soft focus. Bottom quarter stays calm for the overlaid glass name-chip. 4:5 crop. |
| Closing team photo | `/images/team-ortho.jpeg` | `T3ClosingInvite.tsx` | Ortho team photo | The whole team, relaxed and unclinical — standing loosely in the daylight lounge or doorway, mid-laugh beats stiff lineup. Warm grading to sit beside the clay-washed invitation panel. Tall crop (min-height 320px, fills a 5-column panel). |

## Not file slots, but photo-adjacent

- **Before/after slider** (`T3Transformations.tsx` / `T3QuietSlider.tsx`) pulls
  `beforeUrl` / `afterUrl` from `@/data/master` cases — grade those pairs to the
  same warm-neutral standard so the slider doesn't jump color temperature.
- The hero and review-card **gradient washes are CSS** and stay; shoot for the
  photo to survive a sage-tinted bottom gradient (`rgba(46,59,52,0.28–0.32)`).
