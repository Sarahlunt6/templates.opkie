"use client";

import { useEffect, useState } from "react";
import { pageHref } from "@/components/wireframe/site-pages";
import BrandMark from "@/components/brand/BrandMark";

interface T1MastheadProps {
  practiceName: string;
  phone: string;
  bookingUrl: string;
  /** Path of the template home ("/t1" in the hub, "/" in a client site) so
   *  anchor links resolve from interior pages. Empty = same-page anchors. */
  homeHref?: string;
}

const NAV_LINKS = [
  // Main nav navigates PAGES (like the finished site); the homepage's
  // chapters are read by scrolling, with their [0X] numerals on-page.
  { index: "01", label: "About", slug: "about" },
  { index: "02", label: "Services", slug: "services" },
  { index: "03", label: "Doctors", slug: "doctors" },
  { index: "04", label: "New patients", slug: "new-patients" },
  { index: "05", label: "Contact", slug: "contact" },
];

/**
 * T1 PRESS — newspaper masthead. Compact Anton logotype on the left,
 * mono index nav, rectangular ink BOOK NOW button. Sticky, ruled.
 */
export default function T1Masthead({
  practiceName,
  phone,
  bookingUrl,
  homeHref = "",
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
      className={`sticky top-0 z-50 border-b border-[var(--t1-hairline)] bg-[var(--t1-paper)] transition-shadow duration-300 ${
        scrolled ? "shadow-[0_1px_0_var(--t1-hairline)]" : ""
      }`}
    >
      <div className="mx-auto flex max-w-[1500px] items-stretch justify-between gap-4 px-4 md:px-8 xl:px-12">
        {/* Logotype — the one sanctioned Anton-below-2xl exception: it is the
            brand mark, and 2xl wraps long practice names at 375px */}
        <a
          href={`${homeHref}#top`}
          className="flex items-center py-3 font-t1-press text-xl uppercase leading-none tracking-[0.01em] text-[var(--t1-ink)] md:text-2xl"
        >
          <BrandMark height={26} maxWidth={230} label={practiceName}>
            {practiceName}
          </BrandMark>
        </a>

        {/* Index nav — desktop. Chapter numerals live on the page headings;
            the masthead keeps clean labels so seven fit on one line. */}
        <nav
          aria-label="Sections"
          className="hidden items-center gap-5 lg:flex xl:gap-7"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.index}
              href={pageHref(homeHref, link.slug)}
              className="t1-mono-label whitespace-nowrap transition-colors duration-200 hover:text-[var(--t1-red)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-5">
          <a
            href={tel}
            className="t1-link hidden whitespace-nowrap font-sans text-sm text-[var(--t1-ink)] md:inline-block"
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
