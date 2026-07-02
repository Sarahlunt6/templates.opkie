"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Box, Cpu, Crosshair } from "lucide-react";
import { SectionHeader, SpecRow } from "./T2Kit";
import { EASE } from "./t2-lib";

/* ────────────────────────────────────────────────────────────────
   Technology triptych — three instruments, treated like hardware
   product cards: tracked glow, expanding mono spec readout.
   Technology copy is template copy by design.
   ──────────────────────────────────────────────────────────────── */

const INSTRUMENTS = [
  {
    id: "cbct",
    Icon: Box,
    ref: "SYS-01",
    name: "3D cone-beam imaging",
    claim:
      "A full 3D map of your jaw — bone density, nerve paths, sinus floors — before any treatment is planned.",
    specs: [
      { k: "Resolution", v: "0.1 mm voxel" },
      { k: "Capture", v: "One 14-second pass" },
      { k: "Vs. film X-ray", v: "Up to 90% less dose" },
      { k: "Used for", v: "Implants · airway · root canals" },
    ],
  },
  {
    id: "cerec",
    Icon: Cpu,
    ref: "SYS-02",
    name: "CEREC same-day crowns",
    claim:
      "Crowns milled from solid ceramic while you wait. No impressions, no temporaries, no second appointment.",
    specs: [
      { k: "Scan", v: "Digital, no impression goop" },
      { k: "Mill time", v: "~12 minutes" },
      { k: "Appointments", v: "1, start to seat" },
      { k: "Material", v: "Milled ceramic block" },
    ],
  },
  {
    id: "guided",
    Icon: Crosshair,
    ref: "SYS-03",
    name: "Guided implant surgery",
    claim:
      "Implant position is planned on your 3D scan, then executed through a printed surgical guide — not by eye.",
    specs: [
      { k: "Planning", v: "On your CBCT scan" },
      { k: "Placement", v: "Guide-directed" },
      { k: "Typical surgery", v: "Under 1 hour" },
      { k: "Benefit", v: "Smaller site, faster healing" },
    ],
  },
];

export default function T2TechTriptych() {
  const [active, setActive] = useState<string | null>(null);
  const reduced = useReducedMotion();

  return (
    <section id="technology" className="relative py-24 md:py-32 px-6 md:px-12 scroll-mt-20">
      <div className="t2p-blueprint absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div className="relative max-w-7xl mx-auto">
        <SectionHeader
          index="01"
          label="Instrumentation"
          title={
            <>
              The lab is <span className="t2p-duotext">in the practice.</span>
            </>
          }
          lede="Most dentistry is outsourced — impressions shipped, crowns mailed back, weeks in a temporary. Ours runs on three systems under one roof."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-[var(--t2p-line)] border border-[var(--t2p-line)]">
          {INSTRUMENTS.map((inst, i) => {
            const isActive = active === inst.id;
            return (
              <motion.article
                key={inst.id}
                initial={reduced ? false : { opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: EASE }}
                onMouseEnter={() => setActive(inst.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(inst.id)}
                onBlur={() => setActive(null)}
                onMouseMove={(e) => {
                  if (reduced) return;
                  const r = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
                }}
                className="t2p-tick group relative bg-[var(--t2p-bg)] p-8 md:p-10 overflow-hidden"
                tabIndex={0}
              >
                {/* Tracked glow — tight, follows the cursor */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "radial-gradient(280px circle at var(--mx, 50%) var(--my, 50%), rgba(103,232,249,0.09), transparent 65%)",
                  }}
                  aria-hidden="true"
                />

                <div className="relative">
                  <div className="flex items-center justify-between mb-10">
                    <inst.Icon
                      className={`h-6 w-6 transition-colors duration-400 ${
                        isActive ? "text-[var(--t2p-ice)]" : "text-[var(--t2p-text-50)]"
                      }`}
                      strokeWidth={1.25}
                      aria-hidden="true"
                    />
                    <span className="t2p-mono text-[0.625rem] uppercase tracking-[0.2em] text-[var(--t2p-text-50)]">
                      {inst.ref}
                    </span>
                  </div>

                  <h3 className="font-innovator text-xl md:text-2xl font-medium tracking-tight mb-4 text-[var(--t2p-text)]">
                    {inst.name}
                  </h3>
                  <p className="text-sm md:text-[0.9375rem] leading-relaxed text-[var(--t2p-text-70)]">
                    {inst.claim}
                  </p>

                  {/* Spec readout — expands on hover/focus, always visible on touch */}
                  <div className="mt-8 lg:hidden">
                    {inst.specs.map((s) => (
                      <SpecRow key={s.k} k={s.k} v={s.v} />
                    ))}
                  </div>
                  <div className="mt-8 hidden lg:block">
                    <AnimatePresence initial={false}>
                      {isActive || reduced ? (
                        <motion.div
                          key="specs"
                          initial={reduced ? false : { height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: EASE }}
                          className="overflow-hidden"
                        >
                          {inst.specs.map((s) => (
                            <SpecRow key={s.k} k={s.k} v={s.v} />
                          ))}
                        </motion.div>
                      ) : (
                        <motion.p
                          key="hint"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="t2p-mono text-[0.625rem] uppercase tracking-[0.2em] text-[var(--t2p-text-50)] py-2.5"
                        >
                          Hover for spec readout
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Baseline scan accent */}
                <span
                  className={`absolute bottom-0 left-0 h-px w-full t2p-beam-h origin-left transition-transform duration-500 ${
                    isActive ? "scale-x-100" : "scale-x-0"
                  }`}
                  aria-hidden="true"
                />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
