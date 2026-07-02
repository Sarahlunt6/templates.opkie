"use client";

import { useEffect, useState } from "react";
import { useSmoothScroll } from "@/components/premium/SmoothScrollProvider";
import { telHref } from "./hours";

interface T3HavenNavProps {
  practiceName: string;
  phone: string;
  bookingUrl: string | "none";
}

const NAV_LINKS = [
  { href: "#comfort", label: "comfort" },
  { href: "#services", label: "services" },
  { href: "#doctors", label: "doctors" },
  { href: "#visit", label: "visit" },
];

export default function T3HavenNav({
  practiceName,
  phone,
  bookingUrl,
}: T3HavenNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const { scrollTo } = useSmoothScroll();
  const hasBooking = bookingUrl !== "none";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAnchor = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    scrollTo(href, { offset: -88, duration: 1.6 });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-700 ${
        scrolled
          ? "border-b border-[var(--t3-line)] bg-[#f4f6f1e6] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8"
      >
        {/* wordmark */}
        <a
          href="#top"
          onClick={(e) => handleAnchor(e, "#top")}
          className="flex items-center gap-2.5"
        >
          <span
            className="h-2 w-2 rounded-full bg-[var(--t3-euc)]"
            aria-hidden="true"
          />
          <span className="text-[17px] font-light tracking-[0.04em] text-[var(--t3-moss)]">
            {practiceName}
          </span>
        </a>

        {/* section links */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleAnchor(e, link.href)}
              className="text-sm font-light text-[var(--t3-moss-soft)] transition-colors duration-500 hover:text-[var(--t3-euc-deep)]"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* actions */}
        <div className="flex items-center gap-5">
          <a
            href={telHref(phone)}
            className="hidden text-sm font-light text-[var(--t3-moss)] transition-colors duration-500 hover:text-[var(--t3-euc-deep)] lg:block"
          >
            {phone}
          </a>
          <a
            href={hasBooking ? bookingUrl : telHref(phone)}
            target={hasBooking ? "_blank" : undefined}
            rel={hasBooking ? "noopener noreferrer" : undefined}
            className="t3-btn t3-btn-primary px-5 py-2.5 text-sm"
          >
            Reserve a visit
          </a>
        </div>
      </nav>
    </header>
  );
}
