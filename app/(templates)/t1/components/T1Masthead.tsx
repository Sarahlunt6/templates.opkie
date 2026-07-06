"use client";

import { useEffect, useState } from "react";

interface T1MastheadProps {
  practiceName: string;
  phone: string;
  bookingUrl: string;
}

const NAV_LINKS = [
  { index: "01", label: "Services", href: "#services" },
  { index: "02", label: "Doctors", href: "#doctors" },
  { index: "03", label: "Reviews", href: "#reviews" },
  { index: "04", label: "Visit", href: "#visit" },
];

/**
 * T1 PRESS — newspaper masthead. Compact Anton logotype on the left,
 * mono index nav, rectangular ink BOOK NOW button. Sticky, ruled.
 */
export default function T1Masthead({
  practiceName,
  phone,
  bookingUrl,
}: T1MastheadProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const tel = `tel:${phone.replace(/[^0-9+]/g, "")}`;
  const hasBooking = bookingUrl !== "none";

  return (
    <header
      className={`sticky top-0 z-50 border-b border-[rgba(26,23,19,0.15)] bg-[#F3EFE6] transition-shadow duration-300 ${
        scrolled ? "shadow-[0_1px_0_rgba(26,23,19,0.15)]" : ""
      }`}
    >
      <div className="mx-auto flex max-w-[1500px] items-stretch justify-between gap-4 px-4 md:px-8 xl:px-12">
        {/* Logotype — the one sanctioned Anton-below-2xl exception: it is the
            brand mark, and 2xl wraps long practice names at 375px */}
        <a
          href="#top"
          className="flex items-center py-3 font-t1-press text-xl uppercase leading-none tracking-[0.01em] text-[#1A1713] md:text-2xl"
        >
          {practiceName}
        </a>

        {/* Index nav — desktop */}
        <nav
          aria-label="Sections"
          className="hidden items-center gap-8 lg:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.index}
              href={link.href}
              className="t1-mono-label flex items-baseline gap-1.5 transition-colors duration-200 hover:text-[#D92B21]"
            >
              <span aria-hidden="true" className="text-[#D92B21]">
                {link.index}
              </span>
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-5">
          <a
            href={tel}
            className="t1-link hidden whitespace-nowrap font-sans text-sm text-[#1A1713] md:inline-block"
          >
            {phone}
          </a>
          <a
            href={hasBooking ? bookingUrl : tel}
            {...(hasBooking
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="t1-btn t1-btn-ink !min-h-0 self-center !px-5 !py-3"
          >
            Book now
          </a>
        </div>
      </div>
    </header>
  );
}
