import { Young_Serif, DM_Sans, Yellowtail } from "next/font/google";

/**
 * T5 Marigold fonts. Loaded only on T5 routes (and the hub gallery) —
 * apply `t5FontVariables` on the template wrapper element. Swap families
 * here for a client rebrand, but KEEP the CSS variable names.
 */

// T5 Marigold Display - Chunky warm old-style serif, sign-painter charm
export const youngSerif = Young_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-t5-display",
  display: "swap",
});

// T5 Marigold Body - Friendly geometric sans for plainspoken copy
export const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-t5-body",
  display: "swap",
});

// T5 Marigold Script - Brush-lettered accent, one moment per page
export const yellowtail = Yellowtail({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-t5-script",
  display: "swap",
});

export const t5FontVariables = `${youngSerif.variable} ${dmSans.variable} ${yellowtail.variable}`;
