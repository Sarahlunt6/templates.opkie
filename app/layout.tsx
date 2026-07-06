import type { Metadata } from "next";
import {
  Inter,
  Cormorant_Garamond,
  Space_Grotesk,
  Outfit,
  Fraunces,
  JetBrains_Mono,
  Newsreader,
  Anton,
  Courier_Prime,
} from "next/font/google";
import "./globals.css";
import PageTransition from "@/components/premium/PageTransition";
import ChatConcierge from "@/components/interactive/ChatConcierge";

// Universal Body Text - Highly legible clean paragraphs
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// T1 Editorial - Elegant serif for luxury presence
const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-prestige",
  display: "swap",
});

// T2 Modern Innovator - Clean geometric sans for tech-forward aesthetics
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-innovator",
  display: "swap",
});

// T3 Zen Sanctuary - Soft, calming sans for wellness focus
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["200", "300", "400"],
  variable: "--font-sanctuary",
  display: "swap",
});

// T1 Editorial Display - Characterful optical serif for magazine mastheads
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-t1-display",
  display: "swap",
});

// T2 Telemetry - Monospace for data labels, specs, and HUD readouts
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-t2-mono",
  display: "swap",
});

// T3 Serif Accent - Soft italic serif for quotes and emphasized words
const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-t3-serif",
  display: "swap",
});

// T1 Press Display - Heavy condensed sans for giant editorial wordmarks
const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-t1-press",
  display: "swap",
});

// T1 Press Labels - Typewriter mono for bracket indexes and captions
const courierPrime = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-t1-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Opkie Collection — Three Website Concepts for Your Practice",
  description:
    "Three dental homepage concepts — editorial luxury, cinematic technology, and organic calm. Choose the one that feels like your practice; Opkie tailors every word, photograph, color, and detail to your practice.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorantGaramond.variable} ${spaceGrotesk.variable} ${outfit.variable} ${fraunces.variable} ${jetbrainsMono.variable} ${newsreader.variable} ${anton.variable} ${courierPrime.variable}`}>
      <body className="min-h-screen bg-brand-canvas text-brand-mainText antialiased">
        <PageTransition>
          {children}
        </PageTransition>
        <ChatConcierge />
      </body>
    </html>
  );
}
