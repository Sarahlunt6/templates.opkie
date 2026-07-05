"use client";

import { Phone, CalendarDays } from "lucide-react";
import { telHref } from "./hours";

interface T3MobileBarProps {
  phone: string;
  bookingUrl: string | "none";
}

/**
 * Sticky mobile bottom bar — Call + Reserve, in the Haven register.
 * Mist glass, moss text, eucalyptus fill. Hidden at lg and up.
 */
export default function T3MobileBar({ phone, bookingUrl }: T3MobileBarProps) {
  const hasBooking = bookingUrl !== "none";

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--t3-glass-border)] bg-[rgba(255,255,255,0.6)] backdrop-blur-md lg:hidden">
        <div className="flex items-stretch gap-3 px-4 py-3">
          <a
            href={telHref(phone)}
            className="t3-btn t3-btn-quiet flex-1 py-3.5 text-[15px]"
          >
            <Phone aria-hidden="true" className="h-4 w-4" />
            Call
          </a>
          <a
            href={hasBooking ? bookingUrl : telHref(phone)}
            target={hasBooking ? "_blank" : undefined}
            rel={hasBooking ? "noopener noreferrer" : undefined}
            className="t3-btn t3-btn-primary flex-1 py-3.5 text-[15px]"
          >
            <CalendarDays aria-hidden="true" className="h-4 w-4" />
            Book a visit
          </a>
        </div>
        <div className="h-[env(safe-area-inset-bottom)]" aria-hidden="true" />
      </div>

      {/* spacer so the bar never covers the footer */}
      <div className="h-20 lg:hidden" aria-hidden="true" />
    </>
  );
}
