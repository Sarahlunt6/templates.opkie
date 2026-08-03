import { SITE_PAGES, pageHref } from "@/components/wireframe/site-pages";
import BrandMark from "@/components/brand/BrandMark";

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
  /** Path of the template home ("/t1" in the hub, "/" in a client site) so
   *  the site-map links resolve from interior pages. */
  homeHref?: string;
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
  homeHref = "",
}: T1FooterProps) {
  const tel = `tel:${phone.replace(/[^0-9+]/g, "")}`;
  const hasBooking = bookingUrl !== "none";
  const year = new Date().getFullYear();

  // Anton caps + word spaces average ≈ 0.52em advance — span the full
  // practice name edge to edge at every viewport width.
  const wordmarkSize = `calc(100vw / ${(practiceName.length * 0.52).toFixed(2)})`;

  return (
    <footer className="overflow-hidden bg-[var(--t1-ink)] text-[var(--t1-paper)]">
      <div className="mx-auto max-w-[1500px] px-4 pt-20 md:px-8 md:pt-28 xl:px-12">
        {/* Closing statement */}
        <div className="border-b border-[var(--t1-hairline-light)] pb-14 md:pb-20">
          <p className="t1-mono-label t1-mono-label-red-paper">[ THE LAST WORD ]</p>
          <h2 className="mt-6 max-w-4xl font-t1-press text-[clamp(2.2rem,6vw,4.5rem)] uppercase leading-[0.95]">
            Your smile belongs on{" "}
            <em className="t1-italic normal-case text-[var(--t1-red)]">
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
              className="t1-mono-label !text-[var(--t1-paper)] underline decoration-[var(--t1-red)] decoration-1 underline-offset-4 transition-colors duration-200 hover:text-[var(--t1-red)]"
            >
              OR CALL {phone}
            </a>
          </div>
        </div>

        {/* Ruled link columns */}
        <div className="grid grid-cols-1 gap-10 py-12 md:grid-cols-4 md:gap-8">
          <div>
            <h3 className="t1-mono-label t1-mono-label-red-paper">[ VISIT ]</h3>
            <address className="mt-4 font-sans text-sm not-italic leading-relaxed text-[var(--t1-paper-65)]">
              {address}
              <br />
              {city}, {state}
            </address>
            <a
              href={tel}
              className="mt-3 inline-block font-t1-press text-2xl text-[var(--t1-paper)] transition-colors duration-200 hover:text-[var(--t1-red)]"
            >
              {phone}
            </a>
          </div>

          <div>
            <h3 className="t1-mono-label t1-mono-label-red-paper">[ HOURS ]</h3>
            <ul className="mt-4 space-y-2">
              {hours.map((entry) => (
                <li
                  key={entry.dayRange}
                  className="flex items-baseline justify-between gap-6 font-sans text-sm text-[var(--t1-paper-65)]"
                >
                  <span>{entry.dayRange}</span>
                  <span
                    className={`t1-mono-label ${
                      /closed/i.test(entry.structuralHours)
                        ? "!text-[var(--t1-paper-60)]"
                        : "!text-[var(--t1-paper-80)]"
                    }`}
                  >
                    {entry.structuralHours.toUpperCase()}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="t1-mono-label t1-mono-label-red-paper">
              [ APPOINTMENTS ]
            </h3>
            <p className="mt-4 font-sans text-sm leading-relaxed text-[var(--t1-paper-65)]">
              New patients are welcomed by reservation.
            </p>
            <a
              href={hasBooking ? bookingUrl : tel}
              {...(hasBooking
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="t1-mono-label mt-5 inline-block border border-[var(--t1-paper-40)] px-4 py-3 !text-[var(--t1-paper)] transition-colors duration-200 hover:border-[var(--t1-red)] hover:bg-[var(--t1-red)]"
            >
              BOOK ONLINE
            </a>
          </div>

          {/* Full site map — every page of the finished edition */}
          <div>
            <h3 className="t1-mono-label t1-mono-label-red-paper">
              [ THE FULL EDITION ]
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href={homeHref || "/"}
                  className="t1-mono-label !text-[var(--t1-paper-65)] transition-colors duration-200 hover:!text-[var(--t1-red)]"
                >
                  HOME
                </a>
              </li>
              {SITE_PAGES.map((page) => (
                <li key={page.slug}>
                  <a
                    href={pageHref(homeHref, page.slug)}
                    className="t1-mono-label !text-[var(--t1-paper-65)] transition-colors duration-200 hover:!text-[var(--t1-red)]"
                  >
                    {page.label.toUpperCase()}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal line */}
        <div className="flex flex-col gap-2 border-t border-[var(--t1-hairline-light)] py-5 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="t1-mono-label !text-[var(--t1-paper-60)]">
            © {year} {practiceName.toUpperCase()}. ALL RIGHTS RESERVED.
          </p>
          <p className="t1-mono-label !text-[var(--t1-paper-60)]">
            SET IN ANTON, INTER &amp; JETBRAINS MONO
          </p>
        </div>
      </div>

      {/* The closing statement — the entire name, full width, cropped.
          A supplied logo signs off in its place, held to a sane size:
          a 400px mark blown up to the viewport would only show its
          pixels, and the point of the slot is the sign-off, not the
          scale. */}
      <BrandMark
        height={76}
        maxWidth={460}
        on="dark"
        label={practiceName}
        className="mb-14 mt-12 w-full justify-center"
      >
        <p
          aria-hidden="true"
          className="mt-4 whitespace-nowrap text-center font-t1-press uppercase leading-[0.78] tracking-[0.005em] text-[var(--t1-paper)]"
          style={{ fontSize: wordmarkSize, marginBottom: `calc(${wordmarkSize} * -0.14)` }}
        >
          {practiceName}
        </p>
      </BrandMark>
    </footer>
  );
}
