"use client";

import Image from "next/image";
import type { LocationNAP } from "@/types/dentist";
import T4Reveal, { T4RuleDraw } from "./T4Reveal";

interface T4VisitProps {
  locations: LocationNAP[];
  practiceName: string;
}

function LocationCard({ location }: { location: LocationNAP }) {
  const telHref = `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`;

  return (
    <div
      className="bg-[var(--t4-porcelain-deep)] p-8 lg:p-10"
      style={{ boxShadow: "var(--t4-shadow-salon)" }}
    >
      <p className="t4-label text-[var(--t4-brass-ink)]">
        {location.officeLabel}
      </p>
      <h3 className="t4-display mt-3 text-[1.5rem] text-[#241a12]">
        {location.cityServed}, {location.stateServed}
      </h3>

      <address className="mt-4 font-t4-body text-[0.98rem] font-light not-italic leading-relaxed text-[var(--t4-espresso-soft)]">
        {location.addressGBP}
        <br />
        {location.cityServed}, {location.stateServed}
      </address>

      <a
        href={telHref}
        className="t4-link t4-label mt-4 inline-block text-[var(--t4-brass-ink)]"
      >
        {location.phoneGBP}
      </a>

      {/* hours, set like ledger lines */}
      <ul className="mt-7 border-t border-[var(--t4-line-light)] pt-5">
        {location.hoursOfOperation.map((h) => (
          <li key={h.dayRange} className="flex items-baseline py-1.5">
            <span className="t4-label shrink-0 !tracking-[0.14em] text-[var(--t4-espresso-soft)]">
              {h.dayRange}
            </span>
            <span aria-hidden className="t4-leader" />
            <span className="t4-numeral shrink-0 text-[0.9rem] text-[#241a12]">
              {h.structuralHours}
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-6 font-t4-body text-[0.85rem] font-light leading-relaxed text-[var(--t4-espresso-faint)]">
        Serving {location.localizedNeighborhoods.join(", ")}.
      </p>
    </div>
  );
}

export default function T4Visit({ locations, practiceName }: T4VisitProps) {
  const primary = locations[0];

  return (
    <section id="visit" className="t4-salon relative pb-24 pt-4 lg:pb-36">
      <div className="mx-auto max-w-[88rem] px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-3">
            <T4Reveal className="lg:sticky lg:top-32">
              <p className="t4-label text-[var(--t4-brass-ink)]">The address</p>
              <T4RuleDraw className="mt-5 w-16" />
            </T4Reveal>
          </div>

          <div className="lg:col-span-9 lg:col-start-4">
            <T4Reveal>
              <h2 className="t4-display t4-display-lg max-w-2xl text-[#241a12]">
                {locations.length > 1 ? "Two rooms. " : "The room. "}
                <em className="italic text-[var(--t4-brass-ink)]">
                  Same standard in both.
                </em>
              </h2>
            </T4Reveal>

            <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
              {locations.map((loc, i) => (
                <T4Reveal key={loc.id} delay={i * 0.1}>
                  <LocationCard location={loc} />
                </T4Reveal>
              ))}
            </div>

            {/* the house at dusk, and the way to its door */}
            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
              <T4Reveal delay={0.1} className="lg:col-span-5">
                <figure className="flex h-full flex-col">
                  <div className="t4-frame flex-1 !bg-[var(--t4-porcelain-deep)]" style={{ boxShadow: "var(--t4-shadow-salon)" }}>
                    <div className="t4-frame-inner t4-grade relative h-full min-h-[280px]">
                      <Image
                        src="/images/office-exterior.jpg"
                        alt={`The ${practiceName} building at dusk, sign lit`}
                        fill
                        sizes="(max-width: 1024px) 90vw, 34vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <figcaption className="mt-4 flex items-center gap-3">
                    <span className="t4-diamond !bg-[var(--t4-brass-ink)]" />
                    <span className="t4-label text-[var(--t4-espresso-faint)]">
                      The house, after hours
                    </span>
                  </figcaption>
                </figure>
              </T4Reveal>

              <T4Reveal delay={0.18} className="lg:col-span-7">
                <div className="t4-frame h-full !bg-[var(--t4-porcelain-deep)]" style={{ boxShadow: "var(--t4-shadow-salon)" }}>
                  <div className="t4-frame-inner relative h-full min-h-[320px]">
                    <iframe
                      src={primary.googleMapsEmbedUrl}
                      title={`Map to ${practiceName}, ${primary.addressGBP}, ${primary.cityServed}`}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      allowFullScreen
                      className="absolute inset-0 h-full w-full border-0"
                      style={{ filter: "sepia(0.22) saturate(0.82) contrast(1.02)" }}
                    />
                  </div>
                </div>
              </T4Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
