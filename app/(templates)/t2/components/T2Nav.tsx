"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { clientMasterData } from "@/data/master";

const navLinks = [
  { href: "#", label: "Home" },
  { href: "#technology", label: "Technology" },
  { href: "#services", label: "Services" },
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
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  // Scroll detection hook
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Floating "Smoked Obsidian" Capsule Island */}
      <motion.nav
        className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl h-16 z-50 rounded-full transition-all duration-500"
        style={{
          backgroundColor: scrolled ? "rgba(10,10,10,0.80)" : "rgba(10,10,10,0.40)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.10)",
          boxShadow: scrolled
            ? "0 20px 60px rgba(0,0,0,0.6), 0 0 1px rgba(255,255,255,0.1) inset"
            : "0 12px 40px rgba(0,0,0,0.5), 0 0 1px rgba(255,255,255,0.08) inset",
        }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        role="navigation"
        aria-label="Primary navigation"
      >
        <div className="flex items-center justify-between px-6 h-full">
          {/* Logo */}
          <Link href="/t2" className="flex items-center relative z-10">
            <Image
              src="/images/logo-dental.png"
              alt={location.practiceNameGBP}
              width={160}
              height={36}
              className="h-8 w-auto brightness-0 invert"
              priority
            />
          </Link>

          {/* Desktop Navigation - High-Precision Digital Typography */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="relative text-[10px] uppercase tracking-[0.25em] font-semibold text-neutral-300 hover:text-white transition-colors duration-300"
                onMouseEnter={() => setHoveredLink(link.label)}
                onMouseLeave={() => setHoveredLink(null)}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                {link.label}
                {hoveredLink === link.label && (
                  <motion.div
                    layoutId="nav-underline-t2"
                    className="absolute -bottom-1 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent"
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    exit={{ opacity: 0, scaleX: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 35,
                    }}
                  />
                )}
              </motion.a>
            ))}
          </div>

          {/* High-Ticket Cyber Pill CTA */}
          <motion.a
            href={clientMasterData.onlineBookingUrl !== "none" ? clientMasterData.onlineBookingUrl : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
            className="hidden lg:inline-flex items-center text-[10px] uppercase tracking-[0.2em] font-semibold text-white bg-white/5 border border-white/10 rounded-full px-5 py-2.5 hover:bg-white/10 hover:border-teal-500/50 transition-all duration-300 shadow-[0_0_15px_rgba(20,184,166,0.15)] backdrop-blur-sm"
            style={{
              textShadow: "0 0 10px rgba(255,255,255,0.1)",
            }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 0 20px rgba(20,184,166,0.3), inset 0 0 20px rgba(20,184,166,0.05)"
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            Book Online
          </motion.a>

          {/* Mobile CTA + Menu */}
          <div className="lg:hidden flex items-center gap-2">
            <motion.a
              href={clientMasterData.onlineBookingUrl !== "none" ? clientMasterData.onlineBookingUrl : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
              className="inline-flex items-center text-[9px] uppercase tracking-[0.18em] font-semibold text-white bg-white/5 border border-white/10 rounded-full px-4 py-2 hover:bg-white/10 transition-all min-h-[40px]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Book
            </motion.a>
            <MobileMenu />
          </div>
        </div>
      </motion.nav>
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
