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

export default function T2Doctors() {
  const reduced = useReducedMotion();
  const [lead, ...rest] = practice.doctors;

  return (
    <section id="doctors" className="relative py-24 md:py-32 px-6 md:px-12 bg-[var(--t2p-surface)] scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          index="05"
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
            <div className="t2p-portrait relative aspect-[3/4] overflow-hidden rounded-2xl border border-[var(--t2p-line-strong)]">
              <span className="t2p-hud-dot absolute top-4 right-4 z-10" aria-hidden="true" />
              <Image
                src="/images/team/doctor-portrait.jpeg"
                alt={`Portrait of ${lead.name}, ${lead.role}`}
                fill
                loading="lazy"
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
            <div className="mt-4 flex items-center gap-2.5">
              <span className="t2p-dot rounded-full" aria-hidden="true" />
              <span className="text-sm text-[var(--t2p-text-70)]">
                Accepting new patients in {location.cityServed}
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
            <p className="mt-2.5 text-base text-[var(--t2p-volt)]">
              {lead.role}
            </p>

            <p className="mt-8 text-base md:text-lg leading-relaxed text-[var(--t2p-text-70)] max-w-xl">
              {lead.biography}
            </p>

            <ul className="mt-10 max-w-xl">
              {lead.credentials.map((c) => (
                <li
                  key={c}
                  className="t2p-mono flex items-baseline gap-3 border-b border-[var(--t2p-line)] py-3 last:border-b-0 text-[0.75rem] md:text-[0.8125rem] tracking-[0.02em] text-[var(--t2p-text-70)]"
                >
                  <span
                    aria-hidden="true"
                    className="h-px w-4 shrink-0 translate-y-[-3px] bg-[var(--t2p-volt)]"
                  />
                  {c}
                </li>
              ))}
            </ul>
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
                className="relative rounded-2xl bg-[var(--t2p-bg)] border border-[var(--t2p-line)] p-8 md:p-10"
              >
                <h3 className="font-innovator text-xl md:text-2xl font-medium tracking-tight text-[var(--t2p-text)]">
                  {doc.name}
                </h3>
                <p className="mt-2 text-[0.9375rem] text-[var(--t2p-volt)]">
                  {doc.role}
                </p>
                <p className="mt-5 text-sm md:text-[0.9375rem] leading-relaxed text-[var(--t2p-text-70)]">
                  {doc.biography}
                </p>
                <ul className="mt-6">
                  {doc.credentials.map((c) => (
                    <li
                      key={c}
                      className="t2p-mono flex items-baseline gap-3 border-b border-[var(--t2p-line)] py-2.5 last:border-b-0 text-[0.75rem] tracking-[0.02em] text-[var(--t2p-text-70)]"
                    >
                      <span
                        aria-hidden="true"
                        className="h-px w-4 shrink-0 translate-y-[-3px] bg-[var(--t2p-volt)]"
                      />
                      {c}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
