import { Outfit, Newsreader } from "next/font/google";

/**
 * T3 Haven fonts. Loaded only on T3 routes (and the hub gallery) — apply
 * `t3FontVariables` on the template wrapper element. Swap families here
 * for a client rebrand, but KEEP the CSS variable names.
 */

// T3 Zen Sanctuary - Soft, calming sans for wellness focus
export const outfit = Outfit({
  subsets: ["latin"],
  weight: ["200", "300", "400"],
  variable: "--font-sanctuary",
  display: "swap",
});

// T3 Serif Accent - Soft italic serif for quotes and emphasized words
export const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-t3-serif",
  display: "swap",
});

export const t3FontVariables = `${outfit.variable} ${newsreader.variable}`;
