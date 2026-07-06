"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Box, Cpu, Crosshair } from "lucide-react";
import { SectionHeader, SpecRow } from "./T2Kit";
import { EASE } from "./t2-lib";

/* ────────────────────────────────────────────────────────────────
   Engineered for precision — bento grid of the three systems,
   treated like flagship hardware modules: rounded surface cards,
   volt icon tiles, one live scan-signal equalizer, one dose
   progress readout, and a big-stat card for the headline number.
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
    accent: "progress" as const,
    specs: [
      { k: "Resolution", v: "0.1 mm voxel" },
      { k: "Capture", v: "One 14-second pass" },
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
    accent: "eq" as const,
    specs: [
      { k: "Scan", v: "Digital, no impression goop" },
      { k: "Mill time", v: "~12 minutes" },
      { k: "Appointments", v: "1, start to seat" },
    ],
  },
  {
    id: "guided",
    Icon: Crosshair,
    ref: "SYS-03",
    name: "Guided implant surgery",
    claim:
      "Implant position is planned on your 3D scan, then executed through a printed surgical guide — not by eye.",
    accent: "none" as const,
    specs: [
      { k: "Planning", v: "On your CBCT scan" },
      { k: "Placement", v: "Guide-directed" },
      { k: "Typical surgery", v: "Under 1 hour" },
    ],
  },
];

export default function T2TechTriptych() {
  const reduced = useReducedMotion();

  return (
    <section id="technology" className="relative py-24 md:py-32 px-6 md:px-12 scroll-mt-20">
      <div className="t2p-blueprint absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div className="relative max-w-7xl mx-auto">
        <SectionHeader
          index="01"
          label="Engineered for precision"
          title={
            <>
              The lab is <span className="t2p-duotext">in the practice.</span>
            </>
          }
          lede="Most dentistry is outsourced — impressions shipped, crowns mailed back, weeks in a temporary. Ours runs on three systems under one roof."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5">
          {INSTRUMENTS.map((inst, i) => (
            <motion.article
              key={inst.id}
              initial={reduced ? false : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: EASE }}
              onMouseMove={(e) => {
                if (reduced) return;
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
              }}
              className="t2p-card group relative overflow-hidden p-7 md:p-8"
            >
              {/* Tracked glow — tight, follows the cursor */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "radial-gradient(280px circle at var(--mx, 50%) var(--my, 50%), rgba(126,224,75,0.08), transparent 65%)",
                }}
                aria-hidden="true"
              />

              <div className="relative flex h-full flex-col">
                <div className="flex items-center justify-between mb-8">
                  {/* Rounded volt icon tile */}
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--t2p-volt-dim)] bg-[rgba(126,224,75,0.08)]">
                    <inst.Icon
                      className="h-5 w-5 text-[var(--t2p-volt)]"
                      strokeWidth={1.25}
                      aria-hidden="true"
                    />
                  </span>
                  <span className="t2p-mono text-[0.625rem] uppercase tracking-[0.2em] text-[var(--t2p-text-50)]">
                    {inst.ref}
                  </span>
                </div>

                <h3 className="font-innovator text-xl md:text-2xl font-medium tracking-tight mb-3.5 text-[var(--t2p-text)]">
                  {inst.name}
                </h3>
                <p className="text-sm md:text-[0.9375rem] leading-relaxed text-[var(--t2p-text-70)]">
                  {inst.claim}
                </p>

                {/* Per-card instrument accent — data-bearing only; the
                    decorative "mill spindle" / "guide calibrated" labels
                    were pruned in the label-density pass. */}
                {inst.accent !== "none" && (
                <div className="mt-7">
                  {inst.accent === "progress" && (
                    <div aria-hidden="true">
                      <div className="t2p-mono flex justify-between text-[0.5625rem] uppercase tracking-[0.16em] text-[var(--t2p-text-50)]">
                        <span>Radiation vs. film X-ray</span>
                        <span className="text-[var(--t2p-volt)]">−90% dose</span>
                      </div>
                      <div className="mt-2 h-1 rounded-full bg-[rgba(242,245,240,0.08)] overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-[var(--t2p-circuit)] to-[var(--t2p-volt)]"
                          initial={reduced ? { width: "90%" } : { width: 0 }}
                          whileInView={{ width: "90%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
                        />
                      </div>
                    </div>
                  )}
                  {inst.accent === "eq" && (
                    <div className="flex items-end justify-end" aria-hidden="true">
                      <span className="t2p-eq">
                        {Array.from({ length: 14 }).map((_, b) => (
                          <span key={b} />
                        ))}
                      </span>
                    </div>
                  )}
                </div>
                )}

                {/* Spec readout */}
                <div className="mt-auto pt-6">
                  {inst.specs.map((s) => (
                    <SpecRow key={s.k} k={s.k} v={s.v} />
                  ))}
                </div>
              </div>
            </motion.article>
          ))}

          {/* Big-stat card — the headline number, full width */}
          <motion.article
            initial={reduced ? false : { opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
            className="t2p-card relative overflow-hidden lg:col-span-3 p-8 md:p-10"
          >
            <div
              className="t2p-corner-glow absolute inset-0 pointer-events-none"
              aria-hidden="true"
            />
            <div className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <p className="t2p-mono flex items-center gap-2.5 text-[0.625rem] uppercase tracking-[0.2em] text-[var(--t2p-text-50)]">
                  <span className="t2p-hud-dot" aria-hidden="true" />
                  Digital impression accuracy
                </p>
                <p className="t2p-duotext font-innovator mt-4 text-6xl md:text-8xl font-medium tracking-[-0.03em]">
                  0.02 mm
                </p>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-[var(--t2p-text-70)]">
                Thinner than a human hair. That is the margin our scanner
                works to — so crowns seat right the first time, and guides
                place implants where the plan says they go.
              </p>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
