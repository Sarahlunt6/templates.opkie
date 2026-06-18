"use client";

import type { LocationNAP, TrustSignals } from "@/types/dentist";

interface StickyUtilityBarProps {
  location: LocationNAP;
  onlineBookingUrl: string | "none";
  trustSignals: TrustSignals;
}

export const StickyUtilityBar = ({
  location,
  onlineBookingUrl,
  trustSignals,
}: StickyUtilityBarProps) => {
  const hasBooking = onlineBookingUrl !== "none";

  return (
    <>
      {/* Desktop Header Actions */}
      <div className="hidden lg:flex items-center gap-4">
        {/* Emergency Alert - Desktop */}
        {trustSignals.hasSameDayEmergency && (
          <div
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded"
            style={{
              backgroundColor: "var(--emergency-alert)",
              color: "var(--bg-canvas)",
            }}
          >
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            Same-Day Emergency
          </div>
        )}

        {/* Phone - Desktop */}
        <a
          href={`tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-colors"
          style={{
            color: "var(--primary-brand)",
            border: "2px solid var(--primary-brand)",
          }}
        >
          <svg
            className="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          {location.phoneGBP}
        </a>

        {/* Booking CTA - Desktop */}
        {hasBooking && (
          <a
            href={onlineBookingUrl}
            className="btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book Online
          </a>
        )}
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div
        className="fixed bottom-0 left-0 right-0 lg:hidden z-50 border-t shadow-lg no-cls"
        style={{
          backgroundColor: "var(--bg-canvas)",
          borderColor: "var(--neutral-border)",
        }}
      >
        <div className="flex items-stretch">
          {/* Emergency Link - Mobile */}
          {trustSignals.hasSameDayEmergency && (
            <a
              href={`tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
              className="flex flex-col items-center justify-center flex-1 py-3 text-xs font-semibold"
              style={{
                backgroundColor: "var(--emergency-alert)",
                color: "var(--bg-canvas)",
              }}
            >
              <svg
                className="w-5 h-5 mb-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              Emergency
            </a>
          )}

          {/* Call Button - Mobile */}
          <a
            href={`tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
            className="flex flex-col items-center justify-center flex-1 py-3 text-xs font-semibold"
            style={{
              color: "var(--primary-brand)",
            }}
          >
            <svg
              className="w-5 h-5 mb-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            Call Now
          </a>

          {/* Book Button - Mobile */}
          {hasBooking ? (
            <a
              href={onlineBookingUrl}
              className="flex flex-col items-center justify-center flex-1 py-3 text-xs font-semibold"
              style={{
                backgroundColor: "var(--primary-brand)",
                color: "var(--bg-canvas)",
              }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className="w-5 h-5 mb-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              Book Online
            </a>
          ) : (
            <a
              href={`tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
              className="flex flex-col items-center justify-center flex-1 py-3 text-xs font-semibold"
              style={{
                backgroundColor: "var(--primary-brand)",
                color: "var(--bg-canvas)",
              }}
            >
              <svg
                className="w-5 h-5 mb-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              Schedule
            </a>
          )}
        </div>

        {/* Safe Area Spacer for iOS */}
        <div className="h-[env(safe-area-inset-bottom)]" />
      </div>

      {/* Spacer for mobile sticky bar */}
      <div className="h-16 lg:hidden" aria-hidden="true" />
    </>
  );
};

export default StickyUtilityBar;
