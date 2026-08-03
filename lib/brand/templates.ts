/* ------------------------------------------------------------------ *
 *  Brand Studio — how each template wears a client's two colors.
 *
 *  Every template keeps its own canvas, ink, and neutrals: the cream
 *  paper of Press, the espresso of Atelier, the sage of Haven. What the
 *  client supplies is hue and chroma, not tone. Each derived shade takes
 *  its LIGHTNESS from the value the template was designed with, so the
 *  contrast structure the designer built — this reads on cream, this
 *  reads on ink, this is a hairline — survives whatever color arrives.
 *  Where a shade carries small type, the derivation is contrast-checked
 *  on top of that.
 * ------------------------------------------------------------------ */

import {
  alpha,
  parseHex,
  readableOn,
  rgbToHsl,
  hslToRgb,
  toHex,
} from "./color";

export interface BrandColors {
  primary: string;
  accent: string;
}

interface RecolorOptions {
  /** Ground this shade must stay legible on; enables the contrast walk. */
  ground?: string;
  /** Target ratio against `ground`. Defaults to WCAG AA body text. */
  ratio?: number;
  /** Damp the incoming saturation — for shades meant to read as neutrals. */
  satScale?: number;
}

/**
 * How far a shade may drift from the tone the template was built with,
 * toward the tone the client actually picked. Zero would make a client's
 * navy and a client's sky blue produce identical pages; one would let a
 * near-black brand color land where the design needs a light ground.
 * A third of the way keeps the design's contrast structure while still
 * reading recognizably as the color they chose.
 */
const TONE_DRIFT = 0.35;

/**
 * Rebuild `original` in the client's hue: their hue and chroma, mostly
 * the template's tone. Optionally walked until it clears `ground`.
 */
function recolor(
  original: string,
  brand: string,
  opts: RecolorOptions = {},
): string {
  const base = parseHex(original);
  const from = parseHex(brand);
  if (!base || !from) return original;

  const baseHsl = rgbToHsl(base);
  const brandHsl = rgbToHsl(from);

  const next = toHex(
    hslToRgb({
      h: brandHsl.h,
      s: Math.min(1, brandHsl.s * (opts.satScale ?? 1)),
      l: baseHsl.l + (brandHsl.l - baseHsl.l) * TONE_DRIFT,
    }),
  );

  return opts.ground ? readableOn(next, opts.ground, opts.ratio ?? 4.5) : next;
}

/** "240 163 47" — for `rgb(var(--x) / 0.4)` alpha compositing in CSS. */
function triplet(hex: string): string {
  const rgb = parseHex(hex);
  if (!rgb) return "0 0 0";
  return `${Math.round(rgb.r)} ${Math.round(rgb.g)} ${Math.round(rgb.b)}`;
}

export interface TemplateBrandSpec {
  id: string;
  /** Display name, as it appears in the collection. */
  name: string;
  /** The scope class each template's theme is namespaced under. */
  scope: string;
  /** The palette this template ships with, and the panel resets to. */
  defaults: BrandColors;
  /** One line telling the client where their colors will land here. */
  note: string;
  /** Build the CSS custom properties that carry the client's colors. */
  vars: (c: BrandColors) => Record<string, string>;
}

