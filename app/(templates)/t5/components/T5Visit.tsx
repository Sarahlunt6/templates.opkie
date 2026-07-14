"use client";

import type { LocationNAP } from "@/types/dentist";
import T5Reveal from "./T5Reveal";

interface T5VisitProps {
  locations: LocationNAP[];
  practiceName: string;
}

function ShopCard({ location }: { location: LocationNAP }) {
  const telHref = `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`;

  return (
    <div className="overflow-hidden rounded-[18px] border-2 border-[var(--t5-walnut)] bg-[var(--t5-paper)] shadow-[var(--t5-shadow-print)]">
      {/* each shop gets its own little awning */}
      <div className="t5-awning t5-awning--teal !h-[12px]" aria-hidden />

      <div className="px-7 pb-8 pt-9 sm:px-9">
        <p className="t5-kicker text-[var(--t5-teal)]">{location.officeLabel}</p>
        <h3 className="t5-display mt-2 text-[1.5rem] text-[var(--t5-walnut)]">
          {location.cityServed}, {location.stateServed}
        </h3>

        <address className="mt-3 text-[0.98rem] not-italic leading-relaxed text-[var(--t5-walnut-soft)]">
          {location.addressGBP}
          <br />
          {location.cityServed}, {location.stateServed}
        </address>

        <a
          href={telHref}
          className="t5-btn t5-btn--paper mt-5 !px-5 !py-2.5 !text-[0.88rem]"
        >
          {location.phoneGBP}
        </a>

        {/* hours, menu-board style */}
        <ul className="mt-7 border-t-2 border-dotted border-[var(--t5-line)] pt-5">
          {location.hoursOfOperation.map((h) => (
            <li key={h.dayRange} className="flex items-baseline py-1.5">
              <span className="shrink-0 text-[0.92rem] font-medium text-[var(--t5-walnut)]">
                {h.dayRange}
              </span>
              <span aria-hidden className="t5-dots" />
              <span className="shrink-0 text-[0.92rem] font-medium text-[var(--t5-teal)]">
                {h.structuralHours}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-2">
          {location.localizedNeighborhoods.map((hood) => (
            <span key={hood} className="t5-ticket !text-[0.72rem]">
              {hood}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function T5Visit({ locations, practiceName }: T5VisitProps) {
  const primary = locations[0];

  return (
    <section
      id="visit"
      className="relative bg-[var(--t5-cream)] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <T5Reveal className="max-w-2xl">
          <p className="t5-kicker text-[var(--t5-marigold-deep)]">
            Find us
          </p>
          <h2 className="t5-display t5-display-lg mt-4 text-[var(--t5-walnut)]">
            Come say hi.
          </h2>
          <p className="mt-5 text-[1.02rem] leading-relaxed text-[var(--t5-walnut-soft)]">
            {locations.length > 1
              ? "Two shops, same friendly drill. Free parking at both."
              : "Free parking out front, and the coffee's always on."}
          </p>
        </T5Reveal>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {locations.map((loc, i) => (
            <T5Reveal key={loc.id} delay={i * 0.1} rotate={i % 2 === 0 ? -0.6 : 0.6}>
              <ShopCard location={loc} />
            </T5Reveal>
          ))}
        </div>

        {/* the map, in a shop-window frame */}
        <T5Reveal delay={0.15}>
          <div className="mt-10 overflow-hidden rounded-[18px] border-2 border-[var(--t5-walnut)] shadow-[var(--t5-shadow-print)]">
            <div className="relative aspect-[16/7] min-h-[260px]">
              <iframe
                src={primary.googleMapsEmbedUrl}
                title={`Map to ${practiceName}, ${primary.addressGBP}, ${primary.cityServed}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
                style={{ filter: "saturate(0.9) sepia(0.08)" }}
              />
            </div>
          </div>
        </T5Reveal>
      </div>
    </section>
  );
}
