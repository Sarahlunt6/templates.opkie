"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clientMasterData } from "@/data/master";

const navLinks = [
  { href: "#", label: "Home" },
  { href: "#", label: "Services" },
  { href: "#", label: "Gallery" },
  { href: "#", label: "About" },
  { href: "#", label: "Contact" },
];

export default function T4Nav() {
  const pathname = usePathname();
  const location = clientMasterData.locations[0];

  return (
    <header className="sticky top-[88px] z-50 bg-brand-canvas border-b border-neutral-border">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Practice Name */}
          <Link href="/t4" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center">
              <span className="text-brand-canvas font-bold text-lg">S</span>
            </div>
            <span className="font-bold text-brand-mainText text-lg hidden sm:block">
              {location.practiceNameGBP}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? "bg-brand-primary text-brand-canvas"
                      : "text-neutral-muted hover:text-brand-mainText hover:bg-brand-primary/10"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA Button */}
          <a
            href={clientMasterData.onlineBookingUrl}
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-primary text-brand-canvas font-semibold text-sm hover:shadow-lg transition-all"
          >
            Book Consultation
          </a>

          {/* Mobile Menu Button */}
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}

function MobileMenu() {
  const pathname = usePathname();

  return (
    <div className="md:hidden">
      <details className="relative">
        <summary className="list-none cursor-pointer p-2 rounded-lg hover:bg-brand-primary/10">
          <svg
            className="w-6 h-6 text-brand-mainText"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </summary>
        <div className="absolute right-0 top-full mt-2 w-48 bg-brand-canvas rounded-xl shadow-xl border border-neutral-border py-2 z-50">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-brand-primary/10 text-brand-primary"
                    : "text-neutral-muted hover:text-brand-mainText hover:bg-brand-primary/5"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <hr className="my-2 border-neutral-border" />
          <a
            href={clientMasterData.onlineBookingUrl}
            className="block mx-2 px-4 py-2.5 text-sm font-semibold text-center rounded-lg bg-brand-primary text-brand-canvas"
          >
            Book Consultation
          </a>
        </div>
      </details>
    </div>
  );
}
