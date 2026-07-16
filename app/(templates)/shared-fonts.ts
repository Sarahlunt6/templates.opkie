import { Cormorant_Garamond } from "next/font/google";

/**
 * Legacy shared display serif (`font-serif` / `font-prestige`) used by the
 * o1 ortho template and older shared sections. Kept out of the root layout
 * so t1–t5 pages don't pay for it.
 */
export const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-prestige",
  display: "swap",
});

export const prestigeFontVariable = cormorantGaramond.variable;
