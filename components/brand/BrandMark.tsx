"use client";

import type { ReactNode } from "react";
import { useBrandStudio } from "./BrandStudioProvider";

/* ------------------------------------------------------------------ *
 *  Brand Studio — the mark.
 *
 *  Wraps whatever wordmark a template already draws. With no logo
 *  uploaded it renders that wordmark untouched, so nothing changes for
 *  a scaffolded client site. With a logo, it swaps in the image at the
 *  same optical size the type occupied.
 * ------------------------------------------------------------------ */

interface BrandMarkProps {
  /** The template's own typographic wordmark — the fallback and default. */
  children: ReactNode;
  /** Cap height in px, matched to the type it replaces. */
  height: number;
  /** The practice name, used as the image's alt text. */
  label: string;
  /** Widest the mark may run before it starts crowding the nav. */
  maxWidth?: number;
  /** Tone of the surface behind it — decides how a dark logo is handled. */
  on?: "light" | "dark";
  className?: string;
}

export default function BrandMark({
  children,
  height,
  label,
  maxWidth = 260,
  on = "light",
  className = "",
}: BrandMarkProps) {
  const studio = useBrandStudio();

  // No provider (client sites) or nothing uploaded: the type stands.
  if (!studio?.hydrated || !studio.logo) return <>{children}</>;

  /* A dark logo on a dark ground would vanish. Rather than inverting the
     client's colors — which mangles a two-color mark — it gets a small
     porcelain plate, the same move a real site makes in a dark footer. */
  const needsPlate = on === "dark" && studio.logo.dark;

  const img = (
    /* eslint-disable-next-line @next/next/no-img-element -- a session-only
       data URL; there is nothing for the image optimizer to fetch. */
    <img
      src={studio.logo.src}
      alt={label}
      className="block h-full w-auto object-contain object-left"
      style={{ maxWidth }}
    />
  );

  if (!needsPlate) {
    return (
      <span
        className={`inline-flex items-center ${className}`}
        style={{ height }}
      >
        {img}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center rounded-[3px] bg-[#f4efe6] px-2.5 py-1.5 ${className}`}
      style={{ height: height + 12, maxWidth: maxWidth + 20 }}
    >
      {img}
    </span>
  );
}
