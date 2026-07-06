"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { SectionHeader } from "./T2Kit";
import { practice, location, EASE } from "./t2-lib";

/* ────────────────────────────────────────────────────────────────
   The clinicians — deliberately the warmest section on the page.
   Mono type is reserved for machines and numbers; people get real
   portraits and human typography. All facts from practice data.
   ──────────────────────────────────────────────────────────────── */

/* Real portraits, in doctor order. The data's portraitUrl points at
   placeholder files that don't exist, so T2 maps to the shot team
   photography instead; extra doctors fall back to the lead portrait. */
const PORTRAITS = [
  "/images/team/doctor-portrait.jpeg",
  "/images/team/staff-photo.jpg",
];

export default function T2Doctors() {
  const reduced = useReducedMotion();

  return (
    <section id="doctors" className="relative py-24 md:py-32 px-6 md:px-12 bg-[var(--t2p-surface)] scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          index="15"
          label="Your doctors"
          title={
            <>
              The hands behind <span className="t2p-duotext">the hardware.</span>
            </>
          }
          lede="Precision equipment doesn't treat patients. These clinicians do."
        />

        {/* Clinicians — symmetric two-up grid, each with a portrait */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {practice.doctors.map((doc, i) => (
            <motion.article
              key={doc.name}
              initial={reduced ? false : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
              className="relative flex flex-col overflow-hidden rounded-2xl border border-[var(--t2p-line)] bg-[var(--t2p-bg)]"
            >
              {/* Portrait — scan/duotone treatment */}
              <div className="t2p-portrait relative aspect-[4/3] overflow-hidden border-b border-[var(--t2p-line-strong)]">
                <span className="t2p-hud-dot absolute top-4 right-4 z-10" aria-hidden="true" />
                <Image
                  src={PORTRAITS[i] ?? PORTRAITS[0]}
                  alt={`Portrait of ${doc.name}, ${doc.role}`}
                  fill
                  loading="lazy"
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Bio + credentials */}
              <div className="flex flex-1 flex-col p-8 md:p-10">
                <h3 className="font-innovator text-2xl md:text-3xl font-medium tracking-tight text-[var(--t2p-text)]">
                  {doc.name}
                </h3>
                <p className="mt-2 text-base text-[var(--t2p-blue)]">
                  {doc.role}
                </p>

                <p className="mt-6 text-base leading-relaxed text-[var(--t2p-text-70)]">
                  {doc.biography}
                </p>

                <ul className="mt-8">
                  {doc.credentials.map((c) => (
                    <li
                      key={c}
                      className="t2p-mono flex items-baseline gap-3 border-b border-[var(--t2p-line)] py-3 last:border-b-0 text-[0.75rem] md:text-[0.8125rem] tracking-[0.02em] text-[var(--t2p-text-70)]"
                    >
                      <span
                        aria-hidden="true"
                        className="h-px w-4 shrink-0 translate-y-[-3px] bg-[var(--t2p-scan-dim)]"
                      />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Accepting-new-patients note */}
        <div className="mt-10 flex items-center gap-2.5">
          <span className="t2p-dot rounded-full" aria-hidden="true" />
          <span className="text-sm text-[var(--t2p-text-70)]">
            Accepting new patients in {location.cityServed}
          </span>
        </div>
      </div>
    </section>
  );
}
