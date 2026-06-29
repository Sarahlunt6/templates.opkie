"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { clientMasterData } from "@/data/master";

const navLinks = [
  { href: "#", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

const serviceCategories = [
  {
    category: "Smile Enhancement",
    services: [
      { href: "#invisalign", label: "Invisalign®", description: "Clear aligner therapy" },
      { href: "#cosmetic", label: "Cosmetic Dentistry", description: "Veneers, bonding & whitening" },
    ],
  },
  {
    category: "Restorative Care",
    services: [
      { href: "#implants", label: "Dental Implants", description: "Permanent tooth replacement" },
      { href: "#general", label: "General Dentistry", description: "Cleanings, fillings & exams" },
    ],
  },
  {
    category: "Urgent Care",
    services: [
      { href: "#emergency", label: "Emergency Care", description: "Same-day urgent treatment" },
    ],
  },
];

export default function T1Nav() {
  const location = clientMasterData.locations[0];
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  // Intelligent scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b border-slate-100/60 transition-all duration-500 ease-out ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/t1" className="flex items-center relative z-10">
            <Image
              src="/images/logo-dental.png"
              alt={location.practiceNameGBP}
              width={160}
              height={36}
              className={`w-auto transition-all duration-500 ${scrolled ? "h-10" : "h-12"}`}
              priority
            />
          </Link>

          {/* Desktop Navigation - Editorial Typography */}
          <nav className="hidden lg:flex items-center gap-8" role="navigation" aria-label="Primary navigation">
            {navLinks.slice(0, 1).map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="relative text-xs uppercase tracking-[0.18em] font-medium text-slate-700 hover:text-slate-900 transition-colors"
                onMouseEnter={() => setHoveredLink(link.label)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {link.label}
                {hoveredLink === link.label && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-slate-900"
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

            {/* Bento Services Dropdown */}
            <div className="relative group">
              <button
                className="relative text-xs uppercase tracking-[0.18em] font-medium text-slate-700 hover:text-slate-900 transition-colors flex items-center gap-1.5"
                onMouseEnter={() => setHoveredLink("Services")}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Services
                <svg className="w-3 h-3 transition-transform group-hover:rotate-180 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
                {hoveredLink === "Services" && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-8 h-px bg-slate-900"
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

              {/* Elegant Multi-Column Bento Dropdown */}
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out">
                <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-100 p-6 w-[520px]">
                  <div className="grid grid-cols-2 gap-6">
                    {serviceCategories.map((category, idx) => (
                      <div key={category.category} className={idx === 2 ? "col-span-2" : ""}>
                        <h3 className="text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-400 mb-3">
                          {category.category}
                        </h3>
                        <div className="space-y-1">
                          {category.services.map((service) => (
                            <a
                              key={service.label}
                              href={service.href}
                              className="group/item block px-3 py-2.5 rounded-lg hover:bg-slate-50 transition-colors"
                            >
                              <span className="block text-sm font-semibold text-slate-800 group-hover/item:text-[#0f5a53] transition-colors">
                                {service.label}
                              </span>
                              <span className="block text-xs text-slate-500 mt-0.5">
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

            {navLinks.slice(1).map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="relative text-xs uppercase tracking-[0.18em] font-medium text-slate-700 hover:text-slate-900 transition-colors"
                onMouseEnter={() => setHoveredLink(link.label)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {link.label}
                {hoveredLink === link.label && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-slate-900"
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

          {/* Premium Action Block - Split CTA */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Phone Text with Icon */}
            <a
              href={`tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
              className="flex items-center gap-2 text-sm font-medium text-slate-800 tracking-wide hover:text-[#0f5a53] transition-colors group"
            >
              <svg className="w-4 h-4 text-slate-600 group-hover:text-[#0f5a53] transition-colors" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span>{location.phoneGBP}</span>
            </a>

            {/* High-Ticket CTA Button */}
            <motion.a
              href={clientMasterData.onlineBookingUrl !== "none" ? clientMasterData.onlineBookingUrl : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
              className="relative px-6 py-3 bg-[#0f5a53] text-white text-xs uppercase tracking-[0.15em] font-bold rounded-lg overflow-hidden group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <span className="relative z-10">Reserve Consultation</span>
              {/* Shimmer Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
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
        className="p-3 -mr-3 rounded-lg hover:bg-slate-100 active:bg-slate-200 min-h-[48px] min-w-[48px] flex items-center justify-center transition-colors"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <svg className="w-6 h-6 text-slate-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Mobile Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-6">
                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-6 right-6 p-2 rounded-lg hover:bg-slate-100 active:bg-slate-200 min-h-[48px] min-w-[48px] flex items-center justify-center"
                  aria-label="Close menu"
                >
                  <svg className="w-6 h-6 text-slate-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Logo */}
                <Link href="/t1" className="block mb-12" onClick={() => setIsOpen(false)}>
                  <Image
                    src="/images/logo-dental.png"
                    alt={location.practiceNameGBP}
                    width={140}
                    height={32}
                    className="h-10 w-auto"
                  />
                </Link>

                {/* Navigation Links */}
                <nav className="space-y-1">
                  <a
                    href="#"
                    className="block px-4 py-3.5 text-sm font-medium text-slate-800 hover:bg-slate-50 active:bg-slate-100 rounded-lg transition-colors min-h-[48px] flex items-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Home
                  </a>

                  {/* Services Accordion */}
                  <details className="group">
                    <summary className="list-none cursor-pointer px-4 py-3.5 text-sm font-medium text-slate-800 hover:bg-slate-50 active:bg-slate-100 rounded-lg transition-colors flex items-center justify-between min-h-[48px]">
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
                          className="block px-4 py-3 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 active:bg-slate-100 rounded-lg transition-colors min-h-[44px] flex items-center"
                          onClick={() => setIsOpen(false)}
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
                      className="block px-4 py-3.5 text-sm font-medium text-slate-800 hover:bg-slate-50 active:bg-slate-100 rounded-lg transition-colors min-h-[48px] flex items-center"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>

                {/* Mobile CTA Section */}
                <div className="mt-8 pt-8 border-t border-slate-100 space-y-3">
                  <a
                    href={`tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
                    className="flex items-center justify-center gap-2 w-full px-5 py-4 text-sm font-medium text-slate-800 border-2 border-slate-200 rounded-lg hover:bg-slate-50 active:bg-slate-100 transition-colors min-h-[52px]"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    {location.phoneGBP}
                  </a>
                  <a
                    href={clientMasterData.onlineBookingUrl !== "none" ? clientMasterData.onlineBookingUrl : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
                    className="flex items-center justify-center w-full px-5 py-4 bg-[#0f5a53] text-white text-sm font-bold uppercase tracking-wider rounded-lg active:scale-[0.98] transition-transform min-h-[52px]"
                  >
                    Reserve Consultation
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
