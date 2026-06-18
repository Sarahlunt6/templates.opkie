"use client";

import Link from "next/link";
import { clientMasterData } from "@/data/master";

const navLinks = [
  { href: "#", label: "Home" },
  { href: "#", label: "First Visit" },
  { href: "#", label: "About" },
  { href: "#", label: "Contact" },
];

const serviceLinks = [
  { href: "#", label: "Invisalign", description: "Clear aligner therapy" },
  { href: "#", label: "Dental Implants", description: "Permanent tooth replacement" },
  { href: "#", label: "Cosmetic Dentistry", description: "Veneers, bonding & whitening" },
  { href: "#", label: "General Dentistry", description: "Cleanings, fillings & exams" },
  { href: "#", label: "Emergency Care", description: "Same-day urgent treatment" },
];

export default function T3Nav() {
  const location = clientMasterData.locations[0];

  return (
    <header className="sticky top-0 z-50 bg-brand-canvas border-b border-neutral-border">
      <div className="max-w-6xl mx-auto px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Practice Name */}
          <Link href="/t3" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center">
              <span className="text-brand-canvas font-bold text-lg">S</span>
            </div>
            <span className="font-bold text-brand-mainText text-lg hidden sm:block">
              {location.practiceNameGBP}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <a
              href="#"
              className="px-4 py-2 text-sm font-medium text-neutral-muted hover:text-brand-mainText hover:bg-brand-primary/10 rounded-full transition-colors"
            >
              Home
            </a>

            {/* Services Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-neutral-muted hover:text-brand-mainText hover:bg-brand-primary/10 rounded-full transition-colors">
                Services
                <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="w-64 bg-brand-canvas rounded-2xl shadow-xl border border-neutral-border py-2">
                  {serviceLinks.map((service) => (
                    <a
                      key={service.label}
                      href={service.href}
                      className="block px-4 py-3 hover:bg-brand-primary/5 transition-colors"
                    >
                      <span className="block text-sm font-medium text-brand-mainText">{service.label}</span>
                      <span className="block text-xs text-neutral-muted mt-0.5">{service.description}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {navLinks.slice(1).map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-neutral-muted hover:text-brand-mainText hover:bg-brand-primary/10 rounded-full transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <a
            href={`tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-primary text-brand-canvas font-semibold text-sm hover:shadow-lg transition-all"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            Call Us
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
        <summary className="list-none cursor-pointer p-2 rounded-full hover:bg-brand-primary/10">
          <svg className="w-6 h-6 text-brand-mainText" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </summary>
        <div className="absolute right-0 top-full mt-2 w-64 bg-brand-canvas rounded-2xl shadow-xl border border-neutral-border py-2 z-50">
          <a href="#" className="block px-4 py-2.5 text-sm font-medium text-neutral-muted hover:text-brand-mainText hover:bg-brand-primary/5 transition-colors">
            Home
          </a>
          <details className="group">
            <summary className="list-none cursor-pointer px-4 py-2.5 text-sm font-medium text-neutral-muted hover:text-brand-mainText hover:bg-brand-primary/5 transition-colors flex items-center justify-between">
              Services
              <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="bg-brand-primary/5 py-1">
              {serviceLinks.map((service) => (
                <a
                  key={service.label}
                  href={service.href}
                  className="block px-6 py-2 text-sm text-neutral-muted hover:text-brand-mainText transition-colors"
                >
                  {service.label}
                </a>
              ))}
            </div>
          </details>
          {navLinks.slice(1).map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block px-4 py-2.5 text-sm font-medium text-neutral-muted hover:text-brand-mainText hover:bg-brand-primary/5 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <hr className="my-2 border-neutral-border" />
          <a
            href={`tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
            className="block mx-2 px-4 py-2.5 text-sm font-semibold text-center rounded-full bg-brand-primary text-brand-canvas"
          >
            Call {location.phoneGBP}
          </a>
        </div>
      </details>
    </div>
  );
}
