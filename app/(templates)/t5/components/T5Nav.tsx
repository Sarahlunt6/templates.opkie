"use client";

import Link from "next/link";
import { clientMasterData } from "@/data/master";

const navLinks = [
  { href: "#", label: "Home" },
  { href: "#", label: "Philosophy" },
  { href: "#", label: "Your Provider" },
  { href: "#", label: "Contact" },
];

const serviceLinks = [
  { href: "#", label: "Invisalign", description: "Clear aligner therapy" },
  { href: "#", label: "Dental Implants", description: "Permanent tooth replacement" },
  { href: "#", label: "Cosmetic Dentistry", description: "Veneers, bonding & whitening" },
  { href: "#", label: "Holistic Dentistry", description: "Natural, biocompatible care" },
  { href: "#", label: "Restorative Care", description: "Crowns, bridges & fillings" },
];

export default function T5Nav() {
  const location = clientMasterData.locations[0];

  return (
    <header className="sticky top-0 z-50 bg-brand-canvas border-b border-neutral-border">
      <div className="max-w-4xl mx-auto px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Practice Name - Minimal */}
          <Link href="/t5" className="text-sm uppercase tracking-[0.2em] text-brand-mainText hover:text-brand-primary transition-colors">
            {clientMasterData.globalPracticeName}
          </Link>

          {/* Desktop Navigation - Minimal */}
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#"
              className="text-sm text-neutral-muted hover:text-brand-primary transition-colors"
            >
              Home
            </a>
            <a
              href="#"
              className="text-sm text-neutral-muted hover:text-brand-primary transition-colors"
            >
              Philosophy
            </a>

            {/* Services Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-sm text-neutral-muted hover:text-brand-primary transition-colors">
                Services
                <svg className="w-3 h-3 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="w-64 bg-brand-canvas shadow-xl border border-neutral-border py-2">
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

            {navLinks.slice(2).map((link) => (
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
        <div className="absolute right-0 top-full mt-2 w-64 bg-brand-canvas shadow-xl border border-neutral-border py-4 z-50">
          <a href="#" className="block px-6 py-2 text-sm text-neutral-muted hover:text-brand-primary transition-colors">
            Home
          </a>
          <a href="#" className="block px-6 py-2 text-sm text-neutral-muted hover:text-brand-primary transition-colors">
            Philosophy
          </a>
          <details className="group">
            <summary className="list-none cursor-pointer px-6 py-2 text-sm text-neutral-muted hover:text-brand-primary transition-colors flex items-center justify-between">
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
                  className="block px-8 py-2 text-sm text-neutral-muted hover:text-brand-primary transition-colors"
                >
                  {service.label}
                </a>
              ))}
            </div>
          </details>
          {navLinks.slice(2).map((link) => (
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
