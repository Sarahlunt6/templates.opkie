"use client";

import { Fragment, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ATELIER_EASE } from "./T4Reveal";

interface T4NavProps {
  practiceName: string;
  phone: string;
  city: string;
  state: string;
  bookingUrl: string;
  /** Path of the template home ("/t4" in the hub, "/" in a client site) so
   *  anchor links resolve from interior pages. Empty = same-page anchors. */
  homeHref?: string;
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
  state,
  bookingUrl,
  homeHref = "",
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
        className="fixed inset-x-0 top-0 z-50 transition-[background-color] duration-500"
        style={{
          backgroundColor: scrolled ? "rgba(23, 16, 10, 0.94)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        }}
      >
        <nav
          aria-label="Primary"
          className="mx-auto grid max-w-[88rem] grid-cols-[auto_1fr_auto] items-center gap-6 px-6 transition-[padding] duration-500 lg:px-12"
          style={{
            paddingTop: scrolled ? "0.875rem" : "1.375rem",
            paddingBottom: scrolled ? "0.875rem" : "1.375rem",
          }}
        >
          {/* the lockup — house over city, like a label stitched in a collar */}
          <a href={`${homeHref}#top`} className="group flex flex-col gap-1">
            <span className="t4-display whitespace-nowrap text-[1.02rem] uppercase leading-none tracking-[0.22em] text-[var(--t4-ivory)] transition-colors duration-300 group-hover:text-[var(--t4-champagne-bright)] sm:text-[1.12rem]">
              {practiceName}
            </span>
            <span className="flex items-center gap-2">
              <span
                aria-hidden
                className="h-px w-4 bg-[var(--t4-champagne)] opacity-60"
              />
              <span className="t4-label whitespace-nowrap !text-[0.56rem] !tracking-[0.42em] text-[var(--t4-champagne)]">
                {city}, {state}
              </span>
            </span>
          </a>

          {/* the row of rooms, set with diamond pins */}
          <div className="hidden items-center justify-center gap-5 lg:flex xl:gap-6">
            {LINKS.map((l, i) => (
              <Fragment key={l.href}>
                {i > 0 && (
                  <span
                    aria-hidden
                    className="t4-diamond !h-[3px] !w-[3px] opacity-40"
                  />
                )}
                <a
                  href={`${homeHref}${l.href}`}
                  className="t4-link t4-label whitespace-nowrap py-1 text-[var(--t4-ivory-soft)] transition-colors duration-300 hover:text-[var(--t4-ivory)]"
                >
                  {l.label}
                </a>
              </Fragment>
            ))}
          </div>

          {/* the standing invitation */}
          <div className="flex items-center justify-end gap-6">
            <a
              href={telHref}
              className="hidden flex-col items-end gap-1 xl:flex"
            >
              <span className="t4-label !text-[0.56rem] !tracking-[0.36em] text-[var(--t4-ivory-faint)]">
                By appointment
              </span>
              <span className="t4-link t4-label whitespace-nowrap !tracking-[0.2em] text-[var(--t4-champagne)]">
                {phone}
              </span>
            </a>
            <a
              href={bookHref}
              {...(bookingUrl !== "none"
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="t4-btn-solid max-md:!hidden whitespace-nowrap !px-6 !py-3 !text-[0.68rem]"
            >
              Book a consultation
            </a>

            {/* mobile menu button */}
            <button
              type="button"
              aria-expanded={open}
              aria-controls="t4-menu"
              onClick={() => setOpen(!open)}
              className="flex h-11 w-11 flex-col items-center justify-center gap-[7px] border border-[var(--t4-line-dark)] transition-colors duration-300 hover:border-[var(--t4-champagne)] lg:hidden"
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span
                className="block h-px w-5 bg-[var(--t4-ivory)] transition-transform duration-500"
                style={{
                  transform: open ? "translateY(4px) rotate(45deg)" : "none",
                }}
              />
              <span
                className="block h-px w-5 bg-[var(--t4-champagne)] transition-transform duration-500"
                style={{
                  transform: open ? "translateY(-4px) rotate(-45deg)" : "none",
                }}
              />
            </button>
          </div>
        </nav>

        {/* the masthead rule — always present, brightens over the dark rooms */}
        <div
          aria-hidden
          className="mx-auto h-px max-w-[88rem] transition-colors duration-500 lg:mx-12 xl:mx-auto"
          style={{
            backgroundColor: scrolled
              ? "rgba(201, 165, 106, 0.38)"
              : "rgba(201, 165, 106, 0.22)",
          }}
        />
      </motion.header>

      {/* mobile menu — a dark room of its own */}
      <div
        id="t4-menu"
        aria-hidden={!open}
        className={`fixed inset-0 z-[45] flex flex-col justify-between bg-[var(--t4-noir)] px-6 pb-10 pt-28 transition-[opacity,visibility] duration-500 lg:hidden ${
          open ? "visible" : "invisible"
        }`}
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
      >
        <div className="flex flex-col">
          {LINKS.map((l, i) => (
            <a
              key={l.href}
              href={`${homeHref}${l.href}`}
              onClick={() => setOpen(false)}
              className="flex items-baseline justify-between border-b border-[var(--t4-line-dark)] py-4"
              style={{
                transitionDelay: open ? `${80 + i * 45}ms` : "0ms",
                opacity: open ? 1 : 0,
                transform: open ? "none" : "translateY(10px)",
                transition:
                  "opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1)",
              }}
            >
              <span className="t4-display text-[1.9rem] text-[var(--t4-ivory)]">
                {l.label}
              </span>
              <span className="t4-numeral text-[0.8rem] text-[var(--t4-champagne)] opacity-70">
                {String(i + 1).padStart(2, "0")}
              </span>
            </a>
          ))}
        </div>

        <div
          className="flex flex-col gap-5"
          style={{
            transitionDelay: open ? "320ms" : "0ms",
            opacity: open ? 1 : 0,
            transition: "opacity 0.6s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <a href={telHref} className="flex flex-col gap-1">
            <span className="t4-label !text-[0.56rem] !tracking-[0.36em] text-[var(--t4-ivory-faint)]">
              By appointment
            </span>
            <span className="t4-label !tracking-[0.2em] text-[var(--t4-champagne)]">
              {phone}
            </span>
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
