"use client";

import { useEffect, useState } from "react";

interface T1FolioProps {
  practiceName: string;
}

/** Chapter registry — ids must match the section anchors in page.tsx */
const CHAPTERS = [
  { id: "services", label: "01 — THE SERVICES" },
  { id: "doctors", label: "02 — THE DOCTORS" },
  { id: "reviews", label: "03 — THE PROOF" },
  { id: "visit", label: "04 — THE VISIT" },
];

/**
 * T1 PRESS — running folio. A fixed vertical page-header in the left
 * margin that names the current chapter as the reader moves through the
 * issue, like the running head of a publication. Ambient and desktop-only:
 * hidden below lg, aria-hidden always (the chapter headings carry the
 * semantics), plain IntersectionObserver — no animation library.
 */
export default function T1Folio({ practiceName }: T1FolioProps) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = CHAPTERS.map((c) => document.getElementById(c.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;

    // A chapter is "current" while it crosses the band around 40% viewport
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const chapter = CHAPTERS.find((c) => c.id === entry.target.id);
            if (chapter) setActive(chapter.label);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-3 top-1/2 z-30 hidden -translate-y-1/2 lg:block"
    >
      {/* key remount on chapter change drives the 250ms crossfade */}
      <p
        key={active ?? "none"}
        className={`t1-mono-label t1-mono-label-stone t1-folio-in whitespace-nowrap [writing-mode:vertical-rl] rotate-180 ${
          active ? "opacity-100" : "opacity-0"
        }`}
      >
        {active ? `${active} · ${practiceName.toUpperCase()}` : ""}
      </p>
    </div>
  );
}
