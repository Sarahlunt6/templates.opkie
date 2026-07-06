"use client";

import { useEffect, useMemo, useState } from "react";
import type { LocationNAP, TrustSignals } from "@/types/dentist";
import { GoogleMapEmbed } from "@/components/seo/GoogleMapEmbed";
import T3Reveal from "./T3Reveal";
import {
  buildWeekSchedule,
  getLiveStatus,
  telHref,
  todayIndex,
  type LiveStatus,
} from "./hours";

interface T3HavenVisitProps {
  location: LocationNAP;
  practiceName: string;
  trustSignals: TrustSignals;
  bookingUrl: string | "none";
}

/**
 * The practicalities, kept reassuring: a live open/closed indicator computed
 * from the master-data hours, the weekly schedule with today softly marked,
 * insurance and membership in plain language, neighborhoods served, and the
 * map in a rounded organic frame.
 */
export default function T3HavenVisit({
  location,
  practiceName,
  trustSignals,
  bookingUrl,
}: T3HavenVisitProps) {
  const schedule = useMemo(
    () => buildWeekSchedule(location.hoursOfOperation),
    [location.hoursOfOperation]
  );

  const [status, setStatus] = useState<LiveStatus | null>(null);
  const [todayIdx, setTodayIdx] = useState<number | null>(null);

  useEffect(() => {
    const refresh = () => {
      const now = new Date();
      setStatus(getLiveStatus(schedule, now));
      setTodayIdx(todayIndex(now));
    };
    refresh();
    const id = setInterval(refresh, 60_000);
    return () => clearInterval(id);
  }, [schedule]);

  const hasBooking = bookingUrl !== "none";

  return (
    <section
      id="visit"
      aria-labelledby="visit-heading"
      className="relative py-24 sm:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <T3Reveal className="mb-16 max-w-2xl sm:mb-20">
          <p className="t3-marker mb-6 text-sm font-light text-[var(--t3-moss-soft)]">
            planning a visit
          </p>
          <h2
            id="visit-heading"
            className="t3-display text-[var(--t3-moss)]"
          >
            the practical part,{" "}
            <em className="t3-serif text-[var(--t3-euc-deep)]">
              made simple
            </em>
          </h2>
        </T3Reveal>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          {/* ── hours + contact ─────────────────────────────── */}
          <T3Reveal delay={0.1} className="lg:col-span-5">
            {/* live status */}
            <div className="t3-glass-chip mb-8 px-4 py-2">
              <span
                aria-hidden="true"
                className={`h-2 w-2 rounded-full ${
                  status?.isOpen ? "bg-[var(--t3-euc)]" : "bg-[var(--t3-moss-faint)]"
                }`}
              />
              <span
                className="text-[13px] font-light text-[var(--t3-moss)]"
                aria-live="polite"
              >
                {status?.message ?? "checking today's hours…"}
              </span>
            </div>

            {/* weekly hours from master data */}
            <ul className="mb-10">
              {schedule.map((day, i) => {
                const isToday = todayIdx === i;
                return (
                  <li
                    key={day.day}
                    className={`flex items-center justify-between border-t border-[var(--t3-line)] px-2 py-3 text-[15px] font-light transition-colors duration-500 ${
                      isToday
                        ? "rounded-lg bg-[rgba(109,139,125,0.1)] text-[var(--t3-moss)]"
                        : "text-[var(--t3-moss-soft)]"
                    }`}
                  >
                    <span>
                      {day.day.toLowerCase()}
                      {isToday && (
                        <em className="t3-serif ml-2 text-[var(--t3-euc-ink)]">
                          today
                        </em>
                      )}
                    </span>
                    <span>{day.label.toLowerCase()}</span>
                  </li>
                );
              })}
            </ul>

            <address className="mb-8 space-y-1.5 not-italic">
              <p className="text-base font-light text-[var(--t3-moss)]">
                {location.addressGBP}
              </p>
              <p className="text-base font-light text-[var(--t3-moss-soft)]">
                {location.cityServed}, {location.stateServed}
              </p>
              <p className="pt-2">
                <a
                  href={telHref(location.phoneGBP)}
                  className="text-base font-normal text-[var(--t3-euc-ink)] transition-colors duration-500 hover:text-[var(--t3-moss)]"
                >
                  {location.phoneGBP}
                </a>
              </p>
            </address>

            <a
              href={hasBooking ? bookingUrl : telHref(location.phoneGBP)}
              target={hasBooking ? "_blank" : undefined}
              rel={hasBooking ? "noopener noreferrer" : undefined}
              className="t3-btn t3-btn-primary px-7 py-3.5 text-[15px]"
            >
              Book a visit
            </a>
          </T3Reveal>

          {/* ── map + reassurances ──────────────────────────── */}
          <div className="lg:col-span-7">
            <T3Reveal delay={0.2}>
              <div className="relative mb-10 aspect-[16/10] overflow-hidden rounded-[2.5rem] border-4 border-[var(--t3-sage-light)] shadow-[var(--t3-shadow-bloom)]">
                <GoogleMapEmbed
                  mapUrl={location.googleMapsEmbedUrl}
                  practiceName={practiceName}
                />
              </div>
            </T3Reveal>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <T3Reveal delay={0.25}>
                <h3 className="t3-serif mb-3 text-lg text-[var(--t3-euc-ink)]">
                  insurance, handled
                </h3>
                <p className="text-sm font-light leading-relaxed text-[var(--t3-moss-soft)]">
                  {trustSignals.insuranceAcceptedText}
                </p>
              </T3Reveal>

              {trustSignals.membershipPlanSummary && (
                <T3Reveal delay={0.3}>
                  <h3 className="t3-serif mb-3 text-lg text-[var(--t3-euc-ink)]">
                    no insurance? no problem
                  </h3>
                  <p className="text-sm font-light leading-relaxed text-[var(--t3-moss-soft)]">
                    {trustSignals.membershipPlanSummary}
                  </p>
                </T3Reveal>
              )}
            </div>

            {location.localizedNeighborhoods.length > 0 && (
            <T3Reveal delay={0.35}>
              <div className="mt-10 border-t border-[var(--t3-line)] pt-8">
                <p className="mb-4 text-sm font-light text-[var(--t3-moss-soft)]">
                  easy to reach from
                </p>
                <ul className="flex flex-wrap gap-2.5">
                  {location.localizedNeighborhoods.map((neighborhood) => (
                    <li
                      key={neighborhood}
                      className="rounded-full border border-[var(--t3-line)] px-4 py-1.5 text-[13px] font-light text-[var(--t3-moss)]"
                    >
                      {neighborhood}
                    </li>
                  ))}
                </ul>
              </div>
            </T3Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
