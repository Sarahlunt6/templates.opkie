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

/** The visit, in four steps — template voice */
const STEPS = [
  {
    title: "Reach out",
    note: "Call or book online. A real person answers, and urgent cases are triaged the same day.",
  },
  {
    title: "Plan your visit",
    note: "Insurance is verified before you arrive, so the first conversation is about teeth, not paperwork.",
  },
  {
    title: "Sit down with the doctor",
    note: "An unhurried first hour — photographs, honest answers, and nothing sold.",
  },
  {
    title: "Leave with a plan",
    note: "What is possible, what is necessary, and what is neither — in writing, with numbers.",
  },
];

/**
 * T1 PRESS — the practical facts. A staggered four-step application
 * line with mono indices and hairline connectors, then hours, address,
 * map, insurance and neighborhoods set in a ruled grid.
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
  insuranceText,
  membershipSummary,
  hasSameDayEmergency,
}: T1PracticalitiesProps) {
  const tel = `tel:${phone.replace(/[^0-9+]/g, "")}`;
  const hasBooking = bookingUrl !== "none";

  return (
    <div className="mt-10 lg:mt-14">
      {/* The four steps — staggered timeline on a hairline spine */}
      <ol className="relative" aria-label="How a first visit works">
        {STEPS.map((step, i) => (
          <li
            key={step.title}
            className="relative border-l border-[rgba(26,23,19,0.15)] pb-10 pl-6 last:pb-2 md:pl-10"
          >
            <span
              aria-hidden="true"
              className="absolute -left-[5px] top-1 h-[9px] w-[9px] bg-[#D92B21]"
            />
            <Fade delay={i * 0.06}>
              <div
                className={`max-w-xl ${
                  i % 2 === 1 ? "md:ml-[14%]" : ""
                }`}
              >
                <p className="t1-mono-label t1-mono-label-red">
                  [ 0{i + 1} ]
                </p>
                <h3 className="mt-2 font-t1-press text-2xl uppercase leading-none text-[#1A1713] md:text-3xl">
                  {step.title}
                </h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-[#6B675E] md:text-base">
                  {step.note}
                </p>
              </div>
            </Fade>
          </li>
        ))}
      </ol>

      {/* Emergency line — red, impossible to miss */}
      {hasSameDayEmergency && (
        <Fade>
          <aside
            aria-label="Same-day emergency care"
            className="mt-12 flex flex-col gap-2 border border-[#D92B21] px-5 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
          >
            <p className="t1-mono-label t1-mono-label-red shrink-0">
              [ SAME-DAY EMERGENCIES ]
            </p>
            <p className="font-sans text-sm leading-relaxed text-[#1A1713] sm:text-right">
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

      {/* The facts — ruled grid */}
      <div className="mt-12 grid grid-cols-1 gap-px border border-[rgba(26,23,19,0.15)] bg-[rgba(26,23,19,0.15)] lg:grid-cols-2">
        {/* Hours */}
        <div className="bg-[#F3EFE6] p-6 md:p-8">
          <Fade>
            <h3 className="t1-mono-label t1-mono-label-red">[ HOURS ]</h3>
            <ul className="mt-4">
              {hours.map((entry) => (
                <li
                  key={entry.dayRange}
                  className="flex items-baseline justify-between gap-6 border-t border-[rgba(26,23,19,0.15)] py-3"
                >
                  <span className="font-sans text-sm text-[#1A1713]">
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
                className="border-t border-[rgba(26,23,19,0.15)]"
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
                  className="t1-link mt-3 inline-block font-t1-press text-2xl text-[#1A1713]"
                >
                  {phone}
                </a>
              </div>
              <div>
                <h3 className="t1-mono-label t1-mono-label-red">
                  [ ADDRESS ]
                </h3>
                <address className="mt-3 font-sans text-sm not-italic leading-relaxed text-[#1A1713]">
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
        <div className="bg-[#F3EFE6] p-6 md:p-8">
          <Fade delay={0.05}>
            <h3 className="t1-mono-label t1-mono-label-red">[ THE MAP ]</h3>
            <div className="mt-4 border border-[#1A1713]">
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

        {/* Insurance */}
        <div className="bg-[#F3EFE6] p-6 md:p-8">
          <Fade>
            <h3 className="t1-mono-label t1-mono-label-red">
              [ ON INSURANCE ]
            </h3>
            <p className="mt-4 max-w-prose font-sans text-sm leading-[1.8] text-[#6B675E] md:text-base">
              {insuranceText}
            </p>
          </Fade>
        </div>

        {/* Membership */}
        <div className="bg-[#F3EFE6] p-6 md:p-8">
          <Fade delay={0.05}>
            {membershipSummary ? (
              <>
                <h3 className="t1-mono-label t1-mono-label-red">
                  [ WITHOUT INSURANCE ]
                </h3>
                <p className="mt-4 max-w-prose font-sans text-sm leading-[1.8] text-[#6B675E] md:text-base">
                  {membershipSummary}
                </p>
              </>
            ) : (
              <>
                <h3 className="t1-mono-label t1-mono-label-red">
                  [ QUESTIONS ]
                </h3>
                <p className="mt-4 max-w-prose font-sans text-sm leading-[1.8] text-[#6B675E] md:text-base">
                  Call {phone} — a real person answers.
                </p>
              </>
            )}
          </Fade>
        </div>
      </div>

      {/* Neighborhoods — ruled closing line */}
      <Fade delay={0.05}>
        <div className="mt-8 flex flex-col gap-2 border-t border-[rgba(26,23,19,0.15)] pt-4 sm:flex-row sm:items-baseline sm:gap-6">
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
