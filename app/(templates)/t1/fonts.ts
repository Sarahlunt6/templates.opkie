import { Fraunces, Anton, Courier_Prime } from "next/font/google";

/**
 * T1 Press fonts. Loaded only on T1 routes (and the hub gallery) so other
 * templates don't pay for them — apply `t1FontVariables` on the template
 * wrapper element. Swap families here for a client rebrand, but KEEP the
 * CSS variable names.
 */

// T1 Editorial Display - Characterful optical serif for magazine mastheads
export const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-t1-display",
  display: "swap",
});

// T1 Press Display - Heavy condensed sans for giant editorial wordmarks
export const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-t1-press",
  display: "swap",
});

// T1 Press Labels - Typewriter mono for bracket indexes and captions
export const courierPrime = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-t1-mono",
  display: "swap",
});

export const t1FontVariables = `${fraunces.variable} ${anton.variable} ${courierPrime.variable}`;
