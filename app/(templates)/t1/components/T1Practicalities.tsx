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
 * The practicalities spread — hours, address, insurance, membership,
 * map and neighborhoods, set like the service pages at the back of a
 * magazine issue.
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
    <div className="mt-14 lg:mt-20">
      {/* Emergency line — discreet, but impossible to miss */}
      {hasSameDayEmergency && (
        <Fade>
          <aside
            aria-label="Same-day emergency care"
            className="flex flex-col gap-2 border-y border-[#5E2A2B]/30 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
          >
            <p className="t1-eyebrow !text-[#5E2A2B]">Same-day emergencies</p>
            <p className="font-sans text-sm leading-relaxed text-[#16130F] sm:text-right">
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

      <div className="mt-14 grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-8">
        {/* Left column — hours & contact */}
        <div className="lg:col-span-5">
          <Fade>
            <h3 className="t1-eyebrow">Hours of operation</h3>
            <ul className="mt-4">
              {hours.map((entry) => (
                <li
                  key={entry.dayRange}
                  className="flex items-baseline justify-between gap-6 border-t border-[#16130F]/15 py-3.5"
                >
                  <span className="font-sans text-sm text-[#16130F]">
                    {entry.dayRange}
                  </span>
                  <span
                    className={`font-t1-display text-base ${
                      /closed/i.test(entry.structuralHours)
                        ? "italic text-[#6B675E]"
                        : "text-[#16130F]"
                    }`}
                  >
                    {entry.structuralHours}
                  </span>
                </li>
              ))}
              <li className="border-t border-[#16130F]/15" aria-hidden="true" />
            </ul>
          </Fade>

          <Fade delay={0.1}>
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <h3 className="t1-eyebrow">Telephone</h3>
                <a
                  href={tel}
                  className="t1-link mt-3 inline-block font-t1-display text-2xl text-[#16130F]"
                >
                  {phone}
                </a>
              </div>
              <div>
                <h3 className="t1-eyebrow">Address</h3>
                <address className="mt-3 font-sans text-sm not-italic leading-relaxed text-[#16130F]">
                  {address}
                  <br />
                  {city}, {state}
                </address>
              </div>
            </div>
          </Fade>

          {hasBooking && (
            <Fade delay={0.15}>
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="t1-btn t1-btn-ghost mt-10"
              >
                Reserve online
              </a>
            </Fade>
          )}
        </div>

        {/* Right column — the map, framed like a plate */}
        <div className="lg:col-span-6 lg:col-start-7">
          <Fade delay={0.05}>
            <div className="border border-[#16130F]/15 p-2">
              <div className="relative aspect-[4/3] w-full">
                <GoogleMapEmbed
                  mapUrl={mapsEmbedUrl}
                  practiceName={practiceName}
                />
              </div>
            </div>
            <p className="mt-3 flex items-baseline justify-between font-sans text-xs text-[#6B675E]">
              <span>
                {address}, {city}
              </span>
              <span className="t1-eyebrow hidden sm:block">Fig. 05</span>
            </p>
          </Fade>
        </div>
      </div>

      {/* Insurance & membership, set as back-of-book text columns */}
      <Fade delay={0.1}>
        <div className="mt-16 grid grid-cols-1 gap-10 border-t border-[#16130F]/15 pt-10 md:grid-cols-2 md:gap-8">
          <div>
            <h3 className="t1-eyebrow">On insurance</h3>
            <p className="mt-4 max-w-prose font-sans text-sm leading-[1.85] text-[#6B675E] md:text-base">
              {insuranceText}
            </p>
          </div>
          {membershipSummary && (
            <div>
              <h3 className="t1-eyebrow">Without insurance</h3>
              <p className="mt-4 max-w-prose font-sans text-sm leading-[1.85] text-[#6B675E] md:text-base">
                {membershipSummary}
              </p>
            </div>
          )}
        </div>
      </Fade>

      {/* Neighborhoods — a refined closing line */}
      <Fade delay={0.15}>
        <p className="mt-16 border-t border-[#16130F]/15 pt-10 text-center font-t1-display text-xl font-light italic leading-relaxed text-[#16130F] md:text-2xl">
          At home in {neighborhoods.slice(0, -1).join(", ")}
          {neighborhoods.length > 1
            ? ` and ${neighborhoods[neighborhoods.length - 1]}`
            : ""}
          .
        </p>
      </Fade>
    </div>
  );
}
