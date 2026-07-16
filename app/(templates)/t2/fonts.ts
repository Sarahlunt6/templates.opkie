import { Sora, JetBrains_Mono } from "next/font/google";

/**
 * T2 Precision fonts. Loaded only on T2 routes (and the hub gallery) —
 * apply `t2FontVariables` on the template wrapper element. Swap families
 * here for a client rebrand, but KEEP the CSS variable names.
 */

// T2 Modern Innovator - Precise geometric sans for a professional, tech-forward feel
export const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-innovator",
  display: "swap",
});

// T2 Telemetry - Monospace for data labels, specs, and HUD readouts
export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-t2-mono",
  display: "swap",
});

export const t2FontVariables = `${sora.variable} ${jetbrainsMono.variable}`;
