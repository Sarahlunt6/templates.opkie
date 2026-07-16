"use client";

import { practice, location, telHref, bookingHref } from "./t2-lib";
import { SITE_PAGES, pageHref } from "@/components/wireframe/site-pages";

interface T2FooterProps {
  /** Path of the template home ("/t2" in the hub, "/" in a client site) so
   *  anchor + site-map links resolve from interior pages. */
  homeHref?: string;
}

export default function T2Footer({ homeHref = "" }: T2FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--t2p-line)] bg-[var(--t2p-bg)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Identity */}
          <div className="md:col-span-4">
            <p className="font-innovator text-lg font-medium tracking-tight text-[var(--t2p-text)]">
              {practice.globalPracticeName}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-[var(--t2p-text-70)]">
              Digital dentistry in {location.cityServed} — 3D imaging, same-day
              ceramic crowns, and guide-planned implants under one roof.
            </p>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <p className="t2p-label mb-4">Contact</p>
            <address className="not-italic text-sm leading-relaxed text-[var(--t2p-text-70)]">
              {location.addressGBP}
              <br />
              {location.cityServed}, {location.stateServed}
            </address>
            <a
              href={telHref}
              className="t2p-mono mt-3 inline-block text-sm text-[var(--t2p-text)] hover:text-[var(--t2p-blue)] transition-colors"
            >
              {location.phoneGBP}
            </a>
          </div>

          {/* Index */}
          <div className="md:col-span-3">
            <p className="t2p-label mb-4">Index</p>
            <nav className="flex flex-col gap-2.5" aria-label="Footer">
              {[
                ["01", "Technology", "#technology"],
                ["02", "Services", "#services"],
                ["03", "Results", "#results"],
                ["04", "Compare", "#compare"],
                ["05", "Doctors", "#doctors"],
                ["08", "Visit", "#visit"],
              ].map(([idx, label, href]) => (
                <a
                  key={href}
                  href={`${homeHref}${href}`}
                  className="group t2p-mono text-[0.6875rem] uppercase tracking-[0.16em] text-[var(--t2p-text-70)] hover:text-[var(--t2p-text)] transition-colors"
                >
                  <span className="mr-2 text-[var(--t2p-blue)] group-hover:text-[var(--t2p-blue)] transition-colors">
                    {idx}
                  </span>
                  {label}
                </a>
              ))}
              <a
                href={bookingHref}
                className="t2p-mono text-[0.6875rem] uppercase tracking-[0.16em] text-[var(--t2p-blue)]"
              >
                <span className="mr-2">09</span>Book a visit
              </a>
            </nav>
          </div>

          {/* Site map — every page of the finished site */}
          <div className="md:col-span-2">
            <p className="t2p-label mb-4">Site map</p>
            <nav className="flex flex-col gap-2.5" aria-label="Site map">
              {[
                { slug: null, label: "Home" },
                ...SITE_PAGES.map((page) => ({
                  slug: page.slug,
                  label: page.label,
                })),
              ].map((entry, i) => (
                <a
                  key={entry.slug ?? "home"}
                  href={
                    entry.slug === null
                      ? homeHref || "/"
                      : pageHref(homeHref, entry.slug)
                  }
                  className="group t2p-mono text-[0.6875rem] uppercase tracking-[0.16em] text-[var(--t2p-text-70)] hover:text-[var(--t2p-text)] transition-colors"
                >
                  <span className="mr-2 text-[var(--t2p-blue)] group-hover:text-[var(--t2p-blue)] transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {entry.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-[var(--t2p-line)] pt-6 pb-16 lg:pb-0">
          <p className="t2p-mono text-[0.625rem] uppercase tracking-[0.18em] text-[var(--t2p-text-50)]">
            © {year} {practice.globalPracticeName}
          </p>
          <p className="t2p-mono text-[0.625rem] uppercase tracking-[0.18em] text-[var(--t2p-text-50)]">
            Sections indexed in FDI tooth notation.
          </p>
          <p className="t2p-mono text-[0.625rem] uppercase tracking-[0.18em] text-[var(--t2p-text-50)]">
            {location.cityServed} / {location.stateServed} — digital dentistry
          </p>
        </div>
      </div>
    </footer>
  );
}
