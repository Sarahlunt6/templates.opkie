"use client";

import Link from "next/link";
import Image from "next/image";
import { clientMasterDataOrtho } from "@/data/master-ortho";

const navLinks = [
  { href: "#", label: "Home" },
  { href: "#", label: "Technology" },
  { href: "#", label: "About" },
  { href: "#", label: "Contact" },
];

const serviceLinks = [
  { href: "#", label: "Invisalign", description: "Clear aligner therapy" },
  { href: "#", label: "Traditional Braces", description: "Metal & ceramic options" },
  { href: "#", label: "Teen Orthodontics", description: "Braces designed for teens" },
  { href: "#", label: "Adult Orthodontics", description: "It's never too late for a great smile" },
  { href: "#", label: "Early Treatment", description: "Phase 1 interceptive care" },
];

export default function T2OrthoNav() {
  const location = clientMasterDataOrtho.locations[0];

  return (
    <header className="sticky top-0 z-50 bg-brand-canvas/95 backdrop-blur-sm border-b border-neutral-border">
      <div className="max-w-6xl mx-auto px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/t2-ortho" className="flex items-center">
            <Image
              src="/images/logo-ortho.png"
              alt={location.practiceNameGBP}
              width={180}
              height={40}
              className="h-8 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <a
              href="#"
              className="px-4 py-2 text-sm font-medium text-neutral-muted hover:text-brand-primary rounded-lg transition-colors"
            >
              Home
            </a>
            <a
              href="#"
              className="px-4 py-2 text-sm font-medium text-neutral-muted hover:text-brand-primary rounded-lg transition-colors"
            >
              Technology
            </a>

            {/* Services Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-neutral-muted hover:text-brand-primary rounded-lg transition-colors">
                Treatments
                <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="w-64 bg-brand-canvas rounded-xl shadow-xl border border-neutral-border py-2">
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
                className="px-4 py-2 text-sm font-medium text-neutral-muted hover:text-brand-primary rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <a
            href={clientMasterDataOrtho.onlineBookingUrl}
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-primary text-brand-canvas font-semibold text-sm hover:brightness-110 transition-all"
          >
            Book Online
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
        <div className="absolute right-0 top-full mt-2 w-64 bg-brand-canvas rounded-xl shadow-xl border border-neutral-border py-2 z-50">
          <a href="#" className="block px-4 py-2.5 text-sm font-medium text-neutral-muted hover:text-brand-primary hover:bg-brand-primary/5 transition-colors">
            Home
          </a>
          <a href="#" className="block px-4 py-2.5 text-sm font-medium text-neutral-muted hover:text-brand-primary hover:bg-brand-primary/5 transition-colors">
            Technology
          </a>
          <details className="group">
            <summary className="list-none cursor-pointer px-4 py-2.5 text-sm font-medium text-neutral-muted hover:text-brand-primary hover:bg-brand-primary/5 transition-colors flex items-center justify-between">
              Treatments
              <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="bg-brand-primary/5 py-1">
              {serviceLinks.map((service) => (
                <a
                  key={service.label}
                  href={service.href}
                  className="block px-6 py-2 text-sm text-neutral-muted hover:text-brand-primary transition-colors"
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
              className="block px-4 py-2.5 text-sm font-medium text-neutral-muted hover:text-brand-primary hover:bg-brand-primary/5 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <hr className="my-2 border-neutral-border" />
          <a
            href={clientMasterDataOrtho.onlineBookingUrl}
            className="block mx-2 px-4 py-2.5 text-sm font-semibold text-center rounded-lg bg-brand-primary text-brand-canvas"
          >
            Book Online
          </a>
        </div>
      </details>
    </div>
  );
}
