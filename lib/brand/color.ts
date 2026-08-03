/* ------------------------------------------------------------------ *
 *  Brand Studio — color math.
 *
 *  A client picks two colors. Each template needs five or six shades of
 *  those colors: a version dark enough to set 12px type on cream, a
 *  version light enough to read on espresso, a hairline at 26% alpha,
 *  a hover state one step brighter. Hand-picked palettes get those by
 *  eye; here they are derived, and derived with contrast checked, so a
 *  client's navy and a client's lime both come out looking art-directed
 *  instead of broken.
 * ------------------------------------------------------------------ */

export interface Rgb {
  r: number;
  g: number;
  b: number;
}
export interface Hsl {
  h: number;
  s: number;
  l: number;
}

/* ---- parsing & formatting ---------------------------------------- */

/** Parse #rgb / #rrggbb (with or without the hash). Null when unparseable. */
export function parseHex(input: string): Rgb | null {
  const hex = input.trim().replace(/^#/, "");
  if (/^[0-9a-f]{3}$/i.test(hex)) {
    return {
      r: parseInt(hex[0] + hex[0], 16),
      g: parseInt(hex[1] + hex[1], 16),
      b: parseInt(hex[2] + hex[2], 16),
    };
  }
  if (/^[0-9a-f]{6}$/i.test(hex)) {
    return {
      r: parseInt(hex.slice(0, 2), 16),
      g: parseInt(hex.slice(2, 4), 16),
      b: parseInt(hex.slice(4, 6), 16),
    };
  }
  return null;
}

/** True when the string is a color we can actually work with. */
export function isValidHex(input: string): boolean {
  return parseHex(input) !== null;
}

/** Normalize any accepted input to lowercase #rrggbb. */
export function normalizeHex(input: string): string | null {
  const rgb = parseHex(input);
  return rgb ? toHex(rgb) : null;
}

const clamp255 = (n: number) => Math.max(0, Math.min(255, Math.round(n)));

export function toHex({ r, g, b }: Rgb): string {
  const part = (n: number) => clamp255(n).toString(16).padStart(2, "0");
  return `#${part(r)}${part(g)}${part(b)}`;
}

/** `rgba(r, g, b, a)` from a hex — for hairlines, glows, and washes. */
export function alpha(hex: string, a: number): string {
  const rgb = parseHex(hex);
  if (!rgb) return `rgba(0, 0, 0, ${a})`;
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${a})`;
}

/* ---- HSL round trip ---------------------------------------------- */

export function rgbToHsl({ r, g, b }: Rgb): Hsl {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  const d = max - min;

  if (d === 0) return { h: 0, s: 0, l };

  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h: number;
  switch (max) {
    case rn:
      h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
      break;
    case gn:
      h = ((bn - rn) / d + 2) / 6;
      break;
    default:
      h = ((rn - gn) / d + 4) / 6;
  }
  return { h, s, l };
}

export function hslToRgb({ h, s, l }: Hsl): Rgb {
  if (s === 0) {
    const v = l * 255;
    return { r: v, g: v, b: v };
  }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const channel = (t: number) => {
    let tt = t;
    if (tt < 0) tt += 1;
    if (tt > 1) tt -= 1;
    if (tt < 1 / 6) return p + (q - p) * 6 * tt;
    if (tt < 1 / 2) return q;
    if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
    return p;
  };
  return {
    r: channel(h + 1 / 3) * 255,
    g: channel(h) * 255,
    b: channel(h - 1 / 3) * 255,
  };
}

/* ---- contrast ----------------------------------------------------- */

function channelLuminance(c: number): number {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

/** WCAG relative luminance, 0 (black) to 1 (white). */
export function luminance(hex: string): number {
  const rgb = parseHex(hex);
  if (!rgb) return 0;
  return (
    0.2126 * channelLuminance(rgb.r) +
    0.7152 * channelLuminance(rgb.g) +
    0.0722 * channelLuminance(rgb.b)
  );
}

/** WCAG contrast ratio between two colors, 1 to 21. */
export function contrast(a: string, b: string): number {
  const la = luminance(a);
  const lb = luminance(b);
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

/** True when `bg` is dark enough that light type belongs on it. */
export function isDark(hex: string): boolean {
  return luminance(hex) < 0.35;
}

/* ---- shade derivation --------------------------------------------- */

/** Move a color's lightness by `delta` (-1..1), preserving hue and saturation. */
export function shift(hex: string, delta: number): string {
  const rgb = parseHex(hex);
  if (!rgb) return hex;
  const hsl = rgbToHsl(rgb);
  return toHex(hslToRgb({ ...hsl, l: Math.max(0, Math.min(1, hsl.l + delta)) }));
}

/** Saturate (or, with a negative amount, mute) without touching lightness. */
export function saturate(hex: string, delta: number): string {
  const rgb = parseHex(hex);
  if (!rgb) return hex;
  const hsl = rgbToHsl(rgb);
  return toHex(hslToRgb({ ...hsl, s: Math.max(0, Math.min(1, hsl.s + delta)) }));
}

/** Blend two colors; `t` of 0 returns `from`, 1 returns `to`. */
export function mix(from: string, to: string, t: number): string {
  const a = parseHex(from);
  const b = parseHex(to);
  if (!a || !b) return from;
  return toHex({
    r: a.r + (b.r - a.r) * t,
    g: a.g + (b.g - a.g) * t,
    b: a.b + (b.b - a.b) * t,
  });
}

/**
 * The workhorse. Walk a color's lightness — down on light grounds, up on
 * dark ones — until it clears `ratio` against `ground`, so small type set
 * in the client's brand color stays legible whatever they pick. Hue and
 * saturation are held, so the result still reads as their color; a mild
 * saturation lift compensates for the lightness the walk costs.
 *
 * Returns the closest attempt when the target is unreachable (a pure
 * yellow can't hit 7:1 on cream without going brown, and going brown is
 * the right answer, so the walk simply runs to its limit).
 */
export function readableOn(
  color: string,
  ground: string,
  ratio = 4.5,
): string {
  if (contrast(color, ground) >= ratio) return color;

  const rgb = parseHex(color);
  if (!rgb) return color;
  const hsl = rgbToHsl(rgb);
  const goDarker = !isDark(ground);
  const step = goDarker ? -0.02 : 0.02;

  let best = color;
  let bestRatio = contrast(color, ground);

  for (let i = 1; i <= 50; i += 1) {
    const l = hsl.l + step * i;
    if (l <= 0 || l >= 1) break;
    // Deep shades wash out; lift saturation slightly as lightness drops.
    const s = Math.min(1, hsl.s + Math.abs(step * i) * 0.35);
    const candidate = toHex(hslToRgb({ h: hsl.h, s, l }));
    const r = contrast(candidate, ground);
    if (r > bestRatio) {
      best = candidate;
      bestRatio = r;
    }
    if (r >= ratio) return candidate;
  }
  return best;
}

/**
 * Pick whichever of two inks reads better on `ground` — used for button
 * labels, where the client's color decides whether the text on top goes
 * paper or ink.
 */
export function inkFor(ground: string, light: string, dark: string): string {
  return contrast(ground, light) >= contrast(ground, dark) ? light : dark;
}
