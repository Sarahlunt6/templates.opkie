"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { clientMasterData } from "@/data/master";
import T2MagneticButton from "./T2MagneticButton";

const navLinks = [
  { href: "#", label: "Home" },
  { href: "#technology", label: "Technology" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function T2Nav() {
  const location = clientMasterData.locations[0];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* High-Tech Professional Navigation */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-zinc-950/90 border-b border-white/[0.08]"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/t2" className="flex items-center gap-4 group">
              <div className="relative w-12 h-12 flex-shrink-0">
                <Image
                  src="/images/logo-dental.png"
                  alt={location.practiceNameGBP}
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                  priority
                />
              </div>
              <div className="hidden lg:block">
                <span className="font-semibold text-white text-lg tracking-tight">
                  {location.practiceNameGBP}
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <div className="w-1 h-1 rounded-full bg-brand-primary" />
                  <span className="text-[10px] tracking-[0.2em] text-white/40 uppercase">
                    Advanced Dentistry
                  </span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                  className="relative px-4 py-2 text-sm font-medium text-white/60 hover:text-white transition-colors duration-300 group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </motion.a>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {/* Phone Number - Hidden on mobile */}
              <a
                href={`tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
                className="hidden xl:flex items-center gap-2 px-4 py-2 text-sm text-white/60 hover:text-brand-primary transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="font-medium">{location.phoneGBP}</span>
              </a>

              {/* CTA Button - Desktop */}
              <T2MagneticButton
                href={
                  clientMasterData.onlineBookingUrl !== "none"
                    ? clientMasterData.onlineBookingUrl
                    : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`
                }
                className="hidden md:inline-flex items-center gap-2 px-6 py-3 bg-brand-primary text-white font-semibold text-sm uppercase tracking-[0.15em] rounded-xl border border-brand-primary hover:bg-brand-primary/90 transition-all duration-300"
                magneticRadius={100}
                magneticStrength={0.4}
              >
                <span>Book Online</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </T2MagneticButton>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.05] border border-white/[0.1] hover:border-brand-primary/50 transition-colors"
                aria-label="Toggle menu"
              >
                <motion.div
                  animate={mobileMenuOpen ? "open" : "closed"}
                  className="w-5 h-4 flex flex-col justify-between"
                >
                  <motion.span
                    variants={{
                      closed: { rotate: 0, y: 0 },
                      open: { rotate: 45, y: 6 },
                    }}
                    className="w-full h-0.5 bg-white block origin-center transition-all"
                  />
                  <motion.span
                    variants={{
                      closed: { opacity: 1 },
                      open: { opacity: 0 },
                    }}
                    className="w-full h-0.5 bg-white block"
                  />
                  <motion.span
                    variants={{
                      closed: { rotate: 0, y: 0 },
                      open: { rotate: -45, y: -6 },
                    }}
                    className="w-full h-0.5 bg-white block origin-center transition-all"
                  />
                </motion.div>
              </button>
            </div>
          </div>
        </div>

        {/* Subtle bottom glow line */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-primary/30 to-transparent" />
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-zinc-950 border-l border-white/[0.08] z-50 lg:hidden overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/[0.08]">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10">
                    <Image
                      src="/images/logo-dental.png"
                      alt={location.practiceNameGBP}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="font-semibold text-white text-base">Menu</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.05] hover:bg-white/[0.1] transition-colors"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="p-6 space-y-2">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-3 text-base font-medium text-white/80 hover:text-white hover:bg-white/[0.05] rounded-xl transition-all group"
                  >
                    <span>{link.label}</span>
                    <svg
                      className="w-4 h-4 text-white/40 group-hover:text-brand-primary group-hover:translate-x-1 transition-all"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </motion.a>
                ))}
              </nav>

              {/* Contact Info */}
              <div className="p-6 border-t border-white/[0.08]">
                <p className="text-[10px] tracking-[0.2em] text-white/40 uppercase mb-4">Contact</p>
                <a
                  href={`tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
                  className="flex items-center gap-3 px-4 py-3 bg-white/[0.05] rounded-xl hover:bg-white/[0.08] transition-colors mb-4"
                >
                  <svg className="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span className="text-sm font-medium text-white">{location.phoneGBP}</span>
                </a>

                {/* CTA Button */}
                <a
                  href={
                    clientMasterData.onlineBookingUrl !== "none"
                      ? clientMasterData.onlineBookingUrl
                      : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`
                  }
                  className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-brand-primary text-white font-semibold text-sm uppercase tracking-[0.15em] rounded-xl hover:bg-brand-primary/90 transition-all"
                >
                  <span>Book Online</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </div>

              {/* Status Badge */}
              <div className="p-6">
                <div className="flex items-center gap-2 px-4 py-3 bg-brand-primary/10 border border-brand-primary/20 rounded-xl">
                  <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
                  <span className="text-xs text-white/80">
                    Now Accepting New Patients in {location.cityServed}
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