export const TEMPLATE_BRANDS: TemplateBrandSpec[] = [
  /* ── T1 PRESS — cream paper, black ink, one editorial color ─────── */
  {
    id: "t1",
    name: "Press",
    scope: ".t1-root",
    defaults: { primary: "#d92b21", accent: "#6b675e" },
    note: "A one-color press design — your primary becomes the editorial ink; the accent tints the secondary rules and captions.",
    vars: ({ primary, accent }) => {
      const paperDeep = "#e9e3d4";
      const ink = "#1a1713";

      const red = recolor("#d92b21", primary);
      const stone = recolor("#6b675e", accent, { satScale: 0.5 });

      return {
        "--t1-red": red,
        "--t1-red-rgb": triplet(red),
        // Small mono labels sit on both paper tones; qualify on the darker.
        "--t1-red-ink": recolor("#c02015", primary, {
          ground: paperDeep,
          ratio: 4.5,
        }),
        // The same color again, lifted to survive the footer's ink ground.
        "--t1-red-paper": recolor("#e8564a", primary, {
          ground: ink,
          ratio: 4.5,
        }),
        "--t1-stone": stone,
        "--t1-stone-ink": recolor("#5f5b52", accent, {
          satScale: 0.5,
          ground: paperDeep,
          ratio: 4.5,
        }),
        "--primary-brand": red,
        "--secondary-accent": stone,
      };
    },
  },

  /* ── T2 PRECISION — clinical white, graphite, scan light ────────── */
  {
    id: "t2",
    name: "Precision",
    scope: ".t2p",
    defaults: { primary: "#0369a1", accent: "#38bdf8" },
    note: "Your primary becomes the instrument ink — labels, readouts, active states. The accent becomes the scan light: beams, glows, and the HUD.",
    vars: ({ primary, accent }) => {
      const white = "#ffffff";
      const blue = recolor("#0369a1", primary, { ground: white, ratio: 4.5 });
      const blueDeep = recolor("#075985", primary, {
        ground: white,
        ratio: 5.5,
      });
      const scan = recolor("#38bdf8", accent);
      const scanBright = recolor("#22d3ee", accent);

      return {
        "--t2p-blue": blue,
        "--t2p-blue-deep": blueDeep,
        "--t2p-blue-rgb": triplet(blue),
        "--t2p-scan": scan,
        "--t2p-scan-bright": scanBright,
        "--t2p-scan-dim": alpha(scan, 0.45),
        "--t2p-scan-rgb": triplet(scan),
        "--t2p-duo": `linear-gradient(100deg, ${blue} 0%, ${scanBright} 100%)`,
        "--primary-brand": blue,
        "--secondary-accent": scan,
      };
    },
  },

  /* ── T3 HAVEN — pale sage, moss ink, one warm moment ───────────── */
  {
    id: "t3",
    name: "Haven",
    scope: ".t3-haven",
    defaults: { primary: "#6d8b7d", accent: "#c97e5d" },
    note: "Your primary carries the calm — buttons, rules, and quiet accents. The accent becomes the one warm moment each screen is allowed.",
    vars: ({ primary, accent }) => {
      const sage = "#e8efe3";
      const sand = "#e7e0d2";

      const euc = recolor("#6d8b7d", primary);
      const eucDeep = recolor("#566e61", primary, { ground: sage, ratio: 4.5 });

      return {
        "--t3-euc": euc,
        "--t3-euc-deep": eucDeep,
        // Small type lands on sage and on sand; sand is the harder ground.
        "--t3-euc-ink": recolor("#47594f", primary, {
          ground: sand,
          ratio: 4.5,
        }),
        "--t3-euc-rgb": triplet(euc),
        "--t3-line": alpha(euc, 0.3),
        "--t3-clay": recolor("#c97e5d", accent),
        "--t3-clay-deep": recolor("#9a4e28", accent, {
          ground: sage,
          ratio: 4.5,
        }),
        "--primary-brand": eucDeep,
        "--secondary-accent": recolor("#c97e5d", accent),
      };
    },
  },

  /* ── T4 ATELIER — espresso dark, porcelain salons, brass ────────── */
  {
    id: "t4",
    name: "Atelier",
    scope: ".t4-atelier",
    defaults: { primary: "#c9a56a", accent: "#6e3a30" },
    note: "Your primary replaces the brass — every fitting, rule, and highlight in the dark rooms. The accent becomes the deep warm note.",
    vars: ({ primary, accent }) => {
      const espresso = "#1e1410";
      const porcelain = "#f2eadd";

      const champagne = recolor("#c9a56a", primary, {
        ground: espresso,
        ratio: 4.5,
      });
      const bright = recolor("#e6cb96", primary, {
        ground: espresso,
        ratio: 6,
      });

      return {
        "--t4-champagne": champagne,
        "--t4-champagne-bright": bright,
        // The same brass, re-cut to hold small type on the porcelain rooms.
        "--t4-brass-ink": recolor("#8a6a33", primary, {
          ground: porcelain,
          ratio: 4.5,
        }),
        "--t4-champagne-rgb": triplet(champagne),
        "--t4-line-dark": alpha(champagne, 0.26),
        "--t4-oxblood": recolor("#6e3a30", accent),
        "--primary-brand": champagne,
        "--secondary-accent": bright,
      };
    },
  },

  /* ── T5 MARIGOLD — cream storefront, walnut ink, two sign colors ── */
  {
    id: "t5",
    name: "Marigold",
    scope: ".t5-marigold",
    defaults: { primary: "#f0a32f", accent: "#23655f" },
    note: "Your primary paints the awning — buttons, badges, and sunshine. The accent becomes the second sign color and the footer ground.",
    vars: ({ primary, accent }) => {
      const cream = "#fff6e8";
      const walnut = "#46312a";

      // The awning carries walnut type, so it has to stay light enough.
      const marigold = recolor("#f0a32f", primary, {
        ground: walnut,
        ratio: 4.5,
      });

      return {
        "--t5-marigold": marigold,
        "--t5-marigold-deep": recolor("#b26e0e", primary, {
          ground: cream,
          ratio: 4.5,
        }),
        "--t5-marigold-rgb": triplet(marigold),
        "--t5-teal": recolor("#23655f", accent, { ground: cream, ratio: 4.5 }),
        "--t5-teal-bright": recolor("#37847c", accent),
        // The footer ground — cream type sits on it, so it must stay deep.
        "--t5-teal-deep": recolor("#174a45", accent, {
          ground: cream,
          ratio: 7,
        }),
        "--primary-brand": recolor("#23655f", accent, {
          ground: cream,
          ratio: 4.5,
        }),
        "--secondary-accent": marigold,
      };
    },
  },
];

/**
 * The whole override sheet: one scoped rule per template. Injected as a
 * single <style> so a color change is one style recalculation, and
 * removing the element restores every template to its own palette.
 */
export function buildBrandStylesheet(colors: BrandColors): string {
  return TEMPLATE_BRANDS.map((spec) => {
    const body = Object.entries(spec.vars(colors))
      .map(([prop, value]) => `  ${prop}: ${value};`)
      .join("\n");
    // `:root` prefix outranks the theme file's own `.t1-root { … }` block
    // regardless of stylesheet order, so the override never depends on
    // where Next happens to inject this tag.
    return `:root ${spec.scope} {\n${body}\n}`;
  }).join("\n\n");
}
