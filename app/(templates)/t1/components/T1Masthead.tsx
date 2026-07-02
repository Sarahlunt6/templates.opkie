"use client";

import { useEffect, useState } from "react";

interface T1MastheadProps {
  practiceName: string;
  phone: string;
  bookingUrl: string;
}

const CHAPTER_LINKS = [
  { numeral: "I", label: "Consultation", href: "#consultation" },
  { numeral: "II", label: "Design", href: "#design" },
  { numeral: "III", label: "Craft", href: "#craft" },
  { numeral: "IV", label: "Reveal", href: "#reveal" },
];

export default function T1Masthead({
  practiceName,
  phone,
  bookingUrl,
}: T1MastheadProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const tel = `tel:${phone.replace(/[^0-9+]/g, "")}`;
  const hasBooking = bookingUrl !== "none";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-[#F7F5F0]/95 backdrop-blur-sm border-b border-[#16130F]/15"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-6 md:px-10 xl:px-16 transition-all duration-700 py-4 lg:py-5">
        {/* Running head */}
        <a
          href="#top"
          className="font-t1-display text-lg md:text-xl font-medium tracking-tight text-[#16130F] whitespace-nowrap"
        >
          {practiceName}
        </a>

        {/* Chapter index — desktop only */}
        <nav
          aria-label="Chapters"
          className="hidden xl:flex items-baseline gap-8"
        >
          {CHAPTER_LINKS.map((c) => (
            <a
              key={c.numeral}
              href={c.href}
              className="group flex items-baseline gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-[#6B675E] transition-colors duration-500 hover:text-[#5E2A2B]"
            >
              <span className="font-t1-display text-xs italic text-[#9C7E46]">
                {c.numeral}.
              </span>
              {c.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <a
            href={tel}
            className="t1-link hidden md:inline-block font-sans text-sm text-[#16130F]"
          >
            {phone}
          </a>
          <a
            href={hasBooking ? bookingUrl : tel}
            {...(hasBooking
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="t1-btn t1-btn-ink !min-h-0 !px-5 !py-2.5 text-[10px]"
          >
            Reserve
          </a>
        </div>
      </div>
    </header>
  );
}
