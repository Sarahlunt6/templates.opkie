"use client";

import LiveStatusIndicatorOrtho from "./LiveStatusIndicatorOrtho";
import DynamicHoursListOrtho from "./DynamicHoursListOrtho";

interface T3OrthoContactHoursProps {
  addressGBP: string;
  cityServed: string;
  stateServed: string;
  phoneGBP: string;
  googleMapsEmbedUrl?: string;
}

export default function T3OrthoContactHours({
  addressGBP,
  cityServed,
  stateServed,
  phoneGBP,
  googleMapsEmbedUrl,
}: T3OrthoContactHoursProps) {
  return (
    <div className="relative bg-[#fcfbfa] rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* LEFT PANEL: Hours & Contact Information */}
        <div className="p-8 lg:p-12 flex flex-col">
          {/* Header with Integrated Status Badge */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <p className="text-[11px] uppercase tracking-[0.4em] text-brand-primary font-medium">
                Hours of Alignment
              </p>
              <LiveStatusIndicatorOrtho />
            </div>
          </div>

          {/* Hours List with Constrained Width */}
          <div className="max-w-md mb-8">
            <DynamicHoursListOrtho />
          </div>

          {/* Concierge Parking Copy */}
          <div className="mb-8 pb-8 border-b border-slate-200/50">
            <p className="text-[11px] leading-relaxed tracking-[0.15em] text-slate-500/80 font-light max-w-sm">
              Complimentary reserved parking is available in our private client lot adjacent to the main entrance.
            </p>
          </div>

          {/* Contact Information */}
          <div className="mt-auto">
            <div className="space-y-3">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400 mb-2">Address</p>
                <p className="text-sm text-neutral-muted font-light tracking-wide">
                  {addressGBP}
                </p>
                <p className="text-sm text-neutral-muted font-light tracking-wide">
                  {cityServed}, {stateServed}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400 mb-2">Phone</p>
                <a
                  href={`tel:${phoneGBP.replace(/[^0-9+]/g, "")}`}
                  className="text-brand-primary tracking-[0.08em] hover:tracking-[0.12em] transition-all duration-500 text-base font-light"
                >
                  {phoneGBP}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Luxury Map with Muted Colors */}
        <div className="relative min-h-[400px] lg:min-h-full">
          <div className="absolute inset-0">
            {googleMapsEmbedUrl ? (
              <div className="w-full h-full relative">
                {/* Muted Map Filter Overlay */}
                <div className="absolute inset-0 contrast-[0.95] saturate-[0.6] sepia-[0.08]">
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
                </div>
              </div>
            ) : (
              <div className="w-full h-full bg-slate-100 flex items-center justify-center text-neutral-muted font-light tracking-widest">
                Map
              </div>
            )}
          </div>

          {/* Floating Directions CTA - Positioned Over Map */}
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
              `${addressGBP}, ${cityServed}, ${stateServed}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-6 right-6 z-10 group inline-flex items-center gap-2.5 px-6 py-3.5 bg-white/95 backdrop-blur-sm hover:bg-brand-primary text-brand-mainText hover:text-white shadow-xl hover:shadow-2xl border border-brand-primary/10 rounded-2xl transition-all duration-500 ease-out hover:scale-[1.02]"
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
    </div>
  );
}
