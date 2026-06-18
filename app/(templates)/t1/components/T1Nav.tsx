"use client";

import Link from "next/link";
import { clientMasterData } from "@/data/master";

const navLinks = [
  { href: "#", label: "Home" },
  { href: "#", label: "Services" },
  { href: "#", label: "About" },
  { href: "#", label: "Reviews" },
  { href: "#", label: "Contact" },
];

export default function T1Nav() {
  const location = clientMasterData.locations[0];

  return (
    <header className="sticky top-[88px] z-50 bg-brand-canvas border-b border-neutral-border">
      <div className="max-w-6xl mx-auto px-8 lg:px-16">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Practice Name */}
          <Link href="/t1" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-brand-primary flex items-center justify-center">
              <span className="text-brand-canvas font-bold text-lg font-serif">S</span>
            </div>
            <span className="font-bold text-brand-mainText text-lg hidden sm:block font-serif">
              {location.practiceNameGBP}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-neutral-muted hover:text-brand-mainText hover:bg-brand-primary/10 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <a
            href={`tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-primary text-brand-canvas font-semibold text-sm hover:brightness-110 transition-all"
          >
            {location.phoneGBP}
          </a>

          {/* Mobile Menu */}
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}

function MobileMenu() {
  return (
    <div className="md:hidden">
      <details className="relative">
        <summary className="list-none cursor-pointer p-2 rounded-lg hover:bg-brand-primary/10">
          <svg className="w-6 h-6 text-brand-mainText" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </summary>
        <div className="absolute right-0 top-full mt-2 w-48 bg-brand-canvas rounded-xl shadow-xl border border-neutral-border py-2 z-50">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block px-4 py-2.5 text-sm font-medium text-neutral-muted hover:text-brand-mainText hover:bg-brand-primary/5 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </details>
    </div>
  );
}
