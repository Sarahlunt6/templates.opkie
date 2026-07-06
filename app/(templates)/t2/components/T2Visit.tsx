"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PhoneCall } from "lucide-react";
import { SectionHeader, SpecRow } from "./T2Kit";
import {
  practice,
  location,
  telHref,
  bookingHref,
  expandHours,
  isOpenNow,
  EASE,
} from "./t2-lib";

/* ────────────────────────────────────────────────────────────────
   Visit — the practical panel. Live open/closed status computed
   client-side, hours as a spec table, a hairline-framed map that
   renders normally on the light page, insurance and membership
   readouts, and the same-day emergency line.
   ──────────────────────────────────────────────────────────────── */

export default function T2Visit() {
  const reduced = useReducedMotion();
  const week = useMemo(() => expandHours(location.hoursOfOperation), []);
  // Computed after mount to avoid hydration drift
  const [status, setStatus] = useState<{ open: boolean; day: string } | null>(null);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setStatus({
        open: isOpenNow(week, now),
        day: now.toLocaleDateString("en-US", { weekday: "long" }),
      });
    };
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, [week]);

  return (
    <section id="visit" className="relative py-24 md:py-32 px-6 md:px-12 scroll-mt-20">
      <div className="t2p-blueprint absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div className="relative max-w-7xl mx-auto">
        <SectionHeader
          index="18"
          label="Plan your visit"
          title={
            <>
              Find us in <span className="t2p-duotext">{location.cityServed}.</span>
            </>
          }
        />

        {/* Emergency line — prominent */}
        {practice.trustSignals.hasSameDayEmergency && (
          <motion.a
            href={telHref}
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="group mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-[var(--t2p-scan-dim)] bg-[rgba(56,189,248,0.06)] px-6 md:px-8 py-5 hover:bg-[rgba(56,189,248,0.1)] transition-colors duration-300"
          >
            <span className="flex items-center gap-4">
              <PhoneCall
                className="h-5 w-5 text-[var(--t2p-blue)]"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <span>
                <span className="t2p-mono block text-[0.625rem] uppercase tracking-[0.2em] text-[var(--t2p-blue)]">
                  Dental emergency
                </span>
                <span className="mt-1 block text-sm md:text-base text-[var(--t2p-text)]">
                  Same-day appointments held every day we&apos;re open. Call now.
                </span>
              </span>
            </span>
            <span className="t2p-mono text-lg md:text-xl text-[var(--t2p-blue)] tracking-tight">
              {location.phoneGBP}
            </span>
          </motion.a>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Left: hours + address */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="relative rounded-2xl border border-[var(--t2p-line)] bg-[var(--t2p-bg)] p-7 md:p-9"
          >
            <div className="flex items-center justify-between mb-7">
              <p className="t2p-label">Hours of operation</p>
              {status && (
                <span className="flex items-center gap-2.5">
                  <span
                    className={`rounded-full ${status.open ? "t2p-dot" : "t2p-dot-off"}`}
                    aria-hidden="true"
                  />
                  <span
                    className={`t2p-mono text-[0.625rem] uppercase tracking-[0.18em] ${
                      status.open ? "text-[var(--t2p-blue)]" : "text-[var(--t2p-text-50)]"
                    }`}
                  >
                    {status.open ? "Open now" : "Closed now"}
                  </span>
                </span>
              )}
            </div>

            <div role="table" aria-label="Weekly hours">
              {week.map((d) => {
                const isToday = status?.day === d.day;
                return (
                  <div
                    key={d.day}
                    className={`flex items-baseline justify-between gap-4 py-2.5 border-b border-[var(--t2p-line)] last:border-b-0 ${
                      isToday ? "bg-[rgba(56,189,248,0.07)] -mx-3 px-3" : ""
                    }`}
                  >
                    <span
                      className={`t2p-mono text-[0.6875rem] uppercase tracking-[0.16em] ${
                        isToday ? "text-[var(--t2p-blue)]" : "text-[var(--t2p-text-50)]"
                      }`}
                    >
                      {d.day}
                    </span>
                    <span
                      className={`t2p-mono text-sm ${
                        d.hours === "Closed"
                          ? "text-[var(--t2p-text-50)]"
                          : "text-[var(--t2p-text)]"
                      }`}
                    >
                      {d.hours}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 border-t border-[var(--t2p-line)] pt-6">
              <p className="t2p-label mb-3">Address</p>
              <address className="not-italic text-sm leading-relaxed text-[var(--t2p-text-70)]">
                {location.addressGBP}
                <br />
                {location.cityServed}, {location.stateServed}
              </address>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a href={bookingHref} className="t2p-btn t2p-btn-primary">
                  Book a visit
                </a>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                    `${location.addressGBP}, ${location.cityServed}, ${location.stateServed}`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="t2p-btn t2p-btn-ghost"
                >
                  <span aria-hidden="true">↗</span>
                  Get directions
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right: hairline-framed map, rendered normally */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.08, ease: EASE }}
            className="t2p-map relative min-h-[380px] rounded-2xl border border-[var(--t2p-line)] overflow-hidden"
          >
            <iframe
              src={location.googleMapsEmbedUrl}
              className="absolute inset-0 h-full w-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map to ${location.practiceNameGBP}`}
            />
            <span className="t2p-mono pointer-events-none absolute top-4 left-4 bg-white/85 px-2.5 py-1.5 text-[0.625rem] uppercase tracking-[0.18em] text-[var(--t2p-text-70)]">
              {location.cityServed}, {location.stateServed}
            </span>
          </motion.div>
        </div>

        {/* Insurance + membership readouts */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="rounded-2xl border border-[var(--t2p-line)] bg-[var(--t2p-bg)] p-7 md:p-8"
          >
            <p className="t2p-label mb-3.5">Insurance</p>
            <p className="text-sm leading-relaxed text-[var(--t2p-text-70)]">
              {practice.trustSignals.insuranceAcceptedText}
            </p>
          </motion.div>
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
            className="rounded-2xl border border-[var(--t2p-line)] bg-[var(--t2p-bg)] p-7 md:p-8"
          >
            <p className="t2p-label mb-3.5">No insurance?</p>
            <p className="text-sm leading-relaxed text-[var(--t2p-text-70)]">
              {practice.trustSignals.membershipPlanSummary}
            </p>
            {practice.trustSignals.hasSedationAnxietyCare && (
              <div className="mt-5 border-t border-[var(--t2p-line)] pt-4">
                <SpecRow k="Anxious patients" v="Sedation options available" accent />
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
