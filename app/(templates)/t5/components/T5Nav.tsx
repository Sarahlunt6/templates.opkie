"use client";

import Link from "next/link";
import { clientMasterData } from "@/data/master";

const navLinks = [
  { href: "#", label: "Home" },
  { href: "#", label: "Philosophy" },
  { href: "#", label: "Services" },
  { href: "#", label: "Your Provider" },
  { href: "#", label: "Contact" },
];

export default function T5Nav() {
  const location = clientMasterData.locations[0];

  return (
    <header className="sticky top-[88px] z-50 bg-brand-canvas border-b border-neutral-border">
      <div className="max-w-4xl mx-auto px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Practice Name - Minimal */}
          <Link href="/t5" className="text-sm uppercase tracking-[0.2em] text-brand-mainText hover:text-brand-primary transition-colors">
            {clientMasterData.globalPracticeName}
          </Link>

          {/* Desktop Navigation - Minimal */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-neutral-muted hover:text-brand-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA - Minimal */}
          <a
            href={clientMasterData.onlineBookingUrl !== "none" ? clientMasterData.onlineBookingUrl : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
            className="hidden md:inline-flex items-center gap-2 text-brand-primary text-sm font-medium hover:gap-3 transition-all"
          >
            <span>Book</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>

          {/* Mobile Menu */}
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}

function MobileMenu() {
  const location = clientMasterData.locations[0];

  return (
    <div className="md:hidden">
      <details className="relative">
        <summary className="list-none cursor-pointer p-2">
          <svg className="w-5 h-5 text-brand-mainText" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </summary>
        <div className="absolute right-0 top-full mt-2 w-56 bg-brand-canvas rounded-sm shadow-xl border border-neutral-border py-4 z-50">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block px-6 py-2 text-sm text-neutral-muted hover:text-brand-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="mx-6 my-3 h-px bg-neutral-border" />
          <a
            href={clientMasterData.onlineBookingUrl !== "none" ? clientMasterData.onlineBookingUrl : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
            className="block px-6 py-2 text-sm text-brand-primary font-medium"
          >
            Schedule Consultation
          </a>
        </div>
      </details>
    </div>
  );
}
