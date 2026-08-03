"use client";

import { GoogleMapEmbed } from "@/components/seo/GoogleMapEmbed";
import { Fade } from "./T1Motion";

interface HoursEntry {
  dayRange: string;
  structuralHours: string;
}

interface T1PracticalitiesProps {
  practiceName: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  bookingUrl: string;
  mapsEmbedUrl: string;
  hours: HoursEntry[];
  neighborhoods: string[];
  insuranceText: string;
  membershipSummary?: string;
  hasSameDayEmergency: boolean;
}

/**
 * T1 PRESS — the practical facts: a same-day emergency line, then hours,
 * telephone, address and map in a ruled grid. (The first-visit steps now
 * live in their own chapter; financing/insurance in theirs.)
 */
export default function T1Practicalities({
  practiceName,
  address,
  city,
  state,
  phone,
  bookingUrl,
  mapsEmbedUrl,
  hours,
  neighborhoods,
  hasSameDayEmergency,
}: T1PracticalitiesProps) {
  const tel = `tel:${phone.replace(/[^0-9+]/g, "")}`;
  const hasBooking = bookingUrl !== "none";

  return (
    <div className="mt-10 lg:mt-14">
      {/* Emergency line — red, impossible to miss */}
      {hasSameDayEmergency && (
        <Fade>
          <aside
            aria-label="Same-day emergency care"
            className="mt-12 flex flex-col gap-2 border border-[var(--t1-red)] px-5 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
          >
            <p className="t1-mono-label t1-mono-label-red shrink-0">
              [ SAME-DAY EMERGENCIES ]
            </p>
            <p className="font-sans text-sm leading-relaxed text-[var(--t1-ink)] sm:text-right">
              A cracked tooth does not wait for a convenient hour. Time is
              held each day for urgent care —{" "}
              <a href={tel} className="t1-link whitespace-nowrap font-medium">
                call {phone}
              </a>
              .
            </p>
          </aside>
        </Fade>
      )}

      {/* Facts header */}
      <div className="mt-12 border-b border-[var(--t1-hairline)] pb-3">
        <p className="t1-mono-label t1-mono-label-red">[ THE FACTS ]</p>
      </div>

      {/* The facts — ruled grid */}
      <div className="mt-4 grid grid-cols-1 gap-px border border-[var(--t1-hairline)] bg-[var(--t1-hairline)] lg:grid-cols-2">
        {/* Hours */}
        <div className="bg-[var(--t1-paper)] p-6 md:p-8">
          <Fade>
            <h3 className="t1-mono-label t1-mono-label-red">[ HOURS ]</h3>
            <ul className="mt-4">
              {hours.map((entry) => (
                <li
                  key={entry.dayRange}
                  className="flex items-baseline justify-between gap-6 border-t border-[var(--t1-hairline)] py-3"
                >
                  <span className="font-sans text-sm text-[var(--t1-ink)]">
                    {entry.dayRange}
                  </span>
                  <span
                    className={`t1-mono-label ${
                      /closed/i.test(entry.structuralHours)
                        ? "t1-mono-label-stone"
                        : ""
                    }`}
                  >
                    {entry.structuralHours.toUpperCase()}
                  </span>
                </li>
              ))}
              <li
                className="border-t border-[var(--t1-hairline)]"
                aria-hidden="true"
              />
            </ul>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <h3 className="t1-mono-label t1-mono-label-red">
                  [ TELEPHONE ]
                </h3>
                <a
                  href={tel}
                  className="t1-link mt-3 inline-block font-t1-press text-2xl text-[var(--t1-ink)]"
                >
                  {phone}
                </a>
              </div>
              <div>
                <h3 className="t1-mono-label t1-mono-label-red">
                  [ ADDRESS ]
                </h3>
                <address className="mt-3 font-sans text-sm not-italic leading-relaxed text-[var(--t1-ink)]">
                  {address}
                  <br />
                  {city}, {state}
                </address>
              </div>
            </div>

            {hasBooking && (
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="t1-btn t1-btn-outline mt-8"
              >
                Book online
              </a>
            )}
          </Fade>
        </div>

        {/* Map — framed like a printed plate */}
        <div className="bg-[var(--t1-paper)] p-6 md:p-8">
          <Fade delay={0.05}>
            <h3 className="t1-mono-label t1-mono-label-red">[ THE MAP ]</h3>
            <div className="mt-4 border border-[var(--t1-ink)]">
              <div className="relative aspect-[4/3] w-full">
                <GoogleMapEmbed
                  mapUrl={mapsEmbedUrl}
                  practiceName={practiceName}
                />
              </div>
            </div>
            <p className="mt-3 flex items-baseline justify-between gap-4">
              <span className="t1-mono-label t1-mono-label-stone">
                {address.toUpperCase()}, {city.toUpperCase()}
              </span>
              <span className="t1-mono-label hidden sm:block">FIG. 03</span>
            </p>
          </Fade>
        </div>
      </div>

      {/* Neighborhoods — ruled closing line */}
      <Fade delay={0.05}>
        <div className="mt-8 flex flex-col gap-2 border-t border-[var(--t1-hairline)] pt-4 sm:flex-row sm:items-baseline sm:gap-6">
          <p className="t1-mono-label t1-mono-label-red shrink-0">
            [ AT HOME IN ]
          </p>
          <p className="t1-mono-label t1-mono-label-stone !normal-case !tracking-[0.08em]">
            {neighborhoods.join("  /  ")}
          </p>
        </div>
      </Fade>
    </div>
  );
}
