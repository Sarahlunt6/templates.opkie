"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { clientMasterData } from "@/data/master";

const navLinks = [
  { href: "#", label: "Home" },
  { href: "#technology", label: "Technology" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

const serviceCategories = [
  {
    category: "Advanced Aesthetics",
    services: [
      { href: "#invisalign", label: "Invisalign®", description: "Clear aligner therapy" },
      { href: "#cosmetic", label: "Cosmetic Dentistry", description: "Veneers, bonding & whitening" },
    ],
  },
  {
    category: "Restorative Solutions",
    services: [
      { href: "#implants", label: "Dental Implants", description: "Permanent tooth replacement" },
      { href: "#general", label: "General Dentistry", description: "Cleanings, fillings & exams" },
    ],
  },
  {
    category: "Emergency Care",
    services: [
      { href: "#emergency", label: "Emergency Care", description: "Same-day urgent treatment" },
    ],
  },
];

export default function T2Nav() {
  const location = clientMasterData.locations[0];
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  // Dynamic scroll detection for advanced container mechanics
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-white/5 transition-all duration-700 ease-out ${
        scrolled
          ? "bg-neutral-950/80 backdrop-blur-md py-3"
          : "bg-neutral-950/40 backdrop-blur-md py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/t2" className="flex items-center relative z-10">
            <Image
              src="/images/logo-dental.png"
              alt={location.practiceNameGBP}
              width={160}
              height={36}
              className={`w-auto transition-all duration-700 ${scrolled ? "h-9" : "h-11"} invert`}
              priority
            />
          </Link>

          {/* Desktop Navigation - High-Tech Editorial Typography */}
          <nav className="hidden lg:flex items-center gap-8" role="navigation" aria-label="Primary navigation">
            {navLinks.slice(0, 2).map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="relative text-[11px] uppercase tracking-[0.22em] font-medium text-neutral-300 hover:text-white transition-colors duration-300"
                onMouseEnter={() => setHoveredLink(link.label)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {link.label}
                {hoveredLink === link.label && (
                  <motion.div
                    layoutId="nav-underline-t2"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </motion.a>
            ))}

            {/* Services Dropdown - Sleek Glassmorphic Panel */}
            <div className="relative group">
              <button
                className="relative text-[11px] uppercase tracking-[0.22em] font-medium text-neutral-300 hover:text-white transition-colors duration-300 flex items-center gap-1.5"
                onMouseEnter={() => setHoveredLink("Services")}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Services
                <svg
                  className="w-3 h-3 transition-transform group-hover:rotate-180 duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
                {hoveredLink === "Services" && (
                  <motion.div
                    layoutId="nav-underline-t2"
                    className="absolute -bottom-1 left-0 right-8 h-px bg-gradient-to-r from-transparent via-white to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </button>

              {/* Glassmorphic Structured Grid Dropdown */}
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out">
                <div className="bg-neutral-950/95 backdrop-blur-xl rounded-2xl border border-white/10 p-6 w-[520px] shadow-[0_20px_80px_-15px_rgba(0,0,0,0.8)]">
                  <div className="grid grid-cols-2 gap-6">
                    {serviceCategories.map((category, idx) => (
                      <div key={category.category} className={idx === 2 ? "col-span-2" : ""}>
                        <h3 className="text-[9px] uppercase tracking-[0.25em] font-bold text-neutral-500 mb-3">
                          {category.category}
                        </h3>
                        <div className="space-y-1">
                          {category.services.map((service) => (
                            <a
                              key={service.label}
                              href={service.href}
                              className="group/item block px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors"
                            >
                              <span className="block text-sm font-semibold text-neutral-200 group-hover/item:text-[#0f5a53] transition-colors">
                                {service.label}
                              </span>
                              <span className="block text-xs text-neutral-500 mt-0.5">
                                {service.description}
                              </span>
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {navLinks.slice(2).map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="relative text-[11px] uppercase tracking-[0.22em] font-medium text-neutral-300 hover:text-white transition-colors duration-300"
                onMouseEnter={() => setHoveredLink(link.label)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {link.label}
                {hoveredLink === link.label && (
                  <motion.div
                    layoutId="nav-underline-t2"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </motion.a>
            ))}
          </nav>

          {/* Premium "Book Online" CTA - Refined Luxury Action Element */}
          <div className="hidden lg:block">
            <motion.a
              href={clientMasterData.onlineBookingUrl !== "none" ? clientMasterData.onlineBookingUrl : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
              className="relative px-6 py-2.5 bg-[#0f5a53] text-white text-[11px] uppercase tracking-[0.18em] font-semibold rounded-full overflow-hidden group"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <span className="relative z-10">Book Online</span>
              {/* Boundary Glow Effect */}
              <motion.div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  boxShadow: "0 0 20px rgba(15, 90, 83, 0.6), inset 0 0 20px rgba(15, 90, 83, 0.2)",
                }}
              />
              {/* Subtle Background Scale */}
              <motion.div
                className="absolute inset-0 bg-[#0d4a46] rounded-full"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          </div>

          {/* Mobile Menu */}
          <MobileMenu />
        </div>
      </div>
    </header>
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
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 -mr-3 rounded-lg hover:bg-white/5 active:bg-white/10 min-h-[48px] min-w-[48px] flex items-center justify-center transition-colors"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Dark Drawer Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-neutral-950 shadow-2xl z-50 overflow-y-auto border-l border-white/10"
            >
              <div className="p-6">
                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-6 right-6 p-2 rounded-lg hover:bg-white/5 active:bg-white/10 min-h-[48px] min-w-[48px] flex items-center justify-center"
                  aria-label="Close menu"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Logo */}
                <Link href="/t2" className="block mb-12" onClick={() => setIsOpen(false)}>
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
                    className="block px-4 py-3.5 text-sm font-medium text-neutral-300 hover:text-white hover:bg-white/5 active:bg-white/10 rounded-lg transition-colors min-h-[48px] flex items-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Home
                  </a>
                  <a
                    href="#technology"
                    className="block px-4 py-3.5 text-sm font-medium text-neutral-300 hover:text-white hover:bg-white/5 active:bg-white/10 rounded-lg transition-colors min-h-[48px] flex items-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Technology
                  </a>

                  {/* Services Accordion */}
                  <details className="group">
                    <summary className="list-none cursor-pointer px-4 py-3.5 text-sm font-medium text-neutral-300 hover:text-white hover:bg-white/5 active:bg-white/10 rounded-lg transition-colors flex items-center justify-between min-h-[48px]">
                      Services
                      <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="mt-1 ml-4 space-y-1">
                      {serviceCategories.flatMap(cat => cat.services).map((service) => (
                        <a
                          key={service.label}
                          href={service.href}
                          className="block px-4 py-3 text-sm text-neutral-400 hover:text-white hover:bg-white/5 active:bg-white/10 rounded-lg transition-colors min-h-[44px] flex items-center"
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
                      className="block px-4 py-3.5 text-sm font-medium text-neutral-300 hover:text-white hover:bg-white/5 active:bg-white/10 rounded-lg transition-colors min-h-[48px] flex items-center"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>

                {/* Mobile CTA Section */}
                <div className="mt-8 pt-8 border-t border-white/10">
                  <a
                    href={clientMasterData.onlineBookingUrl !== "none" ? clientMasterData.onlineBookingUrl : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
                    className="flex items-center justify-center w-full px-5 py-4 bg-[#0f5a53] text-white text-sm font-bold uppercase tracking-wider rounded-full active:scale-[0.98] transition-transform min-h-[52px]"
                  >
                    Book Online
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
