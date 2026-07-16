"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MARIGOLD_EASE } from "./T5Reveal";

interface T5NavProps {
  practiceName: string;
  phone: string;
  bookingUrl: string;
  /** Path of the template home ("/t5" in the hub, "/" in a client site) so
   *  anchor links resolve from interior pages. Empty = same-page anchors. */
  homeHref?: string;
}

const LINKS = [
  { href: "#menu", label: "The menu" },
  { href: "#smiles", label: "Smiles" },
  { href: "#dentists", label: "Your dentists" },
  { href: "#fair-and-square", label: "Pricing" },
  { href: "#visit", label: "Come say hi" },
];

export default function T5Nav({
  practiceName,
  phone,
  bookingUrl,
  homeHref = "",
}: T5NavProps) {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

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
        initial={reduced ? false : { opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: MARIGOLD_EASE }}
        className="sticky top-0 z-50"
      >
        <div className="bg-[var(--t5-cream)]/95 backdrop-blur-sm">
          <nav
            aria-label="Primary"
            className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-10"
          >
            {/* the shop sign */}
            <a href={`${homeHref}#top`} className="flex items-baseline gap-2.5">
              <span className="t5-display text-[1.15rem] leading-none text-[var(--t5-walnut)] sm:text-[1.3rem]">
                {practiceName}
              </span>
            </a>

            {/* desktop links */}
            <div className="hidden items-center gap-7 lg:flex">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={`${homeHref}${l.href}`}
                  className="text-[0.92rem] font-medium text-[var(--t5-walnut-soft)] transition-colors duration-200 hover:text-[var(--t5-teal)]"
                >
                  {l.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <a
                href={telHref}
                className="t5-kicker hidden text-[var(--t5-teal)] transition-colors duration-200 hover:text-[var(--t5-teal-bright)] md:inline"
              >
                {phone}
              </a>
              <a
                href={bookHref}
                {...(bookingUrl !== "none"
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="t5-btn max-md:!hidden !px-5 !py-2.5 !text-[0.85rem]"
              >
                Book a visit
              </a>

              {/* mobile menu button */}
              <button
                type="button"
                aria-expanded={open}
                aria-controls="t5-menu"
                onClick={() => setOpen(!open)}
                className="flex h-11 w-11 flex-col items-center justify-center gap-[6px] rounded-full border-2 border-[var(--t5-walnut)] bg-[var(--t5-paper)] lg:hidden"
              >
                <span className="sr-only">
                  {open ? "Close menu" : "Open menu"}
                </span>
                <span
                  className="block h-[2px] w-5 rounded-full bg-[var(--t5-walnut)] transition-transform duration-300"
                  style={{
                    transform: open ? "translateY(4px) rotate(45deg)" : "none",
                  }}
                />
                <span
                  className="block h-[2px] w-5 rounded-full bg-[var(--t5-walnut)] transition-transform duration-300"
                  style={{
                    transform: open ? "translateY(-4px) rotate(-45deg)" : "none",
                  }}
                />
              </button>
            </div>
          </nav>
        </div>

        {/* the awning — the storefront's signature, hanging from the nav */}
        <div className="t5-awning" aria-hidden />
      </motion.header>

      {/* mobile menu — the shop interior */}
      <div
        id="t5-menu"
        aria-hidden={!open}
        className="fixed inset-0 z-40 flex flex-col justify-between bg-[var(--t5-cream)] px-6 pb-10 pt-32 transition-opacity duration-300 lg:hidden"
        style={{ opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }}
      >
        <div className="flex flex-col">
          {LINKS.map((l, i) => (
            <a
              key={l.href}
              href={`${homeHref}${l.href}`}
              onClick={() => setOpen(false)}
              className="t5-display border-b-2 border-dotted border-[var(--t5-line)] py-4 text-[1.75rem] text-[var(--t5-walnut)]"
              style={{
                transitionDelay: open ? `${60 + i * 40}ms` : "0ms",
                opacity: open ? 1 : 0,
                transform: open ? "none" : "translateY(8px)",
                transition:
                  "opacity 0.45s cubic-bezier(0.34,1.3,0.5,1), transform 0.45s cubic-bezier(0.34,1.3,0.5,1)",
              }}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <a href={telHref} className="t5-kicker text-[var(--t5-teal)]">
            Call us — a person answers · {phone}
          </a>
          <a
            href={bookHref}
            {...(bookingUrl !== "none"
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            onClick={() => setOpen(false)}
            className="t5-btn w-full"
          >
            Book a visit
          </a>
        </div>
      </div>
    </>
  );
}
