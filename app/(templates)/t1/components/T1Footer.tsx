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

/**
 * T1 PRESS — ink-dark closing. A CTA statement with one italic phrase,
 * a paper-colored rectangular button, ruled link columns, then the
 * entire practice name as a giant cream wordmark spanning the full
 * width, slightly cropped by the viewport edge.
 */
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

  // Anton caps + word spaces average ≈ 0.52em advance — span the full
  // practice name edge to edge at every viewport width.
  const wordmarkSize = `calc(100vw / ${(practiceName.length * 0.52).toFixed(2)})`;

  return (
    <footer className="overflow-hidden bg-[#1A1713] text-[#F3EFE6]">
      <div className="mx-auto max-w-[1500px] px-4 pt-20 md:px-8 md:pt-28 xl:px-12">
        {/* Closing statement */}
        <div className="border-b border-[rgba(243,239,230,0.22)] pb-14 md:pb-20">
          <p className="t1-mono-label t1-mono-label-red">[ THE LAST WORD ]</p>
          <h2 className="mt-6 max-w-4xl font-t1-press text-[clamp(2.2rem,6vw,4.5rem)] uppercase leading-[0.95]">
            Your smile belongs on{" "}
            <em className="t1-italic normal-case text-[#D92B21]">
              the front page.
            </em>
          </h2>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <a
              href={hasBooking ? bookingUrl : tel}
              {...(hasBooking
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="t1-btn t1-btn-paper"
            >
              Book a consultation
            </a>
            <a
              href={tel}
              className="t1-mono-label !text-[#F3EFE6] underline decoration-[#D92B21] decoration-1 underline-offset-4 transition-colors duration-200 hover:text-[#D92B21]"
            >
              OR CALL {phone}
            </a>
          </div>
        </div>

        {/* Ruled link columns */}
        <div className="grid grid-cols-1 gap-10 py-12 md:grid-cols-3 md:gap-8">
          <div>
            <h3 className="t1-mono-label t1-mono-label-red">[ VISIT ]</h3>
            <address className="mt-4 font-sans text-sm not-italic leading-relaxed text-[#F3EFE6]/65">
              {address}
              <br />
              {city}, {state}
            </address>
            <a
              href={tel}
              className="mt-3 inline-block font-t1-press text-2xl text-[#F3EFE6] transition-colors duration-200 hover:text-[#D92B21]"
            >
              {phone}
            </a>
          </div>

          <div>
            <h3 className="t1-mono-label t1-mono-label-red">[ HOURS ]</h3>
            <ul className="mt-4 space-y-2">
              {hours.map((entry) => (
                <li
                  key={entry.dayRange}
                  className="flex items-baseline justify-between gap-6 font-sans text-sm text-[#F3EFE6]/65"
                >
                  <span>{entry.dayRange}</span>
                  <span
                    className={`t1-mono-label ${
                      /closed/i.test(entry.structuralHours)
                        ? "!text-[#F3EFE6]/35"
                        : "!text-[#F3EFE6]/80"
                    }`}
                  >
                    {entry.structuralHours.toUpperCase()}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="t1-mono-label t1-mono-label-red">
              [ APPOINTMENTS ]
            </h3>
            <p className="mt-4 font-sans text-sm leading-relaxed text-[#F3EFE6]/65">
              New patients are welcomed by reservation.
            </p>
            <a
              href={hasBooking ? bookingUrl : tel}
              {...(hasBooking
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="t1-mono-label mt-5 inline-block border border-[rgba(243,239,230,0.4)] px-4 py-3 !text-[#F3EFE6] transition-colors duration-200 hover:border-[#D92B21] hover:bg-[#D92B21]"
            >
              BOOK ONLINE
            </a>
          </div>
        </div>

        {/* Legal line */}
        <div className="flex flex-col gap-2 border-t border-[rgba(243,239,230,0.22)] py-5 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="t1-mono-label !text-[#F3EFE6]/45">
            © {year} {practiceName.toUpperCase()}. ALL RIGHTS RESERVED.
          </p>
          <p className="t1-mono-label !text-[#F3EFE6]/35">
            SET IN ANTON, INTER &amp; JETBRAINS MONO
          </p>
        </div>
      </div>

      {/* The closing statement — the entire name, full width, cropped */}
      <p
        aria-hidden="true"
        className="mt-4 whitespace-nowrap text-center font-t1-press uppercase leading-[0.78] tracking-[0.005em] text-[#F3EFE6]"
        style={{ fontSize: wordmarkSize, marginBottom: `calc(${wordmarkSize} * -0.14)` }}
      >
        {practiceName}
      </p>
    </footer>
  );
}
