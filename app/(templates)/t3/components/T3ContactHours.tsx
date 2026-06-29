"use client";

import LiveStatusIndicator from "./LiveStatusIndicator";
import DynamicHoursList from "./DynamicHoursList";

interface T3ContactHoursProps {
  addressGBP: string;
  cityServed: string;
  stateServed: string;
  phoneGBP: string;
  googleMapsEmbedUrl?: string;
}

export default function T3ContactHours({
  addressGBP,
  cityServed,
  stateServed,
  phoneGBP,
  googleMapsEmbedUrl,
}: T3ContactHoursProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
      <div>
        <p className="text-[11px] uppercase tracking-[0.4em] text-brand-primary mb-8">
          Hours of Wellness
        </p>

        {/* Live Status Indicator */}
        <LiveStatusIndicator />

        {/* Hours List with Dynamic Current Day Highlight */}
        <DynamicHoursList />

        {/* Concierge Parking Copy */}
        <div className="mt-8 pt-6">
          <p className="text-[11px] leading-relaxed tracking-[0.15em] text-slate-500/80 font-light">
            Complimentary private client parking is available directly behind the sanctuary entrance.
          </p>
        </div>

        <div className="mt-10 pt-10 border-t border-neutral-border/30">
          <p className="text-sm text-neutral-muted font-light tracking-wide mb-2">
            {addressGBP}
          </p>
          <p className="text-sm text-neutral-muted font-light tracking-wide mb-6">
            {cityServed}, {stateServed}
          </p>
          <a
            href={`tel:${phoneGBP.replace(/[^0-9+]/g, "")}`}
            className="text-brand-primary tracking-[0.1em] hover:tracking-[0.15em] transition-all duration-500"
          >
            {phoneGBP}
          </a>
        </div>
      </div>

      {/* Luxury Map Wrapper with Floating CTA */}
      <div className="relative aspect-square">
        <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl">
          {googleMapsEmbedUrl ? (
            <iframe
              src={googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Practice Location"
            />
          ) : (
            <div className="w-full h-full bg-neutral-border/10 flex items-center justify-center text-neutral-muted font-light tracking-widest">
              Map
            </div>
          )}
        </div>

        {/* Floating Directions CTA */}
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
            `${addressGBP}, ${cityServed}, ${stateServed}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-6 right-6 group inline-flex items-center gap-2.5 px-6 py-3.5 bg-white hover:bg-brand-primary text-brand-mainText hover:text-white shadow-xl hover:shadow-2xl border border-brand-primary/10 rounded-2xl transition-all duration-500 ease-out hover:scale-[1.02]"
        >
          <span className="text-sm font-light tracking-[0.08em]">Get Directions</span>
          <svg
            className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
          </svg>
        </a>
      </div>
    </div>
  );
}
