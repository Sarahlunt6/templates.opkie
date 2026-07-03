"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { practice, location, bookingHref, telHref, EASE } from "./t2-lib";

const NAV_LINKS = [
  { href: "#technology", label: "Technology", index: "01" },
  { href: "#services", label: "Services", index: "02" },
  { href: "#results", label: "Results", index: "03" },
  { href: "#doctors", label: "Doctors", index: "04" },
  { href: "#visit", label: "Visit", index: "07" },
];

export default function T2Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={reduced ? false : { y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-500 ${
          scrolled
            ? "bg-[#0A0C10]/90 backdrop-blur-md border-[var(--t2p-line)]"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-16 md:h-[4.5rem]">
            {/* Wordmark */}
            <Link href="/t2" className="group flex items-baseline gap-3">
              <span className="font-innovator text-base md:text-lg font-medium tracking-tight text-[var(--t2p-text)]">
                {practice.globalPracticeName}
              </span>
              <span className="t2p-mono hidden md:inline text-[0.5625rem] uppercase tracking-[0.22em] text-[var(--t2p-text-50)] group-hover:text-[var(--t2p-ice)] transition-colors duration-300">
                {location.cityServed} / {location.stateServed}
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-7" aria-label="Primary">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="group t2p-mono text-[0.6875rem] uppercase tracking-[0.16em] text-[var(--t2p-text-70)] hover:text-[var(--t2p-text)] transition-colors duration-300"
                >
                  <span className="text-[var(--t2p-ice)]/60 mr-1.5 group-hover:text-[var(--t2p-ice)] transition-colors duration-300">
                    {link.index}
                  </span>
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <a
                href={telHref}
                className="t2p-mono hidden xl:inline-block text-[0.6875rem] tracking-[0.12em] text-[var(--t2p-text-70)] hover:text-[var(--t2p-ice)] transition-colors duration-300"
              >
                {location.phoneGBP}
              </a>
              <a
                href={bookingHref}
                className="t2p-btn t2p-btn-primary hidden md:inline-flex !px-5 !py-2.5"
              >
                Book a visit
              </a>

              {/* Mobile toggle */}
              <button
                onClick={() => setOpen(!open)}
                className="lg:hidden flex h-10 w-10 items-center justify-center border border-[var(--t2p-line-strong)]"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
              >
                <span className="relative block h-3 w-4" aria-hidden="true">
                  <span
                    className={`absolute left-0 top-0 h-px w-full bg-[var(--t2p-text)] transition-transform duration-300 ${
                      open ? "translate-y-[5.5px] rotate-45" : ""
                    }`}
                  />
                  <span
                    className={`absolute left-0 bottom-0 h-px w-full bg-[var(--t2p-text)] transition-transform duration-300 ${
                      open ? "-translate-y-[5.5px] -rotate-45" : ""
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed inset-0 z-40 bg-[#0A0C10]/95 backdrop-blur-sm lg:hidden"
          >
            <div className="t2p-blueprint absolute inset-0" aria-hidden="true" />
            <nav
              className="relative h-full flex flex-col justify-center px-8"
              aria-label="Mobile"
            >
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={reduced ? false : { opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.06 * i, ease: EASE }}
                  className="flex items-baseline gap-4 py-4 border-b border-[var(--t2p-line)]"
                >
                  <span className="t2p-mono text-[0.6875rem] text-[var(--t2p-ice)]">
                    {link.index}
                  </span>
                  <span className="font-innovator text-2xl font-medium tracking-tight text-[var(--t2p-text)]">
                    {link.label}
                  </span>
                </motion.a>
              ))}
              <motion.div
                initial={reduced ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.35, ease: EASE }}
                className="mt-10 flex flex-col gap-3"
              >
                <a href={bookingHref} className="t2p-btn t2p-btn-primary w-full">
                  Book a visit
                </a>
                <a href={telHref} className="t2p-btn t2p-btn-ghost w-full">
                  Call {location.phoneGBP}
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
