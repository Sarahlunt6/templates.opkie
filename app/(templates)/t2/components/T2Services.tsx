"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SectionHeader } from "./T2Kit";
import { location, bookingHref, EASE } from "./t2-lib";

/* ────────────────────────────────────────────────────────────────
   Services — a technical-specifications sheet. Each capability is
   a spec row: mono index, name, volt chevron, expandable detail
   with the treatment readout and a reference image.
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
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  // services are driven by the practice's GBP categories — until those are
  // filled in (see MISSING_DATA.md on scaffolded sites), publish nothing
  if (services.length === 0) return null;

  return (
    <section id="services" className="relative py-24 md:py-32 px-6 md:px-12 bg-[var(--t2p-surface)] scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          index="02"
          label="Treatments &amp; services"
          title={
            <>
              Every treatment starts <span className="t2p-duotext">with a scan.</span>
            </>
          }
          lede={`One digital record drives everything we do in ${location.cityServed} — from a first cleaning to a full restoration.`}
        />

        <div className="rounded-2xl border border-[var(--t2p-line)] bg-[var(--t2p-bg)] overflow-hidden">
          {services.map((category, i) => {
            const s = SERVICE_MAP[category] ?? SERVICE_MAP.default;
            const open = openIdx === i;
            const panelId = `t2p-svc-panel-${i}`;
            return (
              <motion.div
                key={category}
                initial={reduced ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: i * 0.06, ease: EASE }}
                className="border-b border-[var(--t2p-line)] last:border-b-0"
              >
                <button
                  onClick={() => setOpenIdx(open ? null : i)}
                  aria-expanded={open}
                  aria-controls={panelId}
                  className="group flex w-full items-center gap-5 md:gap-8 px-5 md:px-8 py-5 md:py-6 text-left transition-colors duration-300 hover:bg-[rgba(126,224,75,0.03)]"
                >
                  <span
                    className={`t2p-mono text-[0.6875rem] tracking-[0.18em] transition-colors duration-300 ${
                      open ? "text-[var(--t2p-volt)]" : "text-[var(--t2p-text-50)]"
                    }`}
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-innovator flex-1 text-lg md:text-2xl font-medium tracking-tight text-[var(--t2p-text)]">
                    {category}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-[var(--t2p-volt)] transition-transform duration-300 ${
                      open ? "rotate-180" : ""
                    }`}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </button>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      key="panel"
                      id={panelId}
                      initial={reduced ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduced ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 px-5 md:px-8 pb-7 md:pb-8 md:pl-[4.5rem]">
                        <div className="md:col-span-7">
                          <p className="text-sm md:text-[0.9375rem] leading-relaxed text-[var(--t2p-text-70)]">
                            {s.blurb}
                          </p>
                          <div className="mt-5 max-w-md">
                            {s.data.map(([k, v]) => (
                              <div
                                key={k}
                                className="flex items-baseline justify-between gap-4 border-b border-[var(--t2p-line)] py-2.5 last:border-b-0"
                              >
                                <span className="t2p-mono text-[0.625rem] uppercase tracking-[0.16em] text-[var(--t2p-text-50)]">
                                  {k}
                                </span>
                                <span className="t2p-mono text-[0.8125rem] text-[var(--t2p-volt)] text-right">
                                  {v}
                                </span>
                              </div>
                            ))}
                          </div>
                          <a
                            href={bookingHref}
                            className="t2p-mono mt-6 inline-flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.16em] text-[var(--t2p-volt)] transition-opacity duration-300 hover:opacity-75"
                          >
                            Book this treatment <span aria-hidden="true">→</span>
                          </a>
                        </div>
                        <div className="relative hidden md:block md:col-span-5">
                          <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-[var(--t2p-line)]">
                            <Image
                              src={s.image}
                              alt={category}
                              fill
                              loading="lazy"
                              className="object-cover opacity-80 saturate-[0.6]"
                              sizes="(max-width: 1024px) 50vw, 380px"
                            />
                            <span
                              className="t2p-hud-dot absolute top-3 right-3"
                              aria-hidden="true"
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {location.localizedNeighborhoods.length > 0 && (
          <p className="t2p-mono mt-6 text-[0.625rem] uppercase tracking-[0.18em] text-[var(--t2p-text-50)]">
            Serving {location.localizedNeighborhoods.slice(0, 4).join(" · ")}
          </p>
        )}
      </div>
    </section>
  );
}
