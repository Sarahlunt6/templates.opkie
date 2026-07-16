"use client";

import type { LocationNAP } from "@/types/dentist";
import { SITE_PAGES, pageHref } from "@/components/wireframe/site-pages";

interface T4FooterProps {
  practiceName: string;
  locations: LocationNAP[];
  bookingUrl: string;
  /** Path of the template home ("/t4" in the hub, "/" in a client site) so
   *  anchor + site-map links resolve from interior pages. */
  homeHref?: string;
}

const FOOTER_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "The work" },
  { href: "#doctors", label: "Doctors" },
  { href: "#terms", label: "Financing" },
  { href: "#questions", label: "Questions" },
  { href: "#visit", label: "Visit" },
];

export default function T4Footer({
  practiceName,
  locations,
  bookingUrl,
  homeHref = "",
}: T4FooterProps) {
  const primaryTel = `tel:${locations[0]?.phoneGBP.replace(/[^0-9+]/g, "")}`;
  const bookHref = bookingUrl !== "none" ? bookingUrl : primaryTel;

  return (
    <footer
      className="relative border-t border-[var(--t4-line-dark)] pb-28 pt-16 lg:pb-16"
      style={{ backgroundColor: "var(--t4-noir)" }}
    >
      <div className="mx-auto max-w-[88rem] px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          {/* wordmark + the standing invitation */}
          <div className="lg:col-span-4">
            <p className="t4-display text-[1.35rem] uppercase tracking-[0.16em] text-[var(--t4-ivory)]">
              {practiceName}
            </p>
            <p className="mt-4 max-w-sm font-t4-body text-[0.92rem] font-light leading-relaxed text-[var(--t4-ivory-faint)]">
              Cosmetic and general dentistry, practiced with a tailor's
              patience. New patients are welcome at both offices.
            </p>
            <a href={bookHref}
              {...(bookingUrl !== "none"
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="t4-link t4-label mt-7 inline-block text-[var(--t4-champagne)]"
            >
              Book a consultation
            </a>
          </div>

          {/* NAP for each office */}
          {locations.map((loc) => (
            <div key={loc.id} className="lg:col-span-3">
              <p className="t4-label text-[var(--t4-champagne)]">
                {loc.officeLabel}
              </p>
              <address className="mt-4 font-t4-body text-[0.9rem] font-light not-italic leading-relaxed text-[var(--t4-ivory-soft)]">
                {loc.addressGBP}
                <br />
                {loc.cityServed}, {loc.stateServed}
              </address>
              <a
                href={`tel:${loc.phoneGBP.replace(/[^0-9+]/g, "")}`}
                className="t4-link t4-label mt-3 inline-block text-[var(--t4-ivory-soft)]"
              >
                {loc.phoneGBP}
              </a>
            </div>
          ))}

          {/* in-page links + the full collection */}
          <div className="space-y-10 lg:col-span-2 lg:justify-self-end">
            <div>
              <p className="t4-label text-[var(--t4-champagne)]">This page</p>
              <ul className="mt-4 space-y-2.5">
                {FOOTER_LINKS.map((l) => (
                  <li key={l.href}>
                    <a
                      href={`${homeHref}${l.href}`}
                      className="t4-link t4-label whitespace-nowrap text-[var(--t4-ivory-faint)] transition-colors duration-300 hover:text-[var(--t4-ivory)]"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* full site map — every room of the finished site */}
            <div>
              <p className="t4-label text-[var(--t4-champagne)]">
                The full collection
              </p>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <a
                    href={homeHref || "/"}
                    className="t4-link t4-label whitespace-nowrap text-[var(--t4-ivory-faint)] transition-colors duration-300 hover:text-[var(--t4-ivory)]"
                  >
                    Home
                  </a>
                </li>
                {SITE_PAGES.map((page) => (
                  <li key={page.slug}>
                    <a
                      href={pageHref(homeHref, page.slug)}
                      className="t4-link t4-label whitespace-nowrap text-[var(--t4-ivory-faint)] transition-colors duration-300 hover:text-[var(--t4-ivory)]"
                    >
                      {page.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-[var(--t4-line-dark)] pt-7 sm:flex-row sm:items-center">
          <p className="t4-label text-[var(--t4-ivory-faint)]">
            © {new Date().getFullYear()} {practiceName} · All rights reserved
          </p>
          <p className="t4-label flex items-center gap-3 text-[var(--t4-ivory-faint)]">
            <span>Se habla español</span>
            <span className="t4-diamond" />
            <span>ADA accessible</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
