interface HoursEntry {
  dayRange: string;
  structuralHours: string;
}

interface T1FooterProps {
  practiceName: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  bookingUrl: string;
  hours: HoursEntry[];
}

export default function T1Footer({
  practiceName,
  address,
  city,
  state,
  phone,
  bookingUrl,
  hours,
}: T1FooterProps) {
  const tel = `tel:${phone.replace(/[^0-9+]/g, "")}`;
  const hasBooking = bookingUrl !== "none";
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#16130F] px-6 pb-28 pt-16 text-[#F7F5F0] md:px-10 lg:pb-16 xl:px-16">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-12 border-t border-[#F7F5F0]/20 pt-12 md:grid-cols-12 md:gap-8">
          {/* Masthead repeat */}
          <div className="md:col-span-5">
            <p className="font-t1-display text-3xl font-light tracking-tight md:text-4xl">
              {practiceName}
            </p>
            <address className="mt-5 font-sans text-sm not-italic leading-relaxed text-[#F7F5F0]/60">
              {address}
              <br />
              {city}, {state}
            </address>
            <a
              href={tel}
              className="mt-4 inline-block font-t1-display text-xl text-[#F7F5F0] underline decoration-[#9C7E46] decoration-1 underline-offset-4 transition-colors duration-500 hover:text-[#9C7E46]"
            >
              {phone}
            </a>
          </div>

          {/* Hours, condensed */}
          <div className="md:col-span-4">
            <h3 className="t1-eyebrow">Hours</h3>
            <ul className="mt-4 space-y-2">
              {hours.map((entry) => (
                <li
                  key={entry.dayRange}
                  className="flex items-baseline justify-between gap-6 font-sans text-sm text-[#F7F5F0]/60"
                >
                  <span>{entry.dayRange}</span>
                  <span
                    className={
                      /closed/i.test(entry.structuralHours)
                        ? "italic text-[#F7F5F0]/35"
                        : "text-[#F7F5F0]/80"
                    }
                  >
                    {entry.structuralHours}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Appointments */}
          <div className="md:col-span-3">
            <h3 className="t1-eyebrow">Appointments</h3>
            <p className="mt-4 font-sans text-sm leading-relaxed text-[#F7F5F0]/60">
              New patients are welcomed by reservation.
            </p>
            <a
              href={hasBooking ? bookingUrl : tel}
              {...(hasBooking
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="t1-btn t1-btn-ghost-light mt-6 !min-h-0 !px-5 !py-3 text-[10px]"
            >
              Reserve a consultation
            </a>
          </div>
        </div>

        {/* Colophon */}
        <div className="mt-14 flex flex-col gap-2 border-t border-[#F7F5F0]/20 pt-6 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="font-sans text-xs text-[#F7F5F0]/45">
            © {year} {practiceName}. All rights reserved.
          </p>
          <p className="font-sans text-xs italic text-[#F7F5F0]/35">
            Vol. I — The Smile Issue · Set in Fraunces &amp; Inter
          </p>
        </div>
      </div>
    </footer>
  );
}
