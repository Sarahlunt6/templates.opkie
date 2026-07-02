"use client";

import type { LocationNAP } from "@/types/dentist";
import { telHref } from "./hours";

interface T3HavenFooterProps {
  practiceName: string;
  location: LocationNAP;
  bookingUrl: string | "none";
}

/**
 * Soft footer — deep moss ground, mist type, one quiet serif sign-off.
 */
export default function T3HavenFooter({
  practiceName,
  location,
  bookingUrl,
}: T3HavenFooterProps) {
  const hasBooking = bookingUrl !== "none";
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative mt-6 rounded-t-[3rem] bg-[var(--t3-moss)] pb-14 pt-16 text-[#f4f6f1] sm:pt-20"
      aria-label="Footer"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-14 grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="mb-4 flex items-center gap-2.5 text-lg font-light tracking-[0.04em]">
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full bg-[#a8bfb2]"
              />
              {practiceName}
            </p>
            <p className="t3-serif max-w-xs text-xl leading-relaxed text-[#c9d6cd]">
              whenever you&rsquo;re ready, we&rsquo;ll be gentle.
            </p>
          </div>

          <div className="md:col-span-4">
            <h3 className="mb-4 text-sm font-light text-[#a8bfb2]">find us</h3>
            <address className="space-y-1.5 not-italic">
              <p className="text-[15px] font-light text-[#e6ece7]">
                {location.addressGBP}
              </p>
              <p className="text-[15px] font-light text-[#c9d6cd]">
                {location.cityServed}, {location.stateServed}
              </p>
              <p className="pt-2">
                <a
                  href={telHref(location.phoneGBP)}
                  className="text-[15px] font-light text-[#e6ece7] underline decoration-[#6d8b7d] underline-offset-4 transition-colors duration-500 hover:text-white"
                >
                  {location.phoneGBP}
                </a>
              </p>
            </address>
          </div>

          <div className="md:col-span-3">
            <h3 className="mb-4 text-sm font-light text-[#a8bfb2]">hours</h3>
            <ul className="space-y-1.5">
              {location.hoursOfOperation.map((entry) => (
                <li
                  key={entry.dayRange}
                  className="text-[15px] font-light text-[#c9d6cd]"
                >
                  <span className="text-[#e6ece7]">
                    {entry.dayRange.toLowerCase()}
                  </span>
                  <br />
                  {entry.structuralHours.toLowerCase()}
                </li>
              ))}
            </ul>
            <a
              href={hasBooking ? bookingUrl : telHref(location.phoneGBP)}
              target={hasBooking ? "_blank" : undefined}
              rel={hasBooking ? "noopener noreferrer" : undefined}
              className="mt-6 inline-block rounded-full border border-[#6d8b7d] px-6 py-2.5 text-sm font-light text-[#e6ece7] transition-colors duration-500 hover:bg-[#6d8b7d] hover:text-[var(--t3-moss)]"
            >
              Reserve a visit
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-[#4a5a51] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] font-light text-[#a8bfb2]">
            © {year} {practiceName}. all rights reserved.
          </p>
          <p className="text-[13px] font-light text-[#a8bfb2]">
            serving {location.cityServed} and{" "}
            {location.localizedNeighborhoods.length} nearby neighborhoods
          </p>
        </div>
      </div>
    </footer>
  );
}
