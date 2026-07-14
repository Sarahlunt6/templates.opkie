"use client";

import type { LocationNAP } from "@/types/dentist";

interface T5FooterProps {
  practiceName: string;
  locations: LocationNAP[];
  bookingUrl: string;
}

const FOOTER_LINKS = [
  { href: "#menu", label: "The menu" },
  { href: "#smiles", label: "Show & tell" },
  { href: "#dentists", label: "Your dentists" },
  { href: "#fair-and-square", label: "Money talk" },
  { href: "#questions", label: "Good questions" },
  { href: "#visit", label: "Come say hi" },
];

export default function T5Footer({
  practiceName,
  locations,
  bookingUrl,
}: T5FooterProps) {
  const primaryTel = `tel:${locations[0]?.phoneGBP.replace(/[^0-9+]/g, "")}`;
  const bookHref = bookingUrl !== "none" ? bookingUrl : primaryTel;

  return (
    <footer
      className="relative pb-32 pt-14 lg:pb-14"
      style={{ backgroundColor: "var(--t5-teal-deep)" }}
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* the shop sign, after hours */}
          <div className="lg:col-span-5">
            <p className="t5-display text-[1.5rem] text-[var(--t5-cream)]">
              {practiceName}
            </p>
            <p className="mt-3 max-w-sm text-[0.95rem] leading-relaxed text-[rgba(255,246,232,0.72)]">
              The neighborhood dental office — honest prices, gentle hands,
              and appointments that start on time.
            </p>
            <a
              href={bookHref}
              {...(bookingUrl !== "none"
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="t5-btn mt-7 !border-[var(--t5-walnut)] !px-6 !py-3 !text-[0.9rem]"
            >
              Book a visit
            </a>
          </div>

          {/* NAP per shop */}
          {locations.map((loc) => (
            <div key={loc.id} className="lg:col-span-3">
              <p className="t5-kicker text-[var(--t5-marigold)]">
                {loc.officeLabel}
              </p>
              <address className="mt-3 text-[0.92rem] not-italic leading-relaxed text-[rgba(255,246,232,0.85)]">
                {loc.addressGBP}
                <br />
                {loc.cityServed}, {loc.stateServed}
              </address>
              <a
                href={`tel:${loc.phoneGBP.replace(/[^0-9+]/g, "")}`}
                className="mt-2 inline-block text-[0.92rem] font-bold text-[var(--t5-cream)] underline decoration-[var(--t5-marigold)] decoration-2 underline-offset-4"
              >
                {loc.phoneGBP}
              </a>
            </div>
          ))}

          {/* around the shop */}
          <div className="lg:col-span-1">
            <ul className="space-y-2">
              {FOOTER_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="whitespace-nowrap text-[0.88rem] font-medium text-[rgba(255,246,232,0.72)] transition-colors duration-200 hover:text-[var(--t5-cream)]"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t-2 border-dotted border-[rgba(255,246,232,0.25)] pt-6 sm:flex-row sm:items-center">
          <p className="t5-kicker text-[rgba(255,246,232,0.6)]">
            © {new Date().getFullYear()} {practiceName} · all rights reserved
          </p>
          <p className="t5-kicker flex items-center gap-2 text-[rgba(255,246,232,0.6)]">
            made with <span aria-hidden className="text-[var(--t5-marigold)]">★</span> in{" "}
            {locations[0]?.cityServed}
          </p>
        </div>
      </div>
    </footer>
  );
}
