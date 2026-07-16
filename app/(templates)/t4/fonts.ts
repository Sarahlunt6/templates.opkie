import { Bodoni_Moda, Hanken_Grotesk } from "next/font/google";

/**
 * T4 Atelier fonts. Loaded only on T4 routes (and the hub gallery) — apply
 * `t4FontVariables` on the template wrapper element. Swap families here
 * for a client rebrand, but KEEP the CSS variable names.
 */

// T4 Atelier Display - High-contrast Didone for couture headlines
export const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-t4-display",
  display: "swap",
});

// T4 Atelier Body - Quiet, refined grotesque for reading on dark grounds
export const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-t4-body",
  display: "swap",
});

export const t4FontVariables = `${bodoniModa.variable} ${hankenGrotesk.variable}`;
