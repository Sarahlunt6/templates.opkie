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
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  return (
    <>
      {/* Floating Pill Announcement Bar */}
      <div className="fixed top-3 left-1/2 -translate-x-1/2 w-[92%] max-w-7xl h-8 rounded-full bg-[#0f5a53] flex items-center justify-center z-50 shadow-sm">
        <span className="text-[10px] tracking-[0.18em] uppercase font-medium text-white">
          Now Accepting New Patients  •  Same-Day Emergency Appointments Available
        </span>
      </div>

      {/* Floating Capsule "Navigation Island" */}
      <nav
        className="fixed top-14 left-1/2 -translate-x-1/2 w-[92%] max-w-7xl h-20 z-40 bg-white/40 backdrop-blur-2xl saturate-150 border border-white/50 rounded-full shadow-[0_24px_50px_-12px_rgba(15,90,83,0.08)]"
        role="navigation"
        aria-label="Primary navigation"
      >
        <div className="flex items-center justify-between px-8 h-full">
          {/* Logo */}
          <Link href="/t1" className="flex items-center relative z-10">
            <Image
              src="/images/logo-dental.png"
              alt={location.practiceNameGBP}
              width={140}
              height={32}
              className="h-9 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation Links - Elegant Soft Typography */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.slice(0, 1).map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="relative text-[11px] uppercase tracking-[0.2em] font-medium text-slate-800 hover:text-black transition-colors"
                onMouseEnter={() => setHoveredLink(link.label)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {link.label}
                {hoveredLink === link.label && (
                  <motion.div
                    layoutId="nav-island-underline"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-black"
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

            {/* Services Dropdown */}
            <div className="relative group">
              <button
                className="relative text-[11px] uppercase tracking-[0.2em] font-medium text-slate-800 hover:text-black transition-colors flex items-center gap-1.5"
                onMouseEnter={() => setHoveredLink("Services")}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Services
                <svg className="w-3 h-3 transition-transform group-hover:rotate-180 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
                {hoveredLink === "Services" && (
                  <motion.div
                    layoutId="nav-island-underline"
                    className="absolute -bottom-1 left-0 right-8 h-px bg-black"
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

              {/* Elegant Dropdown Panel */}
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
                className="relative text-[11px] uppercase tracking-[0.2em] font-medium text-slate-800 hover:text-black transition-colors"
                onMouseEnter={() => setHoveredLink(link.label)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {link.label}
                {hoveredLink === link.label && (
                  <motion.div
                    layoutId="nav-island-underline"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-black"
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
          </div>

          {/* CTA Systems - Phone + Button */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Phone Text with Icon */}
            <a
              href={`tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
              className="flex items-center gap-2 text-[11px] font-medium text-slate-800 tracking-wide hover:text-[#0f5a53] transition-colors group"
            >
              <svg className="w-3.5 h-3.5 text-slate-700 group-hover:text-[#0f5a53] transition-colors" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span>{location.phoneGBP}</span>
            </a>

            {/* Primary CTA Button - Perfect Pill Shape */}
            <motion.a
              href={clientMasterData.onlineBookingUrl !== "none" ? clientMasterData.onlineBookingUrl : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
              className="rounded-full bg-[#0f5a53] text-white text-[11px] uppercase tracking-[0.2em] font-semibold px-6 py-3 hover:bg-[#0c4842] transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Reserve Consultation
            </motion.a>
          </div>

          {/* Mobile Menu Toggle */}
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
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2.5 rounded-full hover:bg-slate-100 active:bg-slate-200 min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <svg className="w-5 h-5 text-slate-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

            {/* Elegant Drawer Menu */}
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
                  className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 active:bg-slate-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Close menu"
                >
                  <svg className="w-5 h-5 text-slate-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    className="h-9 w-auto"
                  />
                </Link>

                {/* Navigation Links */}
                <nav className="space-y-1">
                  <a
                    href="#"
                    className="block px-4 py-3.5 text-sm font-medium text-slate-800 hover:bg-slate-50 active:bg-slate-100 rounded-xl transition-colors min-h-[48px] flex items-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Home
                  </a>

                  {/* Services Accordion */}
                  <details className="group">
                    <summary className="list-none cursor-pointer px-4 py-3.5 text-sm font-medium text-slate-800 hover:bg-slate-50 active:bg-slate-100 rounded-xl transition-colors flex items-center justify-between min-h-[48px]">
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
                          className="block px-4 py-3 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 active:bg-slate-100 rounded-xl transition-colors min-h-[44px] flex items-center"
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
                      className="block px-4 py-3.5 text-sm font-medium text-slate-800 hover:bg-slate-50 active:bg-slate-100 rounded-xl transition-colors min-h-[48px] flex items-center"
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
                    className="flex items-center justify-center gap-2 w-full px-5 py-4 text-sm font-medium text-slate-800 border-2 border-slate-200 rounded-full hover:bg-slate-50 active:bg-slate-100 transition-colors min-h-[52px]"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    {location.phoneGBP}
                  </a>
                  <a
                    href={clientMasterData.onlineBookingUrl !== "none" ? clientMasterData.onlineBookingUrl : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
                    className="flex items-center justify-center w-full px-5 py-4 bg-[#0f5a53] text-white text-sm font-bold uppercase tracking-wider rounded-full active:scale-[0.98] transition-transform min-h-[52px]"
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
