"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { SectionHeader, SpecRow } from "./T2Kit";
import { practice, location, EASE } from "./t2-lib";

/* ────────────────────────────────────────────────────────────────
   Operator profiles — the clinicians treated like the systems they
   run: duotone-scanned portrait, credentials as a mono spec list,
   biography in clean body type. All facts from practice data.
   ──────────────────────────────────────────────────────────────── */

export default function T2Doctors() {
  const reduced = useReducedMotion();
  const [lead, ...rest] = practice.doctors;

  return (
    <section id="doctors" className="relative py-24 md:py-32 px-6 md:px-12 bg-[var(--t2p-surface)] scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          index="04"
          label="Operators"
          title={
            <>
              The hands behind <span className="t2p-duotext">the hardware.</span>
            </>
          }
          lede="Precision equipment doesn't treat patients. These clinicians do."
        />

        {/* Lead profile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Portrait — scan/duotone treatment */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="lg:col-span-5"
          >
            <div className="t2p-tick t2p-portrait relative aspect-[3/4] overflow-hidden border border-[var(--t2p-line-strong)]">
              <Image
                src="/images/team/doctor-portrait.jpeg"
                alt={`Portrait of ${lead.name}, ${lead.role}`}
                fill
                loading="lazy"
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="t2p-wireframe absolute inset-0 opacity-[0.1]" aria-hidden="true" />
              <span className="t2p-mono absolute top-4 left-4 z-10 text-[0.625rem] uppercase tracking-[0.2em] text-[var(--t2p-text-70)] bg-[#0A0C10]/70 px-2 py-1">
                OP-01
              </span>
            </div>
            <div className="mt-4 flex items-center gap-2.5">
              <span className="t2p-dot rounded-full" aria-hidden="true" />
              <span className="t2p-mono text-[0.625rem] uppercase tracking-[0.18em] text-[var(--t2p-text-70)]">
                Accepting patients — {location.cityServed}
              </span>
            </div>
          </motion.div>

          {/* Bio + credentials */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="lg:col-span-7 lg:pt-6"
          >
            <h3 className="font-innovator text-3xl md:text-4xl font-medium tracking-tight text-[var(--t2p-text)]">
              {lead.name}
            </h3>
            <p className="t2p-mono mt-2.5 text-[0.6875rem] uppercase tracking-[0.18em] text-[var(--t2p-ice)]">
              {lead.role}
            </p>

            <p className="mt-8 text-base md:text-lg leading-relaxed text-[var(--t2p-text-70)] max-w-xl">
              {lead.biography}
            </p>

            <div className="mt-10 max-w-xl">
              <p className="t2p-mono mb-2 text-[0.625rem] uppercase tracking-[0.2em] text-[var(--t2p-text-50)]">
                Credentials
              </p>
              {lead.credentials.map((c, i) => (
                <SpecRow key={c} k={`0${i + 1}`} v={c} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Additional operators */}
        {rest.length > 0 && (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
            {rest.map((doc, i) => (
              <motion.article
                key={doc.name}
                initial={reduced ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                className="t2p-tick relative bg-[var(--t2p-bg)] border border-[var(--t2p-line)] p-8 md:p-10"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="t2p-mono text-[0.625rem] uppercase tracking-[0.2em] text-[var(--t2p-text-50)]">
                    OP-{String(i + 2).padStart(2, "0")}
                  </span>
                  <span className="t2p-mono text-[0.625rem] uppercase tracking-[0.18em] text-[var(--t2p-ice)]">
                    {doc.role}
                  </span>
                </div>
                <h3 className="font-innovator text-xl md:text-2xl font-medium tracking-tight text-[var(--t2p-text)]">
                  {doc.name}
                </h3>
                <p className="mt-4 text-sm md:text-[0.9375rem] leading-relaxed text-[var(--t2p-text-70)]">
                  {doc.biography}
                </p>
                <div className="mt-6">
                  {doc.credentials.map((c, j) => (
                    <SpecRow key={c} k={`0${j + 1}`} v={c} />
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
