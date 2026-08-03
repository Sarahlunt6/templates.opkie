import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ChatConcierge from "@/components/interactive/ChatConcierge";
import BrandStudioProvider from "@/components/brand/BrandStudioProvider";
import BrandStudioPanel from "@/components/brand/BrandStudioPanel";

// Universal Body Text - Highly legible clean paragraphs.
// Template display fonts intentionally do NOT load here — each template's
// fonts.ts module loads its own families and the template wrapper applies
// their CSS-variable classes, so a page only downloads the fonts it uses.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Opkie Collection — Five Website Concepts for Your Practice",
  description:
    "Five dental homepage concepts — bold print editorial, porcelain-lab precision, organic calm, after-dark couture, and main-street retro. Choose the one that feels like your practice; Opkie tailors every word, photograph, color, and detail to your practice.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-brand-canvas text-brand-mainText antialiased">
        {/* The brand studio wraps the whole collection so a client's colors
            and logo follow them from the hub into any template and back. */}
        <BrandStudioProvider>
          {children}
          <ChatConcierge />
          <BrandStudioPanel />
        </BrandStudioProvider>
      </body>
    </html>
  );
}
