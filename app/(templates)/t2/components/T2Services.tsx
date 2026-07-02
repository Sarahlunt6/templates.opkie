"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { SectionHeader } from "./T2Kit";
import { location, bookingHref, EASE } from "./t2-lib";

/* ────────────────────────────────────────────────────────────────
   Services — engineered image grid. Each card carries a mono data
   overlay that surfaces on hover (always visible on touch layouts).
   Category names come from practice data; treatment copy is template.
   ──────────────────────────────────────────────────────────────── */

const SERVICE_MAP: Record<
  string,
  { image: string; blurb: string; data: [string, string][] }
> = {
  "Cosmetic Dentist": {
    image: "/images/services/full-mouth-smile.jpg",
    blurb: "Veneers and smile design, planned on screen before anything is prepared.",
    data: [
      ["Design", "Digital preview first"],
      ["Delivery", "Milled ceramic"],
    ],
  },
  "Dental Implants Provider": {
    image: "/images/services/implant.jpg",
    blurb: "Guide-planned implants placed to the position mapped on your 3D scan.",
    data: [
      ["Planning", "CBCT + surgical guide"],
      ["Typical surgery", "Under 1 hour"],
    ],
  },
  "Teeth Whitening Service": {
    image: "/images/services/full-mouth-shade.jpg",
    blurb: "Shade measured, not guessed — then whitened to a documented target.",
    data: [
      ["Baseline", "Digital shade map"],
      ["Options", "In-office or take-home"],
    ],
  },
  "Emergency Dental Service": {
    image: "/images/services/braces.jpg",
    blurb: "Cracked, lost, or aching — scanned and treated the same day you call.",
    data: [
      ["Access", "Same-day slots held"],
      ["Crowns", "Milled on site"],
    ],
  },
  "Family Dentist": {
    image: "/images/services/invisalign.jpg",
    blurb: "Preventive care for every age, on one schedule and one record.",
    data: [
      ["Scope", "All ages"],
      ["Recall", "Digital records"],
    ],
  },
  default: {
    image: "/images/services/invisalign.jpg",
    blurb: "Clear-aligner treatment tracked scan by scan, adjustment by adjustment.",
    data: [
      ["Preview", "3D outcome first"],
      ["Checkpoints", "Every 6–8 weeks"],
    ],
  },
};

export default function T2Services() {
  const reduced = useReducedMotion();
  const services = location.secondaryCategoriesGBP;

  return (
    <section id="services" className="relative py-24 md:py-32 px-6 md:px-12 bg-[var(--t2p-surface)] scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          index="02"
          label="Capabilities"
          title={
            <>
              Every treatment starts <span className="t2p-duotext">with a scan.</span>
            </>
          }
          lede={`One digital record drives everything we do in ${location.cityServed} — from a first cleaning to a full restoration.`}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--t2p-line)] border border-[var(--t2p-line)]">
          {services.map((category, i) => {
            const s = SERVICE_MAP[category] ?? SERVICE_MAP.default;
            return (
              <motion.a
                key={category}
                href={bookingHref}
                initial={reduced ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                className="group relative block aspect-[3/4] overflow-hidden bg-[var(--t2p-bg)]"
                aria-label={`${category} — book a visit`}
              >
                <Image
                  src={s.image}
                  alt={category}
                  fill
                  loading="lazy"
                  className="object-cover opacity-75 saturate-[0.55] transition-all duration-700 ease-out group-hover:scale-[1.05] group-hover:opacity-90 group-hover:saturate-100"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#0A0C10] via-[#0A0C10]/45 to-[#0A0C10]/10"
                  aria-hidden="true"
                />

                {/* Corner index */}
                <span className="t2p-mono absolute top-4 left-4 text-[0.625rem] uppercase tracking-[0.2em] text-[var(--t2p-text-70)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="absolute top-4 right-4 h-3.5 w-3.5 border-t border-r border-[var(--t2p-ice-dim)] opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  aria-hidden="true"
                />

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <h3 className="font-innovator text-lg md:text-xl font-medium tracking-tight text-[var(--t2p-text)] mb-2">
                    {category}
                  </h3>
                  <p className="text-[0.8125rem] leading-relaxed text-[var(--t2p-text-70)]">
                    {s.blurb}
                  </p>

                  {/* Data overlay — rises on hover on pointer devices */}
                  <div className="mt-4 border-t border-[var(--t2p-line)] pt-3 lg:max-h-0 lg:opacity-0 lg:group-hover:max-h-24 lg:group-hover:opacity-100 lg:group-focus-visible:max-h-24 lg:group-focus-visible:opacity-100 overflow-hidden transition-all duration-500 ease-out">
                    {s.data.map(([k, v]) => (
                      <div key={k} className="flex justify-between gap-3 py-1">
                        <span className="t2p-mono text-[0.5625rem] uppercase tracking-[0.16em] text-[var(--t2p-text-50)]">
                          {k}
                        </span>
                        <span className="t2p-mono text-[0.6875rem] text-[var(--t2p-ice)] text-right">
                          {v}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Scan accent on hover */}
                <span
                  className="t2p-beam-h absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                  aria-hidden="true"
                />
              </motion.a>
            );
          })}
        </div>

        <p className="t2p-mono mt-6 text-[0.625rem] uppercase tracking-[0.18em] text-[var(--t2p-text-50)]">
          Serving {location.localizedNeighborhoods.slice(0, 4).join(" · ")}
        </p>
      </div>
    </section>
  );
}
