"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ATELIER_EASE } from "./T4Reveal";

interface T4NavProps {
  practiceName: string;
  phone: string;
  city: string;
  bookingUrl: string;
}

const LINKS = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "The work" },
  { href: "#doctors", label: "Doctors" },
  { href: "#terms", label: "Financing" },
  { href: "#visit", label: "Visit" },
];

export default function T4Nav({
  practiceName,
  phone,
  city,
  bookingUrl,
}: T4NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll while the menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const telHref = `tel:${phone.replace(/[^0-9+]/g, "")}`;
  const bookHref = bookingUrl !== "none" ? bookingUrl : telHref;

  return (
    <>
      <motion.header
        initial={reduced ? false : { opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: ATELIER_EASE }}
        className="fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-500"
        style={{
          backgroundColor: scrolled ? "rgba(23, 16, 10, 0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(10px)" : "none",
          boxShadow: scrolled ? "0 1px 0 rgba(201,165,106,0.18)" : "none",
        }}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex max-w-[88rem] items-center justify-between gap-6 px-6 py-5 lg:px-12"
        >
          {/* wordmark */}
          <a href="#top" className="flex items-baseline gap-3">
            <span className="t4-display whitespace-nowrap text-[1.05rem] uppercase tracking-[0.18em] text-[var(--t4-ivory)]">
              {practiceName}
            </span>
            <span className="t4-label hidden whitespace-nowrap text-[var(--t4-champagne)] xl:inline">
              {city}
            </span>
          </a>

          {/* desktop links */}
          <div className="hidden items-center gap-8 lg:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="t4-link t4-label whitespace-nowrap text-[var(--t4-ivory-soft)] transition-colors duration-300 hover:text-[var(--t4-ivory)]"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-5">
            <a
              href={telHref}
              className="t4-label hidden whitespace-nowrap text-[var(--t4-champagne)] transition-colors duration-300 hover:text-[var(--t4-champagne-bright)] md:inline"
            >
              {phone}
            </a>
            <a
              href={bookHref}
              {...(bookingUrl !== "none"
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="t4-btn-outline max-md:!hidden whitespace-nowrap !px-6 !py-3"
            >
              Book a consultation
            </a>

            {/* mobile menu button */}
            <button
              type="button"
              aria-expanded={open}
              aria-controls="t4-menu"
              onClick={() => setOpen(!open)}
              className="flex h-11 w-11 flex-col items-center justify-center gap-[7px] lg:hidden"
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span
                className="block h-px w-6 bg-[var(--t4-ivory)] transition-transform duration-500"
                style={{
                  transform: open ? "translateY(4px) rotate(45deg)" : "none",
                }}
              />
              <span
                className="block h-px w-6 bg-[var(--t4-champagne)] transition-transform duration-500"
                style={{
                  transform: open ? "translateY(-4px) rotate(-45deg)" : "none",
                }}
              />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* mobile menu — a dark room of its own */}
      <div
        id="t4-menu"
        aria-hidden={!open}
        className="fixed inset-0 z-40 flex flex-col justify-between bg-[var(--t4-noir)] px-6 pb-10 pt-28 transition-opacity duration-500 lg:hidden"
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
      >
        <div className="flex flex-col gap-1">
          {LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="t4-display border-b border-[var(--t4-line-dark)] py-4 text-[2rem] text-[var(--t4-ivory)] transition-colors duration-300 hover:text-[var(--t4-champagne-bright)]"
              style={{
                transitionDelay: open ? `${80 + i * 45}ms` : "0ms",
                opacity: open ? 1 : 0,
                transform: open ? "none" : "translateY(10px)",
                transition:
                  "opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1), color 0.3s",
              }}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <a href={telHref} className="t4-label text-[var(--t4-champagne)]">
            {phone}
          </a>
          <a
            href={bookHref}
            {...(bookingUrl !== "none"
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            onClick={() => setOpen(false)}
            className="t4-btn-solid w-full"
          >
            Book a consultation
          </a>
        </div>
      </div>
    </>
  );
}
