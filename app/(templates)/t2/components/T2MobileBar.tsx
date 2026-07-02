"use client";

import { Calendar, Phone } from "lucide-react";
import { location, bookingHref, telHref } from "./t2-lib";

/* Sticky mobile bottom bar — Call + Book, always in thumb reach. */

export default function T2MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 lg:hidden border-t border-[var(--t2p-line-strong)] bg-[#0A0C10]/94 backdrop-blur-md pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-2">
        <a
          href={telHref}
          className="t2p-mono flex items-center justify-center gap-2.5 py-4 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[var(--t2p-text)] border-r border-[var(--t2p-line)]"
        >
          <Phone className="h-4 w-4 text-[var(--t2p-ice)]" strokeWidth={1.5} aria-hidden="true" />
          <span>Call {location.phoneGBP}</span>
        </a>
        <a
          href={bookingHref}
          className="t2p-mono flex items-center justify-center gap-2.5 py-4 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] bg-[var(--t2p-ice)] text-[#06181d]"
        >
          <Calendar className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          <span>Book a visit</span>
        </a>
      </div>
    </div>
  );
}
