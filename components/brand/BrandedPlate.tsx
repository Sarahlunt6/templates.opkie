"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useBrandStudio } from "./BrandStudioProvider";

/* ------------------------------------------------------------------ *
 *  Brand Studio — the hub's specimen plate.
 *
 *  With no brand set, this is the screenshot it has always been: one
 *  optimized image, nothing to execute. The moment a client sets a color
 *  or a logo, the plate becomes the real template — the actual page,
 *  rendered at desktop width and scaled into the frame, reading the same
 *  session the panel writes to. No second set of screenshots to keep in
 *  sync, and no approximation of what their brand will look like.
 *
 *  Live plates only load once they are near the viewport, and only once
 *  the client has opted in by setting a brand, so a first-time visitor
 *  pays nothing for the capability.
 * ------------------------------------------------------------------ */

/** Desktop width each plate is rendered at before being scaled down. */
const RENDER_WIDTH = 1440;
/** 16:10, matching the plate frame — keeps the hero fully in shot. */
const RENDER_HEIGHT = 900;

interface BrandedPlateProps {
  /** Template id — both the screenshot name and the route to frame. */
  id: string;
  /** Alt text for the screenshot state. */
  alt: string;
  /** Whether this plate is worth fetching eagerly (the first one). */
  priority?: boolean;
  /** Plate-level hover treatment, applied to whichever state is showing. */
  hovered?: boolean;
  reduced?: boolean;
}

export default function BrandedPlate({
  id,
  alt,
  priority = false,
  hovered = false,
  reduced = false,
}: BrandedPlateProps) {
  const studio = useBrandStudio();
  const live = Boolean(studio?.hydrated && studio.active);

  const frameRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const [near, setNear] = useState(false);
  const [loaded, setLoaded] = useState(false);

  /* Scale the 1440px render down to whatever width the plate happens to
     be, so the framed page keeps its real desktop layout rather than
     collapsing into its mobile breakpoint. */
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const measure = () => setScale(el.clientWidth / RENDER_WIDTH);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* Five live templates is real weight. Only mount the ones a client is
     about to look at, and keep them mounted once they have loaded. */
  useEffect(() => {
    const el = frameRef.current;
    if (!el || !live || near) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [live, near]);

  const zoom = {
    transform: hovered && !reduced ? "scale(1.04)" : "scale(1)",
    transition: "transform 0.7s cubic-bezier(0.22,1,0.36,1)",
  } as const;

  return (
    <div ref={frameRef} className="absolute inset-0 overflow-hidden">
      {/* The screenshot. It stays mounted underneath a live plate as the
          thing to look at while the template boots, and as the fallback
          if it never does. */}
      <Image
        src={`/images/templates/${id}-preview.png`}
        alt={alt}
        fill
        sizes="(max-width: 768px) 90vw, 32vw"
        priority={priority}
        className="object-cover object-top"
        style={zoom}
      />

      {live && near && scale > 0 && (
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            ...zoom,
            opacity: loaded ? 1 : 0,
            transition: `${zoom.transition}, opacity 0.5s ease-out`,
          }}
        >
          <iframe
            /* Same origin, so this document shares the tab's session
               storage: it applies the client's brand itself and repaints
               on the storage event when they move a slider. */
            src={`/${id}`}
            title=""
            tabIndex={-1}
            scrolling="no"
            loading="lazy"
            onLoad={() => setLoaded(true)}
            className="pointer-events-none origin-top-left border-0"
            style={{
              width: RENDER_WIDTH,
              height: RENDER_HEIGHT,
              transform: `scale(${scale})`,
            }}
          />
        </div>
      )}
    </div>
  );
}
