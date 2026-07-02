"use client";

import { useEffect, useState } from "react";

const CHAPTERS = [
  { numeral: "I", id: "consultation", title: "The Consultation" },
  { numeral: "II", id: "design", title: "The Design" },
  { numeral: "III", id: "craft", title: "The Craft" },
  { numeral: "IV", id: "reveal", title: "The Reveal" },
];

/**
 * Sticky chapter indicator — a thin editorial rail pinned to the left
 * margin on wide viewports. Tracks the reader's position through the
 * four chapters of the feature.
 */
export default function T1ChapterRail() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = CHAPTERS.map((c) =>
      document.getElementById(c.id)
    ).filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    sections.forEach((s) => observer.observe(s));

    // Clear highlight above chapter I
    const onScroll = () => {
      const first = sections[0];
      if (first && first.getBoundingClientRect().top > window.innerHeight * 0.65) {
        setActive(null);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <nav
      aria-label="Reading progress"
      className="fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-6 min-[1700px]:flex"
    >
      {CHAPTERS.map((c) => {
        const isActive = active === c.id;
        return (
          <a
            key={c.id}
            href={`#${c.id}`}
            aria-current={isActive ? "true" : undefined}
            className="group flex items-center gap-3"
          >
            <span
              className={`font-t1-display text-base italic transition-all duration-700 ${
                isActive ? "text-[#9C7E46]" : "text-[#16130F]/25"
              } group-hover:text-[#5E2A2B]`}
            >
              {c.numeral}
            </span>
            <span
              className={`overflow-hidden whitespace-nowrap font-sans text-[10px] uppercase tracking-[0.24em] transition-all duration-700 ${
                isActive
                  ? "max-w-[10rem] text-[#6B675E] opacity-100"
                  : "max-w-0 opacity-0"
              }`}
            >
              {c.title}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
