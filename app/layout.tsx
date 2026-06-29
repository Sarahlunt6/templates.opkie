import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Space_Grotesk, Outfit } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Dental Template Hub | Professional Practice Layouts",
  description:
    "Evaluate 5 conversion-optimized dental website templates. Review structure, hierarchy, and conversion pathways before customizing with your practice branding.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorantGaramond.variable} ${spaceGrotesk.variable} ${outfit.variable}`}>
      <body className="min-h-screen bg-brand-canvas text-brand-mainText antialiased">
        <PageTransition>
          {children}
        </PageTransition>
        <ChatConcierge />
      </body>
    </html>
  );
}
