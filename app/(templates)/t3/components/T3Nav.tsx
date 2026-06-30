"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
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

export default function T3Nav() {
  const location = clientMasterData.locations[0];
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  return (
    <>
      {/* Architectural "Segmented Glass Dock" */}
      <nav className="fixed top-4 left-4 right-4 lg:top-6 lg:left-1/2 lg:-translate-x-1/2 lg:w-[90%] max-w-7xl z-[100] bg-white/80 backdrop-blur-md border border-slate-200/40 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.04)] p-3">
        <div className="flex items-center justify-between px-6 w-full">
          {/* Logo - Asymmetric placement */}
          <Link href="/t3" className="flex items-center relative">
            <Image
              src="/images/logo-dental.png"
              alt={clientMasterData.globalPracticeName}
              width={160}
              height={36}
              className="h-9 w-auto invert"
              priority
            />
          </Link>

          {/* Desktop Navigation - Segmented Link Layout */}
          <div className="hidden md:flex items-center gap-8">
            <motion.a
              href="#"
              className="relative text-[11px] uppercase tracking-[0.2em] font-medium text-slate-700 hover:text-black transition-colors"
              onMouseEnter={() => setHoveredLink("Home")}
              onMouseLeave={() => setHoveredLink(null)}
            >
              Home
              {hoveredLink === "Home" && (
                <motion.div
                  layoutId="nav-underline-t3"
                  className="absolute -bottom-1 left-0 right-0 h-px bg-black"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.a>

            <motion.a
              href="#"
              className="relative text-[11px] uppercase tracking-[0.2em] font-medium text-slate-700 hover:text-black transition-colors"
              onMouseEnter={() => setHoveredLink("Philosophy")}
              onMouseLeave={() => setHoveredLink(null)}
            >
              Philosophy
              {hoveredLink === "Philosophy" && (
                <motion.div
                  layoutId="nav-underline-t3"
                  className="absolute -bottom-1 left-0 right-0 h-px bg-black"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.a>

            {/* Services Dropdown - Mindful Hover Panel */}
            <div className="relative group">
              <button
                className="relative text-[11px] uppercase tracking-[0.2em] font-medium text-slate-700 hover:text-black transition-colors flex items-center gap-2"
                onMouseEnter={() => setHoveredLink("Services")}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Services
                <svg className="w-3 h-3 transition-transform group-hover:rotate-180 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                {hoveredLink === "Services" && (
                  <motion.div
                    layoutId="nav-underline-t3"
                    className="absolute -bottom-1 left-0 right-8 h-px bg-black"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </button>

              {/* Serene Dropdown Panel */}
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 ease-out">
                <div className="w-72 bg-brand-canvas/98 backdrop-blur-xl border border-neutral-border/50 shadow-2xl py-2">
                  {serviceLinks.map((service) => (
                    <a
                      key={service.label}
                      href={service.href}
                      className="block px-6 py-4 hover:bg-brand-primary/5 transition-colors duration-300"
                    >
                      <span className="block text-sm font-light text-brand-mainText tracking-wide mb-1">{service.label}</span>
                      <span className="block text-[11px] text-neutral-muted tracking-wide">{service.description}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {navLinks.slice(2).map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="relative text-[11px] uppercase tracking-[0.2em] font-medium text-slate-700 hover:text-black transition-colors"
                onMouseEnter={() => setHoveredLink(link.label)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {link.label}
                {hoveredLink === link.label && (
                  <motion.div
                    layoutId="nav-underline-t3"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-black"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.a>
            ))}

            {/* Internal Structural Divider */}
            <div className="w-px h-6 bg-slate-200/80 mx-2" />
          </div>

          {/* High-Contrast Matte CTA Block */}
          <motion.a
            href={clientMasterData.onlineBookingUrl !== "none" ? clientMasterData.onlineBookingUrl : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
            className="hidden md:inline-flex items-center gap-2 bg-neutral-900 text-white text-[11px] uppercase tracking-[0.18em] font-medium px-6 py-3 rounded-xl hover:bg-black transition-all duration-300 shadow-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <span>Book Now</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>

          {/* Mobile Menu */}
          <MobileMenu />
        </div>
      </nav>
    </>
  );
}

function MobileMenu() {
  const location = clientMasterData.locations[0];
  const [isOpen, setIsOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 -mr-3 hover:bg-brand-primary/10 active:bg-brand-primary/15 min-h-[48px] min-w-[48px] flex items-center justify-center transition-colors duration-300"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <svg className="w-5 h-5 text-brand-mainText" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-neutral-900/30 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Mindful Drawer Menu */}
          <div className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-brand-canvas shadow-2xl z-50 overflow-y-auto border-l border-neutral-border">
            <div className="p-6">
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 p-2 hover:bg-brand-primary/10 active:bg-brand-primary/15 min-h-[48px] min-w-[48px] flex items-center justify-center transition-colors duration-300"
                aria-label="Close menu"
              >
                <svg className="w-5 h-5 text-brand-mainText" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Logo */}
              <Link href="/t3" className="block mb-12" onClick={() => setIsOpen(false)}>
                <Image
                  src="/images/logo-dental.png"
                  alt={location.practiceNameGBP}
                  width={140}
                  height={32}
                  className="h-10 w-auto invert"
                />
              </Link>

              {/* Navigation Links */}
              <nav className="space-y-1">
                <a
                  href="#"
                  className="block px-4 py-3.5 text-sm font-light text-neutral-muted hover:text-brand-primary active:bg-brand-primary/10 transition-colors duration-300 min-h-[48px] flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </a>
                <a
                  href="#"
                  className="block px-4 py-3.5 text-sm font-light text-neutral-muted hover:text-brand-primary active:bg-brand-primary/10 transition-colors duration-300 min-h-[48px] flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  Philosophy
                </a>

                {/* Services Accordion */}
                <details className="group">
                  <summary className="list-none cursor-pointer px-4 py-3.5 text-sm font-light text-neutral-muted hover:text-brand-primary active:bg-brand-primary/10 transition-colors duration-300 flex items-center justify-between min-h-[48px]">
                    Services
                    <svg className="w-4 h-4 transition-transform group-open:rotate-180 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="mt-1 ml-4 space-y-1">
                    {serviceLinks.map((service) => (
                      <a
                        key={service.label}
                        href={service.href}
                        className="block px-4 py-3 text-sm font-light text-neutral-muted hover:text-brand-primary active:bg-brand-primary/10 transition-colors duration-300 min-h-[44px] flex items-center"
                        onClick={() => setIsOpen(false)}
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
                    className="block px-4 py-3.5 text-sm font-light text-neutral-muted hover:text-brand-primary active:bg-brand-primary/10 transition-colors duration-300 min-h-[48px] flex items-center"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              {/* Mobile CTA Section */}
              <div className="mt-8 pt-8 border-t border-neutral-border/50">
                <a
                  href={clientMasterData.onlineBookingUrl !== "none" ? clientMasterData.onlineBookingUrl : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
                  className="flex items-center justify-center gap-3 w-full px-5 py-4 text-sm font-light text-brand-primary border border-brand-primary/30 active:bg-brand-primary/10 active:scale-[0.98] transition-all duration-300 min-h-[52px] uppercase tracking-[0.2em]"
                >
                  Begin Your Journey
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
